import UserModel from "@/models/user";
import connect from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const dynamic = "force-dynamic";

export async function POST(req) {


    await  connect();

    
    const body = await req.json();

    const { email, password } = body;
    
   
    try {
        const isUserPresent = await UserModel.findOne({ email });
        if (!isUserPresent) {
            return NextResponse.json({ msg: "User is not available" }, { status: 409 });
        }
        const isPasswordMatch = await bcrypt.compare(password, isUserPresent.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ msg: "Invalid Credentials" }, { status: 409 });
        }
        const privateKey = 'sdasrsvjnfjgfgroejregler';
        const name = isUserPresent.name;
        const token = jwt.sign({ email, name }, privateKey);
        const response = NextResponse.json({ msg: "User successful login", success: true, data: isUserPresent  }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true
        });
        response.cookies.set('user' , email.toString() , {
            httpOnly: true
        });
        return response;
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err, success: false }, { status: 500 });
    }
}
