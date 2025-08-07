import { hash, compare, genSalt, hashSync, genSaltSync } from 'bcrypt'

class Crypt {
    encrypt = async (password) => {
        const salt = await genSalt(7)
        return await hash(password, salt)
    }
    decrypt = async (password, hashPassword) => {
        return compare(password, hashPassword)
    }
}

export default new Crypt();