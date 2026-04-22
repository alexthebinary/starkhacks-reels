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
/*  Gesture data                                                       */
/* ------------------------------------------------------------------ */
const GESTURES = [
  "Release arm",
  "Two-hand kiss",
  "Left kiss",
  "Right kiss",
  "Hands up",
  "Clap",
  "High five",
  "Hug",
  "Heart",
  "Right heart",
  "Reject",
  "Right hand up",
  "X-ray",
  "Face wave",
  "High wave",
  "Shake hand",
  "Turn-back wave",
  "Box one-hand win",
  "Box two-hand win",
  "Box three-hand win",
  "Right hand on heart",
  "Both hands up R",
  "Forward push",
  "Training recordings",
];

/* ------------------------------------------------------------------ */
/*  Hand icon (simple amber shape)                                     */
/* ------------------------------------------------------------------ */
const HandIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28">
    <rect x="4" y="8" width="6" height="14" rx="3" fill={COLORS.amber} opacity="0.8" />
    <rect x="11" y="4" width="6" height="18" rx="3" fill={COLORS.amber} opacity="0.6" />
    <rect x="18" y="6" width="6" height="16" rx="3" fill={COLORS.amber} opacity="0.4" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Main composition                                                   */
/* ------------------------------------------------------------------ */
export const CardSpecGestures: React.FC = () => {
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

  // Shimmer on "gestures."
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
    <AbsoluteFill style={{ backgroundColor: COLORS.white }}>
      {/* Subtle gold radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 80% 85%, ${COLORS.gold}18 0%, transparent 70%)`,
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
            background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent)",
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
            color: COLORS.black,
            letterSpacing: "0.12em",
          }}
        >
          SPEC SHEET &middot; 03/05
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
            color: COLORS.black,
            lineHeight: 1.05,
          }}
        >
          24 arm /{" "}
        </span>
        <span
          style={{
            fontFamily: FONT.display,
            fontSize: 108,
            lineHeight: 1.05,
            background: `linear-gradient(135deg, ${COLORS.black} 0%, #5C3A1E 40%, ${COLORS.gold} 70%, #5C3A1E 90%, ${COLORS.black} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            position: "relative",
          }}
        >
          gestures.
        </span>
        {/* Shimmer streak on title */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: shimmerX,
            width: 180,
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.25), transparent)",
            transform: "skewX(-15deg)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 290,
          left: 64,
          opacity: subOp,
          transform: `translateY(${subY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT.body,
            fontSize: 30,
            color: `${COLORS.black}88`,
            letterSpacing: "0.04em",
          }}
        >
          Firmware 1.5.1 &middot; live via G1ArmActionClient
        </span>
      </div>

      {/* Grid of 24 gestures - 2 columns */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 48,
          right: 48,
          display: "flex",
          gap: 16,
        }}
      >
        {/* Column 1 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {GESTURES.slice(0, 12).map((name, i) => {
            const delay = 15 + i * 1.5;
            const itemOp = interpolate(frame, [delay, delay + 8], [0, 1], clamp);
            const itemY = interpolate(frame, [delay, delay + 8], [16, 0], clamp);
            return (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(0,0,0,0.035)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 14,
                  padding: "12px 16px",
                  opacity: itemOp,
                  transform: `translateY(${itemY}px)`,
                }}
              >
                <HandIcon />
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 22,
                    color: `${COLORS.black}55`,
                    fontWeight: 600,
                    width: 36,
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 28,
                    fontWeight: 600,
                    color: COLORS.black,
                    lineHeight: 1.2,
                  }}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Column 2 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {GESTURES.slice(12, 24).map((name, i) => {
            const idx = i + 12;
            const delay = 15 + idx * 1.5;
            const itemOp = interpolate(frame, [delay, delay + 8], [0, 1], clamp);
            const itemY = interpolate(frame, [delay, delay + 8], [16, 0], clamp);
            return (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(0,0,0,0.035)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 14,
                  padding: "12px 16px",
                  opacity: itemOp,
                  transform: `translateY(${itemY}px)`,
                }}
              >
                <HandIcon />
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 22,
                    color: `${COLORS.black}55`,
                    fontWeight: 600,
                    width: 36,
                    flexShrink: 0,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 28,
                    fontWeight: 600,
                    color: COLORS.black,
                    lineHeight: 1.2,
                  }}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom badge */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [55, 70], [0, 1], clamp),
        }}
      >
        <div
          style={{
            background: COLORS.black,
            borderRadius: 40,
            padding: "14px 36px",
          }}
        >
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 28,
              fontWeight: 600,
              color: COLORS.white,
              letterSpacing: "0.02em",
            }}
          >
            + 19 Training Mode recordings
          </span>
        </div>
      </div>

      {/* Partner lockup (light theme) */}
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
          opacity: interpolate(frame, [60, 75], [0, 1], clamp),
        }}
      >
        <Img src={staticFile("purdue-logo.svg")} style={{ height: 44, opacity: 0.5, filter: "invert(1)" }} />
        <Img src={staticFile("unitree-logo.svg")} style={{ height: 38, opacity: 0.5, filter: "invert(1)" }} />
        <Img src={staticFile("futurology-logo-inverted.png")} style={{ height: 40, opacity: 0.5, filter: "invert(1)" }} />
      </div>
    </AbsoluteFill>
  );
};
