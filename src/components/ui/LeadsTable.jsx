'use client'
import React, { useEffect, useState }  from 'react'
import { Switch } from "@/components/ui/switch"
import axios from 'axios'



const LeadsTable = ({data}) => {

    const [myArray , setMyArray] = useState([]);
    const [enable , setEnable] = useState(false)

    const handleChange = (value, id) => {
       
        const index = myArray.findIndex(obj => obj.id === id);
        const newObj = {
            id: id,
            value: value
        };
        if (index !== -1) {
            setMyArray(prevArray => {
                const newArray = [...prevArray];
                newArray[index] = newObj;
                return newArray;
            });
        } else {
            setMyArray(prevArray => [...prevArray, newObj]);
        }
    };

    const handleClick = () => {
        setEnable(!enable)
    }
   
    const [leads , setLeads ] = useState([]);

    useEffect(() => {
        setLeads(data);
    },[])
    


    const saveData = async () => {
        try{
            const res = await axios.post(`http://localhost:3000/api/updateleads`, {array : myArray});
            console.log(res)
        }catch(error){
            console.log(error)
        }
    }


    const showCustomers = () => {
        const filteredLeads = data.filter((el) => el.lead_customer == true);
        setLeads(filteredLeads)
    }

    const showLeads = () => {
        const filteredLeads = data.filter((el) => el.lead_customer == false);
        setLeads(filteredLeads)
    }


    const showAll = () => {
        setLeads(data)
    }
    return(
        <div className='mt-5'>
        <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left p-2 rounded-lg shadow-lg rtl:text-right text-white dark:text-gray-400 overflow-x-scroll">
            <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr className=''>
                <th scope="col" className="px-6 py-3 ">
                ID
                </th>
                <th scope="col" className="px-6 py-3 ">
                Customer Full Name
                </th>
                <th scope="col" className="px-6 py-3 ">
                Primary Contact
                </th>
                <th scope="col" className="px-6 py-3 ">
                Email
                </th>
                <th scope="col" className="px-6 py-3">
                Phone
                </th>
                <th scope="col" className="px-6 py-3">
                Active
                </th>
                <th scope="col" className="px-6 py-3 ">
                Edit
                </th>

            </tr>
            </thead>
            <tbody>
                {leads && leads.map((el , index) => {
                    return <tr className="btext-white uppercase border-b-[1px] border-white bg-black dark:border-gray-700 transition-all 0.2s ease-in-out hover:bg-gray-700 " key={index}>
                    <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white "
                    >
                    {index + 1}
                    </th>
                    <td className="px-6 py-4 ">{el.name}</td>
                    <td className="px-6 py-4 ">{el.primary_contact}</td>
                    <td className="px-6 py-4 ">{el.email}</td>
                    <td className="px-6 py-4 ">{el.phone && el.phone}</td>
                    <td className="px-6 py-4 ">{el.lead_customer && el.lead_customer == true ? 'Customer' : 'Lead'}</td>
                    {enable == true ? (<td className='px-6 py-4'>
                    {el.lead_customer && el.lead_customer == true ? 
                    
                    (<></>)
                    
                    :
                    
                    (   <select style={{cursor: 'no-drop'}} disabled onChange={(e) => handleChange(e.target.value , el._id)} className='w-full  bg-black text-white focus:outline-none'>
                            
                        <option value='false'>Lead</option>
                        <option value='true'>Customer</option>
                    </select>)
                    }
                        
                    </td>) : (<td className='px-6 py-4'>
                    {el.lead_customer && el.lead_customer == true ? 
                    
                    (<></>)
                    
                    :
                    
                    (   <select onChange={(e) => handleChange(e.target.value , el._id)} className='w-full  bg-black text-white focus:outline-none'>
                            
                        <option value='false'>Lead</option>
                        <option value='true'>Customer</option>
                    </select>)
                    }
                        
                    </td>)}
                    
                </tr>
                } )}
            
           
            
          
            </tbody>
        </table>
        <div className='flex gap-4 items-center '>
           

            <button className='bg-black my-2 px-4 text-white rounded-sm cursor-pointer py-2' onClick={saveData}  >

                Save
            </button>

            <button className='bg-black my-2 px-4 text-white rounded-sm cursor-pointer py-2' onClick={showCustomers}  >
                Only Customers
            </button>

            <button className='bg-black my-2 px-4 text-white rounded-sm cursor-pointer py-2' onClick={showLeads}  >
                Only Leads
            </button>


            <button className='bg-black my-2 px-4 text-white rounded-sm cursor-pointer py-2' onClick={showAll}  >
                Show All
            </button>
            
        </div>
        </div>
    </div>
    )
}


export default LeadsTable