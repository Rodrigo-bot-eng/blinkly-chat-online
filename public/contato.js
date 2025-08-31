function voltarFeed() {
  window.location.href = "feed.html";
}

// contatos simulados
const contatos = [
  { nome: "+55 62 9452-7532 (você)", status: "Mensagens para mim", avatar: "https://via.placeholder.com/42/4db8ff/FFFFFF?text=R" },
  { nome: "..", status: "", avatar: "https://via.placeholder.com/42/ff80bf/FFFFFF?text=.." },
  { nome: "…1", status: "Nossas dúvidas são traidoras...", avatar: "https://via.placeholder.com/42/222/FFFFFF?text=1" },
  { nome: "𓆩🦊𓆪™", status: "🔥", avatar: "https://via.placeholder.com/42/e91e63/FFFFFF?text=🦊" },
  { nome: "Talvez", status: "", avatar: "https://via.placeholder.com/42/4db8ff/FFFFFF?text=T" },
  { nome: "+55 75 9900-8448", status: "", avatar: "https://via.placeholder.com/42/111/FFFFFF?text=+" },
  { nome: "Alice Vida", status: "Olá! Eu estou usando o WhatsApp.", avatar: "https://via.placeholder.com/42/ff80bf/FFFFFF?text=A" },
  { nome: "Henrick", status: "", avatar: "https://via.placeholder.com/42/1c1c6e/FFFFFF?text=H" },
  { nome: "Cleidson", status: "❤️⚽", avatar: "https://via.placeholder.com/42/0d0d0d/FFFFFF?text=C" }
];

function carregarContatos() {
  const lista = document.getElementById("lista-contatos");

  contatos.forEach(c => {
    const div = document.createElement("div");
    div.classList.add("contato-item");

    div.innerHTML = `
      <img src="${c.avatar}" class="contato-avatar">
      <div class="contato-info">
        <span class="contato-nome">${c.nome}</span>
        <span class="contato-status">${c.status}</span>
      </div>
    `;

    lista.appendChild(div);
  });
}

window.onload = carregarContatos;
