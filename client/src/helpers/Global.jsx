/* 
  Definimos en una variable la url que usaremos siempre para hacer solicitudes a nuestra API.
*/ 

export const Global = {
  url: `${import.meta.env.VITE_BACKEND_URL}/api/` || "http:localhost:3900"
};