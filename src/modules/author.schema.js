import { model, Schema } from 'mongoose'

const AuthorSchema = new Schema({
    name: { type: String, required: true, unique: true, minlength: 3, maxlength: 100 },
    country: { type: String, minlength: 3, maxlength: 100 },
    age: { type: Number, min: 0, max: 100, default: 12 }
}, { timestamps: true, versionKey: false })

export const Author = model('Author', AuthorSchema);

