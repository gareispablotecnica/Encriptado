// ---> Sirve para encriptar las contraseñas de los usuarios
const Encriptar= require('bcrypt')
// ---> Numero de saltos para encriptar la contraseña
const Salto=10;

// ----> Funcion para encriptar la contraseña
const EncriptarPassword= async (password)=>{
    // ---> Generar el salto y encriptar la contraseña
    const Seguridad= await Encriptar.genSalt(Salto)
    return Encriptar.hash(password,Seguridad)
}
//  ----> Funcion para desencriptar la contraseña
const DesincriptarPassword= async (password,hash)=>{
    return Encriptar.compare(password,hash)
}

module.exports={EncriptarPassword,DesincriptarPassword}