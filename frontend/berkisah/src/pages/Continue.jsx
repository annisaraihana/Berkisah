import './App.css'
import React from "react"
import axios from "axios";
import { useContext } from "react";
import { TokenContext } from '../main'

function Continue() {
  const {token, setToken} = useContext(TokenContext)
  const [listProgress, setListProgress] = React.useState([])

  async function getProgress() {
    console.log(token)
    if (listProgress == null) await axios.post(`${import.meta.env.VITE_BASE_URL}/get_progress`, {
      token: token
    }).then((response) => setListProgress(response.data))
    console.log(listProgress)
  }

  async function loadProgress(){
    
  }

  getProgress();
  return (
    <div>
      <div className='grid grid-flow-row'>  
        <h2 className='justify-center items-center text-kuning mb-10'>Lanjutkan Cerita</h2>
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
          <div className="max-w-sm rounded-lg overflow-hidden border-2 border-[#000000] bg-[#1D1D1D] shadow-xl">
          {listProgress.map((story) => {
            return (
              <div className=" hover:scale-110 transition-all max-w-xs rounded-lg overflow-hidden border-2 border-[#000000] bg-[#1D1D1D] shadow-xl">
                  <div className="px-6 py-4">
                  <p className="text-sm">
                    {story}
                  </p>
                  <button onClick={()=>{
                    loadProgress()
                }}>Pilih cerita</button>
                </div>
                
              </div>)
          })}
        </div>

      </div>
    </div>
    </div>
  )
}

export default Continue
