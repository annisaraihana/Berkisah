import uuid
from fastapi import APIRouter, HTTPException
import pgsql_model.models as model
from fastapi_sqlalchemy import db
from body_model import *

router = APIRouter()


@router.post("/api/register")
async def register(user:UserLoginSchema):
    #generate token
    token = uuid.uuid4()
    #prevent same token
    while db.session.query(model.User).filter(model.User.token == token).first():
        token = uuid.uuid4()
    db_user = model.User(username=user.username, password=user.password)
    #check if username already exists
    if db.session.query(model.User).filter(model.User.username ==  user.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    
    db.session.add(db_user)
    db.session.commit()
    #return json of user
    print(db_user)
    return db_user

@router.post("/api/login", response_model=UserTokenSchema)
async def login(user:UserLoginSchema):
    #check if username exists
    db_user = db.session.query(model.User).filter(model.User.username == user.username).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Username does not exist")
    #check if password is correct
    if db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Password is incorrect")
    #return json of user
    return db_user

@router.get("/api/story_list")
async def story_list():
    #return json of all stories
    return db.session.query(model.Story).all()

@router.post("/api/submit_story")
async def submit_story(story:model.Story):
    #add story to db
    db.session.add(story)
    db.session.commit()
    #return json of story
    return story

@router.get("/api/story/{id_story}")
async def get_story(id_story:int):
    #return json of story
    return db.session.query(model.Story).filter(model.Story.id_story == id_story).first()

@router.post("/api/save_progress")
async def save_progress(progress:model.SavedStoryProgress):
    #add progress to db
    db.session.add(progress)
    db.session.commit()
    #return json of progress
    return progress

@router.post("/api/get_progress")
async def get_progress(token:UserTokenSchema):
    #get user id
    id_user = db.session.query(model.User).filter(model.User.token == token.token).first().id_user

    #return json of progress
    return db.session.query(model.SavedStoryProgress).filter(model.SavedStoryProgress.id_user == id_user).all()

@router.post("/api/load_progress/{id_progress}")
async def load_progress(id_progress:int):
    #return json of progress
    return db.session.query(model.SavedStoryProgress).filter(model.SavedStoryProgress.id_progress == id_progress).first()

@router.post("/api/save_config")
async def save_config(config:model.UserConfig):
    #add config to db
    db.session.add(config)
    db.session.commit()
    #return json of config
    return config

@router.post("/api/get_config")
async def get_config(token:UserTokenSchema):
    #get user id
    id_user = db.session.query(model.User).filter(model.User.token == token.token).first().id_user

    #return json of config
    return db.session.query(model.UserConfig).filter(model.UserConfig.id_user == id_user).first()