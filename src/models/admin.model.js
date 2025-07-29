import { Schema, model } from "mongoose";
import { Roles } from "../const/Role.js";
const adminSchema = new Schema({
    username: { type: String, required: true, unique: true, min: 3, max: 100 },
    email: { type: String, required: true, unique: true, min: 3, max: 100 },
    hashPassword: { type: String, required: true, min: 3, max: 100 },
    isActive: { type: Boolean, default: false },
    role: { type: String, enum: [Roles.ADMIN,Roles.SUPERADMIN], default: Roles.ADMIN },
    phone: { type: String, unique: true, required: true }
}, { timestamps: true, versionKey: false })

export const Admin = model('Admin', adminSchema)