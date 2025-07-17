import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 }
}, { timestamps: true, versionKey: false });

export const User = model('User', UserSchema);