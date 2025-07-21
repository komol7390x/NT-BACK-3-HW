import { compare, genSalt, hash } from 'bcrypt'

class Crypt {
    async encrypt(data) {
        const salt = await genSalt(7)
        const hashPass = await hash(data, salt)
        return hashPass
    }
    async decrypt(data, encryptData) {
        return compare(data, encryptData)
    }
}

export default new Crypt();