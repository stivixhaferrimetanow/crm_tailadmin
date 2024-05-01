import connect from "@/lib/db";
import {NextResponse} from 'next/server'
import ProposalModel from "@/models/proposal";


export const dynamic = "force-dynamic";

export async function GET(req){
    connect();
    try{
        const proposals = await ProposalModel.find({});

        return NextResponse.json({data: proposals , status: 200})
    }catch(error){
        return NextResponse.json({msg : error, status: 500})
    }
}