'use client'
import React , {useState , useEffect} from 'react'
import ProductCard   from './ProductCard'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { FaSitemap } from "react-icons/fa6";
  import { RiArrowDropLeftLine } from "react-icons/ri";
  import { RiArrowDropRightLine } from "react-icons/ri";

  import axios from 'axios'

const ProductList = ({data , warehouse , stockData}) => {



  const [randomKey , setRandomKey] = useState(1)



    const changeStatus = async (value , id) => {
      try{
     
          const res = await axios.post(`http://localhost:3000/api/change_status` , {_id: id , value : value} , {'cache': 'no-store'});
          console.log(res);
          window.location.reload();
      }catch(error){
        console.log(error)
      }
    }



    useEffect(() => {
        try {
          const myValue = warehouse.find((el) => el._id == '65f9715de6e4c8bdcc72e8f7')?.name;
          const array = data.map((el) => el._id);
          console.log(array);
          const jsonString = JSON.stringify(array);
            localStorage.setItem('new' , 'false');            
          if (jsonString.length > (5 * 1024 * 1024)) {
            console.error('Storage limit exceeded');
            return;
          }
      
          localStorage.setItem('items', jsonString);
          localStorage.setItem('new', false)
        } catch (error) {
          console.error('Error in useEffect:', error);
        }
      }, []);


    const shto = async (id) => {
        try{
            const res = await axios.post(`http://localhost:3000/api/addproduction`, {_id: id} , {'cache': 'no-store'});
            console.log(res);
            
        }catch(error){
            console.log(error)
        }
    }



    const [drafted , setDrafted ] = useState([]);
    const [started , setStarted] = useState([]);
    const [progressing , setProgressing] = useState([]);
    const [finished , setFinished] = useState([]);


    useEffect(() => {
        const draftedData = data && data.filter((el) => el.status == 'Draft');
        const startedData = data && data.filter((el) => el.status == 'Started');
        const progressiveData = data && data.filter((el) => el.status == 'Progressing');
        const finishedData = data && data.filter((el) => el.status == 'Finished');
        setDrafted(draftedData);
        setStarted(startedData);
        setProgressing(progressiveData);
        setFinished(finishedData);


    },[])
    


    const handleNext = (id , status) => {
      let newStatus;
      switch (status) {
          case 'Draft':
              newStatus = 'Started';
              setStarted([...started, drafted.find(item => item._id === id)]);
              setDrafted(drafted.filter(item => item._id !== id));
              break;
          case 'Started':
              newStatus = 'Progressing';
              break;
          case 'Progressing':
              newStatus = 'Finished';
              break;
          default:
              newStatus = status;
              break;
      }
  
      // Call the API or update the local state with the new status
  };

    return(
        <div>
                <table className="table-auto w-full">
                <thead className='bg-[#1C2333] text-white '>
                    <tr>
                    <th>Multimedia</th>
                    <th>Emri</th>
                    <th>Lloji</th>
                    
                    <th>Kosto Materiali</th>
                    <th>Kosto Prodhimi</th>
                    <th>Kosto Totale</th>
                    <th>Cmimi i Shitjes</th>
                    <th>Status</th>
                    <th>Change Status</th>
                    </tr>
                </thead>
                <tbody className='bg-[#949494]'>
                    
                        {data && data.map((el , index) => {
                            return <tr key={index}>
                                        <td className='justify-center text-center'>
                                            

                                            <Dialog>
                                            <DialogTrigger>
                                            <img src={`${el.multimedia}`} className='w-[50px] py-1 mx-auto' alt="" />
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                <DialogTitle>Image</DialogTitle>
                                                <DialogDescription>
                                                <img src={`${el.multimedia}`} className='w-full mx-auto' alt="" />
                                                </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                            </Dialog>
                                        </td>
                                        <td className='justify-center text-center'>{el.name}</td>
                                        <td className='justify-center text-center'>{el.type}</td>
                                        
                                        <td className='justify-center text-center'>€
                                        
                                        {el.composition_cost}
                                        </td>
                                        <td className='justify-center text-center'>€{el.production_cost}</td>
                                        <td className='justify-center text-center'>€{el.total_cost}</td>
                                        <td className='justify-center text-center'>€{el.sales_cost}</td>
                                        <td className='justify-center text-center'>{el.status}</td>
                                        <td className='justify-center text-center'>
                                            <select  onChange={(e) => changeStatus(e.target.value , el._id) }  name="" id="">
                                              <option value=''>Select</option>
                                              <option value="Draft">Draft</option>
                                              <option value="Started">Started</option>
                                              <option value="Progressing">Progressing</option>
                                              <option value="Finished">Finished</option>
                                            </select>
                                        </td>
                                     </tr>
                        })}
                    
                   
                    
                </tbody>
                </table>



                <div key={randomKey && randomKey} className='my-5 flex gap-3 w-full justify-evenly'  >
                        <div className='rounded shadow-lg overflow-hidden w-[25%] bg-black'>
                          <div className='p-5 w-full bg-black text-white text-lg font-semibold'>
                            Ready For Production
                            <hr className='opacity-[0.3] mt-2 w-full mx-auto'/>
                          </div>
                          {drafted && drafted.map((el , index) => {
                            return <div onClick={() => handleNext(el._id , el.status)} className='w-[90%] relative flex gap-2 items-center mx-auto my-2 bg-white p-4 rounded'>
                              <FaSitemap />
                              {el.name}
                            </div>
                          })}
                        </div>
                        

                        <div className='rounded shadow-lg overflow-hidden w-[25%] bg-black'>
                          <div className='p-5 w-full bg-black text-white text-lg font-semibold'>
                            Started
                            <hr className='opacity-[0.3] mt-2 w-full mx-auto'/>
                          </div>
                          {started && started.map((el , index) => {
                            return <div  key={index} className='w-[90%] relative flex gap-2 items-center mx-auto my-2 bg-white p-4 rounded'>
                              
                             
                              <FaSitemap />
                              {el.name}
                             
                            </div>
                          })}
                        </div>


                        <div className='rounded shadow-lg overflow-hidden w-[25%] bg-black'>
                          <div className='p-5 w-full bg-black text-white text-lg font-semibold'>
                            Progressing
                            <hr className='opacity-[0.3] mt-2 w-full mx-auto'/>
                          </div>
                          {progressing && progressing.map((el , index) => {
                            return <div className='w-[90%] relative flex gap-2 items-center mx-auto my-2 bg-white p-4 rounded'>
                              
                             
                              <FaSitemap />
                              {el.name}
                              
                            </div>
                          })}
                        </div>


                        <div className='rounded shadow-lg overflow-hidden w-[25%] bg-black'>
                          <div className='p-5 w-full bg-black text-white text-lg font-semibold'>
                            Finished
                            <hr className='opacity-[0.3] mt-2 w-full mx-auto'/>
                          </div>
                          { finished && finished.map((el , index) => {
                            return <div className='w-[90%] relative flex gap-2 items-center mx-auto my-2 bg-white p-4 rounded'>
                              
                             
                              <FaSitemap />
                              {el.name}
                            
                            </div>
                          })}
                        </div>

                </div>
        </div>
    )
}

export default ProductList
