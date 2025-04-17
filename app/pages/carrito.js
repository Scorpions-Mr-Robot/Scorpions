let carrito = [];
let total = 0;

// Función para agregar un servicio al carrito
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  actualizarCarrito();
}

// Función para actualizar la interfaz del carrito
function actualizarCarrito() {
  const carritoList = document.getElementById('carrito-list');
  const totalElement = document.getElementById('total');

  carritoList.innerHTML = '';
  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.classList.add('btn-remove');
    removeButton.onclick = () => eliminarDelCarrito(index);
    li.appendChild(removeButton);
    carritoList.appendChild(li);
  });

  totalElement.textContent = `Total: $${total}`;
}

// Función para eliminar un servicio del carrito
function eliminarDelCarrito(index) {
  total -= carrito[index].precio;
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Función para pagar con tarjeta de crédito
function pagarConTarjeta() {
  if (carrito.length === 0) {
    alert('El carrito está vacío. Agrega productos antes de pagar.');
    return;
  }
  alert(`Pago con tarjeta de crédito procesado. Total: $${total}`);
  limpiarCarrito();
}

// Función para pagar con Yape
function pagarConYape() {
  if (carrito.length === 0) {
    alert('El carrito está vacío. Agrega productos antes de pagar.');
    return;
  }
  alert(`Pago con Yape procesado. Total: $${total}`);
  limpiarCarrito();
}

// Función para pagar con Plin
function pagarConPlin() {
  if (carrito.length === 0) {
    alert('El carrito está vacío. Agrega productos antes de pagar.');
    return;
  }
  alert(`Pago con Plin procesado. Total: $${total}`);
  limpiarCarrito();
}

// Función para limpiar el carrito después del pago
function limpiarCarrito() {
  carrito = [];
  total = 0;
  actualizarCarrito();
}