import SingelProductModel from "@/models/singel";
import ProductModel from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";


export async function GET() {
    try {
        const warehouseProducts = await SingelProductModel.find({});
        let myArray = [];
        warehouseProducts.map((el) => {
            let myObj = {
                id: el._id,
                name: el.name,
                stock: el.stock,
                min_stock: el.min
            }
            myArray.push(myObj)
        })
        return NextResponse.json({ data: myArray, status: 200 });
    } catch (error) {
        console.error("Error fetching warehouse products:", error);
        return NextResponse.json({ msg: "Error fetching warehouse products", status: 500 });
    }
}