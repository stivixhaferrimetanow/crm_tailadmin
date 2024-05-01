import connect from "@/lib/db";
import SingelProductModel from "@/models/singel";
import { NextResponse } from "next/server";



export const dynamic = "force-dynamic";




export async function GET() {
    connect();
    try {
        const data = await SingelProductModel.find({});
        
        function groupDataBySupplier(data) {
            const groupedData = {};
            let totalCost = 0;
            data.forEach(item => {
                if (!groupedData[item.supplier]) {
                    groupedData[item.supplier] = { supplier: item.supplier, totalCost: 0, stock: 0, products: [] };
                }
                const itemCost = item.cost * item.stock; // Calculate the total cost for this item
                groupedData[item.supplier].totalCost += itemCost;
                groupedData[item.supplier].stock += item.stock;
                groupedData[item.supplier].products.push(item);
                totalCost += itemCost;
            });

            // Calculate percentages and update groupedData
            for (const supplier in groupedData) {
                groupedData[supplier].percentage = (groupedData[supplier].totalCost / totalCost) * 100;
            }

            return { groupedData: Object.values(groupedData), totalCost };
        }
        
        const { groupedData, totalCost } = groupDataBySupplier(data);
        groupedData.sort((a, b) => b.totalCost - a.totalCost);

        return NextResponse.json({ data: groupedData, totalCost, originalData: data, status: 200 });

    } catch (error) {
        return NextResponse.json({ msg: error, status: 500 });
    }
}
