import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const daySchema = new Schema({
    user: {
        type:String,
        required: true
    },
    date:{
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    }
},{timestamps: true});

let DayModel;

if(mongoose.models && mongoose.models.Day){
    DayModel = mongoose.models.Day;
}else{
    DayModel = model("Day", daySchema);
}

export default DayModel
