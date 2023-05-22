import re


import gc
import torch

def clear_torch_cache():
    gc.collect()
    torch.cuda.empty_cache()

def count_sentences(text):
    #From text, count how many . ! ? there are
    #If . ! ? are followed by a space,double mark or a new line, then it is a sentence
    #If . ! ? in the end of the text, then it is a sentence
    return len(re.findall(r'[\.\!\?][\s\”\'\n]',text)) + len(re.findall(r'[\.\!\?]$',text))