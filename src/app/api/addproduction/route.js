// Import models
import ProductionModel from "@/models/production";
import ProductModel from "@/models/product";
import connect from "@/lib/db";
import { NextResponse } from "next/server";
import Timestamp from "@/models/timestamp";
import SingelProductModel from "@/models/singel";


export const dynamic = "force-dynamic";





async function updateStock(array) {
  try {
    for (let i = 0; i < array.length; i++) {
      const item1 = array[i];
      const filter = { _id: item1._id };
      const update = { $inc: { stock: -item1.stock } };
      await SingelProductModel.findOneAndUpdate(filter, update);
    }

    return { msg: 'Stock updated successfully' };
  } catch (error) {
    console.error('Error updating the stock:', error);
    return { msg: 'Error updating the stock' };
  }
}




export async function POST(req) {
  try {

    await connect();



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


    await newProduction.save();

    const newTimestamp = new Timestamp({
      item_id: newProduction._id,
      current_status: 'Draft',
      draft_start_time: now,
      total_start_time: now
    });


    

    await newTimestamp.save();

    
    await ProductModel.deleteOne({ _id: _id });


    return NextResponse.json({data: product.composition})
    updateStock(product.composition);


    return NextResponse.json({ msg: 'Product copied to Production and removed from Products', status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error.message, status: 500 });
  }
}
