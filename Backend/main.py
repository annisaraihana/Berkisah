from model import model, tokenizer, generate_story_and_choices
from fastapi import FastAPI
from body_model import StoryContinuations, StoryIntro
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/generate/intro")
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

@app.post("/generate/story")
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