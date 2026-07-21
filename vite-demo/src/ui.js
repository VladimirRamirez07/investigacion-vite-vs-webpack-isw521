import {
  TAX_RATE,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
} from './calculator.js';

const productList = document.querySelector('#product-list');
const emptyMessage = document.querySelector('#empty-message');
const subtotalElement = document.querySelector('#subtotal');
const taxRateElement = document.querySelector('#tax-rate');
const taxElement = document.querySelector('#tax');
const totalElement = document.querySelector('#total');
const messageElement = document.querySelector('#message');

// Renderiza la lista de productos en la tabla
export function renderProducts(products) {
  productList.innerHTML = '';
  emptyMessage.hidden = products.length > 0;

  products.forEach((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${escapeHtml(product.name)}</td>
      <td>${formatCurrency(product.price)}</td>
      <td>
        <button
          class="delete-button"
          type="button"
          data-id="${product.id}"
          aria-label="Eliminar ${escapeHtml(product.name)}"
        >
          Eliminar
        </button>
      </td>
    `;
    productList.appendChild(row);
  });
}

// Actualiza el resumen de subtotal, impuesto y total
export function renderSummary(products) {
  const subtotal = calculateSubtotal(products);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);

  subtotalElement.textContent = formatCurrency(subtotal);
  taxRateElement.textContent = `${TAX_RATE * 100}%`;
  taxElement.textContent = formatCurrency(tax);
  totalElement.textContent = formatCurrency(total);
}

export function showMessage(message, type = 'error') {
  messageElement.textContent = message;
  messageElement.className = `message ${type}`;
}

export function clearMessage() {
  messageElement.textContent = '';
  messageElement.className = 'message';
}

export function clearForm(form) {
  form.reset();
  form.elements.productName.focus();
}

// Previene inyección de HTML en los datos del usuario
function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}