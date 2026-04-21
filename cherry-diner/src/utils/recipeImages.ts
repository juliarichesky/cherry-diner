// importação de todas as fotos das receitas
import hamburguerClassico from "../assets/images/recipes/classic-hamburguer.png";
import milkshakeMorango from "../assets/images/recipes/milkshake-de-morango.png";
import moscowMule from "../assets/images/recipes/moscow-mule.png";
import saladaCaeser from "../assets/images/recipes/salada-caesar.png";
// ... adicione as outras aqui

// mapa que liga o id do json ao arquivo importado
export const recipeImages: Record<string, string> = {
  "hamburguer-classico": hamburguerClassico,
  "milkshake-morango": milkshakeMorango,
  "moscow-mule": moscowMule,
  "salada-caeser": saladaCaeser,

  // o id aqui deve ser exatamente o mesmo do seu json
};
