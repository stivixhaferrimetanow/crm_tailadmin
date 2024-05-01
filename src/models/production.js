import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productionSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    type:{
        type: String,
        required: true
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
    status:{
        type:String,
        rqeuired:false,
        default: 'Draft'
    }

}, { timestamps: true });

let ProductionModel

if (mongoose.models && mongoose.models.Production) {
    ProductionModel = mongoose.models.Production;
} else {
    ProductionModel = model('Production', productionSchema);
}

export default ProductionModel;
