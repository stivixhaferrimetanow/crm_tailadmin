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
    <Carousel>
      <CarouselContent>
        {data && data.map((el , index) => {
          return <CarouselItem  key={index} className="cursor-pointer" >
            <div className='bg-black p-5 rounded-xl shadow-lg text-white'>
              <h2>{el.date && el.date}</h2>
              <p>
                {el.description && el.description}
              </p>
              
            </div>
          </CarouselItem>
        })}
        
        
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  )
}

export default MyEvents