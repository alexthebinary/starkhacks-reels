import {
  AbsoluteFill, Img, Audio, interpolate, useCurrentFrame, useVideoConfig,
  staticFile, spring, Easing,
} from "remotion";
import { COLORS, FONTS } from "../styles";
import { PersistentHeader } from "../components/PersistentHeader";
import { PersistentCTA } from "../components/PersistentCTA";

export const ReelBTS: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const flash = interpolate(frame, [0, 2, 5, 10], [0, 0.8, 0.4, 0], { extrapolateRight: "clamp" });
  const imgScale = interpolate(frame, [5, durationInFrames], [1.05, 1.15]);
  const tagEntry = spring({ frame: frame - 8, fps, config: { damping: 10, stiffness: 250 } });
  const textClip = interpolate(frame, [18, 35], [100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Audio src={staticFile("audio/upbeat1.mp3")} startFrom={30 * 15} volume={0.7} />

      {/* Photo — BRIGHT, no dark filter */}
      <div style={{ position: "absolute", inset: -30, transform: `scale(${imgScale})`, filter: "contrast(1.05) saturate(1.15) brightness(1.0)" }}>
        <Img src={staticFile("event/alex-bts.jpeg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Light bottom gradient for text only */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 700, background: "linear-gradient(transparent, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.65))" }} />

      {/* BTS tag */}
      <div style={{ position: "absolute", top: 130, left: 55, opacity: tagEntry, transform: `scale(${0.6 + tagEntry * 0.4})`, transformOrigin: "left center" }}>
        <div style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: `2px solid ${COLORS.gold}50`, borderRadius: 10, padding: "14px 32px", boxShadow: `0 0 20px ${COLORS.gold}15` }}>
          <span style={{ fontFamily: FONTS.display, fontSize: 28, color: COLORS.white, letterSpacing: "0.3em", textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>BEHIND THE SCENES</span>
        </div>
      </div>

      {/* Main text */}
      <div style={{ position: "absolute", bottom: 340, left: 55, right: 55, clipPath: `inset(0 0 ${textClip}% 0)` }}>
        <div style={{ fontFamily: FONTS.serif, fontSize: 72, color: COLORS.white, fontStyle: "italic", lineHeight: 1.2, textShadow: "0 4px 15px rgba(0,0,0,0.5)" }}>Where builders</div>
        <div style={{ fontFamily: FONTS.serif, fontSize: 72, fontStyle: "italic", lineHeight: 1.2 }}>
          <span style={{ color: COLORS.white, textShadow: "0 4px 15px rgba(0,0,0,0.5)" }}>meet </span>
          <span style={{
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 15px ${COLORS.gold}60)`,
          }}>machines.</span>
        </div>
      </div>

      <PersistentHeader />
      <PersistentCTA />

      {/* Flash */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "white", opacity: flash, pointerEvents: "none", zIndex: 60 }} />
    </AbsoluteFill>
  );
};
