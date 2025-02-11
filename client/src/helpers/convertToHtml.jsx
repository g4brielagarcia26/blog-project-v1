import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

/**
 * Convierte un string JSON (TiptapEditor) a HTML.
 * - Si es JSON válido, lo parsea y genera HTML.
 * - Si no es JSON, asume que ya es HTML.
 */
export const convertToHtml = (stringJSON) => {
    try {
      // Intentamos parsear el string como JSON de TipTap
      const string = JSON.parse(stringJSON)
  
      // Lo convertimos a HTML con generateHTML y nuestras extensiones
      return generateHTML(string, [StarterKit])
    } catch (error) {
      // Si falla el parse, asumimos que `stringOrJson` ya es HTML o texto plano
      return stringJSON || ''
    }
};