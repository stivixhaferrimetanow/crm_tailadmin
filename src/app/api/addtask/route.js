import { NextResponse } from "next/server";
import connect from "@/lib/db";
import TaskModel from "@/models/task";

export const dynamic = "force-dynamic";

export async function POST(req){
    connect()
    try{
        const body = await req.json();
        const {title , members ,   current_date ,  dueDate , description} = body;
      
        const progress = 'start';
        const due_date = dueDate.toString();
        const task = new TaskModel({
            title,
            members,
            current_date,
            due_date: due_date,
            progress,
            description
        })
        await task.save();

        return NextResponse.json({msg: 'Success' , status: 200})
        
    }catch(error){
        return NextResponse.json({msg: error , status: 500})
    }
}