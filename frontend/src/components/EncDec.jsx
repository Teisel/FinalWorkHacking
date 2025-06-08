import CryptoJS from "crypto-js";
//import bcryptjs from "bcryptjs";
//const bcrypt = require('bcryptjs');


export let cifrar = function (texto) {
    let textoCifrado = CryptoJS.AES.encrypt(texto, "Machu").toString();
    //const salt = bcrypt.genSaltSync(10);
    //const textoCifrado = bcrypt.hashSync(texto ,10);
    return textoCifrado;
}

export let decifrar = function (texto) {
    let bytes = CryptoJS.AES.decrypt(texto, "Machu");
    let textoDecifrado = bytes.toString(CryptoJS.enc.Utf8);
    //let textoSalida = JSON.parse(textoDecifrado);
    return textoDecifrado;
}
