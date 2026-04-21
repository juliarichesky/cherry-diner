import { useLanguage } from "../../context/LanguageContext";

/**
 * interface: filtersprops
 * define as propriedades necessárias para controlar o estado do filtro externo.
 */
interface FiltersProps {
  activeCategory: string;
  setCategory: (cat: string) => void;
  total: number;
}

const RecipeFilters = ({ activeCategory, setCategory }: FiltersProps) => {
  // acesso ao contexto de tradução e idioma ativo
  const { texts, language } = useLanguage();

  /**
   * lista de categorias:
   * mapeamos cada categoria com seu id (usado na lógica de filtro)
   * e sua label (usada para exibição traduzida).
   */
  const categories = [
    { id: "todas", label: language === "pt" ? "Todas" : "All" },
    { id: "entradas", label: language === "pt" ? "Entradas" : "Starters" },
    {
      id: "principais",
      label: language === "pt" ? "Principais" : "Main Courses",
    },
    { id: "bebidas", label: language === "pt" ? "Bebidas" : "Drinks" },
    { id: "sobremesas", label: language === "pt" ? "Sobremesas" : "Desserts" },
  ];

  return (
    <div className="flex flex-col gap-6 mb-12 animate-fadeIn">
      {/* indicador de seção: pequena label superior para guiar o usuário */}
      <div className="flex items-center gap-3">
        <span className="text-[#ca4952] font-bold uppercase text-[10px] tracking-[0.3em]">
          {texts.filterLabel}
        </span>
      </div>

      {/* container de botões (estilo tab): 
          renderiza dinamicamente os botões de filtro com estados visuais distintos.
      */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            /* lógica de estilo: se a categoria estiver ativa, aplica cor de destaque; 
               caso contrário, mantém o estilo neutro com efeito de hover.
            */
            className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
              activeCategory === cat.id
                ? "bg-[#70a283] text-white shadow-md scale-105" // verde para indicar seleção ativa
                : "bg-white text-[#8c6b5d] border border-[#e5dcd3] hover:border-[#70a283] hover:text-[#70a283]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* detalhe estético: linha fina para separar a área de filtros do conteúdo de receitas */}
      <div className="h-[1px] w-full border-b border-[#e5dcd3]"></div>
    </div>
  );
};

export default RecipeFilters;
