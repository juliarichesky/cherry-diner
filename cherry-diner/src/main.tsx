import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext.tsx"; // importando o provedor de estado global

/**
 * ponto de entrada da aplicação (entry point).
 * aqui configuramos os wrappers globais que fornecem funcionalidades para todo o site.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* browserrouter: habilita o sistema de navegação e rotas (url) 
    */}
    <BrowserRouter>
      {/* languageprovider: injeta o contexto de idioma em todo o app.
          isso permite que o suporte bilingue funcione em qualquer página.
      */}
      <LanguageProvider>
        {/* componente principal que contém as rotas e layout */}
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);