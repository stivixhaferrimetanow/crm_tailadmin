import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TaskSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    members:[{
        type: String,
      }],
    current_date: {
        type:String,
        required: true
    },
    due_date:{
        type:String,
        required:true
    },
    progress:{
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    }


}, { timestamps: true });

let TaskModel

if (mongoose.models && mongoose.models.Task) {
    TaskModel = mongoose.models.Task;
} else {
    TaskModel = model('Task', TaskSchema);
}

export default TaskModel;
