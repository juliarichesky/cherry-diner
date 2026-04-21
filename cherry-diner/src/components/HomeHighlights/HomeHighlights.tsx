import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { recipeImages } from "../../utils/recipeImages";

// importação dos assets de background para desktop e mobile
import bgDesktop from "../../assets/images/backgrounds/background-1.png";
import bgMobile from "../../assets/images/backgrounds/background-mobile-2.png";

/**
 * interface: recipe
 * define a estrutura de dados para uma receita, suportando conteúdo bilíngue.
 */
interface Recipe {
  id: string;
  category: string; // chave para cores (ex: "principais")
  category_pt: string; // label em português
  category_en: string; // label em inglês
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  prepTime: string;
}

const HomeHighlights = () => {
  // hooks para contexto de idioma, controle de hover do botão e estado das receitas
  const { texts, language } = useLanguage();
  const [activeBtn, setActiveBtn] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // mapeamento de cores para as tags de categoria
  const tagColors: Record<string, string> = {
    principais: "#6b8e8e",
    bebidas: "#929292",
    sobremesas: "#d38e7d",
    entradas: "#ca4952",
  };

  /**
   * busca os dados das receitas em destaque no arquivo local json ao montar o componente
   */
  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await fetch("/data/recipes.json");
        const data = await response.json();
        // seleciona apenas as 3 primeiras receitas para o destaque da home
        setRecipes(data.slice(0, 3));
      } catch (error) {
        console.error("erro ao carregar destaques:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHighlights();
  }, []);

  return (
    <section className="relative w-full pt-40 md:pt-60 pb-32 overflow-hidden">
      {/* backgrounds responsivos com efeito de overlay para legibilidade */}
      {/* versão mobile */}
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

      {/* versão desktop com efeito de fundo fixo (parallax) */}
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
        {/* cabeçalho da seção com tipografia estilizada e suporte a tradução */}
        <header className="mb-12 text-center flex flex-col items-center">
          <div className="mb-6 text-[#ca4952]">
            {/* ícone decorativo em svg */}
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

        {/* vitrine de receitas: grid que agrupa os cards buscados do json */}
        <div className="relative bg-[#fdfaf5]/90 border-t-[5px] border-[#ca4952] border-x-4 border-b-4 border-x-white border-b-white rounded-[1rem] p-8 md:p-16 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.15)] flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 w-full mb-16 md:mb-20">
            {!isLoading &&
              recipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="relative flex flex-col h-full group"
                >
                  <div className="bg-white rounded-[0.75rem] p-4 shadow-sm border border-[#e5dcd3] flex flex-col transition-all hover:shadow-xl hover:-translate-y-2 duration-300 h-full">
                    {/* imagem da receita com efeito de zoom no hover buscando do mapa de assets locais */}
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
                      <div className="flex justify-between items-start mb-3">
                        <h3
                          className="text-[#3d5a5a] text-xl md:text-2xl font-black mb-0 transition-colors group-hover:text-[#ca4952] leading-tight"
                          style={{ fontFamily: "'Comfortaa', cursive" }}
                        >
                          {language === "pt"
                            ? recipe.title_pt
                            : recipe.title_en}
                        </h3>
                        {/* tag de categoria bilingue com cor dinâmica */}
                        <span
                          className="px-3 py-1 ml-3 rounded-[0.25rem] text-[9px] font-black text-white uppercase tracking-wider flex-shrink-0 mt-1"
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

                      {/* rodapé do card com tempo de preparo e link para detalhe */}
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

          {/* botão slider centralizado com transição de gradiente */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex justify-center z-20">
            <div
              className="relative bg-[#f3eae0] p-1.5 rounded-full shadow-2xl border-2 border-white transition-all inline-block"
              onMouseEnter={() => setActiveBtn(true)}
              onMouseLeave={() => setActiveBtn(false)}
            >
              <div className="absolute inset-1.5 pointer-events-none">
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-700 ${activeBtn ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
                  style={{
                    background:
                      "linear-gradient(180deg, #ff6b6b 0%, #d13a3a 70%, #a82828 100%)",
                  }}
                />
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
