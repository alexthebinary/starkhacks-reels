import {
  AbsoluteFill, Img, Audio, interpolate, useCurrentFrame, useVideoConfig,
  staticFile, spring, Easing, random,
} from "remotion";
import { COLORS, FONTS } from "../styles";
import { PersistentHeader } from "../components/PersistentHeader";
import { PersistentCTA } from "../components/PersistentCTA";

const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: 20 }, (_, i) => {
        const x = random(`px-${i}`) * 1080;
        const startY = random(`py-${i}`) * 2200;
        const size = 1.5 + random(`ps-${i}`) * 3;
        const speed = 0.5 + random(`psp-${i}`) * 1;
        const delay = random(`pd-${i}`) * 40;
        const y = startY - (frame - delay) * speed;
        const drift = Math.sin((frame + delay) * 0.03) * 18;
        const flicker = 0.5 + Math.sin(frame * 0.12 + i) * 0.5;
        return (
          <div key={i} style={{
            position: "absolute", left: x + drift, top: ((y % 2200) + 2200) % 2200 - 100,
            width: size, height: size, borderRadius: "50%", background: COLORS.amber,
            opacity: 0.3 * flicker, boxShadow: `0 0 ${size * 3}px ${COLORS.gold}60`,
          }} />
        );
      })}
    </>
  );
};

export const ReelHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const bgScale = interpolate(frame, [0, durationInFrames], [1.05, 1.18]);

  // Title slams
  const starkX = interpolate(frame, [6, 18], [-600, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.exp) });
  const starkOp = interpolate(frame, [6, 14], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const starkScale = frame >= 18 && frame <= 24 ? 1 + (1 - interpolate(frame, [18, 24], [0, 1], { extrapolateRight: "clamp" })) * 0.08 : 1;

  const hacksX = interpolate(frame, [10, 22], [600, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.exp) });
  const hacksOp = interpolate(frame, [10, 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const hacksScale = frame >= 22 && frame <= 28 ? 1 + (1 - interpolate(frame, [22, 28], [0, 1], { extrapolateRight: "clamp" })) * 0.08 : 1;

  const yearPop = spring({ frame: frame - 24, fps, config: { damping: 10, stiffness: 250 } });

  const sub1Op = interpolate(frame, [32, 42], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const sub1Y = interpolate(frame, [32, 44], [60, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.exp) });
  const sub2Op = interpolate(frame, [38, 48], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const sub2Y = interpolate(frame, [38, 50], [60, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.exp) });

  const statEntry = (d: number) => {
    const s = spring({ frame: frame - 55 - d, fps, config: { damping: 10, stiffness: 220 } });
    return { op: s, scale: 0.5 + s * 0.5 };
  };

  const shimmerX = interpolate(frame, [25, 60], [-300, 1400], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const lineW = interpolate(frame, [20, 45], [0, 920], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Audio */}
      <Audio src={staticFile("audio/upbeat1.mp3")} volume={0.7} />

      {/* BG — BRIGHT, visible */}
      <div style={{ position: "absolute", inset: -40, transform: `scale(${bgScale})`, filter: "brightness(0.7) contrast(1.1) saturate(1.3)" }}>
        <Img src={staticFile("event/g1-leap.jpeg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Light warm wash — no dark vignette */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.5) 100%)" }} />

      <Particles />

      {/* Gold line */}
      <div style={{ position: "absolute", top: 640, left: "50%", transform: "translateX(-50%)", width: lineW, height: 4, background: `linear-gradient(90deg, transparent, ${COLORS.gold}, ${COLORS.amber}, ${COLORS.gold}, transparent)`, boxShadow: `0 0 16px ${COLORS.gold}50` }} />

      {/* STARK */}
      <div style={{ position: "absolute", top: 340, left: 50, right: 50, transform: `translateX(${starkX}px) scale(${starkScale})`, opacity: starkOp, transformOrigin: "left center" }}>
        <div style={{ fontFamily: FONTS.display, fontSize: 200, color: COLORS.white, lineHeight: 0.85, textShadow: "0 4px 20px rgba(0,0,0,0.6), 0 0 60px rgba(0,0,0,0.3)" }}>STARK</div>
      </div>

      {/* HACKS */}
      <div style={{ position: "absolute", top: 490, left: 50, right: 50, transform: `translateX(${hacksX}px) scale(${hacksScale})`, opacity: hacksOp, overflow: "hidden", transformOrigin: "right center" }}>
        <div style={{
          fontFamily: FONTS.display, fontSize: 200, lineHeight: 0.85,
          background: `linear-gradient(135deg, ${COLORS.gold} 0%, #FFD700 30%, ${COLORS.amber} 55%, #E8A800 80%, ${COLORS.gold} 100%)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          filter: `drop-shadow(0 4px 20px ${COLORS.gold}80)`,
        }}>HACKS</div>
        <div style={{ position: "absolute", top: 0, left: shimmerX, width: 160, height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)", transform: "skewX(-15deg)" }} />
      </div>

      {/* 2026 */}
      <div style={{ position: "absolute", top: 660, left: 55, transform: `scale(${yearPop})`, opacity: yearPop, transformOrigin: "left center" }}>
        <div style={{ fontFamily: FONTS.body, fontSize: 52, color: COLORS.gold, letterSpacing: "0.5em", fontWeight: 300, textShadow: `0 2px 15px ${COLORS.gold}60` }}>2026</div>
      </div>

      {/* Subtitles */}
      <div style={{ position: "absolute", top: 800, left: 55, right: 55, opacity: sub1Op, transform: `translateY(${sub1Y}px)` }}>
        <div style={{ fontFamily: FONTS.serif, fontSize: 64, color: COLORS.white, fontStyle: "italic", lineHeight: 1.25, textShadow: "0 3px 15px rgba(0,0,0,0.6)" }}>500+ builders.</div>
      </div>
      <div style={{ position: "absolute", top: 890, left: 55, right: 55, opacity: sub2Op, transform: `translateY(${sub2Y}px)` }}>
        <div style={{ fontFamily: FONTS.serif, fontSize: 64, color: COLORS.white, fontStyle: "italic", lineHeight: 1.25, textShadow: "0 3px 15px rgba(0,0,0,0.6)" }}>36 hours. Purdue.</div>
      </div>

      {/* Stats */}
      <div style={{ position: "absolute", bottom: 220, left: 40, right: 40, display: "flex", justifyContent: "space-around" }}>
        {[
          { num: "500+", label: "BUILDERS", d: 0 },
          { num: "36", label: "HOURS", d: 4 },
          { num: "$100K", label: "PRIZES", d: 8 },
        ].map((s) => {
          const e = statEntry(s.d);
          return (
            <div key={s.label} style={{ textAlign: "center", opacity: e.op, transform: `scale(${e.scale})` }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 80, color: COLORS.gold, textShadow: `0 0 30px ${COLORS.gold}60, 0 3px 10px rgba(0,0,0,0.5)` }}>{s.num}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 18, color: COLORS.white, letterSpacing: "0.25em", marginTop: 4, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      <PersistentHeader />
      <PersistentCTA />
    </AbsoluteFill>
  );
};
