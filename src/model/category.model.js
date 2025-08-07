import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true, min: 3, max: 256 },
    image:{type:String,required:true}
}, { timestamps: true, versionKey: false })

export const Category = model('categories', categorySchema)