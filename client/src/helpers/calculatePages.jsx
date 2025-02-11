// Esta función se utiliza para paginar una lista de elementos.
export const paginate = (items, currentPage, itemsPerPage) => {

  // Calculamos el número total de páginas dividiendo la cantidad total de elementos
  // por el número de elementos por página y redondeando hacia arriba.
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Determinamos el índice inicial para la página actual.
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Calculamos el índice final para los elementos de la página actual.
  const endIndex = startIndex + itemsPerPage;

  // Extraemos los elementos correspondientes a la página actual.
  const currentItems = items.slice(startIndex, endIndex);

  // Retornamos un objeto con el número total de páginas y los elementos actuales.
  return {
    totalPages,
    currentItems,
  };
};
