import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import "./upload-button.css";

// Componente que renderiza un botón para subir imágenes.
export const UploadButton = ({ resetTrigger }) => {

  const [isFileClicked, setIsFileClicked] = useState(false); // "flag" que nos ayuda a determinar si el usuario ha clicado el botón o no.  
  const [fileName, setFileName] = useState(""); // Guarda el nombre del archivo que el usuario selecciona.

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB.

  // Hace validaciones para las subidas de archivos. 
  // (Se intenta mejorar la interacción del usuario con el botón)
  const handleFileChange = (e) => {

    const file = e.target.files[0];

    setIsFileClicked(true);
    
    // Si no hay archivo seleccionado, avisamos y salimos
    if (!file) {
      setFileName("");
      toast.warning("No has seleccionado ningún archivo");
      return;
    }

    // Valida tipo de archivo (solo permite imágenes)
    if (!file.type.startsWith("image/")) {
      setFileName("");
      toast.error("El archivo seleccionado no es una imagen válida");
      return;
    }

    // Valida tamaño de archivo (no más de 5MG)
    if (file.size > MAX_FILE_SIZE) {
      setFileName("");
      toast.error("El archivo supera el límite máximo de 5MB");
      return
    }

    // Si todo está bien, guardamos el nombre.
    setFileName(file.name);
  };

  // "Resetea" el botón.
  useEffect(() => {
    setIsFileClicked(false);
    setFileName("");
  }, [resetTrigger]);

  return (
    <div>
      {/* Etiqueta que actúa como botón para subir imagen. */}
      <label
        htmlFor="file"
        className="upload-image"
      >
        Subir imagen
      </label>

      {/* Input para elegir el archivo, oculto visualmente. */}
      <input
        type="file"
        name="file"
        id="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Mostramos el nombre del archivo si pasó las validaciones y si ha sido clicado. */}
      {isFileClicked && (
        <div className="file-status">
          { fileName 
          ? ( <>Imagen seleccionada: <strong>{fileName}</strong></>) 
          : ("") }
        </div>
      )}
    </div>
  );
};