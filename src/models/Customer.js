import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    primary_contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    active: {
        type: String, 
        enum: ['active', 'inactive'] 
    },
    lead_customer:{
        type:Boolean,
        default: 0
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    zip_code:{
        type:String,
        required:true
    }
}, { timestamps: true });

let CustomerModel;

if (mongoose.models && mongoose.models.Customer) {
    CustomerModel = mongoose.models.Customer;
} else {
    CustomerModel = model('Customer', customerSchema);
}

export default CustomerModel;
