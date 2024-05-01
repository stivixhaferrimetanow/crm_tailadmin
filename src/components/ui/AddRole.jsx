'use client'
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { toast } from "sonner"

const AddRole = ({token}) => {

    const [title , setTitle] = useState('');


    const handleClick = async () => {
        try{
            const res = await axios.post(`http://localhost:3000/api/addrole` , {title: title});
            setTitle('')
            if(res.status == 200){
                toast("Role added successfully")
            }
        }catch(error){
            toast("Error adding role")
        }
    }


  return (
    <div className='w-[90%] mx-auto mt-2 shadow-md p-4 rounded-lg bg-black'>
              <div>
                <label htmlFor="" className='text-white'>Add Role</label>
                <br />
                <br />
                <input type="text" placeholder='Role here' value={title} onChange={(e) => setTitle(e.target.value)} className="px-1 py-2 rounded-lg shadow-sm focus:outline-none w-full" />
                <button className='bg-white text-black my-4 w-full rounded-lg px-1 py-2' onClick={handleClick}>SUBMIT</button>
              </div>
          </div>
  )
}

export default AddRole