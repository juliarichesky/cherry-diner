import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { recipeImages } from "../../utils/recipeImages";

/**
 * interface: recipeprops
 * define as propriedades esperadas pelo card, incluindo suporte total ao bilinguismo.
 */
interface RecipeProps {
  recipe: {
    id: string;
    category: string;
    category_pt?: string;
    category_en?: string;
    prepTime: string;
    title_pt: string;
    title_en: string;
    difficulty_pt: string;
    difficulty_en: string;
    description_pt?: string;
    description_en?: string;
  };
}

const RecipeCard = ({ recipe }: RecipeProps) => {
  // hook para identificar o idioma ativo (pt/en) e acessar o dicionário de textos
  const { language, texts } = useLanguage();

  return (
    <Link
      to={`/receitas/${recipe.id}`}
      /* aria-label para que o leitor de tela saiba exatamente para onde o link aponta */
      aria-label={`${language === "pt" ? "Ver receita de" : "View recipe for"} ${language === "pt" ? recipe.title_pt : recipe.title_en}`}
      className="group relative block bg-white p-4 rounded-2xl border border-[#e5dcd3] shadow-[0_10px_30px_rgba(61,90,90,0.05)] hover:shadow-[0_20px_40px_rgba(202,73,82,0.15)] hover:-translate-y-2 transition-all duration-500"
    >
      {/* moldura da imagem e badge de categoria dinâmico */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#f9f4ef]">
        <img
          src={recipeImages[recipe.id]}
          alt={language === "pt" ? recipe.title_pt : recipe.title_en}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* badge de categoria bilingue posicionado sobre a imagem */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-[#ca4952] border border-[#ca4952]/20">
          {language === "pt" ? recipe.category_pt : recipe.category_en}
        </div>
      </div>

      {/* conteúdo do card com tipografia bilingue */}
      <div className="mt-6 text-center">
        {/* título dinâmico com fonte comfortaa */}
        <h3
          className="text-[#3d5a5a] text-2xl font-black leading-tight group-hover:text-[#ca4952] transition-colors"
          style={{ fontFamily: "'Comfortaa', cursive" }}
        >
          {language === "pt" ? recipe.title_pt : recipe.title_en}
        </h3>

        {/* descrição dinâmica com fallback para evitar espaços vazios */}
        <p className="mt-3 text-[#8c6b5d] text-sm font-serif italic line-clamp-2 px-2 opacity-80">
          {language === "pt"
            ? recipe.description_pt ||
              "Uma deliciosa opção do cardápio cherry diner."
            : recipe.description_en ||
              "A delicious option from the cherry diner menu."}
        </p>

        {/* informações técnicas: tempo de preparo e nível de dificuldade */}
        <footer className="mt-6 pt-4 border-t border-dashed border-[#e5dcd3] flex items-center justify-around">
          {/* coluna de preparo com tag time para semantica de duracao */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-tighter text-[#ca4952]">
              {texts.prepLabel || "preparo"}
            </span>
            <time className="text-[10px] font-bold text-[#3d5a5a]">
              {recipe.prepTime}
            </time>
          </div>

          {/* divisor vertical estético */}
          <div className="w-[1px] h-6 bg-[#e5dcd3]" aria-hidden="true"></div>

          {/* coluna de dificuldade */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-tighter text-[#ca4952]">
              {texts.levelLabel || "nível"}
            </span>
            <span className="text-[10px] font-bold text-[#3d5a5a]">
              {language === "pt" ? recipe.difficulty_pt : recipe.difficulty_en}
            </span>
          </div>
        </footer>
      </div>

      {/* selo decorativo (stamp) - aria-hidden pois o texto ja esta no label do link */}
      <div
        className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#ca4952] rounded-full flex items-center justify-center text-white text-[9px] font-black uppercase rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg border-2 border-white"
        aria-hidden="true"
      >
        {language === "pt" ? "ver!" : "view!"}
      </div>
    </Link>
  );
};

export default RecipeCard;
