'use client'
import React , {useState , useEffect} from 'react'
import { CiSearch } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMyContext } from '@/app/context/context';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import axios from 'axios'
  import { FaCartFlatbed } from "react-icons/fa6";
  

const Navbar = ({myData}) => {

  const myUsername = localStorage.getItem('username')
  const [store , setStore] = useState([]);

  const {newProduction , setNewProduction} = useMyContext();

  useEffect(() => {
    if(localStorage.getItem('new') == 'true' || newProduction == true){
      setStore(true)
    }
    else if(localStorage.getItem('new') == 'false'){
      setStore(false)
    }
  },[newProduction])


  const logout = async () => {
      try{
        const res = await axios.post(`http://localhost:3000/api/logout`);
        console.log(res);
        localStorage.setItem('user', '');
        localStorage.setItem('username', '');
        localStorage.setItem('id', '');
        localStorage.setItem('items', '')
      }catch(error){
        console.log(error)
      }
  }

  const username  = localStorage.getItem('username');
  const id = localStorage.getItem('id')

  return (
    <div className='lg:w-full xl:w-full w-full justify-end flex bg-black'>
        <div className='lg:w-[50%] xl:w-[50%] hidden lg:flex xl:flex p-2'>
                <div className='w-[60%] items-center flex px-2 py-2 bg-gray-100 rounded-lg'>
                    <CiSearch />
                    <input type="text" placeholder='Search...' className='px-2 ml-2  bg-gray-100 text-black outline-none' />
                </div>
        </div> 
        <div className='w-[50%] p-2 flex justify-end items-center'>
          
          <div className='px-4'>


          <Popover>
  <PopoverTrigger>
  {store == true ?
            
            (  <button className="inline-block relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
    <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-green-400 bg-green-600" />
  </button>)
          
          :
          
            (
              <button className="inline-block relative">
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6 text-white"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
  />
</svg>
</button>

            )
          
          }
  </PopoverTrigger>
  <PopoverContent>
    <Link className='flex items-center gap-2' href={`/authed/production/all`}>
      <FaCartFlatbed />
      <span className='text-gray-400 text-sm'>Produkt i ri ne Production</span>
          
    </Link>
    <hr className='text-gray-500 mt-2 w-[90%] mx-auto' />
  </PopoverContent>
</Popover>
            
        

          </div>
            <div className='px-4'>
                <h2 className="text-white">{myUsername ? myUsername.toUpperCase() : 'User'}</h2>
            </div>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer mr-5">
        <AvatarImage src="" />
        <AvatarFallback className="" color="white">
            <h2 className="text-black">{ myUsername ? myUsername.charAt(0).toUpperCase() : "A"}</h2>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          
          My Account
        
          </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
          <Link href={'/authed/my_profile'}>
            Profile</Link>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
         
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <p onClick={logout}>Log out</p>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
    </div>
  )
}

export default Navbar