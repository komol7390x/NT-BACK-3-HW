import Model from "../service/psql.service.js";
import { table } from '../const/table-name.js'

export class BaseController {
    constructor(tabelModel, Role) {
        this.tabelModel = tabelModel
    }
    create = async (ctx) => {

        const existsEmail = await Model.findOne('email', ctx.request.body.email, this.tabelModel);
        if (existsEmail) {
            ctx.throw(409, 'Email address already exists')
        }
        const existsPhone = await Model.findOne('phone', ctx.request.body.phone, this.tabelModel);

        if (existsPhone) {
            ctx.throw(409, 'This phone number already exists')
        }
        if (Role) {
            ctx.request.body.Role = Role
        }
        const admin = await Model.create(ctx.request.body, this.tabelModel);
        ctx.status = 201;
        ctx.body = admin
    }

    findAll = async (ctx) => {
        const admin = await Model.findAll(this.tabelModel);
        ctx.status = 200;
        ctx.body = admin
    }

    findById = async (ctx) => {
        const admin = await Model.findById(ctx.params.id, this.tabelModel);
        if (!admin) {
            ctx.throw(404, 'not found user')
        }
        ctx.status = 200;
        ctx.body = admin
    }

    update = async (ctx) => {
        const id = ctx.params.id
        const { email, phone } = ctx.request.body;

        const existsId = await Model.findOne('id', id, this.tabelModel)

        if (!existsId) {
            ctx.throw(404, 'not found user')
        }

        const existsEmail = await Model.findOne('email', email, this.tabelModel);
        if (existsEmail) {
            ctx.throw(409, 'Email address already exists')
        }

        const existsPhone = await Model.findOne('phone', phone, this.tabelModel);
        if (existsPhone) {
            ctx.throw(409, 'This phone number already exists')
        }
        const result = await Model.update(id, ctx.request.body, this.tabelModel)
        ctx.status = 200;
        ctx.body = result
    }

    delete = async (ctx) => {
        const id = ctx.params.id
        const admin = await Model.findById(id, this.tabelModel);
        if (!admin) {
            ctx.throw(404, 'not found user')
        }
        await Model.delete(id, this.tabelModel)
        ctx.status = 200;
        ctx.body = {}
    }
}