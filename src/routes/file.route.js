import { Router } from "express";
import { fileController } from "../controllers/index.js";
import { limitFile, sizeLimit, oneFile } from '../file/file-uploads.js'
const router = Router();

router
    .post('/task1', oneFile, fileController.fileUpload)
    .post('/task2', sizeLimit, fileController.fileUpload)
    .post('/task3', limitFile, fileController.fileUpload)

export default router;
