// biblioteca.js

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("libraryGrid");

  const jogos = [
    {
      titulo: "Cyberpunk 2077",
      imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
      descricao: "Explore Night City em uma aventura futurista."
    },
    {
      titulo: "Red Dead Redemption 2",
      imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
      descricao: "Um épico do velho oeste com gráficos incríveis."
    },
    {
      titulo: "Forza Horizon 5",
      imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg",
      descricao: "Corridas intensas pelo México em mundo aberto."
    },
    {
      titulo: "FIFA 24",
      imagem: "https://cdn2.unrealengine.com/fifa-24-keyart-3840x2160-8e849f14e3a0.jpg",
      descricao: "O maior futebol do mundo agora na sua biblioteca."
    },
    {
      titulo: "Hogwarts Legacy",
      imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg",
      descricao: "Seja um bruxo no universo de Harry Potter."
    },
    {
      titulo: "GTA V",
      imagem: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
      descricao: "O clássico mundo aberto criminal e online."
    },
    {
      titulo: "Valorant",
      imagem: "https://cdn1.dotesports.com/wp-content/uploads/2022/04/04131106/valorant-2.jpg",
      descricao: "FPS tático com habilidades e combates estratégicos."
    },
    {
      titulo: "Fortnite",
      imagem: "https://cdn2.unrealengine.com/fortnite-og-key-art-1920x1080-1920x1080-37bdf60db9dc.jpg",
      descricao: "Battle Royale com construções, skins e eventos."
    },
    {
      titulo: "Minecraft",
      imagem: "https://cdn2.unrealengine.com/minecraft-1920x1080-f71c5702c03d.jpg",
      descricao: "Crie, explore e sobreviva em mundos infinitos."
    }
  ];

  jogos.forEach(jogo => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    card.innerHTML = `
      <img src="${jogo.imagem}" alt="${jogo.titulo}">
      <div class="game-info">
        <h3>${jogo.titulo}</h3>
        <p>${jogo.descricao}</p>
      </div>
    `;

    grid.appendChild(card);
  });
});
