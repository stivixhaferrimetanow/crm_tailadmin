import ProposalModel from "@/models/proposal";
import connect from "@/lib/db";
import { NextResponse } from 'next/server';


export const dynamic = "force-dynamic";

export async function POST(req) {
    connect();
    try {
        const body = await req.json();

        const { 
            subject, 
            client_type, 
            client_id, 
            currency, 
            email, 
            address, 
            country, 
            city, 
            phone, 
            zip_code, 
            items, 
            sub_total, 
            total, 
            tax, 
            status, 
            adjustment, 
            discount ,
            open_till
        } = body;



        const newProposal = new ProposalModel({
            subject,
            client_type,
            client_id,
            currency,
            email,
            address,
            country,
            city,
            phone,
            zip_code,
            items,
            sub_total,
            total,
            tax,
            status,
            adjustment,
            discount,
            open_till
        });

        const savedProposal = await newProposal.save();

        return NextResponse.json({ msg: "Proposal saved successfully.", status: 200 });

    } catch (error) {
        console.error('Error saving proposal:', error);
        return NextResponse.json({ msg: error.message || "Internal Server Error", status: 500 });
    }
}
