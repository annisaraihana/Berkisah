from transformers import AutoTokenizer, AutoModelForCausalLM,GPT2LMHeadModel
import re
from .utils import *


model_path_or_name = "/media/karuniaperjuangan/SSD E/AI-Project/AI-Project-WSL/text-generation-webui/models/gpt2-medium-indonesian-story"

tokenizer = AutoTokenizer.from_pretrained(model_path_or_name)
model:GPT2LMHeadModel = AutoModelForCausalLM.from_pretrained(model_path_or_name,
                                             load_in_8bit=True,
                                             device_map="auto"
                                             ).cuda()

def stream_generate_text(init_text,max_sentences=0,max_tokens=512,hidden_texts=[]):
    """
    init_text: initial text that will be used to generate text
    max_sentences: maximum number of sentences to generate
    max_tokens: maximum number of tokens to generate
    hidden_sentence: list of string that will be hidden from the generated text (example: initial text and unfinished sentences)
    """
    sentence = init_text
    inputs_ids = tokenizer(sentence, return_tensors="pt").input_ids.cuda()
    continue_generate = True
    while continue_generate:
        inputs_ids = tokenizer(sentence, return_tensors="pt").input_ids.cuda()
        generate_params = {
        "max_new_tokens": 8,
        "eos_token_id": tokenizer.eos_token_id,
        "pad_token_id": tokenizer.eos_token_id,
        "top_k": 50,
        "top_p": 0.95,
        "temperature": 0.9,
        "repetition_penalty": 1.2,
        "do_sample": True,
        }
        generate_params["input_ids"] = inputs_ids
        outputs = model.generate(**generate_params)
        sentence = tokenizer.decode(outputs[0])
        inputs_ids = outputs[0]
        #print(count_sentences(sentence)) 
        outputted_sentences = sentence
        for hidden in hidden_texts:
            outputted_sentences = outputted_sentences.replace(hidden,"")
        yield outputted_sentences
            
        if count_sentences(sentence) >= max_sentences or ( len(inputs_ids)-len(tokenizer.encode(init_text)) ) > max_tokens or tokenizer.eos_token_id in inputs_ids:
            continue_generate = False
    #Clear text after last ,.",!",?",.,?,!
    deleted_text = re.split(r"[\.\!\?]",sentence)[-1]

    outputted_sentences = sentence.replace(deleted_text,"")
    for hidden in hidden_texts:
        outputted_sentences = outputted_sentences.replace(hidden,"")
    yield outputted_sentences


def generate_story_and_choices(beginning_text="Pada zaman dahulu", selected_choice="", num_choices=3, story_beginning=True):
    clear_torch_cache()
    """
    beginning_text: text that will be used to generate story (if in beginning is the story, else the choice of previous story)
    num_choices: number of choices to generate
    story_beginning: True if the beginning_text is the story, else False
    """
    if story_beginning:
        story_sequence = []
        story = beginning_text
    else:
        story = ""
        try:
            for item in story_sequence:
                story += item
        except:
            story_sequence = []
    pregenerated_length = len(story)
    
    story += selected_choice

    
    choices = ["..." for i in range(num_choices)]

    for text in stream_generate_text(story,max_sentences=5,max_tokens=512):
        story = text
        # Di awal, juga tampilkan awalan cerita yang dimasukkan pengguna
        yield story[pregenerated_length:] if not story_beginning else story, *choices
    
    #clean story from html tag
    story = re.sub(r"<[^>]*>","",story)
    
    story_sequence.append(story[pregenerated_length:] if not story_beginning else story)
    #Generate choices
    max_sentences = 2+count_sentences(story)
    for i in range(num_choices):
        choices[i] = ""
        for text in stream_generate_text(story,max_sentences=max_sentences,max_tokens=512):
            choices[i] = text[len(story):]
            yield story[pregenerated_length:] if not story_beginning else story, *choices
        #clean choices from html tag
        choices[i] = re.sub(r"<[^>]*>","",choices[i])
        
def select_choice(story_sequence,choice):
    full_story = ""
    for item in story_sequence:
        full_story += item
    for iter in generate_story_and_choices("",selected_choice=choice,story_beginning=False):
        yield iter


