import { useEffect } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import style_dict from '../assets/style.json'
import { ConfigurationsContext, TokenContext } from "../main";
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Settings() {
 //Read style.json
  const {configurations, setConfigurations} = useContext(ConfigurationsContext)
  const {token, setToken} = useContext(TokenContext)
  const navigate = useNavigate()
  return (
    <div className='flex items-center justify-center w-[85vw]'>
          <div className='flex relative'>
            <div className='z-40 static p-10 min-w-full md:w-[80vw] max-w-2xl bg-[#EFEFEF] rounded-2xl overflow-hidden shadow-xl'>
              <div className="items-center justify-center">

              <h2 className='flex items-center justify-center sm:justify-start mt-5 text-hitam'>Pengaturan</h2>
                
                {/* Username 
                <p className='text-hitam my-4'>Masuk dengan Akun Berkisah Anda</p>
                
                
                <h4 className=' text-hitam w-full text-left'>Profil Akun</h4>
                <p className=' text-hitam w-full text-left'>Username</p>
                <div className='items-center justify-center'>
                    <input type="text" placeholder="Username" className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500'></input>
                </div>
                <div className='h-6'></div>
                
                <p className=' text-hitam w-full text-left'>Password</p>
                <div className='items-center justify-center'>
                    <input type="password" placeholder="Password" className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500'></input>
                </div>

                <div className='h-6'></div>  */}

                {/* Konfigurasi Model */}
                <h4 className=' text-hitam w-full text-left'>Konfigurasi Model Teks</h4>
                <p className=' text-hitam w-full text-left'>Model yang digunakan</p>
                <div className='items-center justify-center'>
                    <select className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500' name='text_model' id='text_model'>
                        <option value="cahya/gpt2-small-indonesian-story" selected="selected">cahya/gpt2-small-indonesian-story</option>
                        <option value="cahya/gpt2-medium-indonesian-story">cahya/gpt2-medium-indonesian-story</option>
                        <option value="cahya/gpt2-large-indonesian-522M">cahya/gpt2-large-indonesian-522M</option>
                    </select>
                </div>
                <div className='h-6'></div>

                <div className='h-6'></div>
                {/* Konfigurasi Model */}
                <h4 className=' text-hitam w-full text-left'>Konfigurasi Model Gambar</h4>
                <p className=' text-hitam w-full text-left'>Model yang digunakan</p>
                <div className='items-center justify-center'>
                    <select className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500' name="image_model" id='image_model'>
                        <option value="stable-diffusion-v1-5">Stable Diffusion 1.5</option>
                        <option value="stable-diffusion-v2-1" selected="selected">Stable Diffusion 2 512</option>
                        <option value="stable-diffusion-768-v2-1">Stable Diffusion 2 768</option>
                        <option value="stable-diffusion-xl-beta-v2-2-2">Stable Diffusion XL</option>
                    </select>
                </div>
                <div className='h-6'></div>
                <p className=' text-hitam w-full text-left'><it>Art Style</it></p>
                <div className='items-center justify-center'>
                    <select className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500' name="artstyle" id='artstyle'>
                      {style_dict.map((style) => (
                        <option value={style.style_name}>{style.displayed_name}</option>
                      ))}
                    </select>
                </div>
                <div className='h-6'></div>

                {/* Masuk */}
                <div className='flex justify-center items-center mt-5'>
                    
                        <button className='flex w-full'
                        onClick={() => {
                          toast.success("Konfigurasi berhasil disimpan")
                          setConfigurations({
                            "text_model": document.getElementById('text_model').value,
                            "image_model": document.getElementById('image_model').value,
                            "image_artstyle": document.getElementById('artstyle').value
                          })
                          navigate("/")
                        }}>
                            Simpan
                        </button>

                </div>
              </div>
            </div>
            <div className='absolute min-w-full min-h-full p-10 bg-[#D0D0D0] rounded-2xl rotate-2'>
            </div>
          </div>
        </div> 
  )
}

export default Settings
