import { config } from "dotenv";
config()

export const configFile = {
    PORT: process.env.PORT,
    DATABASE: process.env.POSTGRES_DB
}