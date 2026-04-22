import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { recipeImages } from "../../utils/recipeImages";

import bgDesktop from "../../assets/images/backgrounds/background-1.png";
import bgMobile from "../../assets/images/backgrounds/background-mobile-2.png";

interface Recipe {
  id: string;
  category: string;
  category_pt: string;
  category_en: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  prepTime: string;
}

const HomeHighlights = () => {
  const { texts, language } = useLanguage();
  const [activeBtn, setActiveBtn] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* mapeamento de cores para as etiquetas de categoria baseado no valor do json. */
  const tagColors: Record<string, string> = {
    principais: "#6b8e8e",
    bebidas: "#929292",
    sobremesas: "#d38e7d",
    entradas: "#ca4952",
  };

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await fetch("/data/recipes.json");
        const data = await response.json();
        /* limitacao de 4 itens para preencher corretamente o grid em resolucoes de tablet (2x2). */
        setRecipes(data.slice(0, 4));
      } catch (error) {
        console.error("erro ao carregar destaques:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHighlights();
  }, []);

  return (
    <section className="relative w-full pt-40 md:pt-60 pb-32 md:pb-50 lg:pb-58 overflow-hidden">
      {/* fundo exclusivo para mobile: utiliza imagem vertical e overlay claro. */}
      <div
        className="absolute inset-0 z-0 block md:hidden"
        style={{
          backgroundImage: `url(${bgMobile})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      {/* fundo para desktop e tablet: utiliza efeito fixed para parallax e overlay tonalidade creme. */}
      <div
        className="absolute inset-0 z-0 hidden md:block"
        style={{
          backgroundImage: `url(${bgDesktop})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#f9f4ef]/80"></div>
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6">
        <header className="mb-12 text-center flex flex-col items-center">
          <div className="mb-6 text-[#ca4952]">
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 3C16.5 3 13.3 4.5 13 7C12.7 9.5 13 11 13 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M7 3C7.5 3 10.7 4.5 11 7C11.3 9.5 11 11 11 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="7" cy="16" r="5" fill="currentColor" />
              <circle cx="17" cy="16" r="5" fill="currentColor" />
            </svg>
          </div>

          <h2 className="leading-none tracking-tighter">
            <span
              className="block text-[#3d5a5a] text-3xl md:text-6xl font-black uppercase"
              style={{ fontFamily: "'Comfortaa', cursive" }}
            >
              {language === "pt" ? "Receitas" : "Handpicked"}
            </span>
            <span
              className="block text-[#ca4952] text-6xl md:text-9xl mt-2 md:-mt-4"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {language === "pt" ? "Destaques" : "Highlights"}
            </span>
          </h2>

          <p className="mt-8 md:mt-12 text-[#8c6b5d] text-md md:text-xl font-medium italic opacity-80 leading-relaxed font-serif">
            {texts.highlightsSubtitle}
          </p>
        </header>

        {/* container de cards: possui borda superior colorida e sombra profunda para destaque. */}
        <div className="relative bg-[#fdfaf5]/90 border-t-4 border-t-[#ca4952] border-x border-b border-[#e9dcc9] rounded-[1rem] p-8 md:p-16 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.15)] flex flex-col items-center">
          {/* configuracao do grid: altera o numero de colunas de 1 (mobile) para 2 (tablet) e 3 (desktop). */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 w-full mb-16 md:mb-20">
            {!isLoading &&
              recipes.map((recipe, index) => (
                <article
                  key={recipe.id}
                  /* logica de visibilidade: o quarto card (indice 3) aparece apenas no tablet para manter o equilibrio visual do grid 2x2. */
                  className={`relative flex-col h-full group ${index === 3 ? "hidden md:flex lg:hidden" : "flex"}`}
                >
                  <div className="bg-white rounded-[0.75rem] p-4 shadow-sm border border-[#e5dcd3] flex flex-col transition-all hover:shadow-xl hover:-translate-y-2 duration-300 h-full">
                    <figure className="relative rounded-[0.5rem] overflow-hidden border-2 border-[#eee3d5] mb-4 aspect-square">
                      <img
                        src={recipeImages[recipe.id]}
                        alt={
                          language === "pt" ? recipe.title_pt : recipe.title_en
                        }
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </figure>

                    <div className="flex flex-col flex-grow text-left">
                      {/* header do card: agrupa titulo e categoria em coluna para evitar quebras em nomes longos. */}
                      <div className="flex flex-col items-start mb-3 gap-2">
                        <h3
                          className="text-[#3d5a5a] text-xl md:text-2xl font-black mb-0 transition-colors group-hover:text-[#ca4952] leading-tight"
                          style={{ fontFamily: "'Comfortaa', cursive" }}
                        >
                          {language === "pt"
                            ? recipe.title_pt
                            : recipe.title_en}
                        </h3>

                        <span
                          className="px-3 py-1 rounded-[0.25rem] text-[9px] font-black text-white uppercase tracking-wider"
                          style={{
                            backgroundColor:
                              tagColors[recipe.category] || "#ca4952",
                          }}
                        >
                          {language === "pt"
                            ? recipe.category_pt
                            : recipe.category_en}
                        </span>
                      </div>

                      <p className="text-[#8c6b5d] text-xs md:text-sm leading-relaxed mb-6 opacity-80">
                        {language === "pt"
                          ? recipe.description_pt
                          : recipe.description_en}
                      </p>

                      {/* rodape do card: exibe tempo de preparo e link de navegacao com alinhamento na base. */}
                      <footer className="mt-auto flex items-center justify-between pt-4 border-t-2 border-[#e5dcd3] border-dashed">
                        <div className="flex items-center gap-2.5 text-[#8c6b5d] font-bold text-[11px] md:text-sm">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#ca4952]"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>{recipe.prepTime}</span>
                        </div>

                        <Link
                          to={`/receitas/${recipe.id}`}
                          className="bg-[#3d5a5a] text-white px-5 py-2 rounded-[0.35rem] text-xs font-bold uppercase tracking-widest hover:bg-[#ca4952] transition-colors"
                        >
                          {texts.viewBtn}
                        </Link>
                      </footer>
                    </div>
                  </div>
                </article>
              ))}
          </div>

          {/* botao de acao flutuante: posicionado no centro da borda inferior. troca de cor via gradiente no hover. */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex justify-center z-20">
            <div
              className="relative bg-[#f3eae0] p-1.5 rounded-full shadow-2xl border-2 border-white transition-all inline-block"
              onMouseEnter={() => setActiveBtn(true)}
              onMouseLeave={() => setActiveBtn(false)}
            >
              <div className="absolute inset-1.5 pointer-events-none">
                {/* camada de cor padrao (vermelho) */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-700 ${activeBtn ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
                  style={{
                    background:
                      "linear-gradient(180deg, #ff6b6b 0%, #d13a3a 70%, #a82828 100%)",
                  }}
                />
                {/* camada de cor hover (verde) */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-700 ${activeBtn ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                  style={{
                    background:
                      "linear-gradient(180deg, #8ab599 0%, #70a283 70%, #5d8a6d 100%)",
                  }}
                />
              </div>

              <Link
                to="/receitas"
                className="relative z-10 flex justify-center items-center py-4 px-10 md:px-16 rounded-full text-white font-medium text-xs sm:text-sm md:text-md lg:text-lg whitespace-nowrap"
              >
                <span>{texts.searchExplore}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHighlights;
