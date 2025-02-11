import React, { useState, useEffect } from "react";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { ListArticles } from "../../shared/ListArticles/ListArticles";
import { useParams } from "react-router-dom";
import { InputSearch } from "../../shared/InputSearch/InputSearch";
import SadFace from "/src/assets/icons/sad-face.svg?react";

// Componente para buscar y mostrar artículos según criterios de búsqueda.
export const Search = () => {

  // Estado para almacenar los artículos encontrados
  const [articles, setArticles] = useState([]);

  // Hook para acceder a los parámetros de la URL (por ejemplo, el término de búsqueda)
  const params = useParams();

  // useEffect que se ejecuta cada vez que cambian los parámetros de la URL
  useEffect(() => {
    getArticlesBySearch(); 
  }, [params]); 

  // Función para obtener artículos que coincidan con el término de búsqueda
  const getArticlesBySearch = async () => {
    // Realiza una solicitud AJAX a la API con el término de búsqueda
    const { data } = await ajaxRequest(`${Global.url}search/${params.search}`, "GET");

    // Si la respuesta es exitosa, guarda los artículos en el estado
    if (data?.status === "success") {
      setArticles(data.articles);
    } else {
      setArticles([]); // Si no hay resultados, asegura que el estado esté vacío
    }
  };

  return (
    <>
      {/* Componente para la barra de búsqueda */}
      <InputSearch />

      {/* Verifica si hay artículos para mostrar */}
      {articles.length >= 1 ? (
        // Si hay artículos, muestra el componente ListArticles con la lista
        <ListArticles articles={articles} setArticles={setArticles} />
      ) : (
        // Si no hay artículos, muestra un mensaje de error
        <div className="search-false">
          {/* Ícono de carita triste */}
          <SadFace />
          {/* Mensaje informando que no se encontraron artículos */}
          <span>¡Ooops, no hay artículos para <strong>{params.search}</strong>!</span>
          <span>Por favor, vuelve a intentarlo.</span>
        </div>
      )}
    </>
  );
};