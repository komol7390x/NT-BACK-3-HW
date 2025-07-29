import { isValidObjectId } from "mongoose";
import { successRes } from '../utils/success-res.js'
import { AppError } from '../error/AppError.js';

export class BaseController {
    constructor(model) {
        this.model = model
    }
    create = async (req, res, next) => {
        try {
            const data = await this.model.create(req.body)
            successRes(res, data, 201)
        } catch (error) {
            next(error)
        }

    }

    getAll = async (_, res) => {
        try {
            const data = await this.model.find()
            successRes(res, data)
        } catch (error) {
            next(error)
        }
    }

    getByID = async (req, res) => {
        try {
            const id = req.params.id
            const checkUser = await BaseController.checkByID(id, this.model);
            successRes(res, checkUser)
        } catch (error) {
            next(error)
        }
    }

    update = async (req, res) => {
        try {
            const id = req.params.id
            await this.checkByID(id, this.model);
            const updateUser = await this.model
                .findByIdAndUpdate(id, req.body, { new: true })
            console.log(updateUser);

            successRes(updateUser)
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res) => {
        try {
            const id = req.params.id
            await BaseController.checkByID(id, this.model);
            await this.model.findByIdAndDelete(id, req.params)
            successRes({})
        } catch (error) {
            next(error)
        }
    }
    static checkByID = async (id, schema) => {
        if (!isValidObjectId(id)) {
            throw new AppError('Invalid ObjectId', 400)
        }
        const result = schema || this.model
        const data = await result.findById(id);
        if (!data) {
            throw new AppError(`Not found this ${this.model}`, 404)
        }
        return data
    }
}