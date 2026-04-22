import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

interface CategorySectionProps {
  catId: string;
  index: number;
  label: string;
  desc: string;
  color: string;
  image: string;
}

const CategorySection = ({
  catId,
  index,
  label,
  desc,
  color,
  image,
}: CategorySectionProps) => {
  const { texts, language } = useLanguage();

  /* logica para alternar a direcao do layout: indices pares alinham a imagem a esquerda e impares a direita. */
  const isEven = index % 2 === 0;

  return (
    <Link
      to={`/receitas?categoria=${catId}`}
      /* aria-label: fornece contexto claro para o link, unindo a acao ao nome da categoria. */
      aria-label={`${texts.exploreSectionBtn || "Explorar"} ${label}`}
      /* container principal: utiliza flex-row ou flex-row-reverse no desktop para criar o efeito de zigue-zague. */
      className={`group relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16 transition-all duration-1000`}
    >
      {/* area visual: contem a imagem da categoria com moldura estilizada e efeitos de escala no hover. */}
      <div className="w-full md:w-3/5 relative">
        <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] bg-white p-2 border-1 border-[#e8e0d8] transition-transform duration-700 group-hover:scale-[1.02]">
          <div className="aspect-[16/10] overflow-hidden rounded-lg">
            <img
              src={image}
              alt=""
              /* aria-hidden: a imagem e puramente ilustrativa dentro de um link ja rotulado. */
              aria-hidden="true"
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
          </div>
          {/* overlay de gradiente interno para suavizar as bordas da imagem. */}
          <div
            className="absolute inset-3 rounded-lg bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-60"
            aria-hidden="true"
          ></div>
        </div>

        {/* numero decorativo: posicionado de forma absoluta, escondido de tecnologias assistivas pois e estetico. */}
        <div
          className={`absolute -bottom-6 ${isEven ? "-right-6" : "-left-6"} hidden md:flex w-24 h-24 items-center justify-center rounded-full bg-white shadow-xl z-20 border border-[#eee3d5] text-2xl font-black transition-transform duration-700 group-hover:rotate-12`}
          aria-hidden="true"
          style={{
            color: color,
            fontFamily: "'Dancing Script', cursive",
          }}
        >
          0{index + 1}
        </div>
      </div>

      {/* area de conteudo: alinha o texto de acordo com a posicao da imagem (esquerda ou direita). */}
      <div
        className={`w-full md:w-2/5 flex flex-col items-center ${isEven ? "md:items-start md:text-left" : "md:items-end md:text-right"} text-center`}
      >
        <span
          className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-50"
          style={{ color: color }}
        >
          {language === "pt" ? "coleção" : "collection"}
        </span>

        <h3
          className="text-4xl font-black uppercase tracking-tighter mb-6 leading-tight transition-colors duration-500 group-hover:text-[#ca4952]"
          style={{
            fontFamily: "'Comfortaa', cursive",
            color: color,
          }}
        >
          {label}
        </h3>

        {/* separador visual minimalista. */}
        <div
          className="h-[1px] w-20 mb-8 bg-[#e5dcd3]"
          aria-hidden="true"
        ></div>

        <p className="text-[#8c6b5d] text-lg font-serif italic leading-relaxed opacity-80 mb-10 px-4 md:px-0">
          {desc}
        </p>

        {/* botao de call-to-action interno com animacao de translaçao no icone de seta. */}
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
              aria-hidden="true"
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
};

export default CategorySection;
