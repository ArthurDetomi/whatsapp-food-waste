document.addEventListener("DOMContentLoaded", () => {
  const chatArea = document.getElementById("chat-area");
  const messageInput = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  const statusText = document.getElementById("status-text");

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  };

  const scrollToBottom = () => {
    chatArea.scrollTop = chatArea.scrollHeight;
  };

  const appendMessage = (text, sender) => {
    const isUser = sender === "user";
    const timeStr = getCurrentTime();

    const wrapper = document.createElement("div");
    wrapper.className = `flex ${isUser ? "justify-end" : "justify-start"}`;

    const bubble = document.createElement("div");
    bubble.className = `${isUser ? "msg-user" : "msg-ai"} text-gray-800 p-2.5 rounded-lg max-w-[85%] shadow-sm text-sm relative break-words`;

    const textNode = document.createElement("span");
    textNode.textContent = text;

    const timeNode = document.createElement("span");
    timeNode.className = "text-[10px] text-gray-400 block text-right mt-1 ml-4";
    timeNode.textContent = timeStr;

    bubble.appendChild(textNode);
    bubble.appendChild(timeNode);
    wrapper.appendChild(bubble);
    chatArea.appendChild(wrapper);

    scrollToBottom();
  };

  const showTypingIndicator = () => {
    statusText.textContent = "Digitando...";
    const wrapper = document.createElement("div");
    wrapper.id = "typing-indicator";
    wrapper.className = "flex justify-start";

    wrapper.innerHTML = `
                          <div class="msg-ai p-3 rounded-lg shadow-sm flex space-x-1 items-center h-[36px]">
                              <div class="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              <div class="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              <div class="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          </div>
                      `;
    chatArea.appendChild(wrapper);
    scrollToBottom();
  };

  const removeTypingIndicator = () => {
    statusText.textContent = "Online";
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
      indicator.remove();
    }
  };

  async function sendMessageToServer(message) {
    const url = "/sendMessage";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      const responseMessage =
        result.responseMessage ?? "Mensagem vazia recebida!";

      return responseMessage;
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    messageInput.value = "";

    showTypingIndicator();

    const response = await sendMessageToServer(text);

    removeTypingIndicator();

    appendMessage(response, "ai");
  }

  sendBtn.addEventListener("click", handleSendMessage);

  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });

  messageInput.focus();
});
