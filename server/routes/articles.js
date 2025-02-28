import { Router } from "express"; // Utilizamos el framework Express.
import multer from "multer";
import { createArticles, getArticles, getOneArticle, deleteArticle, updateArticle, uploadImage, showImage, search } from "../controllers/articles.js";

// Inicialización del enrutador de Express
const router = Router();

// Configuración de Multer para almacenar en memoria (Firebase Storage no necesita disco local)
const storage = multer.memoryStorage();

// Función para filtrar archivos: solo acepta imágenes
const fileFilter = (req, file, cb) => {
  // Verifica que el mimetype empiece por 'image/'
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    // Si no es una imagen, rechaza el archivo
    console.error("Archivo rechazado:", file.mimetype);
    cb(new Error('Solo se permiten archivos de imagen'), false);
  }
};

// Configurar Multer con límite de 5MB y el filtro de archivos
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

/**
 * @route POST /crear
 * @description Crea un nuevo artículo.
 */
router.post("/nuevo-articulo", createArticles);

/**
 * @route GET /articulos/:ultimos?
 * @description Obtiene una lista de artículos. Incluye un parámetro opcional `ultimos` para filtrar.
 */
router.get("/articulos/:ultimos?", getArticles);

/**
 * @route GET /articulo/:id
 * @description Obtiene un artículo específico por su ID.
 */
router.get("/articulo/:id", getOneArticle);

/**
 * @route DELETE /articulo/:id
 * @description Elimina un artículo por su ID.
 */
router.delete("/articulo/:id", deleteArticle);

/**
 * @route POST /upload-image/:id
 * @description Sube una imagen asociada a un artículo.
 */
router.put("/articulo/:id", updateArticle);

/**
 * @route GET /image/:file
 * @description Devuelve una imagen específica almacenada en el servidor.
 */
router.post("/nueva-imagen/:id", upload.single('file'), uploadImage);

/**
 * @route GET /image/:file
 * @description Devuelve una imagen específica almacenada en el servidor.
 */
router.get("/image/:file", showImage);

/**
 * @route GET /search/:string
 * @description Busca artículos que coincidan con el término proporcionado.
 */
router.get("/search/:string", search);

// Middleware para manejo de errores (se coloca al final)
router.use((err, req, res, next) => {
  console.error("Middleware de error:", err.message);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  } else if (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
  next();
});

// Exportación del enrutador para su uso en la aplicación principal
export default router;