import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    status: { type: Boolean, default: false },
    access: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false })

export const Payment = model('payments', paymentSchema)