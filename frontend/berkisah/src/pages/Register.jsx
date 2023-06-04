import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
const baseURL = 'http://127.0.0.1:5173/api';

export default function Register() {
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [validPassword, setValidPassword] = React.useState(null);
  
  function performRegister() {
    if (password === validPassword) {
      axios.post(`${import.meta.env.VITE_BASE_URL}/register`, {
        username: username,
        password: password
      }).then((response) => {
        console.log(response)
      })
    }
    else {
      res.send("Password tidak match")
    }
  }
  
  return (
        <div className='fixed left-0 right-0 top-0 px-[15vw] py-[15vh]'>
          <div className='flex relative'>
            <div className='z-40 static p-10 min-w-full md:w-[80vw] max-w-2xl bg-[#EFEFEF] rounded-2xl overflow-hidden shadow-xl'>
              <div className="items-center justify-center">
                <p className='text-hitam my-4'>Buat Akun Berkisah Anda</p>
                <form method="post" onSubmit={performRegister}>
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
                <div className='flex justify-center items-center mt-5'>
                        <Link to={"/"}>
                            <input type="submit" value="Daftar" className='flex w-full text-hitam bg-kuning border-2 border-[#A37C04] p-3 rounded-lg'
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