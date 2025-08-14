import { AppError } from '../error/AppError.js'
import { successRes } from '../utils/successRes.js'

export class BaseController {
    constructor(Model) {
        this.Model = Model
    }

    create = async (req, res, next) => {
        try {
            const data = await this.Model.create(req.body)
            successRes(res, data, 201)
        } catch (error) {
            next(error)
        }
    }

    getAll = async (_req, res, next) => {
        try {
            const data = await this.Model.findAll({ order: [['createdAt', 'DESC']], include: { all: true, nested: true } })
            successRes(res, data)
        } catch (error) {
            next(error)
        }
    }

    getById = async (req, res, next) => {
        try {
            const id = req.params.id
            const data = await BaseController.checkById(id, this.Model)
            successRes(res, data)
        } catch (error) {
            next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const id = req.params.id
            await BaseController.checkById(id, this.Model)
            const data = await this.Model.update(req.body, { where: { id }, returning: true })
            successRes(res, data[1][0])
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res, next) => {
        try {
            const id = req.params.id
            await BaseController.checkById(id, this.Model)
            await this.Model.destroy({ where: { id } })
            successRes(res, {})
        } catch (error) {
            next(error)
        }
    }

    static checkById = async (id, model) => {
        let result = await model.findByPk(id)
            if (!result) {
                throw new AppError(`not found this id: ${id}`, 404)
            }
        return result
    }

    static checkExist = async (model, obj) => {
        for (let [key, value] of Object.entries(obj)) {
            const result = await model.findOne({ where: { [key]: value } })
            if (result) {
                throw new AppError(`${key} already added`, 409)
            }
        }
    }
}

