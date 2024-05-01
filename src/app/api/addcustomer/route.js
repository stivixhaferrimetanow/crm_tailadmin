import connect from "@/lib/db";
import CustomerModel from "@/models/Customer";
import {NextResponse} from 'next/server'


export const dynamic = "force-dynamic";


export async function POST(req){
    connect();
    try{
        const body = await req.json();
        
        const {name , primary_contact , email , phone , active , city , country , address , zip_code} = body;

        if(!name || !primary_contact || !email || !phone || !active){
            return NextResponse.json({msg: 'Fill the fields!' , status: 500})
        }

        const newCustomer = new CustomerModel({
            name,
            primary_contact,
            email,
            phone,
            active,
            city ,
            country,
            address,
            zip_code
        });


        await newCustomer.save();

        return NextResponse.json({data: 'Success', status: 200})
    }catch(error){
        return NextResponse.json({msg: error , status: 500})
    }
}