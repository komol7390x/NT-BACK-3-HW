import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import multer from 'multer'
import { v4 } from 'uuid'

const uploadDir = join(process.cwd(), '../upload')

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

export const uploadFile = multer({ storage })