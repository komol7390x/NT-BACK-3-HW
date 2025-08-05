import pg from '../database/psql.database.js'
import { successRes } from '../utils/successRes.js'
import { AppError } from '../errors/AppError.js'

export class customersController {
    create = async (req, res, next) => {
        try {
            const { username, email, phone } = req.body
            const result = await pg.query('INSERT INTO customers (username,email,phone) VALUES ($1,$2,$3) RETURNING *;', [username, email, phone])
            return successRes(res, result.rows[0], 201)
        } catch (error) {
            next(error)
        }
    }

    getAll = async (req, res, next) => {
        try {
            const result = await pg.query('SELECT * FROM customers')
            return successRes(res, result.rows)
        } catch (error) {
            next(error)
        }
    }

    getById = async (req, res, next) => {
        try {
            const result = await pg.query('SELECT * FROM customers WHERE id=$1', [req.params.id])
            if (!result.rows[0]) {
                throw new AppError('Not found course', 404)
            }
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
                result = await pg.query(`UPDATE customers SET ${key} = $1 WHERE id = $2 RETURNING *;`, [value, req.params.id]);
            }
            return successRes(res, result.rows[0]);
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res, next) => {
        try {
            const result = await pg.query('DELETE FROM customers WHERE id = $1 RETURNING *; ', [req.params.id])
            if (result.rowCount == 0) {
                throw new AppError('Not found course', 404)
            }
            return successRes(res, {})
        } catch (error) {
            next(error)
        }
    }
}

export default new customersController();