// chat-manager.js

// Conectando com o servidor Socket.IO
const socket = io();

// Elementos da interface
const chatDetailScreen = document.getElementById('chat-detail');
const chatNameElement = chatDetailScreen.querySelector('.chat-detail-name');
const chatAvatarElement = chatDetailScreen.querySelector('.chat-detail-avatar');
const chatMessagesContainer = chatDetailScreen.querySelector('.chat-messages');
const chatInput = chatDetailScreen.querySelector('.chat-input');
const chatInputArea = chatDetailScreen.querySelector('.chat-input-area');

// ID do chat atual
let currentChatId = null;

// Funções de manipulação do chat
function openChat(chatId, chatName) {
    // Sair de qualquer chat anterior
    if (currentChatId) {
        socket.emit('leave-room', currentChatId);
    }
    
    // Entrar no novo chat
    currentChatId = chatId;
    socket.emit('join-room', currentChatId);

    // Atualizar a interface com os dados do chat
    chatNameElement.textContent = chatName;
    chatMessagesContainer.innerHTML = ''; // Limpar mensagens antigas
    
    // Exibir a tela de chat
    document.querySelector('.screen.active-screen').classList.remove('active-screen');
    chatDetailScreen.classList.add('active-screen');
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;

    // Criar um ID de usuário temporário
    const senderId = 'User_' + socket.id; 

    // Enviar a mensagem para o servidor
    socket.emit('send-message', {
        room: currentChatId,
        senderId: senderId,
        text: text
    });
    
    // Adicionar a mensagem à interface (opcional, pode ser feito apenas ao receber do servidor)
    // appendMessage(senderId, text, 'outgoing');
    
    // Limpar o input
    chatInput.value = '';
}

function appendMessage(senderId, text, messageType) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', messageType);
    messageDiv.textContent = text;
    chatMessagesContainer.appendChild(messageDiv);
    // Rolar para a última mensagem
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}


// Event Listeners
// Clicar em um chat da lista
document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', () => {
        const chatId = item.dataset.chatName; // Usando o nome do chat como ID
        const chatName = item.querySelector('.chat-name').textContent;
        openChat(chatId, chatName);
    });
});

// Enviar mensagem ao pressionar Enter
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Enviar mensagem ao clicar no botão
// Vamos adicionar um botão de envio depois, por enquanto só o 'Enter' funciona.
// Se você quiser um botão, adicione o event listener aqui

// Voltar da tela de chat
document.querySelector('.chat-back-button').addEventListener('click', () => {
    // Sair do chat atual
    if (currentChatId) {
        socket.emit('leave-room', currentChatId);
        currentChatId = null;
    }
    
    // Esconder a tela de chat
    chatDetailScreen.classList.remove('active-screen');
    document.getElementById('chats').classList.add('active-screen');
});


// Eventos do Socket.IO
socket.on('new-message', (data) => {
    const messageType = (data.senderId === 'User_' + socket.id) ? 'outgoing' : 'incoming';
    // Verificar se a mensagem pertence ao chat atual
    if (data.room === currentChatId) {
        appendMessage(data.senderId, data.text, messageType);
    }
});