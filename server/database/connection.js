import { connect } from "mongoose";
import { MONGO_URI }  from "../config.js";

const clientOptions = { 
  serverApi: { 
    version: '1', 
    strict: true, 
    deprecationErrors: true 
  } 
};

// Función asíncrona que establece la conexión con la BBDD mediante Mongoose.
// Retorna una promesa que se resuelve una vez que la conexión se ha establecido exitosamente. 
const connection = async() => {
  try {
    // Establece la conexión con la base de datos
    await connect(MONGO_URI, clientOptions);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

// Exportación de la función de conexión
export default connection;