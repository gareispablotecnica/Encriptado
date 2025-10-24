const {NuevoUsuario,LoginUsuario} = require('../Controller/Login.Controller.js');
// --> Importar Express
const Express= require('express')
// --> Crear las Rutas
const Rutas= Express.Router()
// --> Definir las Rutas
Rutas.post('/RegistrarUsuario',NuevoUsuario)
Rutas.post('/Login',LoginUsuario)
// --> Exportar las Rutas
module.exports=Rutas;