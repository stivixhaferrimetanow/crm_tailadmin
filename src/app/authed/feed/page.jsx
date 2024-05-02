
import React from 'react'
import Cal from '@/components/ui/Cal'
import Resize from '@/components/ui/Resize'
import { cookies } from 'next/headers'
import Checker from '@/components/ui/Checker'
import { FaArrowTrendUp } from "react-icons/fa6";
import UsersTable from '@/components/ui/UsersTable'
import Additional from '@/components/ui/Additional'
import  Chart  from '@/components/ui/Chart'
import Preview from '@/components/ui/Preview'


const page = async ({myData}) => {
  const cookieStore = cookies();

  cookieStore.getAll().map((el) => {
    console.log(el)
  })










  return (
    <>
    
    <div className='w-full'>
      <div className='w-full p-5 lg:flex xl:flex lg:flex-row xl:flex-row flex-col '>
        <div className='lg:w-[30%] flex justify-start xl:w-[66%] w-full'>
          <Chart/>
        </div>

        <div className='lg:w-[30%] text-center justify-center xl:w-[33%] w-full'>
            <Additional/>
        </div>
       
        <div className='lg:w-[30%] pt-6 xl:w-[33%] w-full'>
          <Cal/>
        </div>
      </div>

      <div className='w-[95%] p-5 mx-auto my-3'>
        <Preview/>
      </div>

    
      <div className='w-[95%] my-5 lg:my-1 mx-auto flex items-center p-1'>
        <UsersTable/>
      </div>
    </div>
    </>
   
  )
}

export default page



