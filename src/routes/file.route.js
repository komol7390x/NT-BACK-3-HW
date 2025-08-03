import { Router } from "express";
import { fileController } from "../controllers/index.js";
import { oneFile } from '../file/file-uploads.js'
const router = Router();

router
    .post('/task1', oneFile, fileController.fileUpload)
export default router;
