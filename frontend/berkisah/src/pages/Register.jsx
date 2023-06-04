import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
const baseURL = 'http://127.0.0.1:5173/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate   } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validPassword, setValidPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const navigate = useNavigate();

  async function performRegister() {
    setIsLoading(true)
    if (username === "" || password === "" || validPassword === "") {
        toast.error("Mohon isi semua field")
        setIsLoading(false)
        return
        }
    if (password === validPassword) {
      try {
        
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, {
          username: username,
          password: password
        })

        if (response.status === 200) {
          toast.success("Berhasil mendaftar")
          setIsLoading(false)
          navigate('/')
          return
        }
        else {
          //If response status 400, get error detail properties from body
          toast.error("Gagal mendaftar : " + response.data.detail??response.data.message)

        }
      } catch (error) {
        toast.error("Gagal mendaftar : " + error.response.data.detail??error.response.data.message)
        console.log(error)

      } finally{
        setIsLoading(false)
        return
      }
    }
    else {
      toast.error("Password tidak sama")
      setIsLoading(false)
      return
    }
  }
  
  return (
        <div className='fixed left-0 right-0 top-0 px-[15vw] py-[15vh]'>
          <div className='flex relative'>
          <ToastContainer/>
            <div className='z-40 static p-10 min-w-full md:w-[80vw] max-w-2xl bg-[#EFEFEF] rounded-2xl overflow-hidden shadow-xl'>
              <div className="items-center justify-center">
                <p className='text-hitam my-4'>Buat Akun Berkisah Anda</p>
                
                {/* Username */}
                <p className=' text-hitam w-full text-left'>
                        <label for="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username" 
                            value={username}
                            className='w-full p-2 mb-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500'
                            onChange={e => setUsername(e.target.value)}
                        />
                    </p>
                {/* Password */}
                <p className=' text-hitam w-full text-left'>
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password} 
                            className='w-full p-2 mb-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </p>
                {/* Password */}
                <p className=' text-hitam w-full text-left'>
                        <label for="password">Ulangi Password</label>
                        <input
                            type="password"
                            id="validpassword"
                            placeholder="Ulangi Password"
                            value={validPassword} 
                            className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500'
                            onChange={e => setValidPassword(e.target.value)}
                        />
                    </p>
                

              {/* Daftar */}
              {isLoading ?(
                <ClipLoader color="#10B981" loading={isLoading} size={50} />
              ): (
              <div className='flex justify-center items-center mt-5'>
                <button onClick={performRegister}>
                  <p className='text-hitam text-center'>Daftar</p>
                </button>
              </div>)
              }
            
              </div>
            </div>
            <div className='absolute min-w-full min-h-full p-10 bg-[#D0D0D0] rounded-2xl rotate-2'>
            </div>
          </div>
        </div>  
    );

}