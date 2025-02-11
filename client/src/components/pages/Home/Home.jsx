import React, { useEffect, useState } from "react";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { convertToHtml } from "../../../helpers/convertToHtml";
import { useNavigate } from "react-router-dom";
import "./home.css";
import defaultImage from "/src/assets/images/default-image.png";

// Componente principal de la página de inicio
export const Home = () => {

  const [articles, setArticles] = useState([]); // Estado para almacenar los artículos
  const [isMobile, setIsMobile] = useState(false); // Detecta si se usa un dispositivo móvil
  
  // Hook para la navegación entre rutas
  const navigate = useNavigate();

  // Efecto para detectar el tamaño de pantalla (móvil o escritorio)
  // Esto se usa en las miniaturas para mostrar más texto en escritorio y menos texto en móvil.
  useEffect(() => {
    // Detectar el tamaño al cargar la página
    const handleResize = () => {
      // Actualiza el estado según el tamaño de la ventana
      setIsMobile(window.innerWidth <= 768); // Móvil si el ancho es menor o igual a 768px
    };

    handleResize(); 

    // Detecta cambios en el tamaño de la ventana
    window.addEventListener("resize", handleResize); 

    // Limpia el evento al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
      getArticles();
  }, []);

   // Función para obtener los artículos desde la API
  const getArticles = async () => {
    const { data } = await ajaxRequest(`${Global.url}articulos/`, "GET");
    
    // Si la respuesta es exitosa, guarda los artículos en el estado
    if (data.status === "success") {
      setArticles(data.articles);
    }
  };

  // Función para truncar texto (limitar la longitud y añadir "...")
  const truncateText = (text, length) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  // Función para navegar a la página de un artículo específico
  const handleNavigateToArticle = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="blog-home">
      {/* Título principal de la página */}
      <h1>Los artículos más interesantes en un clic</h1>

      {/* Sección destacada de artículos */}
      <div className="blog-featured">
        {articles.slice(0, 3).map((article) => {
          // 1) Convertimos la cadena JSON de TipTap a HTML
          const htmlContent = convertToHtml(article.content);

          // 2) (Opcional) Truncamos si es muy largo
          //   Ten en cuenta que truncar HTML como texto bruto puede romper tags
          //   pero si solo quieres mostrar un fragmento, puede servir.
          const truncated = truncateText(htmlContent, isMobile ? 50 : 200);

          return (
            <div
              key={article._id}
              className="article-card"
              onClick={() => handleNavigateToArticle(article._id)}
            >
            <div>
              {/* Imagen del artículo (o una imagen por defecto si no tiene) */}
              {article.image !== "default.png" ? (
                <img src={`${Global.url}image/${article.image}`} alt={`${article.title}`} />
              ) : (
                <img src={defaultImage} alt="Default" />
              )}
            </div>
            <div className="article-data">
              {/* Título del artículo */}
              <h3 className="title">{article.title}</h3>
              {/* 3) Inyectamos el HTML en el DOM */}
              <div
                  dangerouslySetInnerHTML={{
                    __html: truncated,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};