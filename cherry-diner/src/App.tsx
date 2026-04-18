import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Contato from "./pages/Contato/Contato";
import Receitas from "./pages/Receitas/Receitas";
import Sobre from "./pages/Sobre/Sobre";
import Categorias from "./pages/Categorias/Categorias";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/receitas" element={<Receitas />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
