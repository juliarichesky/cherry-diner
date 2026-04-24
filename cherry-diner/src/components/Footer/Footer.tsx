import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

// Caminho da sua logo conforme solicitado
import logoImg from "../../assets/images/logos/logo.png";

const Footer = () => {
  const { texts } = useLanguage();

  const staff = [
    { nome: "Julia Valerio Guimarães da Silva", rm: "568275" },
    { nome: "Julia Silva Spanopoulos", rm: "566754" },
  ];

  const checkerboardStyle = {
    backgroundImage: `
      linear-gradient(45deg, #b2dbbb 25%, transparent 25%), 
      linear-gradient(-45deg, #b2dbbb 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #b2dbbb 75%),
      linear-gradient(-45deg, transparent 75%, #b2dbbb 75%)
    `,
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
  };

  return (
    <footer className="w-full bg-[#fdf8f1] border-t-2 border-[#eee3d5] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 pb-12 border-b border-[#eee3d5] text-center lg:text-left">
          {/* LADO ESQUERDO: LOGO + FRASE */}
          <section className="flex flex-col items-center lg:items-start">
            <Link
              to="/"
              className="transition-transform hover:scale-105"
              aria-label="Voltar para o início"
            >
              <img
                src={logoImg}
                alt="Cherry Diner Logo"
                className="h-20 md:h-24 w-auto mb-6 object-contain"
              />
            </Link>
            <p className="text-[#8c6b5d] text-md italic max-w-xs font-serif leading-relaxed opacity-80">
              {texts.footerSlogan}
            </p>
          </section>

          <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:mt-4">
            {/* Informações de contato envoltas na tag address para semântica correta */}
            <address className="flex flex-col items-center lg:items-start not-italic">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-[#ca4952]">
                {texts.navContact}
              </span>
              <a
                href="mailto:hello@cherrydiner.com"
                className="text-[#3d5a5a] text-sm md:text-base font-bold leading-tight mb-1 hover:text-[#ca4952] transition-colors"
                style={{ fontFamily: "'Comfortaa', cursive" }}
              >
                hello@cherrydiner.com
              </a>
              <a
                href="tel:+5511999999999"
                className="text-[#8c6b5d] text-xs font-medium opacity-70 hover:text-[#ca4952] transition-colors"
              >
                (11) 99999-9999
              </a>
            </address>

            {/* Lista de desenvolvedores estruturada semanticamente */}
            <ul className="flex flex-col md:flex-row gap-10 md:gap-16 list-none p-0">
              {staff.map((membro, index) => (
                <li
                  key={index}
                  className="flex flex-col items-center lg:items-start max-w-[200px]"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-[#ca4952]">
                    {texts.staffRole}
                  </span>
                  <p
                    className="text-[#3d5a5a] text-lg md:text-xl font-bold leading-tight"
                    style={{ fontFamily: "'Comfortaa', cursive" }}
                  >
                    {membro.nome}
                  </p>
                  <span className="text-[#8c6b5d] text-xs font-medium mt-2 opacity-60">
                    RM: {membro.rm}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-6 text-center md:text-left">
          <nav aria-label="Navegação secundária do rodapé">
            <ul className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 list-none p-0">
              {[
                { label: texts.navHome, path: "/" },
                { label: texts.navRecipes, path: "/receitas" },
                { label: texts.navCategories, path: "/categorias" },
                { label: texts.navAbout, path: "/sobre" },
                { label: texts.navContact, path: "/contato" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-[#3d5a5a] text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#ca4952] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <p className="text-[#8b6c5e] text-[10px] font-bold uppercase tracking-[0.3em]">
              © 2026 Cherry Diner • FIAP • 1TDSPA-2025
            </p>
          </div>
        </div>
      </div>

      {/* Detalhe xadrez decorativo - aria-hidden esconde do leitor de tela */}
      <div
        className="w-full h-10 mt-5 border-t border-[#b2dbbb]"
        style={checkerboardStyle}
        aria-hidden="true"
      ></div>
    </footer>
  );
};

export default Footer;
