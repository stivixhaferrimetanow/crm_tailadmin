import mongoose from "mongoose";

const { Schema, model } = mongoose;

const singelproductSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    stock:{
        type: Number,
        required: true
    },
    type:{
        type:String,
        required:false,
        default: 'Tek'
    },
    cost:{
        type:Number,
        required:true
    },
    min: {
        type:Number,
        required: true
    },
     supplier:{
        type: String,
        required: false
     },
     product_type:{
        type:String,
        required:false,
        default: 'tek'
     }

}, { timestamps: true });

let SingelProductModel;

try {
    
    SingelProductModel = mongoose.model('SingleProduct');
} catch (error) {
   
    SingelProductModel = model('SingleProduct', singelproductSchema);
}

export default SingelProductModel;
