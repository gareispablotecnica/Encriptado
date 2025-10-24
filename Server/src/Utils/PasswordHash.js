const Encriptado= require('bcrypt')
const Salto=10;

// ---> Encriptamos la Contraseña
const PasswordEncriptado=async(Password)=>{
    const Seguridad_Ferraro=await Encriptado.genSalt(Salto)
    return Encriptado.hash(Password,Seguridad_Ferraro)
}

const DesencriptarPassword=(Password,Parametro)=>{
    return Encriptado.compare(Password,Parametro)
}


module.exports={PasswordEncriptado,DesencriptarPassword}
