import { where } from 'sequelize'
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
            const data = await this.Model.create.findAll({ order: [['createdAt', 'DESC']], include: { all: true } })
            successRes(res, data)
        } catch (error) {
            next(error)
        }
    }

    getById = async (req, res, next) => {
        try {
            const data = await this.Model.findByPk(req.params.id)
            successRes(res, data)
        } catch (error) {
            next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const data = await this.Model.update(req.body, { where: { id: req.params.id }, returning: true })
            successRes(res, data[1][0])
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res, next) => {
        try {
            await this.Model.destroy({ where: { id: req.params.id } })
            successRes(res, {})
        } catch (error) {
            next(error)
        }
    }
}

