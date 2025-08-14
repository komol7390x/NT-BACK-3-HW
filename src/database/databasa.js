import { Sequelize } from "sequelize";
import { envConfig } from "../config/env.config.js";

const sequelize = new Sequelize(
    String(envConfig.DB.DATABASE),
    String(envConfig.DB.USERNAME),
    String(envConfig.DB.PASS),
    {
        host: envConfig.DB.HOST,
        port: envConfig.DB.PORT,
        dialect: envConfig.DB.DIALECT,
        logging:false
    }

)

export default sequelize;
