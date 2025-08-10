import mongoose from 'mongoose';
import { AppError } from '../error/AppError.js'

class TransactionToUser {
    transferMoney = async (fromUserId, fromUserWallet, toUserId, toUserWallet, amount) => {

        const session = await mongoose.startSession();
        console.log(session);

        session.startTransaction();

        try {
            const fromUser = await fromUserWallet.findById(fromUserId).session(session);
            console.log(fromUser);
            const toUser = await toUserWallet.findById(toUserId).session(session);

            if (!fromUser || !toUser) {
                throw new AppError('User topilmadi', 409);
            }
            if (fromUser.balance < amount) {
                throw new AppError("Balansda yetarli mablag' yo'q", 409);
            }

            // Balanslarni yangilash
            fromUser.balance -= amount;
            toUser.balance += amount;

            await fromUser.save({ session });
            await toUser.save({ session });

            // Tranzaktsiyani yozish

            await session.commitTransaction();
            session.endSession();

            return {
                status: 200,
                message: 'success',
                data: session
            };

        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err;
        }
    }
}

export default new TransactionToUser();
