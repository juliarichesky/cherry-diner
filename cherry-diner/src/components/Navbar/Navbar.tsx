import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../../assets/images/logos/logo-2.png";

const Navbar = () => {
  // estados para controlar se a busca ou o menu mobile estão abertos
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // referencia para controlar o movimento do carrossel de receitas
  const scrollRef = useRef<HTMLDivElement>(null);

  // hook para identificar em qual pagina o usuario esta navegando
  const location = useLocation();

  // lista ficticia de receitas para mostrar no painel de busca
  const recipes = [
    { id: 1, title: "Cheeseburger Clássico", category: "Principal" },
    { id: 2, title: "Milkshake de Cereja", category: "Bebida" },
    { id: 3, title: "Panquecas Americanas", category: "Doce" },
    { id: 4, title: "Waffles com Menta", category: "Café" },
    { id: 5, title: "Cherry Pie Retro", category: "Sobremesa" },
  ];

  // função que decide o estilo do link (se estiver na pagina, fica vermelho/bento)
  const getLinkStyle = (path: string, isMobile = false) => {
    const isActive = location.pathname === path;

    // estilos base para evitar o efeito de "quadrado" antes de arredondar
    const baseDesktop =
      "px-4 py-1.5 rounded-full transition-all duration-300 ease-in-out border border-transparent";
    const baseMobile =
      "px-6 py-3 rounded-xl transition-all duration-500 ease-in-out w-full block";

    // logica para links no menu mobile
    if (isMobile) {
      return isActive
        ? `${baseMobile} bg-[#d13a3a] text-white shadow-md`
        : `${baseMobile} text-[#5c3d2e] hover:bg-[#d13a3a]/5`;
    }

    // logica para links no menu desktop
    return isActive
      ? `${baseDesktop} bg-[#d13a3a] text-white shadow-sm`
      : `${baseDesktop} text-[#5c3d2e] hover:text-[#d13a3a] hover:bg-[#d13a3a]/5`;
  };

  // função para rolar o carrossel de receitas para a esquerda ou direita
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* cabecalho fixo no topo com efeito de desfoque (glassmorphism) */}
      <header className="sticky top-0 z-50 w-full bg-[#fdf8f1]/90 backdrop-blur-md border-b border-[#e9dcc9]">
        <nav
          className="max-w-[1300px] mx-auto px-4 h-24 flex items-center justify-between"
          aria-label="Main Navigation"
        >
          {/* logo do site que volta para a home ao clicar */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={logoImg}
                alt="Cherry'Diner Logo"
                className="h-20 w-auto object-contain"
              />
            </Link>
          </div>

          {/* lista de links de navegacao para desktop (somem em telas pequenas) */}
          <ul className="hidden md:flex items-center gap-1 text-[#5c3d2e] font-bold text-[13px]">
            <li>
              <Link to="/" className={getLinkStyle("/")}>
                Início
              </Link>
            </li>
            <li className="text-[#e9dcc9] mx-1">•</li>
            <li>
              <Link to="/receitas" className={getLinkStyle("/receitas")}>
                Receitas
              </Link>
            </li>
            <li className="text-[#e9dcc9] mx-1">•</li>
            <li>
              <Link to="/categorias" className={getLinkStyle("/categorias")}>
                Categorias
              </Link>
            </li>
            <li className="text-[#e9dcc9] mx-1">•</li>
            <li>
              <Link to="/sobre" className={getLinkStyle("/sobre")}>
                Sobre
              </Link>
            </li>
            <li className="text-[#e9dcc9] mx-1">•</li>
            <li>
              <Link to="/contato" className={getLinkStyle("/contato")}>
                Contato
              </Link>
            </li>
          </ul>

          {/* area direita com icones de busca, login e o menu hamburguer */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* botao que abre a gaveta de busca */}
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center bg-white/60 border border-[#e9dcc9] px-3 py-1.5 rounded-full text-[#a89d91] text-xs hover:bg-white transition-all shadow-sm cursor-pointer"
            >
              <span className="hidden lg:inline mr-2">Buscar...</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* link para a pagina de login */}
            <Link
              to="/login"
              className="p-2 text-[#5c3d2e] hover:bg-[#d13a3a]/10 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* icone de hamburguer que so aparece no mobile */}
            <button
              onClick={() => {
                setIsMenuOpen(true);
                setIsSearchOpen(false);
              }}
              className="md:hidden p-2 text-[#d13a3a]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* fundo escuro semi-transparente que aparece quando o menu lateral abre */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* menu lateral mobile (drawer) que desliza da direita para esquerda */}
      <aside
        className={`fixed top-0 right-0 w-[280px] h-full bg-[#fdfaf5] z-[110] shadow-2xl transition-transform duration-500 ease-in-out transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} p-8`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="mb-12 text-[#d13a3a]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-bold text-lg italic ${getLinkStyle("/", true)}`}
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              to="/receitas"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-bold text-lg italic ${getLinkStyle("/receitas", true)}`}
            >
              Receitas
            </Link>
          </li>
          <li>
            <Link
              to="/categorias"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-bold text-lg italic ${getLinkStyle("/categorias", true)}`}
            >
              Categorias
            </Link>
          </li>
          <li>
            <Link
              to="/sobre"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-bold text-lg italic ${getLinkStyle("/sobre", true)}`}
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link
              to="/contato"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-bold text-lg italic ${getLinkStyle("/contato", true)}`}
            >
              Contato
            </Link>
          </li>
        </ul>
      </aside>

      {/* fundo escuro para o painel de busca */}
      <div
        className={`fixed inset-0 bg-black/10 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsSearchOpen(false)}
      />

      {/* painel de busca que desliza de baixo para cima */}
      <aside
        className={`fixed bottom-0 left-0 w-full h-[85vh] bg-[#fdfaf5] shadow-2xl z-[70] transition-transform duration-500 ease-out transform ${isSearchOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="max-w-[1100px] mx-auto p-6 md:p-10 h-full flex flex-col ">
          {/* seta animada para fechar a busca */}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="mx-auto mb-4 text-[#d13a3a] animate-bounce cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m7 10 5 5 5-5" />
            </svg>
          </button>

          {/* formulario de busca com entrada de texto */}
          <form
            className="relative mb-12 max-w-[700px] mx-auto w-full"
            onSubmit={(e) => {
              e.preventDefault(); // evita que a pagina recarregue ao buscar
              console.log("buscando..."); // aqui vamos colocar a lógica de busca depois
            }}
          >
            {/* input principal de busca */}
            <input
              autoFocus={isSearchOpen}
              type="search"
              placeholder="Pesquisar receita..."
              className="w-full text-xl md:text-2xl pl-6 pr-14 py-4 bg-white rounded-2xl border-2 border-[#f3ede4] outline-none focus:border-[#d13a3a] transition-all text-[#5c3d2e] placeholder:text-[#b8a487] shadow-sm"
            />

            {/* botao de lupa posicionado na direita que funciona como o enter */}
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d13a3a] hover:scale-110 transition-transform p-2 cursor-pointer"
              aria-label="Pesquisar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>

          {/* secao do carrossel com sugestoes rapidas de receitas */}
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#8a7156] uppercase text-[10px] tracking-[0.3em]">
                Sugestões Recentes
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="p-2 border border-[#e9dcc9] rounded-full hover:bg-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 border border-[#e9dcc9] rounded-full hover:bg-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* area de rolagem horizontal das receitas */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-hidden scroll-smooth pb-4 px-2"
            >
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="min-w-[200px] md:min-w-[240px] bg-white p-3 rounded-[2rem] shadow-sm border border-[#f3ede4] flex-shrink-0 group cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="aspect-[4/5] bg-[#fdf8f1] rounded-[1.5rem] mb-3 overflow-hidden flex items-center justify-center text-[#e9dcc9] italic">
                    {recipe.category}
                  </div>
                  <h4 className="text-[#5c3d2e] font-bold text-sm text-center group-hover:text-[#d13a3a]">
                    {recipe.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* botao inferior para navegar para a lista completa de receitas */}
          <div className="mt-auto py-8 text-center">
            <button className="text-[#d13a3a] font-bold text-sm border-b-2 border-[#d13a3a]/20 hover:border-[#d13a3a] transition-all cursor-pointer">
              Ver todas as receitas 🍒
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
