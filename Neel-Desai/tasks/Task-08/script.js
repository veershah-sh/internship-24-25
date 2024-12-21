function showTyping() {
  const typingMessage = document.createElement('div');
  typingMessage.className = 'message bot-message typing-text';
  typingMessage.textContent = 'Typing...';
  chatWindow.appendChild(typingMessage);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return typingMessage;
}
async function getOpenAIResponse(queryText) {
  const apiKey = "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";  // Replace with your OpenAI API key
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };
  const data = {
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: queryText }],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      const botMessage = responseData.choices[0].message.content;
      return botMessage;
    } else {
      return "Sorry, there was an error processing your request.";
    }
  } catch (error) {
    console.error("Error with Fetch API:", error);
    return "Sorry, I couldn't get a response at the moment.";
  }
}
const openChat = document.getElementById('openChat');
const closeChat = document.getElementById('closeChat');
const chatPopup = document.getElementById('chatPopup');
const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const keywordButtons = document.querySelectorAll('.keyword-btn');
openChat.addEventListener('click', () => {
  if (chatPopup.style.display === 'flex') {
    closeChatPopup();
  } else {
    openChatPopup();
  }
});

closeChat.addEventListener('click', closeChatPopup);
function openChatPopup() {
  chatPopup.style.display = 'flex';
  chatPopup.classList.remove('close');
  chatPopup.classList.add('open');
}

function closeChatPopup() {
  chatPopup.classList.remove('open');
  chatPopup.classList.add('close');
  chatPopup.style.display = 'none';
}
function hideKeywordButtons() {
  keywordButtons.forEach(button => {
    button.style.display = 'none';
  });
}

sendButton.addEventListener('click', async () => {
  const messageText = userInput.value.trim();
  if (messageText !== "") {
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.innerHTML = `<img src="images/hero.jpg" alt="User" /> ${messageText}`;  // Add user photo
    chatWindow.appendChild(userMessage);
    hideKeywordButtons();
    const typingMessage = showTyping();
    const botResponse = await getOpenAIResponse(messageText);
    typingMessage.remove();
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot-message');
    botMessage.innerHTML = `<img src="images/bot.png" alt="Bot" /> ${botResponse}`;  // Add bot photo
    chatWindow.appendChild(botMessage);

    userInput.value = ""; 
    chatWindow.scrollTop = chatWindow.scrollHeight; 
  }
});

keywordButtons.forEach(button => {
  button.addEventListener('click', () => {
    const keyword = button.getAttribute('data-keyword');
    userInput.value = keyword;
    sendButton.click();

    hideKeywordButtons();
  });
});
