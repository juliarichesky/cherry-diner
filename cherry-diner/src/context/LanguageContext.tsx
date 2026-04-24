import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * dicionário de traduções:
 * centraliza todos os textos do site para facilitar a manutenção e tradução.
 */
const translations = {
  pt: {
    // navbar
    navHome: "Início",
    navRecipes: "Receitas",
    navAbout: "Sobre",
    // hero
    heroTitle: "Receitas com sabor de Nostalgia",
    heroSubtitle: "Descubra os clássicos dos anos 50 com um toque moderno.",
    btnExplore: "Explorar receitas",
    btnCategories: "Ver categorias",
    // newsletter
    newsLabel: "Fique por dentro das novidades:",
    newsPlaceholder: "digite seu melhor e-mail...",
    newsBtn: "Assinar",
    newsSuccess: "Opa! Deu certo! Você agora faz parte do clube!",
    newsErrorRequired: "Opa! O e-mail é obrigatório.",
    newsErrorInvalid: "Poxa, esse e-mail não parece certo...",
    // homehighlights
    highlightsSubtitle:
      "A seleção perfeita para trazer o sabor clássico do Cherry Diner para sua mesa.",
    viewBtn: "Ver ➔",
    searchExplore: "Explorar Cardápio",
    // difficultysection
    difficultySubtitle:
      "Encontre a receita perfeita para o seu ritmo. Cada prato foi pensado para trazer a alma do Cherry Diner direto para a sua cozinha.",
    levelBeginnerLabel: "Iniciante",
    levelBeginnerDesc: "receitas práticas para o dia a dia",
    levelInterLabel: "Intermediário",
    levelInterDesc: "o sabor clássico com mais detalhes",
    levelExpertLabel: "Expert",
    levelExpertDesc: "para momentos de pura gastronomia",
    // homeposterwall
    categoriesSubtitle:
      "A seleção perfeita para trazer o sabor clássico do Cherry Diner para sua mesa.",
    // footer
    footerSlogan:
      "O sabor clássico dos anos 50, preparado com o carinho da culinária artesanal para a sua mesa.",
    navCategories: "Categorias",
    navContact: "Contato",
    staffRole: "Desenvolvedora",
    // breadcrumbs
    backBtn: "Back",
    // recipefilters
    filterLabel: "Filtrar Cardápio",
    // receitas.tsx
    loadingText: "Carregando Receitas...",
    showingText: "Exibindo",
    noRecipesFound:
      "Oh, céus! Parece que nossa cozinha ficou sem esses ingredientes...",
    // recipecard
    prepLabel: "Preparo",
    levelLabel: "Nível",
    // recipedetails
    loadingRecipeDetail: "Preparando a mesa...",
    recipeNotFoundDetail:
      "Puxa, parece que essa receita não está mais no nosso cardápio! 🍒",
    recipeDetailSlogan:
      "A receita perfeita para trazer o sabor clássico do Cherry Diner para a sua mesa.",
    recipePhotoCaption: "O sabor de",
    recipePhotoCaptionEnd: "é inesquecível!",
    onlyText: "Apenas",
    caloriesText: "Calorias",
    juliaNote: "Nota da Julia",
    cutAndKeep: "Recorte e Guarde",
    servingsLabel: "Serve",
    ingredientsLabel: "Ingredientes",
    instructionsLabel: "Modo de Fazer",
    dinerQuality: "Qualidade Diner!",
    footerQuote:
      "A marca que as famílias confiam para um lar feliz e um paladar satisfeito.",
    // categorias.tsx
    catDescEntradas: "Petiscos crocantes para começar a experiência.",
    catDescPrincipais: "Burgers icônicos que definiram uma geração.",
    catDescBebidas: "Milkshakes cremosos e sodas refrescantes.",
    catDescSobremesas: "Tortas com a legítima cereja no topo.",
    exploreSectionBtn: "Explorar Seção",
    // aboutstory.tsx
    aboutBadge: "Sobre Nós",
    aboutPara1:
      "receita é simples: pegue uma pitada de nostalgia, duas amigas apaixonadas por design e uma vontade louca de comer um burger que não fosse 'gourmet', mas sim inesquecível.",
    aboutPara2:
      "O Cherry Diner nasceu assim, entre um café e outro na FIAP, quando Julia Guimarães e Julia Silva Spanopoulos perceberam que o mundo estava rápido demais.",
    aboutPara3:
      "Sentíamos falta daquela época em que a cereja no topo do milkshake era o evento principal do dia. Aqui não tem segredo, tem técnica.",
    aboutPara4:
      "Resgatamos cadernos de receitas que pareciam esquecidos e demos a eles o brilho do neon. O avental está limpo, a grelha está quente e o papo está apenas começando.",
    theJulias: "As Julias",
    foundersRole: "Fundadoras",
    altJuliasPhoto:
      "Fotografia das fundadoras do Cherry Diner: Julia Guimarães e Julia Silva Spanopoulos sorrindo.",
    // aboutfacts.tsx
    factsTitle: "Fatos Sobre as Julias",
    tableLabel: "Mesa",
    seriesLabel: "Série",
    servedBy: "Atendido por",
    checkedLabel: "Conferido",
    // sobre.tsx
    aboutHighlightPre: "Duas Julias, um",
    aboutHighlightPost: "imaginário e o melhor burger da cidade.",
    // contato.tsx
    contactSlogan:
      "Puxe uma cadeira, peça um café e deixe sua mensagem. Adoramos uma boa conversa no balcão.",
    phoneLabel: "Telefone",
    emailLabel: "Email",
    // contactletter.tsx
    letterSalutation: "Querido Cherry Diner,",
    letterSuccessTitle: "Sua carta foi postada!",
    letterSuccessDesc: "As Julias responderão assim que o Cadillac estacionar!",
    formNameLabel: "Meu nome é",
    formEmailLabel: "podem me responder no",
    formMsgLabel: "Queria dizer que...",
    formDisclaimer:
      "Prometemos que sua mensagem será lida com um milkshake na mão.",
    formSubmitBtn: "Enviar para o Correio!",
    errorName: "Assine seu nome, por favor.",
    errorEmailReq: "E-mail obrigatório.",
    errorEmailInv: "E-mail inválido.",
    errorMsg: "A carta está vazia!",
    // pagination.tsx
    prevBtn: "Anterior",
    nextBtn: "Próxima",
    // login.tsx
    backToHome: "Voltar ao Início",
    loginTitle: "Olá, faça seu login!",
    registerTitle: "Novo por aqui?",
    labelName: "Como devemos te chamar?",
    labelPassword: "Senha",
    btnEnter: "Entrar",
    btnRegister: "Cadastrar",
    toggleToRegister: "Ainda não tem conta? (Criar conta)",
    toggleToLogin: "Já sou cliente (Fazer login)",
    errorNameRequired: "Obrigatório colocar o nome!",
    errorEmailRequired: "Obrigatório colocar o email!",
    errorEmailInvalid: "Poxa, esse email não parece válido. Tente novamente!",
    errorPassRequired: "Obrigatório colocar a senha!",
    errorEmailExists: "Este email já está cadastrado! Tente fazer login.",
    errorLoginInvalid: "Ops! Email ou senha incorretos. Tente de novo!",
    // difficultypage.tsx
    noRecipesLevel: "Não encontramos receitas para esse nível ainda.",
    difficultyBeginner: "Iniciante",
    difficultyInter: "Intermediário",
    difficultyExpert: "Expert",
  },
  en: {
    // navbar
    navHome: "Home",
    navRecipes: "Recipes",
    navAbout: "About",
    // hero
    heroTitle: "Recipes with a taste of Nostalgia",
    heroSubtitle: "Discover 50s classics with a modern twist.",
    btnExplore: "Explore recipes",
    btnCategories: "See categories",
    // newsletter
    newsLabel: "Stay tuned for news:",
    newsPlaceholder: "type your best email...",
    newsBtn: "Subscribe",
    newsSuccess: "Yay! It worked! You're now part of the club!",
    newsErrorRequired: "Oops! Email is required.",
    newsErrorInvalid: "My! This email doesn't look right...",
    // homehighlights
    highlightsSubtitle:
      "The perfect selection to bring Cherry Diner's classic flavor to your table.",
    viewBtn: "View ➔",
    searchExplore: "Explore Menu",
    // difficultysection
    difficultySubtitle:
      "Find the perfect recipe for your pace. Each dish was designed to bring the soul of Cherry Diner straight to your kitchen.",
    levelBeginnerLabel: "Beginner",
    levelBeginnerDesc: "practical recipes for everyday life",
    levelInterLabel: "Intermediate",
    levelInterDesc: "classic flavor with more details",
    levelExpertLabel: "Expert",
    levelExpertDesc: "for moments of pure gastronomy",
    // homeposterwall
    categoriesSubtitle:
      "The perfect selection to bring Cherry Diner's classic flavor to your table.",
    // footer
    footerSlogan:
      "The classic 50s flavor, prepared with the care of handcrafted cuisine for your table.",
    navCategories: "Categories",
    navContact: "Contact",
    staffRole: "Developer",
    // breadcrumbs
    backBtn: "Back",
    // recipefilters
    filterLabel: "Filter Menu",
    // receitas.tsx
    loadingText: "Loading Recipes...",
    showingText: "Showing",
    noRecipesFound:
      "Oh my! It seems our kitchen ran out of those ingredients...",
    // recipecard
    prepLabel: "Prep Time",
    levelLabel: "Level",
    // recipedetails
    loadingRecipeDetail: "Setting the table...",
    recipeNotFoundDetail:
      "Oops, it seems this recipe is no longer on our menu! 🍒",
    recipeDetailSlogan:
      "The perfect recipe to bring the classic Cherry Diner flavor to your table.",
    recipePhotoCaption: "The flavor of",
    recipePhotoCaptionEnd: "is unforgettable!",
    onlyText: "Only",
    caloriesText: "Calories",
    juliaNote: "Julias' Note",
    cutAndKeep: "Cut and Keep",
    servingsLabel: "Serves",
    ingredientsLabel: "Ingredients",
    instructionsLabel: "How to Make",
    dinerQuality: "Diner Quality!",
    footerQuote:
      "The brand families trust for a happy home and a satisfied palate.",
    // categorias.tsx
    catDescEntradas: "Crunchy snacks to start the experience.",
    catDescPrincipais: "Iconic burgers that defined a generation.",
    catDescBebidas: "Creamy milkshakes and refreshing sodas.",
    catDescSobremesas: "Pies with the legitimate cherry on top.",
    exploreSectionBtn: "Explore Section",
    // aboutstory.tsx
    aboutBadge: "About Us",
    aboutPara1:
      "he recipe is simple: take a pinch of nostalgia, two friends passionate about design, and a wild desire to eat a burger that wasn't 'gourmet', but truly unforgettable.",
    aboutPara2:
      "Cherry Diner was born just like that, between cups of coffee at FIAP, when Julia Guimarães and Julia Silva Spanopoulos realized the world was moving too fast.",
    aboutPara3:
      "We missed those times when the cherry on top of the milkshake was the main event of the day. There's no secret here, just technique.",
    aboutPara4:
      "We rescued recipe notebooks that seemed forgotten and gave them the neon glow. The apron is clean, the grill is hot, and the conversation is just beginning.",
    theJulias: "The Julias",
    foundersRole: "Founders",
    altJuliasPhoto:
      "Photograph of Cherry Diner founders: Julia Guimarães and Julia Silva Spanopoulos smiling.",
    // aboutfacts.tsx
    factsTitle: "Facts About the Julias",
    tableLabel: "Table",
    seriesLabel: "Series",
    servedBy: "Served by",
    checkedLabel: "Checked",
    // sobre.tsx
    aboutHighlightPre: "Two Julias, an imaginary",
    aboutHighlightPost: "and the best burger in town.",
    // contato.tsx
    contactSlogan:
      "Pull up a chair, grab a coffee, and leave your message. We love a good chat at the counter.",
    phoneLabel: "Phone",
    emailLabel: "Email",
    // contactletter.tsx
    letterSalutation: "Dear Cherry Diner,",
    letterSuccessTitle: "Your letter has been posted!",
    letterSuccessDesc:
      "The Julias will reply as soon as the Cadillac pulls in!",
    formNameLabel: "My name is",
    formEmailLabel: "you can reply to me at",
    formMsgLabel: "I wanted to say that...",
    formDisclaimer:
      "We promise your message will be read with a milkshake in hand.",
    formSubmitBtn: "Post the Letter!",
    errorName: "Please sign your name.",
    errorEmailReq: "Email is required.",
    errorEmailInv: "Invalid email.",
    errorMsg: "The letter is empty!",
    // pagination.tsx
    prevBtn: "Previous",
    nextBtn: "Next",
    // login.tsx
    backToHome: "Back to Home",
    loginTitle: "Hi, please login!",
    registerTitle: "New here?",
    labelName: "How should we call you?",
    labelPassword: "Password",
    btnEnter: "Enter",
    btnRegister: "Register",
    toggleToRegister: "Don't have an account yet? (Sign up)",
    toggleToLogin: "Already a customer? (Login)",
    errorNameRequired: "Name is required!",
    errorEmailRequired: "Email is required!",
    errorEmailInvalid: "Oops, this email doesn't look valid. Try again!",
    errorPassRequired: "Password is required!",
    errorEmailExists: "This email is already registered! Try logging in.",
    errorLoginInvalid: "Oops! Incorrect email or password. Try again!",
    // difficultypage.tsx
    noRecipesLevel: "We haven't found recipes for this level yet.",
    difficultyBeginner: "Beginner",
    difficultyInter: "Intermediate",
    difficultyExpert: "Expert",
  },
};

/**
 * tipos globais:
 * garantem que o typescript ajude a evitar erros ao acessar chaves de tradução.
 */
type Language = "pt" | "en";

interface LanguageContextData {
  language: Language;
  setLanguage: (lang: Language) => void;
  texts: typeof translations.pt;
}

// criação do contexto para compartilhamento do estado de idioma
const LanguageContext = createContext<LanguageContextData>(
  {} as LanguageContextData,
);

/**
 * componente provider:
 * gerencia o estado do idioma e persiste a escolha do usuário no localstorage.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // inicializa o idioma com base na preferência salva ou padrão para pt
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("@CherryDiner:language");
    return saved === "en" || saved === "pt" ? (saved as Language) : "pt";
  });

  // função para atualizar o idioma e salvar a escolha no navegador
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("@CherryDiner:language", lang);
  };

  // computa os textos corretos com base no idioma ativo
  const texts = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * hook customizado: useLanguage
 * expõe os textos e funções de troca de idioma para os componentes consumidores.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  }
  return context;
};
