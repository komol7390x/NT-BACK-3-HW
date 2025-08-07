import {hash,compare,genSalt} from 'bcrypt'

class Crypt{
    encrypt=async (password)=>{
        const salt=await genSalt(7)
        return hash(password,salt)
    }
    decrypt=(password,hashPassword)=>{
        return compare(password,hashPassword)
    }
}

export default new Crypt();