import connect from "@/lib/db";
import ProductModel from "@/models/product";
import SingelProductModel from "@/models/singel";
import {NextResponse} from 'next/server'


export const dynamic = "force-dynamic";

export async function GET(){
    connect();
    try{
        const warehouse = await SingelProductModel.find({});
        const products = await ProductModel.find({});
        
       
        const mergedArray = warehouse.concat(products);


        return NextResponse.json({data: mergedArray , stauts: 200})



    }catch(error){
        return NextResponse.json({msg: error , status: 500})
    }
}