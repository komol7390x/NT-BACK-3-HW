import { Subscription } from '../modules/subscriptions.module.js'
import { isValidObjectId } from 'mongoose'

export class SubscriptionController {
    constructor() {
        this
    }
    async createSubscription(req, res) {
        try {
            const result = await Subscription.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async getAllSubscription(_, res) {
        try {
            const result = await Subscription.find()
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }
    async getSubscriptionById(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Subscription.findById(id);
            if (!findId) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `not found this user :( ID:${id}`
                })
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: findId
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }
    async updateSubscription(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Subscription.findById(id);
            if (!findId) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `not found this user :( ID:${id}`
                })
            }
            const result = await Subscription.findByIdAndUpdate(id, req.body)
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }
    async deleteSubscription(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Subscription.findById(id);
            if (!findId) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `not found this user :( ID:${id}`
                })
            }
            await Subscription.findByIdAndDelete(id)
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }
}

