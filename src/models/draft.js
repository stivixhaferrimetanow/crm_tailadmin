import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const DraftSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: 'Draft',
  },
  total: {
    type: Number,
    required: true,
  },
  open_till: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  sent: {
    type:String,
    required: true,
  }
});

const DraftModel = mongoose.models.Draft || model('Draft', DraftSchema);

export default DraftModel;
