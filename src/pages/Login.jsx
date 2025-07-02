import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    if (email === "admin@admin.com" && password === "123456") {
      localStorage.setItem("token", "fake-jwt-token")
      navigate("/resumen")
    } else {
      alert("Credenciales incorrectas")
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleLogin} className="bg-white shadow p-6 rounded space-y-4 w-80">
        <h1 className="text-xl font-bold">Iniciar sesión</h1>
        <input
          className="border w-full p-2"
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border w-full p-2"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">
          Ingresar
        </button>
      </form>
    </div>
  )
}
