'use client'
import React , {useState , useEffect} from 'react'
import axios from 'axios'

export const dynamic = 'force-dynamic'

const WarehouseTable = ({data , token}) => {


    const [products , setProducts] = useState([]);


    useEffect(() => {
       
        setProducts(data);
    },[])



    


    



    return(
        <div className='w-[95%] mx-auto '>
            <div className=' mx-auto my-4 flex '>
           

            </div>
            <div className='h-[80vh] overflow-y-scroll'>
            <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
            <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emri</th>
            <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kosto</th>
            <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min ne Stock</th>
            <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Furnitori</th>
            
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
            
                {data && data.map((el , index) => {
                    return <tr  key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {el.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {el.stock} x
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    €{el.cost}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {el.min}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {el.type?.toLowerCase()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {el.supplier}
                                </td>
                               
                             </tr>
                })}
            
           
            
        </tbody>
        </table>
            </div>
    
        </div>
        
    )
}

export default WarehouseTable