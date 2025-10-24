// ---> Sirve para invocar la Base de Datos
const db = require('../DataBase/db')
// ---> Sirve para encriptar y desencriptar las contraseñas
const { EncriptarPassword, DesincriptarPassword } = require('../Utils/PasswordHash')

const NuevoUsuario = async (req, res) => {
    //  ---> Obtenemos los Datos del Usuario
    const { User, Password, Name } = req.body;
    // ---> Verificamos que los Campos no esten Vacios
    if (!User || !Password || !Name) {
        // ---> En caso de que esten vacios mandamos un error
        console.error('El Usuario no completo los Datos ❗')
        return res.status(400).json({ Error: '❌ Campos Vacios xD' })
    }
    // ---> Verificamos si el Usuario Existe
    const query = `SELECT * FROM Usuario WHERE User=?`
    // ---> Ejecutamos la Consulta
    db.get(query, [User], (Error, row) => {
        if (Error) {
            // --> En caso de error mandamos un mensaje
            console.error('Error en la Busqueda del Usuario')
            return res.status(500).json({ Error: 'Error: Consulta Server' })
        }
        if (row) {
            // --> En caso de que el usuario ya exista mandamos un mensaje
            console.log('El Usuario ya se encuentra Registrado')
            return res.status(201).json({ Error: 'El Usuario ya se encuentra Registrado ✔' })
        }
    })
    // ---> Encriptamos la Contraseña
    const hash = await EncriptarPassword(Password)
    // ---> Insertamos el Nuevo Usuario en la Base de Datos
    const query2 = `INSERT INTO Usuario(User,Password,Name)VALUES(?,?,?)`
    // ---> Ejecutamos la Consulta
    db.run(query2, [User, hash, Name], (Error) => {
        if (Error) {
            // --> En caso de error mandamos un mensaje
            console.error('No se pudo Registrar el Usuario', Error)
            return res.status(500).json({ Error: 'Error: Al registrar el usuario' })
        }
        else {
            // --> En caso de exito mandamos un mensaje
            console.log('Usuario Registrado ✅')
            return res.status(201).json({
                // --> Mandamos el ID del Nuevo Usuario
                mensaje: 'Se registro Correctamente el Nuevo Usuario ✅',
                Id: this.lastID,
                User
            })
        }
    })

}


const LoginUsuario = (req, res) => {
    // --> Obtenemos los Datos del Usuario
    const { User, Password } = req.body;
    // --> Verificamos que los Campos no esten Vacios
    if (!User || !Password) {
        console.error('El Usuario no completo los Datos ❗')
        return res.status(400).json({ Error: '❌ Campos Vacios xD' })
    }
    // --> Verificamos si el Usuario Existe
    const query = 'SELECT * FROM Usuario WHERE User= ?'
    // --> Ejecutamos la Consulta
    db.get(query, [User], async (Error, Tabla) => {
        if (Error) {
            // ---> En caso de error mandamos un mensaje
            console.error('Error en Consulta de SQL', Error)
            return res.status(500).json({ Error: 'Error de Server' })
        }

        if (!Tabla) {
            // ---> En caso de que el usuario no exista mandamos un mensaje
            console.log('El Usuario no está Registrado')
            return res.status(404).json({ Error: 'El Usuario no se encuentra registrado en la Base de datos' })

        }
        // ---> Comparar la Contraseña
        const CompararPassword = await DesincriptarPassword(Password, Tabla.Password)

        if (!CompararPassword) {
            // --> En caso de que la Contraseña sea Incorrecta mandamos un mensaje.
            console.log('Error al Ingresar la Contraseña ❌')
            return res.status(401).json({ Error: 'Error al Ingresar la Contraseña' })
        }
        // ---> En caso de exito mandamos un mensaje
        res.json({
            mensaje: 'Login Exitoso ✅',
            User: Tabla
        })

    })

}
// --> Exportamos las Funciones
module.exports = { NuevoUsuario, LoginUsuario }