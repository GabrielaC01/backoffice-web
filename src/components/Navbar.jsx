import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="flex space-x-6 text-lg font-medium">
        <Link to="/resumen" className="hover:underline">Dashboard</Link>
        <Link to="/productos" className="hover:underline">Productos</Link>
        <Link to="/restaurantes" className="hover:underline">Restaurantes</Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm font-semibold"
      >
        Cerrar sesión
      </button>
    </nav>
  )
}
