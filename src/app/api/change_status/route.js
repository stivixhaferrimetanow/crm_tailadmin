import { NextResponse } from "next/server";
import ProductionModel from "@/models/production";
import connect from "@/lib/db";


export const dynamic = "force-dynamic";

export async function POST(req) {
    await connect();
    try {
        const body = await req.json();
        const { _id, value } = body;
        if (!_id || !value) {
            return NextResponse.json({ msg: "Value or the id is missing", status: 500 });
        }
        const updateModel = await ProductionModel.findByIdAndUpdate(_id, { status: value }, { new: true });
        return NextResponse.json({ data: updateModel, status: 200, msg: 'Success' });
    } catch (error) {
        return NextResponse.json({ msg: error.message, status: 500 });
    }
}
