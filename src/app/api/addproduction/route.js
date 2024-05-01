// Import models
import ProductionModel from "@/models/production";
import ProductModel from "@/models/product";
import connect from "@/lib/db";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";
// Connect to the database
connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { _id } = body;

    // Find the product in the ProductModel
    const product = await ProductModel.findOne({ _id: _id });
    
    if (!product) {
      return NextResponse.json({ msg: 'Product not found', status: 404 });
    }

    // Create a new document in the ProductionModel
    const newProduction = new ProductionModel({
      name: product.name, // Assuming 'name' is a field in your model
      type: product.type,
      composition: product.composition,
      composition_cost: product.composition_cost,
      production_cost: product.production_cost,
      total_cost: product.total_cost,
      multimedia: product.multimedia,
      sales_cost: product.sales_cost
    });
    await newProduction.save();

    // Remove the product from the ProductModel
    await ProductModel.deleteOne({ _id: _id });

    return NextResponse.json({ msg: 'Product copied to Production and removed from Products', status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error.message, status: 500 });
  }
}
