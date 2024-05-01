import { NextResponse } from "next/server";
import connect from "@/lib/db";
import UserModel from "@/models/user";


export async function GET(req){
    try{
        await connect();

        const users = await UserModel.find({});

        return NextResponse.json({data: users , msg: 'Success'})


    }catch(error){
        return NextResponse.json({msg: error , status: 500})
    }
}