import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageHeader from "../../components/PageHeader/PageHeader";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Pagination from "../../components/Pagination/Pagination";

/**
 * interface: recipe
 * define a estrutura de dados para as receitas filtradas por dificuldade.
 * inclui campos opcionais de categoria para evitar conflitos de tipagem com o componente card.
 */
interface Recipe {
  id: string;
  category: string;
  category_pt?: string;
  category_en?: string;
  title_pt: string;
  title_en: string;
  difficulty_pt: string;
  difficulty_en: string;
  image: string;
  prepTime: string;
  description_pt?: string;
  description_en?: string;
}

const DifficultyPage = () => {
  // recupera o nivel de dificuldade diretamente da url
  const { level } = useParams<{ level: string }>();
  // acessa o contexto de traducao para textos dinamicos
  const { texts } = useLanguage();

  const [allFilteredRecipes, setAllFilteredRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // define a quantidade de cards exibidos por pagina
  const recipesPerPage = 8;

  /**
   * funcao: getdifficultylabel
   * mapeia o parametro da url para o texto traduzido correspondente.
   */
  const getDifficultyLabel = () => {
    if (level === "facil") return texts.difficultyBeginner;
    if (level === "medio") return texts.difficultyInter;
    if (level === "dificil") return texts.difficultyExpert;
    return "";
  };

  const difficultyLabel = getDifficultyLabel();

  /**
   * hook: carregamento e filtragem
   * busca as receitas do arquivo json e filtra conforme a dificuldade selecionada.
   * utiliza normalizacao de caracteres para garantir a comparacao correta de strings.
   */
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetch("/data/recipes.json");
        if (!response.ok) throw new Error("Erro ao carregar cardápio");
        const data = await response.json();

        const filtered = data.filter((recipe: Recipe) => {
          // transforma o texto em minusculo e remove acentuacao para comparacao
          const recipeLevel = recipe.difficulty_pt
            ?.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

          return recipeLevel === level?.toLowerCase();
        });

        setAllFilteredRecipes(filtered);
        setCurrentPage(1);
      } catch (error) {
        console.error("Ops!", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadRecipes();
  }, [level]);

  // calculo de indices para a logica de paginacao
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allFilteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe,
  );
  const totalPages = Math.ceil(allFilteredRecipes.length / recipesPerPage);

  // gerencia a troca de pagina e reseta o scroll para o topo
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // tela de carregamento temporaria
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfaf5]">
        <div className="text-center animate-bounce">
          <span className="text-4xl">🍒</span>
          <p className="text-[#ca4952] font-black mt-4 uppercase tracking-widest">
            {texts.loadingText} {difficultyLabel}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#fdfaf5] pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 relative z-10">
        <header className="mb-20">
          <PageHeader page="dificuldade" dynamicTitle={difficultyLabel} />
        </header>

        <section aria-label="Galeria de Receitas">
          {currentRecipes.length > 0 ? (
            <>
              {/* grid responsivo para exibicao dos cards de receita */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {currentRecipes.map((recipe) => (
                  <article key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                  </article>
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            /* feedback visual caso nenhuma receita seja encontrada para o filtro */
            <div className="py-32 flex flex-col items-center justify-center border-4 border-double border-[#e5dcd3] bg-white/40">
              <span className="text-4xl mb-4">🍒</span>
              <h2 className="text-2xl italic text-[#3d5a5a] text-center mb-6">
                "
                {texts.noRecipesLevel ||
                  "Não encontramos receitas para esse nível ainda."}
                "
              </h2>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default DifficultyPage;
