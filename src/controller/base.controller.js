import { table } from "../const/table-name.js";
import Model from "../service/psql.service.js";

export class BaseController {
    constructor(tabelModel) {
        this.tabelModel = tabelModel;
    }
    create = async (request, reply, exists) => {
        if (exists) {
            await this.checkExist(reply, exists)
        }
        const data = await Model.create(request.body, this.tabelModel);
        return reply.status(201).send({
            statusCode: 201,
            message: 'success',
            data
        })
    }

    findAll = async (_request, reply) => {
        const data = await Model.findAll(this.tabelModel);
        return reply.status(200).send({
            statusCode: 200,
            message: 'success',
            data
        })
    }

    findById = async (request, reply) => {
        const data = await this.checkId(request.params.id, reply)
        return reply.status(200).send({
            statusCode: 200,
            message: 'success',
            data
        })
    }

    update = async (request, reply, exists) => {
        const id = request.params.id
        await this.checkId(id, reply)
        if (exists) {
            await this.checkExist(reply, exists)
        }
        const data = await Model.update(id, request.body, this.tabelModel)
        return reply.status(200).send({
            statusCode: 200,
            message: 'success',
            data
        })
    }

    delete = async (request, reply) => {
        const id = request.params.id
        await this.checkId(id, reply)
        await Model.delete(id, this.tabelModel)
        return reply.status(200).send({
            statusCode: 200,
            message: 'success',
            data: {}
        })
    }

    checkExist = async (reply, exists) => {
        for (let [key, value] of Object.entries(exists)) {
            if (key && value) {
                const existKey = await Model.findOne(key, value, this.tabelModel);
                if (existKey) {
                    reply.code(404).send({
                        error: `${key} already added`
                    })
                }
            }
        }
    }

    checkId = async (id, reply) => {
        const existsId = await Model.findOne('id', id, this.tabelModel)
        if (!existsId) {
            reply.code(404).send({
                error: `this ${id} not found`
            })
        }
        return existsId
    }
}