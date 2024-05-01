import connect from "@/lib/db";
import TaskModel from "@/models/task";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";


export async function GET(req){
    connect();
    try{
        const tasks = await TaskModel.find({})
        return NextResponse.json({data: tasks , status: 200});
    }catch(error){
        console.log(error)
    }
}