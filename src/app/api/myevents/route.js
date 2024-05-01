import connect  from "@/lib/db"; // Correct the import statement

import DayModel from "@/models/Day";
import UserModel from "@/models/user";
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connect(); 

        const body = await req.json();
        const { id } = body;
       
        const user = await UserModel.findById(id);

        if (!user) {
            return NextResponse.json({ msg: 'No user', status: 500 });
        }
        
        const events = await DayModel.find({user: user.email }).exec();
        console.log(events)
        return NextResponse.json({ data: events, status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: 'Error', status: 500 });
    }
}
