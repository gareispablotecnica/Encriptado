const {NuevoUsuario,LoginUsuario} = require('../Controller/Login.Controller.js');
const Express= require('express')
const Rutas= Express.Router()

Rutas.post('/RegistrarUsuario',NuevoUsuario)
Rutas.post('/Login',LoginUsuario)

module.exports=Rutas;