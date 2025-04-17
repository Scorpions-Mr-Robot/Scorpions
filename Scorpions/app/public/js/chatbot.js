document.addEventListener('DOMContentLoaded', function () {
  const chatbotContainer = document.querySelector('.chatbot-container');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotOptions = document.getElementById('chatbotOptions');

  let isChatbotOpen = false;

  function toggleChatbot() {
    isChatbotOpen = !isChatbotOpen;
    chatbotContainer.classList.toggle('open', isChatbotOpen);
    const chatbotBody = chatbotContainer.querySelector('.chatbot-body');
    chatbotBody.style.display = isChatbotOpen ? 'flex' : 'none';
  }

  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
      displayMessage(message, 'user');
      getBotResponse(message);
      chatbotInput.value = '';
    }
  }

  function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbot-message', sender);
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function getBotResponse(message) {
    let response = "Lo siento, no entiendo tu pregunta.";

    if (message.includes("que servicios ofrecen")) {
      response = "Ofrecemos servicios de ciberseguridad, desarrollo de software, soluciones en la nube, mantenimiento de sistemas y más.";
    } else if (message.includes("cuales son precios")) {
      response = "Nuestros precios varían según el servicio. Contáctanos para obtener una cotización personalizada.";
    } else if (message.includes("como puedo contactarme")) {
      response = "Puedes contactarnos al +51 955 294 117 o enviarnos un correo a scorpionsmrrobot@gmail.com.";
    } else if (message.includes("que sistemas realizan")) {
      response = "Ofrecemos sistemas de gestión empresarial, sistemas de inventario, sistemas de facturación y sistemas personalizados.";
    } else if (message.includes("cual es el horario de atencion")) {
      response = "Nuestro horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM.";
    } else if (message.includes("cual es la ubicación")) {
      response = "Estamos ubicados en Ciudad, Perú. Contáctanos para más detalles.";
    } else if (message.includes("cual donde se encuentran")) {
        response = "Estamos ubicados en Ciudad, Perú. Contáctanos para más detalles."; 
    } else if (message.includes("que descuentos tienen")) {
      response = "Ofrecemos descuentos para proyectos grandes y paquetes personalizados. ¡Contáctanos para más información!";
    } else if (message.includes("tienen soporte")) {
      response = "Brindamos soporte técnico 24/7 para nuestros clientes. Puedes contactarnos en cualquier momento.";
    } else if (message.includes("que servicios de ciberseguridad ofrecen")) {
      response = "Nuestros servicios de ciberseguridad incluyen auditorías, protección contra malware, y soluciones de firewall.";
    } else if (message.includes("hablame sobre el desarrollo de software")) {
      response = "Desarrollamos software a medida para empresas, incluyendo aplicaciones web, móviles y de escritorio.";
    } else if (message.includes("que servicios ofrecen en la nube")) {
      response = "Ofrecemos soluciones en la nube como almacenamiento, migración y gestión de infraestructura.";
    } else if (message.includes("tienen mantenimiento")) {
      response = "Realizamos mantenimiento preventivo y correctivo para garantizar el óptimo funcionamiento de tus sistemas.";
    }

    setTimeout(() => {
      displayMessage(response, 'bot');
    }, 500);
  }

  // Event listeners
  document.querySelector('.chatbot-header').addEventListener('click', toggleChatbot);
  document.querySelector('.chatbot-input button').addEventListener('click', sendMessage);

  // Add theme toggle
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.onclick = toggleDarkMode;
  document.body.appendChild(themeToggle);
});