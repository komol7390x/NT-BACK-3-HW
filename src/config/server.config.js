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
    TOKEN: {
        ACCESS_TOKEN_KEY: String(process.env.ACCESS_TOKEN_KEY),
        ACCESS_TOKEN_TIME: String(process.env.ACCESS_TOKEN_TIME),
        REFRESH_TOKEN_KEY: String(process.env.REFRESH_TOKEN_KEY),
        REFRESH_TOKEN_TIME: String(process.env.REFRESH_TOKEN_TIME)
    },
    MAIL: {
        HOST: process.env.MAIL_HOST,
        PORT: +process.env.MAIL_PORT,
        USER: process.env.MAIL_USER,
        PASS: process.env.MAIL_PASSWORD
    },
    REDIS: {
        HOST: process.env.REDIS_HOST,
        PORT: +process.env.REDIS_PORT,
        PASS: process.env.REDIS_PASSWORD,
    },
    CONFIRM_URL:process.env.CONFIRM_PASSWORD_URL,
}