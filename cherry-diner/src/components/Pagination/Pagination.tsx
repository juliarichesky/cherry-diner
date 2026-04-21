import { useLanguage } from "../../context/LanguageContext";

/**
 * interface: paginationprops
 * define o estado da página atual, o total e a função de callback para troca de página.
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // hook para tradução dos botões 'anterior' e 'próxima'
  const { texts } = useLanguage();

  // não renderiza a navegação se houver apenas uma página (ou nenhuma)
  if (totalPages <= 1) return null;

  /**
   * lógica de visibilidade das páginas:
   * cria um array dinâmico contendo números e reticências para simplificar a navegação
   * mantendo sempre o foco na página inicial, na atual e na final.
   */
  const getVisiblePages = () => {
    const range = [];

    // sempre inclui a primeira página no rastro
    range.push(1);

    // adiciona reticências iniciais se houver um salto entre a pág. 1 e a atual
    if (currentPage > 2) {
      range.push("...");
    }

    // adiciona a página atual apenas se ela não for uma das extremidades
    if (currentPage !== 1 && currentPage !== totalPages) {
      range.push(currentPage);
    }

    // adiciona reticências finais se houver um salto entre a atual e a última
    if (currentPage < totalPages - 1) {
      range.push("...");
    }

    // sempre inclui a última página no rastro
    range.push(totalPages);

    return range;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex flex-col md:flex-row justify-center items-center gap-6 mt-20 mb-10">
      <div className="flex items-center gap-4">
        {/* botão de voltar: desabilitado se estiver na página 01 */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#3d5a5a] border rounded-full cursor-pointer border-[#e5dcd3] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#ca4952] hover:text-white transition-all active:scale-95"
        >
          « {texts.prevBtn || "anterior"}
        </button>

        {/* container dos números: renderiza dinamicamente o array de visibilidade */}
        <div className="flex items-center gap-1 md:gap-2">
          {visiblePages.map((page, index) => (
            <button
              key={index}
              /* só permite o clique se o item for um número, ignorando as reticências */
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={typeof page !== "number"}
              /* estilo condicional: destaca a página ativa com a cor principal (cereja) */
              className={`w-10 h-10 flex items-center justify-center text-[11px] font-black transition-all border-b-2 ${
                currentPage === page
                  ? "border-[#ca4952] text-[#ca4952]"
                  : typeof page === "number"
                    ? "border-transparent text-[#3d5a5a] hover:border-[#3d5a5a]/30 cursor-pointer"
                    : "border-transparent text-[#8c6b5d] cursor-default opacity-50"
              }`}
            >
              {/* formatação visual: adiciona um zero à esquerda (01, 02...) se for número */}
              {typeof page === "number"
                ? page.toString().padStart(2, "0")
                : page}
            </button>
          ))}
        </div>

        {/* botão de avançar: desabilitado se estiver na última página */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#3d5a5a] border rounded-full cursor-pointer border-[#e5dcd3] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#ca4952] hover:text-white transition-all active:scale-95"
        >
          {texts.nextBtn || "próxima"} »
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
