'use client'
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
const page = () => {
  const router = useRouter()
  const [body, setBody] = useState({
    name: '',
    email: '',
    password: ''
  });


 

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/register`, body , {
        headers: {
          "cache":"no-store"
        }
      });
      localStorage.setItem('username', res.data.data.name);
      localStorage.setItem('id', res.data.data._id);
      localStorage.setItem('user', res.data.data.email)
      if(res.status == 200){
        router.push('/authed/feed')
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='bg-black lg:h-screen h-[100vh]'>



<section className=" dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a
      href="#"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <img
        className="w-[80%]"
        src="/10.svg"
        alt="logo"
      />
      
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create and account
        </h1>
        <div className="space-y-4 md:space-y-6" >
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your Full Name
        </label>
        <input
          type="text"

          value={body.name}
          onChange={(e) => setBody({ ...body, name: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John Doe"
        
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          value={body.email}
          onChange={(e) => setBody({ ...body, email: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="johndoe@gmail.com"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={body.password}
          onChange={(e) => setBody({ ...body, password: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-[#1C2434] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Create an account
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <a
          href="#"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Login here
        </a>
      </p>
    </div>
      </div>
    </div>
  </div>
</section>


    </div>
  )
}

export default page