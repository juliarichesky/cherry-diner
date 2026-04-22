import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import logoImg from "../../assets/images/logos/logo-2.png";

/**
 * interface: useraccount
 * estrutura para armazenamento e validação de usuários no localstorage.
 */
interface UserAccount {
  name?: string;
  email: string;
  password?: string;
}

const Login = () => {
  // acesso ao contexto de idioma para suporte bilingue e troca rápida
  const { texts, language, setLanguage } = useLanguage();

  // estados de controle de fluxo e formulário
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // estados de interface e tratamento de erros
  const [showPassword, setShowPassword] = useState(false);
  const [mainError, setMainError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  /**
   * handlesubmit:
   * processa o envio do formulário, realiza validações de campos e
   * gerencia o armazenamento local (localstorage) para simular um backend.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMainError("");

    let hasError = false;
    const newFieldErrors = { name: "", email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // validação: nome (apenas para cadastro)
    if (!isLogin && !name.trim()) {
      newFieldErrors.name = texts.errorNameRequired;
      hasError = true;
    }

    // validação: email (vazio ou formato inválido)
    if (!email.trim()) {
      newFieldErrors.email = texts.errorEmailRequired;
      hasError = true;
    } else if (!emailRegex.test(email)) {
      newFieldErrors.email = texts.errorEmailInvalid;
      hasError = true;
    }

    // validação: senha
    if (!password.trim()) {
      newFieldErrors.password = texts.errorPassRequired;
      hasError = true;
    }

    setFieldErrors(newFieldErrors);
    if (hasError) return;

    // busca contas já registradas no navegador
    const storedAccounts = localStorage.getItem("@CherryDiner:accounts");
    const accounts = storedAccounts ? JSON.parse(storedAccounts) : [];

    if (!isLogin) {
      // lógica de cadastro: verifica se e-mail já existe
      const emailExists = accounts.some(
        (user: UserAccount) => user.email === email,
      );
      if (emailExists) {
        setMainError(texts.errorEmailExists);
        return;
      }
      const newUser: UserAccount = { name, email, password };
      accounts.push(newUser);
      localStorage.setItem("@CherryDiner:accounts", JSON.stringify(accounts));
      localStorage.setItem("@CherryDiner:userName", name);
      navigate("/");
    } else {
      // lógica de login: busca usuário e senha correspondentes
      const foundUser = accounts.find(
        (user: UserAccount) =>
          user.email === email && user.password === password,
      );
      if (foundUser) {
        localStorage.setItem("@CherryDiner:userName", foundUser.name || "");
        navigate("/");
      } else {
        setMainError(texts.errorLoginInvalid);
      }
    }
  };

  /**
   * handleinputchange:
   * helper para atualizar estados e limpar erros de campo enquanto o usuário digita.
   */
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
      setMainError("");
    };

  return (
    <div className="min-h-screen bg-[#fdf8f1] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* detalhe decorativo: padrão de pontos (polka dots) sutil ao fundo */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ca4952 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      {/* card do formulário estilizado como cardápio diner */}
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-[2rem] shadow-[10px_10px_0px_#f3ede4] border-4 border-double border-[#e9dcc9] relative z-10 flex flex-col items-center">
        {/* container de navegação superior: voltar e seletor de idioma */}
        <div className="flex items-center gap-3 mb-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#ca4952] font-bold uppercase text-xs  hover:-translate-x-1 transition-transform bg-[#f3ede4] backdrop-blur-md px-4 py-2 rounded-full border-1 border-[#e9dcc9] shadow-sm"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            {texts.backToHome}
          </Link>

          <div className="flex bg-[#f3ede4] rounded-full p-1 border border-[#e9dcc9] shadow-sm">
            <button
              type="button"
              onClick={() => setLanguage("pt")}
              className={`px-3 py-1 rounded-full text-[10px] font-black cursor-pointer transition-all ${language === "pt" ? "bg-[#ca4952] text-white" : "text-[#a89d91] hover:text-[#5c3d2e]"}`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded-full text-[10px] font-black cursor-pointer transition-all ${language === "en" ? "bg-[#ca4952] text-white" : "text-[#a89d91] hover:text-[#5c3d2e]"}`}
            >
              EN
            </button>
          </div>
        </div>

        <Link to="/" className="mb-6 hover:scale-105 transition-transform">
          <img src={logoImg} alt="logo" className="h-20 object-contain" />
        </Link>

        {/* título dinâmico com divisor temático */}
        <h2 className="text-[#8c6b5d] uppercase text-[12px] font-black tracking-[0.2em] mb-6 text-center border-b-2 border-[#e9dcc9] pb-4 w-full">
          {isLogin ? texts.loginTitle : texts.registerTitle}
        </h2>

        {/* exibição de erro principal (ex: senha incorreta) */}
        {mainError && (
          <div className="w-full bg-[#ca4952]/10 border border-[#ca4952]/30 text-[#ca4952] text-sm font-bold text-center py-3 px-4 rounded-xl mb-4 animate-pulse">
            {mainError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5"
          noValidate
        >
          {/* campo de nome: exibido apenas no modo de cadastro */}
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-[#5c3d2e] font-bold text-xs uppercase tracking-widest pl-2">
                {texts.labelName}
              </label>
              <input
                type="text"
                value={name}
                onChange={handleInputChange(setName, "name")}
                placeholder={language === "pt" ? "Seu nome" : "Your name"}
                className={`w-full px-5 py-4 bg-[#fdfaf5] rounded-xl border-2 ${fieldErrors.name ? "border-[#ca4952]" : "border-[#e9dcc9] focus:border-[#ca4952]"} outline-none text-[#5c3d2e] transition-all`}
                style={{ fontFamily: "'Comfortaa', cursive" }}
              />
              {fieldErrors.name && (
                <span className="text-[#ca4952] text-[11px] font-bold pl-2 mt-1">
                  {fieldErrors.name}
                </span>
              )}
            </div>
          )}

          {/* campo de email */}
          <div className="flex flex-col gap-1">
            <label className="text-[#5c3d2e] font-bold text-xs uppercase tracking-widest pl-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleInputChange(setEmail, "email")}
              placeholder="cherrydiner@email.com"
              className={`w-full px-5 py-4 bg-[#fdfaf5] rounded-xl border-2 ${fieldErrors.email ? "border-[#ca4952]" : "border-[#e9dcc9] focus:border-[#ca4952]"} outline-none text-[#5c3d2e] transition-all`}
              style={{ fontFamily: "'Comfortaa', cursive" }}
            />
            {fieldErrors.email && (
              <span className="text-[#ca4952] text-[11px] font-bold pl-2 mt-1">
                {fieldErrors.email}
              </span>
            )}
          </div>

          {/* campo de senha com toggle de visibilidade */}
          <div className="flex flex-col gap-1">
            <label className="text-[#5c3d2e] font-bold text-xs uppercase tracking-widest pl-2">
              {texts.labelPassword}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleInputChange(setPassword, "password")}
                placeholder="••••••••"
                className={`w-full pl-5 pr-12 py-4 bg-[#fdfaf5] rounded-xl border-2 ${fieldErrors.password ? "border-[#ca4952]" : "border-[#e9dcc9] focus:border-[#ca4952]"} outline-none text-[#5c3d2e] transition-all`}
                style={{ fontFamily: "'Comfortaa', cursive" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a89d91] hover:text-[#ca4952] transition-colors cursor-pointer p-1"
              >
                {/* ícone condicional para olho aberto/fechado */}
                {showPassword ? (
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {fieldErrors.password && (
              <span className="text-[#ca4952] text-[11px] font-bold pl-2 mt-1">
                {fieldErrors.password}
              </span>
            )}
          </div>

          {/* botão de submissão com efeito de profundidade (border-b-4) */}
          <button
            type="submit"
            className="w-full mt-4 bg-[#ca4952] text-white font-black uppercase tracking-[0.2em] py-4 rounded-xl border-b-4 border-[#9a353d] hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all cursor-pointer"
          >
            {isLogin ? texts.btnEnter : texts.btnRegister}
          </button>
        </form>

        {/* alternância entre modos login/cadastro */}
        <div className="mt-8 pt-6 border-t border-[#e9dcc9]/50 w-full text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMainError("");
              setFieldErrors({ name: "", email: "", password: "" });
            }}
            className="text-[#8c6b5d] text-sm font-bold hover:text-[#ca4952] transition-colors cursor-pointer"
          >
            {isLogin ? texts.toggleToRegister : texts.toggleToLogin}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
