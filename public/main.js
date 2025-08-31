// Elementos da modal e controle
const paymentModal = document.getElementById("paymentModal");
const closeModal = document.getElementById("closeModal");
const payButton = document.getElementById("payButton");
const gameTitleSpan = document.getElementById("gameTitle");
const paymentMethodsDiv = document.getElementById("paymentMethods");
const pixQRCodeCanvas = document.getElementById("pixQRCode");
const pixKeySpan = document.getElementById("pixKey");
const copyPixKeyBtn = document.getElementById("copyPixKeyBtn");
const modalMessageP = document.getElementById("modalMessage");

let currentGameToPlay = null;

// Valor fixo e chave PIX
const FIXED_PIX_KEY = "00020101021126890014br.gov.bcb.pix0136d5ad931d-a78e-411c-910b-3a5d696258aa0227 Plano escolhido [30 DIAS ]520400005303986540535.875802BR5914RODRIGO VIEIRA6008TRINDADE62070503***63044822";
const FIXED_AMOUNT = "35.87";

// Função para gerar o payload do QR Code PIX (simplificado)
function generatePixPayload(pixKey, amount = FIXED_AMOUNT) {
  // Nota: Esse payload está simplificado para demo, para uso real recomendo libs específicas de PIX.
  // O valor precisa vir com vírgula ou ponto? Normalmente usa vírgula no Brasil para PIX, mas pode variar.
  // Ajustando para usar vírgula:
  const valorFormatado = amount.replace(".", ",");
  return `00020126580014BR.GOV.BCB.PIX0114${pixKey}520400005303986540${valorFormatado}5802BR5925Game Drop - Pagamento 6009Sao Paulo6304`;
}

// Função para renderizar os jogos no container
function renderGames(gamesList) {
  const container = document.getElementById("gamesContainer");
  container.innerHTML = "";

  if (gamesList.length === 0) {
    container.innerHTML = "<p>Nenhum jogo encontrado.</p>";
    return;
  }

  gamesList.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <img src="${game.image}" alt="${game.title}">
      <div class="info">
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        <button class="play-button" data-id="${game.id}">▶ Jogar</button>
      </div>
    `;

    container.appendChild(card);
  });

  // Evento dos botões Jogar — abre modal para pagamento
  document.querySelectorAll(".play-button").forEach(button => {
    button.addEventListener("click", () => {
      const gameId = button.getAttribute("data-id");
      currentGameToPlay = games.find(g => g.id == gameId);
      if (!currentGameToPlay) return;

      gameTitleSpan.textContent = currentGameToPlay.title;

      paymentMethodsDiv.style.display = "none";
      payButton.style.display = "inline-block";

      // Mensagem atualizada com valor fixo
      modalMessageP.textContent = "Para usar o emulador da nuvem de jogos, é necessário realizar o pagamento de R$ 35,87.";

      paymentModal.style.display = "flex";
    });
  });
}

// Exibir notificação
function notify(message, timeout = 3000) {
  const notifArea = document.getElementById("notifications");
  notifArea.textContent = message;
  notifArea.style.opacity = 1;
  setTimeout(() => {
    notifArea.style.opacity = 0;
  }, timeout);
}

// Alternar tema
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("themeToggle");

  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    btn.textContent = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    btn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
}

// Aplicar tema salvo
function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  const body = document.body;
  const btn = document.getElementById("themeToggle");

  if (saved === "light") {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    btn.textContent = "☀️";
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    btn.textContent = "🌙";
  }
}

// Mostrar loading
function showLoading(show = true) {
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.display = show ? "block" : "none";
}

// Filtro por categoria e busca
function filterGames() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;

  let filtered = games;

  if (category !== "todos") {
    filtered = filtered.filter(g => g.category === category);
  }

  if (searchText) {
    filtered = filtered.filter(g => g.title.toLowerCase().includes(searchText));
  }

  return filtered;
}

// Debounce para busca
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Inicialização
window.addEventListener("load", () => {
  applySavedTheme();

  const themeBtn = document.getElementById("themeToggle");
  themeBtn.addEventListener("click", toggleTheme);

  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const reloadBtn = document.getElementById("reloadGames");

  const updateFilteredGames = debounce(() => {
    showLoading(true);
    setTimeout(() => {
      renderGames(filterGames());
      showLoading(false);
    }, 300);
  }, 300);

  searchInput.addEventListener("input", updateFilteredGames);
  categoryFilter.addEventListener("change", updateFilteredGames);

  reloadBtn.addEventListener("click", () => {
    showLoading(true);
    setTimeout(() => {
      renderGames(games);
      notify("Lista de jogos atualizada!");
      showLoading(false);
    }, 500);
  });

  showLoading(true);
  setTimeout(() => {
    renderGames(games);
    showLoading(false);
  }, 3000);
});

// Fecha modal
closeModal.addEventListener("click", () => {
  paymentModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === paymentModal) {
    paymentModal.style.display = "none";
  }
});

// Copiar chave PIX
copyPixKeyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(FIXED_PIX_KEY).then(() => {
    notify("Chave PIX copiada para a área de transferência!");
  }).catch(() => {
    notify("Falha ao copiar chave PIX.");
  });
});

// Clique em pagar - gera o QR Code PIX com a chave fixa e valor fixo
payButton.addEventListener("click", () => {
  payButton.style.display = "none";

  pixKeySpan.textContent = FIXED_PIX_KEY;
  const payload = generatePixPayload(FIXED_PIX_KEY, FIXED_AMOUNT);

  QRCode.toCanvas(pixQRCodeCanvas, payload, { width: 200 }, function (error) {
    if (error) console.error(error);
  });

  paymentMethodsDiv.style.display = "block";
  modalMessageP.textContent = "Escaneie o QR Code ou copie a chave PIX para realizar o pagamento de R$ 35,87.";
});

// ===== PERFIL
const userProfile = document.getElementById("userProfile");
const profileModal = document.getElementById("profileModal");
const closeProfileModal = document.getElementById("closeProfileModal");
const usernameDisplay = document.getElementById("usernameDisplay");
const avatarImage = document.getElementById("avatarImage");
const usernameInput = document.getElementById("usernameInput");
const avatarInput = document.getElementById("avatarInput");
const saveProfileBtn = document.getElementById("saveProfileBtn");

userProfile.addEventListener("click", () => {
  usernameInput.value = localStorage.getItem("username") || "";
  profileModal.style.display = "flex";
});

closeProfileModal.addEventListener("click", () => {
  profileModal.style.display = "none";
});

saveProfileBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username) {
    localStorage.setItem("username", username);
    usernameDisplay.textContent = username;
  }

  const file = avatarInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("avatarImage", reader.result);
      avatarImage.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  profileModal.style.display = "none";
  notify("Perfil atualizado!");
});

window.addEventListener("load", () => {
  const savedName = localStorage.getItem("username");
  const savedAvatar = localStorage.getItem("avatarImage");

  if (savedName) usernameDisplay.textContent = savedName;
  if (savedAvatar) avatarImage.src = savedAvatar;
});

// ===== ÁUDIO NO CLIQUE
const video = document.getElementById('backgroundVideo');

function ativarAudio() {
  if (video.muted) {
    video.muted = false;
    video.volume = 0.3;
    video.play();
    document.body.removeEventListener('click', ativarAudio);
  }
}

document.body.addEventListener('click', ativarAudio);

// ===== FPS FALSO
function startFakeFPS() {
  let fpsCounter = document.getElementById('fpsCounter');
  if (!fpsCounter) {
    fpsCounter = document.createElement('div');
    fpsCounter.id = 'fpsCounter';
    fpsCounter.style = `
      position: fixed;
      top: 10px;
      right: 10px;
      background-color: rgba(0, 255, 0, 0.2);
      border: 1px solid #00ff00;
      color: #00ff00;
      padding: 6px 10px;
      border-radius: 8px;
      font-weight: bold;
      font-family: monospace;
      font-size: 14px;
      z-index: 9999;
      animation: pulseFPS 1.5s infinite;
      user-select: none;
    `;
    document.body.appendChild(fpsCounter);
  }

  fpsCounter.style.display = 'block';
  setInterval(() => {
    const fakeFPS = Math.floor(Math.random() * 15) + 55;
    fpsCounter.innerText = `FPS: ${fakeFPS}`;
  }, 800);
}

function stopFakeFPS() {
  const fpsCounter = document.getElementById('fpsCounter');
  if (fpsCounter) fpsCounter.style.display = 'none';
}

// ===== CONFIGURAÇÕES
function saveSettings(settings) {
  localStorage.setItem('gameDropSettings', JSON.stringify(settings));
}

function loadSettings() {
  const stored = localStorage.getItem('gameDropSettings');
  if (stored) return JSON.parse(stored);
  return {
    darkMode: false,
    notifications: true,
    autoQuality: true,
    showFPS: false,
    lowLatency: false,
    autoLogin: false,
    cloudSave: false
  };
}

function applySettings(settings) {
  if (settings.darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  if (settings.showFPS) {
    startFakeFPS();
  } else {
    stopFakeFPS();
  }
}

function initSettingsPage() {
  const settings = loadSettings();
  document.getElementById('darkModeToggle').checked = settings.darkMode;
  document.getElementById('notificationsToggle').checked = settings.notifications;
  document.getElementById('autoQualityToggle').checked = settings.autoQuality;
  document.getElementById('showFPS').checked = settings.showFPS;
  document.getElementById('lowLatencyToggle').checked = settings.lowLatency;
  document.getElementById('autoLogin').checked = settings.autoLogin;
  document.getElementById('cloudSave').checked = settings.cloudSave;

  document.getElementById('saveBtn').addEventListener('click', () => {
    const newSettings = {
      darkMode: document.getElementById('darkModeToggle').checked,
      notifications: document.getElementById('notificationsToggle').checked,
      autoQuality: document.getElementById('autoQualityToggle').checked,
      showFPS: document.getElementById('showFPS').checked,
      lowLatency: document.getElementById('lowLatencyToggle').checked,
      autoLogin: document.getElementById('autoLogin').checked,
      cloudSave: document.getElementById('cloudSave').checked
    };
    saveSettings(newSettings);
    applySettings(newSettings);

    if (document.referrer) {
      window.location.href = document.referrer;
    } else {
      window.location.href = 'index.html';
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const settings = loadSettings();
  applySettings(settings);
  if (document.getElementById('saveBtn')) {
    initSettingsPage();
  }
});
