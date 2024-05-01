import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    type:{
        type: String,
        required: false,
        default: 'perbere'
    },
    composition:[{
        name: String,
        value: Number,
        cost: Number,
      }],
    composition_cost: {
        type:Number,
        required: true
    },
    production_cost:{
        type:Number,
        required:true
    },
    total_cost:{
        type:Number,
        required: true
    },
    multimedia:{
        type:String,
        required: false
    },
    sales_cost: {
        type:Number,
        required: true
    },
    product_type:{
        type:String,
        rqeuired:false,
        default: 'perbere'
    }

}, { timestamps: true });

let ProductModel

if (mongoose.models && mongoose.models.Product) {
    ProductModel = mongoose.models.Product;
} else {
    ProductModel = model('Product', productSchema);
}

export default ProductModel;
