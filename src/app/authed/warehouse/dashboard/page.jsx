import React from 'react'
import { cookies } from 'next/headers'
import ProductList from '@/components/ui/ProductList'
import WarehouseTable from '@/components/ui/WarehouseTable'



export const dynamic = "force-dynamic"

const page = async () => {


    const cookieStore = cookies()
    const token = cookieStore.get('token')

    const fetchProducts = async () => {
        try{
            const res = await fetch(`http://localhost:3000/api/warehouse` , {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                    'cache': 'no-store'
                  },
            });

            return res.json()
        }catch(error){
            console.log(error)
        }
    }


    const data = await fetchProducts();


        
    return(
        <div>
            
            
            <WarehouseTable  data={data && data.data} tpken={token && token} />
           
        </div>
    )
}


export default page