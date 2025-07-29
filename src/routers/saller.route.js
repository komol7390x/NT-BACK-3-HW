import { Router } from "express";
import { Roles } from "../const/Role.js";
import { validate } from "../middlewares/validate.js";
import sallerValidate from "../validation/saller.validate.js";
import { uploadFile } from '../middlewares/upload-file.js'
import controller from '../controller/saller.controller.js'

const router = Router();

router
    .post('/', uploadFile.single('file'), validate(sallerValidate.create), controller.createSaller)
    .post('/sigin', validate(sallerValidate.create), controller.signIn)
    .post('/token', controller.newToken)

    .get('/', controller.getAll)
    .get('/:id', controller.getByID)

    .patch('/:id', validate(sallerValidate.update), controller.update)

    .delete('/:id', controller.delete)

export default router