export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Bienvenido al Panel de Administración</h1>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
