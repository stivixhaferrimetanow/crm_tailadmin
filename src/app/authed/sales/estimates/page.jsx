import React from 'react'
import EstimateList from '@/components/ui/EstimateList'
import EstimateForm from '@/components/ui/EstimateForm'



const page = async () => {


  const getCustomers = async () => {
    try{
      const res = await fetch(`http://localhost:3000/api/customers` , {'cache' : 'no-store'});
      const data = await res.json();
      return data.data
    }catch(error){
      console.log(error)
    }
  }


  const getAgents = async () => {
    try{
      const res = await fetch(`http://localhost:3000/api/agents` , {'cache' : 'no-store'});
      const data = await res.json();
      return data.data
    }catch(error){
      console.log(error)
    }
  }

  const getProducts = async () => {
    try{
      const res = await fetch(`http://localhost:3000/api/products` , {'cache' : 'no-store'});
      const data = await res.json();
      return data.data;
    }catch(error){  
      console.log(error)
    }
  }

  const customers = await getCustomers();
  const agents = await getAgents();
  const items = await getProducts()

  return (
    <div>
      Estimates
      <br />
      <br />
      <EstimateForm   customers={customers && customers} agents={agents && agents} items={items && items} />
      <br />
      
      <div  className='flex   items-center' >
          <EstimateList/>
      </div>
    </div>
  )
}

export default page