// firebase-admin-config.js
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { STORAGE_BUCKET, FIREBASE_CREDENTIALS } from "./config.js"; 

// Necesario para obtener la ruta del directorio actual (en ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: STORAGE_BUCKET  // Reemplaza con tu bucket de Firebase Storage
});

// Obtenemos una referencia al bucket de Storage
const bucket = admin.storage().bucket();

export { admin, bucket };
