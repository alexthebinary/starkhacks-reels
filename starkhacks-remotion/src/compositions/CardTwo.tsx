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

/* ── helpers ─────────────────────────────────────────────────────── */

/** Neon flicker: replicate CSS keyframe pattern mapped to a 135-frame cycle */
const neonFlicker = (frame: number): number => {
  const CYCLE = 135; // 4.5s at 30fps
  const t = ((frame % CYCLE) + CYCLE) % CYCLE;
  const pct = t / CYCLE;
  if (pct >= 0.20 && pct < 0.22) return 0.35;
  if (pct >= 0.64 && pct < 0.65) return 0.35;
  return 1;
};

/** Gradient shimmer background-position (0% → 200% over 120 frames, looping) */
const shimmerPos = (frame: number): string => {
  const CYCLE = 120; // 4s at 30fps
  const pct = ((frame % CYCLE) / CYCLE) * 200;
  return `${pct}% 50%`;
};

/* ── composition ─────────────────────────────────────────────────── */

export const CardTwo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Ken Burns zoom ──
  const bgScale = interpolate(frame, [0, durationInFrames], [1.05, 1.18]);

  // ── Shine sweep (5.5s = 165 frames cycle, 1.2s = 36 frame delay) ──
  const shineCycle = 165;
  const shineDelay = 36;
  const shineFrame = ((frame - shineDelay) % shineCycle + shineCycle) % shineCycle;
  const shineX = interpolate(shineFrame, [0, shineCycle], [-400, 1600]);

  // ── Grand Prize badge (frames 5-20) ──
  const badgeOp = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badgeY = interpolate(frame, [5, 20], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Box glow pulse: continuous sine
  const glowIntensity = 0.5 + Math.sin(frame * 0.12) * 0.5;
  const glowSpread = 12 + glowIntensity * 16;

  // ── Heading lines stagger ──
  const lineAnim = (start: number, end: number) => ({
    opacity: interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    y: interpolate(frame, [start, end], [30, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  });

  const line1 = lineAnim(10, 30);  // "Don't just"
  const line2 = lineAnim(15, 35);  // "watch"
  const line3 = lineAnim(20, 45);  // "innovation"
  const line4 = lineAnim(25, 45);  // "happen."
  const line5 = lineAnim(30, 50);  // "Build it."

  // ── Body text ──
  const bodyOp = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyY = interpolate(frame, [40, 55], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Partner lockup ──
  const partnerOp = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const partnerY = interpolate(frame, [45, 60], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Neon flicker for "Build it." (starts at frame 30) ──
  const buildFlicker = frame >= 30 ? neonFlicker(frame - 30) : 1;

  // ── Shimmer for "innovation" (starts at frame 20) ──
  const innovationShimmer = frame >= 20 ? shimmerPos(frame - 20) : "0% 50%";

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* ── Background with Ken Burns ── */}
      <div
        style={{
          position: "absolute",
          inset: -60,
          transform: `scale(${bgScale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("starkhacks-hero.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* ── Dark gradient overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* ── Scanlines overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Grain overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      {/* ── Shine sweep ── */}
      {frame >= shineDelay && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: shineX,
            width: 220,
            height: "100%",
            background:
              "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 60%, transparent 100%)",
            transform: "skewX(-15deg)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── "Futurology" watermark text ── */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: FONT.body,
          fontSize: 520,
          fontWeight: 900,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: `2px ${COLORS.gold}30`,
          opacity: 0.15,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        Futurology
      </div>

      {/* ── Grand Prize badge ── */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          transform: `translateX(-50%) translateY(${badgeY}px)`,
          opacity: badgeOp,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Liquid glass badge container */}
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 24,
            padding: "24px 48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            boxShadow: `0 0 ${glowSpread}px ${COLORS.gold}${Math.round(glowIntensity * 40 + 20).toString(16).padStart(2, "0")}, inset 0 1px 0 rgba(255,255,255,0.1)`,
          }}
        >
          {/* Amber tag */}
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})`,
              borderRadius: 12,
              padding: "8px 28px",
              fontFamily: FONT.body,
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.black,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Grand Prize
          </div>
          {/* Prize amount */}
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 36,
              fontWeight: 500,
              color: COLORS.white,
              opacity: 0.9,
            }}
          >
            $100,000 total prizes
          </div>
        </div>
      </div>

      {/* ── Main heading ── */}
      <div
        style={{
          position: "absolute",
          top: 540,
          left: 80,
          right: 80,
        }}
      >
        {/* "Don't just" */}
        <div
          style={{
            opacity: line1.opacity,
            transform: `translateY(${line1.y}px)`,
            fontFamily: FONT.body,
            fontSize: 144,
            fontWeight: 500,
            color: COLORS.white,
            lineHeight: 1.05,
          }}
        >
          Don't just
        </div>

        {/* "watch" */}
        <div
          style={{
            opacity: line2.opacity,
            transform: `translateY(${line2.y}px)`,
            fontFamily: FONT.body,
            fontSize: 144,
            fontWeight: 500,
            color: COLORS.white,
            lineHeight: 1.05,
          }}
        >
          watch
        </div>

        {/* "innovation" — Instrument Serif italic with gradient shimmer */}
        <div
          style={{
            opacity: line3.opacity,
            transform: `translateY(${line3.y}px)`,
            fontFamily: FONT.serif,
            fontSize: 144,
            fontStyle: "italic",
            lineHeight: 1.05,
            background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.amber}, #FFD700, ${COLORS.gold}, ${COLORS.amber})`,
            backgroundSize: "200% 100%",
            backgroundPosition: innovationShimmer,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 20px ${COLORS.gold}40)`,
          }}
        >
          innovation
        </div>

        {/* "happen." */}
        <div
          style={{
            opacity: line4.opacity,
            transform: `translateY(${line4.y}px)`,
            fontFamily: FONT.body,
            fontSize: 144,
            fontWeight: 500,
            color: COLORS.white,
            lineHeight: 1.05,
          }}
        >
          happen.
        </div>

        {/* "Build it." — neon flicker */}
        <div
          style={{
            opacity: line5.opacity * buildFlicker,
            transform: `translateY(${line5.y}px)`,
            fontFamily: FONT.body,
            fontSize: 144,
            fontWeight: 500,
            color: COLORS.gold,
            lineHeight: 1.05,
            textShadow: `0 0 30px ${COLORS.gold}80, 0 0 60px ${COLORS.gold}40`,
          }}
        >
          Build it.
        </div>
      </div>

      {/* ── Body text ── */}
      <div
        style={{
          position: "absolute",
          bottom: 380,
          left: 80,
          right: 80,
          opacity: bodyOp,
          transform: `translateY(${bodyY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 44,
            fontWeight: 400,
            color: COLORS.white,
            opacity: 0.8,
            lineHeight: 1.5,
          }}
        >
          36 hours of building, learning, and creating at Purdue University.
          April 18-20, 2026.
        </div>
      </div>

      {/* ── Partner lockup ── */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 80,
          right: 80,
          opacity: partnerOp,
          transform: `translateY(${partnerY}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
        }}
      >
        <Img
          src={staticFile("purdue-logo.svg")}
          style={{ height: 64, opacity: 0.7, filter: "brightness(10)" }}
        />
        <Img
          src={staticFile("unitree-logo.svg")}
          style={{ height: 56, opacity: 0.7, filter: "brightness(10)" }}
        />
        <Img
          src={staticFile("futurology-logo-inverted.png")}
          style={{ height: 56, opacity: 0.7 }}
        />
      </div>
    </AbsoluteFill>
  );
};
