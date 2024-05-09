import connect from "@/lib/db";
import { NextResponse } from "next/server";
import TaskModel from "@/models/task";




export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connect();
        
        const body = await req.json();
       
        const { taskId, newStatus } = body;
        
        if (!newStatus) {
            return NextResponse.json({ msg: 'No new Status' , status: 201 });
        }
       
        const updateTask = await TaskModel.findByIdAndUpdate(taskId, { progress: newStatus }, { new: true });
       
        if(!updateTask){
            return NextResponse.json({msg: 'Task not found', status: 201})
        }


        return NextResponse.json({ msg: 'Success', status: 200 }); 
    } catch (error) {
        return NextResponse.json({ msg: 'Internal Server Error', status: 500 }); 
    }
}