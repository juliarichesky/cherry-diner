import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Contato from "./pages/Contato/Contato";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contato" element={<Contato />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
