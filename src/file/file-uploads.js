import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import multer from 'multer'
import { v4 } from 'uuid'

const uploadDir = join(process.cwd(), 'uploads')
if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Fayl turini aniqlaymiz (image, video, audio...)
        const importFile = file.mimetype.split('/')[0]
        const path = join(uploadDir, importFile)
        //papka bor bolmasa create qiladi
        if (!existsSync(path)) {
            mkdirSync(path, { recursive: true })
        }
        cb(null, path)
    },

    filename: function (_req, file, cb) {
        //yangi nom qoshib qoyadi fayl yoniga
        const fileName = `${v4()}_${file.originalname}`;
        cb(null, fileName)
    }
})
const fileNames = ['image', 'video', 'application', 'text']

const uploadFile = multer({
    storage,
    //file filter qivomiza
    fileFilter: (_req, file, cb) => {
        //file type aniqlab oldik
        const files = file.mimetype.split('/')[0]
        //agar fileNames ichida bor bolsa create qiladi aks holda error qaytradi
        if (fileNames.includes(files)) {
            cb(null, true)
        } else {
            cb(new Error('Faqat rasm, video va hujjat yuklash mumkin!'), false)
        }
    },
    // fayl hajmini va limit berdik
    limits: { fileSize: 5 * 1024 * 1024, files: 5 }
})

// Middleware'lar
export const oneFile = uploadFile.array('files', 5)         // Har qanday fayl