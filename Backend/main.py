from model import model, tokenizer, generate_story_and_choices
from fastapi import FastAPI
from body_model import StoryContinuations, StoryIntro

def generate_text(prompt, max_length=100):
    inputs_ids = tokenizer(prompt, return_tensors="pt").input_ids.cuda()
    outputs = model.generate(inputs_ids,max_length=max_length, do_sample=True, temperature=0.9)
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return text

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/story/{story_id}")
async def story(story_id: int):
    return {"message": f"This is a story with id {story_id}"}

@app.get("/generate/intro")
async def intro(story_intro: StoryIntro):
    for result in generate_story_and_choices(story_intro.prompt,story_beginning=True):
        output = result
    return output

@app.post("/generate/story")
async def story(story_continuations: StoryContinuations):
    for result in generate_story_and_choices(story_sequence=story_continuations.sequence,selected_choice=story_continuations.choice,story_beginning=False):
        output = result
    return output