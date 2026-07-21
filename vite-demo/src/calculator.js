// Tasa de impuesto (IVA Costa Rica)
// Este valor se puede modificar en vivo durante la demo
export const TAX_RATE = 0.13;

// Calcula el subtotal sumando los precios de todos los productos
export function calculateSubtotal(products) {
  return products.reduce((total, product) => total + product.price, 0);
}

// Calcula el impuesto sobre el subtotal
export function calculateTax(subtotal) {
  return subtotal * TAX_RATE;
}

// Calcula el total final
export function calculateTotal(subtotal, tax) {
  return subtotal + tax;
}

// Formatea un número como moneda costarricense
export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
  }).format(amount);
}