import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  spring,
} from "remotion";
import { COLORS, FONTS } from "../styles";
import { FONT } from "../fonts";

/* ------------------------------------------------------------------ */
/*  Overlays                                                           */
/* ------------------------------------------------------------------ */
const Scanlines: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255,255,255,0.035) 8px, rgba(255,255,255,0.035) 12px)",
      mixBlendMode: "overlay",
      pointerEvents: "none",
    }}
  />
);

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame * 1.7) % 500;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.06,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' seed='${seed}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Controller data                                                    */
/* ------------------------------------------------------------------ */
const SECTION_1 = {
  header: "Posture \u00B7 L2 combos",
  icon: "\uD83C\uDFAE",
  items: [
    { label: "Debug Mode", combo: "L2+R2" },
    { label: "Zero Torque", combo: "L2+Y" },
    { label: "Damping", combo: "L2+B" },
    { label: "Lock Stand", combo: "L2+\u2191" },
    { label: "Seated", combo: "L2+\u2190" },
    { label: "Lying/Standing", combo: "L2+X" },
    { label: "Squat", combo: "L2+A" },
  ],
};

const SECTION_2 = {
  header: "Gestures \u00B7 SELECT combos",
  icon: "\u270B",
  items: [
    { label: "Wave hand", combo: "SELECT+Y" },
    { label: "Handshake", combo: "SELECT+A" },
    { label: "Turn+wave", combo: "SELECT+X" },
  ],
};

const SECTION_3 = {
  header: "Motion \u00B7 R2 + speed",
  icon: "\u26A1",
  items: [
    { label: "Slow run", combo: "R2+\u2193" },
    { label: "Fast run", combo: "R2+\u2191" },
    { label: "Low speed", combo: "2\u00D7L2" },
    { label: "High speed", combo: "2\u00D7L1" },
    { label: "Stand", combo: "START" },
    { label: "Keep step", combo: "2\u00D7START" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Controller section                                                 */
/* ------------------------------------------------------------------ */
const ControllerSection: React.FC<{
  header: string;
  icon: string;
  items: { label: string; combo: string }[];
  startFrame: number;
  sectionIndex: number;
}> = ({ header, icon, items, startFrame, sectionIndex }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const sectionOp = interpolate(frame, [startFrame, startFrame + 12], [0, 1], clamp);
  const sectionY = interpolate(frame, [startFrame, startFrame + 12], [30, 0], clamp);

  return (
    <div
      style={{
        opacity: sectionOp,
        transform: `translateY(${sectionY}px)`,
        marginBottom: 28,
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <span style={{ fontSize: 32, lineHeight: 1 }}>{icon}</span>
        <span
          style={{
            fontFamily: FONT.body,
            fontSize: 30,
            fontWeight: 700,
            color: COLORS.amber,
            letterSpacing: "0.06em",
          }}
        >
          {header}
        </span>
      </div>

      {/* Items in glass card */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${COLORS.gold}33`,
          borderRadius: 20,
          padding: "8px 0",
          backdropFilter: "blur(8px)",
        }}
      >
        {items.map((item, i) => {
          const delay = startFrame + 4 + i * 2;
          const itemOp = interpolate(frame, [delay, delay + 6], [0, 1], clamp);
          return (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 28px",
                opacity: itemOp,
                borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: FONT.body,
                  fontSize: 34,
                  fontWeight: 600,
                  color: COLORS.white,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 30,
                  fontWeight: 700,
                  color: COLORS.amber,
                  letterSpacing: "0.04em",
                }}
              >
                {item.combo}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main composition                                                   */
/* ------------------------------------------------------------------ */
export const CardSpecController: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // Shine sweep
  const shineCycle = 5 * fps;
  const shineProgress = (frame % shineCycle) / shineCycle;
  const shineX = interpolate(shineProgress, [0, 1], [-140, 140]);

  // Pulsing dot
  const dotPulse = 0.4 + Math.sin(frame * 0.25) * 0.6;
  const dotScale = 1 + Math.sin(frame * 0.25) * 0.15;

  // Title entrance
  const titleSpring = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 180 } });

  // Shimmer on "Controller."
  const shimmerCycle = 3 * fps;
  const shimmerX = interpolate(
    (frame % shimmerCycle) / shimmerCycle,
    [0, 1],
    [-300, 1200]
  );

  // Spec label
  const specLabelOp = interpolate(frame, [5, 15], [0, 1], clamp);

  // Subtitle
  const subOp = interpolate(frame, [15, 25], [0, 1], clamp);
  const subY = interpolate(frame, [15, 25], [20, 0], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Dual radial glows - blue + gold */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 15% 85%, rgba(59,130,246,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 85% 15%, ${COLORS.gold}20 0%, transparent 70%)`,
        }}
      />

      {/* Shine sweep */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${shineX}%`,
            width: 220,
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            transform: "skewX(-18deg)",
          }}
        />
      </div>

      {/* Top: pulsing dot + spec label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 64,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: specLabelOp,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: COLORS.amber,
            transform: `scale(${dotScale})`,
            boxShadow: `0 0 ${8 + dotPulse * 12}px ${COLORS.amber}`,
          }}
        />
        <span
          style={{
            fontFamily: FONT.body,
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.amber,
            letterSpacing: "0.12em",
          }}
        >
          SPEC SHEET &middot; 05/05
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 145,
          left: 64,
          right: 64,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])})`,
          opacity: titleSpring,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: FONT.display,
            fontSize: 108,
            color: COLORS.white,
            lineHeight: 1.05,
          }}
        >
          R3 /{" "}
        </span>
        <span
          style={{
            fontFamily: FONT.display,
            fontSize: 108,
            lineHeight: 1.05,
            background: `linear-gradient(135deg, ${COLORS.gold} 0%, #FFD700 30%, ${COLORS.amber} 55%, #E8A800 80%, ${COLORS.gold} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 16px ${COLORS.gold}50)`,
          }}
        >
          Controller.
        </span>
        {/* Shimmer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: shimmerX,
            width: 180,
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            transform: "skewX(-15deg)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 64,
          opacity: subOp,
          transform: `translateY(${subY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT.body,
            fontSize: 30,
            color: `${COLORS.white}88`,
            letterSpacing: "0.04em",
          }}
        >
          G1 Remote &middot; Manual V1.3 &middot; June 2025
        </span>
      </div>

      {/* Controller sections */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 48,
          right: 48,
        }}
      >
        <ControllerSection
          header={SECTION_1.header}
          icon={SECTION_1.icon}
          items={SECTION_1.items}
          startFrame={15}
          sectionIndex={0}
        />
        <ControllerSection
          header={SECTION_2.header}
          icon={SECTION_2.icon}
          items={SECTION_2.items}
          startFrame={35}
          sectionIndex={1}
        />
        <ControllerSection
          header={SECTION_3.header}
          icon={SECTION_3.icon}
          items={SECTION_3.items}
          startFrame={55}
          sectionIndex={2}
        />
      </div>

      {/* Partner lockup */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 40,
          right: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 48,
          opacity: interpolate(frame, [70, 85], [0, 1], clamp),
        }}
      >
        <Img src={staticFile("purdue-logo.svg")} style={{ height: 44, opacity: 0.7 }} />
        <Img src={staticFile("unitree-logo.svg")} style={{ height: 38, opacity: 0.7 }} />
        <Img src={staticFile("futurology-logo-inverted.png")} style={{ height: 40, opacity: 0.7 }} />
      </div>

      {/* Overlays */}
      <Scanlines />
      <Grain />
    </AbsoluteFill>
  );
};
