
import { useState } from 'react';
import './Layouts.css'
// ---> Axios
import axios from 'axios'

function Layouts() {
  // ---> useState sirve para crear estados en los componentes funcionales
  const [User, setUser] = useState('')
  const [Password, setPassword] = useState('')
  const [Name, setName] = useState('')
  // ---> Estado para el mensaje de respuesta
  const [Mens, setMens] = useState('')

  // --> Funcion para Registrar Usuarios
  const RegistrarSubmit = async (e) => {
    // --> Evitar que se recargue la pagina
    e.preventDefault();
    setMens('')
    // ---> Peticion al servidor
    try {
      // ---> Enviar datos al servidor
      const ServidorBack = await axios.post('http://localhost:3000/api/Registrar', {
        User,
        Password,
        Name
      })
      // ---> Mensaje del servidor
      setMens(ServidorBack.data.Mensaje || 'Datos Registrados Correctamente')
      setName('')
      setPassword('')
      setUser('')
    }
    catch (Error) {
      console.log(Error)
      // ---> Mensaje de error
      setMens('Error al Registrar Datos' || Error.response.data.Mensaje)
    }
  }

  return (
    <>
      {/* ---> Formulario de Registro */}
      <form onSubmit={RegistrarSubmit}>

        <label htmlFor="">Usuario</label>
        {/* 
          value: Valor del input
          onChange: Evento que se dispara cuando el valor del input cambia
          setUser: Actualiza el estado User con el valor del input
          e.target.value: Valor actual del input
        */}
        <input type="text" name="User" id="User"
          value={User} onChange={e => setUser(e.target.value)} />

        <label htmlFor="">Password</label>
        <input type="password" name="Password" id="Password"
          value={Password} onChange={e => setPassword(e.target.value)} />

        <label htmlFor="">Nombre</label>
        <input type="text" name="Name" id="Name"
          value={Name} onChange={e => setName(e.target.value)} />
        {/* submit para registrar */}
        <input type="submit" value="Registrar" />

      </form>
      {/* ---> Mensaje de respuesta */}
      {Mens && <p style={{ color: 'green' }}>{Mens}</p>}
    </>
  )
}

export default Layouts;