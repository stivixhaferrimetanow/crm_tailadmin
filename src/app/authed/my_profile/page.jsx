import React from 'react'
import { cookies } from 'next/headers'
import UiProfile from '@/components/ui/UiProfile'

const page = async () => {


    const cookieStore = cookies()
    const token = cookieStore.get('token')
   

    return(
        <div className='p-4'>
            <UiProfile/>
        </div>
    )
}

export default page