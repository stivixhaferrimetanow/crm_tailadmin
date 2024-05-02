'use client'
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { Progress } from "@/components/ui/progress"

const page = ({params}) => {

    const [myTask , setMyTask] = useState([]);
    const [users , setUsers ] = useState([])


    const fetchUsers = async () => {
      try{
        const res  = await axios.get('http://localhost:3000/api/getusers');
        const myData = res.data.data;
        console.log( myTask);
        setUsers(myData);
      }catch(error){
        console.log(error)
      }
    }
 
   

    const filterTask = async () => {
      try {
          const response = await axios.get('http://localhost:3000/api/alltasks/');
          const allData = response.data.data;
          
          if (!Array.isArray(allData)) {
              
              console.log('Response data is not an array');
              return;
          }
          
          const myData = allData.filter((el) => el._id === params.slug);
  
          if (myData.length === 0) {
              // Handle the case where no matching task is found
              console.log('No task found with the specified slug');
              return;
          }
  
          setMyTask(myData[0]);
        
      } catch(error) {
          console.log(error);
      }
  };

    useEffect(() => {
        filterTask();
        fetchUsers();
    },[]);


    return(
        <div className='w-full '>
            <div className='w-[95%] gap-3 mx-auto  lg:flex grid grid-col-2 my-2'>
                <div className='lg:w-[25%] w-full p-5 bg-black rounded-lg shadown-xl text-white ' >
                    <h2 className='text-md text-white'>Task:</h2>
                    <h1 className='text-2xl text-whtie font-semibold text-white' >{myTask.title && myTask.title}</h1>
                </div>
                <div className='lg:w-[25%] w-full p-5 bg-black rounded-lg shadown-xl'>
                    <h2 className='text-md  text-white '>Start Date:</h2>
                    <h1 className='text-2xl text-whtie font-semibold text-white'>{myTask.current_date && myTask.current_date}</h1>
                </div>
                <div className='lg:w-[25%] w-full p-5 bg-black rounded-lg shadown-xl'>
                    <h2 className='text-md  text-white '>Due Date:</h2>
                    <h1 className='text-2xl text-whtie font-semibold text-white'>{myTask.due_date && myTask.due_date}</h1>
                </div>
                <div className='lg:w-[25%] w-full p-5 bg-black rounded-lg shadown-xl'>
                    <h2 className='text-md  text-white '>Progress Status:</h2>
                    <h1 className='text-2xl text-whtie font-semibold text-white'>{myTask.progress && myTask.progress}</h1>
                </div>
            </div>
            <div className='my-2 w-[95%] mx-auto '>
                <h2 className='text-black'>Progress bar</h2>
                <Progress value={1} />
            </div>
            <div className='w-[95%] mx-auto'>
                <ul className='lg:grid lg:grid-cols-4 flex flex-col gap-3'>
                {myTask.members && myTask.members.map((el , index) => {
                        return <li key={index}>
                      
                        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
 
  <div className="flex flex-col pt-5 items-center pb-10">
    <img
      className="w-24 h-24 mb-3 rounded-full shadow-lg"
      src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
      alt="Bonnie image"
    />
    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
      {users && users.filter((item) => item._id == el).map((id) => id.name)}
    </h5>
    <span className="text-sm text-gray-500 dark:text-gray-400">
    {users && users.filter((item) => item._id == el).map((id) => id.role)}
    </span>
    
  </div>
                        </div>
                    </li>
                      })}
                    
                </ul>
            </div>
            
        </div>
    )
}


export default page