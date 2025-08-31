import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function UltraStore() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--mx", x.toString());
      el.style.setProperty("--my", y.toString());
    };
    el.addEventListener("mousemove", handleMouse);
    return () => el.removeEventListener("mousemove", handleMouse);
  }, []);

  const categories = [
    {
      id: "games",
      title: "Games",
      desc: "Lançamentos, clássicos e edições especiais.",
      badge: "Novidades",
      image: "https://picsum.photos/seed/games/1200/800",
      items: [
        { name: "Cyber Drift X", price: "R$ 249,90" },
        { name: "Myth Realms", price: "R$ 199,90" },
        { name: "Neon Tactics", price: "R$ 149,90" },
        { name: "Stellar Quest", price: "R$ 299,90" },
      ],
    },
    {
      id: "fashion",
      title: "Roupas",
      desc: "Streetwear, techwear e coleções cápsula.",
      badge: "Coleção",
      image: "https://picsum.photos/seed/fashion/1200/800",
      items: [
        { name: "Jaqueta NeoFlux", price: "R$ 499,90" },
        { name: "Hoodie Prisma", price: "R$ 299,90" },
        { name: "Cargo Spectra", price: "R$ 269,90" },
        { name: "T-Shirt Aurora", price: "R$ 129,90" },
      ],
    },
    {
      id: "acessories",
      title: "Acessórios",
      desc: "Headsets, teclados, óculos e mais.",
      badge: "Populares",
      image: "https://picsum.photos/seed/acess/1200/800",
      items: [
        { name: "Headset Ion", price: "R$ 399,90" },
        { name: "Teclado Lumina", price: "R$ 349,90" },
        { name: "Óculos Vibe", price: "R$ 219,90" },
        { name: "Mouse Vector", price: "R$ 189,90" },
      ],
    },
  ];

  return (
    <div ref={rootRef} className="min-h-screen w-full text-white bg-black/95 overflow-x-hidden">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-xl bg-white/10 ring-2 ring-fuchsia-500/50 shadow-[0_0_24px_rgba(236,72,153,.45)] animate-pulse" />
            <span className="text-lg font-bold tracking-wider group-hover:tracking-[.2em] transition-all">
              ULTRA<span className="text-fuchsia-400">STORE</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="gamesexplorar.html" className="nav-link">Games</a>
            <a href="roupasblinkly.html" className="nav-link">Roupas</a>
            <a href="#acessories" className="nav-link">Acessórios</a>
            <a href="#ofertas" className="nav-link">Ofertas</a>
            <a href="contatoblinkly.html" className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 transition-all shadow-lg shadow-fuchsia-500/10">
              Contato
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-24 md:py-32 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Sua loja multiuniverso com
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-violet-400 animate-shimmer">
                efeitos insanos & experiência cinematográfica
              </span>
            </h1>
            <p className="mt-5 text-white/80 max-w-prose">
              Um ecossistema onde games, roupas e acessórios se encontram com animações
              responsivas, microinterações e navegação fluida. Cada clique vira uma cena.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="gamesexplorar.html" className="btn-primary">Explorar Games</a>
              <a href="roupasblinkly.html" className="btn-ghost">Ver Roupas</a>
              <a href="#acessories" className="btn-ghost">Acessórios</a>
            </div>
          </div>
        </div>
      </section>

      {/* CARROSSEL 3D CATEGORIAS */}
      <section id="categorias" className="relative py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Explore os universos
          </h2>

          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="py-10"
          >
            {categories.map((cat) => (
              <SwiperSlide
                key={cat.id}
                className="w-[300px] md:w-[350px] lg:w-[400px] rounded-2xl overflow-hidden shadow-lg bg-white/5 border border-white/10 backdrop-blur transition-transform duration-300 hover:scale-105"
              >
                <img src={cat.image} alt={cat.title} className="w-full h-60 object-cover" />
                <div className="p-4">
                  <span className="text-xs uppercase text-fuchsia-400">{cat.badge}</span>
                  <h3 className="text-xl font-bold mt-1">{cat.title}</h3>
                  <p className="text-white/70 text-sm mt-1">{cat.desc}</p>
                  <ul className="mt-3 space-y-1 text-sm text-white/80">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="text-fuchsia-400">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="text-lg font-bold">ULTRASTORE</div>
            <p className="text-white/70 mt-2">A loja onde cada categoria é um universo. Visual futurista, experiência sem atrito.</p>
          </div>
          <div>
            <div className="font-semibold mb-2">Categorias</div>
            <ul className="space-y-1 text-white/70">
              <li><a href="gamesexplorar.html" className="hover:text-white">Games</a></li>
              <li><a href="roupasblinkly.html" className="hover:text-white">Roupas</a></li>
              <li><a href="#acessories" className="hover:text-white">Acessórios</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Suporte</div>
            <ul className="space-y-1 text-white/70">
              <li><a href="suportblinkly.html" className="hover:text-white">Atendimento</a></li>
              <li><a href="suportblinkly.html" className="hover:text-white">Trocas & Devoluções</a></li>
              <li><a href="suportblinkly.html" className="hover:text-white">Frete</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Newsletter</div>
            <div className="flex gap-2">
              <input placeholder="Seu e-mail" className="w-full px-3 py-2 rounded-xl bg-white/10 ring-1 ring-white/15 focus:outline-none focus:ring-white/40 placeholder:text-white/40" />
              <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20">OK</button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 text-xs text-white/60 py-4 text-center">
          © {new Date().getFullYear()} UltraStore. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

function Dot() {
  return (
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/60 shadow-[0_0_12px_rgba(255,255,255,.5)]" />
  );
}
