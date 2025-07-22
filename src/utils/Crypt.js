import { compare, hash, genSalt } from 'bcrypt'

class Crypt {
    async encrypt(data) {
        const saltRounds = 10
        const salt = await genSalt(saltRounds)
        return await hash(data, salt)
    }
    async decrypt(data, encryptData) {
        return compare(data, encryptData)
    }
}

export default new Crypt();