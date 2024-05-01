'use client'
import React , {useState , useEffect} from 'react'
import axios from 'axios'


const Checker = () => {

    const [data , setData] = useState([]);
    const [local , setLocal] = useState([])


    useEffect(() => {


        


        const getProduction = async () => {
            try {
              const res = await axios.get(`http://localhost:3000/api/getproduction`, { 'cache': 'no-store' });
              let myData = res.data.data;
              setData(myData);
                 console.log(myData)
              
                 let itemsInLocalStorage = localStorage.getItem('items');
                 if (!itemsInLocalStorage) {
                   localStorage.setItem('items', JSON.stringify([]));
                   itemsInLocalStorage = [];
                 }
                 
                 if (myData && Array.isArray(myData)) {
                   // Check if any _id from myData is missing in itemsInLocalStorage
                   const missingIds = myData.filter(item => !itemsInLocalStorage.includes(item._id)).map(item => item._id);
                 
                   if (missingIds.length > 0) {
                    
                     localStorage.setItem('new', true);
                   }
                 } else {
                   console.log('Invalid data format:', myData);
                 }
            } catch (error) {
              console.log(error);
            }
          };
          
          getProduction();
          
          
    },[])   
    return(
        <div>
            
        </div>
    )
}


export default Checker

