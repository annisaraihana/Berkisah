import uuid
from fastapi import APIRouter, HTTPException
import pgsql_model.models as model
from fastapi_sqlalchemy import db
from body_model import *

router = APIRouter()


@router.post("/api/register")
async def register(user:UserLoginSchema):
    try:
        #generate token
        token = uuid.uuid4()
        #prevent same token
        all_tokens = db.session.query(model.User).all()
        while token in all_tokens:
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
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/api/login", response_model=UserTokenSchema)
async def login(user:UserLoginSchema):
    try:
        #check if username exists
        db_user = db.session.query(model.User).filter(model.User.username == user.username).first()
        if not db_user:
            raise HTTPException(status_code=400, detail="Username does not exist")
        #check if password is correct
        if db_user.password != user.password:
            raise HTTPException(status_code=400, detail="Password is incorrect")
        #return json of user
        return db_user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/api/story_list")
async def story_list():
    try:
        #return json of all stories
        return db.session.query(model.Story).all()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/api/submit_story",response_model=StorySchema)
async def submit_story(story:StorySchema):
    try:
        #add story to db
        db.session.add(story)
        db.session.commit()
        #return json of story
        return story
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/api/story/{id_story}")
async def get_story(id_story:int):
    try:
        #return json of story
        return db.session.query(model.Story).filter(model.Story.id_story == id_story).first()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/api/save_progress")
async def save_progress(progress:SavedStoryProgressSchema):
    try:
        #add progress to db
        id_user = db.session.query(model.User).filter(model.User.token == progress.token).first().id_user
        db_progress = model.SavedStoryProgress(id_user=id_user, id_story=progress.id_story, progress=progress.progress)
        db.session.add(db_progress)
        db.session.commit()
        #return json of progress
        print(db_progress)
        return db_progress
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/api/get_progress")
async def get_progress(token:UserTokenSchema):
    try:
        #get user id
        id_user = db.session.query(model.User).filter(model.User.token == token.token).first().id_user

        #return json of progress
        return db.session.query(model.SavedStoryProgress).filter(model.SavedStoryProgress.id_user == id_user).all()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/api/load_progress/{id_progress}")
async def load_progress(id_progress:int):
    try:
        #return json of progress
        return db.session.query(model.SavedStoryProgress).filter(model.SavedStoryProgress.id_progress == id_progress).first()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/api/save_config")
async def save_config(config:UserConfigSchema):
    try:
        #add config to db
        db.session.add(config)
        db.session.commit()
        #return json of config
        return config
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/api/get_config", response_model=UserConfigSchema)
async def get_config(token:UserTokenSchema):
    try:
        #get user id
        id_user = db.session.query(model.User).filter(model.User.token == token.token).first().id_user

        #return json of config
        return db.session.query(model.UserConfig).filter(model.UserConfig.id_user == id_user).first()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))