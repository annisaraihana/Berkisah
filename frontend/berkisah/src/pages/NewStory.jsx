import './App.css'
import axios from "axios";
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import { PromptContext } from '../main';

function NewStory() {
  const {prompt, setPrompt} = useContext(PromptContext)
  const [customStory, setCustomStory] = useState("")
  const navigate = useNavigate()
  const [list_stories, setListStories] = useState([])
  //Request stories from backend in the beginning
  useEffect(() => {
    async function getStories() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/story_list`)
        if (response.status === 200) {
          setListStories(response.data)
        }
        else {
          toast.error("Gagal mendapatkan daftar cerita")
          console.log(response)
        }
      } catch (error) {
        toast.error("Gagal mendapatkan daftar cerita. Error : " + error)
        console.log(error)
      }
    }
    getStories()
  }, [])
  
  return (
    <div className='flex justify-center items-center min-h-[85vh] min-w-[85vw]'>
      <div className='grid grid-flow-row'>
        <h2 className='flex justify-center items-center text-kuning mb-10'>Pilih Cerita Baru</h2>

        <div className='grid grid-cols-1 sm:grid-cols-4 gap-8'>
          {list_stories.map((story) => {
            return (
              <div className=" hover:scale-110 transition-all max-w-xs rounded-lg overflow-hidden border-2 border-[#000000] bg-[#1D1D1D] shadow-xl">
                <img className="aspect-[4/3] w-full object-cover rounded" src={story.image} alt="robot"></img>
                <div className="px-6 py-4">
                  <div className="text-2xl mb-2">{story.title}</div>
                  <p className="text-sm">
                    {story.description}
                  </p>
                  <button onClick={()=>{
                  setPrompt(story.prompt)
                  //toast.success("Awalan cerita: " + prompt)
                  navigate("/main")
                }}>Pilih cerita</button>
                </div>
                
              </div>)
          })}
          <div className="max-w-xs rounded-lg overflow-hidden border-2 border-[#000000] bg-[#1D1D1D] shadow-xl">
                <img className="aspect-[4/3] w-full object-cover rounded" src={"src/assets/dummy.png"} alt="robot"></img>
                <div className="px-6 py-4">
                  <div className="text-2xl mb-2">Ada ide? Ketik di sini</div>
                  <textarea className="text-sm bg-[#1D1D1D] border-2 border-[#000000] rounded-lg w-full h-full" rows={5} placeholder="Ketik judul cerita" onChange={
                    (e) => {
                      setCustomStory(e.target.value)                      
                    }
                  }></textarea>
                  <button onClick={()=>{
                  setPrompt(customStory)
                  //toast.success("Awalan cerita: " + prompt)
                  navigate("/main")
                }}>Pilih cerita</button>

                </div>
          </div>



        </div>
      </div>
    </div>
  )
}

export default NewStory
