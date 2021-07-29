const SECRET_PRHASE = "oioprtiweprtert341234{+{}dsafasdf";
import CryptoJS from 'crypto-js'

export const encrypt = function(data){
    try{
        const encryptedText = CryptoJS.AES.encrypt(data, SECRET_PRHASE).toString();
        return encryptedText;
    }catch(err){
        console.error(err);
    }
}

export const decrypt = function(encryptedString){
    try{
        const decryptedText = CryptoJS.AES.decrypt(encryptedString, SECRET_PRHASE).toString(CryptoJS.enc.Utf8);
        return decryptedText;
    }catch(err){
        console.error(err);
    }
}