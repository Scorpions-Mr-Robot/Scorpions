document.addEventListener('DOMContentLoaded', function () {
  const chatbotContainer = document.querySelector('.chatbot-container');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotOptions = document.getElementById('chatbotOptions');
  const responses = JSON.parse(document.getElementById('chatbot-responses').textContent);

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
    let response = "¡Hola! Soy tu asistente virtual de Scorpions. ¿En qué puedo ayudarte hoy?";

    if (message.includes("servicios")) {
      response = "Ofrecemos una amplia gama de servicios, incluyendo ciberseguridad, desarrollo de software a medida y soluciones integrales en la nube. ¿En cuál de estos servicios estás más interesado?";
    } else if (message.includes("precios")) {
      response = "Nuestros precios se adaptan a las necesidades específicas de cada cliente. Para obtener una cotización personalizada, por favor, proporciona detalles sobre tus requerimientos.";
    } else if (message.includes("contacto")) {
      response = "Puedes contactarnos directamente a través del +51 955 294 117 o enviarnos un correo electrónico a scorpionsmrrobot@gmail.com. ¡Estamos aquí para ayudarte!";
    } else if (message.includes("seguro una venta") || message.includes("listo para contratar")) {
      response = "¡Excelente decisión! Para avanzar, por favor, facilítame tu número de contacto y correo electrónico para coordinar los detalles y personalizar tu solución.";
    } else if (message.includes("horario")) {
      response = "Nuestro horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM. ¡Estamos listos para atenderte!";
    } else if (message.includes("quiénes son")) {
      response = "Somos Scorpions, una empresa líder en soluciones informáticas y ciberseguridad. Nos dedicamos a proteger y optimizar los sistemas de nuestros clientes con tecnología de vanguardia.";
    }

    setTimeout(() => {
      displayMessage(response, 'bot');
    }, 500);
  }

  // Event listeners
  document.querySelector('.chatbot-header').addEventListener('click', toggleChatbot);
  document.querySelector('.chatbot-input button').addEventListener('click', sendMessage);
});