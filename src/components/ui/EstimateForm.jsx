'use client'
import React , {useState , useEffect} from 'react'
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import axios from 'axios'
  import {toast} from 'sonner'


const EstimateForm = ({customers , agents , items}) => {



    const fetchCustomers = async () => {
        try{
            
        }catch(error){
            
            console.log(error)
        }
    }

    const [countries , setCountries] = useState([]);

    const getCountries = async () => {
        try{
            const res = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');
            setCountries(res.data);
            console.log(res.data, 'sssss')
        }catch(error){
            console.log(error)
        }
    }


    





    useEffect(() => {
        fetchCustomers();
        getCountries();
    },[])
  return (
    <div className='pl-2'>
        

          <Sheet>
  <SheetTrigger>
  <Button variant="outline" className="text-white bg-black hover:bg-black hover:text-white">
            Add Estimate
          </Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>Customer</label>
            <select name="" className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' id="">
                {customers && customers.map((el , index) => {
                    return <option value="" key={index}>{el.name}</option>
                })}
                
            </select>
        </div>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>Street</label>
            <input type="text" className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' />
        </div>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>City</label>
            <input type="text" className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' />
        </div>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>Zip Code</label>
            <input type="text" className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' />
        </div>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>Country</label>
            <select name="" className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' id="">
                {countries && countries.map((el , index) => {
                    return <option value="">{el.name.common}</option>
                })}
                
            </select>
        </div>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>Estimate Number</label>
            <input type="date" className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' />
        </div>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>Expiry Date</label>
            <input type="date" className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' />
        </div>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>Currency</label>
            <select name="" className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' id="">
                <option value="€">€</option>
                <option value="$">$</option>
            </select>
        </div>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>Status</label>
            <select name="" className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' id="">
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Expired">Expired</option>
                <option value="Declined">Declined</option>
                <option value="Accepted">Accepted</option>
            </select>
        </div>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>Sale Agent</label>
            <select name="" className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' id="">
                {agents && agents.map((el) => {
                    return <option value="">{el.name}</option>
                })}
                
                
            </select>
        </div>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>Discount Type</label>
            <select name="" className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' id="">
                <option value="no_discount">No Discount</option>
                <option value="after_tax">After Tax</option>
                <option value="before_tax">Before Tax</option>
            </select>
        </div>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>Admin Note</label>
            <textarea type="date" rows='3' className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' ></textarea>
        </div>
        <div className='my-1'>
            <label htmlFor="" className='my-2'>Item</label>
            <select name="" className='w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black' id="">
                {items && items.map((el , index) => {
                    return <option value="no_discount" key={index}>
                        <div className='flex w-full px-1 py-2 rounded-md border border-1 border-black focus:outline-none focus:border-black'>
                            <div className='w-[80%]'>{el.name}</div>
                            <div className='w-[20%] pl-2'>
                                <button>ADD+</button>
                            </div>
                        </div>
                    </option>
                })}
                
                
            </select>
        </div>
        
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </div>
  )
}

export default EstimateForm