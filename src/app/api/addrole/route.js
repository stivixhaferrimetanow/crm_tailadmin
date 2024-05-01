import connect from "@/lib/db";
import { NextResponse } from 'next/server';
import RoleModel from "@/models/role";


export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connect();
        const body = await req.json();
        const { title } = body;
       
        const newRole = new RoleModel({ title: title.toLowerCase() });
        await newRole.save();
        
        return NextResponse.json({ msg: 'Success', status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: error.message, status: 500 });
    }
}
