from typing import Union, List

from fastapi import FastAPI
from pydantic import BaseModel


class StoryIntro(BaseModel):
    prompt: Union[None, str] = None