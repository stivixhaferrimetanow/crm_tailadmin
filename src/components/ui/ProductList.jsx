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
        <div>
                <table class="table-auto rounded-lg p-2 shadow-lg w-full">
                <thead className='bg-black   text-white '>
                    <tr>
                    <th>ID</th>
                    <th>Emri</th>
                    <th>Lloji</th>
                    
                    <th>Kosto Materiali</th>
                    <th>Kosto Prodhimi</th>
                    <th>Kosto Totale</th>
                    <th>Cmimi i Shitjes</th>
                    <th>Production</th>
                    </tr>
                </thead>
                <tbody className='bg-black  p-2 text-white '>
                    
                        {data && data.map((el , index) => {
                            return <tr key={index}  >
                                        <td className='justify-center text-center py-4'>
                                            

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
                                        <td className='justify-center text-center'>{el.name}</td>
                                        <td className='justify-center text-center'>{el.type}</td>
                                        
                                        <td className='justify-center text-center'>€
                                        
                                        {el.composition_cost}
                                        </td>
                                        <td className='justify-center text-center'>€{el.production_cost}</td>
                                        <td className='justify-center text-center'>€{el.total_cost}</td>
                                        <td className='justify-center text-center'>€{el.sales_cost}</td>
                                        <td className='justify-center text-center'>
                                            <button className='px-4 py-1 rounded-md shadow-lg bg-black text-white' onClick={() => shto(el._id)}>Shto</button>
                                        </td>
                                     </tr>
                        })}
                    
                   
                    
                </tbody>
                </table>
        </div>
    )
}

export default ProductList