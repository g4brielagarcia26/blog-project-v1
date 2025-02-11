import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { Home } from "../components/pages/Home/Home";
import { Article } from "../components/pages/Article/Article";
import { Articles } from "../components/pages/Articles/Articles";
import { Create } from "../components/pages/Create/Create";
import { Update } from "../components/pages/Update/Update";
import { Search } from "../components/pages/Search/Search";

// Componente que gestiona todas las rutas de la aplicación.
export const AppRoutes = () => {
  return (
    // BrowserRouter nos permite manejar la navegación usando la URL del navegador.
    <BrowserRouter>

      {/* Cabecera y menú de navegación, presentes en todas la aplicación */}
      <Header />
      <Nav />

      {/* Sección principal donde mostraremos el contenido dinámico */}
      <section id="content" className="content">
        <Routes>

          {/* Ruta principal y alias para "home" */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Otras secciones o páginas: Artículos, creación y búsqueda */}
          <Route path="/articles" element={<Articles />} />
          <Route path="/create-article" element={<Create />} />
          <Route path="/search-article/:search" element={<Search />} />

          {/* Detalles de un artículo y su edición */}
          <Route path="/article/:id" element={<Article />} />
          <Route path="/update/:id" element={<Update />} />

          {/* Si la ruta no coincide con ninguna anterior, mostramos el error 404 */}
          <Route path="*" element={
            <div className="search-false">
              <h2>Error 404</h2>
              <span>Página no encontrada</span>
            </div>
          }/>

        </Routes>
      </section>

      {/* Pie de página, presente en toda la aplicación */}  
      <Footer />

    </BrowserRouter>
  );
};