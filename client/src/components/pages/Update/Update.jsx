import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { Global } from "../../../helpers/Global";
import { ajaxRequest } from "../../../helpers/ajaxRequest";
import { TipTapEditor } from "../../shared/TextEditor/TipTapEditor";
import { UploadButton } from "../../ui/UploadButton/UploadButton";
import { toast } from "react-toastify";
import defaultImage from "/src/assets/images/default-image.png";
import "../../../styles/form-styles.css";

// Componente para actualizar un artículo existente.
export const Update = () => {

  const [article, setArticle] = useState({}); // Estado para almacenar los datos del artículo
  
  const { form, setForm, handleChange, handleSubmit } = useForm(article); // Hook para manejar el formulario
  const params = useParams(); // Hook para obtener parámetros de la URL (ID del artículo)

  // useEffect para cargar los datos del artículo.
  useEffect(() => {
    getArticleById();
  }, []);

  // useEffect para "meter" los datos del artículo dentro del formulario
  useEffect(() => {
    setForm(article);
  }, [article]);

  // Función para obtener los datos del artículo desde la API.
  const getArticleById = async () => {

    // Realiza la solicitud AJAX para obtener el artículo a través del id.
    const { data } = await ajaxRequest(`${Global.url}articulo/${params.id}`, "GET");

    // Verifica si la respuesta tiene éxito antes de actualizar el estado "article".
    if (data?.status === "success") {
      setArticle(data.article);
    }
  };

  // Función para enviar los datos actualizados del artículo.
  const updateArticle = async ( formData ) => {

    // Crea un nuevo objeto con los datos actualizados del artículo.
    let newArticle = {
      ...article, // (...) mantiene las propiedades del artículo
      title: form.title || article.title,
      content: form.content || article.content,
      writer: form.writer || article.writer
    };

    try {
      // Realiza una solicitud AJAX para actualizar con PUT el artículo en el backend.
      const { data } = await ajaxRequest(`${Global.url}articulo/${params.id}`, "PUT", newArticle);

      // Si la respuesta es válida mostramos un toast de "éxito" sino de "error"
      if (data.status && data.status === "success") {
        toast.success("¡Artículo actualizado!")
      } else {
        toast.error("El artículo no ha sido modificado")
      }

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
          const uploadImage = await ajaxRequest(
            `${Global.url}nueva-imagen/${data.updatedArticle._id}`,
            "POST",
            formData,
            true // Indica que es multipart/form-data
          );

          setArticle((prev) => ({
            ...prev, // Mantiene las propiedades "anteriores" del artículo.
            image: uploadImage.data.updatedImage.image, // Actualiza la imagen con la nueva.
          }));

        } catch (error) {
          toast.error("Error al subir la imagen."); 
        }
      }
    } catch (error) {
      // Error general (red, servidor caído ...)
      toast.error("Error inesperado.");
    }
  };

  return (
    <div>
      {/* Formulario para editar el artículo */}
      <form className="form" onSubmit={(e) => handleSubmit(e, updateArticle)}>

        <h1>Editar un artículo</h1>

        <div className="form-group">
          {/* Mostrar la imagen del artículo o una imagen predeterminada */}
          <div>
            {article.image !== "default.png"
              ? (<img src={`${Global.url}image/${article.image}`} alt="Artículo" />)
              : (<img src={defaultImage} alt="Default" />)
            }
          </div>

          {/* Campo de entrada para el título del artículo */}
          <input
            type="text"
            name="title"
            defaultValue={article.title}
            onChange={handleChange}
          />

          {/* Editor de texto para el contenido del artículo */}
          <div className="editor">
            <TipTapEditor
              defaultValue={article.content}
              onChange={(contentJSON) =>
                setForm((prev) => ({ ...prev, content: contentJSON }))
              }
            />
          </div>

          {/* input oculto para que serializeForm lo recoja */}
          <input type="hidden" name="content" value={form.content || ""} />

          {/* Campo de entrada para el autor del artículo */}
          
          <input
            type="text"
            name="writer"
            onChange={handleChange}
            defaultValue={article.writer}
          ></input>

          {/* Componente para subir una imagen */}
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