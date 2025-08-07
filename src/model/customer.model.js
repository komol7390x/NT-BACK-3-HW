import { Schema, model } from "mongoose";
import { Role } from '../const/Role.js'

const customerSchema = new Schema({
    fullName: { type: String, required: true, unique: true, min: 3, max: 256 },
    phoneNumber: { type: Number, required: true, unique: true, length: 12 },
    hashPassword: { type: String, required: true, min: 3 },
    email: { type: String, required: true, unique: true, min: 3, max: 256 },
    isActive: { type: Boolean, default: true },
    role: { type: String, enum: [Role.CUSTOMER], default: Role.CUSTOMER },
    device: { type: Array, default: [] }
}, { timestamps: true, versionKey: false })

export const Customers = model('customers', customerSchema)