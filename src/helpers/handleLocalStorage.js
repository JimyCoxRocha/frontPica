import { encrypt, decrypt } from '../auth/Encrypt.js';

export const saveLocalStorage = function(key='', value=''){
    try{
        localStorage.setItem(key, encrypt(value));
    }catch(error){
        console.error(error);
    }

}

export const findLocalStorage = function(key=''){
    try{
        var elemento = localStorage.getItem(key);
        return decrypt(elemento);
    }catch(error){
        console.error(error);
        return '';
    }
}

export const clearLocalStorage = function(){
    try{
        localStorage.clear();
    }catch(error){
        console.error(error);
        return '';
    }
}