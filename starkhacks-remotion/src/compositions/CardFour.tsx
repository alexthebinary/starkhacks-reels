import {
  AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig,
  staticFile, spring,
} from "remotion";
import { COLORS, FONTS } from "../styles";
import { FONT } from "../fonts";

/* ── helpers ── */
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

/* ── Scanlines overlay ── */
const Scanlines: React.FC = () => (
  <div
    style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)",
    }}
  />
);

/* ── Film grain overlay ── */
const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  // pseudo-random grain via SVG filter seed
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed={frame % 60} />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </svg>
  );
};

const GrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <Grain />
      <div
        style={{
          position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' seed='${frame % 120}'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
};

/* ── Shine sweep ── */
const ShineSweep: React.FC<{ cycleSec?: number; delay?: number }> = ({ cycleSec = 5.5, delay = 0.8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cycleFrames = cycleSec * fps;
  const delayFrames = delay * fps;
  const t = ((frame - delayFrames) % cycleFrames + cycleFrames) % cycleFrames;
  const x = interpolate(t, [0, cycleFrames], [-400, 1500]);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute", top: 0, left: x, width: 260, height: "100%",
          background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.07), transparent)",
          transform: "skewX(-15deg)",
        }}
      />
    </div>
  );
};

/* ── Partner lockup (dark) ── */
const PartnerLockupDark: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: "absolute", bottom: 60, left: 0, right: 0,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
      opacity,
    }}
  >
    <div
      style={{
        fontFamily: FONT.body, fontSize: 16, color: "rgba(255,255,255,0.45)",
        letterSpacing: "0.35em", fontWeight: 600, textTransform: "uppercase",
      }}
    >
      In partnership with
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
      <Img src={staticFile("purdue-logo.svg")} style={{ height: 44, filter: "invert(1) brightness(1.2)", opacity: 0.8 }} />
      <div style={{ width: 2, height: 36, background: "rgba(255,255,255,0.2)" }} />
      <Img src={staticFile("unitree-logo.svg")} style={{ height: 40, filter: "invert(1) brightness(1.2)", opacity: 0.8 }} />
      <div style={{ width: 2, height: 36, background: "rgba(255,255,255,0.2)" }} />
      <Img src={staticFile("futurology-logo-inverted.png")} style={{ height: 40, opacity: 0.85 }} />
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════
   CardFour – "Stop watching. Start building." CTA card
   ════════════════════════════════════════════════════════════════ */
export const CardFour: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Robot float animation (5.5s / 165 frames cycle) ── */
  const floatCycle = 165;
  const floatT = (frame % floatCycle) / floatCycle;
  const floatY = Math.sin(floatT * Math.PI * 2) * -32;
  const floatScale = 1 + Math.sin(floatT * Math.PI * 2) * 0.015;

  /* ── Neon flicker on "futurology.tech" (4.5s cycle) ── */
  const flickerCycle = 4.5 * fps;
  const flickerT = (frame % flickerCycle) / flickerCycle;
  // Pattern: 1→0.35→1→0.35→1
  let neonOpacity = 1;
  if (flickerT < 0.15) neonOpacity = interpolate(flickerT, [0, 0.08, 0.15], [1, 0.35, 1]);
  else if (flickerT > 0.4 && flickerT < 0.55) neonOpacity = interpolate(flickerT, [0.4, 0.47, 0.55], [1, 0.35, 1]);

  /* ── Glow pulse on "Start building." ── */
  const glowPulse = 8 + Math.sin(frame * 0.1) * 6;

  /* ── Red dot pulse ── */
  const dotScale = 1 + Math.sin(frame * 0.15) * 0.15;
  const dotGlow = 6 + Math.sin(frame * 0.15) * 4;

  /* ── Staggered text entrances ── */
  const textLine = (delay: number) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 180 } });
    return { opacity: s, y: (1 - s) * 60, scale: 0.92 + s * 0.08 };
  };
  const line1 = textLine(8);
  const line2 = textLine(16);
  const line3 = textLine(24);
  const line4 = textLine(32);
  const bodyEntry = textLine(42);
  const badgeEntry = textLine(55);
  const partnerEntry = textLine(65);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Radial golden glow at top-right */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 85% 15%, ${COLORS.gold}18 0%, transparent 55%)`,
        }}
      />

      {/* Robot image — floating */}
      <div
        style={{
          position: "absolute", top: 40, right: -60,
          transform: `translateY(${floatY}px) scale(${floatScale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("unitree-alt-3.png")}
          style={{ width: 560, height: "auto", opacity: 0.35 }}
        />
      </div>

      <Scanlines />
      <GrainOverlay />
      <ShineSweep cycleSec={5.5} delay={1.2} />

      {/* ── Top bar: Futurology logo + neon text ── */}
      <div
        style={{
          position: "absolute", top: 72, left: 64, right: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          opacity: interpolate(frame, [0, 12], [0, 1], clamp),
        }}
      >
        <Img src={staticFile("futurology-logo-inverted.png")} style={{ height: 48 }} />
        <div
          style={{
            fontFamily: FONT.body, fontSize: 22, fontWeight: 500,
            color: COLORS.amber, opacity: neonOpacity,
            textShadow: `0 0 8px ${COLORS.amber}90, 0 0 20px ${COLORS.amber}40`,
            letterSpacing: "0.04em",
          }}
        >
          futurology.tech
        </div>
      </div>

      {/* ── Big headline ── */}
      <div style={{ position: "absolute", top: 520, left: 72, right: 72 }}>
        {/* "Stop" */}
        <div
          style={{
            fontFamily: FONT.serif, fontSize: 128, color: COLORS.white, lineHeight: 1.05,
            fontStyle: "italic", opacity: line1.opacity,
            transform: `translateY(${line1.y}px) scale(${line1.scale})`,
          }}
        >
          Stop
        </div>
        {/* "watching." */}
        <div
          style={{
            fontFamily: FONT.serif, fontSize: 128, color: COLORS.white, lineHeight: 1.05,
            fontStyle: "italic", opacity: line2.opacity,
            transform: `translateY(${line2.y}px) scale(${line2.scale})`,
          }}
        >
          watching.
        </div>
        {/* "Start" */}
        <div
          style={{
            fontFamily: FONT.serif, fontSize: 128, lineHeight: 1.05,
            fontStyle: "italic", opacity: line3.opacity,
            transform: `translateY(${line3.y}px) scale(${line3.scale})`,
            color: COLORS.amber,
            textShadow: `0 0 ${glowPulse}px ${COLORS.amber}80, 0 0 ${glowPulse * 2}px ${COLORS.gold}30`,
          }}
        >
          Start
        </div>
        {/* "building." */}
        <div
          style={{
            fontFamily: FONT.serif, fontSize: 128, lineHeight: 1.05,
            fontStyle: "italic", opacity: line4.opacity,
            transform: `translateY(${line4.y}px) scale(${line4.scale})`,
            color: COLORS.amber,
            textShadow: `0 0 ${glowPulse}px ${COLORS.amber}80, 0 0 ${glowPulse * 2}px ${COLORS.gold}30`,
          }}
        >
          building.
        </div>
      </div>

      {/* ── Body text ── */}
      <div
        style={{
          position: "absolute", top: 1120, left: 72, right: 100,
          fontFamily: FONT.body, fontSize: 28, color: "rgba(255,255,255,0.55)",
          lineHeight: 1.6, opacity: bodyEntry.opacity,
          transform: `translateY(${bodyEntry.y}px)`,
        }}
      >
        Join 500+ builders at Purdue for 36 hours of hacking, learning, and shipping real projects with cutting-edge robotics.
      </div>

      {/* ── Urgent badge ── */}
      <div
        style={{
          position: "absolute", top: 1360, left: 72,
          display: "flex", alignItems: "center", gap: 14,
          opacity: badgeEntry.opacity,
          transform: `translateY(${badgeEntry.y}px)`,
        }}
      >
        <div
          style={{
            background: "rgba(220, 38, 38, 0.9)", borderRadius: 40,
            padding: "14px 32px", display: "flex", alignItems: "center", gap: 12,
            boxShadow: "0 4px 20px rgba(220, 38, 38, 0.3)",
          }}
        >
          {/* Pulsing dot */}
          <div
            style={{
              width: 12, height: 12, borderRadius: "50%",
              background: "#fff", transform: `scale(${dotScale})`,
              boxShadow: `0 0 ${dotGlow}px rgba(255,255,255,0.6)`,
            }}
          />
          <span
            style={{
              fontFamily: FONT.body, fontSize: 22, color: "#fff",
              fontWeight: 700, letterSpacing: "0.06em",
            }}
          >
            Apr 17-19 &middot; 3 Days Left
          </span>
        </div>
      </div>

      {/* ── Partner lockup ── */}
      <PartnerLockupDark opacity={partnerEntry.opacity} />
    </AbsoluteFill>
  );
};
