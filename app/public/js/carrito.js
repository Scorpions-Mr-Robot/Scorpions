// Variables globales
let carrito = [];
let total = 0;

// Función para agregar items al carrito
function agregarAlCarrito(nombre, precio) {
    console.log('Agregando al carrito:', nombre, precio); // Debug
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
    mostrarNotificacion(`${nombre} agregado al carrito`);
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const carritoList = document.getElementById('carrito-list');
    const totalElement = document.getElementById('total');
    
    if (!carritoList || !totalElement) {
        console.error('Elementos del carrito no encontrados');
        return;
    }

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

// Función para eliminar items del carrito
function eliminarDelCarrito(index) {
    if (index >= 0 && index < carrito.length) {
        total -= carrito[index].precio;
        carrito.splice(index, 1);
        actualizarCarrito();
    }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    // Remover la notificación después de 3 segundos
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Funciones de pago
function pagarConTarjeta() {
    procesarPago('Tarjeta');
}

function pagarConYape() {
    procesarPago('Yape');
}

function pagarConPlin() {
    procesarPago('Plin');
}

function procesarPago(metodoPago) {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    alert(`Procesando pago con ${metodoPago}\nTotal: $${total}`);
    // Aquí iría la integración con el sistema de pago real
    carrito = [];
    total = 0;
    actualizarCarrito();
}

// Inicializar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Carrito inicializado'); // Debug
    actualizarCarrito();
});