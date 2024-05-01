import React from 'react'
import { cookies } from 'next/headers'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TaskGraph from '@/components/ui/TaskGraph'

const page = async () => {


  const cookieStore = cookies()
  const token = cookieStore.get('token');
 
  
  const myUser = cookieStore.get('user')
  const user = myUser.value.toString().replace('%40', '@');

  const getUsers = async () => {
    try{
      const res = await fetch(`http://localhost:3000/api/allusers` );
      const data = await res.json();

      return data.data
    }catch(error){
      console.log(error)
    }
  }


  const getTasks = async () => {
    try{
      const res = await fetch(`http://localhost:3000/api/alltasks`);
      const data = await res.json();
      return data.data
    }catch(error){
      console.log(error)
    }
  }


  const users = await getUsers();
  const tasks = await getTasks();


  const currentUser = users.filter((el) => el.email == user) 
 


  const myTasks = tasks.filter((el) => el.members.includes(currentUser[0]._id));


  console.log(myTasks)


  return (
    <div>
  <div className='w-full grid grid-cols-4 gap-5'>
      
      {myTasks && myTasks.map((el , index) => {
        return  <div className='py-2' key={index}> <Card  className="hover:shadow-xl cursor-pointer transition-all 1s ease-in-out">
        <CardHeader>
            <CardTitle>{el.title}</CardTitle>
            <CardDescription>{el.description}</CardDescription>
        </CardHeader>
        <CardContent>
         {el.current_date} - {el.due_date}
        
         {(() => {
                                const filteredUsers = users.filter((item) => el.members.includes(item._id));
                                return (
                                    <div className='w-full mt-5 '>
                                        {filteredUsers && filteredUsers.map((user) => (
                                            <div className='bg-black p-3 rounded-lg shadow-lg my-5'>
                                                <h2 className='text-white' key={user._id}>{user.name}</h2>
                                                <h2 className='text-white' key={user._id}>{user.role}</h2>
                                            </div>
                                            
                                        ))}
                                    </div>
                                );
                            })()}
                            
         
        </CardContent>
        <CardFooter>
        </CardFooter>
        </Card> </div>
      })}
       

        
    </div>
    <div className='w-full flex p-2 justify-evenly mt-[10%]'>
     
    </div>
    
    </div>
   
  )
}

export default page