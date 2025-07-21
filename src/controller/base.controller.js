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
            const data = this.model.find()
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
            const checkUser = await checkID(id, res);
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
            await checkID(id, res);
            const updateUser = await this.model.findByIdAndUpdate(id, req.params)
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updateUser
            })
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
            await checkID(id, res);
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
    static checkID = async (id, res) => {
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid ObjectId'
            });
        }
        const data = this.model.findById(id);
        if (!data) {
            return res.status(404).json({
                statusCode: 404,
                message: `Not found this ${this.model}`
            });
        }
        return data
    }
}