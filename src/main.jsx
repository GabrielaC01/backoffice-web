import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Productos from './pages/Productos'
import Restaurantes from './pages/Restaurantes'
import Resumen from './pages/Resumen'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
    
        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <Productos />
            </ProtectedRoute>
          }
        />
        <Route
        path="/restaurantes"
        element={
          <ProtectedRoute>
            <Restaurantes />
          </ProtectedRoute>
        }
        />
        <Route
        path="/resumen"
        element={
          <ProtectedRoute>
            <Resumen />
          </ProtectedRoute>
        }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
