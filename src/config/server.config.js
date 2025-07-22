import { config } from "dotenv";
config()

export const configServer = {
    PORT: process.env.PORT,
    mongodb_url: process.env.MONGODB_URL,
    ADMIN: {
        SUPERADMIN_USERNAME: process.env.SUPERADMIN_USERNAME,
        SUPERADMIN_EMAIL: process.env.SUPERADMIN_EMAIL,
        SUPERADMIN_PASSWORD: process.env.SUPERADMIN_PASSWORD
    },
    TOKEm: {
        ACCESS_TOKEN_KEY: String(process.env.ACCESS_TOKEN_KEY),
        ACCESS_TOKEN_TIME: String(process.env.ACCESS_TOKEN_TIME),
        REFRESH_TOKEN_KEY: String(process.env.REFRESH_TOKEN_KEY),
        REFRESH_TOKEN_TIME: String(process.env.REFRESH_TOKEN_TIME)
    }
}