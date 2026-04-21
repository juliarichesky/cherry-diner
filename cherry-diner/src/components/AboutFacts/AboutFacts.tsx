import React, { useState, useEffect, type ReactNode } from "react";
import { useLanguage } from "../../context/LanguageContext";

// caminho do background decorativo
import bgCherries from "../../assets/images/backgrounds/background-cherry.png";

/**
 * interface: fact
 * define a estrutura de cada "comanda" de curiosidade vinda do json.
 */
interface Fact {
  id: string | number;
  rotate: string; // classe de rotação css (ex: rotate-2)
  iconName: string; // chave para o mapa de ícones
  title_pt: string;
  title_en: string;
  desc_pt: string;
  desc_en: string;
}

/**
 * mapa de ícones: associa os nomes do json a componentes svg específicos.
 */
const iconMap: Record<string, ReactNode> = {
  dev: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      />
    </svg>
  ),
  design: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  ),
  fuel: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
      />
    </svg>
  ),
  goal: (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
};

const AboutFacts = () => {
  const { texts, language } = useLanguage();
  const [factsData, setFactsData] = useState<Fact[]>([]);

  /**
   * hook de efeito: busca as curiosidades no arquivo facts.json
   */
  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const response = await fetch("/data/facts.json");
        if (!response.ok) throw new Error("erro ao carregar fatos");
        const data = await response.json();
        setFactsData(data);
      } catch (error) {
        console.error("erro ao buscar fatos:", error);
      }
    };
    fetchFacts();
  }, []);

  return (
    <div className="mt-40 mb-20 relative px-4 italic">
      {/* cabeçalho da pasta (tab): simula a aba de uma pasta de arquivos */}
      <div className="flex justify-center md:justify-start">
        <div className="relative inline-flex items-end md:ml-8">
          <div className="bg-[#ca4952] px-8 md:px-12 py-3 md:py-5 rounded-t-[1.5rem] relative z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <h2 className="flex flex-row items-center gap-3 md:gap-5 leading-none pointer-events-auto">
              <span
                className="text-white text-[12px] md:text-sm font-black uppercase tracking-[0.1em] whitespace-nowrap"
                style={{ fontFamily: "'Comfortaa', cursive" }}
              >
                {language === "pt" ? "fatos sobre as" : "facts about the"}
              </span>
              <span
                className="text-white text-3xl md:text-5xl font-bold drop-shadow-sm"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Julias
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* corpo do mural: container principal que agrupa os fatos */}
      <div className="relative border-t-[6px] border-[#ca4952] border-x-1 border-b-1 border-x-[#e9dcc9] border-b-[#e9dcc9] rounded-b-[1.5rem] md:rounded-tr-[1.5rem] p-6 md:p-16 pt-16 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.15)] bg-[#fdfaf5] overflow-hidden -mt-[1px]">
        {/* background de cerejas com opacidade reduzida para não atrapalhar a leitura */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage: `url(${bgCherries})`,
              backgroundSize: "280px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* grid de comandas: cada card representa um ticket de pedido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
          {factsData.map((fact, index) => (
            <div
              key={fact.id}
              /* a rotação individual de cada card cria um visual orgânico de mural */
              className={`relative bg-white p-6 pt-12 ${fact.rotate} hover:rotate-0 hover:-translate-y-2 transition-all duration-500 border border-[#e5dcd3] shadow-[10px_10px_0px_rgba(202,73,82,0.05)] group rounded-sm`}
            >
              {/* badge superior do ticket (label vermelha) */}
              <div className="absolute -top-3 -left-2 z-20">
                <div className="relative bg-[#ca4952] px-4 py-1 shadow-md border-y border-white/20">
                  <span className="text-white font-black uppercase tracking-widest text-[9px] whitespace-nowrap">
                    {language === "pt" ? fact.title_pt : fact.title_en}
                  </span>
                  <div className="absolute left-0 top-full border-t-[5px] border-t-[#7c1d1d] border-l-[5px] border-l-transparent"></div>
                </div>
              </div>

              {/* cabeçalho interno do ticket com número da "mesa" e ícone */}
              <div className="flex justify-between items-end border-b border-[#3d5a5a]/20 pb-2 mb-6">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-[#3d5a5a] uppercase tracking-widest opacity-40">
                    mesa
                  </span>
                  <span
                    className="text-xl font-black text-[#ca4952]"
                    style={{ fontFamily: "'Comfortaa', cursive" }}
                  >
                    0{index + 1}
                  </span>
                </div>
                <div className="p-1.5 bg-[#ca4952]/5 rounded-full text-[#ca4952]">
                  {iconMap[fact.iconName]}
                </div>
              </div>

              {/* conteúdo do fato: simula linhas de um caderno ou bloco de notas */}
              <div className="relative min-h-[140px] flex flex-col">
                <div className="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none opacity-30">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-[1px] bg-blue-400"></div>
                  ))}
                </div>
                <div className="relative z-10">
                  <p className="text-[15px] font-serif italic text-[#3d5a5a] leading-[2.1] px-1">
                    "{language === "pt" ? fact.desc_pt : fact.desc_en}"
                  </p>
                </div>
              </div>

              {/* rodapé decorativo do ticket com selo de "conferido" */}
              <div className="mt-8 pt-4 border-t border-dashed border-[#3d5a5a]/10 flex flex-col items-center">
                <div className="w-full flex justify-between text-[8px] font-black text-[#3d5a5a]/30 uppercase mb-4">
                  <span>julias & co.</span>
                  <span>id: {fact.id}</span>
                </div>
                <div className="border-2 border-[#ca4952]/10 text-[#ca4952]/10 px-4 py-0.5 rounded text-[9px] font-black uppercase rotate-[-10deg] group-hover:border-[#ca4952] group-hover:text-[#ca4952] transition-all duration-500">
                  {texts.checkedLabel || "conferido"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutFacts;
