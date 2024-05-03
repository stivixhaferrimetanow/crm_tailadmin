import React from 'react'
import ProposalForm from '@/components/ui/ProposalForm'
import Link from 'next/link'



const page = async () => {


  const getData = async () => {
    try{
        const res = await fetch(`http://localhost:3000/api/customers`, {'cache': 'no-store'});
        const data = await res.json();
        return data.data;
        
    }catch(error){  
        console.log(error)
    }
}

const fetchProducts = async () => {
  try{
      const res = await fetch(`http://localhost:3000/api/products` , { cache: 'no-store' });
      const data = await res.json()
      return data.data
  }catch(error){
      console.log(error)
  }
}


const fetchWarehouse = async() => {
  try{
    const res = await fetch(`http://localhost:3000/api/warehouse` , { cache: 'no-store' });
    const data = await res.json();
    return data.data;
  }catch(error){
    console.log(error)
  }
}



const getProposals = async () => {
  try{
    const res = await fetch(`http://localhost:3000/api/getproposals` ,{'cache': 'no-store'});
    const data = await res.json();
    return data.data;
  }catch(error){
    console.log(error)
  }
}


const customers = await getData()
const products = await fetchProducts();
const warehouse = await fetchWarehouse();
const proposals = await getProposals()


  return (
    <div>
     <div className='my-5'>
            <div className="relative rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                    ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Subject
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Client Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      More
                    </th>

                </tr>
                </thead>
                <tbody>
                      {proposals && proposals.map((el , index) => {
                        return  <tr className="bg-black uppercase border-b-[1px] border-white transition-all 0.2s ease-in-out hover:bg-gray-800 text-white " key={index}>
                        <th
                        scope="row"
                        className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                        >
                        {index + 1}
                        </th>
                        <td className="px-6 py-4">
                          {el.subject}
                        </td>
                        <td className="px-6 py-4">
                          {el.client_type}
                        </td>
                        <td className="px-6 py-4">
                          {el.email}
                        </td>
                        <td className="px-6 py-4">
                          {el.phone}
                        </td>
                        <td className="px-6 py-4">
                          {el.status}
                        </td>
                        <td className="px-6 py-4 " >
                          <Link   href={`/authed/sales/proposals/${el._id}`} >View</Link>
                        </td>
                    </tr>
                      })}
                       
                   
                
               
                
              
                </tbody>
            </table>
            </div>
      </div>
      
      <ProposalForm    customers={customers && customers} products={products && products} warehouse={warehouse && warehouse}  />


      
    </div>
  )
}

export default page