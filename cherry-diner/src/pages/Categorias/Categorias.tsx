import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import PageHeader from "../../components/PageHeader/PageHeader";

/**
 * importaçãodas imagens de categorias
 * centralizar as importações aqui facilita a manutenção caso os arquivos mudem.
 */
import imgPrincipais from "../../assets/images/categories/pratos-principais.png";
import imgBebidas from "../../assets/images/categories/bebidas.png";
import imgEntradas from "../../assets/images/categories/entradas.png";
import imgSobremesas from "../../assets/images/categories/sobremesas.png";

/**
 * dicionário de imagens: associa o id da categoria ao arquivo importado.
 */
const categoryImages: Record<string, string> = {
  principais: imgPrincipais,
  bebidas: imgBebidas,
  entradas: imgEntradas,
  sobremesas: imgSobremesas,
};

const Categorias = () => {
  const { texts, language } = useLanguage();

  // lista de ids que define a ordem de exibição das seções
  const categories = ["entradas", "principais", "bebidas", "sobremesas"];

  /**
   * metadados das categorias: define labels, descrições e cores temáticas.
   * o uso do record facilita a busca de estilos durante o map.
   */
  const categoryMeta: Record<
    string,
    { label: string; desc: string; color: string }
  > = {
    entradas: {
      label: language === "pt" ? "entradas" : "starters",
      desc: texts.catDescEntradas,
      color: "#3d5a5a",
    },
    principais: {
      label: language === "pt" ? "pratos principais" : "main courses",
      desc: texts.catDescPrincipais,
      color: "#ca4952",
    },
    bebidas: {
      label: language === "pt" ? "bebidas" : "drinks",
      color: "#3d5a5a",
      desc: texts.catDescBebidas,
    },
    sobremesas: {
      label: language === "pt" ? "sobremesas" : "desserts",
      desc: texts.catDescSobremesas,
      color: "#ca4952",
    },
  };

  return (
    <main className="w-full min-h-screen bg-[#f9f6f2] py-20 md:pb-30 lg:pb-40">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* cabeçalho reutilizável da página */}
        <PageHeader page="categorias" />

        <div className="mt-24 space-y-24 md:space-y-32">
          {categories.map((catId, index) => {
            const style = categoryMeta[catId];
            // lógica para alternar a direção do layout (imagem na esquerda ou direita)
            const isEven = index % 2 === 0;

            return (
              <Link
                key={catId}
                to={`/receitas?categoria=${catId}`}
                /* o layout alterna entre flex-row e flex-row-reverse em telas médias */
                className={`group relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16 transition-all duration-1000`}
              >
                {/* 🖼️ área visual: imagem com moldura e número decorativo */}
                <div className="w-full md:w-3/5 relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] bg-white p-2 border-1 border-[#e8e0d8] transition-transform duration-700 group-hover:scale-[1.02]">
                    <div className="aspect-[16/10] overflow-hidden rounded-lg">
                      <img
                        src={categoryImages[catId]}
                        alt={style.label}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                      />
                    </div>
                    {/* overlay sutil para profundidade na imagem */}
                    <div className="absolute inset-3 rounded-lg bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-60"></div>
                  </div>

                  {/* número decorativo: posicionado de forma oposta à direção do texto */}
                  <div
                    className={`absolute -bottom-6 ${isEven ? "-right-6" : "-left-6"} hidden md:flex w-24 h-24 items-center justify-center rounded-full bg-white shadow-xl z-20 border border-[#eee3d5] text-2xl font-black transition-transform duration-700 group-hover:rotate-12`}
                    style={{
                      color: style.color,
                      fontFamily: "'Dancing Script', cursive",
                    }}
                  >
                    0{index + 1}
                  </div>
                </div>

                {/* 📝 área de conteúdo: título, divisor e descrição */}
                <div
                  className={`w-full md:w-2/5 flex flex-col items-center ${isEven ? "md:items-start md:text-left" : "md:items-end md:text-right"} text-center`}
                >
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-50"
                    style={{ color: style.color }}
                  >
                    {language === "pt" ? "coleção" : "collection"}
                  </span>

                  <h3
                    className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight transition-colors duration-500 group-hover:text-[#ca4952]"
                    style={{
                      fontFamily: "'Comfortaa', cursive",
                      color: style.color,
                    }}
                  >
                    {style.label}
                  </h3>

                  {/* linha decorativa minimalista */}
                  <div className="h-[1px] w-20 mb-8 bg-[#e5dcd3]"></div>

                  <p className="text-[#8c6b5d] text-lg font-serif italic leading-relaxed opacity-80 mb-10 px-4 md:px-0">
                    {style.desc}
                  </p>

                  {/* botão de ação falso (estilizado dentro do link pai) */}
                  <div className="inline-flex items-center gap-3 group/btn">
                    <span className="text-xs font-black uppercase tracking-widest text-[#3d5a5a] group-hover/btn:text-[#ca4952] transition-colors">
                      {texts.exploreSectionBtn || "explorar"}
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center border border-[#e5dcd3] transition-all duration-500 group-hover/btn:bg-[#ca4952] group-hover/btn:border-[#ca4952] group-hover/btn:translate-x-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        className=" text-[#d13a3a] group-hover/btn:text-white transition-colors"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Categorias;
