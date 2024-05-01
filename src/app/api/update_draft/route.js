import { NextResponse } from "next/server";
import DraftModel from "@/models/draft";
import connect from "@/lib/db";


export const dynamic = "force-dynamic";


export async function POST(req){
    connect();
    try{
        const body = await req.json();
        

        const {_id , value } = body;

        if(!_id || !value) {
            return NextResponse.json({msg: 'Id or the value is not passed or one of them is empty', status: 201})
        };



        const updatedDraft = await DraftModel.findByIdAndUpdate(_id , {status: value} , {new: true})

        if(!updatedDraft){
            return NextResponse.json({msg: 'Draft not found', status: 201})
        }


        return NextResponse.json({data: updatedDraft , status: 200 , msg: 'Success'});
    }catch(error){
        return NextResponse.json({msg: error.message , status: 500})
    }
}