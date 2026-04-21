import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

/**
 * gerencia a inscrição na newsletter com validação de regex e feedback visual de erro/sucesso.
 */
const HomeNewsletterBar = () => {
  const { texts } = useLanguage();

  // estados para gerenciar o input, status de inscrição e mensagens de erro
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  /**
   * processa o envio do formulário e valida o e-mail
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // limpa erros anteriores antes de validar

    // validação: verifica se o campo está vazio
    if (!email) {
      setError(texts.newsErrorRequired);
      return;
    }

    // validação: regex para garantir formato de e-mail válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(texts.newsErrorInvalid);
      return;
    }

    // sucesso na validação: limpa o campo e mostra feedback positivo
    setIsSubscribed(true);
    setEmail("");

    // reseta o estado de sucesso após 8 segundos para permitir nova inscrição
    setTimeout(() => {
      setIsSubscribed(false);
    }, 8000);
  };

  return (
    <section className="relative z-20 w-full bg-[#d66c73] pt-8 md:pt-10">
      <div className="max-w-[1200px] mx-auto px-6 pb-6 md:pb-8">
        {isSubscribed ? (
          /* feedback de sucesso com animações fade-in e bounce */
          <div className="flex justify-center items-center gap-3 text-white font-black uppercase tracking-widest text-sm py-4 animate-fadeIn">
            <span style={{ fontFamily: "'Comfortaa', cursive" }}>
              {texts.newsSuccess}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center lg:items-end">
            {" "}
            {/* formulário principal com noValidate para usar validação customizada */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col md:flex-row items-center justify-center gap-6 w-full"
            >
              <label
                className="text-white font-black uppercase tracking-[0.2em] text-xs md:text-sm whitespace-nowrap"
                style={{ fontFamily: "'Comfortaa', cursive" }}
              >
                {texts.newsLabel}
              </label>

              {/* agrupamento do input de e-mail e tratamento de erro visual */}
              <div className="flex flex-col w-full md:w-auto max-w-[500px]">
                <div className="flex gap-2 relative">
                  <input
                    type="email"
                    placeholder={texts.newsPlaceholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(""); // remove o erro enquanto o usuário digita
                    }}
                    className={`bg-white/10 border ${error ? "border-white" : "border-white/30"} rounded-full px-6 py-2 w-full text-white placeholder:text-white/60 outline-none focus:bg-white/20 transition-all font-medium text-sm`}
                  />
                  <button
                    type="submit"
                    className="bg-white text-[#d66c73] font-black uppercase text-[10px] tracking-widest px-8 py-2 rounded-full hover:bg-white/90 transition-colors shadow-md active:scale-95 cursor-pointer"
                  >
                    {texts.newsBtn}
                  </button>
                </div>

                {/* exibição da mensagem de erro */}
                {error && (
                  <p className="text-white text-[10px] font-medium uppercase tracking-widest mt-2 pl-6">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      {/* elemento visual decorativo (onda) posicionado no rodapé da seção */}
      <div className="absolute left-0 bottom-0 w-full overflow-hidden leading-[0] translate-y-[98%]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] md:h-[80px]"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.44,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,34.05V0Z"
            fill="#d66c73"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HomeNewsletterBar;
