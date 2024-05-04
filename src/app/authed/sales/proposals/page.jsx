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
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Type
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      More
                    </th>

                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                      {proposals && proposals.map((el , index) => {
                        return  <tr  key={index}>
                        <th
                        className="px-6 py-4 whitespace-nowrap"
                        >
                        {index + 1}
                        </th>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {el.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {el.client_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {el.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {el.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {el.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap" >
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