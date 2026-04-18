import { Link } from "react-router-dom";
import { useState } from "react";

// definição das props para o card de receita
interface RecipeProps {
  id: number;
  tag: string;
  tagColor: string;
  image: string;
  title: string;
  description: string;
  metaText: string;
  likes: number;
}

// componente filho: o card da receita
const RecipeCard = ({
  id,
  tag,
  tagColor,
  image,
  title,
  description,
  metaText,
}: RecipeProps) => {
  return (
    <article className="relative h-full">
      <div className="bg-[#fdf8f1] rounded-[2.5rem] p-4 shadow-sm border border-[#e5dcd3] flex flex-col transition-all hover:shadow-xl duration-300 h-full group">
        {/* cabeçalho: tag e coração */}
        <header className="flex justify-between items-center mb-3 px-2">
          <span
            className="px-4 py-1 rounded-full text-[10px] md:text-xs font-bold text-white uppercase tracking-wider"
            style={{ backgroundColor: tagColor }}
          >
            {tag}
          </span>
          <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-[#ca4952] border border-[#f3eae0] hover:bg-[#ca4952] hover:text-white transition-colors">
            ❤
          </button>
        </header>

        {/* imagem com borda interna */}
        <figure className="relative rounded-[2rem] overflow-hidden border-2 border-[#eee3d5] mb-4 aspect-square md:aspect-auto md:h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </figure>

        {/* conteúdo */}
        <div className="px-2 flex flex-col flex-grow">
          <h3
            className="text-[#3d5a5a] text-xl md:text-2xl font-bold mb-2 transition-colors group-hover:text-[#ca4952]"
            style={{ fontFamily: "'Comfortaa', cursive" }}
          >
            {title}
          </h3>
          <p className="text-[#8c6b5d] text-xs md:text-sm leading-relaxed mb-6">
            {description}
          </p>

          {/* rodapé: relógio cinza e link simples */}
          <footer className="mt-auto flex items-center justify-between pt-4 border-t border-[#eee3d5]">
            <div className="flex items-center gap-2 text-[#8c6b5d] font-bold text-[11px] md:text-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#8c6b5d]/70"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{metaText}</span>
            </div>

            <Link
              to={`/receita/${id}`}
              className="flex items-center gap-1 text-[#ca4952] font-bold text-xs md:text-sm hover:underline transition-all"
            >
              Ver
              <span className="text-lg">➔</span>
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
};

// componente pai
const HomeHighlights = () => {
  const [activeBtn, setActiveBtn] = useState(false);

  const recipes: RecipeProps[] = [
    {
      id: 1,
      tag: "Principal",
      tagColor: "#6b8e8e",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600",
      title: "Cheeseburger",
      description: "Clássico, suculento e delicioso!",
      metaText: "25min",
      likes: 17,
    },
    {
      id: 2,
      tag: "Bebida",
      tagColor: "#929292",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600",
      title: "Milkshake",
      description: "Cremoso, gelado e perfeito!",
      metaText: "10min",
      likes: 13,
    },
    {
      id: 3,
      tag: "Novo",
      tagColor: "#d38e7d",
      image:
        "https://images.unsplash.com/photo-1565299543923-37dd37887442?q=80&w=781",
      title: "Panquecas",
      description: "Doces, fofas e tentadoras!",
      metaText: "20min",
      likes: 17,
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-32 px-4 sm:px-10 lg:px-16 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 z-0 bg-[#a8cfbc]" />
      <div className="relative z-10 max-w-[1300px] mx-auto bg-[#fdfaf5]/90 backdrop-blur-md rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 pb-24 md:pb-32 shadow-xl border border-white/40">
        <header className="mb-10 md:mb-16 text-center">
          <h2
            className="text-[#ca4952] text-2xl md:text-5xl font-bold"
            style={{ fontFamily: "'Comfortaa', cursive" }}
          >
            Receitas em Destaque
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mb-12">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>

        {/* botão slider centralizado (rosa -> verde sage) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full flex justify-center px-4">
          <div
            className="relative bg-[#f3eae0] p-1.5 rounded-full shadow-lg w-full max-w-[280px] md:max-w-[360px] border border-white"
            onMouseEnter={() => setActiveBtn(true)}
            onMouseLeave={() => setActiveBtn(false)}
          >
            <div
              className="absolute inset-1.5 pointer-events-none"
              aria-hidden="true"
            >
              {/* slider rosa */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ${activeBtn ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
                style={{
                  background:
                    "linear-gradient(180deg, #ff6b6b 0%, #d13a3a 70%, #a82828 100%)",
                }}
              />

              {/* slider verde sage #70a283 */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ${activeBtn ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                style={{
                  background:
                    "linear-gradient(180deg, #8ab599 0%, #70a283 70%, #5d8a6d 100%)",
                }}
              />
            </div>

            <Link
              to="/receitas"
              className="relative z-10 flex justify-center items-center py-3.5 rounded-full text-base md:text-lg text-white"
            >
              <span>Ver todas receitas</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHighlights;