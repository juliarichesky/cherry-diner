import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext"; // 1. IMPORTAR O HOOK
import PageHeader from "../../components/PageHeader/PageHeader";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Pagination from "../../components/Pagination/Pagination";

interface Recipe {
  id: string;
  category: string;
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
  const { level } = useParams<{ level: string }>();
  const { texts } = useLanguage(); // 2. PEGAR AS TRADUÇÕES

  const [allFilteredRecipes, setAllFilteredRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const recipesPerPage = 8;

  // 3. LÓGICA DE TÍTULO USANDO AS CHAVES NOVAS
  const getDifficultyLabel = () => {
    if (level === "facil") return texts.difficultyBeginner;
    if (level === "medio") return texts.difficultyInter;
    if (level === "dificil") return texts.difficultyExpert;
    return "";
  };

  const difficultyLabel = getDifficultyLabel();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetch("/data/recipes.json");
        if (!response.ok) throw new Error("Erro ao carregar cardápio");
        const data = await response.json();

        const filtered = data.filter((recipe: Recipe) => {
          // Normaliza o texto do JSON para bater com o ID da URL
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

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allFilteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(allFilteredRecipes.length / recipesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            <div className="py-32 flex flex-col items-center justify-center border-4 border-double border-[#e5dcd3] bg-white/40">
              <span className="text-4xl mb-4">🍒</span>
              <h2 className="text-2xl italic text-[#3d5a5a] text-center mb-6">
                "{texts.noRecipesLevel || "Não encontramos receitas para esse nível ainda."}"
              </h2>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default DifficultyPage;