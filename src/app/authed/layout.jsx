import React from 'react'
import Sidebar from '@/components/ui/Sidebar'
import Navbar from '@/components/ui/Navbar'
import { cookies } from 'next/headers'
import { headers } from "next/headers";
import MenuButton from '@/components/ui/MenuButton';
import Checker from '@/components/ui/Checker';

const layout = async ({children}) => {

  async function getMyData(token, user) {
    try {
      const response = await fetch(`http://localhost:3000/api/account/`, {
        method: 'POST', 
        headers: {
          'Authorization': `${token }`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: user })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
   
      const data = await response.json();
     
      return data
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    }
  }
  


  const cookieStore = cookies()
  const token = cookieStore.get('token');
  
  
  const myUser = cookieStore.get('user')
  const user = myUser.value.toString().replace('%40', '@');

  const data = await  getMyData(token , user);

    console.log(data , 'data');

  
 


  return (
    <div className='h-screen    flex relative '>
        <MenuButton/>
        <Checker/>
        <div className='lg:w-[15%] xl:w-[15%]  ml-[-100%] xl:ml-0 lg:ml-0 lg:relative xl:relative h-screen lg:max-h-full  transition-all 2s ease-in-out w-full absolute z-[1000]'>
            <Sidebar role={data.role ? data.data.role : 'admin'} />
        </div>
        <div className='lg:w-[85%] bg-[#EDEDED] xl:w-[85%] lg:max-h-screen  h-screen overflow-y-scroll w-full'>
            <Navbar myData={data ? data.data : 'admin'}   />
            <div className='p-3'>

            {children}
            </div>
            
        </div>
    </div>
  )
}

export default layout;


