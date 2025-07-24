import { isValidObjectId } from "mongoose";

export class BaseController {
    constructor(model) {
        this.model = model
    }
    create = async (req, res) => {
        try {
            const data = this.model.create(req.body)
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }

    }

    getAll = async (_, res) => {
        try {
            const data = await this.model.find()
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }
    }

    getByID = async (req, res) => {
        try {
            const id = req.params.id
            const checkUser = await this.checkByID(id, res);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: checkUser
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }
    }

    update = async (req, res) => {
        try {
            const id = req.params.id
            await this.checkByID(id, res);
            const updateUser = await this.model
                .findByIdAndUpdate(id, req.body, { new: true })
            console.log(updateUser);

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updateUser
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }
    }

    delete = async (req, res) => {
        try {
            const id = req.params.id
            await this.checkByID(id, res);
            const updateUser = await this.model.findByIdAndDelete(id, req.params)
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }
    }
    checkByID = async (id, res) => {
        if (!isValidObjectId(id)) {
            throw new Error('Invalid ObjectId')
        }
        const data = await this.model.findById(id);
        if (!data) {
            throw new Error`Not found this ${this.model}`
        }
        return data
    }
}