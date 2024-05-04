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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th  scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th  scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th  scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Contact</th>
              <th  scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th  scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th  scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th  scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th  scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th  scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ZIP CODE</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
                row.id ? (<tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{index}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.primary_contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.zip_code}</td>
                  </tr>) : (null)
              
            ))}
          </tbody>
        </table>
      ) : null}

      <br /><br />
      <button onClick={submitData} className='w-full bg-[#366FFF] px-4 py-2 text-white rounded-lg shadow-md'>Submit</button>
     
    </div>
  );
}

export default ExcelForm;
