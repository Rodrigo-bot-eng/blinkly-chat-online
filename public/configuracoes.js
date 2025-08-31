document.addEventListener('DOMContentLoaded', () => {
  // Sair direto para index.html
  const sairLink = document.querySelector('a[href="#sair"]');
  if (sairLink) {
    sairLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'index.html';
    });
  }

  // Modal para desconectar
  const desconectarLink = document.querySelector('a[href="#desconectar"]');
  const confirmModal = document.getElementById('confirmModal');
  const loadingModal = document.getElementById('loadingModal');
  const confirmBtn = document.getElementById('confirmBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  if (desconectarLink) {
    desconectarLink.addEventListener('click', (e) => {
      e.preventDefault();
      confirmModal.style.display = 'flex';
    });
  }

  cancelBtn.addEventListener('click', () => {
    confirmModal.style.display = 'none';
  });

  confirmBtn.addEventListener('click', () => {
    confirmModal.style.display = 'none';
    loadingModal.style.display = 'flex';

    setTimeout(() => {
      loadingModal.style.display = 'none';
      window.location.href = 'index.html'; // Mude a URL se quiser
    }, 3000);
  });
});



const showModal = (modal) => {
  modal.style.opacity = 0;       // começa transparente
  modal.style.display = 'flex';  // mostra
  setTimeout(() => {
    modal.style.opacity = 1;     // anima para opacidade total
  }, 10); // pequeno delay para aplicar o fade-in
};

const hideModal = (modal) => {
  modal.style.opacity = 0;  // começa fade-out
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300); // tempo igual à duração do fadeOut
};

confirmBtn.addEventListener('click', () => {
  hideModal(confirmModal);
  showModal(loadingModal);

  setTimeout(() => {
    hideModal(loadingModal);
    window.location.href = 'index.html';
  }, 3000);
});

cancelBtn.addEventListener('click', () => {
  hideModal(confirmModal);
});

desconectarLink.addEventListener('click', (e) => {
  e.preventDefault();
  showModal(confirmModal);
});











