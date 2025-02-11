// Custom Hook para manejar formularios
import { useState } from "react";

// El hook acepta un parámetro opcional 'objetoInicial' que por defecto es un objeto vacio.
export const useForm = (initialObject = {}) => {
  
  // "form" es el estado donde guardamos los datos del formulario.
  const [form, setForm] = useState(initialObject);

  // Función para convertir los datos de un formulario HTML en un objeto de JavaScript
  // Utiliza los pares clave-valor correspondientes a los campos del formulario.
  const serializeForm = (form) => {

    // FormData es una interfaz que permite construir un conjunto de pares clave valor. 
    const formData = new FormData(form);

    // Se declara un objeto vacío que contendrá los datos del formulario en formato clave-valor.
    const fullObject = {};

    // Recorremos los pares (nombre, valor) y los almacenamos en "fullObject".
    for (let [name, value] of formData) {
      fullObject[name] = value;
    }

    // Finalmente devolvemos el objeto completo.
    return fullObject;
  }

  // Maneja la acción de enviar el formulario.
  const handleSubmit = (e) => {

    // Prevenimos el comportamiento por defecto.
    e.preventDefault();

    /// Obtenemos la información convertida a objeto usando serializeForm.
    let serializedData = serializeForm(e.target);

    // Actualizamos el estado con los datos del formulario.
    setForm(serializedData);
  }
  
  // Maneja los cambios en los inputs del formulario.
  const handleChange = ({ target }) => {

    // Se desestructura el objeto target para obtener el name y value del campo que ha cambiado.
    const { name, value } = target;

    // Se actualiza el estado del formulario, preservando los campos existentes con '...formulario'
    // y actualizando solo el campo que ha cambiado utilizando el 'name' como clave y el 'value' como valor.
    setForm({
      ...form,
      [name]: value
    });
  }

  // Retornamos todo lo necesario para gestionar el formulario en otros componentes
  return {
    form, 
    setForm,
    handleSubmit,
    handleChange
  }
}