import { compare, hash, genSalt } from 'bcrypt'

class Crypt {
    // paroli hashlash uchun
    async encrypt(data) {
        const saltRounds = 10
        const salt = await genSalt(saltRounds)
        return await hash(data, salt)
    }
    // hashlngan paroli teng ekanligini tekshiramiza
    async decrypt(data, encryptData) {
        return compare(data, encryptData);
    }
}

export default new Crypt();