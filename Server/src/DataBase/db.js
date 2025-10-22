// ---> importar el módulo sqlite3
const SQLite = require('sqlite3')
// ---> Path nos ayuda a resolver rutas
const path = require('path')
// --> __dirname nos da la ruta absoluta de la carpeta actual
const db_Ubicación = path.resolve(__dirname, './db.db')
// --> Crear o Abrir la Base de Datos
const db = new SQLite.Database(db_Ubicación, (Error) => {
    if (Error) {
        console.error('No se pudo crear la Base de Datos ⛔')
    }
    else {
        console.log('Se Creo correctamente la Base de Datos ✅')
        // ---> Crear la Tabla de Usuarios
        db.run(
            `
                CREATE TABLE IF NOT EXISTS Usuario(
                   Id INTEGER PRIMARY KEY AUTOINCREMENT,
                   User TEXT UNIQUE,
                   Password TEXT,
                   Name TEXT
                )`, (Error) => {
            // ---> Si hay un Error al crear la Tabla
            if (Error) {
                console.error('No se pudo crear la Tabla Usuarios ❗')
            }
            // ---> Si la Tabla se Creo Correctamente
            else {
                console.log('La Tabla Usuarios se Creo Correctamente ✅')
            }
        })
    }
})

// --> Exportar la Base de Datos
module.exports = db;