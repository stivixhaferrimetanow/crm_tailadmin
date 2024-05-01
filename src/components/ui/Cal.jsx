'use client'
import { Calendar } from "@/components/ui/calendar"
import React , {useEffect , useState} from 'react'


const Cal = () => {


    const [date, setDate] = useState(new Date())
    return(
        <div className="flex items-center ">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md bg-black  mx-auto text-white border shadow"
                />
        </div>
    )
}

export default Cal