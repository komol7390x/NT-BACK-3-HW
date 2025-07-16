import { Books } from '../modules/books.schema.js'
import { isValidObjectId } from 'mongoose'

export class BooksController {
    async createBooks(req, res) {
        try {
            const nameBooks = req.body.title
            const existBooks = await Books.findOne({ title: nameBooks });
            if (existBooks) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `this ${nameBooks} already added Books`
                })
            }
            const result = await Books.create(req.body);
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
    async getAllBooks(_, res) {
        try {
            const result = await Books.find();
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
    async getBooksById(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Books.findById(id);
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
    async updateBooks(req, res) {
        try {
            const nameBooks = req.body.title
            const existBooks = await Books.findOne({ title: nameBooks });
            if (existBooks) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `this ${nameBooks} already added Books`
                })
            }
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Books.findById(id);
            if (!findId) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `not found this user :( ID:${id}`
                })
            }
            const result = await Books.findByIdAndUpdate(id, req.body)
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
    async deleteBooks(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Books.findById(id);
            if (!findId) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `not found this user :( ID:${id}`
                })
            }
            await Books.findByIdAndDelete(id)
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