import controller from '../controller/admin.controller.js'
import { Router } from 'express'
import { RolesGuard } from '../guards/role.guard.js'
import { AuthGuard } from '../guards/auth.guard.js'
import Adminvalidate from '../validation/admin.validate.js'
import { validate } from '../middlewares/validate.js'
import { requestLimiter } from '../utils/request-limt.js'
import { Roles } from '../const/Role.js'
import { configServer } from '../config/server.config.js'
const router = Router()

router
    // ==================== POST ====================
    //admin creat qilish
    .post('/',
        //Authorathion tekshirish (Token rekshirish)
        AuthGuard,
        //Tokenn bergan Role boyicha tasdiqlash
        RolesGuard(Roles.SUPERADMIN),
        //kelyotgan data validatsiya qilish (tekshsirish)
        validate(Adminvalidate.create),
        //conntroller orqali admin create qilish
        controller.createAdmin)
    //Tizimi=ga kirish
    .post('/signin',
        //Limiter orqali urinishlarni sononi hisoblash
        requestLimiter(60, 5),
        validate(Adminvalidate.signIn),
        controller.signInAdmin)
    //Yangi Token olish
    .post('/newtoken',
        controller.newToken)
    //Tizimdan chiqish
    .post('/logout',
        AuthGuard,
        controller.signOut)
    // ==================== POST ====================
    //Barcha userlarni olish
    .get('/',
        AuthGuard,
        RolesGuard(Roles.SUPERADMIN),
        controller.getAll)
    // user larni id orqali olish
    .get('/:id',
        AuthGuard,
        RolesGuard(Roles.SUPERADMIN, 'ID'),
        controller.getByID
    )
    // ==================== UPDATE ====================
    //Admin parolini update qilish eskini bilgan holda
    .patch('/password/:id',
        AuthGuard,
        RolesGuard(Roles.SUPERADMIN, 'ID'),
        validate(Adminvalidate.password),
        controller.updatePasswordForAdmin)
    //paroli update qilish unitib qoygan bo'lsa
    .patch('/forget-password',
        validate(Adminvalidate.forgetPassword),
        controller.forgetPassword)
    //Emailga OTP yuborish
    .patch('/send-email-otp',
        validate(Adminvalidate.congirmOTP),
        controller.confirmOTP)
    //OTP dan kelgan paroli tasdiqlash
    .patch(`/${configServer.CONFIRM_URL}`,
        validate(Adminvalidate.confirmPassword),
        controller.confirmPassword)
    //Admin update qilishID orqali
    .patch('/:id',
        AuthGuard,
        RolesGuard(Roles.SUPERADMIN, 'ID'),
        validate(Adminvalidate.update),
        controller.updateAdmin
    )
    // ==================== DELETE ====================
    .delete('/:id',
        AuthGuard,
        RolesGuard(Roles.SUPERADMIN),
        controller.delete
    )

export default router