document.addEventListener('DOMContentLoaded', function () {
  const chatbotContainer = document.querySelector('.chatbot-container');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotOptions = document.getElementById('chatbotOptions');
  const chatbotInput = document.getElementById('chatbotInput');
  const responses = JSON.parse(document.getElementById('chatbot-responses').textContent);

  let isChatbotOpen = false;

  function toggleChatbot() {
    isChatbotOpen = !isChatbotOpen;
    chatbotContainer.classList.toggle('open', isChatbotOpen);
  }

  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    displayMessage(message, 'user');
    chatbotInput.value = '';
    getBotResponse(message);
  }

  function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbot-message', sender);
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    let response = 'Lo siento, no entiendo tu pregunta.';

    for (const key in responses) {
      if (lowerMessage.includes(key)) {
        response = responses[key];
        break;
      }
    }

    setTimeout(() => {
      displayMessage(response, 'bot');
    }, 500);
  }

  function showOptions() {
    chatbotOptions.innerHTML = '';
    for (const key in responses) {
      const optionElement = document.createElement('div');
      optionElement.classList.add('chatbot-option');
      optionElement.textContent = `¿${key.charAt(0).toUpperCase() + key.slice(1)}?`;
      optionElement.onclick = () => {
        sendMessage(key);
      };
      chatbotOptions.appendChild(optionElement);
    }
  }

  // Inicializar el asistente
  showOptions();

  // Eventos
  document.querySelector('.chatbot-header').addEventListener('click', toggleChatbot);
  document.querySelector('.chatbot-input button').addEventListener('click', sendMessage);
});