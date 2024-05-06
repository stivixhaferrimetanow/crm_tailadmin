import mongoose from 'mongoose'


const {Schema , model} = mongoose;


const PaymentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:false
    },
    user_id:{
        type:String,
        required: true
    },
    value:{
        type:Number,
        required:true
    },
    status: {
        type:String,
        required: false,
        default:'Customer',
        
    },
    last_contact:{
        type:String,
        required:false
    },
    payment_method:{
        type:String,
        required:true
    },
    transaction_id: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    tax:{
        type:Number,
        required:false
    },

},{timestamps: true})



let PaymentModel;

if (mongoose.modelNames().includes("Payment")) {
    PaymentModel = mongoose.model("Payment");
} else {
    PaymentModel = model("Payment", PaymentSchema);
}

export default PaymentModel;
