from fastapi import FastAPI
from transformers import AutoTokenizer, AutoModelForCausalLM,GPT2LMHeadModel

model_path_or_name = "/media/karuniaperjuangan/SSD E/AI-Project/AI-Project-WSL/text-generation-webui/models/gpt2-medium-indonesian-story"

model:GPT2LMHeadModel = AutoModelForCausalLM.from_pretrained(model_path_or_name,
                                             load_in_8bit=True,
                                             device_map="auto"
                                             ).cuda()
tokenizer = AutoTokenizer.from_pretrained(model_path_or_name)

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
async def storysearch(prompt: str=" "):
    text = generate_text(prompt)
    return {"story": text}
