import { model, Schema } from 'mongoose'

const OrdersSchema = new Schema({
    user_id: { type: Number, required: true, min: 1, max: 100000 },
    bookID: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, min: 1, max: 10000 },
    date: { type: Date, default: Date.now }
}, { timestamps: true, versionKey: false })

export const Orders = model('Orders', OrdersSchema);