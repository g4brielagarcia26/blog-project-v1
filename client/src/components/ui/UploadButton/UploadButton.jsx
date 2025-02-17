import React, { useState, useEffect } from "react";
import "./upload-button.css";

/*
  Este componente se encarga de renderizar un botón para subir imágenes.
  Permite al usuario seleccionar un archivo y muestra el nombre del archivo si ha sido seleccionado.
*/
export const UploadButton = ({ resetTrigger }) => {

  // "isFileClicked" nos ayuda a saber si el usuario ha hecho clic en el input de archivo.
  const [isFileClicked, setIsFileClicked] = useState(false);

  // "fileName" guarda el nombre del archivo que el usuario selecciona.
  const [fileName, setFileName] = useState("");

  // "handleFileChange" se ejecuta cuando el usuario selecciona un archivo.
  // Si hay un archivo, guardamos su nombre y marcamos que se ha hecho clic.
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    setIsFileClicked(true);
  };

  useEffect(() => {
    setIsFileClicked(false);
    setFileName("");
  }, [resetTrigger]);

  return (
    <div>
      {/* Etiqueta que actúa como botón para subir imagen. 
          Al hacer clic, se "activa" el input de archivo. */}
      <label
        htmlFor="file"
        className="upload-image"
      >
        Subir imagen
      </label>

      {/* Input para elegir el archivo, oculto visualmente. 
          Cuando cambia, se ejecuta "handleFileChange". */}
      <input
        type="file"
        name="file"
        id="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Solo mostramos el nombre o el mensaje de "ningún archivo seleccionado"
          si el usuario ha hecho clic en el input. */}
      {isFileClicked && (
        <div className="file-status">
          {fileName ? (
            <>Imagen seleccionada: <strong>{fileName}</strong></>
          ) : (
            <>No has seleccionado ningún archivo</>
          )}
        </div>
      )}
    </div>
  );
};