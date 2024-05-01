'use client'
import React , {useState , useEffect} from 'react'
import axios from 'axios'


const TaskForm = ({users}) => {

    const [title , setTitle] = useState('');
    const [members , setMembers] = useState([]);
    const [dueDate , setDueDate] = useState('');
    const [description , setDescription] = useState('');
    const [current_date , setCurrentDate] = useState('')
    

  
    const handleSubmit = async () => {
      
        try{
            const res = await axios.post(`http://localhost:3000/api/addtask`, {
                title,
                members,
                current_date,
                dueDate,
                description,
            });
           console.log(res)
        }catch(error){
            console.log(error)
        }
    }


   
    const handleCheckbox = (id) => {
        let existingMemberIndex = members.findIndex((el) => el === id);
    
        if (existingMemberIndex !== -1) {
            const updatedMembers = members.filter((el, index) => index !== existingMemberIndex);
            setMembers(updatedMembers);
        } else {
            const updatedMembers = [...members, id];
            setMembers(updatedMembers);
        }
    };
    

    useEffect(() => {
        var today = new Date();

        // Extract year, day, and month components
        var year = today.getFullYear();
        var day = today.getDate();
        var month = today.getMonth() + 1; 

        if (day < 10) {
            day = '0' + day; 
        }
        if (month < 10) {
            month = '0' + month; 
        }
        var formattedDate =  `${year}/${day}/${month}`;

   
        setCurrentDate(formattedDate)
    })
   

    return(
        <div className='w-full px-4'>
            <div className='flex gap-5'>
                <div className='w-[50%]'>
                    <label htmlFor="">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] w-full focus:shadow-md' />
                </div>
                <div className='w-[50%]'>
                    <label htmlFor="">Due Date</label>
                    <input type="date"  value={dueDate} onChange={(e) => setDueDate(e.target.value)}  className='rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] w-full focus:shadow-md' />
                </div>
            </div>

            <div className='w-full grid py-5 grid-cols-4 gap-2'>
                    {users && users.users.map((el , index) => {
                        return <div   key={index} className='p-5 bg-white rounded flex items-center gap-5'>
                            <div >
                                <input  type='checkbox' className='cursor-pointer' onChange={() => handleCheckbox(el._id)} id={el._id} />
                            </div>
                            <div className='flex flex-col'>
                            <label>
                                {el.name}
                            </label>
                           
                            <span className='text-sm text-gray-400'>{el.email}</span>
                            </div>
                            
                            
                        </div>
                    })}
            </div>
            <div className='flex gap-5'>
                <div className='w-full'>
                    <label htmlFor="">Description</label>
                    <textarea rows='10' value={description} onChange={(e) => setDescription(e.target.value)} type="text" className='rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] w-full focus:shadow-md' ></textarea>
                </div>
               
            </div>
            <div className='flex gap-5'>
                <div className='w-full'>
                    <button onClick={handleSubmit} className="hover:shadow-form w-full rounded-md bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none">Submit</button>
                </div>
            </div>
        </div>
    )
}


export default TaskForm