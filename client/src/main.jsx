import "global"; 
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/layout.css";
import App from './App.jsx';

// Usamos "createRoot" para colocar nuestra aplicación en el elemento con id="root".
// De esta forma, le decimos a React dónde cargar todo el contenido de la app.
createRoot(document.getElementById("root")).render(
  <App />
)