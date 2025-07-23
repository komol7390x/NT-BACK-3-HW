import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    phoneNumber: { type: String, required: true, unique: true, minlength: 9, maxlength: 13 },
    email: { type: String, required: true, unique: true, min: 3, max: 100 },
    fullName: { type: String, unique: true, min: 3, max: 100 },
    isActive: { type: Boolean, default: false },
    role: { type: String, enum: ['customer'], default: 'customer' },
})

export const Customer = model('customer', customerSchema);