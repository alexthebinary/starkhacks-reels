import {
  AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig,
  staticFile, spring,
} from "remotion";
import { COLORS, FONTS } from "../styles";
import { FONT } from "../fonts";

/* ── helpers ── */
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

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
          position: "absolute", top: 0, left: x, width: 220, height: "100%",
          background: "linear-gradient(105deg, transparent, rgba(0,0,0,0.03), transparent)",
          transform: "skewX(-15deg)",
        }}
      />
    </div>
  );
};

/* ── Partner lockup (light) ── */
const PartnerLockupLight: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: "absolute", bottom: 60, left: 0, right: 0,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
      opacity,
    }}
  >
    <div
      style={{
        fontFamily: FONT.body, fontSize: 16, color: "rgba(0,0,0,0.4)",
        letterSpacing: "0.35em", fontWeight: 600, textTransform: "uppercase",
      }}
    >
      In partnership with
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
      <Img src={staticFile("purdue-logo.svg")} style={{ height: 44, opacity: 0.7 }} />
      <div style={{ width: 2, height: 36, background: "rgba(0,0,0,0.15)" }} />
      <Img src={staticFile("unitree-logo.svg")} style={{ height: 40, opacity: 0.7 }} />
      <div style={{ width: 2, height: 36, background: "rgba(0,0,0,0.15)" }} />
      <Img src={staticFile("futurology-logo.png")} style={{ height: 40, opacity: 0.75 }} />
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════
   CardFive – "Beyond the demo" vision card (light/white theme)
   ════════════════════════════════════════════════════════════════ */
export const CardFive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Robot float animation ── */
  const floatCycle = 165;
  const floatT = (frame % floatCycle) / floatCycle;
  const floatY = Math.sin(floatT * Math.PI * 2) * -32;
  const floatScale = 1 + Math.sin(floatT * Math.PI * 2) * 0.015;

  /* ── Gradient shimmer on "the future." (4s cycle) ── */
  const shimmerCycle = 4 * fps;
  const shimmerT = (frame % shimmerCycle) / shimmerCycle;
  const bgPos = interpolate(shimmerT, [0, 1], [0, 200]);

  /* ── Staggered text entrances ── */
  const textLine = (delay: number) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 180 } });
    return { opacity: s, y: (1 - s) * 50 };
  };
  const l1 = textLine(6);
  const l2 = textLine(14);
  const l3 = textLine(22);
  const l4 = textLine(30);
  const bodyEntry = textLine(40);
  const footerEntry = textLine(55);
  const partnerEntry = textLine(65);

  const headerEntry = interpolate(frame, [0, 15], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      {/* Robot image — right side, floating */}
      <div
        style={{
          position: "absolute", top: 180, right: -100,
          transform: `translateY(${floatY}px) scale(${floatScale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("unitree-product-2.png")}
          style={{ width: 620, height: "auto", opacity: 0.22 }}
        />
      </div>

      {/* White gradient overlay to soften robot edges */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0.6) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, rgba(255,255,255,0.95) 100%)",
        }}
      />

      <ShineSweep />

      {/* ── Top bar: Futurology logo + subtitle ── */}
      <div
        style={{
          position: "absolute", top: 72, left: 64, right: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          opacity: headerEntry,
        }}
      >
        <Img src={staticFile("futurology-logo.png")} style={{ height: 48 }} />
        <div
          style={{
            fontFamily: FONT.serif, fontSize: 22, fontStyle: "italic",
            color: "rgba(0,0,0,0.5)",
          }}
        >
          In future we trust
        </div>
      </div>

      {/* ── Headline ── */}
      <div style={{ position: "absolute", top: 480, left: 72, right: 100 }}>
        {/* "Beyond" */}
        <div
          style={{
            fontFamily: FONT.serif, fontSize: 120, color: COLORS.black, lineHeight: 1.08,
            fontStyle: "italic", opacity: l1.opacity,
            transform: `translateY(${l1.y}px)`,
          }}
        >
          Beyond
        </div>
        {/* "the demo," */}
        <div
          style={{
            fontFamily: FONT.serif, fontSize: 120, lineHeight: 1.08,
            fontStyle: "italic", opacity: l2.opacity,
            transform: `translateY(${l2.y}px)`,
            color: "#8E6F2E",
          }}
        >
          the demo,
        </div>
        {/* "we build" */}
        <div
          style={{
            fontFamily: FONT.serif, fontSize: 120, color: COLORS.black, lineHeight: 1.08,
            fontStyle: "italic", opacity: l3.opacity,
            transform: `translateY(${l3.y}px)`,
          }}
        >
          we build
        </div>
        {/* "the future." — gradient shimmer */}
        <div
          style={{
            fontFamily: FONT.serif, fontSize: 120, lineHeight: 1.08,
            fontStyle: "italic", opacity: l4.opacity,
            transform: `translateY(${l4.y}px)`,
            background: `linear-gradient(90deg, #8E6F2E 0%, ${COLORS.amber} 25%, #8E6F2E 50%, ${COLORS.amber} 75%, #8E6F2E 100%)`,
            backgroundSize: "200% 100%",
            backgroundPosition: `${bgPos}% 0`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          the future.
        </div>
      </div>

      {/* ── Body text ── */}
      <div
        style={{
          position: "absolute", top: 1080, left: 72, right: 120,
          fontFamily: FONT.body, fontSize: 28, color: "rgba(0,0,0,0.45)",
          lineHeight: 1.65, opacity: bodyEntry.opacity,
          transform: `translateY(${bodyEntry.y}px)`,
        }}
      >
        1,000+ engineers, researchers, and builders shaping what comes next in robotics and AI — live at Purdue.
      </div>

      {/* ── Bottom: futurology.tech ── */}
      <div
        style={{
          position: "absolute", bottom: 200, left: 0, right: 0, textAlign: "center",
          opacity: footerEntry.opacity,
          transform: `translateY(${footerEntry.y}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT.body, fontSize: 24, color: "rgba(0,0,0,0.35)",
            letterSpacing: "0.25em", fontWeight: 500,
          }}
        >
          futurology.tech
        </div>
      </div>

      {/* ── Partner lockup ── */}
      <PartnerLockupLight opacity={partnerEntry.opacity} />
    </AbsoluteFill>
  );
};
