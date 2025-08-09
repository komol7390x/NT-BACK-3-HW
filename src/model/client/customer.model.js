import { Schema, model } from "mongoose";
import { Role } from '../../const/Role.js'

const customerSchema = new Schema({
    fullName: { type: String, required: true, unique: true, min: 3, max: 256 },
    email: { type: String, required: true, unique: true, min: 3, max: 256 },
    phoneNumber: { type: Number, required: true, unique: true, length: 12 },
    hashPassword: { type: String, required: true, min: 3 },
    balance: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: false },
    role: { type: String, enum: [Role.CUSTOMER], default: Role.CUSTOMER },
    device: { type: Array, default: [] }
}, {
    timestamps: true, versionKey: false, virtuals: true,
    toObject: { virtuals: true }, toJSON: { virtuals: true }
})

customerSchema.virtual('OrderRef', {
    ref: 'orders',
    localField: '_id',
    foreignField: 'customerID'
});

customerSchema.virtual('WalletRef', {
    ref: 'wallets',
    localField: '_id',
    foreignField: 'customerID'
});

customerSchema.virtual('ProductRef', {
    ref: 'products',
    localField: '_id',
    foreignField: 'customerID'
});

export const Customers = model('customers', customerSchema)



