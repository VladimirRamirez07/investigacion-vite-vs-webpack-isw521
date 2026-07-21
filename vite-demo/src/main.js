import './style.css';
import { validateProduct } from './validation.js';
import {
  renderProducts,
  renderSummary,
  showMessage,
  clearMessage,
  clearForm,
} from './ui.js';

const form = document.querySelector('#product-form');
const productListElement = document.querySelector('#product-list');
const clearButton = document.querySelector('#clear-button');

// Carga productos guardados en localStorage o inicia con lista vacía
let products = loadProducts();

// Renderizado inicial
refresh();

// Evento: agregar producto
form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearMessage();

  const data = new FormData(form);
  const name = String(data.get('productName') ?? '').trim();
  const price = Number(data.get('productPrice'));
  const error = validateProduct(name, price);

  if (error) {
    showMessage(error);
    return;
  }

  products.push({
    id: crypto.randomUUID(),
    name,
    price,
  });

  refresh();
  clearForm(form);
  showMessage('Producto agregado correctamente.', 'success');
});

// Evento: eliminar producto individual
productListElement.addEventListener('click', (event) => {
  const button = event.target.closest('.delete-button');
  if (!button) return;

  const id = button.dataset.id;
  products = products.filter((product) => product.id !== id);
  refresh();
  showMessage('Producto eliminado.', 'success');
});

// Evento: vaciar lista completa
clearButton.addEventListener('click', () => {
  products = [];
  refresh();
  showMessage('La lista fue vaciada.', 'success');
});

// Actualiza la UI y guarda en localStorage
function refresh() {
  renderProducts(products);
  renderSummary(products);
  saveProducts();
}

function saveProducts() {
  localStorage.setItem('vite-products', JSON.stringify(products));
}

function loadProducts() {
  try {
    const stored = localStorage.getItem('vite-products');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}