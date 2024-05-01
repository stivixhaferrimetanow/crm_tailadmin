// pages/api/updateCustomers.js

import connect from "@/lib/db";
import CustomerModel from "@/models/Customer";
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function POST(req) {
    connect();
    try {
        const { array } = await req.json();
        const customers = await CustomerModel.find({});
        await Promise.all(array.map(async item => {
            const customerToUpdate = customers.find(customer => customer.id === item.id);

            if (customerToUpdate) {
                customerToUpdate.lead_customer = item.value;
                await customerToUpdate.save();
            }
        }));
        return new NextResponse({
            status: 200,
            body: { success: true, message: 'Customers updated successfully' }
        });
    } catch (error) {
        return new NextResponse({
            status: 500,
            body: { msg: error, status: 500 }
        });
    }
}
