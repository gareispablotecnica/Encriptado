import { useState } from "react"
import axios from 'axios'

function Login() {

  const [User, setUser] = useState('')
  const [Password, setPassword] = useState('')
  const [Mensaje, setMensaje] = useState('')

  const LoginSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')

    try {
      const servidor = await axios.post('http://localhost:3000/api/Login', {
        User,
        Password
      })
      setMensaje(servidor.data.mensaje || 'Login Exitoso ✔')
      setPassword('')
      setUser('')
    }
    catch (Error) {
      if (Error.response) {
        // Mensaje desde el servidor
        setMensaje(Error.response.data.mensaje || 'Usuario no Registrado❌');
      } else {
        setMensaje('No se pudo conectar con el servidor 🧱');
      }
      console.log('Error en:', Error)
    }
  }

  return (
    <>
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