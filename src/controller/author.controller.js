import { Author } from '../modules/authors.schema.js'
import { isValidObjectId } from 'mongoose'

export class AuthorController {
    async createAuthor(req, res) {
        try {
            const nameAuthor = req.body.name
            const existAuthor = await Author.findOne({ name: nameAuthor });
            if (existAuthor) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `this ${nameAuthor} already added Author`
                })
            }
            const result = await Author.create(req.body);
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
    async getAllAuthor(_, res) {
        try {
            const result = await Author.find();
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
    async getAuthorById(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Author.findById(id);
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
    async updateAuthor(req, res) {
        try {
            const nameAuthor = req.body.name
            const existAuthor = await Author.findOne({ name: nameAuthor });
            if (existAuthor) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `this ${nameAuthor} already added Author`
                })
            }
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Author.findById(id);
            if (!findId) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `not found this user :( ID:${id}`
                })
            }
            const result = await Author.findByIdAndUpdate(id, req.body)
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
    async deleteAuthor(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Author.findById(id);
            if (!findId) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `not found this user :( ID:${id}`
                })
            }
            await Author.findByIdAndDelete(id)
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