const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display = chatbotContainer.style.display === 'none' ? 'flex' : 'none';
});

chatbotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = chatbotInput.value.trim();
    if (!query) return;

    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = query;
    chatbotMessages.appendChild(userMessage);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    chatbotInput.value = '';

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.textContent = data.reply;
        chatbotMessages.appendChild(botMessage);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    } catch (error) {
        console.error('Chat error:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'message bot';
        errorMessage.textContent = 'Hello,I am analyzing your problem. Please provide more details or consult an expert for tailored advice.';
        chatbotMessages.appendChild(errorMessage);
    }
});