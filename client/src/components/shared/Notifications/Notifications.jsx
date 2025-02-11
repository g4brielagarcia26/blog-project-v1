import React, { useEffect } from "react";
import "./notifications.css";
import CancelCircle from "/src/assets/icons/cancel-circle.svg?react";
import CheckCircle from "/src/assets/icons/check-circle.svg?react";

/*
  Componente para mostrar notificaciones emergentes sobre el resultado de alguna acción.
*/ 
export const Notification = ({ result, clearResult }) => {

  useEffect(() => {
    // Si el estado "result" no es "not_sent", iniciamos un temporizador.
    if (result !== "not_sent") {
      const timer = setTimeout(() => {
        // Después de 3 segundos, limpiamos la notificación
        clearResult("not_sent");
      }, 3000);

      // Limpiamos el temporizador si el componente se desmonta o "result" cambia.
      return () => clearTimeout(timer);
    }
  }, [result, clearResult]);

  return (
    <div className="notifications">
      {/* Mostramos una notificación de éxito si "result" es "sent" */}
      {result === "sent" && (
        <div className="notification success">
          <CheckCircle /> <p>¡Artículo guardado!</p>
        </div>
      )}

      {/* Mostramos una notificación de error si "result" es "error" */}
      {result === "error" && (
        <div className="notification error">
         <CancelCircle /> <p>Los datos son incorrectos</p>
        </div>
      )}
    </div>
  );
};