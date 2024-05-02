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
        <div>
            <div className='w-full my-4 flex '>
           

            </div>
    <table className="w-full text-sm text-left rtl:text-right text-white">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Emri</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Kosto</th>
            <th className="px-6 py-3">Min ne Stock</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Furnitori</th>
            
            </tr>
        </thead>
        <tbody className='bg-[#949494]'>
            
                {data && data.map((el , index) => {
                    return <tr className="btext-white uppercase bg-black dark:border-gray-700" key={index}>
                                <td className=' px-6 py-4'>
                                    {index + 1}
                                </td>
                                <td className=' px-6 py-4'>
                                    {el.name}
                                </td>
                                <td className=' px-6 py-4'>
                                    {el.stock} x
                                </td>
                                <td className=' px-6 py-4'>
                                    €{el.cost}
                                </td>
                                <td className=' px-6 py-4'>
                                    {el.min}
                                </td>
                                <td className='px-6 py-4'>
                                    {el.type?.toLowerCase()}
                                </td>
                                <td className='px-6 py-4'>
                                    {el.supplier}
                                </td>
                               
                             </tr>
                })}
            
           
            
        </tbody>
        </table>
        </div>
        
    )
}

export default WarehouseTable