import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    orderQuantity: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, min: 0 },
    customerID: { type: Schema.Types.ObjectId, ref: 'customers' },
    productID: { type: Schema.Types.ObjectId, ref: 'products' }
}, { timestamps: true, versionKey: false })

orderSchema.virtual('delivery', {
    ref: 'DeliveryRef',
    localField: '_id',
    foreignField: 'orderID',
    justOne: true
});

orderSchema.virtual('payment', {
    ref: 'PaymentRef',
    localField: '_id',
    foreignField: 'orderID',
    justOne: true
});

orderSchema.set('toObject', { virtuals: true });
orderSchema.set('toJSON', { virtuals: true });

export const Order = model('orders', orderSchema)