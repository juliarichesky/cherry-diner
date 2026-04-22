import { Link } from "react-router-dom";
import heroBg from "../../assets/images/backgrounds/home-header.png";
import logoRecipes from "../../assets/images/logos/logo.png";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const HomeHero = () => {
  const { texts } = useLanguage();
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <header
      /* configuracao de altura: min-h para mobile/tablet garante que o fundo acompanhe o conteudo. h fixa no desktop mantem a centralizacao. */
      className="relative w-full min-h-[calc(100vh-96px)] lg:h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden bg-cover bg-center pt-20 pb-20 lg:py-0"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* overlay de gradiente: garantindo o contraste. aria-hidden para ignorar elementos decorativos. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#fdf8f1]/90 via-[#fdf8f1]/50 to-transparent md:bg-gradient-to-r md:from-[#fdf8f1]/90 md:via-[#fdf8f1]/50 md:to-transparent"
        aria-hidden="true"
      ></div>

      {/* gradiente para tablet: ajuste visual especifico. */}
      <div
        className="absolute inset-0 hidden md:block lg:hidden bg-gradient-to-b from-[#fdf8f1]/95 via-[#fdf8f1]/70 to-transparent z-0"
        aria-hidden="true"
      ></div>

      {/* linha decorativa inferior: gradiente sutil. */}
      <div
        className="absolute bottom-0 left-0 w-full h-[3px] bg-[#ff929a] pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* estrutura principal: organiza o conteudo. */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 sm:px-8 md:px-10 w-full flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 lg:gap-8">
        {/* coluna de texto: centralizada em telas menores e alinhada a esquerda no desktop. */}
        <section className="w-full md:w-full lg:w-[40%] flex flex-col items-center lg:items-start text-center lg:text-left z-20">
          <h1
            className="text-[#ca4952] mb-3 md:mb-6 drop-shadow-sm leading-[1.1] md:leading-[1.05] text-[2.1rem] sm:text-[2.1rem] md:text-[3.5rem] lg:text-[4rem]"
            style={{
              fontFamily: "'Comfortaa', serif",
              fontWeight: "700",
              letterSpacing: "-0.02em",
            }}
          >
            {texts.heroTitle}
          </h1>

          <p className="text-[#5c3d2e] text-sm sm:text-base md:text-lg mb-6 md:mb-10 max-w-[320px] md:max-w-[500px] lg:max-w-[400px] leading-relaxed opacity-90">
            {texts.heroSubtitle}
          </p>

          {/* sistema de abas: utiliza nav para indicar menu de escolha principal. */}
          <nav
            className="relative grid grid-cols-2 bg-[#f3eae0] p-1.5 rounded-full shadow-md w-full max-w-[100%] sm:max-w-[360px] md:max-w-[400px]"
            aria-label="Opções de navegação do herói"
          >
            <div
              className="absolute top-1.5 bottom-1.5 left-1.5 right-1.5 pointer-events-none"
              aria-hidden="true"
            >
              {/* indicador deslizante: animacao de transicao baseada na selecao. */}
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

            <Link
              to="/receitas"
              onMouseEnter={() => setActiveTab("explore")}
              aria-current={activeTab === "explore" ? "true" : undefined}
              className={`relative z-10 flex justify-center items-center px-1 py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-md lg:text-lg whitespace-nowrap transition-colors duration-500 ${activeTab === "explore" ? "text-white" : "text-[#6b4a3a]"}`}
            >
              {texts.btnExplore}
            </Link>

            <Link
              to="/categorias"
              onMouseEnter={() => setActiveTab("ver_receitas")}
              aria-current={activeTab === "ver_receitas" ? "true" : undefined}
              className={`relative z-10 flex justify-center items-center gap-1.5 md:gap-2 px-1 py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-md lg:text-lg whitespace-nowrap transition-colors duration-500 ${activeTab === "ver_receitas" ? "text-white" : "text-[#6b4a3a]"}`}
            >
              <span
                className={`transition-all duration-500 ${activeTab === "ver_receitas" ? "brightness-0 invert" : ""}`}
                aria-hidden="true"
              >
                🍒
              </span>
              {texts.btnCategories}
            </Link>
          </nav>
        </section>

        {/* coluna da imagem: logo envolto em figure para semântica de imagem principal. */}
        <div className="w-full md:w-full lg:w-[60%] flex justify-center lg:justify-end relative z-10 mt-6 md:mt-10 lg:mt-0">
          <figure className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[500px] lg:max-w-[750px]">
            <div
              className="absolute inset-0 bg-white/40 blur-[80px] md:blur-[100px] rounded-full"
              aria-hidden="true"
            ></div>
            <img
              src={logoRecipes}
              alt="Cherry Diner - Logo Principal"
              className="relative z-10 w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
            />
          </figure>
        </div>
      </div>
    </header>
  );
};

export default HomeHero;
