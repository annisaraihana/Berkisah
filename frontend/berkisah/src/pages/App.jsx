import './App.css'
import { Link } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../main';
import { toast } from 'react-toastify';
//import { PromptContext } from '../main';

function App() {
  const  {token, setToken} = useContext(TokenContext)
  //const {prompt, setPrompt} = useContext(PromptContext)
  const navigate = useNavigate()

  function logout() {
    setToken(null) 
    navigate('/login')
    //toast.error(token)
  }

  useEffect(() => {
    //toast.success(prompt)
    //toast.error(token)
    if (token === null) {
      navigate('/login')
    } else {
      //toast.success(token)
    }
  }, [])

  return (
    <div className='flex justify-center items-center xl:w-screen mx-auto'>
      <div className='flex relative'>
        <div className='z-40 static p-10 bg-[#EFEFEF] rounded-2xl overflow-hidden shadow-xl'>
          <div className="grid grid-flow-row-dense sm:grid-cols-2 items-center justify-center">
            <div className='flex justify-center items-center'>
              <img src='/src/assets/aset home.png' className='w-2/3 sm:mr-8'></img>
            </div>

            <div>
              <div className='grid grid-flow-row pb-5'>
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
                <button className="flex w-full" onClick={logout}>
                    Logout
                </button>
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
