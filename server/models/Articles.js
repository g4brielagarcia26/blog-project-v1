import { Schema, model } from "mongoose";

// Definición del esquema para la colección de Artículos.
// Contiene la estructura de datos y las validaciones.
const ArticleSchema = new Schema(
  {
    /* Título del artículo (obligatorio). */
    title: {
      type: String,
      required: true
    },
    /* Contenido del artículo (obligatorio). */
    content: {
      type: String,
      required: true
    },
    /* Fecha de creación, se asigna automáticamente con la fecha actual. */
    date: {
      type: Date,
      default: Date.now
    },
    /* Autor del artículo */ 
    writer: {
      type: String,
      required: true
    },
    /* Imagen asociada al artículo, si no se provee se utiliza "default.png". */
    image: {
      type: String,
      default: "default.png"
    }
  }
);

// Creación y exportación del modelo 'Articles'.
/**
 *  El método `model` de Mongoose recibe tres parámetros:
 *  1. El **nombre del modelo** (String): "Articles".
 *  2. El **esquema** que define la estructura de los documentos: ArticleSchema.
 *  3. El **nombre exacto de la colección** en la base de datos: "articles".
 */
export default model("Articles", ArticleSchema, "articles");