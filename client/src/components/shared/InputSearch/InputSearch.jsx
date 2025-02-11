import React from 'react';
import { useNavigate } from "react-router-dom"; 
import "./input-search.css"; 
import Search from "/src/assets/icons/search.svg?react";

/*
  Componente de búsqueda que permite a los usuarios buscar artículos,
  redirige a una ruta dinámica basada en el término ingresado.
*/
export const InputSearch = () => {

  // Hook useNavigate para manejar la navegación entre rutas.
  const navigate = useNavigate();

  // Maneja el envío del formulario de búsqueda.
  const searchArticle = (e) => {
    // Evita que el formulario recargue la página al enviarse.
    e.preventDefault(); 
    
    // Obtiene el valor ingresado en el campo de búsqueda y elimina espacios en blanco extra.
    let searchField = e.target.search_field.value.trim();

    // Si el campo de búsqueda está vacío, no hacemos nada.
    if (searchField === "") {
      return;
    }

    // Redirige al usuario a una ruta basada en el término de búsqueda ingresado.
    // `replace: true` evita que esta acción quede en el historial de navegación.
    navigate(
      `/search-article/${encodeURIComponent(searchField)}`, 
      { replace: true }
    );
  };

  return (
    <div>
      <div className="search">
        {/* Formulario con un evento onSubmit que llama a la función searchArticle */}
        <form onSubmit={searchArticle}>
          {/* Botón con icono de búsqueda */}
          <button>
            <Search />
          </button>
          {/* Campo de entrada para que el usuario escriba su término de búsqueda */}
          <input 
            type="text" 
            name="search_field" 
            placeholder="¿Qué artículo estás buscando?" 
          />
        </form>
      </div>
    </div>
  );
};