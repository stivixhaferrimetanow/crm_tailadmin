import UserModel from "@/models/user";
import connect from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const dynamic = "force-dynamic";

const salt = 10;

export async function POST(req) {
    connect();
    const body = await req.json();
    const { name,  email, password  , role} = body;
    
    if (!name || !email || !password) {
        return NextResponse.json({ msg: "invalid fields" }, { status: 400 });
    }

    

    try {
        const isUserAlreadyPresent = await UserModel.findOne({ email });

        if (isUserAlreadyPresent) {
            return NextResponse.json({ msg: "User is already present" }, { status: 409 });
        }

        const hashPassword = await bcrypt.hash(password, salt);
        let user = new UserModel({ name, email, role , password: hashPassword });

        const res = await user.save();

        const response = NextResponse.json({ mgs: "ok", success: true , user: email }, { status: 200 });

        return response;
    } catch (err) {
        console.error('Error saving user:', err);
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
