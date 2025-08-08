import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import multer from 'multer'
import { v4 } from 'uuid'
import {AppError} from '../error/AppError.js'

const uploadDir = join(process.cwd(), '/uploads')

if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, uploadDir)
    },
    filename: function (_req, file, cb) {
        const fileName = `${v4()}_${file.originalname}`;
        cb(null, fileName)
    }
})

function fileFilter(_req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new AppError('Faqat rasm fayllarini yuklash mumkin!', 400), false)
    }
}

export const uploadFiles = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5 
    }
})
