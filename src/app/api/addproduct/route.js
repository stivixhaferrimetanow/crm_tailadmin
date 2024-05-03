import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import ProductModel from '@/models/product';
import SingelProductModel from '@/models/singel';
import { writeFile } from 'fs/promises';
import path from 'path';

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



// export async function POST(req) {
//   try {
//     await connect();
//     const data = await req.formData();
//     const name = data.get('name');
//     const compositionString = data.get('composition');
//     const composition = JSON.parse(compositionString);

//     let sum = 0;
//     composition.map((el) =>{
//       let prod = el.stock * el.cost;
//       sum += prod
//     })
   

//     const composition_cost = sum;
   
//     const production_cost = data.get('production_cost');

//     const sales_cost = data.get('sales_cost');
//     const total_cost = parseInt(sales_cost) + parseInt(sum) + parseInt(production_cost);
//     const multimediaFile = data.get('multimedia');

//     if (!multimediaFile) {
//       return NextResponse.json({ msg: 'Multimedia file is required' });
//     }


//     const fileBuffer = await multimediaFile.arrayBuffer();
//     const buffer = Buffer.from(fileBuffer);

//     const fileName = `${Date.now()}-${multimediaFile.name}`;
//     const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
//     await writeFile(filePath, buffer);
    


//     const product = new ProductModel({
//       name,
//       composition,
//       composition_cost,
//       production_cost,
//       total_cost,
//       sales_cost,
//       multimedia: `/uploads/${fileName}`
//     });

//     await product.save();


//     await updateStock(composition)

//     return NextResponse.json({ msg: 'Product added successfully' , status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ msg: error, status: 500 });
//   }
// }













export async function POST(req) {
  try {
    connect();
    const data = await req.formData();
    const name = data.get('name');
    const compositionString = data.get('composition');
    const composition = JSON.parse(compositionString);

    let sum = 0;
    composition.forEach((el) => {
      let prod = el.stock * el.cost;
      sum += prod;
    });

    const composition_cost = sum;

    const production_cost = data.get('production_cost');

    const sales_cost = data.get('sales_cost');
    const total_cost = parseInt(sales_cost) + parseInt(sum) + parseInt(production_cost);

    const multimediaFile = data.get('multimedia');

    if (multimediaFile) {
      const fileBuffer = await multimediaFile.arrayBuffer();
      const buffer = Buffer.from(fileBuffer);

      const fileName = `${Date.now()}-${multimediaFile.name}`;
      const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
      await writeFile(filePath, buffer);

      const product = new ProductModel({
        name,
        composition,
        composition_cost,
        production_cost,
        total_cost,
        sales_cost,
        multimedia: `/uploads/${fileName}`
      });

      await product.save();
    } else {
      const product = new ProductModel({
        name,
        composition,
        composition_cost,
        production_cost,
        total_cost,
        sales_cost
      });

      await product.save();
    }

    // await updateStock(composition);

    return NextResponse.json({ msg: 'Product added successfully', status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: error, status: 500 });
  }
}






