import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Global } from '../../../helpers/Global';
import { convertToHtml } from '../../../helpers/convertToHtml';
import { paginate } from '../../../helpers/calculatePages';
import { Delete } from "../../pages/Delete/Delete";
import defaultImage from "/src/assets/images/default-image.png";
import Edit from "/src/assets/icons/edit.svg?react";
import "./list-articles.css";

/*
  Componente para listar artículos con paginación
*/ 
export const ListArticles = ({ articles, setArticles }) => {

  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Estado para la página actual y configuración de elementos por página
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Solo mostraremos seis artículos por página

  // Obtenemos los datos de la paginación usando la función "paginate"
  const { totalPages, currentItems: currentArticles } = paginate(
    articles,
    currentPage,
    itemsPerPage
  );

  // Función para truncar el texto si es muy largo
  const truncateText = (text, length) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  // Navegación al artículo específico según su ID
  const handleNavigateToArticle = (id) => {
    navigate(`/article/${id}`);
  };

  // Cambio de página al hacer clic en un número de paginación
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {/* Renderizamos la lista de artículos paginados */}
      {currentArticles.map((article) => (
        <article
          key={article._id}
          className="articles-list"
          onClick={() => handleNavigateToArticle(article._id)} // Navegar al artículo al hacer clic
        >
          <div>
            {/* Mostrar imagen del artículo o una por defecto si no hay una personalizada */}
            {article.image !== "default.png" ? (
              <img src={`${Global.url}image/${article.image}`} alt={`${article.title}`} />
            ) : (
              <img src={defaultImage} alt="Default" />
            )}
          </div>

          <div className="articles-content">
            {/* Título del artículo */}
            <h3 className="title">{article.title}</h3>

            {/* Contenido truncado con formato HTML */}
            <div
              dangerouslySetInnerHTML={{
                __html: truncateText(convertToHtml(article.content), 290),
              }}
            ></div>

            <div className="articles-btn">
              {/* Botón para actualizar el artículo */}
              <button
                className="btn btn-update"
                onClick={(e) => {
                  e.stopPropagation(); // Evitamos que el clic también navegue al artículo
                  navigate(`/update/${article._id}`);
                }}
              >
                <Edit />
              </button>

              {/* Componente para eliminar el artículo */}
              <Delete
                articleId={article._id}
                articles={articles}
                setArticles={setArticles}
                message="¿Estás seguro de que deseas eliminar este artículo?"
              />
            </div>
          </div>
        </article>
      ))}

      {/* Sección de paginación */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)} // Cambiar de página al hacer clic
            className={page === currentPage ? "btn active" : "btn"} // Estilo para la página activa
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
};