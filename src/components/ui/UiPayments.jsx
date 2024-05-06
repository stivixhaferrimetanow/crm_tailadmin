'use client'
import React , {useState , useEffect , useRef} from 'react'
import axios from 'axios'
import Slider from './Slider'
import { MdArrowOutward } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { MdRecentActors } from "react-icons/md";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Progress } from "@/components/ui/progress"





const UiPayments = () => {


    const [customers , setCustomers] = useState([])
    const [customer , setCustomer] = useState([]);




    const getCustomers = async () => {
        try{
            const res = await axios.get('http://localhost:3000/api/customers');
            const myData = res.data.data
            setCustomers(res.data.data);
            if(email != '' || email != null){
                const myValue = myData.filter((el) => el.email == email);
                setCustomer(myValue[0])
            }            
        }catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        getCustomers();
        getPayments()
    },[])


    const [name , setName ] = useState('');
    const [email , setEmail] = useState('');
    const [phone , setPhone ] = useState('');
    const [user_id , setUserId] = useState('');
    const [value , setValue] = useState(0);
    const [status , setStatus] = useState('');
    const [payment_method , setPaymentMethod] = useState('')
    const [transaction_id , setTransatctionId] = useState('');
    const [description , setDescription] = useState('');
    const [tax , setTax]  = useState(0);


    const [data , setData] = useState([])

    const getPayments = async () => {
        try{
            const res = await axios.get('http://localhost:3000/api/getpayments', {'cache': 'no-store'});
            setData(res.data.data)
        }catch(error){
            console.log(error)
        }
    }


    const submitPayment  = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/payment', {
                name: name,
                email: email,
                value: value,
                status: status,
                payment_method: payment_method,
                transaction_id: transaction_id,
                description: description,
                tax: tax
            }, {'cache':'no-store'});
    
            console.log(res);
            if(res.status == 200){
                window.location.reload();
            }
        } catch(error) {  
            console.log(error);
        }
    }



    return(
        <div className='w-[95%] mx-auto my-4'>
            <div className='w-full flex items-center py-5'>
                <div className='w-[50%] flex gap-3 '>
                    <div>
                        <span>Total Balance:</span>
                        <h2 className='text-black font-bolder text-3xl'>€36,254</h2>
                    </div>
                    <div className='flex items-center gap-3 pt-6'>
                        <MdArrowOutward className='bg-[#A5F403]  rounded-full' />
                        <span>€328,32 Today, Feb 15</span>
                    </div>
                </div>
                <div className='w-[50%] flex justify-end pt-1'>
                <Dialog>
                <DialogTrigger>
                    <button className='bg-[#0151CA] hover:bg-[#023F9B] text-white px-4 py-2 rounded-lg shadow-lg  flex items-center gap-2 text-center'>
                        <MdArrowOutward />
                        Add Payment
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>
                     Shto nje pagese
                    </DialogTitle>
                    <DialogDescription>
                       <div className='w-full flex-col my-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full px-4 py-2 focus:outline-none rounded-lg shadow-lg text-lg border-[2px] border-gray-400' />
                       </div>
                       <div className='w-full flex-col my-2'>
                        <label htmlFor="">Email</label>
                        <select name="" value={email} onChange={(e) => setEmail(e.target.value)} id="" className='w-full px-4 py-2 focus:outline-none rounded-lg shadow-lg text-lg border-[2px] border-gray-400'>
                            <option value="">-</option>
                            {customers && customers.map((el , index) => {
                                return  <option key={index} value={el.email}>{el.email}</option>
                            })}
                        </select>
                       </div>
                       
                       <div className='w-full flex-col my-2'>
                        <label htmlFor="">Value</label>
                        <input type="number" value={value} onChange={(e) => setValue(e.target.value)}    className='w-full px-4 py-2 focus:outline-none rounded-lg shadow-lg text-lg border-[2px] border-gray-400' />
                       </div>
                       <div className='w-full flex-col my-2'>
                        <label htmlFor="">Status</label>
                        <input type="text"  value={status} onChange={(e) => setStatus(e.target.value)}  className='w-full px-4 py-2 focus:outline-none rounded-lg shadow-lg text-lg border-[2px] border-gray-400' />
                       </div>
                       <div className='w-full flex-col my-2'>
                        <label htmlFor="">Payment Method</label>
                        <select name="" value={payment_method} onChange={(e) => setPaymentMethod(e.target.value)} id="" className='w-full px-4 py-2 focus:outline-none rounded-lg shadow-lg text-lg border-[2px] border-gray-400' >
                            <option value="">-</option>
                            <option value="credit_debit">Credit or Debit Card</option>
                            <option value="apple_pay">Apple Pay</option>
                            <option value="stripe">Stripe</option>
                            <option value="paypal">Paypal</option>
                            <option value="google_pay">Google Pay</option>
                            <option value="samsung_pay">Samsung Pay</option>
                            <option value="cryptocurrency">Cryptocurrency</option>
                            <option value="westernunion">WesternUnion</option>
                            <option value="other">Other</option>
                        </select>
                       </div>
                       <div className='w-full flex-col my-2'>
                        <label htmlFor="">Transaction ID</label>
                        <input type="text" value={transaction_id} onChange={(e) => setTransatctionId(e.target.value)} className='w-full px-4 py-2 focus:outline-none rounded-lg shadow-lg text-lg border-[2px] border-gray-400' />
                       </div>
                       <div className='w-full flex-col my-2'>
                        <label htmlFor="">Tax</label>
                        <input type="number" value={tax} onChange={(e) => setTax(e.target.value)}  className='w-full px-4 py-2 focus:outline-none rounded-lg shadow-lg text-lg border-[2px] border-gray-400' />
                       </div>
                       <div className='w-full flex-col my-2'>
                        <label htmlFor="">Description</label>
                        <textarea type="number" value={description} onChange={(e) => setDescription(e.target.value)}  className='w-full px-4 py-2 focus:outline-none rounded-lg shadow-lg text-lg border-[2px] border-gray-400'></textarea>
                       </div>
                      
                       <div className='w-full flex-col my-2'>
                        <button onClick={submitPayment} className='bg-[#0151CA] w-full text-lg hover:bg-[#023F9B] text-white px-4 py-4 rounded-lg shadow-lg  text-center'>Submit</button>
                       </div>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
                </Dialog>
                  
                </div>
            </div>
            <div className=''>
                <h2 className='w-full text-end'>Last 30 days</h2>
                <Slider  data={data} />
            </div>
            <div className='w-full flex gap-5 my-[5%] '>
                <div className='w-[50%]'>
                    <div className='flex items-center gap-3 text-lg '>
                        <MdRecentActors />
                        Recent Payments
                    </div>
                    <div className='flex-col mt-6 overflow-y-scroll h-[40vh]'>
                        {data.payments && data.payments.map((el , index) => {
                            return <div key={index} className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-black'></div>
                            </div>
                            <div className='w-[40%]'>
                                <h2 className='font-semibold text-lg'>{el.name}</h2>
                                <span className='text-sm text-gray-600'>{el.createdAt.substring(0 , 10)}</span>
                            </div>
                            <div className='w-[30%] flex items-center'> 
                                <button className='bg-[#F6F8FC] px-4 py-2 tex-gray-600'>VISA</button>
                            </div>
                            {el.value > 0 ? ( <div className='w-[20%] flex items-center text-green-600'>
                                +€{el.value}
                            </div>) : (<div className='w-[20%] flex items-center text-red-600'>
                                -€{el.value}
                            </div>) }
                           
                        </div>
                        })}
                        
                       
                    </div>
                   
                    
                </div>
                <div className='w-[50%]'>
                <Tabs defaultValue="account" className="w-full">
                <TabsList className="bg-[#EDEDED]">
                    <TabsTrigger value="account" className="rounded-none  text-[#A5F403]">Money In</TabsTrigger>
                  
                </TabsList>
                <TabsContent value="account">
                <div className='flex-col mt-3  overflow-y-scroll h-[40vh]'>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#635BFF]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>Stripe  <span className='text-[#635BFF]'>{data.stripe_percentage}%</span> </h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.stripe_percentage} />
                                </span>
                            </div>
                            
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-black'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>Apple Pay: <span className='text-black'>{data.apple_pay_percentage}%</span></h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.apple_pay_percentage} />
                                </span>
                            </div>
                            
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#023087]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>PayPal: <span className='text-[#023087]'>{data.paypal_percentage}%</span></h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.paypal_percentage} />
                                </span>
                            </div>
                          
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#2DA94F]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>Google Pay: <span className='text-[#2DA94F]'>{data.google_pay_percentage}%</span></h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.google_pay_percentage} />
                                </span>
                            </div>
                            
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#1a241d]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>Credit and Debit Card: <span className='text-[#1a241d]'>{data.credit_debit_percentage}%</span></h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.credit_debit_percentage} />
                                </span>
                            </div>
                           
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#1E4BC6]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>Samsung Pay: <span className='text-[#1E4BC6]'>{data.samsung_pay_percentage}%</span></h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.samsung_pay_percentage} />
                                </span>
                            </div>
                           
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#F7931A]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>CryptoCurrency: <span className='text-[#F7931A]'>{data.cryptocurrency_percentage}%</span></h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.cryptocurrency_percentage} />
                                </span>
                            </div>
                            
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#FFDE38]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>WesterUnion: <span className='text-[#FFDE38]'>{data.westernunion_percentage}%</span></h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.westernunion_percentage} />
                                </span>
                            </div>
                           
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#424242]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>Other: <span className='text-[#424242]'>{data.other_percentage}%</span></h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.other_percentage} />
                                </span>
                            </div>
                            
                        </div>
                    </div>
                </TabsContent>
                {/* <TabsContent value="password">
                <div className='flex-col mt-3  overflow-y-scroll h-[40vh]'>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#635BFF]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>Stripe</h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.stripe_percentage} />
                                </span>
                            </div>
                            
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-black'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>Apple Pay</h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.apple_pay_percentage} />
                                </span>
                            </div>
                            
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#023087]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>PayPal</h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.paypal_percentage} />
                                </span>
                            </div>
                          
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#2DA94F]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>Google Pay</h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.google_pay_percentage} />
                                </span>
                            </div>
                            
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#1a241d]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>Credit and Debit Card</h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.credit_debit_percentage} />
                                </span>
                            </div>
                           
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#1E4BC6]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>Samsung Pay</h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.samsung_pay_percentage} />
                                </span>
                            </div>
                           
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#F7931A]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>CryptoCurrency</h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.cryptocurrency_percentage} />
                                </span>
                            </div>
                            
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#FFDE38]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>WesterUnion</h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.westernunion_percentage} />
                                </span>
                            </div>
                           
                        </div>
                        <div className='flex gap-2 bg-white py-2 px-5 border-gray-600 border-b-[1px]'>
                            <div className='w-[10%]'>
                                <div className='w-[50px] h-[50px] bg-[#424242]'></div>
                            </div>
                            <div className='w-[90%]'>
                                <h2 className='font-semibold text-lg'>Other</h2>
                                <span className='text-sm text-gray-600'>
                                    <Progress className="h-[5px] mt-2" color="#FF5733" value={data.other_percentage} />
                                </span>
                            </div>
                            
                        </div>
                    </div>
                </TabsContent> */}
                </Tabs>
                </div>
            </div>
        </div>
    )
}


export default UiPayments
