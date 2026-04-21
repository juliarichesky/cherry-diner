import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageHeader from "../../components/PageHeader/PageHeader";
import ContactLetter from "../../components/ContactLetter/ContactLetter";

/**
 * interface: contactformdata
 * espelha a estrutura de dados esperada pelo formulário de carta.
 */
interface ContactFormData {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

const Contato = () => {
  const { texts } = useLanguage();

  // estado para controlar se a mensagem foi enviada com sucesso
  const [enviado, setEnviado] = useState(false);

  /**
   * manipulador de envio (handler):
   * recebe os dados do componente filho (contactletter), simula o envio
   * e reseta o estado após 8 segundos.
   */
  const handleFormSubmit = (data: ContactFormData) => {
    console.log("dados recebidos da carta:", data);
    setEnviado(true);

    // temporizador para permitir que o usuário veja a mensagem de sucesso antes de resetar
    setTimeout(() => setEnviado(false), 8000);
  };

  return (
    <section className="w-full py-16 pb-30 md:pb-40 bg-[#fdfaf5] min-h-screen relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 relative z-10">
        {/* cabeçalho da página: integrado ao sistema de tradução json */}
        <header className="mb-20">
          <PageHeader page="contato" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* ℹcoluna de informações (aside): 
              centralizada em dispositivos móveis e alinhada à esquerda no desktop.
          */}
          <aside className="lg:col-span-4 space-y-12 animate-fadeIn pt-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="space-y-6 w-full max-w-md lg:max-w-none">
              {/* slogan da página de contato com borda lateral temática */}
              <p className="text-[#3d5a5a] font-serif italic text-xl leading-relaxed border-l-4 lg:border-l-4 border-[#ca4952] pl-6 py-2 text-left">
                "
                {texts.contactSlogan ||
                  "pegue uma caneta e sinta-se em casa. sua carta é o ponto alto do nosso dia."}
                "
              </p>
            </div>

            {/* blocos de contato: telefone e e-mail com tipografia em negrito */}
            <div className="space-y-8 pt-8 border-t border-[#e5dcd3] w-full">
              <div className="group">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ca4952] block mb-2">
                  {texts.phoneLabel || "telefone"}
                </span>
                <p className="text-[#3d5a5a] text-2xl font-bold tracking-tighter">
                  (11) 99999-9999
                </p>
              </div>

              <div className="group">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ca4952] block mb-2">
                  {texts.emailLabel || "email"}
                </span>
                <p className="text-[#3d5a5a] text-lg font-bold">
                  hello@cherrydiner.com
                </p>
              </div>

              {/* selo de localização: pequeno badge arredondado */}
              <div className="pt-4">
                <span className="inline-block px-4 py-2 bg-[#3d5a5a] text-[#faf3ec] text-[9px] font-bold uppercase tracking-widest rounded-full">
                  paulista • são paulo
                </span>
              </div>
            </div>
          </aside>

          {/* coluna da carta: renderiza o formulário estilizado */}
          <div className="lg:col-span-8 flex justify-center lg:justify-end">
            <ContactLetter enviado={enviado} onSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contato;
