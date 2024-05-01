import { NextResponse } from "next/server";
import SingelProductModel from "@/models/singel";
import connect from "@/lib/db";



export const dynamic = "force-dynamic";


export async function GET(req){
    connect();
    try{
        const singleProducts = await SingelProductModel.find({});

        if(!singleProducts){
            return NextResponse.json({msg: 'No products in the warehouse!'})
        }


        return NextResponse.json({data : singleProducts , status: 200});

    }catch(error){
        return NextResponse.json({msg : error , status: 500})
    }
}