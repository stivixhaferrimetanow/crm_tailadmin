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




    const handleStatusChange = async (id) => {
      try{
        alert(id)
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
                    <th>Change Status</th>
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
                                        <td className='justify-center text-center'>
                                            <select className='bg-black text-white cursor-pointer' onChange={(e) => changeStatus(e.target.value , el._id) }  name="" id="">
                                              <option value=''>Select</option>
                                              <option value="Draft">Draft</option>
                                              <option value="Started">Started</option>
                                              <option value="Planning">Planning</option>
                                              <option value="Research">Research</option>
                                              <option value="Development">Development</option>
                                              <option value="Testing">Testing</option>
                                              <option value="Review">Review</option>
                                              <option value="Finished">Finished</option>
                                            </select>
                                        </td>
                                     </tr>
                        })}
                    
                   
                    
                </tbody>
                </table>



                {/* <div key={randomKey && randomKey} className='my-5 flex gap-3 w-full justify-evenly'  >
                        <div className='rounded shadow-lg overflow-hidden w-[10%] bg-black'>
                          <div className='p-5 w-full bg-black text-white text-lg font-semibold'>
                            Ready For Production
                            <hr className='opacity-[0.3] mt-2 w-full mx-auto'/>
                          </div>
                          {drafted && drafted.map((el , index) => {
                            return <Dialog   key={index}>
                            <DialogTrigger className='w-[90%] mx-auto ml-5'>
                            <div  className='flex gap-2 items-center mx-auto my-2 bg-white p-4 rounded'>
                              <FaSitemap />
                              {el.name}
                            </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription>
                                  <div className='my-5 flex items-center justify-center flex-col text-center'>
                                    <h2 className='text-xl my-2'>Ndryshoni statusin e prodhimit</h2>
                                    <Button variant="outline" className="bg-black text-white hover:text-white hover:bg-black">Next</Button>
                                  </div>
                                  
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog> 
                            
                           
                          })}
                        </div>
                        

                        <div className='rounded shadow-lg overflow-hidden w-[25%] bg-black'>
                          <div className='p-5 w-full bg-black text-white text-lg font-semibold'>
                            Started
                            <hr className='opacity-[0.3] mt-2 w-full mx-auto'/>
                          </div>
                          {started && started.map((el , index) => {
                            return <Dialog   key={index}>
                            <DialogTrigger className='w-[90%] mx-auto ml-5'>
                            <div  className='flex gap-2 items-center mx-auto my-2 bg-white p-4 rounded'>
                              <FaSitemap />
                              {el.name}
                            </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanently delete your account
                                  and remove your data from our servers.
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog> 
                          })}
                        </div>


                        <div className='rounded shadow-lg overflow-hidden w-[25%] bg-black'>
                          <div className='p-5 w-full bg-black text-white text-lg font-semibold'>
                            Started
                            <hr className='opacity-[0.3] mt-2 w-full mx-auto'/>
                          </div>
                          {started && started.map((el , index) => {
                            return <Dialog   key={index}>
                            <DialogTrigger className='w-[90%] mx-auto ml-5'>
                            <div  className='flex gap-2 items-center mx-auto my-2 bg-white p-4 rounded'>
                              <FaSitemap />
                              {el.name}
                            </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanently delete your account
                                  and remove your data from our servers.
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog> 
                          })}
                        </div>

                        <div className='rounded shadow-lg overflow-hidden w-[25%] bg-black'>
                          <div className='p-5 w-full bg-black text-white text-lg font-semibold'>
                            Started
                            <hr className='opacity-[0.3] mt-2 w-full mx-auto'/>
                          </div>
                          {started && started.map((el , index) => {
                            return <Dialog   key={index}>
                            <DialogTrigger className='w-[90%] mx-auto ml-5'>
                            <div  className='flex gap-2 items-center mx-auto my-2 bg-white p-4 rounded'>
                              <FaSitemap />
                              {el.name}
                            </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanently delete your account
                                  and remove your data from our servers.
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog> 
                          })}
                        </div>


                        <div className='rounded shadow-lg overflow-hidden w-[25%] bg-black'>
                          <div className='p-5 w-full bg-black text-white text-lg font-semibold'>
                            Started
                            <hr className='opacity-[0.3] mt-2 w-full mx-auto'/>
                          </div>
                          {started && started.map((el , index) => {
                            return <Dialog   key={index}>
                            <DialogTrigger className='w-[90%] mx-auto ml-5'>
                            <div  className='flex gap-2 items-center mx-auto my-2 bg-white p-4 rounded'>
                              <FaSitemap />
                              {el.name}
                            </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanently delete your account
                                  and remove your data from our servers.
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog> 
                          })}
                        </div>


                        <div className='rounded shadow-lg overflow-hidden w-[25%] bg-black'>
                          <div className='p-5 w-full bg-black text-white text-lg font-semibold'>
                            Progressing
                            <hr className='opacity-[0.3] mt-2 w-full mx-auto'/>
                          </div>
                          {progressing && progressing.map((el , index) => {
                            return <Dialog   key={index}>
                            <DialogTrigger className='w-[90%] mx-auto ml-5'>
                            <div  className='flex gap-2 items-center mx-auto my-2 bg-white p-4 rounded'>
                              <FaSitemap />
                              {el.name}
                            </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanently delete your account
                                  and remove your data from our servers.
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog> 
                          })}
                        </div>


                        <div className='rounded shadow-lg overflow-hidden w-[25%] bg-black'>
                          <div className='p-5 w-full bg-black text-white text-lg font-semibold'>
                            Finished
                            <hr className='opacity-[0.3] mt-2 w-full mx-auto'/>
                          </div>
                          { finished && finished.map((el , index) => {
                            return <Dialog   key={index}>
                            <DialogTrigger className='w-[90%] mx-auto ml-5'>
                            <div  className='flex gap-2 items-center mx-auto my-2 bg-white p-4 rounded'>
                              <FaSitemap />
                              {el.name}
                            </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanently delete your account
                                  and remove your data from our servers.
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog> 
                          })}
                        </div>

                </div> */}


                <div className='w-full p-2 flex gap-1 bg-black my-5 rounded-lg shadow-lg text-white'>
                  <div className='w-[10%] text-center'></div>
                  <div className='w-[10%] text-center flex flex-col'>
                    <div className='head w-full'>Draft</div>
                    <div className='production-body flex flex-col gap-5 my-2'>
                      <br />
                      
                      {data && data.filter((el) => el.status == 'Draft').map((el , index) => {
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] cursor-pointer bg-black relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                              <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button onClick={() => handleStatusChange(el._id)} variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Button</Button>
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
                        return <Dialog>
                        <DialogTrigger>

                        <div key={index} className='border-[1px] cursor-pointer bg-black relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                              <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Button</Button>
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

                        <div key={index} className='border-[1px] cursor-pointer bg-black relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                              <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Button</Button>
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

                        <div key={index} className='border-[1px] cursor-pointer bg-black relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                              <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Button</Button>
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

                        <div key={index} className='border-[1px] cursor-pointer bg-black relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                              <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Button</Button>
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

                        <div key={index} className='border-[1px] cursor-pointer bg-black relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                              <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Button</Button>
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

                        <div key={index} className='border-[1px] cursor-pointer bg-black relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                              <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Button</Button>
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

                        <div key={index} className='border-[1px] cursor-pointer bg-black relative z-[101] border-white rounded-lg p-4 w-full overflow-hidden text-sm'>
                          {el.name}
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                              <div className='w-full text-center'>
                                <h2 className='text-lg py-3'>Ndryshoni fazen e prodhimit</h2>
                                <Button variant="outline" className="bg-black text-white hover:bg-black hover:text-white">Button</Button>
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
