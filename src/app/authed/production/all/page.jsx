import React from 'react'
import { cookies } from 'next/headers'
import ProductList from '@/components/ui/ProductionList'
import Tremor from '@/components/ui/Tremor'
import SecondTremor from '@/components/ui/SecondTremor'

const page = async () => {


    const cookieStore = cookies()
    const token = cookieStore.get('token')

    const fetchProducts = async () => {
        try{
            const res = await fetch(`http://localhost:3000/api/getproduction` , { cache: 'no-store' });
            
            return res.json()
        }catch(error){
            console.log(error)
        }
    }


    const data = await fetchProducts()

     const fetchWarehouse = async () => {
        try{
            const res = await fetch(`http://localhost:3000/api/warehouse` , { cache: 'no-store' });
            
            const data = await res.json();
            return data
        }catch(error){
            console.log(error)
        }
    }
    


    const getStock = async () => {
        try{
            const res = await fetch(`http://localhost:3000/api/getstock`, { cache: 'no-store' });
            const data = await res.json();
            return data
        }catch(error){
            console.log(error)
        }
    }

    const stockData = await getStock()
    const warehouse = await fetchWarehouse()
    
    return(
        <div>
           
            
            <ProductList  data={data.data && data.data} stockData={stockData.data && stockData.data} warehouse={ warehouse.data && warehouse.data} />
            <br />
            <div className='w-full gap-3 flex'>
                <div className='w-[50%] bg-black rounded-lg'>
                    <SecondTremor/>
                </div>
                <div className=' w-[50%] rounded-lg' >
                    <Tremor/>
                </div>
            </div>
            
           
        </div>
    )
}


export default page