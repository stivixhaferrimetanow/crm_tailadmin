import ProductionModel from "@/models/production";
import connect from "@/lib/db";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";


export async function GET(){
    try{
        const res = await ProductionModel.find({});

        if(!res){
            return NextResponse.json({msg: 'No Production', status: 201})
        }


        return NextResponse.json({data: res, status: 200})
    }catch(error){
         return NextResponse.json({msg: 'Error', status: 500})
    }
}