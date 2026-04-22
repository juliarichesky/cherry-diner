import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeFilters from "../../components/RecipeFilters/RecipeFilters";
import PageHeader from "../../components/PageHeader/PageHeader";
import Pagination from "../../components/Pagination/Pagination";

/**
 * interface: recipe
 * define a estrutura de dados das receitas, sincronizada com o arquivo json bilingue.
 */
interface Recipe {
  id: string;
  category: string;
  category_pt: string;
  category_en: string;
  prepTime: string;
  title_pt: string;
  title_en: string;
  difficulty_pt: string;
  difficulty_en: string;
  description_pt?: string;
  description_en?: string;
}

const Receitas = () => {
  // acesso aos textos traduzidos do contexto
  const { texts } = useLanguage();

  // hooks para gerenciar parâmetros da url (ex: ?categoria=entradas)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("categoria") || "todas";

  // estados para receitas, categoria atual, paginação e controle de loading
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [category, setCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // define a quantidade fixa de cards exibidos por página
  const recipesPerPage = 8;

  /**
   * hook de efeito: carregamento inicial
   * busca a base completa de receitas do arquivo json na pasta public.
   */
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetch("/data/recipes.json");
        if (!response.ok) throw new Error("erro ao carregar cardápio");
        const data = await response.json();
        setAllRecipes(data);
      } catch (error) {
        console.error("ops!", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadRecipes();
  }, []);

  /**
   * hook de efeito: sincronização de url
   * monitora mudanças nos parâmetros da url para atualizar o filtro de categoria e resetar a página.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      const catFromUrl = searchParams.get("categoria") || "todas";
      setCategory(catFromUrl);
      setCurrentPage(1); // reseta para a primeira página ao mudar o filtro
    }, 0);
    return () => clearTimeout(timer);
  }, [searchParams]);

  /**
   * lógica de filtragem:
   * cria uma nova lista contendo apenas as receitas que pertencem à categoria selecionada.
   */
  const filteredRecipes = allRecipes.filter((recipe: Recipe) => {
    return category === "todas" || recipe.category === category;
  });

  /**
   * lógica de paginação:
   * calcula os índices de corte para exibir apenas o subconjunto de receitas da página atual.
   */
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe,
  );

  // calcula o total de páginas necessário baseado no resultado filtrado
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  /**
   * manipuladores de eventos (handlers):
   * lidam com a troca de página (com scroll suave para o topo) e mudança de categoria via url.
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (newCategory: string) => {
    setSearchParams({ categoria: newCategory });
  };

  // tela de carregamento com animação bounce e ícone temático
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-[#fdfaf5]"
        role="status"
      >
        <div className="text-center animate-bounce">
          <span className="text-4xl" aria-hidden="true">
            🍒
          </span>
          <p className="text-[#ca4952] font-black mt-4 uppercase tracking-widest">
            {texts.loadingText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#fdfaf5] pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 relative z-10">
        {/* cabeçalho da página (breadcrumb e título) */}
        <header className="mb-20">
          <PageHeader page="receitas" />
        </header>

        {/* barra de navegação superior: contém filtros e contador de resultados */}
        <nav
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16"
          aria-label="Filtros de categorias"
        >
          <div className="flex-1">
            <RecipeFilters
              activeCategory={category}
              setCategory={handleCategoryChange}
              total={filteredRecipes.length}
            />
          </div>

          {/* contador visual: exibe a quantidade de itens mostrados no momento */}
          <div
            className="hidden lg:flex flex-col items-end border-r-4 border-[#ca4952] pr-6"
            aria-live="polite"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8c6b5d]">
              {texts.showingText}
            </span>
            <span
              className="text-4xl font-black text-[#ca4952]"
              style={{ fontFamily: "'Comfortaa', cursive" }}
            >
              {currentRecipes.length.toString().padStart(2, "0")}
            </span>
          </div>
        </nav>

        {/* galeria: renderiza os cards de receita ou uma mensagem de "não encontrado" */}
        <section aria-label="Galeria de receitas">
          {currentRecipes.length > 0 ? (
            <>
              {/* grid responsivo: estruturado como lista (ul) para melhor semântica */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {currentRecipes.map((recipe) => (
                  <li key={recipe.id}>
                    <article>
                      <RecipeCard recipe={recipe} />
                    </article>
                  </li>
                ))}
              </ul>

              {/* componente de navegação entre páginas envolto em nav */}
              <nav className="mt-12" aria-label="Paginação">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </nav>
            </>
          ) : (
            /* feedback visual para buscas/filtros sem resultado */
            <div
              className="py-32 flex flex-col items-center justify-center border-4 border-double border-[#e5dcd3] bg-white/40"
              role="status"
            >
              <span className="text-4xl mb-4" aria-hidden="true">
                🍒
              </span>
              <h2 className="text-2xl italic text-[#3d5a5a] text-center mb-6">
                "{texts.noRecipesFound}"
              </h2>
              <button
                onClick={() => handleCategoryChange("todas")}
                className="px-8 py-3 bg-[#ca4952] text-white font-black uppercase text-[10px] shadow-[6px_6px_0px_#3d5a5a] cursor-pointer hover:brightness-110 transition-all"
              >
                {texts.btnExplore || "Ver cardápio completo!"}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Receitas;
