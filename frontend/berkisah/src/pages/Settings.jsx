import './App.css'
import { Link } from 'react-router-dom'

function Settings() {

  return (
    <div className='flex justify-center items-center xl:w-screen mx-auto'>
          <div className='flex relative'>
            <div className='z-40 static p-10 w-full md:w-[80vw] max-w-2xl bg-[#EFEFEF] rounded-2xl overflow-hidden shadow-xl'>
              <div className="items-center justify-center">

              <h2 className='flex items-center justify-center sm:justify-start mt-5 text-hitam'>Pengaturan</h2>
                <p className='text-hitam my-4'>Masuk dengan Akun Berkisah Anda</p>
                
                {/* Username */}
                <h4 className=' text-hitam w-full text-left'>Profil Akun</h4>
                <p className=' text-hitam w-full text-left'>Username</p>
                <div className='items-center justify-center'>
                    <input type="text" placeholder="Username" className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500'></input>
                </div>
                <div className='h-6'></div>
                {/* Password */}
                <p className=' text-hitam w-full text-left'>Password</p>
                <div className='items-center justify-center'>
                    <input type="password" placeholder="Password" className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500'></input>
                </div>

                <div className='h-6'></div>
                {/* Konfigurasi Model */}
                <h4 className=' text-hitam w-full text-left'>Konfigurasi Model Teks</h4>
                <p className=' text-hitam w-full text-left'>Model yang digunakan</p>
                <div className='items-center justify-center'>
                    <select className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500'></select>
                </div>
                <div className='h-6'></div>

                <div className='h-6'></div>
                {/* Konfigurasi Model */}
                <h4 className=' text-hitam w-full text-left'>Konfigurasi Model Gambar</h4>
                <p className=' text-hitam w-full text-left'>Model yang digunakan</p>
                <div className='items-center justify-center'>
                    <select className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500'></select>
                </div>
                <div className='h-6'></div>
                <p className=' text-hitam w-full text-left'><it>Art Style</it></p>
                <div className='items-center justify-center'>
                    <select className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500'></select>
                </div>
                <div className='h-6'></div>

                {/* Masuk */}
                <div className='flex justify-center items-center mt-5'>
                    <Link to={"/"}>
                        <button className='flex w-full'>
                            Simpan
                        </button>
                    </Link>
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
