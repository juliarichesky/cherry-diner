import { Link } from "react-router-dom";
import heroBg from "../../assets/images/backgrounds/home-header.png";
import logoRecipes from "../../assets/images/logos/logo.png";
import { useState } from "react";

const HomeHero = () => {
  // estado para guardar qual aba esta ativa e mover o fundo vermelho
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <section
      className="relative w-full min-h-[100svh] md:min-h-[600px] md:h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden bg-cover bg-center pt-4 pb-48 md:py-0"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* gradiente escuro no topo do mobile para proteger o texto, e na esquerda no pc */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf8f1]/90 via-[#fdf8f1]/50 to-transparent md:bg-gradient-to-r md:from-[#fdf8f1]/90 md:via-[#fdf8f1]/50 md:to-transparent"></div>
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 sm:px-8 md:px-10 w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        {/* coluna da esquerda: engloba os textos e botoes */}
        <div className="w-full md:w-[40%] flex flex-col items-center md:items-start text-center md:text-left z-20">
          {/* titulo com tamanhos fixos para cada tela para nao estourar o layout */}
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

          {/* paragrafo com texto de apoio */}
          <p className="text-[#5c3d2e] text-sm sm:text-base md:text-lg mb-6 md:mb-10 max-w-[320px] md:max-w-[400px] leading-relaxed opacity-90">
            Descubra os clássicos dos anos 50 com um toque moderno.
          </p>

          {/* caixa cinza clara que agrupa os dois botoes */}
          <div
            // max-w-[100%] garante que nao vaze da tela caso o celular seja muito pequeno
            className="relative grid grid-cols-2 bg-[#f3eae0] p-1.5 rounded-full shadow-md w-full max-w-[100%] sm:max-w-[360px] md:max-w-[400px]"
            // se tirar o mouse da caixa, volta o fundo vermelho para o primeiro botao
            onMouseLeave={() => setActiveTab("explore")}
          >
            {/* essa div invisivel segura o retangulo vermelho que desliza */}
            <div className="absolute top-1.5 bottom-1.5 left-1.5 right-1.5 pointer-events-none">
              <div
                // translate-x empurra o retangulo vermelho pra direita quando muda a aba
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
                {/* luz interna branca para o botao parecer de acrilico */}
                <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-white/80 opacity-60 rounded-full"></span>
              </div>
            </div>

            {/* botao 1: explorar receitas */}
            <Link
              to="/receitas"
              // avisa ao estado que o mouse chegou no botao 1
              onMouseEnter={() => setActiveTab("explore")}
              // whitespace-nowrap proibe o texto de quebrar em duas linhas
              className={`relative z-10 flex justify-center items-center px-1 py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-md lg:text-lg whitespace-nowrap transition-colors duration-500 ${
                activeTab === "explore"
                  ? "text-white"
                  : "text-[#6b4a3a] hover:text-[#d13a3a]"
              }`}
            >
              Explorar receitas
            </Link>

            {/* botao 2: ver categorias */}
            <Link
              to="/receitas"
              // avisa ao estado que o mouse chegou no botao 2
              onMouseEnter={() => setActiveTab("ver_receitas")}
              className={`relative z-10 flex justify-center items-center gap-1.5 md:gap-2 px-1 py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-md lg:text-lg whitespace-nowrap transition-colors duration-500 ${
                activeTab === "ver_receitas"
                  ? "text-white"
                  : "text-[#6b4a3a] hover:text-[#d13a3a]"
              }`}
            >
              {/* usamos filtros de imagem para forçar o branco puro */}
              <span
                className={`transition-all duration-500 ${
                  activeTab === "ver_receitas" ? "brightness-0 invert" : ""
                }`}
              >
                🍒
              </span>
              Ver categorias
            </Link>
          </div>
        </div>

        {/* coluna da direita: segura a logo grande */}
        <div className="w-full md:w-[60%] flex justify-center md:justify-end relative z-10 mt-6 md:mt-0">
          {/* tamanhos variados para a logo, comecando em 300px no celular e indo ate 750px */}
          <div className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[480px] lg:max-w-[750px]">
            {/* o blur que cria a nuvem de luz branca iluminando a logo por tras */}
            <div className="absolute inset-0 bg-white/40 blur-[80px] md:blur-[100px] rounded-full"></div>
            <img
              src={logoRecipes}
              alt="Cherry Diner Logo"
              className="relative z-10 w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
