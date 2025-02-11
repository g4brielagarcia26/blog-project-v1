/*
  "toolbar" es un array que definie las opciones de formato
  que apareceran en nuestro editor de texto, el componente TextEditor.

  Aquí podemos personalizar las herramientas de edición y es fundamental esta
  definición para que la librería Quill funcione.
*/

export const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ align: [] }],

  [{ list: 'ordered' }, { list: 'bullet' }],  

  // Líneas comentadas por si en el futuro se necesitan más opciones de edición.

  // [{ indent: '-1' }, { indent: '+1' }],
  // [{ size: ['small', false, 'large', 'huge'] }],
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // ['link', 'image', 'video'],
  // [{ color: [] }, { background: [] }],
]