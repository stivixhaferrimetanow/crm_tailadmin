'use client'
import React , {useState , useEffect} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

const UiCustomers = ({data}) => {


    const [customers, setCustomers] = useState([]);
    const [leads, setLeads] = useState([]);

    const fetchUsers = () => {
        const filteredCustomers = data.filter((el) => el.lead_customer === true);
        const filteredLeads = data.filter((el) => el.lead_customer === false);

        setCustomers(filteredCustomers);
        setLeads(filteredLeads);
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    return(
        <div className='w-[95%] lg:flex lg:flex-row flex-col flex-row  gap-5 mx-auto bg-white my-2 p-3 rounded-lg shadow-lg'>
                <div className='lg:w-[33%] w-full my-5 lg:my-1 bg-[#E0E1E3] p-2 rounded-lg h-[80vh] overflow-y-scroll'>
                    <div className='flex gap-2 items-center py-3'>
                        <h2 className='text-xl pl-2 font-semibold'>Leads</h2>
                        <span className='bg-[#366FFF] text-[12px] p-1 rounded-full text-white'>{leads && leads.length}</span>
                    </div>

                    {leads && leads.map((el , index) => {
                        return  <div className='lead-card w-full my-2 rounded-lg shadow-lg p-3 bg-white'>
                        <div className='flex py-2 items-center'>
                            <div>
                            <Avatar>
                                <AvatarImage src="https://static.thenounproject.com/png/1743561-200.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            </div>
                            <div className='pl-3'>
                                <h2 className='font-semibold'>{el.name}</h2>
                                <span>{el.email}</span>
                            </div>
                        </div>
                        <hr />
                        <div className='py-1 flex items-center justify-end text-end w-full'>
                            <Link href={`customers/${el._id}`} className='text-[12px] px-4 py-2 bg-[#366FFF] mr-3 rounded-lg shadow-lg text-white cursor-autopointer'>View More</Link>
                        </div>
                    </div>
                    })}
                   
                </div>
                <div className='lg:w-[33%] w-full my-5 lg:my-1 bg-[#E0E1E3] p-2 rounded-lg h-[80vh] overflow-y-scroll'>
                    <div className='flex gap-2 items-center py-3'>
                        <h2 className='text-xl pl-2 font-semibold'>Customers</h2>
                        <span className='bg-[#366FFF] text-[12px] p-1 rounded-full text-white'>{customers && customers.length}</span>
                    </div>
                    {customers && customers.map((el , index) => {
                        return  <div className='lead-card w-full my-2 rounded-lg shadow-lg p-3 bg-white'>
                        <div className='flex py-2 items-center'>
                            <div>
                            <Avatar>
                                <AvatarImage src="https://static.thenounproject.com/png/1743561-200.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            </div>
                            <div className='pl-3'>
                                <h2 className='font-semibold'>{el.name}</h2>
                                <span>{el.email}</span>
                            </div>
                        </div>
                        <hr />
                        <div className='py-1 flex items-center justify-end text-end w-full'>
                            <Link href={`customers/${el._id}`} className='text-[12px] px-4 py-2 bg-[#366FFF] mr-3 rounded-lg shadow-lg text-white cursor-autopointer'>View More</Link>
                        </div>
                    </div>
                    })}
                   
                </div>
                <div className='lg:w-[33%] w-full my-5 lg:my-1 bg-[#E0E1E3] p-2 rounded-lg h-[80vh] overflow-y-scroll'>
                    <div className='flex gap-2 items-center py-3'>
                        <h2 className='text-xl pl-2 font-semibold'>Customers</h2>
                        <span className='bg-[#366FFF] text-[12px] p-1 rounded-full text-white'>25</span>
                    </div>
                </div>
            </div>
    )
}


export default UiCustomers