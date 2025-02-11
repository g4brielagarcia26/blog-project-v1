/*
  Función asincrónica para manejar peticiones AJAX con varios métodos HTTP.
  Recibe la URL, el método (GET, POST, PUT o DELETE), los datos que se van a guardar (si aplica)
  y un indicador "file" para saber si se está enviando un archivo.
  No usaremos la variable loading, pero la mantenemos comentada por sí se quiere usar en un futuro.
*/ 
export const ajaxRequest = async (url, method, dataToSave = "", file = false) => {

  // Al inicio, asumimos que estamos cargando datos.
  // let loading = true;

  // Definimos una función interna para realizar la solicitud HTTP de forma asíncrona.
  const getData = async () => {
    // Antes de hacer la petición, establecemos que sigue en proceso de carga.
    // loading = true;

    // Por defecto, configuramos la solicitud como "GET".
    let options = {
      method: "GET"
    };

    // Ajustamos las opciones si el método es GET o DELETE.
    if (method == "GET" || method == "DELETE") {
      options = {
        method: method
      };
    }

    // Si el método es POST o PUT, personalizamos las opciones para enviar datos.
    if (method == "POST" || method == "PUT") {

      // Convertimos "dataToSave" a JSON. (Puede ser objeto o texto según tu caso)
      let body = JSON.stringify(dataToSave);

      // Si "file" es true, significa que estamos enviando un archivo (por ejemplo, una imagen).
      // En ese caso no establecemos headers JSON.
      if(file) {
        options = {
          method: method,
          body: dataToSave 
        };
      } else {
        // Caso contrario, enviamos datos como JSON y establecemos su tipo.
        options = {
          method: method,
          body: body,
          headers: {
            "Content-Type": "application/json"
          }
        };
      }
    }

    // Hacemos la petición usando fetch, pasando la URL y las opciones definidas.
    const request = await fetch(url, options);

    // Parseamos la respuesta a JSON.
    const data = await request.json();

    // Una vez que tenemos la respuesta, indicamos que ya terminó la carga.
    // loading = false;

    // Retornamos los datos obtenidos y el estado de carga.
    return {
      data,
      //loading
    };
  };

  // Finalmente, devolvemos el resultado de "getData" 
  // para que quien llame a "ajaxRequest" pueda usar sus datos.
  return getData();
};