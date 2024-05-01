'use client'
import React, {useState , useEffect} from 'react'
import axios from 'axios'
import { toast } from "sonner"


const EventForm = ({user }) => {


    const [date , setDate] = useState('');
    const [description , setDescription] = useState('')

    const handleChange = (val) => {
        setDate(val)
    }


    const handleSubmit = async () => {
        try{
            const res = await axios.post(`http://localhost:3000/api/dayoff` ,{user: user , date: date , description: description})
            if(res.status == 200){
                toast('Event saved successfully');
            }
            setDate('');
            setDescription('');
        }catch(error){
            console.log(error)
            toast('Error saving event')
            
        }
    }


    return(
        <div className='w-[80%] mx-auto rounded-lg shadow-lg p-4 text-start  bg-black'>
            <div>
                <h3 className='text-white'>User's Email:</h3>
                <input type="text" value={user && user} className='w-full my-2 rounded-md px-1 py-2 focus:outline-none' readOnly style={{cursor:'no-drop'}} />
            </div>
            <div>
                <h3 className='text-white'>Date:</h3>
                <input type="date" value={date} onChange={(e) => handleChange(e.target.value)}  className='w-full my-2 rounded-md px-1 py-2 ' />
            </div>
            <div>
                <h3 className='text-white'>Details:</h3>
                <textarea rows='5' placeholder='Short description here...' value={description} onChange={(e) => setDescription(e.target.value)}  className='w-full my-2 rounded-md px-1 py-2 ' ></textarea>
            </div>
            <div>
                <button onClick={handleSubmit}  className='w-full my-2 rounded-md bg-white text-black px-1 py-2 ' >SUBMIT</button>
            </div>
        </div>
    )
}


export default EventForm

