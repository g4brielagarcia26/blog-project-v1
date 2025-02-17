import React, { useState, useEffect } from "react";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { useParams } from "react-router-dom";
import { convertToHtml } from "../../../helpers/convertToHtml";
import "./article.css";
import defaultImage from "/src/assets/images/default-image.png";

// Componente para mostrar los detalles de un artículo
export const Article = () => {

  const [article, setArticle] = useState({}); // Estado para almacenar los datos del artículo actual

  // Hook para obtener los parámetros de la URL (como el ID del artículo)
  const params = useParams();

  // Efecto para cargar el artículo cuando se monta el componente
  useEffect(() => {
    getArticle();
  }, []);

  // Función para obtener los detalles del artículo desde la API
  const getArticle = async () => {

    // Realiza una solicitud GET usando el ID del artículo desde los parámetros
    const { data } = await ajaxRequest(`${Global.url}articulo/${params.id}`, "GET");

    // Si la respuesta es exitosa, guarda los datos del artículo en el estado
    if (data?.status === "success") {
      setArticle(data.article);
    }
  };

  return (
    <div className="article">
      {/* Imagen del artículo */}
      <div>
        {article.image !== "default.png"
          ? (<img src={`${Global.url}image/${article.image}`} alt={`${article.title}`} />)
          : (<img src={defaultImage} alt="Default" />)}
      </div>

      {/* Contenido del artículo */}
      <div className="article-content">
        <h1>{article.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: convertToHtml(article.content), // Convierte el contenido a HTML seguro
          }}
        ></div>
        {/* Autor del artículo */}
        <span>{article.writer ? article.writer : "Anonymous"}</span>

        {/* Fecha del artículo */}
        <span>
          {new Date(article.date).toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </div>
  );
};