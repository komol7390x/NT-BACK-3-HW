import { Pool } from "pg";
import { configFile } from "../config/server.config.js";

export const connectDB = new Pool({
    connectionString: configFile.DATABASE
})

connectDB.on('error', (error) => {
    console.log('Error on connect Databasae', error);
})

