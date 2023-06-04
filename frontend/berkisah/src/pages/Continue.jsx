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

  getProgress();
  return (
    <div>
      <div className='grid grid-flow-row'>  
        <h2 className='justify-center items-center text-kuning mb-10'>Lanjutkan Cerita</h2>
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
          <div className="max-w-sm rounded-lg overflow-hidden border-2 border-[#000000] bg-[#1D1D1D] shadow-xl">
            <img className="aspect-[5/4] w-full object-cover rounded" src="https://images.pexels.com/photos/12258042/pexels-photo-12258042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="robot"></img>
            <div className="px-6 py-4">
              <div className="text-2xl mb-2">Judul</div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Continue
