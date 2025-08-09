import { Schema, model } from "mongoose";
import { Role } from '../../const/Role.js'

const sallerSchema = new Schema({
    fullName: { type: String, required: true, unique: true, min: 3, max: 256 },
    email: { type: String, required: true, unique: true, min: 3, max: 256 },
    phoneNumber: { type: Number, required: true, unique: true, length: 12 },
    hashPassword: { type: String, required: true, min: 3 },
    isActive: { type: Boolean, default: false },
    balance: { type: Number, default: 0, min: 0 },
    role: { type: String, enum: [Role.SALLER], default: Role.SALLER },
    device: { type: Array, default: [] }
}, {
    timestamps: true, versionKey: false, virtuals: true,
    toObject: { virtuals: true }, toJSON: { virtuals: true }
})

sallerSchema.virtual('PaymentRef', {
    ref: 'payments',
    localField: '_id',
    foreignField: 'sallerID'
});

sallerSchema.virtual('WalletRef', {
    ref: 'wallets',
    localField: '_id',
    foreignField: 'sallerID'
});

sallerSchema.virtual('ProductRef', {
    ref: 'products',
    localField: '_id',
    foreignField: 'sallerID'
});

export const Saller = model('sallers', sallerSchema)