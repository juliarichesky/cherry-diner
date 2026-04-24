import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { recipeImages } from "../../utils/recipeImages";
import NotFound from "../../pages/NotFound/NotFound";

/**
 * interface: recipe
 * define a estrutura completa de uma receita, incluindo campos bilingues e metadados técnicos.
 */
interface Recipe {
  id: string;
  category: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  prepTime: string;
  difficulty_pt: string;
  difficulty_en: string;
  servings_pt: string;
  servings_en: string;
  calories: number;
  price: string;
  image: string;
  ingredients_pt: string[];
  ingredients_en: string[];
  instructions_pt: string[];
  instructions_en: string[];
}

const RecipeDetail = () => {
  const { id } = useParams();
  const { texts, language } = useLanguage();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // estado de avaliação: persiste o rating do usuário no localstorage por id de receita
  const [rating, setRating] = useState<number>(() => {
    if (typeof window !== "undefined" && id) {
      const saved = localStorage.getItem(`rating-${id}`);
      return saved !== null ? Number(saved) : 0;
    }
    return 0;
  });

  /**
   * hook: busca da receita específica
   * carrega o json global e filtra a receita correspondente ao id da url.
   */
  useEffect(() => {
    const fetchAndFindRecipe = async () => {
      try {
        const response = await fetch("/data/recipes.json");
        if (!response.ok) throw new Error("Erro ao buscar as receitas!");

        const allRecipes: Recipe[] = await response.json();
        const foundRecipe = allRecipes.find((r: Recipe) => r.id === id);

        setRecipe(foundRecipe || null);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFindRecipe();
  }, [id]);

  const handleRating = (n: number) => {
    setRating(n);
    if (id) localStorage.setItem(`rating-${id}`, String(n));
  };

  // estado de carregamento com animação temática
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-[#f4f1ea] font-serif"
        aria-live="polite"
      >
        <div className="animate-pulse text-center">
          <span className="text-4xl" aria-hidden="true">
            🍒
          </span>
          <p className="mt-4 text-[#ca4952] font-black uppercase tracking-widest text-sm">
            {texts.loadingRecipeDetail || "Preparando a mesa..."}
          </p>
        </div>
      </div>
    );
  }

  // fallback para receita não encontrada (404)
  if (!recipe) {
    return <NotFound />;
  }

  // computação das constantes de idioma
  const title = language === "pt" ? recipe.title_pt : recipe.title_en;
  const ingredients =
    language === "pt" ? recipe.ingredients_pt : recipe.ingredients_en;
  const instructions =
    language === "pt" ? recipe.instructions_pt : recipe.instructions_en;

  return (
    <article className="w-full py-10 md:py-20 bg-[#f4f1ea] min-h-screen text-[#553636] font-serif relative overflow-hidden text-left">
      {/* textura de papel fibra para reforçar o visual vintage */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"
        aria-hidden="true"
      ></div>

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <header className="mb-16 pb-8 border-b-4 border-[#fc2c37]">
          {/* título estilizado: a primeira palavra ganha destaque em vermelho */}
          <h1 className="text-[#ca4952] text-4xl md:text-6xl  font-black uppercase leading-tight tracking-tighter italic">
            {title.split(" ")[0]}{" "}
            <span className="text-[#3d5a5a]">
              {title.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p className="text-xl md:text-2xl italic text-gray-600 font-light mt-4 leading-tight">
            —{" "}
            {texts.recipeDetailSlogan ||
              "A receita perfeita para trazer o sabor clássico do Cherry Diner para a sua mesa."}
          </p>

          {/* sistema de avaliação por estrelas e indicador de dificuldade */}
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <nav className="flex gap-1" aria-label="Avaliar receita">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  aria-label={`Avaliar com ${star} estrelas`}
                  aria-pressed={star <= rating}
                  className={`text-2xl transition-all hover:scale-125 cursor-pointer ${star <= rating ? "text-[#ca4952]" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#3d5a5a]">
                {texts.levelLabel || "Dificuldade"}:
              </span>
              <span className="text-lg font-bold uppercase italic text-[#ca4952]">
                {language === "pt"
                  ? recipe.difficulty_pt
                  : recipe.difficulty_en}
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* coluna lateral: imagem "polaroide" e nota da julia */}
          <aside className="md:col-span-5 flex flex-col gap-10">
            <figure className="relative group p-4 bg-white shadow-xl rotate-[-1.5deg] border border-gray-200">
              <img
                src={recipeImages[recipe.id]}
                alt={title}
                className="w-full aspect-[4/5] object-cover grayscale-[15%] sepia-[10%]"
              />
              <figcaption className="mt-4 text-center font-serif italic text-gray-500">
                {texts.recipePhotoCaption || "O sabor de"}{" "}
                <span className="font-bold">{title}</span>{" "}
                {texts.recipePhotoCaptionEnd || "é inesquecível!"}
              </figcaption>

              {/* selo de calorias flutuante */}
              <div
                className="absolute -top-6 -right-6 z-20 bg-[#ca4952] text-white w-24 h-24 rounded-full flex flex-col items-center justify-center rotate-12 font-black shadow-2xl border-4 border-white"
                aria-label={`${recipe.calories} ${texts.caloriesText || "Calorias"}`}
              >
                <span
                  className="text-[10px] uppercase leading-none text-center"
                  aria-hidden="true"
                >
                  {texts.onlyText || "Apenas"}
                </span>
                <span className="text-2xl leading-none" aria-hidden="true">
                  {recipe.calories}
                </span>
                <span className="text-[10px] uppercase" aria-hidden="true">
                  {texts.caloriesText || "Calorias"}
                </span>
              </div>
            </figure>

            {/* bloco 'nota da julia' com inclinação oposta à imagem */}
            <section className="bg-[#3d5a5a] text-white p-6 shadow-lg rotate-[1deg]">
              <h3 className="font-black text-xl uppercase mb-2">
                {texts.juliaNote || "Nota das Julias"}:
              </h3>
              <blockquote className="italic text-sm leading-relaxed opacity-90 text-justify">
                "
                {language === "pt"
                  ? recipe.description_pt
                  : recipe.description_en}
                "
              </blockquote>
            </section>
          </aside>

          {/* coluna principal: card da receita estilo 'recorte e guarde' */}
          <section className="md:col-span-7">
            <div className="border-4 border-dashed border-[#ca4952] p-8 md:p-12 bg-white shadow-2xl relative">
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f4f1ea] px-6 text-[10px] font-black text-[#ca4952] uppercase tracking-[0.4em] whitespace-nowrap"
                aria-hidden="true"
              >
                {texts.cutAndKeep || "Recorte e Guarde"}
              </div>

              <header className="mb-10 text-center border-b border-double border-gray-300 pb-6">
                <h2 className="text-[#3d5a5a] text-4xl font-black uppercase tracking-tighter mb-2">
                  {title}
                </h2>
                <div className="flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span className="flex items-center gap-1">
                    {texts.prepLabel || "Preparo"}:{" "}
                    <time>{recipe.prepTime}</time>
                  </span>
                  <span aria-hidden="true">•</span>
                  <span>
                    {texts.servingsLabel || "Rende"}:{" "}
                    {language === "pt"
                      ? recipe.servings_pt
                      : recipe.servings_en}
                  </span>
                </div>
              </header>

              <div className="space-y-10">
                {/* lista de ingredientes com checkboxes interativos */}
                <section>
                  <h4 className="font-black uppercase text-sm mb-6 text-[#ca4952] underline underline-offset-8 decoration-double text-left">
                    {texts.ingredientsLabel || "Ingredientes"}:
                  </h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {ingredients.map((ing, i) => (
                      <li key={i}>
                        <label className="flex items-center gap-4 group cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-5 h-5 border-2 border-[#3d5a5a] text-[#3d5a5a] focus:ring-0 checked:bg-[#3d5a5a] cursor-pointer accent-[#3d5a5a]"
                          />
                          <span className="text-base font-medium border-b border-dotted border-gray-200 flex-grow leading-none pb-1 group-has-[:checked]:text-gray-400 group-has-[:checked]:line-through transition-all text-left">
                            {ing}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* modo de fazer com capitulares (letras iniciais grandes) */}
                <section>
                  <h4 className="font-black uppercase text-sm mb-8 text-[#ca4952] underline underline-offset-8 decoration-double text-left">
                    {texts.instructionsLabel || "Modo de Fazer"}:
                  </h4>
                  <ol className="space-y-8 text-left">
                    {instructions.map((step, i) => (
                      <li key={i} className="text-lg leading-relaxed">
                        <p className="first-letter:text-5xl first-letter:font-black first-letter:text-[#ca4952] first-letter:float-left first-letter:mr-1 first-letter:leading-[0.85] first-letter:mt-1">
                          {step}
                        </p>
                        <div className="clear-both"></div>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            </div>
          </section>
        </div>

        {/* rodapé temático da página de detalhes */}
        <footer className="md:col-span-12 mt-24 border-t-4 border-[#fc2c37] pt-16 mb-10 text-center">
          <span
            className="text-[80px] md:text-[150px] text-[#ca4952] font-black uppercase leading-[0.7] tracking-tighter italic block"
            aria-hidden="true"
          >
            CHERRY
          </span>
          <div className="inline-block bg-[#3d5a5a] text-white px-10 py-2 -mt-4 rotate-[-1deg]">
            <p className="text-2xl md:text-4xl font-black uppercase tracking-tight">
              {texts.dinerQuality || "Qualidade Diner!"}
            </p>
          </div>
          <p className="mt-10 text-xl font-serif italic text-gray-500 max-w-xl mx-auto">
            
            {texts.footerQuote ||
              "Mantendo viva a magia da cozinha clássica desde os tempos das jukeboxes e dos milkshakes."}
            
          </p>
        </footer>
      </div>
    </article>
  );
};

export default RecipeDetail;
