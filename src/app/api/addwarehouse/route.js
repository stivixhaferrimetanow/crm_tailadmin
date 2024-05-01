import { NextResponse } from "next/server";
import SingelProductModel from "@/models/singel";
import connect from "@/lib/db";


export const dynamic = "force-dynamic";


export async function POST(req){
    connect();
    try{
       

        const body = await req.json();

        const {name , stock , cost , min , supplier} =  body;
      

        if(!name || !stock || !cost || !min){
            return NextResponse.json({msg: 'Fill all the fields', status: 400});
        }

        const singelProduct = new SingelProductModel({
            name,
            stock,
            cost,
            min,
            supplier
        })
        await singelProduct.save();


        return NextResponse.json({msg : 'Success', status: 200})
    }catch(error){
        return NextResponse.json({msg: error , status: 500})
    }
}
