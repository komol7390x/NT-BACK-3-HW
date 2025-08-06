import DeviceDetector from "node-device-detector";
import CryptoJS from "crypto-js";
import { configServer } from '../config/server.config.js'

const deviceDetect = new DeviceDetector()

class DeviceInfo {
    encrypt = (userAgent) => {
        // Kelayotgan ma'lumot qaysi device kelyotgan aniqlab olamiza
        const device = deviceDetect.detect(userAgent);
        const info = {
            osName: device?.os?.name ?? "",
            clientType: device?.client?.type ?? "",
            clientName: device?.client?.name ?? "",
            deviceType: device?.device?.type ?? ""
        }
        //Kelayotgan malumotlarni string qilib olamiza
        const signature = `${info.osName}-${info.clientType}-${info.clientName}-${info.deviceType}-${Date.now()}`;
        // string ma'lumotlarni encrypt qilib qoymiza
        const deviceID = CryptoJS.AES.encrypt(signature, configServer.CRYPTO_SECRET_KEY);
        //info ichiga malumotlarni qoyib qoyish
        info.deviceID = deviceID;
        return info
    }
    // decrypto qilish kerak 
    decrypt = (deviceID) => {
        const decrypt = CryptoJS.AES.decrypt(deviceID, configServer.CRYPTO_SECRET_KEY);
        const data = decrypt.toString(CryptoJS.enc.Utf8);
        return data
    }
}

export default new DeviceInfo()