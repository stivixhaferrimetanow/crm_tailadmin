'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [primaryContact, setPrimaryContact] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState('active'); 
  const [city , setCity] = useState('');
  const [country , setCountry] = useState('');
  const [address , setAddress] = useState('');
  const [zip_code , setZipCode] = useState('')

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/addcustomer`, {
        name: name,
        primary_contact: primaryContact,
        email: email,
        phone: phone,
        active: active,
        city: city,
        country: country,
        address: address,
        zip_code: zip_code,
      } ,{'cache': 'no-store'});
      console.log(res);
      toast('Customer added successfully')
    } catch (error) {
      toast('Error adding the customer');
      console.log(error);
    }
  };

  return (
    <div className="w-full flex gap-2 items-center py-2">
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="outline" className="text-white bg-black hover:bg-black hover:text-white">
            Add Customer
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add a Customer</AlertDialogTitle>
            <AlertDialogDescription>
              <input
                type="text"
                className="px-1 py-2 my-2 rounded-xl shadow-sm focus:outline-none"
                placeholder="Enter Customer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <input
                type="text"
                className="px-1 py-2 my-2 rounded-xl shadow-sm focus:outline-none"
                placeholder="Enter Primary Contact"
                value={primaryContact}
                onChange={(e) => setPrimaryContact(e.target.value)}
              />
              <br />
              <input
                type="text"
                className="px-1 py-2 my-2 rounded-xl shadow-sm focus:outline-none"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="text"
                className="px-1 py-2 my-2 rounded-xl shadow-sm focus:outline-none"
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <br />
              <select
                name=""
                id=""
                className="my-2 w-full rounded-md shadow-sm focus:outline-none"
                value={active}
                onChange={(e) => setActive(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Not Active</option>
              </select>
              <br />
              
              <input
                type="text"
                className="px-1 py-2 my-2 rounded-xl shadow-sm focus:outline-none"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <br />
              <input
                type="text"
                className="px-1 py-2 my-2 rounded-xl shadow-sm focus:outline-none"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <br />
              <input
                type="text"
                className="px-1 py-2 my-2 rounded-xl shadow-sm focus:outline-none"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />
              <input
                type="number"
                className="px-1 py-2 my-2 rounded-xl shadow-sm focus:outline-none"
                placeholder="Enter ZIP CODE"
                value={zip_code}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <br />
              <br />
              <button  className="w-full bg-black hidden my-2 rounded-sm text-white px-1 py-2">
                Submit
              </button>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} >Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddCustomer;
