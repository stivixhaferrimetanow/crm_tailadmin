import React from 'react'
import AddCustomer from '@/components/ui/AddCustomer'
import LeadsTable from '@/components/ui/LeadsTable'
import LeadsExcel from '@/components/ui/LeadsExcel'


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
        Customers
        <br/>
       
            <AddCustomer/>
            <LeadsTable  data={data && data} />
            <LeadsExcel/>
      
    </div>
  )
}

export default page