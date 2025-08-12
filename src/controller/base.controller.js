import { table } from "../const/table-name.js";
import Model from "../service/psql.service.js";

export class BaseController {
    constructor(tabelModel) {
        this.tabelModel = tabelModel;
    }
    create = async (ctx, exists) => {
        if (exists) {
            await this.checkExist(ctx, exists)
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
        const admin = await this.checkId(ctx.params.id,ctx,table)
        ctx.status = 200;
        ctx.body = admin
    }

    update = async (ctx, exists) => {
        
        const id = ctx.params.id
        await this.checkId(id,ctx)
        
        if (exists) {
            await this.checkExist(ctx, exists)
        }
        const result = await Model.update(id, ctx.request.body, this.tabelModel)
        
        ctx.status = 200;
        ctx.body = result
    }

    delete = async (ctx) => {
        const id = ctx.params.id
        await this.checkId(id,ctx)
        await Model.delete(id, this.tabelModel)
        ctx.status = 200;
        ctx.body = {}
    }

    checkExist = async (ctx, exists) => {
        for (let [key, value] of Object.entries(exists)) {
            if (key && value) {
                const existKey = await Model.findOne(key, value, this.tabelModel);
                if (existKey) {
                    ctx.throw(409, `${key} already exist`)
                }
            }
        }
    }

    checkId = async (id,ctx) => {       
                        
        const existsId = await Model.findOne('id', id,this.tabelModel)                        
        if (!existsId) {
            ctx.throw(404, (check+' id is not found'))
        }
        return existsId
    }
}