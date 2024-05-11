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
  import { FaArrowAltCircleRight } from "react-icons/fa";
  import axios from 'axios'
  import { Button } from "@/components/ui/button"
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"




const ProductList = ({data , warehouse , stockData}) => {

  const [products , setProducts] = useState([])

  const getProducts = async () => {
    try{

      const res = await axios.get('http://localhost:3000/api/products');
      let myData = res.data.data;
      if(searchVal == ""){
        
        setProducts( myData)
      }else {
        let filteredData = myData.filter((el) => el.name.toLowerCase().includes(searchVal.toLowerCase()))
        setProducts(filteredData)
      }
      
    }catch(error){
      console.log(error)
    }
  }



  const [randomKey , setRandomKey] = useState(1)
  const [timestamps , setTimestapms] = useState([]);



  const getTimeStapms = async () => {
    try{
      const res = await axios.get('http://localhost:3000/api/gettimestamps');
      setTimestapms(res.data.data);
      console.log(timestamps , 'timestamps')
    }catch(error){
      console.log(error)
    }
  }


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
        getTimeStapms()
        getProducts()

    },[])




    const handleStatusChange = async (id , status) => {
      try{
          const res = await axios.post('http://localhost:3000/api/changetime', {item_id: id, current_status: status });
          window.location.reload()
      }catch(error){
        console.log(error)
      }
    }
    

    const [searchVal , setSearchVal] = useState('');



    useEffect(() => {
      getProducts()
    },[searchVal])




  const calculateDateDifference =  ( param1 , param2) => {
   


      var draftStartTime = new Date(param1);
      var draftEndTime = new Date(param2);
      var timeDiff = draftEndTime - draftStartTime;
      var secondsDiff = Math.floor(timeDiff / 1000);
      var minutesDiff = Math.floor(secondsDiff / 60);
      var hoursDiff = Math.floor(minutesDiff / 60);
      var daysDiff = Math.floor(hoursDiff / 24);
      var remainingHours = hoursDiff % 24;
      var remainingMinutes = minutesDiff % 60;
      var remainingSeconds = secondsDiff % 60;


      return `${daysDiff} d, ${remainingHours} h, ${remainingMinutes} m, ${remainingSeconds} s`

  }


  const shtoProdhim = async (id) => {
    try{
      const res = await axios.post('http://localhost:3000/api/addproduction', {_id: id} , {'cache': 'no-store'});
      console.log(res.data.data)
    }catch(error){
      console.log(error)
    }
  }







    return(
        <div>
           <div className='w-full flex  items-center'>
                <div className='w-[50%] text-start'>
                    
                </div>
                <div className='w-[50%] text-end'>
                <Sheet>
                <SheetTrigger>
                  <Button variant="outline" className="bg-black my-3 text-white hover:bg-black hover:text-white">Produktet</Button>
                </SheetTrigger>
                <SheetContent className="w-[100vh]">
                  <SheetHeader>
                    <SheetTitle>Shtoni nje produkt ne Production?</SheetTitle>
                    <SheetDescription>
                     <div>
                      <div>
                        <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)} type="text" className='focus:outline-none px-4 py-2 w-full text-black my-2 border-[1px] border-black rounded-lg' placeholder='Kerkoni Produktin' />
                      </div>
                      <div>
                        {products && products.map((el , index) => {
                          return  <div key={index} className='flex items-center my-1 border-[1px] bg-black border-black rounded-lg'>
                          <div className='w-[50%]text-start flex-col justify-start p-3'>
                            <h2 className='text-white font-semibold'>{el.name}</h2>
                            <span className='text-gray text-sm'>€{el.total_cost}</span>
                          </div>
                          <div className='w-[50%] text-end flex justify-end p-3'>
                            <Button   onClick={() => shtoProdhim(el._id)} variant="outline" className="">Shto</Button>
                          </div>
                        </div> 
                        })}
                         
                      </div>
                     </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
                  
                </div>
            </div>
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emri</th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lloji</th>
                    
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kosto Materiali</th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kosto Prodhimi</th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kosto Totale</th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cmimi i Shitjes</th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    
                        {data && data.map((el , index) => {
                            return <tr key={index} >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            

                                            
                                            {index + 1}
                                           
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{el.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{el.type}</td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap">€
                                        
                                        {el.composition_cost}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">€{el.production_cost}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">€{el.total_cost}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">€{el.sales_cost}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{el.status}</td>
                                        
                                     </tr>
                        })}
                    
                   
                    
                </tbody>
                </table>



                


                <div className='w-full p-2 grid grid-cols-4 gap-3 justify-evenly my-5 rounded-lg shadow-lg text-white'>
                
                  <div className='w-[100%] text-center  flex flex-col bg-[#232323] p-3 rounded-xl'>
                    <div className='head w-full'>Draft</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Draft').map((el , index) => {
                        return <Dialog >
                        <DialogTrigger>

                        <div key={index} className='border-[1px] text-start cursor-pointer bg-black text-white font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          
                          <div className='w-full my-2'>
                            <div className='w-[50px] bg-red-600 px-4 py-1 rounded-2xl'></div>
                          </div>
                            <h2 className='text-xl py-3'>{el.name}</h2>
                            <span className='text-gray-400'>{el.status}</span>
                            <div className='w-[1%] p-1 bg-blue-500 rounded-xl my-1'></div>
                            <span className='text-white py-3'>€{el.total_cost}</span>
                            <div className='w-full text-end'> 
                              <span className='text-gray-400'>{el.createdAt.substring(0 , 10)}</span>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="w-[80%] mx-auto h-[80vh] ">
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription >
                              <div className='w-full flex text-center'>
                                <div className='w-[70%] p-2 text-start'>
                                  <h2 className='text-black texxt-sm'>Product Unique ID: {el._id}</h2>
                                  <h1 className='text-3xl py-4 font-semibold'>Production Name: {el.name}</h1>
                                </div>
                                <div className='w-[30%] h-full text-start border-l-[2px] p-2 border-[#F7F8FA]'>
                                  <h2 className='text-lg py-3 text-start'>Ndryshoni fazen e prodhimit</h2>
                                  <Button onClick={() => handleStatusChange(el._id , 'Started')} variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Next</Button>
                                  <br />
                                  
                                    {timestamps && timestamps.filter((item) => item.item_id == el._id ).map((obj) => {
                                      return <div className='pt-5'>
                                        <p className='text-lg bg-blue-500 px-4 py-2 text-white my-1'>Ka filluar ne: <span className='font-semibold'>{obj.total_start_time.substring(0 ,10)},{obj.total_start_time.substring(11 ,19)}</span> </p>
                                        <p className='text-lg bg-red-400 px-4 py-2 text-white my-1'>Draft: <span className='font-semibold'>{obj.draft_start_time.substring(0, 10)},{obj.draft_start_time.substring(11, 19)}</span></p>
                                        
                                      </div> 
                                    })}
                                </div>
                                
                            
                              </div>
                              
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                         
                        
                        
                      })}

                    </div>
                  </div>
                  <div className='w-[100%] text-center bg-[#232323] p-3 rounded-xl'>
                    <div className='head w-full'>Started</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Started').map((el , index) => {
                        return <Dialog  style={{zIndex : '1000'}}>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] text-start cursor-pointer bg-black text-white font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          
                          <div className='w-full my-2'>
                            <div className='w-[50px] bg-red-600 px-4 py-1 rounded-2xl'></div>
                          </div>
                            <h2 className='text-xl py-3'>{el.name}</h2>
                            <span className='text-gray-400'>{el.status}</span>
                            <div className='w-[10%] p-1 bg-blue-500 rounded-xl my-1'></div>
                            <span className='text-white py-3'>€{el.total_cost}</span>
                            <div className='w-full text-end'> 
                              <span className='text-gray-400'>{el.createdAt.substring(0 , 10)}</span>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                            <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button onClick={() => handleStatusChange(el._id , 'Planning')} variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Next</Button>
                                <br />
                                
                                {
                                  timestamps && timestamps.filter((item) => item.item_id === el._id).map((obj) => {
                                   
                                  


                                    const data = calculateDateDifference(obj.draft_start_time , obj.draft_end_time);
                                 
                               

                                    return (
                                      <div className='pt-5'>
                                        
                                        <p className='text-lg '>Ka filluar ne: <span className='font-semibold'>{obj.total_start_time.substring(0 ,10)},{obj.total_start_time.substring(11 ,19)}</span> </p>
                                        <p className='text-lg '>Started: <span className='font-semibold'>{obj.started_start_time.substring(0 ,10)},{obj.started_start_time.substring(11 ,19)}</span> </p>
                                        <br />
                                        <p className='text-lg'>Koha ne Draft: <span className='font-semibold'>{data}</span>  </p>
                                      </div>
                                    );
                                  })
                                }
                                                            
                              </div>
                              
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                         
                        
                        
                      })}

                    </div>
                  </div>
                  <div className='w-[100%] text-center bg-[#232323] p-3 rounded-xl'>
                    <div className='head w-full'>Planning</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Planning').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] text-start cursor-pointer bg-black text-white font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          
                          <div className='w-full my-2'>
                            <div className='w-[50px] bg-red-600 px-4 py-1 rounded-2xl'></div>
                          </div>
                            <h2 className='text-xl py-3'>{el.name}</h2>
                            <span className='text-gray-400'>{el.status}</span>
                            <div className='w-[30%] p-1 bg-blue-500 rounded-xl my-1'></div>
                            <span className='text-white py-3'>€{el.total_cost}</span>
                            <div className='w-full text-end'> 
                              <span className='text-gray-400'>{el.createdAt.substring(0 , 10)}</span>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                            <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button onClick={() => handleStatusChange(el._id , 'Research')} variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Next</Button>
                                <br />
                                
                                {
                                  timestamps && timestamps.filter((item) => item.item_id === el._id).map((obj) => {
                                   

                                    

                                    const data = calculateDateDifference(obj.started_start_time , obj.started_end_time )
                                    const data2 = calculateDateDifference(obj.draft_start_time , obj.draft_end_time)
                                    return (
                                      <div className='pt-5'>
                                         <p className='text-lg '>Ka filluar ne: <span className='font-semibold'>{obj.total_start_time.substring(0 ,10)},{obj.total_start_time.substring(11 ,19)}</span> </p>
                                         <p className='text-lg '>Planning:<span className='font-semibold'>{obj.planning_start_time.substring(0 ,10)},{obj.planning_start_time.substring(11 ,19)}</span> </p>
                                         <br />
                                         <p className='text-lg '>Koha ne Draft: <span className='font-semibold'>{data2 }</span> </p>
                                        <p className='text-lg '>Koha ne Starting: <span className='font-semibold'>{data}</span> </p>
                                      </div>
                                    );
                                  })
                                }
                                                            
                              </div>
                              
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                         
                        
                        
                      })}

                    </div>
                  </div>
                  <div className='w-[100%] text-center bg-[#232323] p-3 rounded-xl'>
                    <div className='head w-full'>Research</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Research').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] text-start cursor-pointer bg-black text-white font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          
                          <div className='w-full my-2'>
                            <div className='w-[50px] bg-red-600 px-4 py-1 rounded-2xl'></div>
                          </div>
                            <h2 className='text-xl py-3'>{el.name}</h2>
                            <span className='text-gray-400'>{el.status}</span>
                            <div className='w-[50%] p-1 bg-blue-500 rounded-xl my-1'></div>
                            <span className='text-white py-3'>€{el.total_cost}</span>
                            <div className='w-full text-end'> 
                              <span className='text-gray-400'>{el.createdAt.substring(0 , 10)}</span>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                            <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button onClick={() => handleStatusChange(el._id , 'Development')} variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Next</Button>
                                <br />
                                
                                {
                                  timestamps && timestamps.filter((item) => item.item_id === el._id).map((obj) => {
                                   
                                    const data = calculateDateDifference(obj.started_start_time , obj.started_end_time )
                                    const data2 = calculateDateDifference(obj.draft_start_time , obj.draft_end_time)
                                    const data3 = calculateDateDifference(obj.planning_start_time , obj.planning_end_time)

                                    return (
                                      <div className='pt-5'>
                                        
                                        <p className='text-lg '>Ka filluar ne: <span className='font-semibold'>{obj.total_start_time.substring(0 ,10)},{obj.total_start_time.substring(11 ,19)}</span> </p>
                                         <p className='text-lg '>Research:<span className='font-semibold'>{obj.research_start_time.substring(0 ,10)},{obj.research_start_time.substring(11 ,19)}</span> </p>
                                         <br />
                                         <p className='text-lg '>Koha ne Draft: <span className='font-semibold'>{data2 }</span> </p>
                                        <p className='text-lg '>Koha ne Starting: <span className='font-semibold'>{data}</span> </p>
                                        <p className='text-lg '>Koha ne Planning: <span className='font-semibold'>{data3}</span> </p>
                                      </div>
                                    );
                                  })
                                }
                                                            
                              </div>
                              
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                         
                        
                        
                      })}

                    </div>
                  </div>
                  <div className='w-[100%] text-center bg-[#232323] p-3 rounded-xl'>
                    <div className='head w-full'>Development</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Development').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] text-start cursor-pointer bg-black text-white font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          
                          <div className='w-full my-2'>
                            <div className='w-[50px] bg-red-600 px-4 py-1 rounded-2xl'></div>
                          </div>
                            <h2 className='text-xl py-3'>{el.name}</h2>
                            <span className='text-gray-400'>{el.status}</span>
                            <div className='w-[70%] p-1 bg-blue-500 rounded-xl my-1'></div>
                            <span className='text-white py-3'>€{el.total_cost}</span>
                            <div className='w-full text-end'> 
                              <span className='text-gray-400'>{el.createdAt.substring(0 , 10)}</span>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                            <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button onClick={() => handleStatusChange(el._id , 'Testing')} variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Next</Button>
                                <br />
                                
                                {
                                  timestamps && timestamps.filter((item) => item.item_id === el._id).map((obj) => {
                                   
                                    const data = calculateDateDifference(obj.started_start_time , obj.started_end_time )
                                    const data2 = calculateDateDifference(obj.draft_start_time , obj.draft_end_time)
                                    const data3 = calculateDateDifference(obj.planning_start_time , obj.planning_end_time);
                                    const data4 = calculateDateDifference(obj.research_start_time , obj.research_end_time);
                                    return (
                                      <div className='pt-5'>
                                        
                                      <p className='text-lg '>Ka filluar ne: <span className='font-semibold'>{obj.total_start_time.substring(0 ,10)},{obj.total_start_time.substring(11 ,19)}</span> </p>
                                       <p className='text-lg '>Development:<span className='font-semibold'>{obj.development_start_time.substring(0 ,10)},{obj.development_start_time.substring(11 ,19)}</span> </p>
                                       <br />
                                       <p className='text-lg '>Koha ne Draft: <span className='font-semibold'>{data2 }</span> </p>
                                      <p className='text-lg '>Koha ne Starting: <span className='font-semibold'>{data}</span> </p>
                                      <p className='text-lg '>Koha ne Planning: <span className='font-semibold'>{data3}</span> </p>
                                      <p className='text-lg '>Koha ne Research: <span className='font-semibold'>{data4}</span> </p>
                                    </div>
                                    );
                                  })
                                }
                                                            
                              </div>
                              
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                         
                        
                        
                      })}

                    </div>
                  </div>
                  <div className='w-[100%] text-center bg-[#232323] p-3 rounded-xl'>
                    <div className='head w-full'>Testing</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Testing').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] text-start cursor-pointer bg-black text-white font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          
                          <div className='w-full my-2'>
                            <div className='w-[50px] bg-red-600 px-4 py-1 rounded-2xl'></div>
                          </div>
                            <h2 className='text-xl py-3'>{el.name}</h2>
                            <span className='text-gray-400'>{el.status}</span>
                            <div className='w-[80%] p-1 bg-blue-500 rounded-xl my-1'></div>
                            <span className='text-white py-3'>€{el.total_cost}</span>
                            <div className='w-full text-end'> 
                              <span className='text-gray-400'>{el.createdAt.substring(0 , 10)}</span>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                            <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button onClick={() => handleStatusChange(el._id , 'Review')} variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Next</Button>
                                <br />
                                
                                {
                                  timestamps && timestamps.filter((item) => item.item_id === el._id).map((obj) => {
                                   
  
                                    const data = calculateDateDifference(obj.started_start_time , obj.started_end_time )
                                    const data2 = calculateDateDifference(obj.draft_start_time , obj.draft_end_time)
                                    const data3 = calculateDateDifference(obj.planning_start_time , obj.planning_end_time);
                                    const data4 = calculateDateDifference(obj.research_start_time , obj.research_end_time);
                                    const data5 = calculateDateDifference(obj.development_start_time , obj.development_end_time);

                                    return (
                                      <div className='pt-5'>
                                        
                                      <p className='text-lg '>Ka filluar ne: <span className='font-semibold'>{obj.total_start_time.substring(0 ,10)},{obj.total_start_time.substring(11 ,19)}</span> </p>
                                       <p className='text-lg '>Testing:<span className='font-semibold'>{obj.development_start_time.substring(0 ,10)},{obj.development_start_time.substring(11 ,19)}</span> </p>
                                       <br />
                                       <p className='text-lg '>Koha ne Draft: <span className='font-semibold'>{data2 }</span> </p>
                                      <p className='text-lg '>Koha ne Starting: <span className='font-semibold'>{data}</span> </p>
                                      <p className='text-lg '>Koha ne Planning: <span className='font-semibold'>{data3}</span> </p>
                                      <p className='text-lg '>Koha ne Research: <span className='font-semibold'>{data4}</span> </p>
                                      <p className='text-lg '>Koha ne Development: <span className='font-semibold'>{data5}</span> </p>
                                    </div>
                                    );
                                  })
                                }
                                                            
                              </div>
                              
                              
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                         
                        
                        
                      })}

                    </div>
                  </div>
                  <div className='w-[100%] text-center bg-[#232323] p-3 rounded-xl'>
                    <div className='head w-full'>Review</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Review').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] text-start cursor-pointer bg-black text-white font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          
                          <div className='w-full my-2'>
                            <div className='w-[50px] bg-red-600 px-4 py-1 rounded-2xl'></div>
                          </div>
                            <h2 className='text-xl py-3'>{el.name}</h2>
                            <span className='text-gray-400'>{el.status}</span>
                            <div className='w-[90%] p-1 bg-blue-500 rounded-xl my-1'></div>
                            <span className='text-white py-3'>€{el.total_cost}</span>
                            <div className='w-full text-end'> 
                              <span className='text-gray-400'>{el.createdAt.substring(0 , 10)}</span>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                            <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button onClick={() => handleStatusChange(el._id , 'Finished')} variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Next</Button>
                                <br />
                                
                                {
                                  timestamps && timestamps.filter((item) => item.item_id === el._id).map((obj) => {


                                    const data = calculateDateDifference(obj.started_start_time , obj.started_end_time )
                                    const data2 = calculateDateDifference(obj.draft_start_time , obj.draft_end_time)
                                    const data3 = calculateDateDifference(obj.planning_start_time , obj.planning_end_time);
                                    const data4 = calculateDateDifference(obj.research_start_time , obj.research_end_time);
                                    const data5 = calculateDateDifference(obj.development_start_time , obj.development_end_time);
                                    const data6 = calculateDateDifference(obj.testing_start_time , obj.testing_end_time)

                                    return (
                                     <div className='pt-5'>
                                        
                                      <p className='text-lg '>Ka filluar ne: <span className='font-semibold'>{obj.total_start_time.substring(0 ,10)},{obj.total_start_time.substring(11 ,19)}</span> </p>
                                       <p className='text-lg '>Review:<span className='font-semibold'>{obj.development_start_time.substring(0 ,10)},{obj.development_start_time.substring(11 ,19)}</span> </p>
                                       <br />
                                       <p className='text-lg '>Koha ne Draft: <span className='font-semibold'>{data2 }</span> </p>
                                      <p className='text-lg '>Koha ne Starting: <span className='font-semibold'>{data}</span> </p>
                                      <p className='text-lg '>Koha ne Planning: <span className='font-semibold'>{data3}</span> </p>
                                      <p className='text-lg '>Koha ne Research: <span className='font-semibold'>{data4}</span> </p>
                                      <p className='text-lg '>Koha ne Development: <span className='font-semibold'>{data5}</span> </p>
                                      <p className='text-lg '>Koha ne Testing: <span className='font-semibold'>{data6}</span> </p>
                                    </div>
                                    );
                                  })
                                }
                                                            
                              </div>
                              
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                         
                        
                        
                      })}

                    </div>
                  </div>
                  <div className='w-[100%] text-center bg-[#232323] p-3 rounded-xl'>
                    <div className='head w-full'>Finished</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Finished').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] text-start cursor-pointer bg-black text-white font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          
                          <div className='w-full my-2'>
                            <div className='w-[50px] bg-red-600 px-4 py-1 rounded-2xl'></div>
                          </div>
                            <h2 className='text-xl py-3'>{el.name}</h2>
                            <span className='text-gray-400'>{el.status}</span>
                            <div className='w-[100%] p-1 bg-blue-500 rounded-xl my-1'></div>
                            <span className='text-white py-3'>€{el.total_cost}</span>
                            <div className='w-full text-end'> 
                              <span className='text-gray-400'>{el.createdAt.substring(0 , 10)}</span>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                            <div className='w-full text-center'>
                                <h2 className='text-lg py-1'>Produkti ka perfunduar</h2>
                                {/* <Button  variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Next</Button> */}
                                <br />
                                
                                {
                                  timestamps && timestamps.filter((item) => item.item_id === el._id).map((obj) => {
                                   
                                    const data = calculateDateDifference(obj.started_start_time , obj.started_end_time )
                                    const data2 = calculateDateDifference(obj.draft_start_time , obj.draft_end_time)
                                    const data3 = calculateDateDifference(obj.planning_start_time , obj.planning_end_time);
                                    const data4 = calculateDateDifference(obj.research_start_time , obj.research_end_time);
                                    const data5 = calculateDateDifference(obj.development_start_time , obj.development_end_time);
                                    const data6 = calculateDateDifference(obj.testing_start_time , obj.testing_end_time)
                                    const data7 = calculateDateDifference(obj.review_start_time , obj.review_end_time);
                                    return (
                                      <div className='pt-5'>
                                        
                                      <p className='text-lg '>Ka filluar ne: <span className='font-semibold'>{obj.total_start_time.substring(0 ,10)},{obj.total_start_time.substring(11 ,19)}</span> </p>
                                      <p className='text-lg '>Ka mbaruar ne: <span className='font-semibold'>{obj.total_end_time.substring(0 ,10)},{obj.total_end_time.substring(11 ,19)}</span> </p>
                                       <p className='text-lg '>Review:<span className='font-semibold'>{obj.development_start_time.substring(0 ,10)},{obj.development_start_time.substring(11 ,19)}</span> </p>
                                       <br />
                                       <p className='text-lg '>Koha ne Draft: <span className='font-semibold'>{data2 }</span> </p>
                                      <p className='text-lg '>Koha ne Starting: <span className='font-semibold'>{data}</span> </p>
                                      <p className='text-lg '>Koha ne Planning: <span className='font-semibold'>{data3}</span> </p>
                                      <p className='text-lg '>Koha ne Research: <span className='font-semibold'>{data4}</span> </p>
                                      <p className='text-lg '>Koha ne Development: <span className='font-semibold'>{data5}</span> </p>
                                      <p className='text-lg '>Koha ne Testing: <span className='font-semibold'>{data6}</span> </p>
                                      <p className='text-lg '>Koha ne Review: <span className='font-semibold'>{data7}</span> </p>
                                    </div>
                                    );
                                  })
                                }
                                                            
                              </div>
                              
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                         
                        
                        
                      })}

                    </div>
                  </div>
                  
                  
                </div>
        </div>
    )
}

export default ProductList
