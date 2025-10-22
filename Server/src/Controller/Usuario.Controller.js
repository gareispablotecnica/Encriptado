const db = require('../DataBase/db');
const { EncriptarPassword } = require('../Utils/HashPassword');

//  --> Funcion para Registrar un Usuario
const RegistrarUsuario = async (req, res) => {
    // ---> Obtener los datos del cuerpo de la solicitud
    const { User, Password, Name } = req.body;
    console.log('📦 Cuerpo recibido:', req.body);
    // ---> Validar que los datos obligatorios esten presentes
    if (!User || !Password || !Name) {
        return res.status(400).json({ Mensaje: 'Faltan Datos Obligatorios ❗' })
    }
    // ---> Verificar si el usuario ya existe
    query = `SELECT * FROM Usuario WHERE User=?`;
    db.get(query, [User], async (Error, Fila) => {
        // ---> Si hay un Error al Buscar el Usuario
        if (Error) {
            return res.status(500).json({ Mensaje: 'Error al Buscar el Usuario ❗' })
        }
        // ---> Si el Usuario ya Existe
        if (Fila) {
            return res.status(400).json({ Mensaje: 'El Usuario ya Existe ❗' })
        }
    });
    // ---> Encriptar la Contraseña
    const hash = await EncriptarPassword(Password);
    // ---> Insertar el Nuevo Usuario en la Base de Datos
    query = `INSERT INTO Usuario (User,Password,Name) VALUES (?,?,?)`;
    // ---> Ejecutar la consulta de inserción
    db.run(query, [User, hash, Name], (Error) => {
        // ---> Si hay un Error al Registrar el Usuario
        if (Error) {
            return res.status(500).json({ Mensaje: 'Error al Registrar el Usuario ❗' })
        }
        // ---> Si el Usuario se Registro Correctamente
        return res.status(201).json({
            Mensaje: 'Usuario Registrado Correctamente ✔'
        });
    });

}

module.exports = { RegistrarUsuario };