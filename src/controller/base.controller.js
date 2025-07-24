import { isValidObjectId } from "mongoose";
import { successRes } from '../utils/success-res.js'
import { AppError } from '../error/AppError.js';

export class BaseController {
    constructor(model) {
        this.model = model
    }
    create = async (req, res, next) => {
        try {
            const data = this.model.create(req.body)
            successRes(res, data, 201)
        } catch (error) {
            next(error.message)
        }

    }

    getAll = async (_, res) => {
        try {
            const data = await this.model.find()
            successRes(res, data)
        } catch (error) {
            next(error.message)
        }
    }

    getByID = async (req, res) => {
        try {
            const id = req.params.id
            const checkUser = await this.checkByID(id);
            successRes(res, checkUser)
        } catch (error) {
            next(error.message)
        }
    }

    update = async (req, res) => {
        try {
            const id = req.params.id
            await this.checkByID(id, res);
            const updateUser = await this.model
                .findByIdAndUpdate(id, req.body, { new: true })
            console.log(updateUser);

            successRes(updateUser)
        } catch (error) {
            next(error.message)
        }
    }

    delete = async (req, res) => {
        try {
            const id = req.params.id
            await this.checkByID(id, res);
            const updateUser = await this.model.findByIdAndDelete(id, req.params)
            successRes({})
        } catch (error) {
            next(error.message)
        }
    }
    checkByID = async (id) => {
        if (!isValidObjectId(id)) {
            throw new Error('Invalid ObjectId', 400)
        }
        const data = await this.model.findById(id);
        if (!data) {
            throw new Error(`Not found this ${this.model}`, 404)
        }
        return data
    }
}