'use client'
import React , {useState , useEffect} from 'react'
import {toast} from 'sonner'
import axios from 'axios'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const MyEvents = ({user}) => {



    const id = localStorage.getItem('id')
    const [data , setData] = useState([])

    const fetchData =  async () => {
        try{
            const res = await axios.post(`http://localhost:3000/api/myevents` , {id: id});
            setData(res.data.data);
           
        }catch(error){
            
            console.log(error)
        }
    }


    useEffect(() => {
        fetchData()
    },[])

  return (
    <div className='mt-5 w-[80%] mx-auto'>
    {data && data.map((el , index) => {
          return <div  key={index} className="cursor-pointer my-2 transition-all 0.2s ease-in-out hover:rotate-[2deg]" >
            <div className='bg-black p-5 rounded-xl shadow-lg text-white'>
              <h2>{el.date && el.date}</h2>
              <p>
                {el.description && el.description}
              </p>
              
            </div>
          </div>
        })}
    </div>
  )
}

export default MyEvents