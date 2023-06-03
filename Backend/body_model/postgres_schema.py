# build a schema using pydantic
from pydantic import BaseModel, Json
from datetime import datetime

class UserSchema(BaseModel):
    username:str
    password:str
    token:str

    class Config:
        orm_mode = True

class UserLoginSchema(BaseModel):
    username:str
    password:str

    class Config:
        orm_mode = True

class UserTokenSchema(BaseModel):
    token:str

    class Config:
        orm_mode = True
        
class UserConfigSchema(BaseModel):
    id_config : int
    id_user : int
    text_model : str
    image_model : str
    image_artstyle : str

    class Config:
        orm_mode = True

class StorySchema(BaseModel):
    id_story : int
    title : str
    description : str
    prompt : str
    image : str

    class Config:
        orm_mode = True

class StorySubmitSchema(BaseModel):
    title : str
    description : str
    prompt : str
    image : str

    class Config:
        orm_mode = True

class SavedStoryProgressSchema(BaseModel):
    token : str
    id_story : int
    progress : Json

    class Config:
        orm_mode = True


