'use client'
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {toast} from 'sonner'



const ProposalForm = ({customers , products , warehouse }) => {
   



  
    const [clientType  , setClientType] = useState('lead');
    const [clientTxt , setClientTxt] = useState('Lead');
    const [leads , setLeads] = useState([]);


    const today = new Date();
    const dateOnly = today.toISOString().split('T')[0];
    console.log(dateOnly);


    const [selectedClient , setSelectedClient] = useState('€')

    useEffect(() => {
        if(clientType == 'lead'){
            setClientTxt('Lead')
            const data = customers.filter((el) => el.lead_customer == false);
            console.log(data , 'lead')
            setLeads(data)
        }else{
            setClientTxt("Customer");
            const data = customers.filter((el) => el.lead_customer == true);
            setLeads(data)
        }
    },[clientType]);



    const [email , setEmail ] = useState('');
    const [phone , setPhone] = useState('');
    const [country , setCountry] = useState('');
    const [city , setCity] = useState('');
    const [zip_code , setZipCode] = useState('');
    const [address , setAddress] = useState('');

    const [items , setItems] = useState([]);


    useEffect(() => {
      const mergedArray = products.concat(warehouse);
      console.log(mergedArray , 'mergedArray')
      setItems(mergedArray);
    },[])

    const [thisClient , setThisClient] = useState('');
    const [clientId  , setClientId] = useState("")

    const handleClientChange =  async (value) => {
      try{
        setClientId(value)
        const currentClient = leads.filter((el) => el._id == value);
        setEmail(currentClient[0].email)
        setPhone(currentClient[0].phone);
        setCountry(currentClient[0].country);
        setCity(currentClient[0].city);
        setZipCode(currentClient[0].zip_code);
        setAddress(currentClient[0].address);
        setThisClient(currentClient[0].thisClient);
      }catch(error){
        console.log(error)
      }
    }




    const [selectedItem , setSelectedItem ] = useState('No Item Selected');
    const [itemsArray , setItemsArray] = useState([]);
    const [currency , setCurrency] = useState('€');
    const [taxVal , setTaxVal] = useState(0)

    const addSelectedItem = () => {
      if(items) {
      
        const myItem = items.find((el) => el._id === selectedItem);
        if (myItem) {
          const existingItemIndex = itemsArray.findIndex(item => item.prod_id === selectedItem);
          if (existingItemIndex !== -1) {
            const updatedItemsArray = [...itemsArray];
            updatedItemsArray[existingItemIndex].qty += 1;
            setItemsArray(updatedItemsArray);
          } else {
            const newObj = {
              name: myItem.name,
              prod_id: selectedItem,
              qty: 1,
              rate: myItem.cost  ?  myItem.cost : myItem.total_cost ,
              tax: '0',
              description: '',
              type: myItem.type,
              min: myItem.min ? myItem.min : 1
            };
            setItemsArray([...itemsArray, newObj]);
          }
        }
      }
    };


    const handleDescriptionChange = (value, id) => {
      const itemIndex = itemsArray.findIndex(item => item.prod_id === id);
      if (itemIndex !== -1) {
        const updatedItemsArray = [...itemsArray];
        updatedItemsArray[itemIndex] = {
          ...updatedItemsArray[itemIndex],
          description: value
        };
        setItemsArray(updatedItemsArray);
      }
    };

    const handleQtyChange = (value , id , myQty) => {
      if(value > myQty){
        alert(`Quantity should be less than ${myQty}`);
      }
      const itemIndex = itemsArray.findIndex(item => item.prod_id === id);
      if (itemIndex !== -1) {
        const updatedItemsArray = [...itemsArray];
        updatedItemsArray[itemIndex] = {
          ...updatedItemsArray[itemIndex],
          qty: value
        };
        setItemsArray(updatedItemsArray);
      }
    }

    const handleTaxChange = (value , id) => {
      const itemIndex = itemsArray.findIndex(item => item.prod_id === id);
      if (itemIndex !== -1) {
        const updatedItemsArray = [...itemsArray];
        updatedItemsArray[itemIndex] = {
          ...updatedItemsArray[itemIndex],
          tax: value
        };
        setItemsArray(updatedItemsArray);
      }
    }


   
    const [discount , setDiscount] = useState(0);
    const [discountValue , setDiscountValue] = useState()
    const [adjustment , setAdjustment] = useState(0)

    const [discountType , setDiscountType] = useState('no_discount')
    

    const [subTotal , setSubTotal] = useState(0);
    const [total , setTotal] = useState(0);
    const [taxPerc , setTaxPerc] = useState(0)

    const generate = () => {
      let subTotal = 0;
      let taxTotal = 0;
      let taxPercentage = 0
    
      if (itemsArray) {
        itemsArray.forEach((el) => {
          let rate = el.rate;
          let qty = el.qty;
          let prod = rate * qty;
          let taxAmount = prod * (el.tax / 100);
          taxPercentage +=  JSON.parse(el.tax) 
          taxTotal += taxAmount;
          let totalWithTax = prod + taxAmount; // Including tax
          subTotal += totalWithTax;
        });
      }
      setTaxPerc(taxPercentage)
      setTaxVal(taxTotal)
    
      let discountAmount = subTotal * (discount / 100);
      setDiscountValue(discountAmount)
      let total = subTotal - discountAmount + JSON.parse(adjustment); 
      
      setSubTotal(subTotal);
      setTotal(total);
    };


    const [openTill , setOpenTill] = useState('');
    const [subject , setSubject] = useState('')

   


    const saveData = async () => {
      try{
        const res = await axios.post('http://localhost:3000/api/addproposal' ,
          {
            subject: subject,
            client_type: clientType,
            client_id: clientId,
            currency: currency,
            email: email,
            address: address,
            country: country,
            city: city,
            phone: phone,
            zip_code: zip_code,
            items: itemsArray,
            sub_total: subTotal,
            total: total,
            tax:taxPerc,
            status: 'Draft',
            adjustment: adjustment,
            discount: discount,
            open_till:openTill
          }
          ,{'cache':'no-store'}

          
        )
        if(res.status == 200){
          toast('Proposal Saved')
        }
      }catch(error){
        console.log(error)
      }
    }


   

  return (
    <div className='w-full mx-auto rounded-lg bg-white' >
        <div className='flex gap-3 p-4  '>
          <div className='w-[50%]'>
            <div>
              <label htmlFor="" className='my-2'>
                Subject
              </label>
              <input  value={subject} onChange={(e) => setSubject(e.target.value)} type="text" placeholder='Subject...' className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' />
            </div>

            <div>
              <label htmlFor="" className='my-2'>
                Related
              </label>
              <select onChange={(e) => setClientType(e.target.value)} type="text" placeholder='Subject...' className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' >
                <option value="lead">Select</option>
                <option value="lead">Lead</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            <div>
              <label htmlFor="" className='my-2'>
                {clientTxt && clientTxt}
              </label>
              <select type="text" onChange={(e) => handleClientChange(e.target.value)}  placeholder='Subject...' className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' >
               <option value="lead">Select</option>
                {leads && leads.map((el , index) => {
                  return <option value={`${el._id}`}>{el.name}</option>
                })}                
              </select>
            </div>


            <div>
              <label htmlFor="" className='my-2'>
                Open Till
              </label>
              <input type="date" value={openTill} onChange={(e) => setOpenTill(e.target.value)} className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' />
            </div>

            <div>
              <label htmlFor="" className='my-2'>
                Currency
              </label>
              <input type="text"  value={currency}  readOnly onChange={(e) => setCurrency(e.target.value)} style={{cursor: 'not-allowed'}} placeholder='Subject...' className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm'/>
              
            </div>


           


          </div>
          <div className='w-[50%]'>


            <div>
              <label htmlFor="" className='my-2'>
                To
              </label>
              <input value={email} readOnly  type="text" placeholder='' className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' />
            </div>


            <div>
              <label htmlFor="" className='my-2'>
                Address
              </label>
              <textarea value={address} readOnly rows="4" type="text" placeholder='' className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' ></textarea>
            </div>


            <div className='flex gap-5'>
              <div className='w-[50%]'>
                <label htmlFor="">Country</label>
                <input type="text" value={country} readOnly placeholder='' className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' />
              </div>
              <div className='w-[50%]'>
                <label htmlFor="">City</label>
                <input type="text" value={city} readOnly placeholder='' className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' />
              </div>
            </div>


            <div className='flex gap-5'>
              <div className='w-[50%]'>
                <label htmlFor="">Phone</label>
                <input type="text"  value={phone} readOnly placeholder='' className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' />
              </div>
              <div className='w-[50%]'>
                <label htmlFor="">ZIP CODE</label>
                <input type="text" value={zip_code} readOnly placeholder='' className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' />
              </div>
            </div>


                
            



          </div>
        </div>

        <div className='pt-5 p-4 '>
          <h2>Items</h2>
          <div>
                <div className='w-full'>
                 
                  <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} type="text" placeholder='Subject...' className='w-[80%] my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' >
                    <option value={`No Selected Item`} >No Item Selected</option>
                    {items && items.map((el , index) => {
                      return <option value={`${el._id}`}>{el.name}</option>
                    })}
                    
                  </select>

                  <button onClick={addSelectedItem} className='py-2 px-1 w-[20%] bg-black text-white rounded-md'>ADD+</button>
                </div>
          </div>
          {itemsArray && itemsArray.map((el , index) => {
               return <div  key={index} className='lg:flex lg:flex-row flex-col gap-3'>
                <div className='lg:w-[20%] w-full'>
                    <label htmlFor="" className='my-2'>
                    Item
                    </label>
                    <input type="text" value={el.name} readOnly placeholder='Subject...' className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' />
                </div>
                <div className='lg:w-[20%] w-full'>
                    <label htmlFor="" className='my-2'>
                    Short Description
                    </label>
                    <input type="text" value={el.description} onChange={(e) => handleDescriptionChange(e.target.value , el.prod_id)}  placeholder='Subject...' className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' />
                </div>
                <div className='lg:w-[20%] w-full'>


                  <label htmlFor="" className='my-2'>
                    QTY 
                    </label>
                   
                    <input type="number" value={el.qty} max={el.type?.toLowerCase() == 'tek' ? el.min : 1} onChange={(e) => handleQtyChange(e.target.value , el.prod_id , el.type?.toLowerCase() == 'tek' ? el.min : 1 )}   className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' />
                </div>
                <div className='lg:w-[20%] w-full'>
                    <label htmlFor="" className='my-2'>
                    Rate
                    </label>
                    <input type="number" value={el.rate} readOnly   className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' />
                </div>
                <div className='lg:w-[20%] w-full'>

                    <label htmlFor="" className='my-2'>
                    Tax
                    </label>
                    <select value={el.tax} onChange={(e) => handleTaxChange(e.target.value , el.prod_id)}     className='w-full my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm' >
                      <option value="0">0%</option>
                      <option value="10">10%</option>
                      <option value="18">18%</option>
                    </select>


                </div>
               </div>
              })}
        </div>


        <div className='pt-5 p-4'>
          <div className='w-full my-2 text-end justify-end flex items-center gap-2'>
                <p className='text-gray'>Sub Total:</p>
                <p className='text-gray font-semibold'>{currency && currency} {subTotal && subTotal}</p>
          </div>
          <hr />
          <div className='w-full my-2 text-end justify-end flex items-center gap-2'>
                <p className='gray'>Discount:</p>
                <input type="text font-semibold" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder='Discount...'  className='w-[25%] my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm'   />%
                <p className='text-gray font-semibold'>-{currency && currency} {discountValue && discountValue}</p>
          </div>
          <hr />
          <div className='w-full my-2 text-end justify-end flex items-center gap-2'>
                <p className='text-gray'>TAX:</p>
                <p className='text-gray font-semibold'>{currency && currency} {taxVal && taxVal}</p>
          </div>
          <hr />
          <div className='w-full my-2 text-end justify-end flex items-center gap-2'>
                <p className='gray'>Adjustment:</p>
                <input type="text font-semibold" value={adjustment} onChange={(e) => setAdjustment(e.target.value)} placeholder='Discount...'  className='w-[25%] my-2 px-1 py-2 border-gray border-2 rounded-md shadow-sm'   />$
                <p className='text-gray font-semibold'>+{currency && currency} {adjustment}</p>
          </div>
          <hr />
          <div className='w-full my-2 text-end justify-end flex items-center gap-2'>
                <p className='text-gray'>Total:</p>
                <p className='text-gray font-semibold'>{currency && currency} {total}</p>
          </div>
          <hr />
          <div className='w-full my-2 text-end justify-end flex items-center gap-2' >
            <Button className="bg-black  text-white"   onClick={generate} >Generate</Button>
          </div>
            <br />
            <br />
          <div className='w-full my-2 text-end justify-end flex items-center gap-2' >
            <Button className="bg-black  text-white"   onClick={saveData} >SAVE</Button>
          </div>
        </div>

    </div>
  )
}

export default ProposalForm