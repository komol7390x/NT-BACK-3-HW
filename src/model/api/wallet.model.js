import { Schema, model } from "mongoose";

const walletSchema = new Schema({
    cardNumber: { type: Number, required: true, length: 16, unique: true },
    balance: { type: Number, min: 0, default: 0 },
    customerID: { type: Schema.Types.ObjectId, ref: 'customers' },
    sallerID: { type: Schema.Types.ObjectId, ref: 'sallers' }
}, { timestamps: true, versionKey: false })

export const Wallet = model('wallets', walletSchema)