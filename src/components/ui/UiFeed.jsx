'use client'
import react , {useState , useEffect} from 'react'
import axios from 'axios'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HiViewGrid } from "react-icons/hi";
import { MdViewList } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  import { GoPaperclip } from "react-icons/go";
  import { IoCheckmarkSharp } from "react-icons/io5";
  import { FaUsers } from "react-icons/fa";
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { TbBrandDaysCounter } from "react-icons/tb";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import Cookies from 'js-cookie'
  import { IoIosRefresh } from "react-icons/io";




const UiFeed = () => {

    



    const [title , setTitle] = useState('');
    const [dueDate , setDueDate] = useState('');
    const [description , setDescription] = useState('')
    const [current_date , setCurrentDate] = useState('')
    const [active , setActive] = useState('Tasks')


    const myColors = [
        {
            status: 'start',
            color:  '#356FFF'
        },
        {
            status: '30%',
            color:  '#FA4778'
        },
        {
            status: '50%',
            color:  '#2C97B7'
        },
        {
            status: '75%',
            color:  '#6E41B8'
        },
        {
            status: '90%',
            color:  '#E7C723'
        },
        {
            status: '100%',
            color:  '#24A964'
        }];

    const [tasks , setTasks] = useState([])


    const [filter , setFilter] = useState('')
  
    
    const getTasks = async () => {
        try{
            const res = await axios.get('http://localhost:3000/api/alltasks' , {'cache':'no-store'});
            const myData = res.data.data
            if(filter == ""){
                setTasks(myData)
            }else{
                let filteredData = myData.filter((el) => el.title.toLowerCase().includes(filter.toLowerCase()));
                setTasks(filteredData)
            }
            
        }catch(error){
            console.lo9g(error)
        }
    }


    useEffect(() => {
        getTasks();
        getUsers();
       
    },[]);
    useEffect(() => {
        getTasks();
    },[filter]);


    const userId = localStorage.getItem('id');


    const [users , setUsers] = useState([])
    const getUsers = async () => {
        try{
            const res = await axios.get('http://localhost:3000/api/allusers', {'cache':'no-store'});
            setUsers(res.data.data)
        }catch(error){
            console.log(error)
        }
    }

    const [allTasks , setAllTasks ] = useState(true);


    function getRemainingDays(startDateStr, endDateStr) {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
        return remainingDays;
    }
    
    const [checkedValues, setCheckedValues] = useState([]);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setCheckedValues(prevValues => [...prevValues, value]);
        } else {
            setCheckedValues(prevValues => prevValues.filter(item => item !== value));
        }
    };


    const submitTask = async () => {
        try{
            const res = await axios.post('http://localhost:3000/api/addtask', {title: title , members: checkedValues , current_date: current_date  , dueDate: dueDate , description: description});
            const myData = res.data.data;
            if(res.status == 200){
                window.location.reload()
            };
 
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        var today = new Date();
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
    },[]);



    const showMyTasks = async () => {
        try{
            if(allTasks == false){
                const filteredTasks = tasks.filter((el) => el.members.includes(userId));
                setTasks(filteredTasks)
            }else if(allTasks == true){
                getTasks()
               
            }
            
        }catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        showMyTasks();
    },[allTasks]);




    const [membersVal , setMembersVal ] = useState();
    const [statusVal , setStatusVal] = useState('');
    const [roleVal , setRoleVal] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/alltasks', { 'cache': 'no-store' });
                const myData = res.data.data;
    
              
                let filteredData = myData.filter((el) => {
                    let passMembersFilter = true;
                    let passStatusFilter = true;
    
                  
                    if (membersVal) {
                        passMembersFilter = el.members.length > membersVal - 10 && el.members.length <= membersVal;
                    }
    
                    
                    if (statusVal) {
                        passStatusFilter = el.progress === statusVal;
                    }
    
                    
                    return passMembersFilter && passStatusFilter;
                });
    
                setTasks(filteredData);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, [membersVal, statusVal]);

    const [search , setSearch] = useState('');





    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/allusers', { 'cache': 'no-store' });
                const myData = res.data.data;
    
             
                const filteredData = roleVal ? myData.filter((el) => el.role === roleVal) : myData;
    
                const filteredUsers = search !== '' ?
                    filteredData.filter((el) =>
                        el.name.toLowerCase().includes(search.toLowerCase()) ||
                        el.email.toLowerCase().includes(search.toLowerCase())
                    ) :
                    filteredData;
    
                setUsers(filteredUsers);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, [roleVal, search]);




    const myId = localStorage.getItem('id');

    const [newStatus , setNewStatus] = useState('');


    const updateTaskProgress = async (id) => {
        try{
            if(newStatus == 'Select'){
                alert('Select a valid option');
                return
            }
            const res = await axios.post('http://localhost:3000/api/new_status', {taskId: id , newStatus : newStatus} , {'cache': 'no-store'});
            console.log(res.data);

            if(res.status == 200){
                window.location.reload();
            }
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className='w-[95%] mx-auto gap-3 lg:flex xl:flex  lg:flex-row flex-col'>
        <div className='lg:w-[30%] w-full bg-white p-3 rounded shadow-xl'>
          <div>
            <div className='my-1'>
              <h2 className='text-lg font-semibold py-2'>Filter Tasks</h2>
            </div>
            <div className='my-2 py-6'>
              <div className='py-3 border-b-[2px] border-gray-400 border-opacity-[0.4] px-2'>
                <h2 className='text-[#16093D] font-semibold '>Filter by members</h2>
                <div className='grid gap-2 grid-cols-2'>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setMembersVal(10)} className='custom-radio' name="range" />
                        <label htmlFor="">0-10</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setMembersVal(20)} className='custom-radio' name="range" />
                        <label htmlFor="">10-20</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setMembersVal(30)} className='custom-radio' name="range" />
                        <label htmlFor="">20-30</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setMembersVal(40)} className='custom-radio' name="range" />
                        <label htmlFor="">30-40</label>
                    </div>
                </div>
              </div>
            </div>

            <div className='my-2 py-6'>
              <div className='py-3 border-b-[2px] border-gray-400 border-opacity-[0.4] px-2'>
                <h2 className='text-[#16093D] font-semibold '>Filter by Status</h2>
                <div className='grid gap-2 grid-cols-2'>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setStatusVal('start')}  className='custom-radio' name="status" />
                        <label htmlFor="">Start</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setStatusVal('30%')} className='custom-radio' name="status" />
                        <label htmlFor="">30%</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setStatusVal('50%')}  className='custom-radio' name="status" />
                        <label htmlFor="">50%</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setStatusVal('75%')}  className='custom-radio' name="status" />
                        <label htmlFor="">75%</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setStatusVal('90%')}  className='custom-radio' name="status" />
                        <label htmlFor="">90%</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setStatusVal('100%')}  className='custom-radio' name="status" />
                        <label htmlFor="">100%</label>
                    </div>
                </div>
              </div>
            </div>


            <div className='my-1'>
              <h2 className='text-lg font-semibold py-2'>Filter Users</h2>
            </div>
            <div className='my-2 py-6'>
              <div className='py-3 border-b-[2px] border-gray-400 border-opacity-[0.4] px-2'>
                <h2 className='text-[#16093D] font-semibold '>Filter by role</h2>
                <div className='grid gap-2 grid-cols-2'>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setRoleVal('admin')} className='custom-radio' name="role" />
                        <label htmlFor="">Admin</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setRoleVal('engineer')} className='custom-radio' name="role" />
                        <label htmlFor="">Engineer</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setRoleVal('hr')} className='custom-radio' name="role" />
                        <label htmlFor="">HR</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setRoleVal('finance')} className='custom-radio' name="role" />
                        <label htmlFor="">Finance</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setRoleVal('sales_agent')} className='custom-radio' name="role" />
                        <label htmlFor="">Sales Agent</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setRoleVal('employee')} className='custom-radio' name="role" />
                        <label htmlFor="">Employee</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setRoleVal('manager')} className='custom-radio' name="role" />
                        <label htmlFor="">Manager</label>
                    </div>
                    <div className='my-1 gap-2'>
                        <input type="radio" onChange={() => setRoleVal('designer')} className='custom-radio' name="role" />
                        <label htmlFor="">Designer</label>
                    </div>
                </div>
              </div>
            </div>



            

            <div className='my-2 flex items-center py-6 justify-start gap-3'>
                <button className='bg-[#366FFF] w-[50%] px-4 py-2 text-white rounded-lg shadow-lg' onClick={() => setAllTasks(true)}>Show All Tasks</button>
                <button className='bg-[#366FFF] w-[50%] px-4 py-2 text-white rounded-lg shadow-lg' onClick={() => setAllTasks(false)}>Show My Tasks</button>
            </div>
            <div className='my-2 w-full'>
                <button onClick={() => window.location.reload()} className='bg-[#366FFF] w-full flex items-center justify-center text-white px-4 py-2 rounded-lg shadow-lg gap-3' > <IoIosRefresh /> REFRESH</button>
            </div>


          </div>
        </div>
        <div className='lg:w-[70%] w-full border-[1px] border-gray-100 p-3 rounded shadow-xl'>
        <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-[#EDEDED] shadow-none border-b-[1px] border-gray-100">
            <TabsTrigger value="account" className="border-b-[2px] hover:border-black rounded-none bg-[#EDEDED] ">Tasks</TabsTrigger>
            <TabsTrigger value="password" className="border-b-[2px] hover:border-black rounded-none bg-[#EDEDED]">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="account" >
            <div className='w-full px-2'>
                <div className='w-[100%] my-2 lg:flex lg:flex-row items-center'>
                    <div className='lg:w-[50%] w-full gap-3 flex items-center text-start'>
                        {/* <div>
                            <p className='text-gray-700 text-sm'>
                                View by
                            </p>
                        </div>
                        <div className='flex items-center bg-white rounded-lg shadow  overflow-hidden'>
                                <div className='w-[50%] cursor-pointer p-2  transition-all 0.2s ease-in-out hover:bg-gray-300'>
                                <HiViewGrid className='cursor-pointer' />
                                </div>
                                <div className='w-[50%] cursor-pointer p-2  transition-all 0.2s ease-in-out hover:bg-gray-300' >
                                <   MdViewList />
                                </div>
                              
                          
                               
                            
                        </div> */}
                    </div>
                    <div className='lg:w-[50%] w-full text-end flex items-center gap-3'>

                        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} className='rounded-lg shadow-lg px-4 py-2 bg-white texdt-black focus:outline-none focus:border-gray-400' placeholder='Search Task' />
                        
                        <Dialog>
                        <DialogTrigger>
                            <button className='px-4 py-2 bg-black text-white rounded-lg shadow-lg'>+ Add new Task</button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Shto 1 task te ri</DialogTitle>
                            <DialogDescription>
                                <div className='w-full'>
                                    <div className='my-2'>
                                        <label htmlFor="">Task Title</label>
                                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='px-4 w-full py-2 bg-white rounded-lg shadow-lg my-2 border-gray-500 focus:outline-none border-[2px]' />
                                        
                                    </div>
                                    <div className='my-2'>
                                        <label htmlFor="">Due Date</label>
                                        <input type="date" placeholder='Due Date' value={dueDate}   onChange={(e) => setDueDate(e.target.value)} className='px-4 w-full py-2 bg-white rounded-lg shadow-lg my-2 border-gray-500 focus:outline-none border-[2px]' />
                                        
                                    </div>
                                    <div className='w-full gap-3 grid grid-cols-3'>
                                        {users && users.map((el , index) => {
                                            return <div className='gap-1'>
                                            <input
                                                type="checkbox"
                                                name={el._id}
                                                value={el._id}
                                                onChange={handleCheckboxChange}
                                            />
                                                <label htmlFor="">{el.name}</label>
                                            </div>
                                        })}
                                        
                                        
                                    </div>
                                    <div className='my-2'>
                                        <label htmlFor="">Description</label>
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="date" rows='10' placeholder='Due Date' className='px-4 w-full py-2 bg-white rounded-lg shadow-lg my-2 border-gray-500 focus:outline-none border-[2px]' ></textarea>
                                        
                                    </div>
                                    <div className='my-2 '>
                                        <button onClick={submitTask} className='bg-[#366FFF] w-full text-white rounded-lg shadow-lg px-4 py-4'>Submit</button>
                                    </div>
                                </div>
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                        </Dialog>
                        
                    </div>
                </div>

                <div className='w-fill my-2 '>
                    <div className='py-2'>
                        <h3>{tasks && tasks.length} Tasks Shown</h3>
                        
                    </div>

                    <div className='lg:grid lg:grid-cols-3 grid-cols-1 gap-2'>
                        {tasks && tasks.map((el , index) => {
                            return <div className='p-3 bg-white rounded-lg shadow-xl my-3'>
                            <div className='flex items-center gap-3'>
                                <div className='w-[20%]'>
                                    <div className={`w-[50px] h-[50px]  rounded-lg`} style={{
                                        backgroundColor: myColors.filter(item => item.status == el.progress).map(col => col.color)
                                    }} ></div>
                                </div>
                                <div className='w-[60%]'>
                                    <h2 className='font-semibold'>{el.title}</h2>
                                    <span className='text-[12px] text-gray-300'>Due to: {el.createdAt.substring(0 ,10)}</span>
                                </div>
                                <div className='w-[20%] relative flex items-center'>

                                <AlertDialog>
                                <AlertDialogTrigger>

                                    <div className='relative flex items-center'>
                                        <Avatar classNames="z-[10]">
                                            <AvatarFallback className="bg-red-600"></AvatarFallback>
                                        </Avatar>
                                        <Avatar className="absoulte left-0 top-0 ml-[-30px] z-[9]">
                                            <AvatarFallback className="bg-yellow-600"></AvatarFallback>
                                        </Avatar>
                                        <Avatar className="absoulte left-0  top-0 ml-[-25px] z-[12]">
                                            <AvatarFallback className="bg-[#036EFF]"></AvatarFallback>
                                        </Avatar>
                                    </div>
                                   



                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Task: {el.title}</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <div>
                                            <h2>Members of this task:</h2>
                                            <div className='grid grid-cols-2 gap-3'>
                                            {users.map((user) => {
                                         
                                            if (el.members.includes(user._id)) {
                                                return (
                                                    <div key={user._id} >
                                                        <p className='font-bold text-lg'>{user.name}</p>
                                                        <p>{user.email}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                            </div>
                                        </div>
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                </AlertDialog>
                               
                                </div>
                            </div>
                            <div className='flex items-center gap-3 my-3'>
                                <button  className='flex items-center bg-gray-300 p-2 rounded-lg shadow-lg'>
                                    <GoPaperclip />
                                    {index + 1}
                                </button>
                                <button className='flex gap-1 text-[#2FAF6E] font-semibold items-center p-2 bg-green-500 bg-opacity-[0.2] rounded-lg shadow-lg'>
                                    {el.progress == '100%' ? (<IoCheckmarkSharp color='#2FAF6E' />)  : (null) }
                                    
                                    {el.progress == '100%' ? ('Finished') :  (el.progress) }
                                </button>
                                
                            </div>
                            <div className='w-full my-3'>
                                <div className='flex items-center my-2'>
                                    <div className='w-[50%] font-semibold flex pl-2 items-center text-lg gap-3 text-gray-700'> <FaUsers /> Members:</div>
                                    <div className='w-[50%] font-semibold text-lg '>{el.members.length} {el.members.length == 1 ? 'User' : ' Users' }</div>
                                </div>
                                <div className='flex items-center my-2'>
                                    <div className='w-[50%] font-semibold flex pl-2 items-center text-lg gap-3 text-gray-700'> <TbBrandDaysCounter /> Remaining:</div>
                                    <div className='w-[50%] font-semibold text-lg '>{getRemainingDays(el.createdAt.substring(0, 10) , el.due_date)} Days</div>
                                </div>
                            </div>
                            <div>
                            <Sheet>
                            <SheetTrigger className='w-full'>
                            <button className='bg-[#346FFF] w-full px-4 py-2 transition-all ease-in-out hover:bg-[#0B38A7] text-white rounded-lg shadow-lg'>View More</button>

                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                <SheetTitle>Task Details</SheetTitle>
                                <SheetDescription>
                                    <div className='w-full flex pt-3 flex-col'>
                                        <div className='w-full py-2 font-bolder text-black'>
                                            <h2 className='text-black font-semibold'>
                                                Task Name: <span className='bg-[#346FFF] rounded-lg p-1 text-white'>{el.title}</span> 
                                            </h2>
                                            
                                        </div>
                                        <div className='w-full py-2 font-bolder text-black'>
                                            <h2 className='text-black font-semibold'>
                                            Task Status: <span className='bg-[#346FFF] rounded-lg p-1 text-white'> {el.progress}</span>
                                            </h2>
                                        </div>
                                        <div className='w-full py-2 font-bolder text-black'>
                                            <h2 className='text-black font-semibold'>
                                            Remaining: <span className='bg-[#346FFF] rounded-lg p-1 text-white'>{getRemainingDays(el.createdAt.substring(0, 10) , el.due_date)} Days </span>
                                            </h2>
                                        </div>
                                        <div className='w-full py-2 font-bolder text-black'>
                                            <h2 className='text-black font-semibold'>
                                            Task Assigned <span className='bg-[#346FFF] rounded-lg p-1 text-white'>{el.createdAt.substring(0 ,10)}</span>
                                            </h2>
                                        </div>
                                        <div className='w-full py-2 font-bolder text-black'>
                                            <h2 className='text-black font-semibold'>
                                            Memebers:
                                            </h2>
                                            <ul>
                                                <li>
                                                {users.map((user) => {
                                         
                                                    if (el.members.includes(user._id)) {
                                                        return (
                                                            <li key={user._id} className='w-full flex items-center bg-white rounded-lg p-2 shadow-lg my-2' >
                                                                <div className='w-[20%]'>
                                                                <Avatar>
                                                                    
                                                                    <AvatarFallback className="bg-[#346FFF] text-white font-semibold text-lg">{user.name.substring(0 ,1).toUpperCase()}</AvatarFallback>
                                                                </Avatar>
                                                                </div>
                                                                <div className='w-[80%]'>
                                                                    <p className='font-bold text-lg'>{user.name}</p>
                                                                    <p>{user.email}</p>
                                                                </div>
                                                                
                                                            </li>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                                </li>
                                            </ul>
                                        </div>
                                       
                                    </div>
                                            {el.members.includes(myId) ? (<div className='my-[5%]'>
                                                    <h2 className='py-2 font-semibold text-lg font-semiubold text-black'>
                                                        Change Status of Task
                                                    </h2>
                                                    <h2 className=''>
                                                       Current Stauts: <span className='bg-[#346FFF] rounded-lg p-1 text-white'>{el.progress}</span> 
                                                    </h2>
                                                    <div>
                                                        <label  htmlFor="" className=' mt-4 font-semibold text-black'>Select the new status of the project:</label>
                                                        <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}   className='w-full cursor-pointer mt-5 px-4 py-2 rounded-lg focus:outline-none border-[1px] border-gray-500 shadow-lg'  >
                                                            <option>Select</option>
                                                            <option>0%</option>
                                                            <option>15%</option>
                                                            <option>30%</option>
                                                            <option>50%</option>
                                                            <option>75%</option>
                                                            <option>100%</option>
                                                        </select>
                                                        <button onClick={() => updateTaskProgress(el._id)} className='bg-[#346FFF] text-white my-2 w-full text-center rounded-lg shadow-lg py-3 text-lg'>Submit</button>
                                                    </div>
                                    </div>) : (null)}
                                    
                                </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                            </Sheet>
                                
                            </div>
                        </div>
                        })}
                        
                    </div>

                </div>
            </div>
        </TabsContent>
        <TabsContent value="password">
            <div className='px-2 my-2'>
               
                <div className='w-[100%] my-2 flex items-center'>
                    <div className='w-[50%] gap-3 flex items-center text-start'>
                      
                    </div>
                    <div className='w-[50%] text-end flex items-center justify-end gap-3'>

                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='rounded-lg shadow-lg px-4 py-2 bg-white texdt-black focus:outline-none focus:border-gray-400' placeholder='Search User' />
                        
    
                        
                    </div>
                </div>
                <div>
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        ID
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Name
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Email
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Role
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Created At
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users && users.map((el , index) => {
                        return  <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{el.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{el.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className='bg-red-500 px-2 py-[0.5px] bg-opacity-[0.5] text-white rounded-xl'>{el.role}</span>
                            </td>
                        <td className="px-6 py-4 whitespace-nowrap">{el.createdAt.substring(0 ,10)}</td>
                        </tr>
                    } )}

                    <div className='flex items-center justify-center'>


                    </div>
                   
                   
                    
                </tbody>
                </table>

                </div>
            </div>
        </TabsContent>
        </Tabs>
        </div>
      </div>
    )
}


export default UiFeed