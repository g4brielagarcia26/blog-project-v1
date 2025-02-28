import React, { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { TipTapEditor } from "../../shared/TextEditor/TipTapEditor";
import { UploadButton } from "../../ui/UploadButton/UploadButton";
import { toast } from 'react-toastify';
import "../../../styles/form-styles.css";
import 'react-toastify/dist/ReactToastify.css';

// Componente para crear un nuevo artículo.
export const Create = () => {

  // Hook interno para manejar el envio del formulario.
  
  const { form, handleChange, setForm, handleSubmit } = useForm({ title: "", content: "", writer: "" });  const [content, setContent] = useState(""); // Estado para manejar el contenido del editor de texto.
  const [resetTrigger, setResetTrigger] = useState(0); // Triggers para reiniciar el componente "UpdateImage".

  // Función que maneja las solicitudes hacia la API.
  const saveArticle = async ( formData ) => {
  
    try {
      // Envia el artículo (texto) a la API para crearlo
      const { data } = await ajaxRequest(`${Global.url}nuevo-articulo`, "POST", formData);
  
      // Validamos que la respuesta del server sea "success"
      if (!data || data.status !== "success") {
        toast.error("Faltan datos para crear el artículo");
        return;
      }
  
      // Si la respuesta es válida, muestra "toast" de éxito.
      toast.success("¡Artículo creado!");
      
      // Guardamos en "fileInput" lo que obtenemos de nuestro formulario "file".
      const fileInput = document.getElementById("file");

      // Subimos la imagen si existe el archivo
      if (fileInput && fileInput.files[0]) {

        // Guardamos el objeto formData en una variable. 
        // (Convierte clave / valor todos los datos obtenidos del formulario).
        const formData = new FormData();

        // Inserta el "file" en formData
        formData.append("file", fileInput.files[0]);
  
        // Realizamos la solicitud de subida de imagen a la API
        try {
          await ajaxRequest(
            `${Global.url}nueva-imagen/${data.article._id}`,
            "POST",
            formData, 
            true // Indica que es multipart/form-data
          );
        } catch (error) { 
          toast.error("Error al subir la imagen."); 
        }
      }
  
      // Limpiamos el formulario (true)
      resetForm();
  
    } catch (error) {
      // Error general (red, servidor caído ...)
      toast.error("Error inesperado.");
    }
  };

  // Función para limpiar el formulario
  const resetForm = () => {

    // Reiniciar valores del formulario
    setForm({ title: "", writer: "", content: "" });

    // Borra el input de archivo
    document.getElementById("file").value = "";

    // Trigger para que el editor y el botón de subida se limpien "por dentro".
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div>
      {/* Formulario para crear el artículo */}
      <form className="form" onSubmit={(e) => handleSubmit(e, saveArticle)}>

        <h1>Crear un artículo</h1>

        <div className="form-group">
          {/* Campo para ingresar el título del artículo */}
          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="Título del artículo"
            onChange={handleChange} // Actualiza el estado del formulario (hook)
          />

          {/* Editor de texto para el contenido del artículo */}
          <div className="editor">
            <TipTapEditor
              key={resetTrigger}
              onChange={(contentJSON) =>
                // Actualizamos el state de useForm en tiempo real
                setForm((prev) => ({ ...prev, content: contentJSON }))
              }
            />
          </div>

          {/* Campo oculto para que serializeForm recoja el 'content' */}
          <input
            type="hidden"
            name="content"
            value={form.content || ""}
          />

          <input
            type="text"
            name="writer"
            value={form.writer}
            placeholder="Autor"
            onChange={handleChange}
          ></input>

          {/* Componente para subir una imagen */}
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