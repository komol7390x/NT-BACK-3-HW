import { config } from "dotenv";
config()

export const configServer = {
    PORT: process.env.PORT,
    mongodb_url: process.env.MONGODB_URL,
    ADMIN: {
        SUPERADMIN_USERNAME: process.env.SUPERADMIN_USERNAME,
        SUPERADMIN_EMAIL: process.env.SUPERADMIN_EMAIL,
        SUPERADMIN_PASSWORD: process.env.SUPERADMIN_PASSWORD
    }
}