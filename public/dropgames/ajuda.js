// Acordeão FAQ - abrir/fechar perguntas com aria-expanded e aria-hidden
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.setAttribute('aria-expanded', 'false');
  const answer = btn.parentElement.querySelector('.faq-answer');
  answer.setAttribute('aria-hidden', 'true');

  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    answer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });
});

// Busca FAQ
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const faqs = document.querySelectorAll('.faq-item');

  faqs.forEach(faq => {
    const questionText = faq.querySelector('.faq-question').textContent.toLowerCase();
    const answerText = faq.querySelector('.faq-answer').textContent.toLowerCase();

    if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
      faq.style.display = '';
    } else {
      faq.style.display = 'none';
    }
  });
});

// Modal contato
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');
const contactForm = document.getElementById('contactForm');
const contactMsg = document.getElementById('contactMsg');

contactBtn.addEventListener('click', () => {
  contactModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // trava scroll fundo
  contactMsg.textContent = '';
  contactForm.reset();
  contactForm.querySelector('input').focus();
});

closeModal.addEventListener('click', () => {
  contactModal.classList.add('hidden');
  document.body.style.overflow = '';
  contactBtn.focus(); // devolve foco ao botão abrir modal
});

// Fecha modal clicando fora do conteúdo
contactModal.addEventListener('click', e => {
  if (e.target === contactModal) {
    contactModal.classList.add('hidden');
    document.body.style.overflow = '';
    contactBtn.focus();
  }
});

// Fecha modal com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && !contactModal.classList.contains('hidden')) {
    contactModal.classList.add('hidden');
    document.body.style.overflow = '';
    contactBtn.focus();
  }
});

// Simula envio do formulário
contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = contactForm.contactName.value.trim();
  const email = contactForm.contactEmail.value.trim();
  const message = contactForm.contactMessage.value.trim();

  if (!name || !email || !message) {
    contactMsg.textContent = 'Por favor, preencha todos os campos.';
    contactMsg.style.color = '#ff4444';
    return;
  }

  contactMsg.style.color = '#00ffe0';
  contactMsg.textContent = 'Enviando mensagem...';

  // Simula delay de envio
  setTimeout(() => {
    contactMsg.textContent = 'Mensagem enviada com sucesso! Responderemos em breve.';
    contactForm.reset();

    setTimeout(() => {
      contactMsg.textContent = '';
    }, 5000);
  }, 1800);
});
