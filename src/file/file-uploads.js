import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import multer from 'multer'
import { v4 } from 'uuid'

const uploadDir = join(process.cwd(), 'uploads') // '/' olib tashladim

if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Fayl turini aniqlaymiz (image, video, audio...)
        const importFile = file.mimetype.split('/')[0]
        const path = join(uploadDir, importFile)

        if (!existsSync(path)) {
            mkdirSync(path, { recursive: true })
        }

        cb(null, path)
    },

    filename: function (_req, file, cb) {
        const fileName = `${v4()}_${file.originalname}`;
        cb(null, fileName)
    }
})

const uploadFile = multer({ storage })
// Fayl hajmini 5 MB bilan chekladik
const mbSize = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })
// Fayl sonini 5 taga bilan chekladik
const limitSize = multer({ storage, limits: { files: 5 } })

// Middleware'lar
export const oneFile = uploadFile.any()         // Har qanday fayl
export const sizeLimit = mbSize.any()           // 5mb limit
export const limitFile = limitSize.any()        // Max 5ta video