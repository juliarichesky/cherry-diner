// importação de todas as fotos das receitas
import hamburguerClassico from "../assets/images/recipes/classic-hamburguer.png";
import milkshakeMorango from "../assets/images/recipes/milkshake-de-morango.png";
import moscowMule from "../assets/images/recipes/moscow-mule.png";
import saladaCaeser from "../assets/images/recipes/salada-caesar.png";
import boloAbacaxi from "../assets/images/recipes/bolo-de-abacaxi-invertido.png";
import boloCarne from "../assets/images/recipes/bolo-de-carne.png";
import boloChocolate from "../assets/images/recipes/bolo-de-chocolate.png";
import gelatinaMosaico from "../assets/images/recipes/gelatina-mosaico.png";
import martini from "../assets/images/recipes/martini.png";
import ostrasRockefeller from "../assets/images/recipes/ostras-rockefeller.png";
import presutoAssadoAbacaxi from "../assets/images/recipes/presunto-assado-com-abacaxi.png";
import saladaAmbrosia from "../assets/images/recipes/salada-de-ambrosia.png";
import tortaFrango from "../assets/images/recipes/torta-de-frango.png";
import tortaMaca from "../assets/images/recipes/torta-de-maca.png";
import bananaDaiquiriRum from "../assets/images/recipes/banana-daiquiri-rum.png";
import ginDaisy from "../assets/images/recipes/gin-daisy.png";
import pateAtumTorradas from "../assets/images/recipes/pate-de-atum-com-torradas.png";
import poncheChampanhe from "../assets/images/recipes/ponche-de-champanhe.png";
import bananaSplit from "../assets/images/recipes/banana-split.png";
import canapesCamarao from "../assets/images/recipes/canapes-de-camarao.png";
import boloRedVelvet from "../assets/images/recipes/bolo-red-velvet.png";
import carneMolhoCogumelos from "../assets/images/recipes/carne-ao-molho-de-cogumelos.png";
import grasshopper from "../assets/images/recipes/grasshopper.png";
import saladaBatatas from "../assets/images/recipes/salada-de-batatas.png";
import sopaCebola from "../assets/images/recipes/sopa-de-cebola.png";
import panquecaSalgada from "../assets/images/recipes/panqueca-salgada.png";
import boloBanana from "../assets/images/recipes/bolo-de-banana.png";
import panquecaDoce from "../assets/images/recipes/panqueca-doce.png";
import muffins from "../assets/images/recipes/muffins.png";
import pinaColada from "../assets/images/recipes/pina-colada.png";

// ... adicione as outras aqui

// mapa que liga o id do json ao arquivo importado
export const recipeImages: Record<string, string> = {
  // entradas
  "salada-caeser": saladaCaeser,
  "canapes-de-camarao": canapesCamarao,
  "pate-de-atum-com-torradas": pateAtumTorradas,
  "ostras-rockefeller": ostrasRockefeller,

  // pratos principais
  "hamburguer-classico": hamburguerClassico,
  "bolo-de-carne": boloCarne,
  "sopa-de-cebola": sopaCebola,
  "salada-de-batatas": saladaBatatas,
  "carne-ao-molho-de-cogumelos": carneMolhoCogumelos,
  "torta-de-frango": tortaFrango,
  "presunto-assado-com-abacaxi": presutoAssadoAbacaxi,
  "panqueca-salgada": panquecaSalgada,

  // sobremeses
  "milkshake-morango": milkshakeMorango,
  "bolo-de-abacaxi-invertido": boloAbacaxi,
  "bolo-de-chocolate": boloChocolate,
  "gelatina-mosaico": gelatinaMosaico,
  "bolo-red-velvet": boloRedVelvet,
  "banana-split": bananaSplit,
  "torta-de-maca": tortaMaca,
  "salada-de-ambrosia": saladaAmbrosia,
  "bolo-de-banana": boloBanana,
  muffins: muffins,
  "panqueca-doce": panquecaDoce,

  // bebidas
  "moscow-mule": moscowMule,
  martini: martini,
  grasshopper: grasshopper,
  "ponche-de-champanhe": poncheChampanhe,
  "gin-daisy": ginDaisy,
  "banana-daiquiri-rum": bananaDaiquiriRum,
  "pina-colada": pinaColada,
};