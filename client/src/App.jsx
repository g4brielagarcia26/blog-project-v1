import { AppRoutes } from './routes/AppRoutes'; // Rutas de la app.

// La función "App" es nuestro componente principal.
// Se encarga de mostrar toda la estructura base de la aplicación.
function App() {
  return (
    // La clase "layout" es para definir los estilos del contenedor principal
    <div className="layout">
      <AppRoutes />
    </div>
  )
}

export default App