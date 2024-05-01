import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const clientSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    number: {
        type:String,
        required: false,
        
    },
    id:{
        type:String,
        required: false
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

let ClientModel

if (mongoose.models && mongoose.models.Client) {
    ClientModel = mongoose.models.Client;
} else {
    ClientModel = model('Client', clientSchema);
}

export default ClientModel;
