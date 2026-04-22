import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

/* importacao do background tematico de cerejas */
import bgCherries from "../../assets/images/backgrounds/background-cherry.png";

/* importacao das imagens das categorias */
import imgPrincipais from "../../assets/images/categories/pratos-principais.png";
import imgBebidas from "../../assets/images/categories/bebidas.png";
import imgEntradas from "../../assets/images/categories/entradas.png";
import imgSobremesas from "../../assets/images/categories/sobremesas.png";

/* mapa de imagens para vincular o id do json ao asset local importado. */
const categoryImages: Record<string, string> = {
  principais: imgPrincipais,
  bebidas: imgBebidas,
  entradas: imgEntradas,
  sobremesas: imgSobremesas,
};

/**
 * interface: category
 * define a estrutura das categorias consumidas do json.
 */
interface Category {
  id: string;
  title_pt: string;
  title_en: string;
  span: string; /* define o tamanho do card no grid (ex: md:col-span-2) */
  category: string;
}

const HomePosterWall = () => {
  const { texts, language } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/categories.json");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("erro ao carregar categorias:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="relative w-full py-20 md:py-48 overflow-hidden bg-[#f9f4ef]">
      {/* background decorativo: utiliza imagem fixa para efeito de profundidade e opacidade reduzida. */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${bgCherries})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      ></div>
      <div className="absolute inset-0 bg-[#f9f4ef]/80 z-0"></div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-6">
        {/* cabecalho da secao: centralizado com tipografia artistica e iconografia em svg. */}
        <header className="mb-12 md:mb-16 text-center flex flex-col items-center">
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
              {language === "pt" ? "Nossas" : "Our"}
            </span>
            <span
              className="block text-[#ca4952] text-6xl md:text-9xl mt-2 md:-mt-4"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {language === "pt" ? "Categorias" : "Categories"}
            </span>
          </h2>

          <p className="mt-8 md:mt-12 text-[#8c6b5d] text-md md:text-xl font-medium italic opacity-80 leading-relaxed font-serif">
            {texts.categoriesSubtitle}
          </p>
        </header>

        {/* container do grid: possui borda superior colorida e sombra suave. altura adaptavel no mobile e fixa no desktop. */}
        <div className="relative bg-[#fdfaf5]/90 border-t-[4px] border-t-[#ca4952] border-x border-b border-[#e9dcc9] rounded-[1rem] p-4 md:p-12 shadow-[0_25px_80_px_-20px_rgba(0,0,0,0.15)]">
          {/* grid de categorias: empilhado no mobile/tablet e organizado em mosaico (4 colunas) no desktop (lg). */}
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-4 md:gap-8 h-auto lg:h-[750px]">
            {isLoading
              ? [...Array(4)].map((_, i) => (
                  /* esqueleto de carregamento: mantem a estrutura visual enquanto os dados sao buscados. */
                  <div
                    key={i}
                    className={`bg-gray-200 animate-pulse rounded-[1rem] h-[250px] lg:h-full ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                  />
                ))
              : categories.map((item) => (
                  <Link
                    key={item.id}
                    to={`/receitas?categoria=${item.id}`}
                    /* aplicacao de span dinamico: converte classes de tablet para desktop garantindo o layout em mosaico. */
                    className={`${item.span.replace("md:", "lg:")} group relative flex flex-col transition-all duration-500 overflow-hidden rounded-[1rem] border border-[#e5dcd3] shadow-sm h-[250px] lg:h-full`}
                  >
                    {/* imagem de fundo da categoria com efeito de zoom no hover. */}
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={categoryImages[item.id]}
                        alt={language === "pt" ? item.title_pt : item.title_en}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>

                    {/* overlay inferior: exibe o titulo da categoria com fundo desfocado (glassmorphism). */}
                    <div className="absolute bottom-0 left-0 w-full z-30">
                      <div className="bg-[#fdfaf5]/95 backdrop-blur-sm p-4 md:p-6 border-t border-[#e5dcd3] text-center flex items-center justify-center min-h-[60px]">
                        <h3
                          className="text-[#3d5a5a] text-sm md:text-xl font-black uppercase tracking-[0.15em] leading-none transition-colors group-hover:text-[#ca4952]"
                          style={{ fontFamily: "'Comfortaa', cursive" }}
                        >
                          {language === "pt" ? item.title_pt : item.title_en}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePosterWall;
