import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Timestamp from "@/models/timestamp";


export async function POST(req){
    try{    
        await connect();

        const body = await req.json();


        const {item_id , current_status} = body;


        console.log('here', item_id , current_status)



    }catch(error){
        console.log(error);
        return NextResponse.json({status: 500 , msg: error})
    }
}