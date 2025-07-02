# 🍽️ Panel de Administración de Restaurantes

Aplicación web para la gestión de productos y restaurantes con autenticación, panel de resumen y diseño responsivo.

---

## 🚀 Funcionalidades implementadas

- ✅ Inicio de sesión con credenciales básicas.
- ✅ Menú de navegación dinámico.
- ✅ CRUD completo de productos y restaurantes (crear, listar, editar, eliminar).
- ✅ Visualización de productos por restaurante y categoría.
- ✅ Panel de resumen visual (dashboard con gráficos).
- ✅ Backend simulado con `json-server`.

---

## 🛠️ Tecnologías usadas

- ⚛️ React
- 🔄 React Router DOM
- 💅 TailwindCSS
- 📊 Chart.js
- 🗂️ json-server


---

## 📦 Instalación y ejecución

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/GabrielaC01/backoffice-web.git
   cd backoffice-web
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Inicia `json-server` con la base de datos local**:

   ```bash
   npx json-server --watch db.json --port 3001
   ```

4. **Inicia la aplicación frontend**:

   ```bash
   npm run dev
   ```

---

## 🧪 Usuario de prueba

- **Usuario:** `admin@admin.com`  
- **Contraseña:** `123456`

---

## 🗂️ Estructura de rutas

| Ruta            | Descripción                  |
|-----------------|------------------------------|
| `/login`        | Pantalla de inicio de sesión |
| `/dashboard`    | Panel resumen con gráficos   |
| `/productos`    | Gestión de productos         |
| `/restaurantes` | Gestión de restaurantes      |

---

## 📁 Estructura del proyecto

```
📦 backoffice-web
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
├── db.json
├── tailwind.config.js
└── README.md
```

---

## 🙋‍♀️ Autor

Desarrollado por **Gabriel Anthony Colque Unocc** 💻✨
