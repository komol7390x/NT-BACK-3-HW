import { isValidObjectId } from "mongoose";
import DeviceDetector from "node-device-detector";

const device=new DeviceDetector()

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

    getAll = async (req, res) => {
        try {
            const result=device.detect(req.headers['user-agent'])
            console.log(result);
            
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
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid ObjectId'
            });
        }
        const data = await this.model.findById(id);
        if (!data) {
            return res.status(404).json({
                statusCode: 404,
                message: `Not found this ${this.model}`
            });
        }
        return data
    }
}