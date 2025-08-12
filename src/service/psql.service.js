import { connectDB } from "../database/server.database.js";

class UserService {
    create = async (body, user) => {
        const keys = Object.keys(body);
        const values = Object.values(body);

        const items = keys.map((_, item) => `$${item + 1}`).join(', ')
        const query = ` INSERT INTO ${user} (${keys.join(', ')})
        VALUES (${items})
        RETURNING *`;

        const { rows } = await connectDB.query(query, values)
        return rows[0]
    };

    findAll = async (user) => {
        const { rows } = await connectDB.query(`SELECT * FROM ${user}`)
        return rows
    }

    findOne = async (key, value, user) => {
        const result = await connectDB.query(`SELECT * FROM ${user} WHERE ${key}=$1`, [value])
        return result.rows[0]
    }

    findById = async (id, user) => {
        const result = await connectDB.query(`SELECT * FROM ${user} WHERE id = $1`, [id]);

        return result.rows[0];
    }

    update = async (id, body, user) => {
        let query = `UPDATE ${user} SET `;
        const keys = Object.keys(body);
        const values = Object.values(body);
        for (let i = 0; i < keys.length; i++) {
            if (i == keys.length - 1) {
                query += `${keys[i]}=$${i + 1}`
            } else {
                query += `${keys[i]}=$${i + 1}, `
            }
        }
        query += ` WHERE id=${id} RETURNING *`;
        const { rows } = await connectDB.query(query, values);
        return rows[0]
    }

    delete = async (id, user) => {
        const result = await connectDB.query(`DELETE FROM ${user} WHERE id=$1`, [id])
        return result.rows[0]
    }
}
export default new UserService();