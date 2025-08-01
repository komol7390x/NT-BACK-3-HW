import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number },
    quantity: { type: Number },
    description: { type: String },
    sallerID: { type: Schema.Types.ObjectId, ref: 'Saller' },
    categoryID: { type: Schema.Types.ObjectId, ref: 'Categories' }
}, {
    timestamps: true, versionKey: false, virtuals: true,
    toObject: { virtuals: true }, toJSON: { virtuals: true }
});

export const Product = model('Products', productSchema)