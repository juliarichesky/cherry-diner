import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

/**
 * componente: teapot
 * implementação do easter egg '418 i'm a teapot'.
 * um erro satírico de primeiro de abril que se tornou parte da cultura web.
 */
const Teapot = () => {
  const { language } = useLanguage();

  return (
    /* utilizacao da tag main para identificar o conteudo principal desta rota de easter egg. */
    <main className="min-h-[100svh] bg-[#f1efe9] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* detalhe decorativo: borda checkerboard sutil no topo - aria-hidden esconde elementos decorativos. */}
      <div
        className="absolute top-0 left-0 w-full h-4 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-conic-gradient(#3d5a5a 0% 25%, #fdfaf5 0% 50%)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* ícone do bule: possui interação de hover e fumaça animada com delay */}
        <div className="relative mb-8 group" aria-hidden="true">
          <span className="text-[120px] md:text-[180px] leading-none block group-hover:rotate-[-10deg] transition-transform duration-500">
            🫖
          </span>
          {/* fumaça 1: animação de bounce padrão */}
          <span className="absolute -top-4 right-4 text-4xl animate-bounce opacity-40">
            💨
          </span>
          {/* fumaça 2: com atraso na animação para criar ritmo natural */}
          <span className="absolute -top-8 right-12 text-3xl animate-bounce opacity-20 [animation-delay:0.5s]">
            💨
          </span>
        </div>

        <h1 className="leading-none tracking-tighter">
          <span
            className="block text-[#3d5a5a] text-7xl md:text-9xl font-black uppercase"
            style={{ fontFamily: "'Comfortaa', cursive" }}
          >
            418
          </span>
          <span
            className="block text-[#ca4952] text-3xl md:text-5xl -mt-4 md:-mt-8"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {language === "pt" ? "Eu sou um Bule!" : "I'm a Teapot!"}
          </span>
        </h1>

        {/* box de descrição: estilo cartão postal/receita com borda tracejada */}
        <div
          className="mt-8 p-6 bg-white border-2 border-dashed border-[#e9dcc9] rounded-2xl shadow-sm relative"
          role="alert"
        >
          <p className="text-[#5c3d2e] text-sm md:text-lg font-medium italic leading-relaxed font-serif">
            {language === "pt"
              ? "Erro Inesperado: O servidor do Cherry Diner tentou passar café, mas descobriu que é, permanentemente, um bule de chá."
              : "Unexpected Error: The Cherry Diner server tried to brew coffee, but discovered it is, permanently, a teapot."}
          </p>
          {/* selo técnico: referência ao protocolo htcpcp/1.0 */}
          <div className="absolute -top-3 -right-3 bg-[#3d5a5a] text-white text-[9px] px-2 py-1 rounded font-black tracking-widest uppercase">
            rfc 2324 compliant
          </div>
        </div>

        {/* botão de retorno: estilo jukebox com sombra sólida que 'afunda' no clique */}
        <nav
          className="mt-12"
          aria-label={
            language === "pt" ? "Navegação de erro" : "Error navigation"
          }
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-3 bg-[#3d5a5a] text-white rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-[0_6px_0px_#2a3f3f] active:shadow-none active:translate-y-[6px] transition-all hover:bg-[#4a6b6b]"
            style={{ fontFamily: "'Comfortaa', cursive" }}
          >
            {language === "pt"
              ? "aceitar o chá e voltar"
              : "accept the tea & go back"}
          </Link>
        </nav>
      </div>

      {/* detalhe decorativo: borda checkerboard na base */}
      <div
        className="absolute bottom-0 left-0 w-full h-4 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-conic-gradient(#3d5a5a 0% 25%, #fdfaf5 0% 50%)",
          backgroundSize: "20px 20px",
        }}
      ></div>
    </main>
  );
};

export default Teapot;
