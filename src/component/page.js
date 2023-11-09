"use client"
// import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')




const login = async (username, password) => {
  const apiUrl = 'https://api.denzo.io/api/cus/v1/login';
  const headers = { 'Accept': 'application/json' };
  const data = {
    username,
    password,
    store_id: 10,
  };

  try {
    const response = await axios.post(apiUrl, data, { headers });
    return response.data; 
  } catch (error) {
    
    console.error('Login failed:', error);
    throw error;
  }
};

const handleLogin = async () => {
  try {
    const response = await login(username, password);
   
    console.log('Logged in successfully:', response);
    if (response) {
      const router = useRouter();
      router.push('./homepage');
    }
  } catch (error) {
    
    setErrorMessage('Login failed. Please check your credentials.');
  }
};

  // console.log(username,password);

  return (
    <main className="flex h-screen items-center justify-center ">
      <div>
        <h1 className='text-center text-4xl font-extralight'>WELCOME</h1>
        <div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" >
              Email
            </label>
            <input
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
              type="name"
              id="userName"
              name="userName"
              className="w-full px-3 py-2 border rounded-md text-black"
              placeholder="name or number"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2" >
              Password
            </label>
            <input
             onChange={(e)=>setPassword(e.target.value)}
             value={password}
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md text-black"
              placeholder="********"
            />
          </div>
          <div>
            {/* <Link href='/homepage'> */}
            <button
            onClick={handleLogin}
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-full hover:bg-blue-600"
            >
              Login
            </button>
            {/* </Link> */}
          </div>
        </form>
        </div>
      </div>
    </main>
  )
}