import React from 'react'
import ProductForm from '@/components/ui/ProductForm'
import { cookies } from 'next/headers'

const page = async () => {


    const cookieStore = cookies()
    const token = cookieStore.get('token')


    const getStock = async () => {
        try{
            const res = await fetch(`http://localhost:3000/api/getstock`, { cache: 'no-store' });
            const data = await res.json();
            return data
        }catch(error){
            console.log(error)
        }
    }

    const stockData = await getStock();

    return(
        <div className='w-full'>   
            <ProductForm  token={token && token} stockData={stockData.data && stockData.data} />
        </div>
    )
}


export default page