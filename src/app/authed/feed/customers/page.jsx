import React from 'react'
import AddCustomer from '@/components/ui/AddCustomer'
import LeadsTable from '@/components/ui/LeadsTable'
import LeadsExcel from '@/components/ui/LeadsExcel'

import UiCustomers from '@/components/ui/UiCustomers'

const page =  async () => {



    const getData = async () => {
        try{
            const res = await fetch(`http://localhost:3000/api/customers`, {'cache': 'no-store'});
            const data = await res.json();
            return data.data;
            
        }catch(error){  
            console.log(error)
        }
    }

    const data = await getData()
    

  return (
    <div>
        
        <br/>
       
            {/* <AddCustomer/>
            <LeadsTable  data={data && data} />
            <LeadsExcel/> */}
            <div className='w-[95%] my-3 mx-auto'>
                Shtoni Nje Lead
                <AddCustomer/>
            </div>
            <div className='w-[95%] my-3 mx-auto'>
                Shtoni Leads me file CSV
                <LeadsExcel/>
            </div>
            <UiCustomers  data={data} />
           
            
      
    </div>
  )
}

export default page