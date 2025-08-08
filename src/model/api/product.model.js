import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true, unique: true, min: 3, max: 256 },
    price: { type: Number, required: true, min: 0 },
    stockQuantity: { type: Number, min: 0, default: 0 },
    image: { type: String},
    customerID: { type: Schema.Types.ObjectId, ref: 'customers' },
    categoryID: { type: Schema.Types.ObjectId, ref: 'categories' }
}, { timestamps: true, versionKey: false })

export const Product = model('products', productSchema)