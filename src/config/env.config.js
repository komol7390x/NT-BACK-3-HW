import { config } from 'dotenv'
config()

export default {
    PORT: +process.env.PORT,
    PSQL_URL: process.env.PSQL_URL,
    PSQL_DATABASE: process.env.PSQL_DATABASE
}