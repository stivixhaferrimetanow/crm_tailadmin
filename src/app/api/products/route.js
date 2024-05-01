import { NextResponse } from "next/server";
import connect from '@/lib/db';
import ProductModel from '@/models/product';


export const dynamic = "force-dynamic";


export async function GET(req){
    connect();
    try{
        const products = await ProductModel.find({});

        return NextResponse.json({data: products});
    }catch(error){
        return NextResponse.json({msg: error , status: 500})
    }
}