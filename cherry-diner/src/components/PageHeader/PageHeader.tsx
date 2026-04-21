import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

/**
 * interface: headerdata
 * define a estrutura de tradução e metadados para cada cabeçalho de página.
 */
interface HeaderData {
  title_pt: string;
  title_en: string;
  subtitle_pt: string;
  subtitle_en: string;
  year?: string;
}

/**
 * type: pageheadersmap
 * mapeia o identificador da página para seus respectivos dados de cabeçalho.
 */
type PageHeadersMap = Record<string, HeaderData>;

interface PageHeaderProps {
  // define quais páginas possuem cabeçalhos válidos no sistema
  page: "receitas" | "categorias" | "sobre" | "contato" | "dificuldade";
  dynamicTitle?: string; // título opcional para casos como "receitas > [nome da categoria]"
}

const PageHeader = ({ page, dynamicTitle }: PageHeaderProps) => {
  // hook para detectar o idioma ativo (pt ou en)
  const { language } = useLanguage();

  // estado para armazenar os dados carregados do arquivo json
  const [headers, setHeaders] = useState<PageHeadersMap | null>(null);

  /**
   * hook de efeito: carregamento de dados
   * busca as definições de texto no json local ao montar o componente.
   */
  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        const response = await fetch("/data/pageHeaders.json");
        if (!response.ok) throw new Error("erro ao buscar os cabeçalhos!");
        const data = await response.json();
        setHeaders(data);
      } catch (error) {
        console.error("erro ao carregar headers:", error);
      }
    };
    fetchHeaders();
  }, []);

  // impede a renderização caso os dados ainda não tenham sido carregados ou a página não exista no json
  if (!headers || !headers[page]) return null;

  const data = headers[page];

  return (
    <header className="mb-10 text-left border-b border-[#e5dcd3] pb-8">
      {/* título principal: renderiza a versão traduzida e anexa o título dinâmico, se houver */}
      <h2
        className="text-[#ca4952] text-5xl font-black mb-2"
        style={{ fontFamily: "'Comfortaa', cursive" }}
      >
        {language === "pt" ? data.title_pt : data.title_en}

        {dynamicTitle && (
          <span className="ml-1 text-[#3d5a5a]"> {dynamicTitle}</span>
        )}
      </h2>

      {/* subtítulo: estilizado com espaçamento entre letras (tracking) para visual editorial */}
      <p className="text-[#8c6b5d] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
        {language === "pt" ? data.subtitle_pt : data.subtitle_en}
      </p>

      {/* exibição opcional do ano ou edição do cardápio/coleção */}
      {data.year && (
        <span className="text-[#3d5a5a]/40 text-[9px] font-bold uppercase tracking-widest mt-2 block">
          {data.year}
        </span>
      )}
    </header>
  );
};

export default PageHeader;
