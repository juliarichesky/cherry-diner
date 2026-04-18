import { Link } from "react-router-dom";
import heroBg from "../../assets/images/backgrounds/home-header.png";
import logoRecipes from "../../assets/images/logos/logo.png";
import { useState } from "react";

const HomeHero = () => {
  // estado para guardar qual aba esta ativa e mover o fundo vermelho
  const [activeTab, setActiveTab] = useState("explore");

  return (
    // trocado de section para header para melhor semantica (secao principal do topo)
    <header
      className="relative w-full min-h-[100svh] md:min-h-[600px] md:h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden bg-cover bg-center pt-4 pb-48 md:py-0"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* gradiente escuro no topo do mobile e na esquerda no pc */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf8f1]/90 via-[#fdf8f1]/50 to-transparent md:bg-gradient-to-r md:from-[#fdf8f1]/90 md:via-[#fdf8f1]/50 md:to-transparent"></div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 sm:px-8 md:px-10 w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        {/* coluna da esquerda: engloba textos e botoes de navegação */}
        <div className="w-full md:w-[40%] flex flex-col items-center md:items-start text-center md:text-left z-20">
          <h1
            className="text-[#ca4952] mb-3 md:mb-6 drop-shadow-sm leading-[1.1] md:leading-[1.05] text-[2.4rem] sm:text-[2.8rem] md:text-[2.6rem] lg:text-[4rem]"
            style={{
              fontFamily: "'Comfortaa', serif",
              fontWeight: "700",
              letterSpacing: "-0.02em",
            }}
          >
            Receitas com <br className="hidden md:block" />
            sabor de Nostalgia
          </h1>

          <p className="text-[#5c3d2e] text-sm sm:text-base md:text-lg mb-6 md:mb-10 max-w-[320px] md:max-w-[400px] leading-relaxed opacity-90">
            Descubra os clássicos dos anos 50 com um toque moderno.
          </p>

          {/* botoes de navegação dentro de uma tag nav por semantica */}
          <nav
            className="relative grid grid-cols-2 bg-[#f3eae0] p-1.5 rounded-full shadow-md w-full max-w-[100%] sm:max-w-[360px] md:max-w-[400px]"
            onMouseLeave={() => setActiveTab("explore")}
            aria-label="navegação principal do hero"
          >
            {/* fundo deslizante (slider) */}
            <div
              className="absolute top-1.5 bottom-1.5 left-1.5 right-1.5 pointer-events-none"
              aria-hidden="true"
            >
              <div
                className={`h-full w-[calc(50%-3px)] rounded-full transition-transform duration-500 ease-out ${
                  activeTab === "explore"
                    ? "translate-x-0"
                    : "translate-x-[calc(100%+6px)]"
                }`}
                style={{
                  background:
                    "linear-gradient(180deg, #ff6b6b 0%, #d13a3a 70%, #a82828 100%)",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-white/80 opacity-60 rounded-full"></span>
              </div>
            </div>

            {/* link 1: explorar receitas */}
            <Link
              to="/receitas"
              onMouseEnter={() => setActiveTab("explore")}
              className={`relative z-10 flex justify-center items-center px-1 py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-md lg:text-lg whitespace-nowrap transition-colors duration-500 ${
                activeTab === "explore"
                  ? "text-white"
                  : "text-[#6b4a3a] hover:text-[#d13a3a]"
              }`}
            >
              Explorar receitas
            </Link>

            {/* link 2: ver categorias */}
            <Link
              to="/receitas"
              onMouseEnter={() => setActiveTab("ver_receitas")}
              className={`relative z-10 flex justify-center items-center gap-1.5 md:gap-2 px-1 py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-md lg:text-lg whitespace-nowrap transition-colors duration-500 ${
                activeTab === "ver_receitas"
                  ? "text-white"
                  : "text-[#6b4a3a] hover:text-[#d13a3a]"
              }`}
            >
              <span
                className={`transition-all duration-500 ${
                  activeTab === "ver_receitas" ? "brightness-0 invert" : ""
                }`}
                aria-hidden="true"
              >
                🍒
              </span>
              Ver categorias
            </Link>
          </nav>
        </div>

        {/* coluna da direita: logo do hero dentro de uma tag figure */}
        <div className="w-full md:w-[60%] flex justify-center md:justify-end relative z-10 mt-6 md:mt-0">
          <figure className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[480px] lg:max-w-[750px]">
            {/* efeito de brilho (glow) */}
            <div
              className="absolute inset-0 bg-white/40 blur-[80px] md:blur-[100px] rounded-full"
              aria-hidden="true"
            ></div>
            <img
              src={logoRecipes}
              alt="Cherry Diner Logo"
              className="relative z-10 w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
            />
          </figure>
        </div>
      </div>
    </header>
  );
};

export default HomeHero;
