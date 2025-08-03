/* ========== 📦 Import ========== */
import express from "express";
import log from "consola";
import path from "path";

import { envConfig, connectDB } from "./config/index.js";
import { errorHandler } from "./errors/index.js";
import { fileRouter } from "./routes/index.js";

// Ma'lumotlar bazasiga ulanish
await connectDB();

// Express ilovasini yaratish
const app = express();

// PORT
const PORT = envConfig.port;

/* ========== 🛡️ Middleware ========== */
app.use(express.json()); // JSON formatda yuborilgan ma'lumot uchun body parser
app.use(express.urlencoded({ extended: true })); // URL-encoded formatda yuborilgan ma'lumot uchun body parser

/* ========== 🧭 Routes ========== */
/**
 * @route POST /api/file
 * @description Fayl yuklash uchun
 */
app.use('/api/file/upload', fileRouter);
app.use('/uploads', express.static(path.join(process.cwd(), '/uploads')));
/* ========== ❌ Global error handler ========== */
app.use(errorHandler);

// Try/Catch'ning ushlanmay qolgani misol uchun setTimeout
process.on("uncaughtException", (exception) => {
  log.error(exception.message);
});

// Promise xato qaytarsayu lekin ushlanmasa
process.on("unhandledRejection", (rejection) => {
  log.error(rejection);
});

/* ========== Serverni ishga tushirish ========== */
app.listen(PORT, () => {
  log.box(`http://localhost:${PORT}`);
});
