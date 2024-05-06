'use client'
import React , {useState , useEffect} from 'react'
import jsPDF from 'jspdf';
import Link from 'next/link'
import { MdDelete } from "react-icons/md";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { CiBookmarkCheck } from "react-icons/ci";
  import axios from 'axios'
  import {toast} from 'sonner'
  import { FaCheckDouble } from "react-icons/fa";



const PdfForm = ({data}) => {



    

    let currDate = data && data[0].createdAt;
    let currentDate = currDate.split("T")[0]

    data[0].items.map((el , index) => {
        console.log(el)
    })
    const downloadPdf = () => {
        const doc = new jsPDF();
    
        // Header Section
        doc.addImage('/logo.png', 'PNG', 20, 50);
        doc.setFontSize(24);
        doc.text('Estimate', 20, 35);
        doc.setFontSize(16);
        
    
       
    
        doc.setFontSize(12);
        doc.text('TailAdmin', 140, 50);
        doc.text(`Subject: ${data && data[0].subject}`, 140, 60);
        doc.text('City , Address , Zip Code', 140, 70);
        doc.text('Country', 140, 80);
    
        // Bill To Section
        doc.setFontSize(12);
        doc.text('Bill To', 20, 110);
        doc.text(`${data &&  data[0].email}`, 20, 120);
        doc.text(`Address: ${data && data[0].address}`, 20, 130);
        doc.text(`${data && data[0].address}, ${data && data[0].street} ${data && data[0].zip_code}`, 20, 140);
        doc.text(`Country: ${data && data[0].country}`, 20, 150);
    
        // Invoice Details Section
        doc.text('Date', 120, 120);
        doc.text(`${currentDate}`, 120, 130);
        doc.text('Open Till', 120, 140);
        doc.text(`${data && data[0].open_till}`, 120, 150);
    
        // Manual Table Drawing
        const tableColumnWidths = [ 85, 35, 35, 35];
        const tableColumns = ['Name', 'QTY', 'Rate', 'Tax'];
        const tableRows = data[0].items.map((el, index) => {
            return [`${el.name}`, `${el.qty}` , `${el.rate} ${data && data[0].currency}` , `${el.tax}%`  ];
        });
    
        const startY = 180;
        const margin = 10;
        const lineHeight = 10;
    
        
        
      
    
        // Draw Header Row
        let xPos = margin;
        tableColumns.forEach((column, index) => {
            doc.setDrawColor(0); 
            doc.setFillColor(255); 
            doc.rect(xPos, startY, tableColumnWidths[index], lineHeight, 'FD'); 
            doc.setTextColor(0);
            doc.text(column, xPos + tableColumnWidths[index] / 2, startY + lineHeight / 2, { align: 'center', valign: 'middle' });
            xPos += tableColumnWidths[index];
        });

        // Draw Data Rows
        tableRows.forEach((row, rowIndex) => {
            xPos = margin;
            row.forEach((cell, cellIndex) => {
                doc.setDrawColor(0); // Set stroke color to black
                doc.setFillColor(255); // Set fill color to white
                doc.rect(xPos, startY + lineHeight * (rowIndex + 1), tableColumnWidths[cellIndex], lineHeight, 'FD'); // Use 'FD' to fill and draw the rectangle
                doc.text(cell, xPos + tableColumnWidths[cellIndex] / 2, startY + lineHeight * (rowIndex + 1) + lineHeight / 2, { align: 'center', valign: 'middle' });
                xPos += tableColumnWidths[cellIndex];
            });
        });
    
        // Footer Section
        doc.text('We accept cash, check, and card', 20, startY + lineHeight * (tableRows.length + 1) + 20);
        doc.text('Thanks for your business!', 20, startY + lineHeight * (tableRows.length + 1) + 30);
    
        doc.text(`Sub Total: ${data && data[0].sub_total.toFixed(1)} ${data && data[0].currency}`, 150, startY + lineHeight * (tableRows.length + 1) + 20);
        doc.text(`Total: ${data && data[0].total.toFixed(1)} ${data && data[0].currency}`, 150, startY + lineHeight * (tableRows.length + 1) + 30);
    
        doc.save('sample.pdf');
    };
    

    
    const deleteEstimate = () => {
        alert('here')
    }

const accept = async () => {
    try{
        const res = await axios.post(`http://localhost:3000/api/accept_estimate` , {_id: data && data[0]._id} , {'cache': 'no-store'});
        console.log(res)
        if(res.status == 200){
            toast('Estimate is Accepted!')
        }
    }catch(error){
        console.log(error)
    }
}


const [file , setFile] = useState(null);
const [message , setMessage ] = useState('');
const [subject , setSubject] = useState('')


const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

const sendMail = async () => {
    try{
        const formData = new FormData();
        formData.append('_id' , data && data[0].client_id);
        formData.append('status', data && data[0].status);
        formData.append('total', data && data[0].total);
        formData.append('user', data && data[0].email);
        formData.append('file', file);
        formData.append('subject', data && data[0].subject);
        formData.append('open_till', data && data[0].open_till);
        const res = await axios.post(`${process.env.DOMAIN}/api/send_estimate/` , formData , {'cache': 'no-store'});
        console.log(res);


        if(res.status == 200){
            toast('Success')
        }
    }catch(error){
        console.log(error)
    }
}

    return(
        <div className='w-full p-2'>
        <div className='w-[90%] mx-auto px-4 my-4 flex gap-3 items-center'>

        

        <AlertDialog>
  <AlertDialogTrigger>
  <button    className="bg-black  my-2  text-white font-bold py-2 px-4 rounded mt-4">
            Send 
        </button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Drop PDF Here!</AlertDialogTitle>
      <AlertDialogDescription>
           
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
            <input onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>


            <button onClick={sendMail} className='w-full px-4 bg-black text-white my-4 rounded py-2' >Submit</button>


      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


        <button onClick={downloadPdf} className="bg-black my-2  text-white font-bold py-2 px-4 rounded mt-4">
            Download PDF
        </button>


        {data && data[0].status == 'Accepted' ?
            ( <button  className="bg-[#2CD847] flex items-center gap-2  my-2  text-white font-bold py-2 px-4 rounded mt-4">
            <FaCheckDouble />
            Accepted
        </button>)
        
        :
        
            ( <button onClick={accept}  className="bg-black flex items-center gap-2  my-2  text-white font-bold py-2 px-4 rounded mt-4">
            <CiBookmarkCheck />
            Accept
        </button>)
        }
       


        <button  className="bg-black  my-2  text-white font-bold py-2 px-4 rounded mt-4">
            <Link href={'/authed/sales/proposals'}>
            New Estimate
            </Link>
        </button>

        

        {data[0]._id && (<AlertDialog>
        <AlertDialogTrigger>
        <button  className="bg-[#D82C2C]  my-2  text-white font-bold py-2 px-4 rounded mt-4 flex items-center">
            <MdDelete />
            Delete
        </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure you want do delete this Estimate?</AlertDialogTitle>
            <AlertDialogDescription>
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteEstimate} >Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>)}
        

        
        </div>


        <div className='w-full p-2'>
            
        </div>
        
            <div className="container bg-white border-t-4 border-b-4 pb-4 border-black-500">
            <div className="flex flex-row justify-between my-6">
                <div className="flex flex-col">
                <div className="">
                    <p className="text-3xl pt-5 ">Estimate</p>
                </div>
                <img src="/10.svg" className="h-10 pt-2"/>
                </div>
                <div className="text-right text-gray-700">
                <p className="text-lg font-bold text-gray-800">TailAdmin</p>
                <p>Subject: {data && data[0].subject}</p>
                <p>City , Address , Zip Code</p>
                <p>Country</p>
                </div>
            </div>
            <hr />
            <div className="flex flex-row justify-between my-4">
                <div>
                <p className="uppercase text-xs text-gray-600 mb-">Bill To</p>
                <p>{data &&  data[0].email}</p>
                <p>Address: {data && data[0].address}</p>
                <p>{data && data[0].address}, {data && data[0].street} {data && data[0].zip_code}</p>
                <p>Country: {data && data[0].country}</p>
                </div>
                <div className="text-right">
                <div className="mb-2">
                    <p className="uppercase text-xs text-gray-600">Date</p>
                    <p>{currentDate}</p>
                </div>
                <div className="mb-2">
                    <p className="uppercase text-xs text-gray-600">Due Date</p>
                    <p>{data && data[0].open_till}</p>
                </div>
                </div>
            </div>
            <hr />
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 pl-0">Name</th>
                    <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">QTY</th>
                    <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Rate</th>
                    <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 text-right">Price</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">      
                    {data && data[0].items.map((el , index) => {
                        return <tr key={index}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 pl-0">{el.name}</td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{el.qty}</td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{el.rate}{data && data[0].currency}</td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 text-right">{el.tax}%</td>
                                  
                        </tr>
                    })}
                    
                
                </tbody>
            </table>
            <div className="flex flex-row justify-between mt-20">
                <div>
                <p className="text-gray-400 text-sm mb-2">We accept cash, check, and card</p>
                <p className="text-gray-400 text-sm">Thanks for your business!</p>
                </div>
                <div className="text-right">
                <p className="text-gray-600 mb-2">Sub Total: {data && data[0].sub_total.toFixed(1)} {data && data[0].currency}</p>
                <p className="text-4xl font-bold text-gray-800">Total: {data && data[0].total.toFixed(1)} {data && data[0].currency}</p>
                </div>
            </div>
           
            </div>

            
            </div>
    )
}

export default PdfForm;
