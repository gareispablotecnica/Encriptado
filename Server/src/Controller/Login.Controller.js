const db = require('../DataBase/db')

const { PasswordEncriptado,DesencriptarPassword } = require('../Utils/PasswordHash')

const NuevoUsuario = async (req, res) => {
    //---> Cuepro del json
    const { User, Password, Name } = req.body;

    if (!User || !Password || !Name) {
        console.error('El Usuario no completo los Datos ❗')
        return res.status(400).json({ Error: '❌ Campos Vacios xD' })
    }
    // ---> Verificamos si el Usuario Existe
    const query = `SELECT * FROM Usuario WHERE User=?`
    db.get(query, [User], (Error, row) => {
        if (Error) {
            console.error('Error en la Busqueda del Usuario')
            return res.status(500).json({ Error: 'Error: Consulta Server' })
        }
        if (row) {
            console.log('El Usuario ya se encuentra Registrado')
            return res.status(201).json({ Error: 'El Usuario ya se encuentra Registrado ✔' })
        }
    })

    const hash = await DesencriptarPassword(Password)
    const query2 = `INSERT INTO Usuario(User,Password,Name)VALUES(?,?,?)`
    db.run(query2, [User, hash, Name], (Error) => {
        if (Error) {
            console.error('No se pudo Registrar el Usuario', Error)
            return res.status(500).json({ Error: 'Error: Al registrar el usuario' })
        }
        else {
            console.log('Usuario Registrado ✅')
            return res.status(201).json({
                mensaje: 'Se registro Correctamente el Nuevo Usuario ✅',
                Id: this.lastID,
                User
            })
        }
    })

}


const LoginUsuario = (req, res) => {
    const { User, Password } = req.body;

    const query = 'SELECT * FROM Usuario WHERE User= ?'

    db.get(query, [User], async (Error, Tabla) => {
        if (Error) {
            console.error('Error en Consulta de SQL', Error)
            return res.status(500).json({ Error: 'Error de Server' })
        }

        if (!Tabla) {
            console.log('El Usuario no está Registrado')
            return res.status(404).json({ Error: 'El Usuario no se encuentra registrado en la Base de datos' })

        }

        const CompararPassword = await DesencriptarPassword(Password, Tabla.Password)

        if (!CompararPassword) {
            return res.status(401).json({ Error: 'Error al Ingresar la Contraseña' })
        }

        res.json({
            mensaje: 'Login Exitoso ✅',
            User: Tabla
        })

    })

}

module.exports = { NuevoUsuario, LoginUsuario }