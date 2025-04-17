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

    if (message.includes("servicios")) {
      response = "Ofrecemos servicios de ciberseguridad, desarrollo de software y soluciones en la nube.";
    } else if (message.includes("precios")) {
      response = "Nuestros precios varían según el servicio. Contáctanos para más información.";
    } else if (message.includes("contacto")) {
      response = "Puedes contactarnos al +51 955 294 117 o enviarnos un correo a scorpionsmrrobot@gmail.com.";
    } else if (message.includes("sistemas")) {
      response = "Ofrecemos sistemas de gestión empresarial, sistemas de inventario y sistemas de facturación.";
    } else if (message.includes("horario")) {
      response = "Nuestro horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM.";
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