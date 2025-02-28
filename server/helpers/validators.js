// Importación de la librería de validación
import validator from "validator";
const { isEmpty, isLength } = validator;

function isTiptapJsonEmpty(jsonStr) {
  try {
    const obj = JSON.parse(jsonStr);
    // Comprobamos si es un solo párrafo vacío
    if (
      obj.type === "doc" &&
      Array.isArray(obj.content) &&
      obj.content.length === 1
    ) {
      const singleNode = obj.content[0];
      // Sin la propiedad 'content' o 'text' => es un párrafo vacío
      if (singleNode.type === "paragraph" && !singleNode.content) {
        return true;
      }
    }
  } catch (error) {
    // Si no es JSON válido, lo tratas como quieras (podrías permitirlo o tratarlo como vacío).
  }
  return false;
}

// Valida los datos de un artículo recibido.
const articleValidator = (params) => {

  // Validación de "title": no debe estar vacío y debe tener entre 5 y 60 caracteres
  let validateTitle = !isEmpty(params.title) &&
    isLength(params.title, { min: 5, max: 60 });

  // Validación de "content": no debe estar vacío.
  let validateContent = !isTiptapJsonEmpty(params.content);

  // Validación de "content": no debe estar vacío.
  let validateWriter = !isEmpty(params.writer) &&
    isLength(params.writer, { min: 5, max: 25 });

  // Si alguna validación falla, lanza un error.
  if (!validateTitle || !validateContent || !validateWriter) {
    throw new Error("Faltan datos o los datos inválidos para el artículo.");
  }
}

// Exporta el validador para su uso en otros archivos
export default articleValidator;