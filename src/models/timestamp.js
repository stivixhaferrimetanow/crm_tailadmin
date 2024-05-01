import mongoose from 'mongoose';


const {Schema , model} = mongoose;


const timestampSchema = new Schema({
    item_id:{
        type: String,
        required: true
    },
    current_status: {
        type:String,
        required:true
    },
    draft_start_time:{
        type:Date,
        required:true
    },
    draft_end_time:{
        type:Date,
        required:false
    },
    started_start_time:{
        type:Date,
        required: false
    },
    started_end_time:{
        type:Date,
        required:false
    },
    planning_start_time:{
        type:Date,
        required:false
    },
    planning_end_time:{
        type:Date,
        required:false
    },
    research_start_time:{
        type:Date,
        required:false
    },
    research_end_time:{
        type:Date,
        required:false
    },
    development_start_time:{
        type:Date,
        required:false
    },
    development_end_time:{
        type:Date,
        required:false
    },
    testing_start_time:{
        type:Date,
        required:false
    },
    testing_end_time:{
        type:Date,
        required:false
    },
    review_start_time:{
        type:Date,
        required:false
    },
    review_end_time:{
        type:Date,
        required:false
    },
    finish_start_time:{
        type:Date,
        required:false
    },
    finish_end_time:{
        type:Date,
        required:false
    },
    total_start_time:{
        type:Date,
        required:true
    },
    total_end_time:{
        type:Date,
        required:false
    }

    
},{timestamps: true});

let Timestamp;


if(mongoose.models && mongoose.models.Timestamp){
    Timestamp = mongoose.models.Timestamp;
}else{
    Timestamp = model('Timestamp', timestampSchema);
}


export default Timestamp;


