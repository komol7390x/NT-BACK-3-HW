import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    username: { type: String, required: true, unique: true, min: 3, max: 100 },
    email: { type: String, required: true, unique: true, min: 3, max: 100 },
    hashPassword: { type: String, required: true, min: 3, max: 100 },
    isActive: { type: Boolean, default: false },
    role: { type: String, enum: ['Admin', 'SUPERADMIN'], default: 'Admin' },
}, { timestamps: true, versionKey: false })

export const Admin = model('Admin', adminSchema)