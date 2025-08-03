import mongoose from "mongoose";
import log from "consola";

import { envConfig } from "./env.config.js";

/**
 * Mongodb ma'lumotlar bazasiga ulanish uchun funksiya
 */
export async function connectDB() {
  try {
    await mongoose.connect(envConfig.mongoUri);
    log.success("Ma'lumotlar bazasiga muvaffaqiyatli ulandi");
  } catch (error) {
    log.error(error.message);
    process.exit(1);
  }
}
