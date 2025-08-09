import Transaction from "../models/transaction.model.js";
import Client from "../models/client.model.js";
import Seller from "../models/sellar.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/async-handler.js";
import { successRes } from "../utils/succes-res.js";
import { AppError } from "../error/AppError.js";

class TransactionController {
    create = asyncHandler(async (req, res, next) => {
        const { from, to, amount, orderId } = req.body;

        if (!from || !to || !amount) {
            return next(new AppError("from, to va amount maydonlari majburiy", 400));
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const client = await Client.findById(from).session(session);
            const seller = await Seller.findById(to).session(session);

            if (!client || !seller) {
                throw new AppError("Client yoki Seller topilmadi", 404);
            }

            if (client.balance < amount) {
                throw new AppError("Client balansida yetarli mablag' yo'q", 400);
            }

            client.balance -= amount;
            seller.balance += amount;

            await client.save({ session });
            await seller.save({ session });

            const [transaction] = await Transaction.create(
                [{ from, to, amount, orderId, status: "success" }],
                { session }
            );

            await session.commitTransaction();
            return successRes(res, transaction, 201);
        } catch (error) {
            if (session.inTransaction()) {
                await session.abortTransaction();
            }
            next(error);
        } finally {
            session.endSession();
        }
    });
}

export default new TransactionController();
