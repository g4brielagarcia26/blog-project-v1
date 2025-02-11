import { config } from "dotenv"

config()

// Conexión hacia el front
export const CLIENT_URL = process.env.CLIENT_URL;

// Puerto para iniciar el servidor
export const PORT = process.env.PORT;

// Cadena de conexión para Mongo Atlas
export const MONGO_URI = process.env.MONGO_URI;

// Acceso al bucket de Firebase
export const STORAGE_BUCKET = process.env.STORAGE_BUCKET;

// Credenciales de Firebase (JSON)
export const FIREBASE_CREDENTIALS = process.env.FIREBASE_CREDENTIALS;

