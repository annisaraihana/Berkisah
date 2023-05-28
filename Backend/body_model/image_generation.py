from typing import Union, List

from fastapi import FastAPI
from pydantic import BaseModel


class ImageRequestModel(BaseModel):
    positive_prompt: str
    negative_prompt: str
    width: int = 512
    height: int = 512