import { NextResponse } from "next/server";
import connect from "@/lib/db";
import PaymentModel from "@/models/payment";
import ProposalModel from "@/models/proposal";
import CustomerModel from "@/models/Customer";



export const dynamic = 'force-dynamic'


export async function POST(req){
    try{
        const body = await req.json();


        const {invoice_id , payment_method} = body;



        const myProposal = await ProposalModel.findOne({_id: invoice_id});


        if(!myProposal){
            return NextResponse.json({msg: 'Not proposal found', status: 500});
        };


        console.log(myProposal);


        const newPayment = new PaymentModel({
            name: myProposal.subject,
            email: myProposal.email,
            phone: myProposal.phone,
            user_id: myProposal.client_id,
            value: myProposal.total,
            status: 'paid',
            last_contact: new Date(),
            payment_method: payment_method,
            transacti0on_id: myProposal._id,
            description: myProposal.description,
            tax: myProposal.tax
        })


        await newPayment.save();
        return NextResponse.json({status: 200 , msg: 'Success'})
    }catch(error){
        return NextResponse.json({status: 500 , msg: error})
    }
}