'use client'
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'


const page = () => {


  const [data , setData] = useState([])
  const fetchData = async () => {
    try{
      const res = await axios.get('http://localhost:3000/api/getproposals');
      const data = res.data.data;
      const filteredData = data.filter((el) => el.status == 'Accepted')
      setData(filteredData)
    }catch(error){
      console.log(error)
    }
  }



  useEffect(() =>{
    fetchData()
  },[])
  return (
    <div>
      <div className='w-[95%] mx-auto my-4 text-semibold'>
        Invocies
      </div>
      <div className='w-[95%] mx-auto'>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          ID
        </th>
        <th scope="col" className="px-6 py-3">
          Invoice ID
        </th>
        <th scope="col" className="px-6 py-3">
          Subject
        </th>
        <th scope="col" className="px-6 py-3">
          Client Type
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          Phone
        </th>
        <th scope="col" className="px-6 py-3">
          More
        </th>
        
      </tr>
    </thead>
    <tbody>
      {data && data.map((el, index) => {
        return <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {index + 1}
        </th>
        <td className="px-6 py-4 font-semibold">{el._id}</td>
        <td className="px-6 py-4">{el.subject}</td>
        <td className="px-6 py-4">{el.client_type}</td>
        <td className="px-6 py-4">{el.email}</td>
        <td className="px-6 py-4">{el.phone}</td>
        <td className="px-6 py-4">
          <Link
            href={`/authed/sales/proposals/${el._id}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            More
          </Link>
        </td>
      </tr>
      })}
      
      
    </tbody>
  </table>
</div>


      </div>
    </div>
  )
}

export default page