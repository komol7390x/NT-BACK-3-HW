import { Category } from '../modules/books.schema.js'
import { isValidObjectId } from 'mongoose'

export class CategoryController {
    async createCategory(req, res) {
        try {
            const nameCategory = req.body.name
            const existCategory = await Category.findOne({ name: nameCategory });
            if (existCategory) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `this ${nameCategory} already added Category`
                })
            }
            const result = await Category.create(req.body);
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
    async getAllCategory(_, res) {
        try {
            const result = await Category.find().populate({ path: 'allCategory', populate: { path: 'allProducts' } });
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
    async getCategoryById(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Category.findById(id).populate({ path: 'allCategory', populate: { path: 'allProducts' } });
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
    async updateCategory(req, res) {
        try {
            const nameCategory = req.body.name
            const existCategory = await Category.findOne({ name: nameCategory });
            if (existCategory) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `this ${nameCategory} already added Category`
                })
            }
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Category.findById(id);
            if (!findId) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `not found this user :( ID:${id}`
                })
            }
            const result = await Category.findByIdAndUpdate(id, req.body)
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
    async deleteCategory(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Category.findById(id);
            if (!findId) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `not found this user :( ID:${id}`
                })
            }
            await Category.findByIdAndDelete(id)
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