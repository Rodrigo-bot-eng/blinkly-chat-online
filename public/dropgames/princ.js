// Partículas de fundo
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 60 },
    "color": { "value": "#00ffe0" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.6 },
    "size": { "value": 4 },
    "move": { "enable": true, "speed": 2 }
  }
});

// Modo escuro/claro
const themeBtn = document.getElementById("themeBtn");

const sunIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 6px;">
  <circle cx="12" cy="12" r="5" stroke="#FFD700" stroke-width="2" fill="none"/>
  <line x1="12" y1="1" x2="12" y2="4" stroke="#FFD700" stroke-width="2"/>
  <line x1="12" y1="20" x2="12" y2="23" stroke="#FFD700" stroke-width="2"/>
  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="#FFD700" stroke-width="2"/>
  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="#FFD700" stroke-width="2"/>
  <line x1="1" y1="12" x2="4" y2="12" stroke="#FFD700" stroke-width="2"/>
  <line x1="20" y1="12" x2="23" y2="12" stroke="#FFD700" stroke-width="2"/>
  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="#FFD700" stroke-width="2"/>
  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="#FFD700" stroke-width="2"/>
</svg>`;

const moonIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#B0C4DE" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 6px;">
  <path d="M21 12.79A9 9 0 0112.21 3c-.27 0-.54 0-.8.05a7 7 0 108.73 8.73c.04-.26.05-.53.05-.99z" stroke="#B0C4DE" stroke-width="2" fill="none"/>
</svg>`;

themeBtn.addEventListener("click", () => {
  const body = document.body;
  const isDark = body.classList.contains("dark-mode");
  body.classList.toggle("dark-mode", !isDark);
  body.classList.toggle("light-mode", isDark);
  
  if (isDark) {
    themeBtn.innerHTML = sunIcon + "Modo Claro";
  } else {
    themeBtn.innerHTML = moonIcon + "Modo Escuro";
  }
});

// Validação e login
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberMe = document.getElementById("rememberMe");
  const loginMsg = document.getElementById("loginMsg");

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  const savedEmail = localStorage.getItem("gameDropEmail");
  if (savedEmail) {
    emailInput.value = savedEmail;
    rememberMe.checked = true;
  }

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    emailError.textContent = "";
    passwordError.textContent = "";
    loginMsg.textContent = "";

    let valid = true;

    if (!email.includes("@") || email.length < 5) {
      emailError.textContent = "Digite um e-mail válido.";
      valid = false;
    }

    if (password.length < 4) {
      passwordError.textContent = "A senha deve ter pelo menos 4 caracteres.";
      valid = false;
    }

    if (!valid) return;

    if (rememberMe.checked) {
      localStorage.setItem("gameDropEmail", email);
    } else {
      localStorage.removeItem("gameDropEmail");
    }

    loginMsg.textContent = "Login realizado com sucesso! Redirecionando...";

    setTimeout(() => {
      window.location.href = "dropgames.html"; // Próxima tela
    }, 1500);
  });
});
