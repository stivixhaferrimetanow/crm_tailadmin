import React from 'react'
import EventForm from '@/components/ui/EventForm'
import Cal from '@/components/ui/Cal'
import { cookies } from 'next/headers';
import MyEvents from '@/components/ui/MyEvents';


const page = () => {


  const cookieStore = cookies()
  const token = cookieStore.get('user');
  const user = token.value;




  return (
    <div>
      <div className='flex items-start'>
        <div className='w-[33%] text-center flex justify-center'>
          <MyEvents   user={user && user} />
        </div>
        <div className='w-[33%] text-center flex justify-center'>
            <Cal/>
        </div>
        <div className='w-[33%] text-center flex justify-center'>
          <EventForm  user={user && user}  />
        </div>
      </div>
      
    </div>
  )
}

export default page