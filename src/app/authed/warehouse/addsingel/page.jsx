import React from 'react'
import SingelForm from '@/components/ui/SingelForm'
import { cookies } from 'next/headers'
import ExcelForm from '@/components/ui/ExcelForm'

const page = () => {


    const cookieStore = cookies()
    const token = cookieStore.get('token')




    return(
        <div>
            <SingelForm   token={token} />
            <ExcelForm/>
        </div>
    )
}


export default page