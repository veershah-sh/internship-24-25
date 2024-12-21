// Function to get OpenAI response using Fetch API
async function getOpenAIResponse(queryText) {
  const apiKey = "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";
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  const data = {
    model: "gpt-4o-mini", // Or any other available model (e.g., "gpt-4")
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

// Elements for chat window and buttons
const openChat = document.getElementById('openChat');
const closeChat = document.getElementById('closeChat');
const chatPopup = document.getElementById('chatPopup');
const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const keywordButtons = document.querySelectorAll('.keyword-btn');
const keywordContainer = document.getElementById('keywordButtons');

// Toggle chat window visibility
openChat.addEventListener('click', () => {
  if (chatPopup.style.display === 'flex') {
    closeChatPopup();
  } else {
    openChatPopup();
  }
});

closeChat.addEventListener('click', closeChatPopup);

// Open and close chat popup
function openChatPopup() {
  chatPopup.style.display = 'flex';
  chatPopup.classList.remove('close');
  chatPopup.classList.add('open');
}

function closeChatPopup() {
  chatPopup.classList.remove('open');
  chatPopup.classList.add('close');
  setTimeout(() => {
    chatPopup.style.display = 'none';
    chatWindow.innerHTML = '';
    keywordContainer.style.display = 'flex';
  }, 400);
}

// Add message to chat window
function addMessage(content, type) {
  const message = document.createElement('div');
  message.className = `message ${type}-message`;
  message.textContent = content;
  chatWindow.appendChild(message);

  // Scroll to the bottom of the chat window to show the latest message
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Handle sending user input
sendButton.addEventListener('click', async () => {
  const userText = userInput.value.trim();

  if (userText) {
    // Add user message to chat window
    addMessage(userText, 'user');

    // Get OpenAI response
    const botResponse = await getOpenAIResponse(userText);

    // Add bot message to chat window
    addMessage(botResponse, 'bot');

    // Clear user input field
    userInput.value = '';
  }
});

// Handle pressing Enter key to send message
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});

// Handle keyword button clicks
keywordButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const keyword = button.getAttribute('data-keyword');

    // Add keyword message to chat window
    addMessage(keyword, 'user');

    // Get OpenAI response for keyword
    const botResponse = await getOpenAIResponse(keyword);

    // Add bot response to chat window
    addMessage(botResponse, 'bot');
  });
});
