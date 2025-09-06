// Importa as funções necessárias dos SDKs do Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile 
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { 
    getFirestore, 
    doc, 
    setDoc, 
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

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
export const auth = getAuth(app);
export const db = getFirestore(app);

// Adiciona um listener para o evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const signupUsernameInput = document.getElementById('signupUsername');
    const signupEmailInput = document.getElementById('signupEmail');
    const signupPasswordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const signupAvatarInput = document.getElementById('signupAvatar'); // campo para avatar (URL)
    const registerAuthMessage = document.getElementById('register-auth-message');

    if (!signupForm) {
        console.error("Elemento 'signupForm' não encontrado!");
        return;
    }

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = signupUsernameInput.value.trim();
        const email = signupEmailInput.value.trim();
        const password = signupPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const avatarURL = signupAvatarInput?.value.trim() || "https://www.gravatar.com/avatar/?d=retro&s=200";

        registerAuthMessage.textContent = '';
        registerAuthMessage.style.color = 'red';

        if (password.length < 6) {
            registerAuthMessage.textContent = 'A senha deve ter pelo menos 6 caracteres!';
            return;
        }
        if (password !== confirmPassword) {
            registerAuthMessage.textContent = 'As senhas não coincidem!';
            return;
        }

        try {
            // Cria o usuário no Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("Usuário criado no Auth:", user.uid);

            // Atualiza o perfil do usuário no Auth (nome e foto)
            await updateProfile(user, {
                displayName: username,
                photoURL: avatarURL
            });

            // Referência para o documento do usuário no Firestore
            const userDocRef = doc(db, "users", user.uid);
            
            // Salva os dados do usuário no Firestore
            await setDoc(userDocRef, {
                username: username,
                email: email,
                photoURL: avatarURL,
                createdAt: serverTimestamp(),
                lastUsernameChange: serverTimestamp() // para controle de 14 dias
            });
            
            console.log("Dados do usuário salvos no Firestore.");

            registerAuthMessage.textContent = 'Registro bem-sucedido! Redirecionando...';
            registerAuthMessage.style.color = 'green';
            
            setTimeout(() => {
                window.location.href = 'feed.html';
            }, 2000);

        } catch (error) {
            console.error("Erro no processo de registro:", error);
            let errorMessage = 'Erro ao registrar. Tente novamente.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Este email já está em uso.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Formato de email inválido.';
            } else if (error.message.includes("auth/invalid-api-key")) {
                errorMessage = "Erro de API Key do Firebase. Verifique seu auth.js!";
            }
            registerAuthMessage.textContent = errorMessage;
        }
    });
});
