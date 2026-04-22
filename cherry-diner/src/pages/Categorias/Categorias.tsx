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
    <main className="w-full min-h-screen bg-[#fdfaf5] py-16 pb-20 md:pb-30 lg:pb-40">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* componente de cabecalho padronizado para as paginas internas. */}
        <PageHeader page="categorias" />
        {/* mapeamento das secoes de categoria: renderiza cada bloco com suporte
        a tradução e alternancia de layout. */}
        <div className="mt-24 space-y-24 md:space-y-32">
          {!isLoading &&
            categories.map((cat, index) => (
              <CategorySection
                key={cat.id}
                catId={cat.id}
                index={index}
                /* logica de traducao manual para termos que nao estao mapeados diretamente no dicionario global. */
                label={
                  cat.id === "principais" && language === "en"
                    ? "main courses"
                    : cat.id === "entradas" && language === "en"
                      ? "starters"
                      : cat.labelKey
                }
                /* recupera a descricao dinamicamente do contexto de idioma usando a chave descKey. */
                desc={texts[cat.descKey as keyof typeof texts]}
                color={cat.color}
                image={categoryImages[cat.id]}
              />
            ))}
        </div>
      </div>
    </main>
  );
};

export default Categorias;
