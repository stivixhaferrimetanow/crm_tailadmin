import { NextResponse } from 'next/server';
import connect from "@/lib/db";
import SingelProductModel from "@/models/singel";

export async function POST(req) {
    try {
        await connect();

        const body = await req.json();

        // Use forEach instead of map since you're not returning a new array
        for (const el of body) {
            if (el.id != '') {
                const newSingle = new SingelProductModel({
                    name: el.name,
                    stock: el.stock,
                    cost: el.cost,
                    min: el.cost, // Assuming this is correct, but you may want to adjust it
                    supplier: el.supplier
                });
                
                // Use await inside an async function
                await newSingle.save();
            }
        }

      
        return NextResponse.json({ msg: "Data saved successfully", status: 200 });
    } catch (error) {
  
        return NextResponse.json({ msg: error.message, status: 500 });
    }
}
