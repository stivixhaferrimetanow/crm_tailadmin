'use client'
import React , {useState , useEffect} from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GoDotFill } from "react-icons/go";
import { FaAddressBook } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import axios from 'axios'
import Link from 'next/link'

const page = ({params}) => {


    const id = params.slug;


    const [user, setUser] = useState([]);


    const [customers , setCustomers] = useState([]);



    const getCustomers = async () => {
        try{
            const res = await axios.get('http://localhost:3000/api/customers', {'cache':'no-store'});
            setCustomers(res.data.data)
        }catch(error){
            console.log(error)
        }
    }


    const fetchCustomer = async () => {
        try{
            const res = await axios.post('http://localhost:3000/api/customer',  {id: id} ,{'cache':'no-store'});
            setUser(res.data.data)
        }catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        fetchCustomer();
        getCustomers();
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
                        <h2 className="pl-2 font-semibold py-2 text-lg">{user && user.map((el) => {return el.name})}</h2>
                        <p className="text-gray-700 pl-2 py-1">{user && user.map((el) => {return el.primary_contact})}</p>
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
                        <h2 className="pl-2 font-semibold py-2 text-lg">{user && user.map((el) => {return el.email})}</h2>
                        {user && user.some((el) => el.active === 'active') && (
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
                        <h2 className="pl-2 font-semibold py-2 text-lg">{user && user.map((el) => {return el.address})}</h2>
                        <p className="text-gray-700 pl-2 py-1 flex items-center gap-2"><FaAddressBook /> Active</p>

                        <h2 className="pl-2 font-semibold py-2 text-lg">Country & City</h2>
                        <p className="text-gray-700 pl-2 py-1 flex items-center gap-2"><IoLocationSharp /> {user && user.map((el) => {return el.country})}/{user && user.map((el) => {return el.city})} </p>
                        
                        <h2 className="pl-2 font-semibold py-2 text-lg">ZIP CODE</h2>
                        <p className="text-gray-700 pl-2 py-1 flex items-center gap-2"><GoDotFill /> {user && user.map((el) => {return el.zip_code})}</p>
                    </div>
                </div>


            </div>
            <div className="w-[50%]">
            <table className="min-w-full mt-3 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th  scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th  scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
              
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers && customers.map((el , index) => {
                return <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{el.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`${el._id}`}>More</Link>
                </td>
                
              </tr>
            })}
          </tbody>
        </table>
    </div>
        </div>
    )
}


export default page