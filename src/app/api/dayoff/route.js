import connect from "@/lib/db";
import DayModel from "@/models/Day";
import { NextResponse } from 'next/server';


export const dynamic = "force-dynamic";

export async function POST(req) {
    connect();
    try {
        const body = await req.json();
        const { user, date, description } = body;

        if (!user || !date || !description) {
            return NextResponse.json({ msg: 'Error', status: 500 });
        }

        const newDay = new DayModel({ 
            user,
            date,
            description
        });

        await newDay.save();
        
        return NextResponse.json({ msg: 'Event saved successfully', status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: error, status: 500 });
    }
}