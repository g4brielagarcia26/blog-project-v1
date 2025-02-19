import articleValidator from "../helpers/validators.js"; // Importamos los validadores.
import Articles from "../models/Articles.js";
import { bucket } from "../firebase-config.js";


// Crea un nuevo artículo en la base de datos.
/**
 * @returns {Promise<void>} Responde con un objeto JSON que indica el éxito o fallo de la operación.
 * @throws {Error} Lanza un error si la validación falla o si ocurre un problema al guardar el artículo.
 */
export const createArticles = async (req, res) => {
  // Recoger parámetros por POST a guardar
  let params = req.body;

  // Se validan los datos que recibimos.
  try {
    articleValidator(params);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message
    });
  }

  // Crea el objeto a guardar con los datos recibidos usando como "molde" el Schema.
  const article = new Articles(params);
  
  // Guardar el artículo en MongoDB con `.save()`
  try {
    const newArticle = await article.save();

    return res.status(200).json({
      status: "success",
      article: newArticle,
      message: "Articulo creado exitosamente."
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "No se ha guardado el artículo"
    });
  }
};


// Obtiene una lista de artículos desde la base de datos.
/**
 * - Si el parámetro `ultimos` está presente en la URL, se limita la lista a los 3 artículos más recientes.
 * - Ordena los artículos en orden descendente por la fecha de creación.
 * 
 * @returns {Promise<void>} Devuelve una respuesta JSON con el estado de la solicitud y los artículos encontrados.
 * @throws {Error} Devuelve un error 500 si ocurre un problema durante la consulta.
 */
export const getArticles = async (req, res) => {
  try {
    // Inicializar la consulta base
    let query = Articles.find({}).sort({ date: -1 });

    // Si existe el parámetro 'ultimos', limitar a 3 resultados
    if (req.params.ultimos) {
      query = query.limit(3);
    }

    // Ejecutar la consulta
    const articles = await query;

    // Respuesta de error si no se encuentran artículos
    if (!articles || articles.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado artículos.",
      });
    }

    // Respuesta exitosa con los artículos encontrados
    return res.status(200).json({
      status: "success",
      params_url: req.params.ultimos,
      articles
    });
  } catch (error) {
    // Error no identificado
    return res.status(500).json({
      status: "error",
      message: "Error al obtener los artículos.",
    });
  }
};


// Obtiene un artículo específico de la base de datos accediendo a través de su ID.
/**
 * @returns {Promise<void>} Responde con un objeto JSON que contiene:
 *  - `status`: Indica el estado de la operación (`success` o `error`).
 *  - `article`: (En caso de éxito) El artículo encontrado.
 *  - `message`: (En caso de error) Detalle del error ocurrido.
 * @throws {Error} Devuelve un error 500 si ocurre un problema al buscar el artículo.
 */
export const getOneArticle = async (req, res) => {
  try {
    // Recoge el ID que recibe por URL.
    let articleId = req.params.id;

    // Buscar el artículo correspondiente a través del ID.
    const query = await Articles.findById(articleId);

    // Ejecutar la consulta
    const article = await query;

    // Respuesta de error si no se encuentran el artículo.
    if (!article || article.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado el artículo.",
      });
    }

    // Respuesta exitosa con el artículo encontrado
    return res.status(200).json({
      status: "success",
      article
    });
  } catch (error) {
    // Manejo de errores
    return res.status(500).json({
      status: "error",
      message: "Error al obtener el artículo.",
    });
  }
};

// Actualiza un artículo existente en la base de datos según su ID.
/**
 * - Valida los datos recibidos en el cuerpo de la solicitud.
 * - Busca el artículo por su ID y lo actualiza con los nuevos datos.
 * - Devuelve el artículo actualizado o un mensaje de error si no se encuentra.
 *
 * @returns {Promise<void>} Responde con un objeto JSON que indica el éxito o fallo de la operación.
 * @throws {Error} Devuelve un error 500 si ocurre un problema durante la operación de actualización.
 */
export const updateArticle = async (req, res) => {

  try {
    // Recoger el parámetro ID de la URL.
    const articleId = req.params.id;

    // Recoger datos del body
    const params = req.body;

    // Se validan los datos que recibimos.
    try {
      articleValidator(params);
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }

    // Buscar y actualizar artículo
    const updatedArticle = await Articles.findOneAndUpdate(
      { _id: articleId },
      params,
      { new: true } // Para devolver el artículo actualizado
    );

    // Verificar si se encontró y se actualizó el artículo
    if (!updatedArticle) {
      return res.status(404).json({
        status: "error",
        message: "No se encontró el artículo para actualizar.",
      });
    }

    // Respuesta exitosa
    return res.status(200).json({
      status: "success",
      message: "Se ha actualizado el artículo correctamente.",
      updatedArticle,
    });

  } catch (error) {
    // Manejo de errores
    console.error("Error en updateArticle:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar el artículo.",
    });
  }
};


// Elimina un artículo de la base de datos junto con su imagen asociada.
/**
 * @returns {Promise<void>} Responde con un objeto JSON que indica el éxito o fallo de la operación.
 * @throws {Error} Devuelve un error 500 si ocurre un problema al eliminar el artículo o su imagen.
 */
export const deleteArticle = async (req, res) => {
  try {
    // Recoge el ID que recibe por URL.
    const articleId = req.params.id;

    // Buscar el artículo correspondiente para obtener la imagen.
    const article = await Articles.findById(articleId);

    // Verificar si el artículo existe.
    if (!article) {
      return res.status(404).json({
        status: "error",
        message: "No se encontró el artículo para borrar.",
      });
    }

    // Eliminar el artículo de la base de datos.
    await Articles.findByIdAndDelete(articleId);

    // Eliminar la imagen asociada en Firebase Storage (si no es la imagen por defecto)
    if (article.image && article.image !== "default.png") {

      // Definimos el PATH donde están guardadas las imágenes.
      const fileRef = bucket.file(`articles/${article.image}`);
      try {
        // Intentamos eliminar la imagen físicamente.
        await fileRef.delete();

      } catch (error) {
        console.error("Error al eliminar la imagen de Firebase: ", error);
        return res.status(500).json({
          status: "error",
          message: "Error al eliminar la imagen asociada al artículo.",
        });
      }
   }

    // Respuesta exitosa
    return res.status(200).json({
      status: "success",
      message: "Se ha borrado el artículo y su imagen.",
    });

  } catch (error) {
    console.error("Error al borrar el artículo:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al borrar el artículo.",
    });
  }
};


// Sube una imagen para un artículo y actualiza su información en la base de datos.
/**
 * - Valida si se envió un archivo "file" en la solicitud (imagen).
 * - Verifica que la imagen tenga una extensión válida.
 * - Actualiza el campo `image` del artículo con el nombre del archivo subido.
 * 
 * @returns {Promise<void>} Responde con un objeto JSON que indica el éxito o fallo de la operación.
 * @throws {Error} Devuelve un error 500 si ocurre un problema durante la operación de subida o actualización.
 */
export const uploadImage = async (req, res) => {

  // Obtener el archivo "file" que fue enviado en la solicitud.
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      message: "No se ha incluido ningún archivo."
    });
  }

  const articleId = req.params.id;
  const file = req.file;
  const fileName = `article_${Date.now()}_${file.originalname}`;

  try {
    // Buscar el artículo correspondiente para obtener la imagen actual.
    const article = await Articles.findById(articleId);

    // Sí el artículo no existe
    if(!article) {
      return res.status(404).json({
        status: "error",
        message: "Artículo no encontrado."
      });
    }

    // Verifica si hay una imagen anterior y la eliminarla si no es la imagen por defecto
    if(article.image && article.image !== "default.png") {

      const previousImageRef = bucket.file(`articles/${article.image}`);

      try {
        await previousImageRef.delete();
      } catch (error) {
        console.error("Error al eliminar la imagen anterior de Firebase: ", error);
        return res.status(500).json({
          status: "error",
          message: "Error al eliminar la imagen anterior.",
        });
      }
    }

    // Obtén la referencia del archivo en el bucket
    const fileRef = bucket.file(`articles/${fileName}`);

    // Sube el archivo usando el buffer (Multer almacena el archivo en memoria)
    await fileRef.save(file.buffer, {
      metadata: { contentType: file.mimetype }
    });

    // Genera un signed URL (válido de forma indefinida o hasta la fecha que configures)
    const config = {
      action: 'read',
      expires: '03-09-2491' // Fecha lejana para que prácticamente no expire
    };

    // Obtener URL de descarga
    const [downloadURL] = await fileRef.getSignedUrl(config);

    // Actualizar el artículo con la URL de la imagen
    const updatedImage = await Articles.findOneAndUpdate(
      { _id: articleId },
      { image: fileName },
      { new: true }
    );

    // Verificar si la imagen existe
    if (!updatedImage) {
      return res.status(404).json({
        status: "error",
        message: "No se encontró la imagen para actualizar.",
      });
    }

    // Respuesta exitosa
    return res.status(200).json({
      status: "success",
      message: "Se ha actualizado la imagen correctamente.",
      updatedImage,
      imageUrl: downloadURL
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar el artículo.",
    });
  }
};


// Muestra una imagen almacenada en el servidor.
/**
 * - Recibe el nombre del archivo como parámetro en la URL.
 * - Verifica si la imagen existe en el sistema de archivos.
 * - Devuelve la imagen si está disponible o un error 404 si no se encuentra.
 *
 * @returns {Promise<void>} Responde con la imagen solicitada o un mensaje de error.
 * @throws {Error} Devuelve un error 404 si la imagen no existe.
 */
export const showImage = async (req, res) => {
  try {
    const fileName = req.params.file;

    const fileRef = bucket.file(`articles/${fileName}`);

    const config = {
      action: 'read',
      expires: '03-09-2491'
    };

    // Obtener URL de la imagen
    const [downloadURL] =  await fileRef.getSignedUrl(config);

    return res.redirect(downloadURL);

  } catch (error) {
    console.error("Error al obtener la imagen:", error);
     // Manejo del error: imagen no encontrada
    return res.status(404).json({
      status: "error",
      message: "La imagen no existe.",
    });
  }
};


// Realiza una búsqueda en los artículos según un término proporcionado.
/**
 * - Busca coincidencias en los campos `title` y `content` de los artículos.
 * - Utiliza expresiones regulares para realizar búsquedas parciales e insensibles a mayúsculas/minúsculas.
 * - Ordena los resultados por fecha en orden descendente.
 * @returns {Promise<void>} Responde con un objeto JSON que contiene:
 *  - `status`: Estado de la operación (`success` o `error`).
 *  - `articles`: (En caso de éxito) Los artículos encontrados que coinciden con el término de búsqueda.
 *  - `message`: (En caso de error) Detalle del error o mensaje indicando que no hubo coincidencias.
 * @throws {Error} Devuelve un error 500 si ocurre un problema durante la búsqueda.
 */
export const search = async (req, res) => {
  try {
    // Sacar el string de búsqueda desde los parámetros de la URL
    let stringSearch = req.params.string;

    // Realizar la búsqueda utilizando expresiones regulares y operadores lógicos
    const foundArticles = await Articles.find({
      "$or": [
        { "title": { "$regex": stringSearch, "$options": "i" } },
        { "content": { "$regex": stringSearch, "$options": "i" } }
      ]
    })
    .sort({ date: -1 }); // Ordenar por fecha de manera descendente

    // Validar si no se encontraron artículos
    if (!foundArticles || foundArticles.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado coincidencias."
      });
    }

    // Respuesta exitosa con los artículos encontrados
    return res.status(200).json({
      status: "success",
      articles: foundArticles
    });
  } catch (error) {
    // Manejo de errores
    return res.status(500).json({
      status: "error",
      message: "Error en la búsqueda.",
      error
    });
  }
};