from typing import Union, List

from fastapi import FastAPI
from pydantic import BaseModel


class StoryContinuations(BaseModel):
    choice: Union[None, str] = None
    sequence: Union[None, List[str]] = None