import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    orderQuantity: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, min: 0 },
    customerID: { type: Schema.Types.ObjectId, ref: 'customers' },
    productID: { type: Schema.Types.ObjectId, ref: 'products' }
}, { timestamps: true, versionKey: false })

export const Order = model('orders', orderSchema)