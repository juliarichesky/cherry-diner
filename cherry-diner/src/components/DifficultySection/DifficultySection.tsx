import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

/**
 * define o contrato de dados para os objetos de dificuldade consumidos do json.
 */
interface Level {
  id: string;
  stars: number;
  labelKey: string;
  descKey: string;
}

const DifficultySection = () => {
  // acesso aos estados globais de tradução e idioma atual
  const { texts, language } = useLanguage();

  // estados locais para armazenar a lista de níveis e o controle de carregamento
  const [levels, setLevels] = useState<Level[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * hook de efeito: busca os dados do arquivo json na pasta public
   * executa apenas uma vez após a montagem do componente.
   */
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch("/data/levels.json");
        const data = await response.json();
        setLevels(data);
      } catch (error) {
        console.error("erro ao carregar níveis:", error);
      } finally {
        // finaliza o estado de loading independente do sucesso ou erro
        setIsLoading(false);
      }
    };
    fetchLevels();
  }, []);

  return (
    <section className="relative w-full pt-24 md:pt-48 pb-30 md:pb-45 bg-[#fdfaf5] overflow-hidden border-t border-b border-[#eee3d5]">
      {/* background decorativo: cria o padrão de listras (stripes) via gradiente repetitivo */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 40px,
            rgba(61, 90, 90, 0.08) 40px,
            rgba(61, 90, 90, 0.08) 80px
          )`,
        }}
      ></div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16 md:gap-24">
          {/* cabeçalho da seção: renderiza textos dinâmicos baseados no idioma selecionado */}
          <header className="max-w-[550px] text-center lg:text-left">
            <h2 className="leading-none tracking-tighter">
              <span
                className="block text-[#3d5a5a] text-4xl md:text-6xl font-black uppercase"
                style={{ fontFamily: "'Comfortaa', cursive" }}
              >
                {language === "pt" ? "Escolha por" : "Choose by"}
              </span>
              <span
                className="block text-[#ca4952] text-6xl md:text-9xl mt-2 md:-mt-4"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {language === "pt" ? "Dificuldade" : "Difficulty"}
              </span>
            </h2>
            <p className="mt-12 text-[#8c6b5d] text-md md:text-xl font-medium italic opacity-80 leading-relaxed font-serif">
              {texts.difficultySubtitle}
            </p>
          </header>

          {/* listagem dinâmica: organizada semanticamente em uma lista (ul) */}
          <nav
            className="w-full lg:w-auto min-w-[320px] md:min-w-[450px]"
            aria-label={
              language === "pt"
                ? "Navegação por dificuldade"
                : "Difficulty navigation"
            }
          >
            <ul className="flex flex-col gap-6 list-none p-0">
              {!isLoading &&
                levels.map((level) => (
                  <li key={level.id}>
                    <Link
                      to={`/dificuldade/${level.id}`}
                      aria-label={`${language === "pt" ? "Ver receitas de nível" : "View recipes for level"} ${texts[level.labelKey as keyof typeof texts]}`}
                      className="group relative block"
                    >
                      {/* card container */}
                      <div className="bg-white/90 backdrop-blur-sm border border-[#eee3d5] border-l-[6px] border-l-[#3d5a5a] p-6 md:p-8 rounded-r-[1rem] rounded-l-[0.3rem] shadow-[0_8px_20px_-10px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:shadow-[0_20px_40px_-10px_rgba(202,73,82,0.15)] group-hover:-translate-y-1 group-hover:border-l-[#ca4952]">
                        {/* sistema de estrelas: oculto para tecnologias assistivas (puramente visual) */}
                        <div
                          className="flex gap-1 mb-3 text-[#ca4952] opacity-40 group-hover:opacity-100 transition-opacity"
                          aria-hidden="true"
                        >
                          {[...Array(level.stars)].map((_, i) => (
                            <svg
                              key={i}
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <h3
                              className="text-[#3d5a5a] text-2xl md:text-4xl font-black tracking-tighter leading-none"
                              style={{ fontFamily: "'Comfortaa', cursive" }}
                            >
                              {texts[level.labelKey as keyof typeof texts]}
                            </h3>
                            <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#8c6b5d] mt-3 font-bold opacity-60">
                              {texts[level.descKey as keyof typeof texts]}
                            </span>
                          </div>

                          <div
                            className="text-[#ca4952] opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 font-bold text-2xl"
                            aria-hidden="true"
                          >
                            ➔
                          </div>
                        </div>
                      </div>

                      {/* camada de destaque (overlay) */}
                      <div
                        className="absolute inset-0 bg-[#ca4952]/5 rounded-r-[1rem] rounded-l-[0.3rem] scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 -z-10"
                        aria-hidden="true"
                      ></div>
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default DifficultySection;
