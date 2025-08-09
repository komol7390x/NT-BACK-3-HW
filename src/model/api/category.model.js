import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true, min: 3, max: 256 },
    image:{type:String}
}, {
    timestamps: true, versionKey: false, virtuals: true,
    toObject: { virtuals: true }, toJSON: { virtuals: true }
})

categorySchema.virtual('ProductRef', {
    ref: 'products',
    localField: '_id',
    foreignField: 'categoryID'
});

export const Category = model('categories', categorySchema)

