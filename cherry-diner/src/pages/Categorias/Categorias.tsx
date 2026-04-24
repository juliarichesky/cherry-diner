import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageHeader from "../../components/PageHeader/PageHeader";
import CategorySection from "../../components/CategorySection/CategorySection";

/* importacao das imagens de categoria para garantir que o bundler gerencie os assets. */
import imgPrincipais from "../../assets/images/categories/pratos-principais.png";
import imgBebidas from "../../assets/images/categories/bebidas.png";
import imgEntradas from "../../assets/images/categories/entradas.png";
import imgSobremesas from "../../assets/images/categories/sobremesas.png";

/* dicionario que vincula os ids do json as variaveis de imagem importadas. */
const categoryImages: Record<string, string> = {
  entradas: imgEntradas,
  principais: imgPrincipais,
  bebidas: imgBebidas,
  sobremesas: imgSobremesas,
};

/* estrutura de dados para as categorias conforme definido no arquivo json. */
interface CategoryData {
  id: string;
  color: string;
  labelKey: string;
  descKey: string;
}

const Categorias = () => {
  const { texts, language } = useLanguage();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* busca os dados das categorias no carregamento inicial do componente. */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/categories_page.json");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("erro ao carregar categorias:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    /* tag main: define o conteudo principal da pagina, essencial para acessibilidade e seo. */
    <main className="w-full min-h-screen bg-[#fdfaf5] py-16 pb-20 md:pb-30 lg:pb-40">
      {/* container com max-width sincronizado (1300px) para evitar saltos visuais entre paginas. */}
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* header semantico: isola o cabecalho da pagina garantindo alinhamento total. */}
        <header className="w-full">
          <PageHeader page="categorias" />
        </header>

        {/* container de fluxo: organiza as secoes de categoria com espacamento responsivo. */}
        <div className="mt-24 space-y-24 md:space-y-32">
          {!isLoading &&
            categories.map((cat, index) => (
              /* utilizacao de section com aria-label: fornece contexto semantico para 
                 tecnologias assistivas sem interferir no box model do layout original. */
              <section key={cat.id} aria-label={cat.labelKey}>
                <CategorySection
                  catId={cat.id}
                  index={index}
                  /* logica de traducao manual para termos especificos de rota. */
                  label={
                    cat.id === "principais" && language === "en"
                      ? "main courses"
                      : cat.id === "entradas" && language === "en"
                        ? "starters"
                        : cat.id === "bebidas" && language === "en"
                          ? "drinks"
                          : cat.id === "sobremesas" && language === "en"
                            ? "desserts"
                            : cat.labelKey
                  }
                  /* mapeamento dinamico da descricao via context de idioma. */
                  desc={texts[cat.descKey as keyof typeof texts]}
                  color={cat.color}
                  image={categoryImages[cat.id]}
                />
              </section>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Categorias;
