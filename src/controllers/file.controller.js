import { asyncHandler } from "../lib/index.js";
import { File } from '../models/file.model.js'
import { envConfig } from '../config/env.config.js'
class FileController {
  fileUpload = asyncHandler(async (req, res) => {
    // console.log(req.files);

    const files = req.files.map(file => {
      const filePath = file.path.split('uploads')[1]
      return {
        original_name: file.originalname,
        store_name: file.filename,
        mime_type: file.mimetype,
        size: file.size,
        path: `http://localhost:${envConfig.port}/uploads${filePath}`,
      }
    })
    const result = await File.create(files)
    res.status(201).json({
      statusCode: 201,
      messahe: 'success',
      date: result
    })
  });
}

export const fileController = new FileController();

