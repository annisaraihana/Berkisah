from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float, VARCHAR, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base  = declarative_base()
"""
class Book(Base):
    __tablename__ = 'book'
    id  = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    rating = Column(Float)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())
    author_id = Column(Integer, ForeignKey('author.id'))

    author = relationship('Author')

    class Author(Base):
    __tablename__ = 'author'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())
"""

class User(Base):
    __tablename__ = 'user'
    id_user = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    token = Column(String)

class UserConfig(Base):
    __tablename__ = 'user_config'
    id_config = Column(Integer, primary_key=True)
    id_user = Column(Integer, ForeignKey('user.id_user'))
    text_model = Column(String)
    image_model = Column(String)
    image_artstyle = Column(String)

class Story(Base):
    __tablename__ = 'story'
    id_story = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    prompt = Column(String)
    image = Column(String)

class SavedStoryProgress(Base):
    __tablename__ = 'saved_story_progress'
    id_progress = Column(Integer, primary_key=True)
    id_user = Column(Integer, ForeignKey('user.id_user'))
    id_story = Column(Integer, ForeignKey('story.id_story'))
    progress = Column(JSON)
