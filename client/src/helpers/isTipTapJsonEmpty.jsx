export const isTiptapJsonEmpty = (contentStr) => {
  if (!contentStr) return true; // Ni siquiera llegó nada

  try {
    const obj = JSON.parse(contentStr);
    // Caso típico de doc vacío: un solo "paragraph" sin 'content'
    if (
      obj.type === "doc" &&
      Array.isArray(obj.content) &&
      obj.content.length === 1
    ) {
      const firstNode = obj.content[0];
      if (firstNode.type === "paragraph" && !firstNode.content) {
        return true;
      }
    }
  } catch (error) {
    // Si falla el parseo, podrías decidir que está vacío o no. 
    // Aquí lo tratamos como vacío si no hay nada.
    if (!contentStr.trim()) return true;
  }

  return false;
};