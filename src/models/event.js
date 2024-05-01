import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const eventSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

let EventModel;

if (mongoose.modelNames().includes("Event")) {
    EventModel = mongoose.model("Event");
} else {
    EventModel = model("Event", eventSchema);
}

export default EventModel;
