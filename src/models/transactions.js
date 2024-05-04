import mongoose from 'mongoose';



const {Schema , model} = mongoose;


const transactionSchema = new Schema({
    customer_id:{
        type:String,
        required:true,
    },
    transaction_subject:{
        type:String,
        required:true
    }
})