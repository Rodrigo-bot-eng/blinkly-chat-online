window.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.getElementById('welcome-screen');

  // Após a animação do desenho (1s), espera 1s e depois esconde
  setTimeout(() => {
    welcomeScreen.classList.add('hidden');

    // Depois do fade (0.6s), remove do DOM para liberar o feed
    welcomeScreen.addEventListener('transitionend', () => {
      welcomeScreen.remove();
    });
  }, 2000); // 1s animação + 1s visível
});
