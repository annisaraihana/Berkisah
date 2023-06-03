import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
const baseURL = 'http://127.0.0.1:5173/api';

export default function Login() {
    const [credentials, setCredentials] = React.useState(null);

    function performLogin(e) {
        axios.post(`${baseURL}/login`, {
          username: credentials.username,
          password: credentials.password
        }).then((response) => {
          setContent(response.data);
        });
    }

    return (
        
        <div className='fixed left-0 right-0 top-0 px-[15vw] py-[15vh]'>
          <div className='flex relative'>
            <div className='z-40 static p-10 min-w-full md:w-[80vw] max-w-2xl bg-[#EFEFEF] rounded-2xl overflow-hidden shadow-xl'>
              <div className="items-center justify-center">
                <p className='text-hitam my-4'>Masuk dengan Akun Berkisah Anda</p>
                <form onSubmit>
                    {/* Username */}
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
                </form>

                {/* Belum punya akun? */}
                <div className='flex justify-center items-center mt-5'>
                    <p className='text-hitam mr-2'>Belum punya akun?</p>
                    <Link to={"/register"}>
                        <p className='text-blue-500'>Daftar</p>
                    </Link>
                </div>

                {/* Masuk */}
                <div className='flex justify-center items-center mt-5'>
                    <Link to={"/"}>
                        <button className='flex w-full'>
                            Masuk
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