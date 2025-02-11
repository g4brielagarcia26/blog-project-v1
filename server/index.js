import express, { json, urlencoded } from "express";
import connection  from "./database/connection.js";
import { CLIENT_URL, PORT } from "./config.js";
import cors from "cors"; 

// Instancia de la aplicación Express
const app = express();

// Conexión a la base de datos MongoDB
connection();

// Configurar el CORS.
// Permite peticiones desde otros orígenes al servidor.
app.use(cors({
  origin: CLIENT_URL, 
}));

console.log(CLIENT_URL);

// Middleware para parsear JSON y x-www-form-urlencoded
app.use(json());
app.use(urlencoded({ extended: true }));

// Importación de rutas
import rutas_articulo from "./routes/articles.js";

// Cargo las rutas
app.use("/api", rutas_articulo);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});