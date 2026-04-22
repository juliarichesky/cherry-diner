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
import frangoParmegiana from "../assets/images/recipes/frango-a-parmegiana.png";
import steakBatatas from "../assets/images/recipes/steak-com-batatas.png";
import pudimBaunilha from "../assets/images/recipes/pudim-de-baunilha.png";
import saladaWaldorf from "../assets/images/recipes/salada-waldorf.png";
import lasanhaBolonhesa from "../assets/images/recipes/lasanha-bolonhesa.png";
import manhattan from "../assets/images/recipes/manhattan.png";
import peruAssado from "../assets/images/recipes/peru-assado.png";
import tortaLimao from "../assets/images/recipes/torta-de-limao.png";
import donuts from "../assets/images/recipes/donuts.png";
import croqueteCarne from "../assets/images/recipes/croquete-de-carne.png";
import cheesecakeNewYork from "../assets/images/recipes/cheesecake-new-york.png";
import ovosRecheados from "../assets/images/recipes/ovos-recheados.png";
import chickenPotPie from "../assets/images/recipes/chicken-pot-pie.png";
import oldFashioned from "../assets/images/recipes/old-fashioned.png";
import cupcakeBaunilha from "../assets/images/recipes/cupcake-de-baunilha.png";
import frangoFrito from "../assets/images/recipes/frango-frito.png";
import roastBeef from "../assets/images/recipes/roast-beef.png";
import coquetelCamarao from "../assets/images/recipes/coquetel-de-camarao.png";
import bolinhasQueijo from "../assets/images/recipes/bolinhas-de-queijo.png";
import chilliCarne from "../assets/images/recipes/chili-com-carne.png";
import whiskeySour from "../assets/images/recipes/whiskey-sour.png";
import bakedAlaska from "../assets/images/recipes/baked-alaska.png";
import peachCobbler from "../assets/images/recipes/peach-cobbler.png";
import macarraoQueijo from "../assets/images/recipes/macarrao-com-queijo.png";
import costelaBBQ from "../assets/images/recipes/costela-bbq.png";
import brownie from "../assets/images/recipes/brownie.png";
import ricePudding from "../assets/images/recipes/rice-pudding.png";
import fishChips from "../assets/images/recipes/fish-and-chips.png";
import aspicCarne from "../assets/images/recipes/aspic-de-carne.png";
import tortaCereja from "../assets/images/recipes/torta-de-cereja.png";
import hotDog from "../assets/images/recipes/hot-dog.png";

// mapa que liga o id do json ao arquivo importado
export const recipeImages: Record<string, string> = {

  
  // entradas (10)
  "salada-caeser": saladaCaeser,
  "canapes-de-camarao": canapesCamarao,
  "pate-de-atum-com-torradas": pateAtumTorradas,
  "ostras-rockefeller": ostrasRockefeller,
  "salada-waldorf": saladaWaldorf,
  "coquetel-de-camarao": coquetelCamarao,
  "ovos-recheados": ovosRecheados,
  "bolinhas-de-queijo": bolinhasQueijo,
  "aspic-de-carne": aspicCarne,
  "croquetes-de-carne": croqueteCarne,

  // pratos principais (20)
  "hamburguer-classico": hamburguerClassico,
  "bolo-de-carne": boloCarne,
  "sopa-de-cebola": sopaCebola,
  "salada-de-batatas": saladaBatatas,
  "carne-ao-molho-de-cogumelos": carneMolhoCogumelos,
  "torta-de-frango": tortaFrango,
  "presunto-assado-com-abacaxi": presutoAssadoAbacaxi,
  "panqueca-salgada": panquecaSalgada,
  "frango-a-parmegiana": frangoParmegiana,
  "steak-com-batatas": steakBatatas,
  "lasanha-bolonhesa": lasanhaBolonhesa,
  "costela-bbq": costelaBBQ,
  "fish-and-chips": fishChips,
  "macarrao-com-queijo": macarraoQueijo,
  "chilli-com-carne": chilliCarne,
  "roast-beef": roastBeef,
  "frango-frito": frangoFrito,
  "chicken-pot-pie": chickenPotPie,
  "peru-assado": peruAssado,
  "hot-dog": hotDog,

  // sobremeses (20)
  "milkshake-de-morango": milkshakeMorango,
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
  "pudim-de-baunilha": pudimBaunilha,
  "cheesecake-new-york": cheesecakeNewYork,
  brownie: brownie,
  "cupcake-de-baunilha": cupcakeBaunilha,
  "torta-de-limao": tortaLimao,
  "baked-alaska": bakedAlaska,
  "torta-de-cereja": tortaCereja,
  "peach-cobbler": peachCobbler,
  donuts: donuts,
  "rice-pudding": ricePudding,

  // bebidas (10)
  "moscow-mule": moscowMule,
  martini: martini,
  grasshopper: grasshopper,
  "ponche-de-champanhe": poncheChampanhe,
  "gin-daisy": ginDaisy,
  "banana-daiquiri-rum": bananaDaiquiriRum,
  "pina-colada": pinaColada,
  "old-fashioned": oldFashioned,
  "whiskey-sour": whiskeySour,
  manhattan: manhattan,
};
