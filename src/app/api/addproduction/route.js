// Import models
import ProductionModel from "@/models/production";
import ProductModel from "@/models/product";
import connect from "@/lib/db";
import { NextResponse } from "next/server";
import Timestamp from "@/models/timestamp";

export const dynamic = "force-dynamic";

await connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { _id } = body;

    
    const product = await ProductModel.findOne({ _id: _id });
    
    if (!product) {
      return NextResponse.json({ msg: 'Product not found', status: 404 });
    }

    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    
    const newProduction = new ProductionModel({
      name: product.name, 
      type: product.type,
      composition: product.composition,
      composition_cost: product.composition_cost,
      production_cost: product.production_cost,
      total_cost: product.total_cost,
      multimedia: product.multimedia,
      sales_cost: product.sales_cost,
      
    });

    const newTimestamp = new Timestamp({
      item_id: _id,
      current_status: 'Draft',
      draft_start_time: now,
      total_start_time: now
    });


    await newProduction.save();

    await newTimestamp.save();

    // Remove the product from the ProductModel
    await ProductModel.deleteOne({ _id: _id });

    return NextResponse.json({ msg: 'Product copied to Production and removed from Products', status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error.message, status: 500 });
  }
}
