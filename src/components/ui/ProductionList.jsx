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



const ProductList = ({data , warehouse , stockData}) => {



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

    },[])




    const handleStatusChange = async (id , status) => {
      try{
          const res = await axios.post('http://localhost:3000/api/changetime', {item_id: id, current_status: status });
          window.location.reload()
      }catch(error){
        console.log(error)
      }
    }
    


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
                <table className="table-auto w-full rounded-lg shadow-lg">
                <thead className='bg-black p-2 text-white '>
                    <tr>
                    <th>ID</th>
                    <th>Emri</th>
                    <th>Lloji</th>
                    
                    <th>Kosto Materiali</th>
                    <th>Kosto Prodhimi</th>
                    <th>Kosto Totale</th>
                    <th>Cmimi i Shitjes</th>
                    <th>Status</th>
                  
                    </tr>
                </thead>
                <tbody className='bg-black text-white'>
                    
                        {data && data.map((el , index) => {
                            return <tr key={index}>
                                        <td className='justify-center text-center py-3'>
                                            

                                            
                                            {index + 1}
                                           
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
                                        
                                     </tr>
                        })}
                    
                   
                    
                </tbody>
                </table>



                


                <div className='w-full p-2 flex gap-1 bg-black my-5 rounded-lg shadow-lg text-white'>
                  <div className='w-[10%] text-center'></div>
                  <div className='w-[10%] text-center flex flex-col'>
                    <div className='head w-full'>Draft</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Draft').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] cursor-pointer bg-white text-black font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                              <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button onClick={() => handleStatusChange(el._id , 'Started')} variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Next</Button>
                                <br />
                                
                                   {timestamps && timestamps.filter((item) => item.item_id == el._id ).map((obj) => {
                                    return <div className='pt-5'>
                                      
                                      <p>Draft Started at:{obj.draft_start_time.substring(0, 10)},{obj.draft_start_time.substring(11, 19)}</p>
                                    </div> 
                                  })}
                            
                              </div>
                              
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                         
                        
                        
                      })}

                    </div>
                  </div>
                  <div className='w-[10%] text-center'>
                    <div className='head w-full'>Started</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Started').map((el , index) => {
                        return <Dialog  style={{zIndex : '1000'}}>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] cursor-pointer bg-white text-black font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
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
                                   
                                    var draftStartTime = new Date(obj.draft_start_time);
                                    var draftEndTime = new Date(obj.draft_end_time);
                                    var timeDiff = draftEndTime - draftStartTime;
                                    var secondsDiff = Math.floor(timeDiff / 1000);
                                    var minutesDiff = Math.floor(secondsDiff / 60);
                                    var hoursDiff = Math.floor(minutesDiff / 60);
                                    var daysDiff = Math.floor(hoursDiff / 24);
                                    var remainingHours = hoursDiff % 24;
                                    var remainingMinutes = minutesDiff % 60;
                                    var remainingSeconds = secondsDiff % 60;

                                    return (
                                      <div className='pt-5'>
                                        
                                        <p>From Draft to Started: {daysDiff} d, {remainingHours} h, {remainingMinutes} m, {remainingSeconds} s</p>
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
                  <div className='w-[10%] text-center'>
                    <div className='head w-full'>Planning</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Planning').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] cursor-pointer bg-white text-black font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
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
                                   
                                    var draftStartTime = new Date(obj.started_start_time);
                                    var draftEndTime = new Date(obj.started_end_time);
                                    var timeDiff = draftEndTime - draftStartTime;
                                    var secondsDiff = Math.floor(timeDiff / 1000);
                                    var minutesDiff = Math.floor(secondsDiff / 60);
                                    var hoursDiff = Math.floor(minutesDiff / 60);
                                    var daysDiff = Math.floor(hoursDiff / 24);
                                    var remainingHours = hoursDiff % 24;
                                    var remainingMinutes = minutesDiff % 60;
                                    var remainingSeconds = secondsDiff % 60;

                                    return (
                                      <div className='pt-5'>
                                        
                                        <p>Time Spent Starting: {daysDiff} d, {remainingHours} h, {remainingMinutes} m, {remainingSeconds} s</p>
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
                  <div className='w-[10%] text-center'>
                    <div className='head w-full'>Research</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Research').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] cursor-pointer bg-white text-black font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
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
                                   
                                    var draftStartTime = new Date(obj.planning_start_time);
                                    var draftEndTime = new Date(obj.planning_end_time);
                                    var timeDiff = draftEndTime - draftStartTime;
                                    var secondsDiff = Math.floor(timeDiff / 1000);
                                    var minutesDiff = Math.floor(secondsDiff / 60);
                                    var hoursDiff = Math.floor(minutesDiff / 60);
                                    var daysDiff = Math.floor(hoursDiff / 24);
                                    var remainingHours = hoursDiff % 24;
                                    var remainingMinutes = minutesDiff % 60;
                                    var remainingSeconds = secondsDiff % 60;

                                    return (
                                      <div className='pt-5'>
                                        
                                        <p>Time Spent Planning: {daysDiff} d, {remainingHours} h, {remainingMinutes} m, {remainingSeconds} s</p>
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
                  <div className='w-[10%] text-center'>
                    <div className='head w-full'>Development</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Development').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] cursor-pointer bg-white text-black font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
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
                                   
                                    var draftStartTime = new Date(obj.research_start_time);
                                    var draftEndTime = new Date(obj.research_end_time);
                                    var timeDiff = draftEndTime - draftStartTime;
                                    var secondsDiff = Math.floor(timeDiff / 1000);
                                    var minutesDiff = Math.floor(secondsDiff / 60);
                                    var hoursDiff = Math.floor(minutesDiff / 60);
                                    var daysDiff = Math.floor(hoursDiff / 24);
                                    var remainingHours = hoursDiff % 24;
                                    var remainingMinutes = minutesDiff % 60;
                                    var remainingSeconds = secondsDiff % 60;

                                    return (
                                      <div className='pt-5'>
                                        
                                        <p>Time Spent Researching: {daysDiff} d, {remainingHours} h, {remainingMinutes} m, {remainingSeconds} s</p>
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
                  <div className='w-[10%] text-center'>
                    <div className='head w-full'>Testing</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Testing').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] cursor-pointer bg-white text-black font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
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
                                   
                                    var draftStartTime = new Date(obj.development_start_time);
                                    var draftEndTime = new Date(obj.development_end_time);
                                    var timeDiff = draftEndTime - draftStartTime;
                                    var secondsDiff = Math.floor(timeDiff / 1000);
                                    var minutesDiff = Math.floor(secondsDiff / 60);
                                    var hoursDiff = Math.floor(minutesDiff / 60);
                                    var daysDiff = Math.floor(hoursDiff / 24);
                                    var remainingHours = hoursDiff % 24;
                                    var remainingMinutes = minutesDiff % 60;
                                    var remainingSeconds = secondsDiff % 60;

                                    return (
                                      <div className='pt-5'>
                                        
                                        <p>Time Spent Developing: {daysDiff} d, {remainingHours} h, {remainingMinutes} m, {remainingSeconds} s</p>
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
                  <div className='w-[10%] text-center'>
                    <div className='head w-full'>Review</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Review').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] cursor-pointer bg-white text-black font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
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
                                   
                                    var draftStartTime = new Date(obj.testing_start_time);
                                    var draftEndTime = new Date(obj.testing_end_time);
                                    var timeDiff = draftEndTime - draftStartTime;
                                    var secondsDiff = Math.floor(timeDiff / 1000);
                                    var minutesDiff = Math.floor(secondsDiff / 60);
                                    var hoursDiff = Math.floor(minutesDiff / 60);
                                    var daysDiff = Math.floor(hoursDiff / 24);
                                    var remainingHours = hoursDiff % 24;
                                    var remainingMinutes = minutesDiff % 60;
                                    var remainingSeconds = secondsDiff % 60;

                                    return (
                                      <div className='pt-5'>
                                        
                                        <p>Time Spent Testing: {daysDiff} d, {remainingHours} h, {remainingMinutes} m, {remainingSeconds} s</p>
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
                  <div className='w-[10%] text-center'>
                    <div className='head w-full'>Finished</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Finished').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] cursor-pointer bg-white text-black font-semibold relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
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
                                   
                                    var draftStartTime = new Date(obj.total_start_time);
                                    var draftEndTime = new Date(obj.total_end_time);
                                    var timeDiff = draftEndTime - draftStartTime;
                                    var secondsDiff = Math.floor(timeDiff / 1000);
                                    var minutesDiff = Math.floor(secondsDiff / 60);
                                    var hoursDiff = Math.floor(minutesDiff / 60);
                                    var daysDiff = Math.floor(hoursDiff / 24);
                                    var remainingHours = hoursDiff % 24;
                                    var remainingMinutes = minutesDiff % 60;
                                    var remainingSeconds = secondsDiff % 60;

                                    return (
                                      <div className='pt-5'>
                                        
                                        <p>Total Spending Time: {daysDiff} d, {remainingHours} h, {remainingMinutes} m, {remainingSeconds} s</p>
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
                  <div className='w-[10%] text-center'></div>
                  
                </div>
        </div>
    )
}

export default ProductList
