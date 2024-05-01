import connect from "@/lib/db";
import {NextResponse} from 'next/server'
import UserModel from "@/models/user";

export const dynamic = "force-dynamic";

export async function GET(){
    connect();
    try{
        const users = await UserModel.find({});

        const agents = users.filter((el) => el.role == 'sale_agent');

        if(!agents){
            return NextResponse.json({msg: 'No Sale Agents', status: 500})
        }


        return NextResponse.json({data: agents , status: 200})
    }catch(error){
        return NextResponse.json({msg: error , status: 500})
    }
}