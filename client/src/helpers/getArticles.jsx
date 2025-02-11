import { ajaxRequest } from "./ajaxRequest";

/**
 * Helper para realizar solicitudes GET genéricas para obtener artículos.
 * @param {string} url - La URL de la solicitud.
 * @returns {Promise<Array>} - Una promesa que resuelve con los artículos obtenidos o un array vacío si no hay resultados.
 */
export const getArticles = async (url) => {
  try {
    const { data } = await ajaxRequest(url, "GET");
    if (data?.status === "success") {
      return data.articles;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  } 
};