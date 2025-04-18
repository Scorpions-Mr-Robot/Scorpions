// Variables globales
let carrito = [];
let total = 0;
let boletaMostrada = false; // Flag to track if the receipt is already displayed

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

// Función para procesar pago con tarjeta
function pagarConTarjeta() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'pago-modal';
    modal.innerHTML = `
        <div class="pago-contenido">
            <div class="pago-header">
                <h2>Pago con Tarjeta</h2>
                <button class="cerrar-modal">&times;</button>
            </div>
            <form id="form-tarjeta" class="form-pago">
                <div class="form-grupo">
                    <label>Número de Tarjeta</label>
                    <input type="text" id="numero-tarjeta" required pattern="[0-9]{16}" maxlength="16" placeholder="1234 5678 9012 3456">
                </div>
                <div class="form-grupo">
                    <label>Nombre en la Tarjeta</label>
                    <input type="text" id="nombre-tarjeta" required placeholder="NOMBRE APELLIDO">
                </div>
                <div style="display: flex; gap: 15px;">
                    <div class="form-grupo">
                        <label>Fecha Expiración</label>
                        <input type="text" id="fecha-expiracion" required pattern="[0-9]{2}/[0-9]{2}" placeholder="MM/YY">
                    </div>
                    <div class="form-grupo">
                        <label>CVV</label>
                        <input type="text" id="cvv" required pattern="[0-9]{3,4}" maxlength="4" placeholder="123">
                    </div>
                </div>
                <button type="submit" class="btn-pago tarjeta">Pagar $${total}</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Cerrar modal
    modal.querySelector('.cerrar-modal').onclick = () => {
        modal.remove();
    };

    // Procesar pago
    modal.querySelector('#form-tarjeta').onsubmit = (e) => {
        e.preventDefault();
        validarTarjeta();
    };
}

// Función para pagar con Yape
function pagarConYape() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'pago-modal';
    modal.innerHTML = `
        <div class="pago-contenido">
            <div class="pago-header">
                <h2>Pago con Yape</h2>
                <button class="cerrar-modal">&times;</button>
            </div>
            <div class="qr-container">
                <img src="/imagenes/qr-yape.png" alt="QR Yape">
                <div class="qr-info">
                    <p>Número: +51 955 294 117</p>
                    <p>Total a pagar: $${total}</p>
                    <p>Después de realizar el pago, guarda el comprobante</p>
                </div>
                <button onclick="confirmarPagoMovil('Yape')" class="btn-pago yape">Confirmar Pago</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    modal.querySelector('.cerrar-modal').onclick = () => {
        modal.remove();
    };
}

// Función para pagar con Plin
function pagarConPlin() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'pago-modal';
    modal.innerHTML = `
        <div class="pago-contenido">
            <div class="pago-header">
                <h2>Pago con Plin</h2>
                <button class="cerrar-modal">&times;</button>
            </div>
            <div class="qr-container">
                <img src="/imagenes/qr-plin.png" alt="QR Plin">
                <div class="qr-info">
                    <p>Número: +51 955 294 117</p>
                    <p>Total a pagar: $${total}</p>
                    <p>Después de realizar el pago, guarda el comprobante</p>
                </div>
                <button onclick="confirmarPagoMovil('Plin')" class="btn-pago plin">Confirmar Pago</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    modal.querySelector('.cerrar-modal').onclick = () => {
        modal.remove();
    };
}

// Función para validar tarjeta
function validarTarjeta() {
    const numeroTarjeta = document.getElementById('numero-tarjeta').value;
    const nombreTarjeta = document.getElementById('nombre-tarjeta').value;
    const fechaExpiracion = document.getElementById('fecha-expiracion').value;
    const cvv = document.getElementById('cvv').value;

    // Validación básica (puedes agregar más validaciones)
    if (!/^[0-9]{16}$/.test(numeroTarjeta)) {
        alert('Número de tarjeta inválido');
        return;
    }

    if (!/^[A-Za-z\s]+$/.test(nombreTarjeta)) {
        alert('Nombre inválido');
        return;
    }

    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(fechaExpiracion)) {
        alert('Fecha de expiración inválida');
        return;
    }

    if (!/^[0-9]{3,4}$/.test(cvv)) {
        alert('CVV inválido');
        return;
    }

    // Si todo es válido, procesar el pago
    procesarPagoExitoso();
}

// Función para confirmar pago móvil
function confirmarPagoMovil(metodoPago) {
    procesarPagoExitoso();
}

// Función para procesar pago exitoso
function procesarPagoExitoso() {
    generarBoleta();
    carrito = [];
    total = 0;
    actualizarCarrito();
    document.querySelector('.pago-modal').remove();
}

// Función para generar boleta
function generarBoleta() {
  if (boletaMostrada) return;

  boletaMostrada = true;
  const fecha = new Date().toLocaleDateString();
  const numeroBoleta = Math.floor(Math.random() * 1000000);

  const boletaHTML = `
    <div class="boleta-container">
      <div class="boleta">
        <button onclick="cerrarBoleta()" class="btn-cerrar-boleta">&times;</button>
        <div class="boleta-header">
          <img src="/imagenes/logo_Sin_fondo.png" alt="Logo" class="boleta-logo">
          <h2>BOLETA DE VENTA</h2>
          <p>N°: ${numeroBoleta}</p>
          <p>Fecha: ${fecha}</p>
        </div>
        <div class="boleta-detalle">
          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              ${carrito.map(item => `
                <tr>
                  <td>${item.nombre}</td>
                  <td>$${item.precio.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>$${total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="boleta-footer">
          <p>¡Gracias por su compra!</p>
        </div>
        <button onclick="imprimirBoleta()" class="btn-imprimir">
          <i class="fas fa-print"></i> Imprimir Boleta
        </button>
      </div>
    </div>
  `;

  const modal = document.createElement('div');
  modal.innerHTML = boletaHTML;
  document.body.appendChild(modal);
}

function cerrarBoleta() {
  const boletaContainer = document.querySelector('.boleta-container');
  if (boletaContainer) {
    boletaContainer.remove();
    boletaMostrada = false;
  }
}

function imprimirBoleta() {
  const contenidoBoleta = document.querySelector('.boleta').innerHTML;
  const ventanaImpresion = window.open('', '', 'width=800,height=600');
  ventanaImpresion.document.write(`
    <html>
      <head>
        <title>Boleta de Venta</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .boleta { padding: 20px; }
          .boleta-header { text-align: center; margin-bottom: 20px; }
          .boleta-logo { max-width: 150px; margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 8px; border-bottom: 1px solid #ddd; text-align: left; }
          .boleta-footer { margin-top: 30px; text-align: center; }
        </style>
      </head>
      <body>
        ${contenidoBoleta}
      </body>
    </html>
  `);
  ventanaImpresion.document.close();
  ventanaImpresion.print();
}

// Inicializar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Carrito inicializado'); // Debug
    actualizarCarrito();

    // Solo crea el botón si no existe
    if (!document.querySelector('.carrito-toggle')) {
        const carritoToggle = document.createElement('div');
        carritoToggle.className = 'carrito-toggle';
        carritoToggle.innerHTML = '<i class="fas fa-shopping-cart"></i>';
        document.body.appendChild(carritoToggle);

        carritoToggle.addEventListener('click', function() {
            const carritoElement = document.getElementById('carrito-container');
            if (carritoElement) {
                carritoElement.classList.toggle('active');
            }
        });
    }
});