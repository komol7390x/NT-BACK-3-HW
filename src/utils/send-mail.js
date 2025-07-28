import {createTransport} from 'nodemailer'
import { configServer } from '../config/server.config.js'

export const sendOTPToMail=(mail,otp)=>{
    const transporter=createTransport({
        port:configServer.MAIL.PORT,
        host:configServer.MAIL.HOST,
        auth:{
            user:configServer.MAIL.USER,
            pass:configServer.MAIL.PASS
        },
        secure:true
    });
    const mailOptions={
        from:configServer.MAIL.USER,
        to:mail,
        subject:'Online_market',
        text:`🔐 ${otp} — sizning OTP kodingiz 
        Muddat: 5 daqiqa.`
    };

    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    })
}