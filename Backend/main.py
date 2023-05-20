from model import model, tokenizer, generate_story_and_choices
from fastapi import FastAPI

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

@app.get("/generate/story")
async def storysearch(prompt: str="Pada zaman dahulu"):
    for result in generate_story_and_choices(prompt,story_beginning=True):
        output_list = list(result)
    return {"story": output_list[0], "choices": output_list[1:]}
