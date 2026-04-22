import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Contato from "./pages/Contato/Contato";
import Receitas from "./pages/Receitas/Receitas";
import Sobre from "./pages/Sobre/Sobre";
import Categorias from "./pages/Categorias/Categorias";
import RecipeDetail from "./components/RecipeDetail/RecipeDetails";
import Login from "./pages/Login/Login";
import DifficultyPage from "./pages/DifficultyPage/DifficultyPage";
import NotFound from "./pages/NotFound/NotFound";
import Teapot from "./pages/Teapot/Teapot";

/**
 * componente: scrolltotop
 * resolve o comportamento padrão do spa (single page application) onde a barra de rolagem
 * permanece na posição anterior após a troca de rota.
 * monitora o 'pathname' e reseta o scroll para o topo (0,0).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  // pega o idioma atual
  const { language } = useLanguage();

  // useEffect para mudar o nome do site na aba do navegador
  useEffect(() => {
    const siteTitle =
      language === "pt"
        ? "Cherry Diner | Receitas Anos 50"
        : "Cherry Diner | 50's Recipes";

    document.title = siteTitle;
  }, [language]); // roda sempre que o idioma mudar

  return (
    <>
      {/* injeta a lógica de reset de scroll em todas as rotas */}
      <ScrollToTop />

      <Routes>
        {/* rota pai com layout:
            todas as rotas dentro desta estrutura compartilham elementos comuns (navbar, footer).
        */}
        <Route path="/" element={<Layout />}>
          {/* index representa a rota raiz '/' */}
          <Route index element={<Home />} />

          <Route path="/receitas" element={<Receitas />} />

          {/* rotas dinâmicas: utilizam parâmetros (:id e :level) para carregar conteúdo específico */}
          <Route path="/receitas/:id" element={<RecipeDetail />} />
          <Route path="/dificuldade/:level" element={<DifficultyPage />} />

          <Route path="/categorias" element={<Categorias />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Route>

        {/* rota isolada: a página de login não utiliza o layout padrão (navbar/footer) */}
        <Route path="/login" element={<Login />} />

        {/* rota teapot: HTTP 418 i'm a teapot */}
        <Route path="/cha" element={<Teapot />} />
        <Route path="/teapot" element={<Teapot />} />

        {/* rota notfound: quando a página não encontra nenhum caminho */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
