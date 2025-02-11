import React, { useState, useEffect } from "react";
import LightMode from "/src/assets/icons/light-mode.svg?react";
import DarkMode from "/src/assets/icons/dark-mode.svg?react";
import "./theme-toggler.css";

/* 
  Este componente se encarga de cambiar entre tema claro y oscuro
  y de recordar la elección del usuario usando localStorage.
*/  
export const ThemeToggler = () => {

  // Definimos el estado "theme". 
  // Revisamos si hay un tema guardado en localStorage, si no, usamos "dark-theme".
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark-theme";
  });

  // Cada vez que "theme" cambie, actualizamos la clase del body 
  // para aplicar el tema y lo guardamos en localStorage.
  useEffect(() => {
    // Primero quitamos cualquier tema anterior para evitar conflictos
    document.body.classList.remove("light-theme", "dark-theme");
    // Luego añadimos la clase correspondiente al tema actual
    document.body.classList.add(theme);

    // Guardamos la preferencia en localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Esta función alterna entre los dos temas disponibles.
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === 'light-theme' ? 'dark-theme' : 'light-theme'
    );
  };

  return (
    // Al hacer clic, cambiamos el tema
    <div onClick={toggleTheme}>
      {/* Dependiendo del tema actual, mostramos el ícono de sol o de luna */}
      {theme === 'light-theme' ? <LightMode /> : <DarkMode />}
    </div>
  );
};