import { NextResponse } from "next/server";
import connect from "@/lib/db";
import CustomerModel from "@/models/Customer";
import PaymentModel from "@/models/payment";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connect();

        const body = await req.json();
        const { name, email, value, status, payment_method, transaction_id, description, tax } = body;

        // Find the user by email
        const user = await CustomerModel.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ msg: 'User not found', status: 404 });
        }

        // Create a new PaymentModel instance
        const newPayment = new PaymentModel({
            name,
            email,
            value,
            status,
            payment_method,
            transaction_id,
            description,
            tax,
            phone: user.phone,
            user_id: user._id,
            last_contact: new Date() 
        });

        // Save the new payment record
        await newPayment.save();

        return NextResponse.json({ msg: 'Success', status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: 'Error', status: 500 });
    }
}
