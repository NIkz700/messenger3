// Connect to the server using Socket.io
const socket = io();

// DOM elements
const form = document.getElementById('message-form');
const messagesDiv = document.getElementById('messages');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  // Ensure name and message are provided
  if (!name || !message) {
    alert('Please enter both your name and message!');
    return;
  }

  // Emit the message to the server
  socket.emit('sendMessage', { sender: name, content: message });

  // Clear the message input
  messageInput.value = '';
});

// Listen for new messages from the server
socket.on('newMessage', (message) => {
  const div = document.createElement('div');
  div.textContent = `${message.sender}: ${message.content}`;
  messagesDiv.appendChild(div);

  // Scroll to the latest message
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
