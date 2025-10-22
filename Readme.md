# ENCRIPTADO

Proyecto realizado con **Node.js**, **Express** y **SQLite3**.  
Implementa **encriptación de contraseñas** utilizando **bcrypt**, y una estructura modular para controladores, rutas y base de datos.

---

## 📚 Datos del Curso:
- Materia: Proyecto, Diseño e Implementación de Sistemas Computacionales
- Carrera: Técnicatura en Programación - Informática Personal y Profesional
- Institución: Técnica N°1
- Curso: 7mo- Grupo de Taller: 7.4 & 7.1
- Docente: Prof. Gareis Pablo


## 📂 ESTRUCTURA DEL PROYECTO
```
ENCRIPTADO/
├── Server/
│ ├── node_modules/
│ ├── src/
│ │ ├── Controller/
│ │ ├── DataBase/
│ │ │ ├── db.db
│ │ │ └── db.js
│ │ ├── Router/
│ │ └── Utils/
│ ├── .env
│ ├── .gitignore
│ ├── app.js
│ ├── package.json
│ └── package-lock.json
```

---

## ⚙️ TECNOLOGÍAS

- **Node.js**  
Se encarga de manejar las peticiones, respuestas y lógica del backend.

- **Express**  
Facilita la creación del servidor, las rutas (endpoints) y el manejo de middlewares.

- **SQLite3**  
Base de datos liviana que guarda la información en un archivo local (`db.db`).  


- **bcrypt**  
Librería para **encriptar contraseñas** antes de guardarlas en la base de datos.  


- **dotenv**  
Permite usar variables de entorno desde un archivo `.env`.  

---

## Instalar Dependencias
# BackEnd
```shell
    cd Server
    npm i
```
# Ejecutar el BackEnd
```shell
    npm run Server
```

# FrontEnd (Client)
```shell
    cd Client
    npm i
```
# Ejecutar el FrontEnd
```shell
    npm run dev
```