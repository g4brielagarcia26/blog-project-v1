import React from "react";
import { ThemeToggler } from "../ui/ThemeToggler/ThemeToggler";
import Logo from "/src/assets/icons/logo.svg?react";
import { useNavigate } from "react-router-dom";

// Muestra el encabezado del blog con el logo y un botón para cambiar el tema
export const Header = () => {

  // Hook para manejar la navegación programática
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* Sección del logo */}
      <div 
        className="logo"
        onClick={() => navigate(`/home`)} // Navega a la página de inicio al hacer clic en el logo
      >
        <Logo />
        {/* Título del blog */}
        <h1>Hello Blog</h1>
      </div>

      {/* Botón para alternar el tema */}
      <div className="theme-btn">
        <ThemeToggler />
      </div>
    </header>
  )
};