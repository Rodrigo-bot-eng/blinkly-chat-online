// =====================
// 1. Virar páginas (Next/Prev)
// =====================
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const pageId = btn.getAttribute('data-page');
    const page = document.getElementById(pageId);

    if (page.classList.contains('turn')) {
      page.classList.remove('turn');
      setTimeout(() => {
        page.style.zIndex = 2 - index;
      }, 500);
    } else {
      page.classList.add('turn');
      setTimeout(() => {
        page.style.zIndex = 2 + index;
      }, 500);
    }
  });
});

// =====================
// 2. Botão "Contact Me"
// =====================
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');

if (contactMeBtn) {
  contactMeBtn.addEventListener("click", () => {
    pages.forEach((page, index) => {
      setTimeout(() => {
        page.classList.add('turn');
        setTimeout(() => {
          page.style.zIndex = 20 + index;
        }, 500);
      }, (index + 1) * 200 + 100);
    });
  });
}

// =====================
// 3. Função auxiliar - Reverse Index
// =====================
let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
  pageNumber--;
  if (pageNumber < 0) {
    pageNumber = totalPages - 1;
  }
}

// =====================
// 4. Botão "Voltar ao Perfil"
// =====================
const backProfileBtn = document.querySelector('.back-profile');

if (backProfileBtn) {
  backProfileBtn.addEventListener("click", () => {
    pages.forEach((_, index) => {
      setTimeout(() => {
        reverseIndex();
        pages[pageNumber].classList.remove('turn');

        setTimeout(() => {
          reverseIndex();
          pages[pageNumber].style.zIndex = 10 + index;
        }, 500);
      }, (index + 1) * 200 + 100);
    });
  });
}

// =====================
// 5. Animação de abertura inicial
// =====================
const coverRight = document.querySelector('.cover.cover-right');

if (coverRight) {
  setTimeout(() => {
    coverRight.classList.add('turn');
  }, 2100);

  setTimeout(() => {
    coverRight.style.zIndex = -1;
  }, 2800);

  pages.forEach((_, index) => {
    setTimeout(() => {
      reverseIndex();
      pages[pageNumber].classList.remove('turn');

      setTimeout(() => {
        reverseIndex();
        pages[pageNumber].style.zIndex = 10 + index;
      }, 500);
    }, (index + 1) * 200 + 2100);
  });
}

// =====================
// 6. Botões Aceitar / Recusar
// =====================
const btnAceitar = document.getElementById("aceitar");
const btnRecusar = document.getElementById("recusar");

if (btnAceitar && btnRecusar) {
  // Aceitar → vai para o feed
  btnAceitar.addEventListener("click", () => {
    alert("🎉 Parabéns! Você está de acordo com as condições da plataforma.");
    window.location.href = "../feed.html";
  });

  // Recusar → bloqueia acesso
  btnRecusar.addEventListener("click", () => {
    document.body.innerHTML = `
      <div style="
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        height:100vh;
        background:#0d0d0f;
        color:#fff;
        font-family:sans-serif;
        text-align:center;
        padding: 1rem;
      ">
        <h1>🚫 Você não está pronto para usar nossa plataforma.</h1>
        <p>O acesso foi bloqueado.</p>
      </div>
    `;
  });
}
