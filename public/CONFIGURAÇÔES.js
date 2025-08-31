const showFPSToggle = document.getElementById('showFPS');
const fpsCounter = document.getElementById('fpsCounter');
let fpsInterval = null;

// Restaurar configurações salvas
window.addEventListener('DOMContentLoaded', () => {
  const settings = JSON.parse(localStorage.getItem('gameDropSettings')) || {};

  document.getElementById('darkModeToggle').checked = settings.darkMode || false;
  document.getElementById('notificationsToggle').checked = settings.notifications || false;
  document.getElementById('autoQualityToggle').checked = settings.autoQuality || false;
  document.getElementById('showFPS').checked = settings.showFPS || false;
  document.getElementById('lowLatencyToggle').checked = settings.lowLatency || false;
  document.getElementById('autoLogin').checked = settings.autoLogin || false;
  document.getElementById('cloudSave').checked = settings.cloudSave || false;

  if (settings.showFPS) {
    fpsCounter.style.display = 'block';
    startFakeFPS();
  }
});

// Ativar/desativar FPS visualmente
showFPSToggle.addEventListener('change', function () {
  if (this.checked) {
    fpsCounter.style.display = 'block';
    startFakeFPS();
  } else {
    fpsCounter.style.display = 'none';
    stopFakeFPS();
  }
});

function startFakeFPS() {
  fpsInterval = setInterval(() => {
    const fakeFPS = Math.floor(Math.random() * 15) + 55;
    fpsCounter.innerText = `FPS: ${fakeFPS}`;
  }, 800);
}

function stopFakeFPS() {
  clearInterval(fpsInterval);
}

// Salvar configurações e voltar para a página anterior
document.getElementById('saveBtn').addEventListener('click', () => {
  const settings = {
    darkMode: document.getElementById('darkModeToggle').checked,
    notifications: document.getElementById('notificationsToggle').checked,
    autoQuality: document.getElementById('autoQualityToggle').checked,
    showFPS: document.getElementById('showFPS').checked,
    lowLatency: document.getElementById('lowLatencyToggle').checked,
    autoLogin: document.getElementById('autoLogin').checked,
    cloudSave: document.getElementById('cloudSave').checked
  };

  localStorage.setItem('gameDropSettings', JSON.stringify(settings));

  // Feedback opcional (som ou notificação)
  // alert('Configurações salvas!');

  // Voltar para a página anterior
  window.history.back();
});



// Mostrar FPS se ativado
const settings = JSON.parse(localStorage.getItem('gameDropSettings')) || {};
if (settings.showFPS) {
  const fpsCounter = document.createElement('div');
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
  `;
  document.body.appendChild(fpsCounter);

  setInterval(() => {
    const fakeFPS = Math.floor(Math.random() * 15) + 55;
    fpsCounter.innerText = `FPS: ${fakeFPS}`;
  }, 800);
}
