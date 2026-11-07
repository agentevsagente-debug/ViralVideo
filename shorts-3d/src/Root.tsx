import { Composition } from "remotion";
import { loadFont } from "@remotion/google-fonts/LilitaOne";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";
import { FPS } from "./kit/anim";
import { CharacterSheet } from "./tests/CharacterSheet";
import { Short } from "./short/Short";
import { TOTAL_SEC as MOEDINHA_SEC } from "./short/timeline";
import { Ocarina } from "./short2/Ocarina";
import { TOTAL_SEC as OCARINA_SEC } from "./short2/timeline";
import { Capivara } from "./short3/Capivara";
import { CapySheet } from "./short3/CapySheet";
import { TOTAL_SEC as CAPIVARA_SEC } from "./short3/timeline";
import { Reel } from "./short4/Reel";
import { TOTAL_SEC as REEL_SEC } from "./short4/timeline";

loadFont();
loadNunito("normal", { weights: ["800"] });

const V = { fps: FPS, width: 1080, height: 1920 };

export const Root = () => (
  <>
    {/* Shorts verticais (1080x1920, 30 fps) */}
    <Composition id="Short" component={Short} durationInFrames={Math.ceil(MOEDINHA_SEC * FPS)} {...V} defaultProps={{ captions: true }} />
    <Composition id="Ocarina" component={Ocarina} durationInFrames={Math.ceil(OCARINA_SEC * FPS)} {...V} defaultProps={{ captions: true }} />
    <Composition id="Capivara" component={Capivara} durationInFrames={Math.ceil(CAPIVARA_SEC * FPS)} {...V} defaultProps={{ captions: true }} />
    <Composition id="Reel3D" component={Reel} durationInFrames={Math.ceil(REEL_SEC * FPS)} {...V} defaultProps={{ captions: true }} />
    {/* Folhas de personagem (para conferir modelos) */}
    <Composition id="CharacterSheet" component={CharacterSheet} durationInFrames={100} fps={30} width={1080} height={1080} />
    <Composition id="CapivaraSheet" component={CapySheet} durationInFrames={100} fps={30} width={1080} height={1080} defaultProps={{ view: "front" as const }} />
  </>
);
