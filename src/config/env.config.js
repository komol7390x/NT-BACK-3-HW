import { config } from "dotenv";
config()

export const envConfig = {
    PORT:process.env.PORT,
    DB: {
        DATABASE: process.env.PG_DB,
        USERNAME:process.env.PG_USERNAME,
        HOST: process.env.PG_HOST,
        PORT: process.env.PG_PORT,
        PASS: process.env.PG_PASS,

        DIALECT: process.env.DIALECT
    }
}