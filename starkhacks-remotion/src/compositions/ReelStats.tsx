import {
  AbsoluteFill, Img, Audio, interpolate, useCurrentFrame, useVideoConfig,
  staticFile, Easing, spring,
} from "remotion";
import { COLORS, FONTS } from "../styles";
import { PersistentHeader } from "../components/PersistentHeader";
import { PersistentCTA } from "../components/PersistentCTA";

const STATS = [
  { value: 500, suffix: "+", label: "BUILDERS" },
  { value: 36, suffix: "HRS", label: "OF HACKING" },
  { value: 100, suffix: "K", prefix: "$", label: "IN TOTAL PRIZES" },
  { value: 29, suffix: "", label: "DEGREES OF FREEDOM" },
];

export const ReelStats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headerEntry = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 220 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111111" }}>
      <Audio src={staticFile("audio/upbeat3.mp3")} volume={0.7} />

      {/* BG image — bright and visible */}
      <div style={{ position: "absolute", inset: 0, filter: "blur(40px) brightness(0.4) saturate(1.5)", opacity: 0.8 }}>
        <Img src={staticFile("event/g1-pose.jpeg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Subtle grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Warm glow */}
      <div style={{ position: "absolute", top: "25%", left: "50%", width: 900, height: 900, transform: "translate(-50%, -50%)", background: `radial-gradient(circle, ${COLORS.gold}20, transparent 55%)` }} />

      {/* Section title */}
      <div style={{ position: "absolute", top: 160, left: 0, right: 0, textAlign: "center", opacity: headerEntry, transform: `scale(${0.6 + headerEntry * 0.4})` }}>
        <div style={{ fontFamily: FONTS.display, fontSize: 60, color: COLORS.white, letterSpacing: "0.15em" }}>BY THE</div>
        <div style={{
          fontFamily: FONTS.display, fontSize: 90, letterSpacing: "0.1em",
          background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          filter: `drop-shadow(0 0 20px ${COLORS.gold}50)`,
        }}>NUMBERS</div>
      </div>

      {/* Stats */}
      <div style={{ position: "absolute", top: 420, left: 55, right: 55, display: "flex", flexDirection: "column", gap: 45 }}>
        {STATS.map((stat, i) => {
          const delay = i * 12;
          const entry = spring({ frame: frame - 20 - delay, fps, config: { damping: 10, stiffness: 200 } });
          const lf = frame - delay;
          const countP = interpolate(lf, [20, 65], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const eased = 1 - Math.pow(1 - countP, 4);
          const dv = Math.round(stat.value * eased);
          const glowStr = countP < 1 ? 25 : 8 + Math.sin(frame * 0.08) * 5;

          return (
            <div key={stat.label} style={{ display: "flex", alignItems: "baseline", gap: 20, opacity: entry, transform: `translateX(${(1 - entry) * 150}px) scale(${0.7 + entry * 0.3})`, transformOrigin: "left center" }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 130, lineHeight: 1, color: COLORS.white, textShadow: `0 0 ${glowStr}px ${COLORS.gold}50`, minWidth: 340 }}>
                {stat.prefix || ""}{dv}<span style={{ fontSize: 65, color: COLORS.gold }}>{stat.suffix}</span>
              </div>
              <div>
                <div style={{ width: 60, height: 3, background: COLORS.gold, marginBottom: 8, boxShadow: `0 0 10px ${COLORS.gold}40` }} />
                <div style={{ fontFamily: FONTS.body, fontSize: 22, color: "rgba(255,255,255,0.7)", letterSpacing: "0.2em", whiteSpace: "nowrap" }}>{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <PersistentHeader />
      <PersistentCTA />
    </AbsoluteFill>
  );
};
