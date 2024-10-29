import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import './auth.css'

export function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm(); // Cambiado `errorForm` a `errors`
  const [clientErrors, setClientErrors] = useState({}); // errores del cliente con el formulario

  const navigate = useNavigate()

  const { signUp, error } = useAuth()

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signUp(values)
      navigate("/loginAuth")
    } catch (error) {
      setClientErrors(error || "error en el servidor")
    }
  })

  return (
    <div className="formContet">
      <form className="register" onSubmit={onSubmit}>
        <h1>Registrate</h1>
        <div className="rInputs">
          <label htmlFor="username">Nombre</label>
          <input type="text" {...register("username", { required: true })} placeholder="Nombre"/>
          {
            errors.username && <p className="rError">Nombre de usuario requerido</p>
          }
          <label htmlFor="email" >Correo</label>
          <input type="email" {...register("email", { required: true })} placeholder="Correo"/>
          {
            errors.email && <p className="rError">Correo de usuario requerido</p>
          }
          <label htmlFor="password">Contraseña</label>
          <input type="password" {...register("password", { required: true })} placeholder="Contraseña"/>
          {
            errors.password && <p className="rError">Contraseña es requerido</p>
          }
        </div>

        {error && <p className="fError">{error}</p>}

        {Array.isArray(clientErrors) && clientErrors.map((err, index) => (
          <p className="fError" key={index}>{err}</p>
        ))}
        <button className="bSubmit">Registrarse</button>
      </form>
    </div>
  )
}
