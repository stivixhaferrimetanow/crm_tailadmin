import connect from "@/lib/db";
import { NextResponse } from "next/server";
import UserModel from "@/models/user";

export const dynamic = "force-dynamic";

export async function GET(req){
    connect();
    try{
        const users = await UserModel.find({});
        return  NextResponse.json({data: users , status: 200});
    }catch(error){
        return NextResponse.json({msg: error , status: 500})
    }
}