'use client'
import React , {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'



const SingelForm = ({token}) => {

    const router = useRouter();
    const [body , setBody] = useState({
        name:'',
        stock: 0,
        cost: 0,
        min: 0,
        supplier: '',
    })

    const handleSubmit  = async () => {
        try{
            const res = await axios.post(`http://localhost:3000/api/addwarehouse`, body , {
                headers: {
                    'Authorization': `${token && token}`
                }
            }<{cache: 'no-store'});
            if(res.status == 200){
               
                router.push('http://localhost:3000/authed/warehouse/dashboard')
            }
            console.log(res);
        }catch(error){
            console.log(error)
        }
    }
    return(
        <div className='w-[95%] mx-auto bg-white p-5 rounded-md flex  mt-5'>
            <div className='w-full'>
                <div className='flex gap-3 items-center'>
                    <div className='w-[50%]'>
                    <div className='pt-2'>
                    <label htmlFor="name"  className="mb-1 block text-base font-medium text-[#07074D]">
                        Product Name
                    </label>
                    <br/>
                    <input type="text" value={body.name}   onChange={(e) => setBody({...body , name: e.target.value})}
                    className="w-full w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                    </div>
                    <div className='w-[50%]'>
                    <div className='pt-2'>
                    <label htmlFor="number" className="mb-1 block text-base font-medium text-[#07074D]">
                        Quantity in Stock
                    </label>
                    <br/>
                    <input type="number" value={body.stock} onChange={(e) => setBody({...body , stock: e.target.value})}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                    </div>
                </div>
               

               <div className='flex gap-3 items-center'>
                <div className='w-[50%]'>
                <div className='pt-2'>
                    <label htmlFor="name" className="mb-1 block text-base font-medium text-[#07074D]">
                        Cost in €:
                    </label>
                    <br/>
                    <input type="number" value={body.cost} onChange={(e) => setBody({...body , cost: e.target.value})}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                </div>
                <div className='w-[50%]'>
                <div className='pt-2'>
                    <label htmlFor="name" className="mb-1 block text-base font-medium text-[#07074D]">
                        Min Stock:
                    </label>
                    <br/>
                    <input type="number" value={body.min} onChange={(e) => setBody({...body , min: e.target.value})}
                     className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                </div>
               </div>
               
                
                
                <div className='pt-2'>
                    <label htmlFor="name" className="mb-1 block text-base font-medium text-[#07074D]">
                        Supplier:
                    </label>
                    <br/>
                    <input type="text" value={body.supplier} onChange={(e) => setBody({...body , supplier: e.target.value})}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                <div className='pt-5'>
                    
                <button  onClick={handleSubmit} className="hover:shadow-form w-full rounded-md bg-[#366FFF] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Submit
                </button>
                </div>
            </div>
            
            
        </div>
    )
}


export default SingelForm;
