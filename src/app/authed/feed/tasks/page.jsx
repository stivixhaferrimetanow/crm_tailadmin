// import React from 'react'
// import TaskForm from '@/components/ui/TaskForm'
// import { cookies } from 'next/headers'








// const page = async () => {
//   const getMyData = async (token , user) => {
//     try{
//       const response = await fetch(`https://tailadmin2.onrender.com/api/users/`, {
//         method: 'POST', 
//         headers: {
//           'Authorization': token,
//           'Content-Type': 'application/json',
//           'cache': 'no-store'
//         },
//         body: JSON.stringify({ user: user })
//       });
//       const data = await response.json();
//       return data
//     }catch(error){
//       console.log(error)
//     }
//   }

//   const cookieStore = cookies()
//     const token = cookieStore.get('token');
   
    
//     const myUser = cookieStore.get('user')
//     const user = myUser.value.toString().replace('%40', '@');


//   const allUsers = await getMyData(token , user);

//   return (
//     <div className='flex items-center'>
//       <div className='w-[70%]'>
//       <TaskForm  users={allUsers} />
//       </div>
//       <div className='w-[30%]'></div>
      
//     </div>
//   )
// }

// export default page



'use client'
import React , {useState , useEffect} from 'react'
import axios from 'axios';
import Link from 'next/link'

const page = () => {

  const [title , setTitle] = useState('');
  const [current_date , setCurrentDate] = useState('');
  const [due_date  , setDueDate] = useState('');
  const [members , setMembers] = useState([])  ;
  const [progress , setProgress] = useState('');
  const [description , setDescription] = useState('');
  const [selectedUser , setSelectedUser] = useState('');

  const [users , setUsers] = useState([]);
  const [tasks ,setTasks ] = useState([])

  const getTasks = async () => {
    try{
      const res = await axios.get('http://localhost:3000/api/alltasks/');
      const myData = res.data.data;
      setTasks(myData)
    }catch(error){
      console.log(error)
    }
  }

  const submitForm = async () => {
    try{
      const res = await axios.post('http://localhost:3000/api/addtask' , {
        title: title,
        members: members,
        current_date: current_date,
        dueDate  :  due_date,
        progress : 'start',
        description: description
      });
      if(res.status == 200){
        window.location.reload();
      }
    }catch(error){
      console.log(error)
      alert(error)
    }
  }


  const fetchUsers = async () => {
    try{
      const res  = await axios.get('http://localhost:3000/api/getusers');
      const myData = res.data.data;
      console.log(myData)
      setUsers(myData);
    }catch(error){
      console.log(error)
    }
  }


  const addUser = () => {
    if (!members.includes(selectedUser)) {
      setMembers([...members, selectedUser]);
    }
  };


  useEffect(() => {
    fetchUsers();
    getTasks()
  },[])



  const [frontUsers , setFrontUsers] = useState([]);
  const [fullUsers , setFullUsers] = useState([]);






  



  const filterUsers = () => {
    if (users && members.length > 0) {
      const myUsers = users.filter((el) => members.includes(el._id));
      setFrontUsers(myUsers);
    } else {
      setFrontUsers([]);
    }
  };


  useEffect(() => {
    filterUsers();
  },[members])




  return(
    <div className='w-[90%] mx-auto flex lg:flex-row flex-col'>
      <div className='lg:w-[70%] w-full'>
        <div className='w-[95%] p-5 bg-white mt-2 rounded-lg shadow-lg  gap-3'>
          
          <div className='w-full flex flex-col my-2'>
            <label htmlFor="">Task Title</label>
            
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='w-full rounded-lg shadow-xl px-4 py-2 text-black border-[2px] border-black' />
          </div>
          

          <div className='w-full flex gap-3'>
            <div className='w-[50%] flex flex-col my-2'>
              <label htmlFor="">From:</label>
            
              <input value={current_date} onChange={(e) => setCurrentDate(e.target.value)} type="date" className='w-full rounded-lg shadow-xl px-4 py-2 text-black  border-[2px] border-black' />
            </div>
            <div className='w-[50%] flex flex-col my-2'>
              <label htmlFor="">Due To:</label>
            
              <input value={due_date} onChange={(e) => setDueDate(e.target.value)} type="date" className='w-full rounded-lg shadow-xl px-4 py-2 text-black border-[2px] border-black' />
            </div>
          </div>

          <div className='w-full flex gap-3 items-center'>
              <div className='w-[80%] my-2 flex flex-col'>
                <label htmlFor="">Members</label>
                <select   value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className='w-full px-4 py-2 rounded-lg shadonw-xl border-[2px] border-black' >
                  <option value="">Choose a Member</option>
                  {users && users.map((el , index) => {
                    return <option key={index}  value={el._id} >{el.name}</option>
                  })}
                </select>
              </div>
              <div className='w-[20%] my-2 flex flex-col'>
                <label htmlFor="" className='text-white'>Save</label>
                <button onClick={addUser} type="button"  className='px-4 py-2 rounded-lg shadow-xl bg-black text-white' >Add+</button>
              </div>
          </div>

          <div className='w-full flex '>
            <ul className='grid grid-cols-3 gap-3 w-full '>
            {frontUsers && frontUsers.map((el , index) => {
              return <div  key={index} >
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <div className="flex justify-end px-4 pt-4">
    <button
      id="dropdownButton"
      data-dropdown-toggle="dropdown"
      className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
      type="button"
    >
      <span className="sr-only">Open dropdown</span>
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 3"
      >
        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
      </svg>
    </button>
    {/* Dropdown menu */}
    <div
      id="dropdown"
      className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul className="py-2" aria-labelledby="dropdownButton">
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Edit
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Export Data
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Delete
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div className="flex flex-col items-center pb-10">
    <img
      className="w-24 h-24 mb-3 rounded-full shadow-lg"
      src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
      alt="Bonnie image"
    />
    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
      {el.name && el.name}
    </h5>
    <span className="text-sm text-gray-500 dark:text-gray-400">
      {el.role && el.role}
    </span>
    
  </div>
</div>

              </div>
            })}
            </ul>
           
          </div>



            <div className='w-full'>
              <textarea name="" id="" className='rounded-lg shadow-xl w-full my-2 border-[2px] border-black px-4 py-2' value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="10"></textarea>
            </div>
          <div className='w-full '>
            <button className='w-full black rounded-lg py-2 shadow-xl text-white my-2 bg-black'  onClick={submitForm} >Submit</button>
          </div>



        </div>





            {/*Table of Tasks*/}
            <div className="relative overflow-x-auto my-[5%] w-[95%]">
  <table className="w-full text-sm text-left rtl:text-right text-wgite bg-black dark:text-gray-400">
    <thead className="text-xs text-white bg-black dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          ID
        </th>
        <th scope="col" className="px-6 py-3">
          Task Title
        </th>
        <th scope="col" className="px-6 py-3">
          Progress
        </th>
        <th scope="col" className="px-6 py-3">
          Due Date
        </th>
        <th scope="col" className="px-6 py-3">
          View More
        </th>
      </tr>
    </thead>
    <tbody>
      {tasks && tasks.map((el , index) => {
        return <tr key={index} className="text-white bg-black border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-white bg-black"
        >
          {index + 1}
        </th>
        <td className="px-6 py-4">{el.title}</td>
        <td className="px-6 py-4">{el.progress}</td>
        <td className="px-6 py-4">{el.due_date}</td>
        <td className="px-6 py-4">
          <Link className='' href={`/authed/feed/tasks/task/${el._id}`}>More</Link>
        </td>
      </tr>
      })}
      
      
    </tbody>
  </table>
</div>

            {/*Table of Tasks*/}


      </div>
      <div className='lg:w-[30%] w-full'>
        <div className='w-[95%] lg:mx-auto p-5 rounded-lg shadow-xl bg-black text-white'>
            <p className='text-gray-500 text-sm'>Total of Tasks:</p>
            <h2 className='text-3xl'>{tasks && tasks.length}</h2>
        </div>
      </div>
    </div>
  )
}


export default page