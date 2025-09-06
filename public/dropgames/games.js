
const games = [
  {
    id: 1,
    title: "Forza Horizon 5",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg",
    description: "Explore o México em um mundo aberto vibrante com carros incríveis.",
    category: "corrida"
  },
  {
    id: 2,
    title: "FIFA 24",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg",
    description: "Experiência completa de futebol com modos online e carreira.",
    category: "esporte"
  },
  {
    id: 3,
    title: "Call of Duty: Warzone",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1962663/header.jpg",
    description: "Battle Royale gratuito com tiroteios intensos e mapa dinâmico.",
    category: "fps"
  },
  {
    id: 4,
    title: "Red Dead Redemption 2",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    description: "Explore o Velho Oeste em um mundo detalhado e imersivo.",
    category: "aventura"
  },
  {
    id: 5,
    title: "Minecraft",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/224760/header.jpg",
    description: "Construa, explore e sobreviva em um mundo de blocos infinito.",
    category: "simulação"
  },
  {
    id: 6,
    title: "Cyberpunk 2077",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    description: "Aventure-se por Night City em um RPG futurista imersivo.",
    category: "rpg"
  },
  {
    id: 7,
    title: "GTA V",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
    description: "Experiência de mundo aberto com ação, história e caos urbano.",
    category: "ação"
  },
  {
    id: 8,
    title: "Halo Infinite",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg",
    description: "A batalha continua com Master Chief em uma nova era de combate.",
    category: "fps"
  },
  {
    id: 9,
    title: "Assassin's Creed Valhalla",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg",
    description: "Viva como um viking em uma jornada épica pela Inglaterra medieval.",
    category: "aventura"
  },
  {
    id: 10,
    title: "Resident Evil 4 Remake",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg",
    description: "Um clássico do terror reinventado com gráficos e gameplay modernos.",
    category: "terror"
  },
  {
    id: 11,
    title: "Elden Ring",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    description: "RPG de ação em mundo aberto com desafios intensos e narrativa profunda.",
    category: "rpg"
  },
  {
    id: 12,
    title: "The Witcher 3: Wild Hunt",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    description: "Aventura épica como Geralt de Rívia em um mundo vasto e cheio de escolhas.",
    category: "rpg"
  },
  {
    id: 13,
    title: "Apex Legends",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg",
    description: "Battle Royale dinâmico com personagens únicos e muita estratégia.",
    category: "fps"
  },
  {
    id: 14,
    title: "Valorant",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    description: "FPS tático com personagens e habilidades especiais em partidas rápidas.",
    category: "fps"
  },
  {
    id: 15,
    title: "League of Legends",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/335120/header.jpg",
    description: "MOBA popular com campeões únicos e partidas competitivas online.",
    category: "moba"
  },
  {
    id: 16,
    title: "Overwatch 2",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1862120/header.jpg",
    description: "FPS em equipe com heróis diversos e muita ação tática.",
    category: "fps"
  },
  {
    id: 17,
    title: "Dota 2",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg",
    description: "MOBA clássico com partidas estratégicas e campeões únicos.",
    category: "moba"
  },
  {
    id: 18,
    title: "Rainbow Six Siege",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg",
    description: "FPS tático com destruição do ambiente e jogo em equipe intenso.",
    category: "fps"
  },
  {
    id: 19,
    title: "Monster Hunter: World",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/582010/header.jpg",
    description: "Caça a monstros gigantes em um mundo aberto cooperativo.",
    category: "aventura"
  },
  {
    id: 20,
    title: "Dark Souls III",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg",
    description: "RPG de ação desafiador com ambientação sombria e combate tenso.",
    category: "rpg"
  },
  {
    id: 21,
    title: "Rocket League",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg",
    description: "Futebol com carros acelerados em partidas eletrizantes.",
    category: "esporte"
  },
  {
    id: 22,
    title: "Sea of Thieves",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/header.jpg",
    description: "Aventura pirata cooperativa em um vasto mundo marítimo.",
    category: "aventura"
  },
  {
    id: 23,
    title: "Among Us",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
    description: "Jogo de dedução social em que tripulantes tentam descobrir o impostor.",
    category: "multiplayer"
  },
  {
    id: 24,
    title: "Terraria",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg",
    description: "Aventura 2D com construção, exploração e combate em mundos gerados.",
    category: "aventura"
  },
  {
    id: 25,
    title: "The Sims 4",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1222670/header.jpg",
    description: "Simulador de vida com criação e controle de personagens.",
    category: "simulação"
  },
  {
    id: 26,
    title: "Fall Guys",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/header.jpg",
    description: "Batalha de obstáculos divertida com até 60 jogadores online.",
    category: "multiplayer"
  },
  {
    id: 27,
    title: "God of War",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg",
    description: "Jornada épica de Kratos e Atreus na mitologia nórdica.",
    category: "ação"
  },
  {
    id: 28,
    title: "Death Stranding",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1190460/header.jpg",
    description: "Exploração e entrega em um mundo pós-apocalíptico misterioso.",
    category: "aventura"
  },
  {
    id: 29,
    title: "Battlefield 2042",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1517290/header.jpg",
    description: "FPS com batalhas gigantescas e ambiente dinâmico futurista.",
    category: "fps"
  },
  {
    id: 30,
    title: "Microsoft Flight Simulator",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/header.jpg",
    description: "Simulador de voo realista com mapas e aeronaves detalhadas.",
    category: "simulação"
  },
  {
    id: 31,
    title: "Portal 2",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg",
    description: "Puzzle inovador em primeira pessoa com física e portais.",
    category: "puzzle"
  },
  {
    id: 32,
    title: "Hades",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
    description: "Roguelike de ação com mitologia grega e narrativa cativante.",
    category: "ação"
  },
  {
    id: 33,
    title: "Dead by Daylight",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/header.jpg",
    description: "Jogo multiplayer de terror assimétrico com assassinos e sobreviventes.",
    category: "terror"
  },
  {
    id: 34,
    title: "Control",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/870780/header.jpg",
    description: "Ação sobrenatural em ambiente misterioso e cheio de segredos.",
    category: "ação"
  },
  {
    id: 35,
    title: "Subnautica",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/264710/header.jpg",
    description: "Sobrevivência em mundo subaquático alienígena.",
    category: "aventura"
  },
  {
    id: 36,
    title: "Cities: Skylines",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/255710/header.jpg",
    description: "Simulador de construção e gestão de cidades detalhado.",
    category: "simulação"
  },
  {
    id: 37,
    title: "The Elder Scrolls V: Skyrim",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/72850/header.jpg",
    description: "RPG épico em mundo aberto com muita exploração e magia.",
    category: "rpg"
  },
  {
    id: 38,
    title: "Among Trees",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1057960/header.jpg",
    description: "Sobrevivência relaxante em uma floresta vibrante e colorida.",
    category: "simulação"
  },
  {
    id: 39,
    title: "Cuphead",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/268910/header.jpg",
    description: "Run and gun com visual de desenho animado dos anos 30.",
    category: "ação"
  },
  {
    id: 40,
    title: "Slay the Spire",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/646570/header.jpg",
    description: "Deck-building rogue-like com combates estratégicos.",
    category: "estratégia"
  },
  {
    id: 41,
    title: "Hollow Knight",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg",
    description: "Metroidvania atmosférico com exploração e combate desafiador.",
    category: "ação"
  },
  {
    id: 42,
    title: "Terraria",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg",
    description: "Aventura 2D com construção, exploração e combate.",
    category: "aventura"
  },
  {
    id: 43,
    title: "Divinity: Original Sin 2",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/435150/header.jpg",
    description: "RPG tático com história profunda e multiplayer cooperativo.",
    category: "rpg"
  },
  {
    id: 44,
    title: "Minecraft Dungeons",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1324390/header.jpg",
    description: "Dungeon crawler inspirado em Minecraft com multiplayer local e online.",
    category: "ação"
  },
  {
    id: 45,
    title: "Sekiro: Shadows Die Twice",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg",
    description: "RPG de ação com combate rápido e estilo samurai.",
    category: "ação"
  },
  {
    id: 46,
    title: "No Man's Sky",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/header.jpg",
    description: "Exploração espacial em universo procedural infinito.",
    category: "aventura"
  },
  {
    id: 47,
    title: "Far Cry 6",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    description: "FPS em mundo aberto com ação intensa e narrativa envolvente.",
    category: "ação"
  },
  {
    id: 48,
    title: "ARK: Survival Evolved",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/346110/header.jpg",
    description: "Sobrevivência em mundo com dinossauros e construção.",
    category: "aventura"
  },
  {
    id: 49,
    title: "The Division 2",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/365590/header.jpg",
    description: "Shooter tático online em mundo aberto pós-apocalíptico.",
    category: "fps"
  },
  {
    id: 50,
    title: "Dead Cells",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/588650/header.jpg",
    description: "Roguelike de ação com combate rápido e níveis gerados aleatoriamente.",
    category: "ação"
  }
];

// A função para renderizar os jogos no container e aplicar filtros pode ser a mesma que você já tem.
// Se quiser, te envio também o main.js atualizado para combinar com isso.
