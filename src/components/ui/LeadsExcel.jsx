'use client';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios'

function ExcelForm() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  };


  useEffect(() => {
    console.log(data)
  },[data]);



  const submitData = async () => {
    try{
        const res = await axios.post('http://localhost:3000/api/customerexcel' , data);
        console.log(res)
        if(res.status == 200){
            window.location.reload();
        }
    }catch(error){
        console.log(error)
    }
  }

  return (
    <div  className='w-full mx-auto my-5 bg-white p-3 rounded-xl'>
      <input type="file" accept=".csv" className='mx-auto' onChange={handleFileUpload} />

      {data.length ? (
        <table className="w-full  shadow-lg mt-4 p-3 border-black border-[1px]">
          <thead>
            <tr>
              <th className='w-[20%] p-1 text-start border-black border-[1px]'>ID</th>
              <th className='w-[20%] p-1 text-start border-black border-[1px]'>Name</th>
              <th className='w-[20%] p-1 text-start border-black border-[1px]'>Primary Contact</th>
              <th className='w-[20%] p-1 text-start border-black border-[1px]'>Email</th>
              <th className='w-[20%] p-1 text-start border-black border-[1px]'>Phone</th>
              <th className='w-[20%] p-1 text-start border-black border-[1px]'>City</th>
              <th className='w-[20%] p-1 text-start border-black border-[1px]'>Country</th>
              <th className='w-[20%] p-1 text-start border-black border-[1px]'>Address</th>
              <th className='w-[20%] p-1 text-start border-black border-[1px]'>ZIP CODE</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
                row.id ? (<tr key={index}>
                    <td className='w-[20%] p-1  border-black border-[1px]'>{index}</td>
                    <td className='w-[20%] p-1 border-black border-[1px]'>{row.name}</td>
                    <td className='w-[20%] p-1 border-black border-[1px]'>{row.primary_contact}</td>
                    <td className='w-[20%] p-1 border-black border-[1px]'>{row.email}</td>
                    <td className='w-[20%] p-1 border-black border-[1px]'>{row.phone}</td>
                    <td className='w-[20%] p-1 border-black border-[1px]'>{row.city}</td>
                    <td className='w-[20%] p-1 border-black border-[1px]'>{row.country}</td>
                    <td className='w-[20%] p-1 border-black border-[1px]'>{row.address}</td>
                    <td className='w-[20%] p-1 border-black border-[1px]'>{row.zip_code}</td>
                  </tr>) : (null)
              
            ))}
          </tbody>
        </table>
      ) : null}

      <br /><br />
      <button onClick={submitData} className='w-full bg-black px-4 py-2 text-white rounded-lg shadow-md'>Submit</button>
     
    </div>
  );
}

export default ExcelForm;
