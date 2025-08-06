import { generate } from "otp-generator";
// 6 xanali soni olamiza
export const generateOTP=()=>{
    return generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    })
}