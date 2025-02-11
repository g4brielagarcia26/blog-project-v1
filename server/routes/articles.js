import { Router } from "express"; // Utilizamos el framework Express.
import multer from "multer";
import { createArticles, getArticles, getOneArticle, deleteArticle, updateArticle, uploadImage, showImage, search } from "../controllers/articles.js";

// Inicialización del enrutador de Express
const router = Router();

// Configuración de Multer para almacenar en memoria (Firebase Storage no necesita disco local)
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage});

/**
 * @route POST /crear
 * @description Crea un nuevo artículo.
 */
router.post("/crear", createArticles);

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
router.post("/upload-image/:id", uploads.single('file'), uploadImage);

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

// Exportación del enrutador para su uso en la aplicación principal
export default router;