import { useForm } from "react-hook-form";
import { useLanguage } from "../../context/LanguageContext";

/**
 * interface: contactformdata
 * define a tipagem dos campos do formulário para o react-hook-form.
 */
interface ContactFormData {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

/**
 * interface: contactletterprops
 * recebe o estado de envio e a função que processa os dados (submit).
 */
interface ContactLetterProps {
  enviado: boolean;
  onSubmit: (data: ContactFormData) => void;
}

const ContactLetter = ({ enviado, onSubmit }: ContactLetterProps) => {
  // acesso ao contexto de idioma para textos bilingues
  const { texts, language } = useLanguage();
  
  // inicialização do formulário com desestruturação para registro e validação
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  return (
    <div className="w-full max-w-[1000px] bg-white p-1 shadow-[0_40px_80px_rgba(0,0,0,0.15)] transform rotate-[-0.5deg] font-serif">
      <div className="border-[12px] border-white outline outline-1 outline-[#e5dcd3] relative p-8 md:p-16">
        
        {/* bordas decorativas estilo air mail:
            utiliza um gradiente linear repetitivo para criar as listras vermelhas e azuis.
        */}
        <div
          className="absolute inset-0 pointer-events-none border-[10px] border-transparent"
          style={{
            borderImageSource:
              "repeating-linear-gradient(45deg, #ca4952, #ca4952 20px, transparent 20px, transparent 40px, #3d5a5a 40px, #3d5a5a 60px, transparent 60px, transparent 80px)",
            borderImageSlice: 10,
          }}
        />

        {/* estado de sucesso: exibido após o submit bem-sucedido */}
        {enviado ? (
          <div className="py-24 text-center space-y-8 animate-fadeIn">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-[#ce7279] rounded-full flex items-center justify-center border-4 border-white shadow-xl rotate-12">
                <span className="text-white font-black text-xs uppercase tracking-widest">
                  {language === "pt" ? "Enviado!" : "Sent!"}
                </span>
              </div>
              <span className="text-6xl absolute -top-8 -left-8 animate-bounce">
                🍒
              </span>
            </div>
            <h2
              className="text-4xl font-black text-[#3d5a5a]"
              style={{ fontFamily: "'Comfortaa', cursive" }}
            >
              {texts.letterSuccessTitle || "sua carta foi postada!"}
            </h2>
            <p className="text-[#8c6b5d] text-lg italic">
              {texts.letterSuccessDesc || "as julias responderão assim que o cadillac estacionar!"}
            </p>
          </div>
        ) : (
          /* formulário principal: utiliza a lógica de 'inline inputs' para simular escrita em papel */
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 space-y-12"
          >
            {/* cabeçalho da carta: saudação e carimbo decorativo */}
            <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-[#f3eae0] pb-8 mb-4">
              <div className="space-y-1">
                <h3
                  className="text-3xl md:text-5xl font-black italic text-[#ca4952] tracking-tighter"
                  style={{ fontFamily: "'Comfortaa', cursive" }}
                >
                  {texts.letterSalutation || "querido cherry diner,"}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#3d5a5a] italic">
                  {language === "pt" ? "data" : "date"}: {new Date().toLocaleDateString(language === "pt" ? "pt-BR" : "en-US")}
                </p>
              </div>
              
              {/* carimbo decorativo 'priority mail' */}
              <div className="hidden md:flex w-24 h-24 border-4 border-[#3d5a5a]/80 rounded-full items-center justify-center rotate-12 border-double">
                <span className="text-[10px] font-black uppercase text-[#3d5a5a]/80 text-center">
                  priority <br /> mail <br /> 🍒
                </span>
              </div>
            </div>

            {/* campos de entrada: estilizados para parecerem espaços em branco em um formulário físico */}
            <div className="space-y-14">
              {/* campo: nome */}
              <div className="relative group">
                <div className="flex flex-wrap items-end gap-x-4 gap-y-2 relative">
                  <span className="text-lg text-[#3d5a5a] font-bold select-none pb-2">
                    {texts.formNameLabel || "meu nome é"}
                  </span>
                  <input
                    {...register("nome", {
                      required: texts.errorName || "assine seu nome, por favor.",
                    })}
                    type="text"
                    placeholder={language === "pt" ? "escreva seu nome aqui..." : "write your name here..."}
                    className="flex-1 min-w-[250px] bg-transparent border-none text-2xl text-[#ca4952] font-black italic focus:outline-none focus:ring-0 placeholder:text-[#d8c9ba] transition-all py-2"
                  />
                </div>
                <div className="h-[2px] w-full bg-[#f3eae0] group-focus-within:bg-[#ca4952] transition-colors" />
                {errors.nome && (
                  <p className="text-[10px] text-red-500 font-bold uppercase mt-2 absolute">
                    {errors.nome.message}
                  </p>
                )}
              </div>

              {/* campo: e-mail com validação de regex */}
              <div className="relative group">
                <div className="flex flex-wrap items-end gap-x-4 gap-y-2 relative">
                  <span className="text-lg text-[#3d5a5a] font-bold select-none pb-2">
                    {texts.formEmailLabel || "podem me responder no"}
                  </span>
                  <input
                    {...register("email", {
                      required: texts.errorEmailReq || "e-mail obrigatório.",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: texts.errorEmailInv || "e-mail inválido.",
                      },
                    })}
                    type="email"
                    placeholder="seu@email.com"
                    className="flex-1 min-w-[250px] bg-transparent border-none text-xl text-[#ca4952] font-black italic focus:outline-none focus:ring-0 placeholder:text-[#d8c9ba] transition-all py-2"
                  />
                </div>
                <div className="h-[2px] w-full bg-[#f3eae0] group-focus-within:bg-[#ca4952] transition-colors" />
                {errors.email && (
                  <p className="text-[10px] text-red-500 font-bold uppercase mt-2 absolute">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* campo: mensagem (textarea)
                  estilizado com fundo suave e borda pontilhada.
              */}
              <div className="space-y-4 relative pt-4">
                <label className="text-lg text-[#3d5a5a] font-bold block select-none">
                  {texts.formMsgLabel || "queria dizer que..."}
                </label>
                <textarea
                  {...register("mensagem", { required: texts.errorMsg || "a carta está vazia!" })}
                  rows={6}
                  placeholder={language === "pt" ? "escreva sua história aqui..." : "write your story here..."}
                  className="w-full bg-[#fdfaf5]/50 border-2 border-dashed border-[#e5dcd3] p-6 text-lg text-[#3d5a5a] italic focus:outline-none focus:ring-0 focus:border-[#ca4952] focus:bg-white rounded-xl resize-none transition-all"
                />
                {errors.mensagem && (
                  <p className="text-[10px] text-red-500 font-bold uppercase absolute -bottom-6">
                    {errors.mensagem.message}
                  </p>
                )}
              </div>
            </div>

            {/* rodapé do formulário: inclui disclaimer e o botão de envio com sombra 3d */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-[#f3eae0]">
              <p className="text-s text-[#8c6b5d] italic max-w-xs text-center md:text-left mt-4 md:mt-0">
                * {texts.formDisclaimer || "prometemos que sua mensagem será lida com um milkshake na mão."}
              </p>
              <button
                type="submit"
                className="w-full md:w-auto px-16 py-4 bg-[#3d5a5a] text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-sm shadow-[10px_10px_0px_#ca4952] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
              >
                {texts.formSubmitBtn || "enviar para o correio!"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactLetter;