from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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

class ActivityRequest(BaseModel):
    age: int
    interests: list[str]
    time_available: int
    setting: str

@app.post("/generate-activities")
async def generate_activities(request: ActivityRequest):
    prompt = (
        f"You are an expert in child development and parent-child bonding. "
        f"Generate 3 creative, age-appropriate bonding activities for a {request.age}-year-old child. "
        f"The activities should match the following interests: {', '.join(request.interests)}. "
        f"They should take around {request.time_available} minutes and be suitable for a(n) {request.setting} setting. "
        f"Format the response as a short, friendly list."
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        content = response.choices[0].message.content
        return {"activities": content}
    except Exception as e:
        return {"activities": f"Error: {str(e)}"}
