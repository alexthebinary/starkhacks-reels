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
/*  Dance data                                                         */
/* ------------------------------------------------------------------ */
const SECTION_1 = {
  header: "Unitree Dancing SDK \u00B7 8",
  items: ["Tai Chi", "Love You", "Robot Dance", "Victory Dance", "APT", "Qinghai Shake", "Bunny Dance", "Ace of Spades"],
};

const SECTION_2 = {
  header: "Unitree Training Mode \u00B7 3",
  items: ["Waist Drum Dance \u00B7 9.5s", "Spin Discs \u00B7 6.9s", "Throw Money \u00B7 8.1s"],
};

const SECTION_3 = {
  header: "NVIDIA GEAR-SONIC \u00B7 8",
  items: ["Party dance", "Macarena", "360 walk-spin", "Standing kick", "Forward lunge", "Deep squat", "Tired lunge", "One-leg jump"],
};

/* ------------------------------------------------------------------ */
/*  Twinkle dot                                                        */
/* ------------------------------------------------------------------ */
const Twinkle: React.FC<{ x: number; y: number; phase: number }> = ({ x, y, phase }) => {
  const frame = useCurrentFrame();
  const pulse = 0.2 + Math.sin(frame * 0.18 + phase) * 0.8;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: COLORS.white,
        opacity: Math.max(0, pulse) * 0.6,
        boxShadow: `0 0 ${6 + pulse * 8}px ${COLORS.white}`,
        pointerEvents: "none",
      }}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Section component                                                  */
/* ------------------------------------------------------------------ */
const DanceSection: React.FC<{
  header: string;
  items: string[];
  startFrame: number;
}> = ({ header, items, startFrame }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const sectionOp = interpolate(frame, [startFrame, startFrame + 12], [0, 1], clamp);
  const sectionY = interpolate(frame, [startFrame, startFrame + 12], [30, 0], clamp);

  // Split items into 2 columns
  const half = Math.ceil(items.length / 2);
  const col1 = items.slice(0, half);
  const col2 = items.slice(half);

  return (
    <div
      style={{
        opacity: sectionOp,
        transform: `translateY(${sectionY}px)`,
        marginBottom: 24,
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
        <span style={{ fontSize: 32, lineHeight: 1 }}>{"\u266A"}</span>
        <span
          style={{
            fontFamily: FONT.body,
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.amber,
            letterSpacing: "0.06em",
          }}
        >
          {header}
        </span>
      </div>

      {/* 2-col grid of pills */}
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {col1.map((item, i) => {
            const delay = startFrame + 5 + i * 2;
            const pillOp = interpolate(frame, [delay, delay + 6], [0, 1], clamp);
            return (
              <div
                key={item}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 14,
                  padding: "14px 20px",
                  opacity: pillOp,
                  backdropFilter: "blur(6px)",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 28,
                    fontWeight: 600,
                    color: COLORS.white,
                    lineHeight: 1.2,
                  }}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {col2.map((item, i) => {
            const delay = startFrame + 5 + (i + half) * 2;
            const pillOp = interpolate(frame, [delay, delay + 6], [0, 1], clamp);
            return (
              <div
                key={item}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 14,
                  padding: "14px 20px",
                  opacity: pillOp,
                  backdropFilter: "blur(6px)",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 28,
                    fontWeight: 600,
                    color: COLORS.white,
                    lineHeight: 1.2,
                  }}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main composition                                                   */
/* ------------------------------------------------------------------ */
export const CardSpecDances: React.FC = () => {
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

  // Shimmer on title
  const shimmerCycle = 3 * fps;
  const shimmerX = interpolate(
    (frame % shimmerCycle) / shimmerCycle,
    [0, 1],
    [-300, 1200]
  );

  // Spec label
  const specLabelOp = interpolate(frame, [5, 15], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Dual radial glows - pink + gold */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 15% 15%, rgba(236,72,153,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 85% 85%, ${COLORS.gold}18 0%, transparent 70%)`,
        }}
      />

      {/* Twinkle dots */}
      <Twinkle x={120} y={340} phase={0} />
      <Twinkle x={900} y={520} phase={1.5} />
      <Twinkle x={200} y={1200} phase={3.0} />
      <Twinkle x={850} y={1500} phase={4.5} />
      <Twinkle x={540} y={800} phase={2.2} />

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
          SPEC SHEET &middot; 04/05
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
          Dance /{" "}
        </span>
        <span
          style={{
            fontFamily: FONT.display,
            fontSize: 108,
            lineHeight: 1.05,
            background: `linear-gradient(135deg, ${COLORS.gold} 0%, #FFD700 30%, ${COLORS.amber} 55%, #E8A800 80%, ${COLORS.gold} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 20px ${COLORS.gold}60)`,
          }}
        >
          library &middot; 19
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

      {/* Dance sections */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 48,
          right: 48,
        }}
      >
        <DanceSection header={SECTION_1.header} items={SECTION_1.items} startFrame={15} />
        <DanceSection header={SECTION_2.header} items={SECTION_2.items} startFrame={35} />
        <DanceSection header={SECTION_3.header} items={SECTION_3.items} startFrame={55} />
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
