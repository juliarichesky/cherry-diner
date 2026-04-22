import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Contato from "./pages/Contato/Contato";
import Receitas from "./pages/Receitas/Receitas";
import Sobre from "./pages/Sobre/Sobre";
import Categorias from "./pages/Categorias/Categorias";
import RecipeDetail from "./components/RecipeDetail/RecipeDetails";
import Login from "./pages/Login/Login";
import DifficultyPage from "./pages/DifficultyPage/DifficultyPage";

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
      </Routes>
    </>
  );
};

export default App;
