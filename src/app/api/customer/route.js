import connect from "@/lib/db";
import { NextResponse } from "next/server";
import CustomerModel from "@/models/Customer";




export const dynamic = "force-dynamic";


export async function POST(req){
    try{
        const body  = await req.json();

        const {id} = body;


        const customer = await CustomerModel.find({_id: id});


        if(!customer){
            return NextResponse.json({msg: 'Customer does not exist', status: 404})
        }


        return NextResponse.json({msg:'Success', data: customer , status: 200})
    }catch(error){
        return NextResponse.json({msg: error , status: 500})
    }
}