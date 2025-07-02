import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [editando, setEditando] = useState(false)
  const [productoId, setProductoId] = useState(null)

  const URL = "http://localhost:3001/productos"

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(URL)
      setProductos(res.data)
    } catch (err) {
      console.error("Error al obtener productos:", err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nuevoProducto = {
      nombre,
      precio: parseFloat(precio)
    }

    try {
      if (editando) {
        await axios.put(`${URL}/${productoId}`, nuevoProducto)
        setEditando(false)
        setProductoId(null)
      } else {
        await axios.post(URL, nuevoProducto)
      }

      setNombre("")
      setPrecio("")
      obtenerProductos()
    } catch (err) {
      console.error("Error al guardar el producto:", err)
    }
  }

  const editarProducto = (prod) => {
    setNombre(prod.nombre)
    setPrecio(prod.precio)
    setEditando(true)
    setProductoId(prod.id)
  }

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`)
      obtenerProductos()
    } catch (err) {
      console.error("Error al eliminar producto:", err)
    }
  }

  useEffect(() => {
    obtenerProductos()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Productos</h1>

        <form onSubmit={handleSubmit} className="mb-6 space-x-2">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2"
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="border p-2"
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            {editando ? "Actualizar" : "Agregar"}
          </button>
        </form>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Precio</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td className="border p-2">{prod.id}</td>
                <td className="border p-2">{prod.nombre}</td>
                <td className="border p-2">S/. {prod.precio}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => editarProducto(prod)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarProducto(prod.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
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
