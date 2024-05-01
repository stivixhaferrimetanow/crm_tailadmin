import React from 'react'
import Link from 'next/link'
import DraftTabs from '@/components/ui/DraftTabs'

const page = async () => {



  const getItems = async () => {
    try{
      const res = await fetch(`http://localhost:3000/api/getitems`, {'cache': 'no-store'});
      const data = await res.json();
      return data.data
    }catch(error){
      console.log(error)
    }
  }


  const data = await getItems()


  return (
    <div className='p-4 w-full'>
       <div className='mt-5'>
            <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                    ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Subject
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Client Type
                    </th>
                   
                    

                </tr>
                </thead>
                <tbody>
                      {data && data.map((el , index) => {
                        return  <tr className="btext-white uppercase bg-black dark:border-gray-700" key={index}>
                        <th
                        scope="row"
                        className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                        >
                        {index + 1}
                        </th>
                        <td className="px-6 py-4">
                          {el.name}
                        </td>
                        <td className="px-6 py-4">
                          {el.type ? el.type : 'Teke'}
                        </td>
                    </tr>
                      })}
                </tbody>
            </table>
            </div>
      </div>


      <DraftTabs  data={data} />
    </div>
  )
}

export default page