import { model, Schema } from 'mongoose'

const BooksSchema = new Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 100, unique: true },
    authorID: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    genre: { type: String, unique: true, minlength: 3, maxlength: 100 },
    price: { type: Number, min: 1, default: 1 },
    sold: { type: Number, min: 0, default: 0 },
    stock: { type: Number, min: 0, default: 0 },
}, { timestamps: true, versionKey: false })

export const Books = model('Books', BooksSchema);