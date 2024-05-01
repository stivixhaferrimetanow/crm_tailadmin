import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const estimateSchema = new Schema({
    customer: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip_code: {
        type: String,
        required: true
    },
    country: {
        type: String, 
        required: true,
    },
    estimate_number:{
        type:String,
        required:true
    },
    estimate_date:{
        type:String,
        requried:true,
    },
    expiry_date:{
        type:String,
        required: true
    },
    currency:{
        type:String,
        required:true,
        default:'€'
    },
    status:{
        type:String,
        required: true,
        default:'Draft'
    },
    sale_agent:{
        type:String,
        required: true
    },
    discount_type:{
        type:String,
        required:false
    },
    admin_note:{
        type:String,
        required:false
    },
    products:{
        type:[{
            name:{
                type:String,
                required:true,
            },
            quantity:{
                type:Number,
                required:true
            },
            rate:{
                type:Number,
                required:true,
            },
            tax:{
                type:Number,
                required:true
            },
            amount:{
                type:String,
                required:true
            },
            description:{
                type:String,
                requried:false
            }
            
        }],
        required:true,
    },
    terms_conditions:{
        type:String,
        required:true
    }
}, { timestamps: true });

let CustomerModel;

if (mongoose.models && mongoose.models.Estimate) {
    EstimateModel = mongoose.models.Estimate;
} else {
    EstimateModel = model('Estimate', estimateSchema);
}

export default EstimateModel;
