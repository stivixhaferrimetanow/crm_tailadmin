'use client'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { useMyContext } from '@/app/context/context';
import { GrClose } from "react-icons/gr";

const Sidebar = ({role}) => {

    const { value, setValue } = useMyContext();

    const [store , setStore] = useState();



    useEffect(() => {
        console.log('Checking localStorage');
        let local = localStorage.getItem('new');
        console.log('localStorage value:', local);
        if(local){
            console.log('Setting store:', local);
            setStore(local)
        } 
    }, []);


    const handleClick = () => {
        setValue(!value)
    }
  return (
    <div className={  value == true ? `bg-black w-full p-3 h-screen ml-[100%]  xl:ml-0 lg:ml-0  transition-all 2s ease-in-out relative` : `bg-black w-full p-3 h-screen ml-[-100%] xl:ml-0 lg:ml-0 transition-all 2s ease-in-out relative` }>
             <GrClose className='lg:hidden xl:hidden cursor-pointer absolute mt-6 mr-4 top-0 right-0' color='white' fontSize="25px" onClick={handleClick} />
             <div className='w-full  flex items-center h-[50px] '>
                <div className='w-full'>
                    <Link href={'/authed/feed'}>
                    <img src="/10.svg" alt="" />
                    </Link>
                </div>
                
            </div>
            <br/>
        <div>
        <Accordion type="single" collapsible className="w-full">
      

      <AccordionItem value="item-1" >
        <AccordionTrigger className="text-white border-0 hover:border-0 hover:underline-offset-0  h-[50px]" >
            <div className='w-full flex items-center'>
                <div className='w-[10%]'>
                    <img src="/4.svg" alt="" />
                </div>
                <div className='w-[80%]'>
                    <h3 className='text-lg text-start pl-5 '>Dashboard</h3>
                </div>
                <div className='w-[10%]'></div>
            </div>
        </AccordionTrigger>

        <AccordionContent className="text-white ">
        <div className='w-full flex items-center'>
            <div className='w-[30%]'>
                
            </div>
            <div className='w-[70%] flex items-center gap-2'>
                <Link href={'/authed/feed'} className='flex'>
                    <h3 className='text-[16px] pt-3 '>- Overview</h3>
                    <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
                </Link>
                
            </div> 
          
        </div>
        </AccordionContent>
        {role == 'admin' ? 
        
        (null)
        :
        (null)
        }
         {role == 'admin' ? 
        
        (<AccordionContent className="text-white ">
        <div className='w-full flex items-center'>
            <div className='w-[30%]'>
                
            </div>
            <div className='w-[70%] flex items-center gap-2'>
                <Link href={'/authed/feed/customers'} className='flex'>
                    <h3 className='text-[16px] pt-3 '>- Customers</h3>
                    <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
                </Link>
                
            </div> 
          
        </div>
        </AccordionContent>)
        :
        (null)
        }
            
            
            <AccordionContent className="text-white ">
            <div className='w-full flex items-center'>
                <div className='w-[30%]'>
                    
                </div>
                <div className='w-[70%] flex'>
                <Link href={'/authed/feed/tasks'} className='flex'>
                    <h3 className='text-[16px] pt-3'>- Tasks</h3>
                    <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
                    </Link>
                </div>
              
            </div>
            </AccordionContent>
            
        
      </AccordionItem>


      <AccordionItem value="item-2" >
        <AccordionTrigger className="text-white border-0 hover:border-0 hover:underline-offset-0  " >
            <div className='w-full flex items-center'>
                <div className='w-[10%]'>
                    <img src="/2.svg" alt="" />
                </div>
                <div className='w-[80%]'>
                    <h3 className='text-lg text-start pl-5'>Calendar</h3>
                </div>
                <div className='w-[10%]'></div>
            </div>
        </AccordionTrigger>
        {role == 'admin' 
        
        ? 
            (<AccordionContent className="text-white ">
            <div className='w-full flex items-center'>
                <div className='w-[30%]'>
                    
                </div>
                <div className='w-[70%] flex'>
                <Link href={'/authed/calendar/progress'} className='flex'>
                    <h3 className='text-[16px] pt-3'>- Progress</h3>
                    <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
                    </Link>
                </div>
              
            </div>
        </AccordionContent>)
        :
            (null)
        }
        
        <AccordionContent className="text-white ">
            <div className='w-full flex items-center'>
                <div className='w-[30%]'>
                    
                </div>
                <div className='w-[70%] flex'>
                <Link href={'/authed/calendar/events'} className='flex'>
                    <h3 className='text-[16px] pt-3'>- Events</h3>
                    </Link>
                </div>
              
            </div>
        </AccordionContent>

      
      </AccordionItem>



      {/* <AccordionItem value="item-3" >
        <AccordionTrigger className="text-white border-0 hover:border-0 hover:underline-offset-0  h-[50px]" >
            <div className='w-full flex items-center'>
                <div className='w-[10%]'>
                    <img src="/1.svg" alt="" />
                </div>
                <div className='w-[80%] text-start pl-5'>
                    <h3 className='text-lg'>All Tasks</h3>
                </div>
                <div className='w-[10%]'></div>
            </div>
        </AccordionTrigger>
        {role == 'admin' 
        
        
        ? 
            ( <AccordionContent className="text-white h-[50px]">
            <div className='w-full flex items-center'>
                <div className='w-[30%]'>
                    
                </div>
                <div className='w-[70%] flex'>
                <Link href={'/authed/tasks/list'} className='flex'>
                    <h3 className='text-[16px] pt-3'>- List</h3>
                    <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
                    </Link>
                </div>
              
            </div>
        </AccordionContent>)
        :

            (null)
        }
       
        <AccordionContent className="text-white h-[50px]">
            <div className='w-full flex items-center'>
                <div className='w-[30%]'>
                    
                </div>
                <div className='w-[70%] flex'>
                    <Link href={'/authed/tasks/mytasks'} className='flex'>
                    <h3 className='text-[16px] pt-3'>- My Tasks</h3>
                    </Link>
                </div>
              
            </div>
        </AccordionContent>
      </AccordionItem> */}




      {/* <AccordionItem value="item-4" >
        <AccordionTrigger className="text-white border-0 hover:border-0 hover:underline-offset-0  h-[50px]" >
            <div className='w-full flex items-center'>
                <div className='w-[10%]'>
                    <img src="/5.svg" alt="" />
                </div>
                <div className='w-[80%] text-start pl-5'>
                    <h3 className='text-lg'>Analytics</h3>
                </div>
                <div className='w-[10%]'></div>
            </div>
        </AccordionTrigger>
        {role == 'admin'
        
        ? 
        (<AccordionContent className="text-white h-[50px]">
        <div className='w-full flex items-center'>
            <div className='w-[30%]'>
                
            </div>
            <div className='w-[70%] flex'>
                <Link href={'/authed/analytics/charts'} className='flex'>
                <h3 className='text-[16px] pt-3'>- Charts</h3>
                <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
                </Link>
            </div>
          
        </div>
    </AccordionContent>)
        :
        (null)
        }
        
        <AccordionContent className="text-white h-[50px]">
            <div className='w-full flex items-center'>
                <div className='w-[30%]'>
                    
                </div>
                <div className='w-[70%] flex'>
                    <Link href={`/authed/analytics/mydata`}>
                    <h3 className='text-[16px] pt-3'>- My Data</h3>
                    </Link>
                </div>
              
            </div>
        </AccordionContent>
      </AccordionItem> */}

    {role == 'admin' &&
     (<AccordionItem value="item-5" >
     <AccordionTrigger className="text-white border-0 hover:border-0 hover:underline-offset-0  h-[50px]" >
         <div className='w-full flex items-center'>
             <div className='w-[10%]'>
                 <img src="/7.svg" alt="" />
             </div>
             <div className='w-[80%] text-start pl-5'>
                
                 <h3 className='text-lg'>Sales</h3>
                 
             </div>
             <div className='w-[10%]'></div>
         </div>
     </AccordionTrigger>
    
     <AccordionContent className="text-white h-[50px]">
         <div className='w-full flex items-center'>
             <div className='w-[30%]'>
                 
             </div>
             <div className='w-[70%] flex'>
                 <Link href={`/authed/sales/invoices`} className='flex'>
                 <h3 className='text-[16px] pt-3'>- Invoices</h3>
                 <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
                 </Link>
             </div>
           
         </div>
     </AccordionContent>
     {/* <AccordionContent className="text-white h-[50px]">
         <div className='w-full flex items-center'>
             <div className='w-[30%]'>
                 
             </div>
             <div className='w-[70%] flex'>
                 <Link href={`/authed/sales/items`} className='flex' >
                 <h3 className='text-[16px] pt-3'>- Drafts</h3>
                 <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
                 </Link>
             </div>
           
         </div>
     </AccordionContent> */}
   
     <AccordionContent className="text-white h-[50px]">
         <div className='w-full flex items-center'>
             <div className='w-[30%]'>
                 
             </div>
             <div className='w-[70%] flex'>
                 <Link href={`/authed/sales/proposals`} className='flex'>
                 <h3 className='text-[16px] pt-3'>- Estimates</h3>
                 <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
                 </Link>
             </div>
           
         </div>
     </AccordionContent>
    

   </AccordionItem>)
     }
      


     <AccordionItem value="item-6" >
        <AccordionTrigger className="text-white border-0 hover:border-0 hover:underline-offset-0  h-[50px]" >
            <div className='w-full flex items-center'>
                <div className='w-[10%]'>
                    <img src="/8.svg" alt="" />
                </div>
                <div className='w-[80%] text-start pl-5'>
                    
                    <h3 className='text-lg'>Warehouse</h3>
                    
                </div>
                <div className='w-[10%]'></div>
            </div>
        </AccordionTrigger>
        {role == 'admin' 
        
        ?
        ( <AccordionContent className="text-white h-[50px]">
        <div className='w-full flex items-center'>
            <div className='w-[30%]'>
                
            </div>
            <div className='w-[70%]'>
                <Link href='/authed/warehouse/dashboard' className='flex'>
            <h3 className='text-[16px] pt-3'>- Produktet</h3>
            <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
            </Link>
            </div>
          
        </div>
    </AccordionContent>)
        :
        (null)
        }
         {role == 'admin' 
        
        ?
        ( <AccordionContent className="text-white h-[50px]">
        <div className='w-full flex items-center'>
            <div className='w-[30%]'>
                
            </div>
            <div className='w-[70%]'>
                <Link href='/authed/warehouse/addsingel' className='flex'>
            <h3 className='text-[16px] pt-3'>- Shto</h3>
            <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
            </Link>
            </div>
          
        </div>
    </AccordionContent>)
        :
        (null)
        }
       
      </AccordionItem>
      



      <AccordionItem value="item-7" >
        <AccordionTrigger className="text-white border-0 hover:border-0 hover:underline-offset-0  h-[50px]" >
            <div className='w-full flex items-center'>
                <div className='w-[10%]'>
                    <img src="/9.svg" alt="" />
                </div>
                <div className='w-[80%] text-start pl-5'>
                    <h3 className='text-lg'>Products</h3>
                </div>
                <div className='w-[10%]'></div>
            </div>
        </AccordionTrigger>
        <AccordionContent className="text-white h-[50px]">
            <div className='w-full flex items-center'>
                <div className='w-[30%]'>
                    
                </div>
                <div className='w-[70%] flex'>
                    <Link href={`/authed/products/all`}>
                    <h3 className='text-[16px] pt-3'>- Produktet</h3>
                    </Link>
                </div>
              
            </div>
        </AccordionContent>
        {role == 'admin'
        
        
            ? 

                (  <AccordionContent className="text-white h-[50px]">
                <div className='w-full flex items-center'>
                    <div className='w-[30%]'>
                        
                    </div>
                    <div className='w-[70%] flex'>
                        <Link href={`/authed/products/add`} className='flex'>
                        <h3 className='text-[16px] pt-3'>- Shto</h3>
                        <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
                        </Link>
                    </div>
                  
                </div>
            </AccordionContent>)
            :

                (null)
        }
      
      </AccordionItem>



      <AccordionItem value="item-8" >
        <AccordionTrigger className="text-white border-0 hover:border-0 hover:underline-offset-0  h-[50px]" >
            <div className='w-full flex items-center'>
                <div className='w-[10%]'>
                    <img src="/13.svg" alt="" />
                </div>
                <div className='w-[80%] flex text-start pl-5'>
                    
                    <h3 className='text-lg'>Production</h3>

                    
                   
                </div>
                <div className='w-[10%]'></div>
            </div>
        </AccordionTrigger>
        <AccordionContent className="text-white h-[50px]">
                <div className='w-full flex items-center'>
                    <div className='w-[30%]'>
                        
                    </div>
                    <div className='w-[70%] flex'>
                        <Link href={`/authed/production/all`} className='flex'>
                        <h3 className='text-[16px] pt-3'>- All</h3>
                        <span className='mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}></span>
                        </Link>
                    </div>
                  
                </div>
            </AccordionContent>
        <AccordionContent className="text-white h-[50px]">
                <div className='w-full flex items-center'>
                    <div className='w-[30%]'>
                        
                    </div>
                    <div className='w-[70%] flex'>
                        <Link href={`/authed/products/add`} className='flex'>
                        <h3 className='text-[16px] pt-3'>- Overview</h3>
                        <span className='bg-[#3C50E0] mt-3 ml-2 text-[10px]' style={{display: 'inline-block'}}>Admin</span>
                        </Link>
                    </div>
                  
                </div>
            </AccordionContent>
        
      </AccordionItem>


     

     
      
    </Accordion>
        </div>
    </div>
  )
}

export default Sidebar