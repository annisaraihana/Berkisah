from typing import Union, List

from fastapi import FastAPI
from pydantic import BaseModel


class TranslationRequestModel(BaseModel):
    text: str