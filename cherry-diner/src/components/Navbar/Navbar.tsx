import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import logoImg from "../../assets/images/logos/logo.png";
import { recipeImages } from "../../utils/recipeImages";

/**
 * interface: recipe
 * define a estrutura de dados para o sistema de busca global.
 */
interface Recipe {
  id: string;
  title_pt: string;
  title_en: string;
  category: string;
  image: string;
}

const Navbar = () => {
  // acesso ao contexto de idioma para textos, estado atual e função de troca
  const { texts, language, setLanguage } = useLanguage();

  // estados de controle para abertura de modais e menus
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // estados para a lógica de busca com debounce
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [userName, setUserName] = useState<string | null>(null);
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // fetch do cardápio: carrega os dados das receitas do arquivo json
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/data/recipes.json");
        if (!response.ok) throw new Error("Erro ao buscar o cardápio!");
        const data = await response.json();
        setRecipesData(data);
      } catch (error) {
        console.error("Ops!", error);
      }
    };
    fetchRecipes();
  }, []);

  // trava de scroll: impede que o fundo da página role quando o menu ou busca estão ativos
  useEffect(() => {
    document.body.style.overflow =
      isSearchOpen || isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSearchOpen, isMenuOpen]);

  // debounce da busca: aguarda 150ms após a digitação para atualizar a query filtrada
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 150);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  /**
   * usememo: filtro de receitas inteligente.
   * remove acentos e busca em ambos os idiomas (pt/en) para resultados mais precisos.
   */
  const filteredRecipes = useMemo(() => {
    const removeAccents = (str: string) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const querySemAcento = removeAccents(debouncedQuery.toLowerCase());

    if (!querySemAcento) return recipesData.slice(0, 8);

    return recipesData
      .filter((recipe) => {
        const titlePt = removeAccents((recipe.title_pt || "").toLowerCase());
        const titleEn = removeAccents((recipe.title_en || "").toLowerCase());
        return (
          titlePt.includes(querySemAcento) || titleEn.includes(querySemAcento)
        );
      })
      .slice(0, 8);
  }, [debouncedQuery, recipesData]);

  // sincronização de rota: reseta menus e busca, e verifica login ao mudar de página
  useEffect(() => {
    const timer = setTimeout(() => {
      const storedUser = localStorage.getItem("@CherryDiner:userName");
      setUserName(storedUser);
      if (isSearchOpen) setIsSearchOpen(false);
      if (isMenuOpen) setIsMenuOpen(false);
      if (searchQuery !== "") setSearchQuery("");
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("@CherryDiner:userName");
    setUserName(null);
    navigate("/");
  };

  // gerenciamento de estilos ativos para os links da navegação
  const getLinkStyle = (path: string, isMobile = false) => {
    const isActive = location.pathname === path;
    if (isMobile) {
      return isActive
        ? "px-6 py-4 rounded-2xl bg-[#d13a3a] text-white shadow-lg font-bold text-xl transition-all"
        : "px-6 py-4 rounded-2xl bg-white border border-[#e9dcc9] text-[#5c3d2e] font-bold text-xl hover:border-[#d13a3a] transition-all";
    }
    return isActive
      ? "px-5 py-2 rounded-full bg-[#d13a3a] text-white shadow-md font-bold text-[13px] transition-all"
      : "px-5 py-2 rounded-full text-[#5c3d2e] hover:text-[#d13a3a] hover:bg-[#d13a3a]/5 font-bold text-[13px] transition-all border border-transparent";
  };

  // função para scroll horizontal manual nos resultados da busca
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - clientWidth
            : scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* barra de navegação principal (sticky) */}
      <header className="sticky top-0 z-50 w-full bg-[#fdf8f1] border-b-2 border-[#e9dcc9]">
        <nav className="max-w-[1300px] mx-auto px-6 h-24 flex items-center justify-between relative">
          <Link
            to="/"
            className="hover:scale-105 transition-transform duration-300"
          >
            <img
              src={logoImg}
              alt="Cherry'Diner"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* links de navegação para desktop */}
          <ul className="hidden md:flex items-center gap-2">
            {[
              { path: "/", label: texts.navHome },
              { path: "/receitas", label: texts.navRecipes },
              {
                path: "/categorias",
                label: language === "pt" ? "CATEGORIAS" : "CATEGORIES",
              },
              { path: "/sobre", label: texts.navAbout },
              {
                path: "/contato",
                label: language === "pt" ? "CONTATO" : "CONTACT",
              },
            ].map((item, index) => (
              <li key={item.path} className="flex items-center">
                <Link to={item.path} className={getLinkStyle(item.path)}>
                  {item.label.toUpperCase()}
                </Link>
                {index < 4 && (
                  <span className="text-[#dfd2c2] mx-2 opacity-50">•</span>
                )}
              </li>
            ))}
          </ul>

          {/* grupo de controles: busca, login e menu mobile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="group flex items-center bg-[#f3ede4] border-1 border-[#e9dcc9] hover:border-[#d13a3a] px-4 py-2 rounded-full text-[#5c3d2e] transition-all cursor-pointer"
            >
              <span className="hidden lg:inline mr-3 font-bold text-xs tracking-widest">
                {language === "pt" ? "BUSCAR" : "SEARCH"}
              </span>
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
                className="group-hover:text-[#d13a3a]"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* condicional de exibição: usuário logado vs link de login */}
            {userName ? (
              <div className="flex items-center bg-white border-2 border-[#e9dcc9] rounded-full pl-4 pr-1.5 py-1.5 shadow-sm">
                <span className="text-[#5c3d2e] font-bold text-[13px] mr-3 truncate max-w-[100px]">
                  {language === "pt" ? "Olá" : "Hi"}, {userName.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-[#f3ede4] p-1.5 rounded-full text-[#a89d91] hover:bg-[#d13a3a] hover:text-white transition-all cursor-pointer"
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2.5 bg-[#f3ede4] text-[#5c3d2e] hover:bg-[#d13a3a] hover:text-white rounded-full transition-all shadow-sm border-1 border-[#e9dcc9]"
              >
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            )}

            {/* botão hambúrguer para mobile */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2.5 bg-[#d13a3a] text-white rounded-xl shadow-md cursor-pointer transition-all"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* seletor de idioma: posicionado de forma absoluta abaixo da navbar */}
          <div className="absolute top-full right-6 md:right-10 flex bg-[#fdf8f1] rounded-b-2xl px-2 pb-1.5 pt-0.5 border-x-2 border-b-2 border-[#e9dcc9] shadow-sm z-[40]">
            <button
              onClick={() => setLanguage("pt")}
              className={`px-3 py-1 rounded-lg text-[9px] font-black cursor-pointer transition-all ${language === "pt" ? "bg-[#ca4952] text-white shadow-sm" : "text-[#a89d91] hover:text-[#5c3d2e]"}`}
            >
              PT
            </button>
            <div className="w-[1px] h-3 bg-[#e9dcc9] mx-1 self-center"></div>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded-lg text-[9px] font-black cursor-pointer transition-all ${language === "en" ? "bg-[#ca4952] text-white shadow-sm" : "text-[#a89d91] hover:text-[#5c3d2e]"}`}
            >
              EN
            </button>
          </div>
        </nav>
      </header>

      {/* drawer mobile: menu lateral expansível */}
      <div
        className={`fixed inset-0 bg-[#5c3d2e]/40 z-[100] transition-all duration-500 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsMenuOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 w-full max-w-[320px] h-full bg-[#fdfaf5] z-[110] shadow-2xl transition-transform duration-500 ease-out transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} flex flex-col p-8 overflow-y-auto`}
      >
        <div className="flex items-center justify-between mb-12">
          <img src={logoImg} alt="Logo" className="h-12 w-auto" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 bg-[#f3ede4] text-[#d13a3a] rounded-full cursor-pointer hover:rotate-90 transition-all border-1 border-[#e9dcc9]"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* estado de login no menu mobile */}
        <div className="mb-8 border-b-2 border-[#e9dcc9] pb-8">
          {userName ? (
            <div className="flex items-center justify-between bg-white border border-[#e9dcc9] p-4 rounded-2xl shadow-sm">
              <span className="text-[#5c3d2e] font-bold text-lg truncate">
                Olá, {userName.split(" ")[0]}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-[#f3ede4] text-[#ca4952] px-4 py-2 rounded-xl font-bold text-xs uppercase cursor-pointer"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center w-full bg-[#f3ede4] text-[#5c3d2e] hover:bg-[#d13a3a] hover:text-white transition-colors py-4 rounded-2xl font-bold text-lg gap-3 border-1 border-[#e9dcc9]"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {language === "pt" ? "Fazer Login" : "Login"}
            </Link>
          )}
        </div>

        <nav className="flex flex-col gap-4">
          {[
            { path: "/", label: texts.navHome },
            { path: "/receitas", label: texts.navRecipes },
            {
              path: "/categorias",
              label: language === "pt" ? "Categorias" : "Categories",
            },
            { path: "/sobre", label: texts.navAbout },
            {
              path: "/contato",
              label: language === "pt" ? "Contato" : "Contact",
            },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={getLinkStyle(item.path, true)}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* painel de busca global: sobreposição inferior para pesquisa de receitas */}
      <div
        className={`fixed inset-0 bg-[#5c3d2e]/40 z-[60] transition-opacity duration-300 ${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsSearchOpen(false)}
      />
      <aside
        className={`fixed bottom-0 left-0 w-full h-[85vh] bg-[#fdfaf5] z-[70] transition-transform duration-500 ease-out transform ${isSearchOpen ? "translate-y-0" : "translate-y-full"} border-t-2 border-[#ca4952]`}
      >
        {isSearchOpen && (
          <div className="max-w-[1100px] mx-auto p-6 md:p-10 h-full flex flex-col relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="mx-auto mb-8 text-[#ca4952] p-2 bg-[#f3ede4] rounded-full cursor-pointer transition-all hover:rotate-90"
            >
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="m7 10 5 5 5-5" />
              </svg>
            </button>

            {/* input de busca com estilo diner */}
            <div className="relative mb-10 max-w-[750px] mx-auto w-full group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#ca4952] transition-transform duration-300 group-focus-within:scale-110">
                <svg
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "pt"
                    ? "O que vamos cozinhar hoje?"
                    : "What are we cooking today?"
                }
                className="w-full text-xl md:text-2xl pl-16 pr-6 py-5 bg-white rounded-2xl border-4 border-double border-[#e9dcc9] focus:border-[#ca4952] outline-none transition-all text-[#5c3d2e] placeholder:text-[#ccbeaa] shadow-[6px_6px_0px_#f3ede4]"
                style={{ fontFamily: "'Comfortaa', cursive" }}
              />
            </div>

            {/* container de resultados filtrados */}
            <div className="relative flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-6 border-b-2 border-[#e9dcc9] pb-4">
                <h3 className="text-[#8c6b5d] uppercase text-[11px] font-bold tracking-[0.4em]">
                  {debouncedQuery
                    ? language === "pt"
                      ? "Pedidos Encontrados"
                      : "Orders Found"
                    : language === "pt"
                      ? "Sugestões da Casa"
                      : "House Suggestions"}
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => scroll("left")}
                    className="p-2.5 bg-white border-2 border-[#e9dcc9] text-[#ca4952] rounded-full hover:bg-[#ca4952] hover:text-white transition-all active:translate-y-1 cursor-pointer"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    className="p-2.5 bg-white border-2 border-[#e9dcc9] text-[#ca4952] rounded-full hover:bg-[#ca4952] hover:text-white transition-all active:translate-y-1 cursor-pointer"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* lista horizontal de resultados com imagens mapeadas */}
              <div
                ref={scrollRef}
                className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 pt-2 px-1"
              >
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => {
                      navigate(`/receitas/${recipe.id}`);
                      setIsSearchOpen(false);
                    }}
                    className="w-[150px] md:w-[190px] flex-none bg-[#fdfaf5] p-2.5 rounded-[2rem] border-2 border-[#e9dcc9] group cursor-pointer hover:border-[#ca4952] hover:shadow-[6px_6px_0px_#f3ede4] transition-all duration-300 flex flex-col"
                  >
                    <div className="w-full aspect-[3/4] bg-white rounded-[1.5rem] mb-3 overflow-hidden relative border border-[#e9dcc9]/50 isolate">
                      <img
                        src={
                          recipeImages[recipe.id as keyof typeof recipeImages]
                        }
                        alt={
                          language === "pt" ? recipe.title_pt : recipe.title_en
                        }
                        loading="lazy"
                        className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-700 ease-out rounded-[1.5rem]"
                      />
                    </div>
                    <h4
                      className="text-[#5c3d2e] font-black text-[11px] md:text-[13px] uppercase tracking-widest text-center px-1 leading-tight group-hover:text-[#ca4952]"
                      style={{ fontFamily: "'Comfortaa', cursive" }}
                    >
                      {language === "pt" ? recipe.title_pt : recipe.title_en}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 pb-2 text-center border-t border-[#e9dcc9]/50">
              <Link
                to="/receitas"
                onClick={() => setIsSearchOpen(false)}
                className="inline-flex items-center gap-3 text-[#ca4952] font-bold text-[11px] tracking-[0.4em] uppercase group"
              >
                <span className="w-8 h-[2px] bg-[#ca4952]/20 group-hover:w-12 transition-all"></span>
                {language === "pt"
                  ? "Explorar Cardápio Completo"
                  : "Explore Full Menu"}
                <span className="w-8 h-[2px] bg-[#ca4952]/20 group-hover:w-12 transition-all"></span>
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Navbar;
