import { config } from "dotenv";
config();

export const envConfig = {
  port: +process.env.PORT || 7777,
  mongoUri: process.env.MONGO_URI,
  uploadFolder: process.env.UPLOAD_FOLDER,
};
