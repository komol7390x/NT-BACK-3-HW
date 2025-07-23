import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    phone: { type: String, required: true, unique: true, minlength: 9, maxlength: 13 },
    email: { type: String, required: true, unique: true, min: 3, max: 100 },
    hashPassword: { type: String, required: true, min: 3, max: 100 },
    username: { type: String, unique: true, min: 3, max: 100 },
    isActive: { type: Boolean, default: false },
    role: { type: String, enum: ['customer'], default: 'customer' },
})

export const Customer = model('customer', customerSchema);