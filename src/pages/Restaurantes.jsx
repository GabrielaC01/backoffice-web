import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

export default function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState([])
  const [nombre, setNombre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [editId, setEditId] = useState(null)

  const URL = "http://localhost:3001/restaurantes"

  const obtenerRestaurantes = async () => {
    const res = await axios.get(URL)
    setRestaurantes(res.data)
  }

  const crearOActualizarRestaurante = async (e) => {
    e.preventDefault()
    const nuevoRestaurante = {
      nombre,
      direccion
    }

    if (editId) {
      await axios.put(`${URL}/${editId}`, nuevoRestaurante)
      setEditId(null)
    } else {
      await axios.post(URL, nuevoRestaurante)
    }

    setNombre("")
    setDireccion("")
    obtenerRestaurantes()
  }

  const eliminarRestaurante = async (id) => {
    await axios.delete(`${URL}/${id}`)
    obtenerRestaurantes()
  }

  const seleccionarRestaurante = (rest) => {
    setNombre(rest.nombre)
    setDireccion(rest.direccion)
    setEditId(rest.id)
  }

  useEffect(() => {
    obtenerRestaurantes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Restaurantes</h1>

        <form onSubmit={crearOActualizarRestaurante} className="mb-6 space-x-2">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2"
            required
          />
          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="border p-2"
            required
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            {editId ? "Actualizar" : "Agregar"}
          </button>
        </form>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Dirección</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {restaurantes.map((rest) => (
              <tr key={rest.id}>
                <td className="border p-2">{rest.id}</td>
                <td className="border p-2">{rest.nombre}</td>
                <td className="border p-2">{rest.direccion}</td>
                <td className="border p-2">
                  <button
                    onClick={() => eliminarRestaurante(rest.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => seleccionarRestaurante(rest)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded ml-2"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
