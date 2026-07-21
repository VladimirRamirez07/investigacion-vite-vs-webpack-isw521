// Valida que el nombre y precio del producto sean correctos
export function validateProduct(name, price) {
  if (!name.trim()) {
    return 'Debe ingresar el nombre del producto.';
  }

  if (Number.isNaN(price) || price <= 0) {
    return 'El precio debe ser mayor que cero.';
  }

  return '';
}