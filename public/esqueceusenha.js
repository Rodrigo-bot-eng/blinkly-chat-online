const sendCodeBtn = document.getElementById("sendCodeBtn");
const alertBox = document.getElementById("alertBox");
const codeSection = document.getElementById("codeSection");
const codeInput = document.getElementById("codeInput");
const verifyBtn = document.getElementById("verifyBtn");

let generatedCode = "";
let codeExpirationTimer;

// Evento de clique no botão "Enviar Código"
sendCodeBtn.addEventListener("click", function() {
    const email = document.getElementById("email").value.trim();

    if (!email) {
        alertBox.textContent = "Por favor, insira um e-mail válido.";
        alertBox.style.color = "red";
        return;
    }

    // Gera código aleatório de 6 dígitos
    generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Exibe mensagem de sucesso
    alertBox.textContent = `Código enviado com sucesso para ${email}! O código é válido por 4 minutos.`;
    alertBox.style.color = "green";

    // Mostra a seção para inserir o código
    codeSection.style.display = "block";

    // Define timer para expiração do código
    clearTimeout(codeExpirationTimer);
    codeExpirationTimer = setTimeout(() => {
        generatedCode = "";
        alertBox.textContent = "O código expirou. Solicite um novo código.";
        alertBox.style.color = "orange";
    }, 4 * 60 * 1000);
});

// Evento de clique no botão "Verificar Código"
verifyBtn.addEventListener("click", function() {
    const userCode = codeInput.value.trim();

    if (!userCode) return;

    if (userCode === generatedCode) {
        alertBox.textContent = "Código válido! Agora você pode redefinir sua senha.";
        alertBox.style.color = "green";
        codeSection.style.display = "none";
    } else {
        alertBox.textContent = "Código inválido. Tente novamente.";
        alertBox.style.color = "red";
    }
});
