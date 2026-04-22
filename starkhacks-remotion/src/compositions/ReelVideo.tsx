import {
  AbsoluteFill, OffthreadVideo, Img, Audio, interpolate, useCurrentFrame,
  useVideoConfig, staticFile, spring, Easing,
} from "remotion";
import { COLORS, FONTS } from "../styles";

export const ReelVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const vidScale = interpolate(frame, [0, 15], [1.1, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const vidOp = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  const endFade = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], { extrapolateRight: "clamp" });
  const badgeEntry = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 250 } });
  const titleEntry = spring({ frame: frame - 12, fps, config: { damping: 10, stiffness: 220 } });
  const subOp = interpolate(frame, [25, 38], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const logoOp = interpolate(frame, [15, 28], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const glowPulse = 8 + Math.sin(frame * 0.1) * 6;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Audio — uses the video's own audio */}

      {/* Video full width — BRIGHT, no dark overlays */}
      <div style={{ position: "absolute", inset: 0, transform: `scale(${vidScale})`, opacity: vidOp * endFade, overflow: "hidden" }}>
        <OffthreadVideo src={staticFile("event/purdueG1-fixed.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05) saturate(1.1) brightness(1.1)" }} volume={0.8} />
      </div>

      {/* Very light gradients for text readability only */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 200, background: "linear-gradient(rgba(0,0,0,0.35), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 250, background: "linear-gradient(transparent, rgba(0,0,0,0.4))" }} />

      {/* Header logos */}
      <div style={{ position: "absolute", top: 35, left: 60, display: "flex", alignItems: "center", gap: 24, opacity: logoOp }}>
        <Img src={staticFile("brand/unitree-logo-white.svg")} style={{ height: 32, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }} />
        <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.5)" }} />
        <Img src={staticFile("brand/futurology-logo-inverted.png")} style={{ height: 30, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }} />
      </div>

      {/* Badge */}
      <div style={{ position: "absolute", top: 30, right: 60, opacity: badgeEntry, transform: `scale(${0.7 + badgeEntry * 0.3})` }}>
        <div style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: `2px solid ${COLORS.gold}60`, borderRadius: 50, padding: "12px 32px", boxShadow: `0 0 15px ${COLORS.gold}20` }}>
          <span style={{ fontFamily: FONTS.display, fontSize: 20, color: COLORS.white, letterSpacing: "0.3em", textShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>LIVE AT PURDUE</span>
        </div>
      </div>

      {/* Title */}
      <div style={{ position: "absolute", bottom: 100, left: 60, opacity: titleEntry, transform: `scale(${0.6 + titleEntry * 0.4})`, transformOrigin: "left bottom" }}>
        <div style={{ fontFamily: FONTS.display, fontSize: 72, color: COLORS.white, textTransform: "uppercase", lineHeight: 0.95, textShadow: "0 4px 15px rgba(0,0,0,0.6)" }}>THE G1 TOOK</div>
        <div style={{ fontFamily: FONTS.display, fontSize: 72, lineHeight: 0.95, textTransform: "uppercase", background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 4px 15px ${COLORS.gold}50)` }}>THE STAGE.</div>
      </div>

      {/* CTA */}
      <div style={{ position: "absolute", bottom: 100, right: 60, opacity: subOp }}>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})`, borderRadius: 50, padding: "16px 40px", boxShadow: `0 0 ${glowPulse}px ${COLORS.gold}50` }}>
          <span style={{ fontFamily: FONTS.display, fontSize: 20, color: COLORS.black, letterSpacing: "0.1em" }}>NOW IN STOCK AT FUTUROLOGY.TECH</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
