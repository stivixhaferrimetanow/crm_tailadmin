import { NextResponse } from 'next/server';
import connect from "@/lib/db";
import CustomerModel from '@/models/Customer';

export async function POST(req) {
    try {
        await connect();

        const body = await req.json();

        // Use forEach instead of map since you're not returning a new array
        for (const el of body) {
            if (el.id != '') {
                const newSingle = new CustomerModel({
                    name: el.name,
                    primary_contact: el.primary_contact,
                    email: el.email,
                    phone: el.phone,
                    active: 'active',
                    lead_customer: false,
                    city: el.city,
                    country: el.country,
                    address: el.address,
                    zip_code: el.zip_code
                });
                
                // Use await inside an async function
                await newSingle.save();
            }
        }

      
        return NextResponse.json({ msg: "Data saved successfully", status: 200 });
    } catch (error) {
  
        return NextResponse.json({ msg: error.message, status: 500 });
    }
}
