'use client';
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { toast } from "sonner"
import { Card } from '@tremor/react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { RiContactsBookUploadLine } from 'react-icons/ri';


  


export default function UsersCount({number}) {


    const handleClick = async () => {
        try{
            const res = await axios.post(`http://localhost:3000/api/adduser` , 
            {
                name: name,
                email: email,
                password: password,
                role: role,   
            });
            setName('');
            setEmail('')
            setPassword('')
            setRole('');
            if(res.status == 200){
                toast("User added successfully")
            }
            
        }catch(error){
            toast("Error")
            console.log(error)
        }
    }
  
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [role , setRole] = useState('');
    const [roles , setRoles] = useState([])

    const getRoles = async () => {
        try{
            const res = await axios.get(`http://localhost:3000/api/getroles`);
            const data = await res.data;
            console.log(data , 'data roles')
            setRoles(data.data);
        }catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        getRoles();
    },[])


  return (
    <>
      <div class="p-5 bg-white rounded-lg shadow-lg w-[90%] mx-auto">
				<div class="text-base text-gray-400 ">Total Users</div>
				<div class="flex items-center pt-1">
					<div class="text-2xl font-bold text-gray-900 ">{number && number}</div>
					
                    <AlertDialog>
                    <AlertDialogTrigger>
                    <span class="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600 cursor-pointer bg-green-100 rounded-full">
                        <span>Add+</span>
					</span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Create a User</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="py-2">
                                <input type="text" className="px-1 py-2 rounded-xl shadow-sm focus:outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Full Name' />
                            </div>
                            <div className="py-2">
                                <input type="text" className="px-1 py-2 rounded-xl shadow-sm focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email' />
                            </div>
                            <div className="py-2">
                                <input type="text" className="px-1 py-2 rounded-xl shadow-sm focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password' />
                            </div>
                            <div className="py-2">
                                <select name="" id="" onChange={(e) => setRole(e.target.value)} className="px-1 py-2 rounded-xl shadow-sm focus:outline-none w-full">
                                    <option>Select a role</option>
                                    {roles && roles.map((el , index) => {
                                        return <option  key={index} value={el.title} >{el.title}</option>
                                    } )}
                                </select>
                                
                            </div>
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        
                        <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
				</div>
			</div>
    </>
  );
}