import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    status: { type: Boolean, default: false },
    orderID: { type: Schema.Types.ObjectId, ref: 'orders' },
    sallerID: { type: Schema.Types.ObjectId, ref: 'sallers' }
}, { timestamps: true, versionKey: false })

export const Payment = model('payments', paymentSchema)