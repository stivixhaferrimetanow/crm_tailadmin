'use client'
import {useState , useEffect} from 'react'
import axios from 'axios'
import { FaTrashAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";


const UiProfile = () =>{


    function clearAllCookies() {
      
        Cookies.remove('token');
        Cookies.remove('user');
      }
    const id = localStorage.getItem('id');

    const [data , setData] = useState([])

    const getUser = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/mydata', { id: id }, { 'cache': 'no-store' });
            const myData = res.data.data; 
            setData(myData[0]);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    useEffect(() => {
        getUser();
    },[])

    return(
        <div className='w-full'>
             <div className='w-[90%] mx-auto p-5 bg-white rounded-md'>
            <h2 className='text-xl font-semibold'>My Profile</h2>
            
            <br/>
            <br/>
            <div className='flex flex-col'>
                <label htmlFor="">My Username:</label>
                <input
                    type="text"
                    required
                    value={data.name && data.name}
                    placeholder="Sales Cost here..."
                    className="w-full my-2 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="">My email:</label>
                <input
                    type="text"
                    required
                    value={data.email && data.email}
                    placeholder="Sales Cost here..."
                    className="w-full my-2 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="">My Role:</label>
                <input
                    type="text"
                    required
                    value={data.role && data.role}
                    placeholder="Sales Cost here..."
                    className="w-full my-2 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="">Account Created at:</label>
                <input
                    type="text"
                    required
                    value={data.createdAt && data.createdAt.substring(0 , 10)}
                    placeholder="Sales Cost here..."
                    className="w-full my-2 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>

            <div className='flex flex-col'>
                
                <button
                    required
                    value={data.createdAt && data.createdAt.substring(0 , 10)}
                    placeholder="Sales Cost here..."
                    className="w-full flex items-center text-center justify-center gap-3 bg-red-900 text-white my-2 rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                    <FaTrashAlt />
                    DELTE ACCOUNT</button>
            </div>
            <div className='flex flex-col'>
               
                <button
                    required
                    onClick={clearAllCookies}
                    value={data.createdAt && data.createdAt.substring(0 , 10)}
                    placeholder="Sales Cost here..."
                    className="w-full flex items-center text-center justify-center gap-3 bg-blue-800 text-white my-2 rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                    <CiLogout />
                    LOG OUT</button>
            </div>
        </div>


        <div className='w-[90%] mt-[5%] mx-auto p-5 bg-white rounded-md'>
            <h2 className='text-xl font-semibold'>Ndrysho Passwording</h2>
            
            <br/>
            <br/>
            <div className='flex flex-col'>
                <label htmlFor="">My Username:</label>
                <input
                    type="text"
                    required
                    value={data.name && data.name}
                    placeholder="Sales Cost here..."
                    className="w-full my-2 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            
            

            <div className='flex flex-col'>
                
                <button
                    required
                    value={data.createdAt && data.createdAt.substring(0 , 10)}
                    placeholder="Sales Cost here..."
                    className="w-full flex items-center text-center justify-center gap-3 bg-black text-white my-2 rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                    CHANGE PASSWORD</button>
            </div>
            
        </div>
        </div>
       
    )
}

export default UiProfile