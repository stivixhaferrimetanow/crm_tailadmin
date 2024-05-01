'use client'
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from './button'
import { Progress } from "@/components/ui/progress"


const TaskList = ({members}) => {


    const [users , setUsers ] = useState([])
    const getAllUsers = async () => {
        try{
            const res = await axios.get(`http://localhost:3000/api/allusers`);
            setUsers(res.data.data) 
                     
        }catch(error){
            console.log(error)
        }
    }



    const [tasks , setTasks] = useState([])

    const getTasks = async () => {
        try{
            const res = await axios.get(`http://localhost:3000/api/alltasks`);
            setTasks(res.data.data);
          
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        getTasks();
        getAllUsers();

    },[])

   

    return(
        <div>
           
            <div className='w-full grid grid-cols-4 gap-5'>
                {tasks && tasks.map((el , index) => {
                    return <div className='py-2'>
                        <Card className="hover:shadow-xl cursor-pointer transition-all 1s ease-in-out">
                        <CardHeader>
                            <CardTitle>{el.title}</CardTitle>
                            <CardDescription>{el.description.slice(0, 13)}...</CardDescription>
                        </CardHeader>
                        <CardContent>
                        {el.current_date} - {el.due_date}
                        <br/>
                        <p className='font-semibold pt-3 pb-2'>
                            {el.progress.toUpperCase()}
                        </p>
                        {
                            (() => {
                                if (el.progress == 'start') {
                                    return <Progress value={0} />;
                                }else if(el.progress == '25%'){
                                    return <Progress value={25} />;
                                }
                                else if(el.progress == '50%'){
                                    return <Progress value={50} />;
                                }
                                else if(el.progress == '75%'){
                                    return <Progress value={75} />;
                                }
                                else if(el.progress == 'done'){
                                    return <Progress value={100} />;
                                }
                                return null;
                            })()
                        }
                                            
                        
                        </CardContent>
                        <CardFooter>
                        <div>
                            
                        </div>
                        <Drawer >
                        <DrawerTrigger>
                            <p className='cursor-pointer'>Details</p>
                        </DrawerTrigger>
                        <DrawerContent className="W-[85%] fixed pt-[3%] cursor-pointer" style={{zIndex: '1000'}}>
                            <DrawerHeader>
                            <DrawerTitle>{el.title}</DrawerTitle>
                            <DrawerDescription>{el.description}
                            
                            <br/>
                            
                            </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                
                                {(() => {
                                const filteredUsers = users.filter((item) => el.members.includes(item._id));
                                return (
                                    <div className='grid grid-cols-4 gap-3 w-full'>
                                        {filteredUsers && filteredUsers.map((user) => (
                                            <div className='bg-black p-3 w-full  rounded-lg shadow-lg'>
                                                <h2 className='text-white' key={user._id}>{user.name}</h2>
                                                <h2 className='text-white' key={user._id}>{user.role}</h2>
                                            </div>
                                            
                                        ))}
                                    </div>
                                );
                            })()}
                               
                            
                            <DrawerClose>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                        </DrawerContent>
                        </Drawer>
                            
                               
                            
                           
                        </CardFooter>
                        </Card>
                    </div>
                })}
            </div>
            
        </div>
    )
}


export default TaskList;