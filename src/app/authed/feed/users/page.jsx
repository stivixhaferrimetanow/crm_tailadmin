'use client'
import React , {useEffect , useState} from 'react'

import { columns } from "./columns"
import { DataTable } from "./data-table"
import AddUser from '@/components/ui/AddUser'
import UsersCount from '@/components/ui/UsersCount'
import AddRole from '@/components/ui/AddRole'

const page = async () => {


  useEffect(() => {
    getMyData()
  })

  const [data , setData] = useState([]);

  async function getMyData() {
    try {
      const response = await axios.get('http://localhost:3000/api/getusers');
      setData(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }
  }
    



  // const cookieStore = cookies()
  // const token = cookieStore.get('token');
 
  
  // const myUser = cookieStore.get('user')
  // const user = myUser.value.toString().replace('%40', '@');




  // if(data.status !== 200){
  //   redirect('/authed/feed')
  // }




  const allUsers = data && data.users.map((el , index) => {
    return {
        id: index + 1,
        name: el.name,
        email: el.email,
        role: el.role,
      
      }
    
  })


  return (
    <div>Users
      <div className='w-full flex  overflow-x-hidden'>
        <div className='py-4 w-[60%]'>
          <DataTable columns={columns} data={allUsers} />
        </div>
        <div className='py-4 w-[40%]'>
          
          <UsersCount  number={ allUsers && allUsers.length} />
          <AddRole   token={token && token} />
        </div>
      </div>
      
    

    </div>
  )
}

export default page


