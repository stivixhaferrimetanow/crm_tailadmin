import React from 'react'
import { cookies } from 'next/headers';
import WarehouseChart from '@/components/ui/WarehouseChart';
import SuppliersChart from '@/components/ui/SuppliersChart';
import { PieChart } from '@/components/ui/PieChart';


const page = async () => {

  const cookieStore = cookies()
  const token = cookieStore.get('token')

  const fetchProducts = async () => {
      try{
          const res = await fetch(`http://localhost:3000/api/warehouse`);
          
          return res.json()
      }catch(error){
          console.log(error)
      }
  }




  const fetchWarehouseAnalytics = async () => {
    try{
      const res = await fetch(`${process.env.DOMAIN}/api/warehouseanalytics`);
      return res.json()
    }catch(error){
      console.log(error)
    }
  }

  const warehouseData = await fetchWarehouseAnalytics();
 
  const data = await fetchProducts()


  return (
    <div>
        <div className='flex gap-3'>
          <div className='w-[50%] pt-[5%]'>
            <WarehouseChart   warehousedata={warehouseData.data} sum={warehouseData.totalCost} />
          </div>
          <div className='w-[50%] pt-[5%]'>
            <PieChart/>
          </div>
          
        </div>
    </div>
  )
}

export default page