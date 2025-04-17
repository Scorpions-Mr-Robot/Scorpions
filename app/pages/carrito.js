let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
    mostrarNotificacion(`${nombre} agregado al carrito`);
}

function actualizarCarrito() {
    const carritoList = document.getElementById('carrito-list');
    const totalElement = document.getElementById('total');
    
    carritoList.innerHTML = '';
    carrito.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <span>${item.nombre}</span>
            <div>
                <span>$${item.precio}</span>
                <button onclick="eliminarDelCarrito(${index})" class="btn-eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        carritoList.appendChild(div);
    });

    totalElement.textContent = `Total: $${total}`;
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}

function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

function procesarPago(metodoPago) {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    // Aquí iría la lógica de integración con el sistema de pago real
    alert(`Procesando pago con ${metodoPago}. Total: $${total}`);
    carrito = [];
    total = 0;
    actualizarCarrito();
}

function pagarConTarjeta() {
    procesarPago('tarjeta');
}

function pagarConYape() {
    procesarPago('Yape');
}

function pagarConPlin() {
    procesarPago('Plin');
}