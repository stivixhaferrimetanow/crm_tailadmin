import connect from "@/lib/db";
import {NextResponse} from 'next/server'
import CustomerModel from "@/models/Customer";


export const dynamic = "force-dynamic";


export async function GET(){
    connect();
    try{
        const data = await CustomerModel.find({});

        if(!data){
            return NextResponse.json({data: [], status: 201});
        }

        return NextResponse.json({data: data, status: 200})
    }catch(error){
        return NextResponse.json({msg: 'error', status: 500})
    }
}
