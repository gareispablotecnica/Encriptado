
import './Layouts.css'
function Layouts() {
  
  return (
    <>
      <form >
        <label htmlFor="">Usuario:</label>
        <input type="text" name="User" id="User" required />

        <label htmlFor="">Contraseña:</label>
        <input type="password" name="Password" id="Password" />

        <label htmlFor="">Nombre:</label>
        <input type="text" name="Name" id="Name" />

        <input type="submit" value="Registrar Usuario" />
      </form>

    </>
  )
}

export default Layouts