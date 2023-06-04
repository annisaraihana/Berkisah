import requests,os, time, json, pytest
import random
import uuid
#unit test for backend
url = "http://20.51.177.188:8000/"

def test_register():
    
    #test register
    data = {
        "username": uuid.uuid4().hex.upper()[0:6],
        "password": uuid.uuid4().hex.upper()[0:6],
    }
    init_time = time.time()
    response = requests.post(url + "api/register", data=data)
    print(response.text)
    assert response.status_code == 200
    print("register time: ", time.time() - init_time)

def test_login():
    #test login
    data = {
        "username": "juang",
        "password": 123,
    }
    init_time = time.time()
    response = requests.post(url + "api/login", data=data)
    print(response.text)
    assert response.status_code == 200
    print("login time: ", time.time() - init_time)

def test_wrong_login():
    #test wrong login
    data = {
        "username": "juang",
        "password": 1234,
    }
    init_time = time.time()
    response = requests.post(url + "api/login", data=data)
    print(response.text)
    assert response.status_code == 401 or response.status_code == 400
    print("wrong login time: ", time.time() - init_time)

def test_generate_intro():
    data = {
        "prompt": "Pada zaman dahulu",
    }
    init_time = time.time()
    response = requests.post(url + "api/generate/intro", data=data)
    print(response.text)
    assert response.status_code == 200
    print("generate intro time: ", time.time() - init_time)

def test_choose_choice():
    data = {
        "choice": "Ia pun memilih pilihan 2.",
        "sequence": ["Pada awalnya ia memilih pilihan 1."]
    }
    init_time = time.time()
    response = requests.post(url + "api/generate/story", data=data)
    print(response.text)
    assert response.status_code == 200
    print("choose choice time: ", time.time() - init_time)

def test_wrong_schema():
    data = {
        "choice": ["Ia pun memilih pilihan 2."],
        "sequence": "Pada awalnya ia memilih pilihan 1."
    }
    init_time = time.time()
    response = requests.post(url + "api/generate/story", data=data)
    print(response.text)
    assert response.status_code == 400
    print("wrong schema time: ", time.time() - init_time)

def test_get_story_list():
    init_time = time.time()
    response = requests.get(url + "api/story_list")
    print(response.text)
    assert response.status_code == 200
    print("get story list time: ", time.time() - init_time)

def test_get_config():
    init_time = time.time()
    response = requests.get(url + "api/config")
    print(response.text)
    assert response.status_code == 200
    print("get config time: ", time.time() - init_time)

def test_translate():
    data = {
        "text": "Pada awalnya ia memilih pilihan 1.",
    }
    init_time = time.time()
    response = requests.post(url + "api/translate_id_to_en", data=data)
    print(response.text)
    assert response.status_code == 200
    print("translate time: ", time.time() - init_time)

def wrong_translate_schema():
    data = {
        "text": ["Pada awalnya ia memilih pilihan 1."],
    }
    init_time = time.time()
    response = requests.post(url + "api/translate_id_to_en", data=data)
    print(response.text)
    assert response.status_code != 200
    print("wrong translate schema time: ", time.time() - init_time)

def test_empty_translate():
    data = {
        "text": [],
    }
    init_time = time.time()
    response = requests.post(url + "api/translate_id_to_en", data=data)
    print(response.text)
    assert response.status_code != 200
    print("empty translate time: ", time.time() - init_time)

def test_generate_image():
    data = {
        "positive_prompt": "good man",
        "negative_prompt": "ugly",
        "artstyle_keyword": "realistic",
        "width": 512,
        "height": 512
    }
    init_time = time.time()
    response = requests.post(url + "api/generate/image", data=data)
    print(response.text)
    assert response.status_code == 200
    print("generate image time: ", time.time() - init_time)

def test_wrong_size_image():
    data = {
        "positive_prompt": "good man",
        "negative_prompt": "ugly",
        "artstyle_keyword": "realistic",
        "width": 32,
        "height": 32
    }
    init_time = time.time()
    response = requests.post(url + "api/generate/image", data=data)
    print(response.text)
    assert response.status_code == 200
    print("generate image time: ", time.time() - init_time)

test_lists = [test_register, test_login, 
              test_wrong_login, test_generate_intro, 
              test_choose_choice, test_wrong_schema, 
              test_get_story_list, test_get_config, 
              test_translate, wrong_translate_schema, 
              test_empty_translate, test_generate_image, 
              test_wrong_size_image]

time_init = time.time()
count_unexpected_behavior = 0
for test in test_lists:
    try:
        test()
    except Exception as e:
        print(str(e))
        count_unexpected_behavior += 1
print("total test time: ", time.time() - time_init)
print(f"Total test meeting expectation: {len(test_lists) - count_unexpected_behavior}/{len(test_lists)}")