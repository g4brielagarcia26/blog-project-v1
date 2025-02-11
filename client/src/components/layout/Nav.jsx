import React from 'react';
import { NavLink } from 'react-router-dom';

// Componente para la barra de navegación
export const Nav = () => {
  return (
    <nav className="nav">
      {/* Enlaces para la página de inicio */}
      <ul>
        <li>
          <NavLink to="/home">inicio</NavLink>
        </li>
        <li>
          <NavLink to="/articles">artículos</NavLink>
        </li>
        <li>
          <NavLink to="/create-article">crear</NavLink>
        </li>
      </ul>
    </nav>
  )
};