import UserModel from "@/models/user";
import connect from "@/lib/db";
import { NextResponse } from "next/server";
import { getUserFromToken } from '@/lib/utils';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const dynamic = "force-dynamic";

export async function POST(req){
    connect();
    try{
        const authHeader = req.headers.get('authorization')
        const body = await req.json();

        const user = body.user
        if (!authHeader) {  
        return NextResponse.json({ data: 'No authHeader' });
        }
        const myAccount = await UserModel.findOne({email: user});
        if(!myAccount){
        
            return NextResponse.json({ data: 'No Account' });
        }
        const role = myAccount.role;
        const users = await UserModel.find();
        if(role == 'admin'){
            return NextResponse.json({ users: users, role: role, status: 200 });
        }
        return NextResponse.json({status: 400})
    }catch(error){
        return NextResponse.json({msg: 'Error'}, {status: 500})
    }
}