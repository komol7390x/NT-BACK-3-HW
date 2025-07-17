import { model, Schema } from 'mongoose';

const SubscriptionSchema = new Schema({
    follower_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    followee_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true, versionKey: false });

export const Subscription = model('Subscription', SubscriptionSchema);
