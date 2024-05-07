import ProposalModel from "@/models/proposal";
import connect from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import CustomerModel from "@/models/Customer";

export async function POST(req){
    connect();
    try{
        const body = await req.json();
        const {_id} = body;


        const updatedEstimate = await ProposalModel.findByIdAndUpdate(_id, { status: 'Accepted' }, { new: true });



        const customer = await CustomerModel.findByIdAndUpdate(updatedEstimate.client_id , {lead_customer: true }, {new: true});


        


        if(!updatedEstimate){
            return NextResponse.json({msg: 'Error updating the status', status: 200})
        }
       

        return NextResponse.json({msg: 'Success', status: 200});
        

    }catch(error){
        return NextResponse.json({msg: error.message , status: 500})
    }
}
