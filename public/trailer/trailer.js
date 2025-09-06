// Botão principal
document.getElementById("enterBtn").addEventListener("click", () => {
  document.querySelector(".novidades").scrollIntoView({ behavior: "smooth" });
});

// Modal
const modal = document.getElementById("videoModal");
const trailerVideo = document.getElementById("trailerVideo");
const cards = document.querySelectorAll(".card");
const closeBtn = document.querySelector(".close");

// Abrir modal com vídeo
cards.forEach(card => {
  card.addEventListener("click", () => {
    const videoSrc = card.getAttribute("data-video");
    trailerVideo.querySelector("source").src = videoSrc;
    trailerVideo.load();
    modal.style.display = "flex";
  });
});

// Fechar modal
closeBtn.addEventListener("click", () => {
  trailerVideo.pause();
  modal.style.display = "none";
});

// Fechar clicando fora do vídeo
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    trailerVideo.pause();
    modal.style.display = "none";
  }
});
