import UserModel from "@/models/user";
import connect from "@/lib/db";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connect();
        const body = await req.json();
        const { id} = body;
        const user = await UserModel.find({ _id: id });
        return NextResponse.json({ data: user, status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: error.message || 'Internal Server Error', status: 500 });
    }
}