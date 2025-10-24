import { useState } from "react"
import axios from 'axios'

function Login() {
  // --> useState para crear estados
  const [User, setUser] = useState('')
  const [Password, setPassword] = useState('')
  const [Mensaje, setMensaje] = useState('')
  // --> Funcion para el Login
  const LoginSubmit = async (e) => {
    // ---> Evitar que se recargue la pagina
    e.preventDefault()
    setMensaje('')

    try {
      // --> Peticion al servidor
      const servidor = await axios.post('http://localhost:3000/api/Login', {
        User,
        Password
      })
      // --> Mensaje del servidor
      setMensaje(servidor.data.mensaje || 'Login Exitoso ✔')
      setPassword('')
      setUser('')
    }
    // --> Capturar errores
    catch (Error) {
      if (Error.response) {
        // Mensaje desde el servidor
        setMensaje(Error.response.data.mensaje || 'Usuario no Registrado❌');
      } 
      else {
        // Error de conexion
        setMensaje('No se pudo conectar con el servidor 🧱');
      }
      console.log('Error en:', Error)
    }
  }

  return (
    <>
    {/* ---> Formulario de Login */}
      <form onSubmit={LoginSubmit} >

        <label htmlFor="">Usuario:</label>
        <input type="text" name="User" id="User" required
          value={User} onChange={e => setUser(e.target.value)} />

        <label htmlFor="">Password:</label>
        <input type="Password" name="Password" id="Password" required
          value={Password} onChange={e => setPassword(e.target.value)} />

        <input type="submit" value="Login" />

      </form>
      {Mensaje && <h2>{Mensaje}</h2>}
    </>
  )
}

export default Login