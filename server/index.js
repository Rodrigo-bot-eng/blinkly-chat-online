const express = require('express');
const http = require('http');
const path = require('path');
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// --- Configuração do Firebase ---
// A configuração do Firebase está aqui para fins de demonstração,
// mas não é usada diretamente neste servidor. Ela é usada no front-end.
const firebaseConfig = {
    apiKey: "AIzaSyBvho-095JnOAwTMCaQ8LxIROlpMCbAppw",
    authDomain: "blinkly-online-4169a.firebaseapp.com",
    projectId: "blinkly-online-4169a",
    storageBucket: "blinkly-online-4169a.firebasestorage.app",
    messagingSenderId: "1006187399372",
    appId: "1:1006187399372:web:0f4aafedfa74bcb2631a69",
    measurementId: "G-50JPVBRMR3"
};

// Inicializa o Firebase (opcional neste arquivo, pois o cliente fará a conexão)
// initializeApp(firebaseConfig);
// const db = getFirestore();

// --- Servir arquivos estáticos e rotas ---
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
});

app.get('/feed.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'feed.html'));
});

// A lógica completa do Socket.IO foi removida deste arquivo.
// O gerenciamento de usuários online, salas e mensagens em tempo real
// agora é feito diretamente no navegador (feed.js) usando o Firebase Firestore.
// Isso elimina a necessidade de um servidor Node.js para intermediar essas ações.

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});