'use client'
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { toast } from "sonner"



const ProductForm = ({token , stockData}) => {







  const [components, setComponents] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [productionCost, setProductionCost] = useState(0);
  const [salesCost, setSalesCost] = useState(0);
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [composition, setComposition] = useState([]);

  const handleSubmit = async () => {
    try {
      const filteredArray = composition.filter((obj, index, self) => index === self.findIndex((t) => t.id === obj.id));
      
      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
      formData.append('composition', JSON.stringify(selectedComponents));
      formData.append('production_cost', parseFloat(productionCost)); 
      formData.append('sales_cost', parseFloat(salesCost)); 
      formData.append('multimedia', file);
  
      const res = await axios.post(`http://localhost:3000/api/addproduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      });
  
      console.log(res);
      
      if (res.status === 500) {
        toast("Error Posting the product");
      } else if (res.status === 200) {
        toast("Product added successfully");
        setName('');
        setType('');
    
        setProductionCost(0);
        
        setSalesCost(0);
        setFile(null);
        setComposition([]);
      }
    } catch (error) {
      toast("Error Posting the product");
      console.log(error);
    }
  };
  

  const fetchComponents = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/warehouse`, { cache: 'no-store' });
      const data = res.data.data;
      setComponents(data);
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    fetchComponents();
   
  }, []);


  const [select , setSelect] = useState('');
  const [selectedComponents , setSelectedComponents] = useState([])


  const handleClick = () => {
    const myData = components.filter((el) => el._id == select);
    
    
   
    const index = selectedComponents.findIndex((el) => el._id === myData[0]._id);
  
    if (index !== -1) {
      const updatedSelectedComponents = [...selectedComponents];
      updatedSelectedComponents[index] = myData[0];
      setSelectedComponents(updatedSelectedComponents);
    } else {
      setSelectedComponents([...selectedComponents, myData[0]]);
    }

    console.log(selectedComponents)
    
  }




  const handleStockChange = (value, id , max) => {
  

    if(value > max){
      alert(`Value should be less than ${max}`);
      
    }
    const stockValue = parseFloat(value); 

    const updatedComponents = [...selectedComponents];
  
    const index = updatedComponents.findIndex(component => component._id === id);
  
    if (index !== -1) {
        updatedComponents[index] = {
            ...updatedComponents[index],
            stock: stockValue 
        };
    
        setSelectedComponents(updatedComponents);
    }

    
};


    return(
        <div className='w-full'>
        
 
  <div className=" xl:w-full lg:w-[90%] rounded-md  justify-start p-5">

    <div className="w-full bg-white p-5 rounded-md">
          <div className='w-full    flex gap-5'>
            <div className="mb-5 w-full">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Product Name
              </label>
              <input
                type="text"
                required
                value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Product Name here..."
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
           
          </div>
        <div className='flex w-full  gap-5'>
       
      


        <div className="mb-5 w-full">
          <label
            htmlFor="email"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
           Production Cost
          </label>
          <input
            type="number"
            required
            value={productionCost} onChange={(e) => setProductionCost(e.target.value)}
            placeholder="Production Cost here..."
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        </div>
       
       <div className='w-full flex gap-5'>
      
       

        <div className="mb-5 w-full">
          <label
            htmlFor="email"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
           Sales Cost
          </label>
          <input
            type="number"
            required
            value={salesCost} onChange={(e) => setSalesCost(e.target.value)}
            placeholder="Sales Cost here..."
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
       </div>
       

       <div className='w-full flex gap-5'>
        <div className="mb-5 w-full">
          <label
            htmlFor="email"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
           Composition
          </label>
          <div className='flex'>
            <select name="" value={select} onChange={(e) => setSelect(e.target.value)} id="" className="w-[80%] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
              <option value='' >Select Product</option>
              {components && components.map((el , index) => {
                return <option value={el._id} key={index}>{el.name && el.name}</option>
              })}
            </select>
            <button onClick={handleClick} className='w-[20%] bg-black rounded-md text-white'>ADD+</button>
          </div>
          
        </div>
       </div>

       
        {selectedComponents && selectedComponents.map((el , index) => {
           return <div className='w-full my-1 flex gap-5' key={index}>
              <div className='w-[50%]'>
                  <label htmlFor=""  className="mb-3 block text-base font-medium text-[#07074D]">Product Name:</label>
                  <input
                      type="text"
                      readOnly={true}
                      value={el.name ?? ''}
                      
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
              </div>


              <div className='w-[50%]'>
                  <label htmlFor=""  className="mb-3 block text-base font-medium text-[#07074D]">Product QTY:</label>
                  <input
                  type="number"
                required
                max={el.min}
                onChange={(e) => handleStockChange(e.target.value , el._id , el.min)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
              </div>
       </div>
        })}
        
       
       
        
        <div className="mb-6 pt-4 ">
          <label className="mb-5 block text-xl font-semibold text-[#07074D]">
            Upload File
          </label>
          <div className="mb-8">
            <input type="file" id='file' name='file' onChange={(e) => setFile(e.target.files[0])}  className="sr-only" />
            <label
              htmlFor="file"
              className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
            >
              <div className='cursor-pointer'>
                <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                  Drop files here
                </span>
                <span className="mb-2 block text-base font-medium text-[#6B7280]">
                  Or
                </span>
                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                  Browse
                </span>
              </div>
            </label>
          </div>
        
          
        </div>
        <div>
          <button  onClick={handleSubmit} className="hover:shadow-form w-full rounded-md bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none">
            Submit
          </button>
        </div>
     
    </div>
  </div>


        </div>
    )
}


export default ProductForm