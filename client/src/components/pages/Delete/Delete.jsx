import React, { useState, useEffect } from "react";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { Global } from "../../../helpers/Global";
import Trash from "/src/assets/icons/trash.svg?react";
import Close from "/src/assets/icons/close.svg?react";
import Warning from "/src/assets/icons/warning.svg?react";
import "./delete.css";

/*
  Permite eliminar un artículo con confirmación a través de un modal
*/ 
export const Delete = ({ articleId, articles, setArticles, message }) => {

  const [showModal, setShowModal] = useState(false); // Estado para manejar la visibilidad del modal.

   // Efecto para añadir o quitar una clase al body según el estado del modal
  useEffect(() => {
    if (showModal) {
      // Añade una clase para desactivar las transiciones cuando el modal está abierto
      document.body.classList.add("modal-open");
    } else {
      // Quita la clase cuando el modal está cerrado
      document.body.classList.remove("modal-open");
    }
  }, [showModal]);

  // Función para manejar la eliminación del artículo
  const handleDelete = async () => {

    // Cierra el modal.
    setShowModal(false);

    // Realiza una solicitud DELETE a la API para eliminar el artículo
    const { data } = await ajaxRequest(Global.url + "articulo/" + articleId, "DELETE");
    
    if (data.status === "success") {
      // Filtra el artículo eliminado y actualiza el estado de la lista de artículos
      const updatedArticles = articles.filter(article => article._id !== articleId);
      setArticles(updatedArticles);
    }
  };

  return (
    <>
      {/* Botón que abre el modal para confirmar la eliminación */}
      <button
        className="btn btn-delete"
        onClick={(e) => {
          e.stopPropagation(); // Evita que el clic en el botón dispare eventos en elementos padres
          setShowModal(true); // Muestra el modal
        }}
      >
        {/* Ícono de papelera */}
        <Trash /> 
      </button>

      {/* Modal de confirmación de eliminación */}
      <div
        className={`modal-overlay ${showModal ? "show blur" : ""}`}
        onClick={(e) => e.stopPropagation()} // Evita que se cierre el modal al hacer clic fuera
      >
        {/* Contenido del modal */}
        <div className={`modal-content ${showModal ? "show" : ""}`}>
          
          {/* Ícono de cerrar */}
          <div className="modal-close" onClick={() => setShowModal(false)}>
            <Close />
          </div>

          {/* Ícono de advertencia */}
          <div className="icon">
            <Warning />
          </div>

          {/* Mensaje de confirmación */}
          <span>{message}</span>

          {/* Botones de acción dentro del modal */} 
          <div className="modal-buttons">
            <button className="btn btn-delete" onClick={handleDelete}>
              Confirmar
            </button>
            <button className="btn btn-update" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};