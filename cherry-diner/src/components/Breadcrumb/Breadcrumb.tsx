import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

/**
 * ícone de seta estilizado que reage ao hover do botão pai.
 */
const BackIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform group-hover:-translate-x-1"
    aria-hidden="true"
  >
    <path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * componente: homeicon
 * ícone decorativo para representar o ponto de partida da navegação.
 */
const HomeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-70 group-hover:opacity-100 transition-opacity"
    aria-hidden="true"
  >
    <path
      d="M3 10V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V10M12 2L21 10M12 2L3 10M12 2V12"
      stroke="#8c6b5d"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Breadcrumbs = () => {
  // hooks para acessar traduções, localização atual e funções de navegação
  const { texts } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * processamento da url:
   * divide o caminho em partes e remove termos técnicos como 'dificuldade'
   * para manter o rastro de navegação limpo para o usuário.
   */
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && x !== "dificuldade");

  // não renderiza nada se estiver na home (raiz)
  if (pathnames.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-[#fdf8f1] border-b border-[#e5dcd3] py-4"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <ol className="flex items-center space-x-2 md:space-x-3 text-[#8c6b5d] list-none p-0 m-0">
          {/* item: botão voltar
              utiliza o histórico do navegador e força o scroll para o topo 
              para garantir a melhor experiência de leitura.
          */}
          <li className="flex items-center mr-2 md:mr-4 border-r border-[#e5dcd3] pr-4 md:pr-6">
            <button
              onClick={() => {
                navigate(-1);
                // o timeout garante que o scroll ocorra após a troca de rota
                setTimeout(() => window.scrollTo(0, 0), 0);
              }}
              aria-label={texts.backBtn || "Voltar para a página anterior"}
              className="group flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#ca4952] hover:opacity-70 transition-all cursor-pointer"
            >
              <BackIcon />
              <span>{texts.backBtn}</span>
            </button>
          </li>

          {/* item: link fixo para home */}
          <li className="flex items-center group">
            <Link
              to="/"
              className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] group-hover:text-[#ca4952] transition-colors"
            >
              <HomeIcon />
              <span>{texts.navHome}</span>
            </Link>
          </li>

          {/* renderização dinâmica dos segmentos do caminho (pathnames) */}
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            /**
             * lógica de mapeamento de nomes:
             * converte slugs da url para nomes amigáveis e traduzidos.
             */
            let displayName =
              value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");

            if (value === "receitas") displayName = texts.navRecipes;
            if (value === "categorias") displayName = texts.navCategories;
            if (value === "sobre") displayName = texts.navAbout;
            if (value === "contato") displayName = texts.navContact;

            return (
              <li key={to} className="flex items-center gap-2">
                <span className="opacity-30 text-lg" aria-hidden="true">
                  /
                </span>
                {/* se for o último item, exibe apenas texto; caso contrário, exibe link */}
                {last ? (
                  <span
                    className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#ca4952]"
                    aria-current="page"
                  >
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:text-[#ca4952] transition-colors"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
