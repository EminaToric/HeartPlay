from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import openai
import os

# Set your OpenAI API key here or use environment variables
from dotenv import load_dotenv
load_dotenv()

import os
openai.api_key = os.getenv("OPENAI_API_KEY")


app = FastAPI()

# Allow frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ActivityRequest(BaseModel):
    age: int
    interests: List[str]
    time_available: int  # in minutes
    setting: str  # indoor or outdoor

@app.post("/generate-activities")
async def generate_activities(data: ActivityRequest):
    prompt = f"""
    You are a child development expert and creative play designer. 
    Suggest 3 unique, bonding-focused activities for a parent and their child to do together.

    Child's age: {data.age}
    Interests: {', '.join(data.interests)}
    Time available: {data.time_available} minutes
    Setting: {data.setting}

    Ensure the activities are:
    - Fun and imaginative
    - Supportive of development for that age
    - Easy to set up at home or outdoors
    - Written in warm, clear, simple language

    Output should be a list format with emojis.
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8,
            max_tokens=300
        )
        activities = response.choices[0].message['content'].strip()
        return {"activities": activities}
    except Exception as e:
        return {"error": str(e)}
