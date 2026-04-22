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

/* ─── helpers ──────────────────────────────────────────── */

const fadeSlide = (
  frame: number,
  startFrame: number,
  endFrame: number,
  slideDistance = 60,
) => ({
  opacity: interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }),
  translateY: interpolate(frame, [startFrame, endFrame], [slideDistance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }),
});

/* ─── inline SVG icons (light theme, black stroke) ───── */

const IconCalendar: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="16" y1="2" x2="16" y2="6" />
  </svg>
);

const IconMapPin: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z" />
    <circle cx="12" cy="11" r="2" />
  </svg>
);

const IconUsers: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <circle cx="17" cy="7" r="3" />
    <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
  </svg>
);

const IconClock: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 15" />
  </svg>
);

/* ─── CardThree ────────────────────────────────────────── */

export const CardThree: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* Robot float — continuous sin wave, 5.5s period */
  const robotCycle = (frame / fps) * ((2 * Math.PI) / 5.5);
  const robotY = -8 * Math.sin(robotCycle);
  const robotScale = 1.05 + 0.03 * Math.sin(robotCycle);

  /* Shine sweep — cycling 150-frame period */
  const shineX = interpolate(frame % 150, [0, 150], [-400, 1500]);

  /* Logo + STARKHACKS 2026 */
  const logo = fadeSlide(frame, 3, 18);

  /* Headline lines staggered */
  const h1 = fadeSlide(frame, 8, 28);   // "1,000+"
  const h2 = fadeSlide(frame, 12, 32);  // "builders."
  const h3 = fadeSlide(frame, 16, 36);  // "36 hours."
  const h4 = fadeSlide(frame, 20, 42);  // "One world record."

  /* Gradient shimmer offset for "One world record." */
  const shimmerOffset = interpolate(frame, [20, 90], [-200, 600], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  /* Event facts — stagger 3 frames apart starting at 25 */
  const facts = [0, 3, 6, 9].map((d) => fadeSlide(frame, 25 + d, 45 + d));

  /* Prize badge */
  const prize = fadeSlide(frame, 40, 55);

  /* Partner lockup */
  const partners = fadeSlide(frame, 45, 60);

  /* Prize glow pulse */
  const glowIntensity = frame >= 40
    ? 0.4 + 0.3 * Math.sin((frame - 40) * 0.12)
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      {/* ── Shine sweep overlay ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: shineX,
          width: 300,
          height: 1920,
          background:
            "linear-gradient(90deg, transparent, rgba(245,158,11,0.06), transparent)",
          transform: "skewX(-15deg)",
          pointerEvents: "none",
        }}
      />

      {/* ── Robot image ── */}
      <div
        style={{
          position: "absolute",
          top: 180,
          right: -60,
          width: 560,
          transform: `translateY(${robotY}px) scale(${robotScale})`,
          transformOrigin: "center center",
          opacity: interpolate(frame, [0, 8], [0, 0.18], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      >
        <Img
          src={staticFile("unitree-product-2.png")}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* ── Top: Logo + STARKHACKS 2026 ── */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: logo.opacity,
          transform: `translateY(${logo.translateY}px)`,
        }}
      >
        <Img
          src={staticFile("starkhacks-logo.svg")}
          style={{ width: 80, height: 80 }}
        />
        <div
          style={{
            fontFamily: FONT.display,
            fontSize: 56,
            color: COLORS.charcoal,
            letterSpacing: "0.06em",
            lineHeight: 1,
          }}
        >
          STARKHACKS 2026
        </div>
      </div>

      {/* ── Headline block ── */}
      <div style={{ position: "absolute", top: 300, left: 60, right: 60 }}>
        {/* "1,000+" */}
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 144,
            fontWeight: 900,
            color: COLORS.charcoal,
            lineHeight: 1.0,
            opacity: h1.opacity,
            transform: `translateY(${h1.translateY}px)`,
          }}
        >
          1,000+
        </div>
        {/* "builders." */}
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 112,
            fontWeight: 800,
            color: COLORS.charcoal,
            lineHeight: 1.15,
            opacity: h2.opacity,
            transform: `translateY(${h2.translateY}px)`,
          }}
        >
          builders.
        </div>
        {/* "36 hours." */}
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 112,
            fontWeight: 800,
            color: COLORS.charcoal,
            lineHeight: 1.15,
            opacity: h3.opacity,
            transform: `translateY(${h3.translateY}px)`,
          }}
        >
          36 hours.
        </div>
        {/* "One world record." — gradient shimmer */}
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 100,
            fontWeight: 900,
            lineHeight: 1.2,
            opacity: h4.opacity,
            transform: `translateY(${h4.translateY}px)`,
            background: `linear-gradient(90deg, #1a1a1a ${shimmerOffset - 100}px, #8E6F2E ${shimmerOffset}px, #F59E0B ${shimmerOffset + 80}px, #CEB888 ${shimmerOffset + 160}px, #1a1a1a ${shimmerOffset + 260}px)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          One world record.
        </div>
      </div>

      {/* ── Event facts ── */}
      <div style={{ position: "absolute", top: 1020, left: 60, right: 60 }}>
        {[
          { icon: <IconCalendar />, text: "April 17–19, 2026" },
          { icon: <IconMapPin />, text: "Purdue Armory · West Lafayette" },
          { icon: <IconUsers />, text: "1,000+ engineers & builders" },
          { icon: <IconClock />, text: "36 hour hardware sprint" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 36,
              opacity: facts[i].opacity,
              transform: `translateY(${facts[i].translateY}px)`,
            }}
          >
            {item.icon}
            <span
              style={{
                fontFamily: FONT.body,
                fontSize: 44,
                fontWeight: 500,
                color: "#333333",
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* ── Prize badge ── */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          left: 60,
          right: 60,
          opacity: prize.opacity,
          transform: `translateY(${prize.translateY}px)`,
        }}
      >
        <div
          style={{
            border: `3px solid ${COLORS.gold}`,
            borderRadius: 24,
            padding: "28px 40px",
            textAlign: "center",
            fontFamily: FONT.body,
            fontSize: 38,
            fontWeight: 700,
            color: COLORS.charcoal,
            letterSpacing: "0.04em",
            lineHeight: 1.5,
            boxShadow: `0 0 ${30 + glowIntensity * 40}px rgba(245,158,11,${glowIntensity}), inset 0 0 20px rgba(245,158,11,${glowIntensity * 0.15})`,
          }}
        >
          $100,000 IN TOTAL PRIZES
          <br />
          <span style={{ fontSize: 30, fontWeight: 500, color: "#666666" }}>
            PRESENTED ON A G1 EDU+
          </span>
        </div>
      </div>

      {/* ── Partner lockup (light theme) ── */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 48,
          opacity: partners.opacity,
          transform: `translateY(${partners.translateY}px)`,
        }}
      >
        <Img
          src={staticFile("futurology-logo.png")}
          style={{ height: 52, width: "auto", opacity: 0.7 }}
        />
        <Img
          src={staticFile("purdue-logo.svg")}
          style={{ height: 52, width: "auto", opacity: 0.7 }}
        />
        <Img
          src={staticFile("unitree-logo.svg")}
          style={{ height: 52, width: "auto", opacity: 0.7 }}
        />
      </div>
    </AbsoluteFill>
  );
};
