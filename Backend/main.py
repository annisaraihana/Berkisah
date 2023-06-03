from fastapi_sqlalchemy import DBSessionMiddleware
from model import model, tokenizer, generate_story_and_choices
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from body_model import StoryContinuations, StoryIntro, ImageRequestModel, TranslationRequestModel
from typing import List
from dotenv import load_dotenv
import os
import requests, uuid, json, os
from routers.ai import router as ai_router
from routers.db import router as db_router


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(DBSessionMiddleware, db_url=os.environ['DATABASE_URL'])
app.include_router(ai_router)
app.include_router(db_router)

@app.get("/")

@app.get("/api")
async def root():
    return {"message": "Hello World"}

import uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0:0:0:0", port=8000)