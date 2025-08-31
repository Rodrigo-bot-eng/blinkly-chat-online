// Importa as funções necessárias do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Configuração do seu projeto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBvho-095JnOAwTMCaQ8LxIROlpMCbAppw",
    authDomain: "blinkly-online-4169a.firebaseapp.com",
    projectId: "blinkly-online-4169a",
    storageBucket: "blinkly-online-4169a.firebasestorage.app",
    messagingSenderId: "1006187399372",
    appId: "1:1006187399372:web:0f4aafedfa74bcb2631a69",
    measurementId: "G-50JPVBRMR3"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    // Busca o formulário e a área de mensagens no HTML
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const authMessage = document.getElementById('auth-message');

    // Adiciona um listener para o envio do formulário
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;

        authMessage.textContent = '';
        authMessage.style.color = 'red';

        try {
            // Tenta fazer login com e-mail e senha
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login bem-sucedido!");
            
            authMessage.textContent = 'Login bem-sucedido! Redirecionando...';
            authMessage.style.color = 'green';
            
            // Redireciona para a página do feed após 2 segundos
            setTimeout(() => {
                window.location.href = 'feed.html';
            }, 2000);

        } catch (error) {
            console.error("Erro no login:", error);
            let errorMessage = 'Erro ao fazer login. Tente novamente.';
            
            // Trata os diferentes tipos de erros do Firebase
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Email inválido.';
                    break;
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    errorMessage = 'Email ou senha incorretos.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Muitas tentativas de login. Por favor, tente novamente mais tarde.';
                    break;
                default:
                    errorMessage = 'Ocorreu um erro. Por favor, tente novamente.';
                    break;
            }
            authMessage.textContent = errorMessage;
        }
    });
});
