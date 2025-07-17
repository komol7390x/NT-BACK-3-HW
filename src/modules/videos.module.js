import { model, Schema } from 'mongoose';

const VideoSchema = new Schema({
    title: { type: String, required: true, minlength: 1, maxlength: 100 },
    uploader_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    views: { type: Number, default: 0, min: 0 },
    likes: { type: Number, default: 0, min: 0 }
}, { timestamps: true, versionKey: false });

export const Video = model('Video', VideoSchema);
