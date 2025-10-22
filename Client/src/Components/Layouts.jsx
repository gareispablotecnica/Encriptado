
import { useState } from 'react';
import './Layouts.css'
import axios from 'axios'

function Layouts() {

  const [User,setUser] = useState('')
  const [Password,setPassword] = useState('')
  const [Name,setName] = useState('')

  const[Mens,setMens]=useState('')

  const RegistrarSubmit=async(e)=>{
    e.preventDefault();
    setMens('')

    try{
        const ServidorBack= await axios.post('http://localhost:3000/api/Registrar',{
          User,
          Password,
          Name
        })
        setMens(ServidorBack.data.Mensaje || 'Datos Registrados Correctamente')
        setName('')
        setPassword('')
        setUser('')
    }
    catch(Error){

    }
  }

  return (
    <>
      <form onSubmit={RegistrarSubmit}>

        <label htmlFor="">Usuario</label>
        <input type="text" name="User" id="User" 
         value={User} onChange={e=> setUser(e.target.value)}/>

        <label htmlFor="">Password</label>
        <input type="password" name="Password" id="Password"
        value={Password} onChange={e=> setPassword(e.target.value)} />

        <label htmlFor="">Nombre</label>
        <input type="text" name="Name" id="Name" 
        value={Name} onChange={e=> setName(e.target.value)}/>

        <input type="submit" value="Registrar" />

      </form>

      {Mens && <p style={{color:'green'}}>{Mens}</p>}
    </>
  )
}

export default Layouts;