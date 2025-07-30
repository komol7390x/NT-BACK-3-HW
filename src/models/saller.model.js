import { Schema, model } from "mongoose";
import { Roles } from "../const/Role.js";


const sallerSchema = new Schema({
    phoneNumber: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    wallet: { type: Number, default: 0 },
    image: { type: String },
    address: { type: String },
    role: { type: String, enum: [Roles.SALLER], default: Roles.SALLER },
}, {
    timestamps: true, virtuals: false, virtuals: true,
    toObject: { virtuals: true }, toJSON: { virtuals: true }
});

sallerSchema.virtual('Products', {
    ref: 'Product',
    localField: "_id",
    foreignField: 'sallerID'
})

export const Saller = model('Saller', sallerSchema);