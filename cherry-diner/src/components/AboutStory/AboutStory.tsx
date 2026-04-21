import { useLanguage } from "../../context/LanguageContext";
import CadillacPin from "../../assets/images/pins/cadillac.png";
import KissPin from "../../assets/images/pins/kiss.png";
import JuliasPhoto from "../../assets/images/devs/julias.jpg";

/**
 * componente: aboutstory
 * versão otimizada com responsividade aprimorada e pins exclusivos para telas grandes.
 */
const AboutStory = () => {
  const { texts, language } = useLanguage();

  return (
    /**
     * o uso de items-stretch garante que o bloco de texto e a foto tenham
     * a mesma altura no desktop, mantendo o equilíbrio visual.
     */
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 relative items-stretch -mb-10">
      {/* cadillac pin: visível apenas em telas extra-largas (xl) para evitar sobreposição */}
      <div className="hidden xl:block absolute -top-16 right-[38%] z-30 pointer-events-none group">
        <div className="absolute inset-0 bg-black/10 blur-lg translate-x-4 translate-y-6 rounded-full group-hover:opacity-60 transition-opacity"></div>
        <img
          src={CadillacPin}
          alt="cadillac pin"
          className="relative z-10 w-40 h-auto rotate-[-10deg] animate-float"
        />
      </div>

      {/* bloco de texto: utiliza flex-col e justify-center para alinhar a história verticalmente */}
      <div className="md:col-span-7 relative flex">
        <div className="bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(61,90,90,0.05)] border border-[#e5dcd3] relative w-full flex flex-col justify-center">
          {/* badge superior fixo */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ca4952] text-white px-8 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg whitespace-nowrap z-20">
            {texts.aboutBadge || "sobre nós"}
          </div>

          <div className="font-serif text-[#643c3c] text-base md:text-lg leading-relaxed text-justify relative z-10">
            <p className="mb-4">
              {/* capitular dinâmica: 'a' em pt, 't' em en */}
              <span className="float-left text-7xl font-black text-[#ca4952] mr-4 leading-[0.7] mt-1">
                {language === "pt" ? "A" : "T"}
              </span>
              {texts.aboutPara1}
            </p>
            <p className="mb-4">{texts.aboutPara2}</p>

            {/* citação lateral com borda temática */}
            <p className="italic font-bold text-[#694a4a] border-l-2 border-[#ca4952] pl-4 text-left">
              {texts.aboutPara4}
            </p>
          </div>

          {/* beijo pin: também restrito ao desktop para manter a limpeza visual no tablet/mobile */}
          <div className="hidden xl:block absolute -bottom-15 -left-10 z-20 pointer-events-none group">
            <img
              src={KissPin}
              alt="beijo de batom"
              className="w-28 h-auto rotate-[-15deg] opacity-90 group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
            />
          </div>
        </div>
      </div>

      {/* coluna de perfil: estilizada como uma moldura de polaroid moderna */}
      <div className="md:col-span-5 flex">
        <div className="bg-white rounded-[20px] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-[#e5dcd3] w-full flex flex-col">
          {/* container da imagem: altura fixa de h-80 no mobile para não ocupar a tela inteira */}
          <div className="relative h-80 md:h-auto md:flex-grow overflow-hidden rounded-[15px] border border-[#e5dcd3] bg-[#f9f4ef]">
            <img
              src={JuliasPhoto}
              alt={texts.altJuliasPhoto}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ca4952]/10 to-transparent pointer-events-none"></div>
          </div>

          <div className="mt-6 text-center pb-2">
            <h4
              className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[#3d5a5a]"
              style={{ fontFamily: "'Comfortaa', cursive" }}
            >
              {texts.theJulias || "as julias"}
            </h4>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#ca4952] mt-1">
              {texts.foundersRole || "fundadoras"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStory;
