/** * importação dos componentes que compõem a página inicial. cada um é responsável por uma parte específica da interface, permitindo uma estrutura modular e organizada.
 */
import DifficultySection from "../../components/DifficultySection/DifficultySection";
import HomeHero from "../../components/HomeHero/HomeHero";
import HomeHighlights from "../../components/HomeHighlights/HomeHighlights";
import HomeNewsletter from "../../components/HomeNewsletter/HomeNewsletter";
import HomePosterWall from "../../components/HomePosterWall/HomePosterWall";

const Home = () => {
  return (
    <>
      {/* seção principal de impacto (hero) */}
      <HomeHero />

      {/* captura de e-mails para newsletter */}
      <HomeNewsletter />

      {/* destaques principais do projeto/site */}
      <HomeHighlights />

      {/* seção explicativa sobre níveis de dificuldade */}
      <DifficultySection />

      {/* grid para exibição de categorias */}
      <HomePosterWall />
    </>
  );
};

export default Home;
