import connect from "@/lib/db";
import RoleModel from "@/models/role";
import {NextResponse} from 'next/server'


export const dynamic = "force-dynamic";


export async function GET(){
    connect();
    try{
        const roles = await RoleModel.find({});
        return NextResponse.json({data: roles, status: 200})
    }catch(error){
        return NextResponse.json({msg: error , status:500})
    }
}