import pg from '../database/psql.database.js'
import { successRes } from '../utils/successRes.js'

export class CategoryController {
    create = async (req, res, next) => {
        try {
            const { name, description } = req.body
            const result = await pg.query('INSERT INTO category (name,description) VALUES ($1,$2) RETURNING *;', [name, description])
            return successRes(res, result.rows[0], 201)
        } catch (error) {
            next(error)
        }
    }

    getAll = async (req, res, next) => {
        try {
            const result = await pg.query('SELECT * FROM category')
            return successRes(res, result.rows)
        } catch (error) {
            next(error)
        }
    }

    getById = async (req, res, next) => {
        try {
            const result = await pg.query('SELECT * FROM category WHERE id=$1', [req.params.id])
            return successRes(res, result.rows[0])
        } catch (error) {
            next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const arr = Object.keys(req.body)
            let result;
            for (const key of arr) {
                const value = req.body[key];
                result = await pg.query(`UPDATE courses SET ${key} = $1 WHERE id = $2 RETURNING *;`,[value, req.params.id]);
            }
            return successRes(res, result.rows[0]);
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res, next) => {
        try {
            await pg.query('DELETE FROM category WHERE id = $1 RETURNING *; ', [req.params.id])
            return successRes(res, {})
        } catch (error) {
            next(error)
        }
    }
}

export default new CategoryController();