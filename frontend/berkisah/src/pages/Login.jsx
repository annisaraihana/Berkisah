import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = React.useState(null)
    const [password, setPassword] = React.useState(null)

    function performLogin() {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_BASE_URL}/login`, {
          username: username,
          password: password
        }).then((response) => {
          console.log(response);
        });
    }

    return (
        
        <div className='fixed left-0 right-0 top-0 px-[15vw] py-[15vh]'>
          <div className='flex relative'>
            <div className='z-40 static p-10 min-w-full md:w-[80vw] max-w-2xl bg-[#EFEFEF] rounded-2xl overflow-hidden shadow-xl'>
              <div className="items-center justify-center">
                <p className='text-hitam my-4'>Masuk dengan Akun Berkisah Anda</p>
                <form method="post" onSubmit={performLogin}>
                    {/* Username */}
                    <p className=' text-hitam w-full text-left'>
                        <label for="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username" 
                            value={username}
                            className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500'
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
                            className='w-full p-2 text-hitam bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </p>

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
                            <input type="submit" value="Masuk" className='flex w-full text-hitam bg-kuning border-2 border-[#A37C04] p-3 rounded-lg'
                            />
                        </Link>
                    </div>
                </form>
              </div>
            </div>
            <div className='absolute min-w-full min-h-full p-10 bg-[#D0D0D0] rounded-2xl rotate-2'>
            </div>
          </div>
        </div>  
    )

}