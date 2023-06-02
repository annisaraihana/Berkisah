from fastapi_sqlalchemy import DBSessionMiddleware
from model import model, tokenizer, generate_story_and_choices
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from body_model import StoryContinuations, StoryIntro, ImageRequestModel, TranslationRequestModel
from typing import List
from dotenv import load_dotenv
import os
import base64
import requests
import requests, uuid, json, os



load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.add_middleware(DBSessionMiddleware, db_url=os.environ['DATABASE_URL'])
@app.get("/")

@app.get("/api")
async def root():
    return {"message": "Hello World"}

@app.post("/api/generate/intro")
async def intro(story_intro: StoryIntro):
    if os.environ.get("DUMMY_TEXT_GENERATION") == "1":
        return {
            "story": "Pada tahun 2050 di Kota Chelmsford, ada sepasang remaja, bernama Miki dan Alphonse. Miki memiliki seorang kakak laki-laki bernama Alfons dan seorang adik perempuan bernama Claire.\nSementara Al dan Cl adalah anak yatim piatu yang sudah ditinggalkan orangtuanya saat masih kecil. Saat Cl berumur lima belas tahun, orangtuanya meninggal karena serangan jantung. Setelah itu, mereka hidup tanpa keluarga sampai dua belas tahun berikutnya.\nHidup mereka sangat sederhana.",
            "choices": [
                " Tidak ada fasilitas mewah seperti rumah atau mobil layaknya orang normal lainnya. Keluarga Miki tinggal di sebuah apartemen kumuh di samping sungai.",
                " Miki dan Al terbiasa bekerja dan belajar sejak pagi hari. Keduanya tidak pernah mengeluh dan menyerah pada kehidupan.",
                " Orangtuanya meninggal dalam kecelakaan mobil akibat mabuk pada waktu muda. Mereka membesarkan mereka berdua seorang diri tanpa dukungan orangtua dan kerabat."
                ],
                "story_sequence": [
                    "Pada tahun 2050 di Kota Chelmsford, ada sepasang remaja, bernama Miki dan Alphonse. Miki memiliki seorang kakak laki-laki bernama Alfons dan seorang adik perempuan bernama Claire.\nSementara Al dan Cl adalah anak yatim piatu yang sudah ditinggalkan orangtuanya saat masih kecil. Saat Cl berumur lima belas tahun, orangtuanya meninggal karena serangan jantung. Setelah itu, mereka hidup tanpa keluarga sampai dua belas tahun berikutnya.\nHidup mereka sangat sederhana."
                ]
        }
    for result in generate_story_and_choices(story_intro.prompt,story_beginning=True):
        output = result
    return output

@app.post("/api/generate/story")
async def story(story_continuations: StoryContinuations):
    if os.environ.get("DUMMY_TEXT_GENERATION") == "1":
        return {
            "story": "Pada tahun 2050 di Kota Chelmsford, ada sepasang remaja, bernama Miki dan Alphonse. Miki memiliki seorang kakak laki-laki bernama Alfons dan seorang adik perempuan bernama Claire.\nSementara Al dan Cl adalah anak yatim piatu yang sudah ditinggalkan orangtuanya saat masih kecil. Saat Cl berumur lima belas tahun, orangtuanya meninggal karena serangan jantung. Setelah itu, mereka hidup tanpa keluarga sampai dua belas tahun berikutnya.\nHidup mereka sangat sederhana.",
            "choices": [
                " Tidak ada fasilitas mewah seperti rumah atau mobil layaknya orang normal lainnya. Keluarga Miki tinggal di sebuah apartemen kumuh di samping sungai.",
                " Miki dan Al terbiasa bekerja dan belajar sejak pagi hari. Keduanya tidak pernah mengeluh dan menyerah pada kehidupan.",
                " Orangtuanya meninggal dalam kecelakaan mobil akibat mabuk pada waktu muda. Mereka membesarkan mereka berdua seorang diri tanpa dukungan orangtua dan kerabat."
                ],
                "story_sequence": [
                    "Pada tahun 2050 di Kota Chelmsford, ada sepasang remaja, bernama Miki dan Alphonse. Miki memiliki seorang kakak laki-laki bernama Alfons dan seorang adik perempuan bernama Claire.\nSementara Al dan Cl adalah anak yatim piatu yang sudah ditinggalkan orangtuanya saat masih kecil. Saat Cl berumur lima belas tahun, orangtuanya meninggal karena serangan jantung. Setelah itu, mereka hidup tanpa keluarga sampai dua belas tahun berikutnya.\nHidup mereka sangat sederhana."
                ]
        }
    for result in generate_story_and_choices(story_sequence=story_continuations.sequence,selected_choice=story_continuations.choice,story_beginning=False):
        output = result
    return output

@app.post("/api/generate/image")
async def image(image_request: ImageRequestModel):
    try:
        if os.environ.get("DUMMY_IMAGE_GENERATION") == "1":
            dummy_image_path = os.path.join(os.path.dirname(__file__),"dummy_image.png")
            with open(dummy_image_path,"rb") as f:
                dummy_image = f.read()
            #convert to base64
            dummy_image_base64 = base64.b64encode(dummy_image)
            return [
                dummy_image_base64
            ]
        engine_id = "stable-diffusion-512-v2-1"
        url = f"https://api.stability.ai/v1/generation/{engine_id}/text-to-image"
        api_key = os.environ.get("DREAMSTUDIO_APIKEY")
        
        if api_key is None:
            raise HTTPException(status_code=500, detail="Dreamstudio API key not found")
        
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {api_key}"
        }

        json_body = {
            "height":image_request.height,
            "width":image_request.width,
            "text_prompts":[
                {
                    "text":image_request.positive_prompt,
                    "weight":1.0
                },
                {
                    "text":image_request.negative_prompt,
                    "weight":-1.0
                }
            ]
        }
        response = requests.post(url,headers=headers,json=json_body)
        print("Success generating image")

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=f"Error generating image: {response.text}")
        
        list_base64_images:List[str] = []
        for artifact in response.json()["artifacts"]:
            list_base64_images.append(artifact["base64"])

        return list_base64_images
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/api/translate_id_to_en")
async def translate_id_to_en(body:TranslationRequestModel):
    # Add your key and endpoint
    key = os.environ.get("AZURE_TRANSLATE_KEY")
    print(key)
    if key is None:
        raise HTTPException(status_code=500, detail="Azure Translate key not found")
    endpoint = "https://api.cognitive.microsofttranslator.com/translate"
    location = "eastus"

    params = {
        'api-version': '3.0',
        'from': 'id',
        'to': 'en'
    }

    headers = {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': str(uuid.uuid4())
    }

    body = [{
        'text': body.text
    }]

    request = requests.post(endpoint, params=params, headers=headers, json=body)
    if request.status_code != 200:
        raise HTTPException(status_code=request.status_code, detail=f"Error translating text: {request.text}")
    response = request.json()

    return response[0]["translations"][0]["text"]
