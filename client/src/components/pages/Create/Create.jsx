import React, { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { Notification } from "../../shared/Notifications/Notifications";
import { TipTapEditor } from "../../shared/TextEditor/TipTapEditor";
import { UploadButton } from "../../ui/UploadButton/UploadButton";
import "../../../styles/form-styles.css";

// Componente para crear un nuevo artículo
export const Create = () => {

  const { form, handleChange, setForm } = useForm({ title: "", writer: "" }); // Inicializamos valores vacíos
  const [result, setResult] = useState("not_sent"); // Estado para manejar el resultado de la operación (enviado, error, no enviado)
  const [content, setContent] = useState(""); // Estado para manejar el contenido del editor de texto
  const [resetTrigger, setResetTrigger] = useState(0); // Triggers para reiniciar componentes

  // Función para guardar el artículo
  const saveArticle = async (e) => {

    // Previene el comportamiento predeterminado del formulario
    e.preventDefault();

    // Crea un objeto con los datos del formulario y el contenido del editor
    let newArticle = { ...form, content };

    // Envío del artículo a la API
    const { data } = await ajaxRequest(`${Global.url}crear`, "POST", newArticle);

    // Verifica si la respuesta fue exitosa
    if (data.status === "success") {

      setResult("sent");

      // Subida de imagen si se selecciona un archivo
      const fileInput = document.getElementById("file");

      // Verifica si la solicitud para crear el artículo fue exitosa
      // y si el usuario ha seleccionado un archivo para subir (fileInput.files[0])
      if (fileInput.files[0]) {

        // Crea una nueva instancia de FormData para manejar los datos del archivo.
        const formData = new FormData();

        // Añade el archivo seleccionado al objeto FormData.
        formData.append("file", fileInput.files[0]);

        // Realiza una solicitud AJAX para subir la imagen asociada al artículo recién creado.
        const uploadImage = await ajaxRequest(
          `${Global.url}upload-image/${data.article._id}`,
          "POST",
          formData, // Datos del archivo encapsulados en FormData
          true // Indica que el contenido es multipart/form-data
        );

        // Verifica si la respuesta de la subida de imagen indica éxito.
        if (uploadImage.data.status !== "success") {
          setResult("error");
        }
      }
      
      // Limpiamos el formulario automáticamente después del envio.
        resetForm();
      
    } else {
        setResult("error");
    }
  };

  // Función para reiniciar el formulario
  const resetForm = () => {
    setForm({ title: "", writer: "" }); // Reiniciar valores del formulario
    setContent(""); // Limpiar editor de texto
    document.getElementById("file").value = ""; // Borra el input de archivo
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div>
      {/* Componente de notificación para mostrar mensajes al usuario */}
      <Notification result={result} clearResult={setResult} />

      {/* Formulario para crear el artículo */}
      <form className="form" onSubmit={saveArticle}>
        <h1>Crear un artículo</h1>

        <div className="form-group">
          {/* Campo para ingresar el título del artículo */}
          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="Título del artículo"
            onChange={handleChange} // Actualiza el estado del formulario
          />

          {/* Editor (TipTap) de texto para el contenido del artículo */}
          <div className="editor">
            <TipTapEditor
              key={resetTrigger}
              onChange={(contentJSON) => setContent(contentJSON)}
              defaultValue=""
            />
          </div>

          <input
            type="text"
            name="writer"
            value={form.writer}
            placeholder="Autor"
            onChange={handleChange}
          ></input>

          {/* Botón para subir una imagen */}
          <UploadButton 
            key={resetTrigger}
          />

          {/* Botón para guardar el artículo */}
          <div className="save-btn">
            <input type="submit" className="btn" value="Guardar" />
          </div>
        </div>
      </form>
    </div>
  );
};