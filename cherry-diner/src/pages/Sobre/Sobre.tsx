import { useLanguage } from "../../context/LanguageContext";
import PageHeader from "../../components/PageHeader/PageHeader";
import AboutStory from "../../components/AboutStory/AboutStory";
import AboutFacts from "../../components/AboutFacts/AboutFacts";

/**
 * componente de página: sobre
 * centraliza a narrativa da marca, combinando o cabeçalho dinâmico,
 * a história visual e o mural de curiosidades.
 */
const Sobre = () => {
  // acesso aos textos traduzidos para a frase de destaque
  const { texts } = useLanguage();

  return (
    <section className="w-full py-16 bg-[#fdfaf5] min-h-screen relative overflow-hidden">
      {/* detalhe decorativo de fundo: um bloco suave inclinado que adiciona profundidade visual */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f3eae0]/20 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-10 relative z-10">
        {/* cabeçalho da página configurado para a seção 'sobre' */}
        <header>
          <PageHeader page="sobre" />
        </header>

        {/* bloco de citação/destaque:
            utiliza borda lateral e tipografia mista para dar ênfase à frase principal.
        */}
        <div className="mt-24 mb-12 text-left">
          <h3 className="text-[#ca4952] text-xl md:text-2xl font-light italic leading-tight border-l-4 border-[#ca4952] pl-6 max-w-2xl">
            "{texts.aboutHighlightPre}{" "}
            <span className="font-bold not-italic text-[#3d5a5a]">
              cadillac
            </span>{" "}
            {texts.aboutHighlightPost}"
          </h3>
        </div>

        {/* seção narrativa: história das fundadoras e elementos visuais (pins) */}
        <article>
          <AboutStory />
        </article>

        {/* seção de curiosidades: mural de "fatos" estilizado como comandas de restaurante */}
        <article>
          <AboutFacts />
        </article>
      </div>
    </section>
  );
};

export default Sobre;
