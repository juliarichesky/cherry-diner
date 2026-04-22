import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import logoImg from "../../assets/images/logos/logo.png";

/**
 * componente: notfound
 * página de erro 404 personalizada para o tema cherry diner.
 */
const NotFound = () => {
  const { language } = useLanguage();

  return (
    <main className="min-h-[100svh] bg-[#f1efe9] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* detalhe decorativo: borda xadrez superior sutil */}
      <div
        className="absolute top-0 left-0 w-full h-4 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-conic-gradient(#3d5a5a 100% 5%, #fdfaf5 0% 50%)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* cereja decorativa flutuante com animação de bounce suave */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none select-none">
        <span className="text-[200px] md:text-[300px] animate-bounce duration-[3000ms]">
          🍒
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* logo em marca d'água para contexto visual */}
        <img
          src={logoImg}
          alt="Cherry Diner"
          className="h-16 md:h-20 w-auto mb-8 opacity-80"
        />

        <h1 className="leading-none tracking-tighter">
          {/* número 404 em fonte moderna (comfortaa) */}
          <span
            className="block text-[#3d5a5a] text-8xl md:text-[12rem] font-black uppercase"
            style={{ fontFamily: "'Comfortaa', cursive" }}
          >
            404
          </span>
          {/* mensagem de erro com fonte cursiva estilizada */}
          <span
            className="block text-[#ca4952] text-4xl md:text-6xl -mt-6 md:-mt-12"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {language === "pt"
              ? "Ops! Milkshake derramado..."
              : "Oops! Spilled milkshake..."}
          </span>
        </h1>

        <p className="mt-8 md:mt-12 text-[#5c3d2e] text-base md:text-xl font-medium italic opacity-80 leading-relaxed font-serif max-w-md">
          {language === "pt"
            ? "Parece que você pegou a rota errada. Este prato não está no nosso cardápio hoje!"
            : "Looks like you took the wrong turn. This dish isn't on our menu today!"}
        </p>

        {/* 🍔 botão estilo jukebox: efeito de profundidade ao clicar (active:shadow-none) */}
        <div className="mt-12 group relative">
          <div className="absolute inset-0 bg-[#ca4952] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>

          <Link
            to="/"
            className="relative inline-flex items-center gap-3 px-10 py-4 bg-[#ca4952] text-white rounded-full font-black uppercase text-sm tracking-[0.2em] shadow-[0_8px_0px_#a82828] active:shadow-none active:translate-y-[8px] transition-all hover:bg-[#d13a3a]"
            style={{ fontFamily: "'Comfortaa', cursive" }}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            {language === "pt" ? "voltar ao balcão" : "back to counter"}
          </Link>
        </div>
      </div>

      {/* detalhe decorativo: borda xadrez inferior */}
      <div
        className="absolute bottom-0 left-0 w-full h-4 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-conic-gradient(#3d5a5a 0% 25%, #fdfaf5 0% 50%)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* carimbo decorativo 'quality service' no rodapé do desktop */}
      <div className="absolute bottom-10 right-10 hidden md:block opacity-10 rotate-12 border-4 border-[#ca4952] p-4 text-[#ca4952] font-black uppercase tracking-widest pointer-events-none">
        quality service
      </div>
    </main>
  );
};

export default NotFound;
