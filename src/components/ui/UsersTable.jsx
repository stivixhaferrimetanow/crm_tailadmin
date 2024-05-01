'use client'
import react , {useState , useEffect} from 'react';
import axios from 'axios'


const UsersTable = () => {


    const [data , setData ] = useState([]);


    const fetchData = async (value) => {
        try{
            const res = await axios.get('http://localhost:3000/api/getusers');
            if(!value || value == ''){
                setData(res.data.data)
            }else{
                let myData = res.data.data;
                let filteredValue = myData.filter((el) =>
                el.name.toLowerCase().includes(value.toLowerCase())
                );
                setData(filteredValue)
            }
            
        }catch(error){
            console.log(error)
        }
    }



    useEffect(() => {
        fetchData();
    },[])




    const handleChange = async (value) => {
      if (value.trim() === '') {
          // Fetch original data again from the server
          await fetchData();
      } else {
          let filteredValue = data.filter((el) =>
              el.name.toLowerCase().includes(value.toLowerCase())
          );
          setData(filteredValue);
      }
  }




    return(
        <div  className='w-full px-4 '>
            <div>
                <input type="text" onChange={(e) => handleChange(e.target.value)} className='px-5 py-2 text-black rounded-lg shadow-lg my-2' placeholder='Search User...' />
            </div>
            <div className="relative overflow-x-auto">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-white bg-black uppercase  dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          ID
        </th>
        <th scope="col" className="px-6 py-3">
          Username
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          Role
        </th>
      </tr>
    </thead>
    <tbody>
        {data && data.map((el , index) => {
            return <tr key={index} className="bg-white shadow border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {index + 1}
            </th>
            <td className="px-6 py-4">{el.name}</td>
            <td className="px-6 py-4">{el.email}</td>
            <td className="px-6 py-4">{el.role}</td>
          </tr>
        })}
      
      
    </tbody>
  </table>
</div>

            </div>
    )
}

export default UsersTable