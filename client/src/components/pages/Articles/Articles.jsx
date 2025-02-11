import React, { useState, useEffect } from "react";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { ListArticles } from "../../shared/ListArticles/ListArticles";
import { InputSearch } from "../../shared/InputSearch/InputSearch";

/**
  Componente que muestra una lista de artículos y un buscador.
  Realiza una solicitud AJAX para obtener los artículos desde una API.
*/
export const Articles = () => {
  
  const [articles, setArticles] = useState([]); // Estado para almacenar la lista de artículos

  // Efecto que ejecuta la función getArticles al cargar el componente
  useEffect(() => {
    getArticles();
  }, []);

  // Realiza una solicitud AJAX para obtener artículos.
  const getArticles = async () => {
    // Llama a la API y obtiene los datos
    const { data } = await ajaxRequest(`${Global.url}articulos`, "GET");

    // Si la solicitud es exitosa, actualiza el estado con los artículos
    if (data?.status === "success") {
      setArticles(data.articles);
    }
  };

  return (
    <>
      {/* Componente de búsqueda */}
      <InputSearch />

      {/* Renderiza la lista de artículos si existen, de lo contrario muestra un mensaje */}
      {articles.length >= 1 ? (
        <ListArticles articles={articles} setArticles={setArticles} />
      ) : (
        <h2>No hay artículos para mostrar</h2>
      )}
    </>
  );
};