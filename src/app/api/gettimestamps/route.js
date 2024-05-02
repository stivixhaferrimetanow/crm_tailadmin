import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Timestamp from "@/models/timestamp";

export const dynamic = "force-dynamic";


export async function GET(){
    try{
        await connect();


        const data = await Timestamp.find({});


        if(!data){
            return NextResponse.json({msg: 'No items found on timestamp DB', status: 500})
        }

        return NextResponse.json({data:data, msg: 'Success', status: 200 })
    }catch(error){
        return NextResponse.json({status: 500 , msg: error})
    }
}
