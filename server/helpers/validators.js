/**
 * @file validator.js
 * @description Validador reutilizable para los datos recibidos en el modelo de Artículos.
 * Utiliza la librería `validator` para realizar validaciones de los datos.
 */

// Importación de la librería de validación
import validator from "validator";
const { isEmpty, isLength } = validator;

// Valida los datos de un artículo recibido.
const articleValidator = (params) => {

  // Validación de "title": no debe estar vacío y debe tener entre 5 y 60 caracteres
  let validateTitle = !isEmpty(params.title) &&
    isLength(params.title, { min: 5, max: 60 });

  // Validación de "content": no debe estar vacío.
  let validateContent = !isEmpty(params.content);

  // Si alguna validación falla, lanza un error.
  if (!validateTitle || !validateContent) {
    throw new Error("Faltan datos o los datos inválidos para el artículo.");
  }
}

// Exporta el validador para su uso en otros archivos
export default articleValidator;