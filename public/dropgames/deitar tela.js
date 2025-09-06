// Função para detectar orientação e mostrar mensagem
function checkOrientation() {
  if(window.innerHeight > window.innerWidth) {
    // Tela em modo retrato
    document.getElementById('rotateMsg').style.display = 'flex';
  } else {
    document.getElementById('rotateMsg').style.display = 'none';
  }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);

// Forçar orientação paisagem via API Screen Orientation
document.getElementById('rotateBtn').addEventListener('click', () => {
  if(screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape').catch(() => {
      alert('Não foi possível forçar a rotação. Por favor, gire o dispositivo manualmente.');
    });
  } else {
    alert('Seu navegador não suporta bloqueio de orientação. Por favor, gire o dispositivo manualmente.');
  }
});
