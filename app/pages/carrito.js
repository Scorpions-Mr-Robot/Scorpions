let carrito = [];
let total = 0;

// Función para agregar un servicio al carrito
function agregarAlCarrito(nombre, precio) {
  // Agregar el servicio al carrito
  carrito.push({ nombre, precio });

  // Actualizar el total
  total += precio;

  // Actualizar la interfaz
  actualizarCarrito();
}

// Función para actualizar la interfaz del carrito
function actualizarCarrito() {
  const carritoList = document.getElementById('carrito-list');
  const totalElement = document.getElementById('total');

  // Limpiar la lista del carrito
  carritoList.innerHTML = '';

  // Agregar cada elemento del carrito a la lista
  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.onclick = () => eliminarDelCarrito(index);
    li.appendChild(removeButton);
    carritoList.appendChild(li);
  });

  // Actualizar el total
  totalElement.textContent = `Total: $${total}`;
}

// Función para eliminar un servicio del carrito
function eliminarDelCarrito(index) {
  // Restar el precio del servicio al total
  total -= carrito[index].precio;

  // Eliminar el servicio del carrito
  carrito.splice(index, 1);

  // Actualizar la interfaz
  actualizarCarrito();
}