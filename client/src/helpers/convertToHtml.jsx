import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline';

/**
 * Convierte un string JSON (TiptapEditor) a HTML.
 */
export const convertToHtml = (stringJSON) => {
    try {
        // Intentamos parsear el string como JSON de TipTap
        const json = JSON.parse(stringJSON);

        // Convertimos a HTML asegurándonos de incluir todas las extensiones necesarias
        return generateHTML(json, [StarterKit, Underline]);
    } catch (error) {
        // Si falla el parseo, asumimos que ya es HTML
        return stringJSON || '';
    }
};