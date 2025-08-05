import { Pool } from "pg";
import config from '../config/env.config.js'

const pg = new Pool({
    // postgres://<username>:<password>@<host>/<database>
    connectionString: `${config.PSQL_URL}${config.PSQL_DATABASE}`
})

export default pg