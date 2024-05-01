import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function POST(next){
    try {
        const response = NextResponse.json({ msg: "User successful login", success: true }, { status: 200 });
        // Clearing cookies
        await response.cookies.delete('token' , { httpOnly: true });
        await response.cookies.delete('user' , { httpOnly: true });
        return response;
    } catch (error) {
        return NextResponse.json({ msg: 'Error' });
    }
}