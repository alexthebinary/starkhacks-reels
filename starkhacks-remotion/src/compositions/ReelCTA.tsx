import {
  AbsoluteFill, Img, Audio, interpolate, useCurrentFrame, useVideoConfig,
  staticFile, spring, Easing, random,
} from "remotion";
import { COLORS, FONTS } from "../styles";

const Stars: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: 40 }, (_, i) => {
        const x = random(`sx-${i}`) * 1080;
        const y = random(`sy-${i}`) * 1920;
        const size = 1.5 + random(`ss-${i}`) * 3;
        const phase = random(`sp-${i}`) * Math.PI * 2;
        const op = 0.25 + Math.sin(frame * (0.05 + random(`sspd-${i}`) * 0.1) + phase) * 0.25;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: "white", opacity: op, boxShadow: size > 2 ? `0 0 ${size * 4}px rgba(255,255,255,0.4)` : "none" }} />
        );
      })}
    </>
  );
};

export const ReelCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ring = (start: number, dur: number) => ({
    scale: interpolate(frame, [start, start + dur], [0, 3.5], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }),
    op: interpolate(frame, [start, start + 10, start + dur - 8, start + dur], [0, 0.15, 0.05, 0], { extrapolateRight: "clamp" }),
  });
  const r1 = ring(0, 55);
  const r2 = ring(8, 60);

  const word = (start: number) => {
    const s = spring({ frame: frame - start, fps, config: { damping: 9, stiffness: 250 } });
    return { op: s, y: (1 - s) * 120, scale: 0.5 + s * 0.5 };
  };
  const w1 = word(12);
  const w2 = word(20);
  const w3 = word(30);

  const shakeX = frame >= 30 && frame <= 38 ? Math.sin(frame * 4) * 6 : 0;
  const shakeY = frame >= 30 && frame <= 38 ? Math.cos(frame * 5) * 4 : 0;

  const logoEntry = spring({ frame: frame - 5, fps, config: { damping: 12, stiffness: 200 } });
  const ctaEntry = spring({ frame: frame - 50, fps, config: { damping: 10, stiffness: 200 } });
  const ctaGlow = frame > 55 ? 18 + Math.sin((frame - 55) * 0.12) * 14 : 0;
  const tagOp = interpolate(frame, [60, 75], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const purdueOp = interpolate(frame, [70, 85], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0E0E0E" }}>
      <Audio src={staticFile("audio/upbeat2.mp3")} startFrom={30 * 20} volume={0.7} />

      {/* Warm BG glow — not dark */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${COLORS.gold}12 0%, #0E0E0E 70%)` }} />

      <Stars />

      {/* Rings */}
      <div style={{ position: "absolute", top: "32%", left: "50%", width: 300, height: 300, transform: `translate(-50%, -50%) scale(${r1.scale})`, border: `1.5px solid ${COLORS.gold}`, borderRadius: "50%", opacity: r1.op }} />
      <div style={{ position: "absolute", top: "32%", left: "50%", width: 300, height: 300, transform: `translate(-50%, -50%) scale(${r2.scale})`, border: `1.5px solid ${COLORS.gold}`, borderRadius: "50%", opacity: r2.op }} />

      {/* Glow */}
      <div style={{ position: "absolute", top: "28%", left: "50%", width: 800, height: 800, transform: "translate(-50%, -50%)", background: `radial-gradient(circle, ${COLORS.gold}22, transparent 55%)`, opacity: interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" }) }} />

      {/* Logos — big */}
      <div style={{ position: "absolute", top: 120, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 50, opacity: logoEntry, transform: `scale(${0.6 + logoEntry * 0.4})` }}>
        <Img src={staticFile("brand/unitree-logo-white.svg")} style={{ height: 60 }} />
        <div style={{ width: 2, height: 50, background: "rgba(255,255,255,0.3)" }} />
        <Img src={staticFile("brand/futurology-logo-inverted.png")} style={{ height: 56 }} />
      </div>

      {/* Title */}
      <div style={{ position: "absolute", top: 550, left: 0, right: 0, textAlign: "center", transform: `translate(${shakeX}px, ${shakeY}px)` }}>
        <div style={{ fontFamily: FONTS.serif, fontSize: 82, color: COLORS.offWhite, fontStyle: "italic", lineHeight: 1.1, opacity: w1.op, transform: `translateY(${w1.y}px) scale(${w1.scale})` }}>The future</div>
        <div style={{ fontFamily: FONTS.serif, fontSize: 82, color: COLORS.offWhite, fontStyle: "italic", lineHeight: 1.1, opacity: w2.op, transform: `translateY(${w2.y}px) scale(${w2.scale})` }}>is being</div>
        <div style={{
          fontFamily: FONTS.display, fontSize: 170, lineHeight: 1, textTransform: "uppercase",
          opacity: w3.op, transform: `translateY(${w3.y}px) scale(${w3.scale})`,
          background: `linear-gradient(135deg, ${COLORS.gold} 0%, #FFD700 35%, ${COLORS.amber} 65%, ${COLORS.gold} 100%)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          filter: `drop-shadow(0 0 35px ${COLORS.gold}70)`,
        }}>BUILT.</div>
      </div>

      {/* CTA */}
      <div style={{ position: "absolute", bottom: 340, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: ctaEntry, transform: `scale(${0.6 + ctaEntry * 0.4})` }}>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})`, borderRadius: 60, padding: "26px 56px", boxShadow: `0 0 ${ctaGlow}px ${COLORS.gold}70, 0 8px 30px rgba(0,0,0,0.3)` }}>
          <span style={{ fontFamily: FONTS.display, fontSize: 32, color: COLORS.black, letterSpacing: "0.1em" }}>NOW IN STOCK AT FUTUROLOGY.TECH</span>
        </div>
      </div>

      {/* Tagline */}
      <div style={{ position: "absolute", bottom: 250, left: 0, right: 0, textAlign: "center", opacity: tagOp }}>
        <div style={{ fontFamily: FONTS.body, fontSize: 24, color: "rgba(255,255,255,0.6)", letterSpacing: "0.3em" }}>IN FUTURE WE TRUST</div>
      </div>

      {/* Purdue */}
      <div style={{ position: "absolute", bottom: 100, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: purdueOp }}>
        <div style={{ fontFamily: FONTS.body, fontSize: 16, color: "rgba(255,255,255,0.5)", letterSpacing: "0.4em", fontWeight: 600 }}>IN PARTNERSHIP WITH</div>
        <Img src={staticFile("brand/purdue-logo-white.svg")} style={{ height: 52 }} />
      </div>
    </AbsoluteFill>
  );
};
