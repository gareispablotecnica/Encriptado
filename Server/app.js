// --> Importar el framework Express
const Express = require('express');
// --> Crear una instancia de la aplicación Express
const App = Express();
// ---> Sirve para parsear el body de las peticiones como JSON
App.use(Express.json());
// --> Cargar variables de entorno desde el archivo .env
require('dotenv').config();
// --> Definir el puerto en el que correrá el servidor
const PORT = process.env.PORT || 5000;

const cors= require('cors');
App.use(cors());
App.use(Express.json());

// --> Importar las rutas de usuario
const UsuarioRutas=require('./Router/Usuarios.Router');
// ---> Usar las rutas de usuario con el prefijo /api
App.use('/api',UsuarioRutas);

// --> Iniciar el servidor y escuchar en el puerto definido
App.listen(PORT, () => {
    // --> Mensaje en consola indicando que el servidor está corriendo
    console.log(`🚀 http://localhost:${PORT}`);
});

