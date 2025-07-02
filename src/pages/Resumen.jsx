import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import { Bar, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function Resumen() {
  const [productos, setProductos] = useState([])
  const [restaurantes, setRestaurantes] = useState([])
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/productos").then((res) => {
      setProductos(res.data)
    })
    axios.get("http://localhost:3001/restaurantes").then((res) => {
      setRestaurantes(res.data)
    })
    axios.get("http://localhost:3001/categorias").then((res) => {
      setCategorias(res.data)
    })
  }, [])

  const productosPorRestaurante = restaurantes.map((rest) => {
    const cantidad = productos.filter((p) => p.id_restaurante === rest.id).length
    return { nombre: rest.nombre, cantidad }
  })

  const productosPorCategoria = () => {
    const conteo = {}
    productos.forEach((p) => {
      const categoria = categorias.find((c) => c.id === p.id_categoria)
      const nombreCategoria = categoria ? categoria.nombre : `Categoría ${p.id_categoria}`
      conteo[nombreCategoria] = (conteo[nombreCategoria] || 0) + 1
    })
    return conteo
  }

  const dataBarras = {
    labels: productosPorRestaurante.map((r) => r.nombre),
    datasets: [
      {
        label: "Productos por Restaurante",
        data: productosPorRestaurante.map((r) => r.cantidad),
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }
    ]
  }

  const categoriaData = productosPorCategoria()
  const dataDonut = {
    labels: Object.keys(categoriaData),
    datasets: [
      {
        label: "Productos por Categoría",
        data: Object.values(categoriaData),
        backgroundColor: [
          "#4ade80", "#60a5fa", "#f472b6", "#facc15", "#c084fc"
        ]
      }
    ]
  }

  const totalRestaurantes = restaurantes.length
  const totalProductos = productos.length
  const restaurantesActivos = restaurantes.filter((r) => r.activo).length
  const restaurantesInactivos = totalRestaurantes - restaurantesActivos

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      {/* Barra de navegación */}
      <Navbar />

      {/* Título */}
      <div className="flex items-center justify-center px-6 mt-4">
        <h1 className="text-3xl font-bold">Dashboard General</h1>
      </div>

      {/* Tarjetas resumen */}
      <div className="flex flex-row flex-wrap justify-center gap-6 px-8 py-4 w-full">
        <div className="min-w-[180px] bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-600">Total Productos</p>
          <p className="text-2xl font-bold text-blue-600">{totalProductos}</p>
        </div>
        <div className="min-w-[180px] bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-600">Total Restaurantes</p>
          <p className="text-2xl font-bold text-green-600">{totalRestaurantes}</p>
        </div>
        <div className="min-w-[180px] bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-600">Activos</p>
          <p className="text-2xl font-bold text-yellow-600">{restaurantesActivos}</p>
        </div>
        <div className="min-w-[180px] bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-600">Inactivos</p>
          <p className="text-2xl font-bold text-red-600">{restaurantesInactivos}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 pb-4">
        <div className="bg-white p-4 rounded shadow flex flex-col min-h-[300px]">
          <h2 className="text-lg font-semibold mb-2">Productos por Restaurante</h2>
          <div style={{ flex: 1 }}>
            <Bar
              data={dataBarras}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex flex-col min-h-[300px]">
          <h2 className="text-lg font-semibold mb-2">Productos por Categoría</h2>
          <div style={{ flex: 1 }}>
            <Doughnut
              data={dataDonut}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
