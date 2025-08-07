import { config } from "dotenv";
config()

export default {
    PORT: +process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,

    SUPERADMIN: {
        USERNAME: process.env.SUPERADMIN_USERNAME,
        EMAIL: process.env.SUPERADMIN_EMAIL,
        PASSWORD: process.env.SUPERADMIN_PASSWORD,
    },

    TOKEN: {
        ACCESS_KEY: process.env.ACCESS_TOKEN_KEY,
        ACCESS_TIME: process.env.ACCESS_TOKEN_KEY,
        REFRESH_KEY: process.env.ACCESS_TOKEN_KEY,
        REFRESH_TIME: process.env.ACCESS_TOKEN_KEY
    },

    REDIS: {
        HOST: process.env.REDIS_HOST,
        PORT: process.env.REDIS_PORT,
        PASSWORD: process.env.REDIS_PASSWORD,
    },
    GMAIL: {
        USER: process.env.GMAIL_USER,
        PASSWORD:process.env.GMAIL_PASSWORD

    },

    CONFIRM_PASSWORD_URL: process.env.CONFIRM_PASSWORD_URL,
    CRYPTO_SECRET_KEY:process.env.CRYPTO_SECRET_KEY
}