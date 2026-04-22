import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadInstrumentSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadSourceSerif4 } from "@remotion/google-fonts/SourceSerif4";
import { loadFont as loadBarlow } from "@remotion/google-fonts/Barlow";

const anton = loadAnton();
const instrumentSerif = loadInstrumentSerif();
const inter = loadInter();
const poppins = loadPoppins();
const sourceSerif4 = loadSourceSerif4();
const barlow = loadBarlow();

export const FONT = {
  display: anton.fontFamily,
  serif: instrumentSerif.fontFamily,
  body: inter.fontFamily,
  poppins: poppins.fontFamily,
  sourceSerif: sourceSerif4.fontFamily,
  barlow: barlow.fontFamily,
};
