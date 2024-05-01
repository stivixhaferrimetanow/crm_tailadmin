import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const roleSchema = new Schema({
    title: {
        type: String,
        required: true
    }
}, { timestamps: true });

let RoleModel;

if (mongoose.models && mongoose.models.Role) {
    RoleModel = mongoose.models.Role;
} else {
    RoleModel = model('Role', roleSchema);
}

export default RoleModel;
