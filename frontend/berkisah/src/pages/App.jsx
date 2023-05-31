import './App.css'
import { Link } from "react-router-dom";

function App() {

  return (
    <div className='flex justify-center items-center xl:w-screen mx-auto'>
      <div className='flex relative'>
        <div className='z-40 static p-10 bg-[#EFEFEF] rounded-2xl overflow-hidden shadow-xl'>
          <div className="grid grid-flow-row-dense sm:grid-cols-2 items-center justify-center">
            <div className='flex justify-center items-center'>
              <img src='src\assets\aset home.png' className='w-2/3 sm:mr-8'></img>
            </div>

            <div>
              <div className='grid grid-flow-row pb-5'>
                <Link to={"/login"}>
                  <div className='flex items-center justify-center sm:justify-end'>
                    <p className='text-hitam mr-2 sm:mr-5'>Masuk</p>
                    <button className="relative w-8 h-8 rounded-full flex justify-center items-center text-center p-5 shadow-xl">
                    </button>
                  </div>
                </Link>
                <div>
                  <h2 className='flex items-center justify-center sm:justify-start mt-5 text-hitam'>Berkisah</h2>
                  <p className='flex items-center justify-center sm:justify-start text-hitam'>Rangkai kisahmu di sini!</p>
                </div>
              </div>

              <div className='sm:mb-20'>
                <Link to={"/newstory"}>
                  <button className='flex w-full'>
                    Cerita Baru
                  </button>
                </Link>
                <Link to={"/continue"}>
                  <button className="flex w-full" >
                    Lanjutkan Cerita
                  </button>
                </Link>
                <Link to={"/settings"}>
                  <button className="flex w-full">
                    Pengaturan
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='absolute min-w-full min-h-full p-10 bg-[#D0D0D0] rounded-2xl rotate-2'>
        </div>
      </div>
    </div>
  )
}

export default App
