'use client'
import React , {useState , useEffect} from 'react'
import ProductCard   from './ProductCard'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from './button'
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import axios from 'axios'
  import {toast} from 'sonner'
  import { useRouter } from 'next/navigation'


import { useMyContext } from '@/app/context/context'



const ProductList = ({data , warehouse , stockData}) => {
    const { value, setValue } = useMyContext();
    const {newProdcution , setNewProduction} = useMyContext();

    
      
    
   

    const shto = async (id) => {
        try{
            const res = await axios.post('http://localhost:3000/api/addproduction', {_id: id} , {'cache': 'no-store'});
            toast('Product ready for production')
            localStorage.setItem('new', 'true');
            setNewProduction(true);
            window.location.reload();
        }catch(error){
            console.log(error)
        }
    }
    

    return(
        <div className='w-[95%] mx-auto'>
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emri</th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lloji</th>
                    
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kosto Materiali</th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kosto Prodhimi</th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kosto Totale</th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cmimi i Shitjes</th>
                    
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    
                        {data && data.map((el , index) => {
                            return <tr key={index}  >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            

                                            <Dialog>
                                            <DialogTrigger>
                                            {index + 1}
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                <DialogTitle>Image</DialogTitle>
                                                <DialogDescription>
                                                <img src={`${el.multimedia}`} className='w-full mx-auto' alt="" />
                                                </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                            </Dialog>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{el.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{el.type}</td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap">€
                                        
                                        {el.composition_cost}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">€{el.production_cost}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">€{el.total_cost}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">€{el.sales_cost}</td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap">
                                            <button className='px-4 py-1 rounded-md shadow-lg bg-black text-white' onClick={() => shto(el._id)}>Shto</button>
                                        </td> */}
                                     </tr>
                        })}
                    
                   
                    
                </tbody>
                </table>
        </div>
    )
}

export default ProductList