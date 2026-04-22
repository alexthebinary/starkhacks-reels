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
const GrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' seed='${frame % 120}'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
        mixBlendMode: "overlay",
      }}
    />
  );
};

/* ── Shine sweep ── */
const ShineSweep: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cycleFrames = 5 * fps;
  const t = (frame % cycleFrames) / cycleFrames;
  const x = interpolate(t, [0, 1], [-400, 1500]);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute", top: 0, left: x, width: 280, height: "100%",
          background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.06), transparent)",
          transform: "skewX(-15deg)",
        }}
      />
    </div>
  );
};

/* ── Twinkle dots ── */
const Twinkles: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = [
    { x: 160, y: 340, delay: 0 },
    { x: 880, y: 520, delay: 12 },
    { x: 320, y: 1100, delay: 24 },
    { x: 760, y: 280, delay: 36 },
    { x: 540, y: 1400, delay: 8 },
  ];
  const cycleSec = 1.8;
  const cycleFrames = cycleSec * 30;

  return (
    <>
      {dots.map((dot, i) => {
        const t = ((frame - dot.delay) % cycleFrames + cycleFrames) % cycleFrames;
        const phase = t / cycleFrames;
        const op = 0.15 + (Math.sin(phase * Math.PI * 2) * 0.5 + 0.5) * 0.85;
        const sc = 0.8 + (Math.sin(phase * Math.PI * 2) * 0.5 + 0.5) * 0.4;
        return (
          <div
            key={i}
            style={{
              position: "absolute", left: dot.x, top: dot.y,
              width: 6, height: 6, borderRadius: "50%",
              background: COLORS.amber,
              opacity: op, transform: `scale(${sc})`,
              boxShadow: `0 0 ${8 * op}px ${COLORS.gold}80`,
            }}
          />
        );
      })}
    </>
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
   CardSix – Grand Prize "$100K" card (dark theme)
   ════════════════════════════════════════════════════════════════ */
export const CardSix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Rotating conic gradient halo (360deg / 30s) ── */
  const haloDeg = (frame / (30 * fps)) * 360;

  /* ── Gradient shimmer on $100K (4s cycle) ── */
  const shimmerCycle = 4 * fps;
  const shimmerT = (frame % shimmerCycle) / shimmerCycle;
  const bgPos = interpolate(shimmerT, [0, 1], [0, 200]);

  /* ── Glow pulse on $100K ── */
  const glowPulse = 20 + Math.sin(frame * 0.08) * 12;

  /* ── Staggered text entrances ── */
  const textEntry = (delay: number) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 180 } });
    return { opacity: s, y: (1 - s) * 60, scale: 0.85 + s * 0.15 };
  };
  const trophyEntry = textEntry(5);
  const grandEntry = textEntry(10);
  const prizeEntry = textEntry(18);
  const subtitleEntry = textEntry(30);
  const bodyEntry = textEntry(42);
  const presentedEntry = textEntry(55);
  const partnerEntry = textEntry(65);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Dual radial gold/brown glows */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse at 30% 35%, ${COLORS.gold}15 0%, transparent 50%),
            radial-gradient(ellipse at 70% 55%, #8E6F2E18 0%, transparent 50%)
          `,
        }}
      />

      {/* Rotating conic gradient halo */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 2400, height: 2400,
          transform: `translate(-50%, -60%) rotate(${haloDeg}deg)`,
          background: `conic-gradient(
            from 0deg,
            ${COLORS.gold}08,
            transparent,
            ${COLORS.amber}0A,
            transparent,
            ${COLORS.gold}08,
            transparent,
            ${COLORS.amber}0A,
            transparent
          )`,
          borderRadius: "50%",
          opacity: 0.6,
        }}
      />

      <Twinkles />
      <Scanlines />
      <GrainOverlay />
      <ShineSweep />

      {/* ── Trophy icon + "GRAND PRIZE" ── */}
      <div
        style={{
          position: "absolute", top: 340, left: 0, right: 0,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
        }}
      >
        {/* Star trophy */}
        <div
          style={{
            fontSize: 80, opacity: trophyEntry.opacity,
            transform: `translateY(${trophyEntry.y}px) scale(${trophyEntry.scale})`,
            filter: `drop-shadow(0 0 16px ${COLORS.gold}60)`,
            lineHeight: 1,
          }}
        >
          ★
        </div>
        {/* GRAND PRIZE label */}
        <div
          style={{
            fontFamily: FONT.body, fontSize: 26,
            color: COLORS.amber, letterSpacing: "0.5em", fontWeight: 700,
            opacity: grandEntry.opacity,
            transform: `translateY(${grandEntry.y}px) scale(${grandEntry.scale})`,
            textShadow: `0 0 12px ${COLORS.gold}40`,
          }}
        >
          GRAND PRIZE
        </div>
      </div>

      {/* ── $100K — big hero text ── */}
      <div
        style={{
          position: "absolute", top: 580, left: 0, right: 0,
          textAlign: "center",
          opacity: prizeEntry.opacity,
          transform: `translateY(${prizeEntry.y}px) scale(${prizeEntry.scale})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT.poppins, fontSize: 240, fontWeight: 500,
            lineHeight: 1,
            background: `linear-gradient(90deg, ${COLORS.gold} 0%, #FFD700 20%, ${COLORS.amber} 40%, #FFD700 60%, ${COLORS.gold} 80%, ${COLORS.amber} 100%)`,
            backgroundSize: "200% 100%",
            backgroundPosition: `${bgPos}% 0`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 ${glowPulse}px ${COLORS.gold}60)`,
          }}
        >
          $100K
        </div>
      </div>

      {/* ── "in total / prizes." ── */}
      <div
        style={{
          position: "absolute", top: 860, left: 0, right: 0,
          textAlign: "center",
          opacity: subtitleEntry.opacity,
          transform: `translateY(${subtitleEntry.y}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT.sourceSerif, fontSize: 56,
            fontStyle: "italic", color: COLORS.amber, lineHeight: 1.3,
            textShadow: `0 0 14px ${COLORS.gold}30`,
          }}
        >
          in total
          <br />
          prizes.
        </div>
      </div>

      {/* ── Body text ── */}
      <div
        style={{
          position: "absolute", top: 1080, left: 80, right: 80,
          textAlign: "center",
          fontFamily: FONT.body, fontSize: 26, color: "rgba(255,255,255,0.5)",
          lineHeight: 1.65, opacity: bodyEntry.opacity,
          transform: `translateY(${bodyEntry.y}px)`,
        }}
      >
        36 hours of building at Purdue University.{"\n"}
        500+ hackers. Real robots. Real prizes.{"\n"}
        April 17-19, 2026.
      </div>

      {/* ── "Presented by" + Futurology logo with glow ── */}
      <div
        style={{
          position: "absolute", bottom: 200, left: 0, right: 0,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
          opacity: presentedEntry.opacity,
          transform: `translateY(${presentedEntry.y}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT.body, fontSize: 18, color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.4em", fontWeight: 600, textTransform: "uppercase",
          }}
        >
          Presented by
        </div>
        <Img
          src={staticFile("futurology-logo-inverted.png")}
          style={{
            height: 52,
            filter: `drop-shadow(0 0 14px ${COLORS.gold}50)`,
          }}
        />
      </div>

      {/* ── Partner lockup ── */}
      <PartnerLockupDark opacity={partnerEntry.opacity} />
    </AbsoluteFill>
  );
};
