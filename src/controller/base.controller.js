import { isValidObjectId } from "mongoose";
import { successRes } from '../utils/success-res.js'
import { AppError } from '../error/AppError.js';
import { query } from "winston";

export class BaseController {
    constructor(model, populateFields = []) {
        this.model = model
        this.populateFields = populateFields
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
            let query = await this.model.find()
            const fields = this.populateFields;
            if (fields?.length) {
                fields.forEach(field => query.populate(field))
            }
            const data = await query.exec()
            return successRes(res, data)
        } catch (error) {
            next(error)
        }
    }

    getByID = async (req, res) => {
        try {
            const id = req.params.id
            await BaseController.checkByID(id, this.model);
            let query = await this.model.find()
            const fields = this.populateFields;
            if (fields?.length) {
                fields.forEach(field => query.populate(field))
            }
            const data = await query.exec()
            successRes(res, data)
        } catch (error) {
            next(error)
        }
    }

    update = async (req, res) => {
        try {
            const id = req.params.id
            await this.checkByID(id, this.model);
            let data = await this.model.findByIdAndUpdate(id, req.body, { new: true })
            if (this.populateFields.length) {
                for (let populateField of this.populateFields) {
                    data = data.populate(populateField)
                }
            }
            successRes(res, data)
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res) => {
        try {
            const id = req.params.id
            await BaseController.checkByID(id, this.model);
            await this.model.findByIdAndDelete(id, req.params)
            successRes(res,{})
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