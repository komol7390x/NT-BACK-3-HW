import { model, Schema } from 'mongoose';

const CommentSchema = new Schema({
    video_id: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, minlength: 1 },
    likes: { type: Number, default: 0, min: 0 }
}, { timestamps: true, versionKey: false });

export const Comment = model('Comment', CommentSchema);
