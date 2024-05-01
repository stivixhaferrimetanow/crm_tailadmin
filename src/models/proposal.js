
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const proposalSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    client_type:{
        type:String,
        required: true
    },
    client_id:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    zip_code:{
        type:String,
        required:true
    },
    items:[{
        Description: String,
        name:String,
        prod_id: String,
        qty:Number,
        rate:Number,
        tax:String
    }],
    sub_total:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    tax:{
        type:Number,
        required:true
    },
    status: {
        type:String,
        required:true
    },
    adjustment:{
        type:Number,
        required:true
    },
    discount: {
        type:Number,
        required: true
    },
    open_till:{
        type:String,
        required:true
    }
}, { timestamps: true });

let ProposalModel

if (mongoose.models && mongoose.models.Proposal) {
    ProposalModel = mongoose.models.Proposal;
} else {
    ProposalModel = model('Proposal', proposalSchema);
}

export default ProposalModel;
