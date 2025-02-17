import React, { useState, useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { useParams } from "react-router-dom";
import { Notification } from "../../shared/Notifications/Notifications";
import { TipTapEditor } from "../../shared/TextEditor/TipTapEditor";
import "../../../styles/form-styles.css";
import { UploadButton } from "../../ui/UploadButton/UploadButton";
import defaultImage from "/src/assets/images/default-image.png";

/*
  Componente para actualizar un artículo existente.
 */
export const Update = () => {

  const [article, setArticle] = useState({}); // Estado para almacenar los datos del artículo
  const { form, setForm, handleChange } = useForm(article); // Custom hook para manejar el formulario
  const [result, setResult] = useState("not_sent"); // Estado para controlar el resultado de la operación
  const [content, setContent] = useState(""); // Estado para manejar el contenido del editor de texto

  // Hook para obtener parámetros de la URL (ID del artículo)
  const params = useParams();

  // useEffect para cargar los datos del artículo al montar el componente
  useEffect(() => {
    getArticleById();
  }, []);

  // useEffect para sincronizar el formulario con los datos del artículo
  useEffect(() => {
    setForm(article);
  }, [article]);

  // Función GET para obtener los datos del artículo desde el backend.
  const getArticleById = async () => {
    // Realiza la solicitud AJAX para obtener el artículo a través del id.
    const { data } = await ajaxRequest(`${Global.url}articulo/${params.id}`, "GET");

    // Verifica si la respuesta tiene éxito antes de actualizar el estado.
    if (data?.status === "success") {
      setArticle(data.article);
    }
  };

  // Función para enviar los datos actualizados del artículo.
  const updateArticle = async (e) => {
    // Previene el comportamiento predeterminado del formulario, como recargar la página.
    e.preventDefault();
  
    // Crea un nuevo objeto con los datos actualizados del artículo.
    // Si el título o el contenido no han cambiado, se mantienen los valores actuales.
    let newArticle = {
      ...article, // Mantiene el resto de las propiedades del artículo actual.
      title: form.title || article.title, 
      content: content || article.content, 
    };
  
    // Realiza una solicitud AJAX para actualizar con PUT el artículo en el backend.
    const { data } = await ajaxRequest(
      `${Global.url}articulo/${params.id}`,
      "PUT",
      newArticle
    );
  
    // Actualiza el estado del resultado para indicar si la operación fue exitosa o fallida.
    if (data.status === "success") {
      setResult("sent");
    } else {
      setResult("error");
    }
  
    // Obtiene el campo de entrada del archivo (input file) por su ID.
    const fileInput = document.getElementById("file");
  
    // Si el artículo se actualizó correctamente y se seleccionó un archivo, 
    // se realiza la carga de la imagen al servidor.
    if (data.status === "success" && fileInput.files[0]) {
      // Crea un objeto FormData para enviar el archivo.
      const formData = new FormData();
      formData.append("file", fileInput.files[0]); // Agrega el archivo seleccionado.
  
      // Realiza una solicitud AJAX para subir la imagen a través de POST.
      const uploadImage = await ajaxRequest(
        `${Global.url}upload-image/${data.updatedArticle._id}`, 
        "POST",
        formData,
        true // Indica que es una solicitud con archivos (form-data).
      );
  
      //  Si la imagen se sube correctamentectualiza el estado local del artículo con la nueva imagen.

      if (uploadImage.data.status === "success") {
        setArticle((prev) => ({
          ...prev, // Mantiene las propiedades actuales del artículo.
          image: uploadImage.data.updatedImage.image, // Actualiza la imagen con la nueva.
        }));
        setResult("sent");
      } else {
        // Si la subida falla, actualiza el estado del resultado a "error".
        setResult("error");
      }
    }
  };

  return (
    <div>
      {/* Componente de notificaciones para mostrar el resultado */}
      <Notification result={result} clearResult={setResult} />

      {/* Formulario para editar el artículo */}
      <form className="form" onSubmit={updateArticle}>
        <h1>Editar un artículo</h1>

        <div className="form-group">
          {/* Mostrar la imagen del artículo o una imagen predeterminada */}
          <div>
            {article.image !== "default.png" ? (
              <img src={`${Global.url}image/${article.image}`} alt="Artículo" />
            ) : (
              <img src={defaultImage} alt="Default" />
            )}
          </div>

          {/* Campo de entrada para el título del artículo */}
          <input
            type="text"
            name="title"
            onChange={handleChange}
            defaultValue={article.title}
          />

          {/* Editor de texto para el contenido del artículo */}
          <div className="editor">
            <TipTapEditor
              defaultValue={article.content}
              onChange={(contentJSON) => setContent(contentJSON)}
            />
          </div>

          {/* Campo de entrada para el autor del artículo */}
          <input
            type="text"
            name="writer"
            onChange={handleChange}
            defaultValue={article.writer ? article.writer : "Anonymous"}
          ></input>
          
          {/* Botón para subir una imagen */}
          <UploadButton />

          {/* Botón para guardar los cambios */}
          <div className="save-btn">
            <input type="submit" className="btn" value="Guardar" />
          </div>
        </div>
      </form>
    </div>
  );
};