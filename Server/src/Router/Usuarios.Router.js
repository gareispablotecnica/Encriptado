const Express=require('express');
const Rutas= Express.Router();
const {RegistrarUsuario}=require('../Controller/Usuario.Controller');

// ---> Ruta para Registrar un Usuario
Rutas.post('/Registrar',RegistrarUsuario);

module.exports=Rutas;