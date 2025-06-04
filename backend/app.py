from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-activities")
async def generate_activities(request: Request):
    data = await request.json()
    age = data.get("age")
    interests = data.get("interests", [])
    time = data.get("time_available")
    setting = data.get("setting")

    prompt = (
        f"You are a child development expert and creative play specialist. "
        f"Generate a bonding activity that a parent can do with their {age}-year-old child. "
        f"The child enjoys {', '.join(interests)}. "
        f"The activity should be suitable for {setting} settings and take about {time} minutes. "
        f"Make it engaging, developmentally beneficial, and fun."
    )

    try:
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that crafts creative and educational activities."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=400
        )

        activity = response.choices[0].message.content.strip()
        return {"activities": activity}

    except Exception as e:
        return {"activities": f"Error generating activities: {str(e)}"}
