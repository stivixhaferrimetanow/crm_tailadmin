import DraftModel from "@/models/draft";
import connect from "@/lib/db";
import { NextResponse } from "next/server";



export const dynamic = "force-dynamic";


export async function GET(){
    connect();
    try{
        const data = await DraftModel.find({});
        if(!data){
            return NextResponse.json({msg: 'No dradts save in DB', status: 201})
        }

        return NextResponse.json({data: data , statsu: 200})
    }catch(error){
        return NextResponse.json({msg: error.message , status: 5000})
    }
}