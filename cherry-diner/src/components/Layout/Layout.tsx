import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Breadcrumbs from "../Breadcrumb/Breadcrumb";

/**
 * componente: layout
 * define a estrutura mestre que envolve todas as páginas do app.
 * garante que navbar e footer estejam sempre presentes e gerencia
 * a exibição condicional do breadcrumb.
 */
const Layout = () => {
  // hook para identificar a rota atual e aplicar lógicas condicionais
  const location = useLocation();

  // verifica se o usuário está na página inicial para ocultar o breadcrumb
  const isHome = location.pathname === "/";

  return (
    /* flex-col e min-h-screen garantem que o footer fique sempre no rodapé, 
       mesmo em páginas com pouco conteúdo. */
    <div className="flex flex-col min-h-screen">
      {/* barra de navegação global */}
      <Navbar />

      {/* renderiza o rastro de navegação apenas fora da home */}
      {!isHome && <Breadcrumbs />}

      {/* o 'main' ocupa o espaço disponível, empurrando o footer para baixo */}
      <main className="flex-grow">
        {/* o outlet é onde as rotas filhas definidas no app.tsx são renderizadas */}
        <Outlet />
      </main>

      {/* rodapé global */}
      <Footer />
    </div>
  );
};

export default Layout;
