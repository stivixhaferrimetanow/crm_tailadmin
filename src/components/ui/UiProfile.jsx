'use client'
import {useState , useEffect} from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import { GoDotFill } from "react-icons/go";
import { FaAddressBook } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import axios from 'axios'

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
            setData(myData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    useEffect(() => {
        getUser();
    },[])

    return(
        <div className="w-[95%] flex  mx-auto gap-5 my-2">
            <div className="w-[50%]">


                <div className="bg-white my-3 rounded-lg shadow-lg overflow-hidden">
                    <div className="  bg-[#FAFAFA] flex p-3 items-center">
                        <div className="w-[50%] gap-3 pl-2 relative text-start flex items-center justify-start">
                        <Avatar>
                        <AvatarImage src="https://static.thenounproject.com/png/1743561-200.png" />
                        <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                            <h2 className="font-semibold pl-1">Profile</h2>
                            
                        </div>
                        <div className="w-[50%] text-end flex items-center justify-center">
                            <p className="text-gray-700">Joined 2024/22/01</p>
                        </div>
                    </div>
                    <div className="p-3 bg-white">
                        <h2 className="pl-2 font-semibold py-2 text-lg">{data && data.map((el) => {return el.name})}</h2>
                        <p className="text-gray-700 pl-2 py-1">{data && data.map((el) => {return el.primary_contact})}</p>
                    </div>
                </div>


                <div className="bg-white my-3 rounded-lg shadow-lg overflow-hidden">
                    <div className="  bg-[#FAFAFA] flex p-3 items-center">
                        <div className="w-[50%] gap-3 pl-2 relative text-start flex items-center justify-start">
                        
                            <h2 className="font-semibold pl-1">Email:</h2>
                            
                        </div>
                        <div className="w-[50%] text-end flex items-center justify-center">
                           
                        </div>
                    </div>
                    <div className="p-3 bg-white">
                        <h2 className="pl-2 font-semibold py-2 text-lg">{data && data.map((el) => {return el.email})}</h2>
                        {data && data.some((el) => el.active === 'active') && (
                        <p className=" pl-2 py-1 flex items-center gap-2 text-[#20A863]">
                            <GoDotFill /> Active
                        </p>
                        )}
                    </div>
                </div>

                <div className="bg-white my-3 rounded-lg shadow-lg overflow-hidden">
                    <div className="  bg-[#FAFAFA] flex p-3 items-center">
                        <div className="w-[50%] gap-3 pl-2 relative text-start flex items-center justify-start">
                        
                            <h2 className="font-semibold pl-1">Address</h2>
                            
                        </div>
                        <div className="w-[50%] text-end flex items-center justify-center">
                           
                        </div>
                    </div>
                    <div className="p-3 bg-white">
                        <h2 className="pl-2 font-semibold py-2 text-lg">{data && data.map((el) => {return el.address})}</h2>
                        <p className="text-gray-700 pl-2 py-1 flex items-center gap-2"><FaAddressBook /> Active</p>

                        <h2 className="pl-2 font-semibold py-2 text-lg">Country & City</h2>
                        <p className="text-gray-700 pl-2 py-1 flex items-center gap-2"><IoLocationSharp /> {data && data.map((el) => {return el.country})}/{data && data.map((el) => {return el.city})} </p>
                        
                        <h2 className="pl-2 font-semibold py-2 text-lg">ZIP CODE</h2>
                        <p className="text-gray-700 pl-2 py-1 flex items-center gap-2"><GoDotFill /> {data && data.map((el) => {return el.zip_code})}</p>
                    </div>
                </div>


            </div>
            <div className="w-[50%]">
            
    </div>
        </div>
       
    )
}

export default UiProfile