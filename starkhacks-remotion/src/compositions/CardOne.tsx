import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  spring,
  Easing,
  random,
} from "remotion";
import { COLORS, FONTS } from "../styles";
import { FONT } from "../fonts";

/* ------------------------------------------------------------------ */
/*  Scanlines overlay                                                  */
/* ------------------------------------------------------------------ */
const Scanlines: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
      pointerEvents: "none",
    }}
  />
);

/* ------------------------------------------------------------------ */
/*  Film grain overlay                                                 */
/* ------------------------------------------------------------------ */
const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  // Offset the SVG noise per-frame for a flickering grain look
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
/*  Main composition                                                   */
/* ------------------------------------------------------------------ */
export const CardOne: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ---- helpers --------------------------------------------------- */
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const fadeIn = (start: number, dur: number) =>
    interpolate(frame, [start, start + dur], [0, 1], clamp);
  const slideUp = (start: number, dur: number, dist = 60) =>
    interpolate(frame, [start, start + dur], [dist, 0], {
      ...clamp,
      easing: Easing.out(Easing.exp),
    });

  /* ================================================================ */
  /*  ANIMATION VALUES                                                 */
  /* ================================================================ */

  // Card fade-in
  const cardOpacity = fadeIn(0, 15);

  // Conic border rotation: 360deg per 6s = 1deg/frame at 30fps
  const borderAngle = (frame / (6 * fps)) * 360;

  // Shine sweep: translateX from -140% to 140% over 5.5s cycle
  const shineCycle = 5.5 * fps; // 165 frames
  const shineProgress = (frame % shineCycle) / shineCycle;
  const shineX = interpolate(shineProgress, [0, 1], [-140, 140]);

  // Robot walk: sin wave, 9s cycle, +-40px (scaled 4x = +-160px)
  const walkCycle = 9 * fps;
  const walkPhase = (frame / walkCycle) * 2 * Math.PI;
  const robotX = Math.sin(walkPhase) * 160;
  // Flip direction: scaleX -1 when moving left (derivative negative)
  const robotFlip = Math.cos(walkPhase) >= 0 ? 1 : -1;
  // Step bob: 1.2s cycle, 5px * 4 = 20px amplitude
  const bobCycle = 1.2 * fps;
  const robotBob = Math.abs(Math.sin((frame / bobCycle) * 2 * Math.PI)) * 20;
  // Sway tilt: +-1.2deg, 1.2s cycle
  const robotSway = Math.sin((frame / bobCycle) * 2 * Math.PI) * 1.2;

  // Top badges
  const badgeOp = fadeIn(5, 15);
  const badgeY = slideUp(5, 15, 40);

  // "STARK" text
  const starkOp = fadeIn(15, 12);
  const starkY = slideUp(15, 20, 50);

  // "HACKS" shimmer text
  const hacksOp = fadeIn(20, 12);
  const hacksY = slideUp(20, 20, 50);
  // Shimmer on "HACKS": continuous sweep
  const shimmerCycle = 3 * fps;
  const shimmerX = interpolate(
    (frame % shimmerCycle) / shimmerCycle,
    [0, 1],
    [-300, 1200]
  );

  // Year "2026" + gold line
  const yearScale = spring({ frame: frame - 25, fps, config: { damping: 12, stiffness: 200 } });
  const lineW = interpolate(frame, [25, 40], [0, 600], { ...clamp, easing: Easing.out(Easing.cubic) });

  // Body text
  const bodyOp = fadeIn(30, 15);
  const bodyY = slideUp(30, 20, 40);

  // CTA button
  const ctaScale = spring({ frame: frame - 40, fps, config: { damping: 10, stiffness: 250 } });
  // Glow pulse on button (continuous after frame 40)
  const glowPulse = frame >= 40
    ? 0.4 + Math.sin((frame - 40) * 0.15) * 0.3
    : 0;

  // Partner lockup
  const partnerOp = fadeIn(45, 15);
  const partnerY = slideUp(45, 15, 30);

  /* ---- pulsing dot for "3 Days Left" badge ---------------------- */
  const dotPulse = 0.4 + Math.sin(frame * 0.25) * 0.6;

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, opacity: cardOpacity }}>
      {/* ---- Background radial gradient ---- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 50% at 50% 35%, ${COLORS.charcoal} 0%, ${COLORS.black} 70%)`,
        }}
      />

      {/* ---- Conic rotating gold border ---- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: 4,
          background: `conic-gradient(from ${borderAngle}deg, ${COLORS.gold}, ${COLORS.amber}, ${COLORS.gold}40, transparent, ${COLORS.gold})`,
          WebkitMaskImage:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* ---- Shine sweep ---- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${shineX}%`,
            width: 220,
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            transform: "skewX(-18deg)",
          }}
        />
      </div>

      {/* ---- Top badges ---- */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 40,
          right: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: badgeOp,
          transform: `translateY(${badgeY}px)`,
        }}
      >
        {/* Red "3 Days Left" badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(220,38,38,0.18)",
            border: "1px solid rgba(220,38,38,0.5)",
            borderRadius: 40,
            padding: "12px 28px",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#EF4444",
              boxShadow: `0 0 ${8 + dotPulse * 8}px #EF4444`,
              opacity: 0.5 + dotPulse * 0.5,
            }}
          />
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 26,
              fontWeight: 600,
              color: "#FCA5A5",
              letterSpacing: "0.05em",
            }}
          >
            3 Days Left
          </span>
        </div>

        {/* Amber date badge with logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: `${COLORS.gold}18`,
            border: `1px solid ${COLORS.gold}50`,
            borderRadius: 40,
            padding: "12px 28px",
          }}
        >
          <Img
            src={staticFile("starkhacks-logo.svg")}
            style={{ width: 30, height: 30 }}
          />
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 26,
              fontWeight: 600,
              color: COLORS.amber,
              letterSpacing: "0.05em",
            }}
          >
            Apr 17-19
          </span>
        </div>
      </div>

      {/* ---- "STARK" title ---- */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: starkOp,
          transform: `translateY(${starkY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT.display,
            fontSize: 200,
            color: COLORS.white,
            lineHeight: 0.9,
            textShadow: "0 4px 30px rgba(0,0,0,0.7)",
          }}
        >
          STARK
        </span>
      </div>

      {/* ---- "HACKS" shimmer title ---- */}
      <div
        style={{
          position: "absolute",
          top: 440,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: hacksOp,
          transform: `translateY(${hacksY}px)`,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: FONT.display,
            fontSize: 200,
            lineHeight: 0.9,
            background: `linear-gradient(135deg, ${COLORS.gold} 0%, #FFD700 30%, ${COLORS.amber} 55%, #E8A800 80%, ${COLORS.gold} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 4px 24px ${COLORS.gold}80)`,
          }}
        >
          HACKS
        </span>
        {/* Shimmer streak */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: shimmerX,
            width: 180,
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            transform: "skewX(-15deg)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ---- Gold line divider ---- */}
      <div
        style={{
          position: "absolute",
          top: 660,
          left: "50%",
          transform: "translateX(-50%)",
          width: lineW,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${COLORS.gold}, ${COLORS.amber}, ${COLORS.gold}, transparent)`,
          boxShadow: `0 0 16px ${COLORS.gold}40`,
        }}
      />

      {/* ---- Year "2026" ---- */}
      <div
        style={{
          position: "absolute",
          top: 680,
          left: 0,
          right: 0,
          textAlign: "center",
          transform: `scale(${yearScale})`,
          opacity: yearScale,
        }}
      >
        <span
          style={{
            fontFamily: FONT.body,
            fontSize: 52,
            color: COLORS.gold,
            letterSpacing: "0.5em",
            fontWeight: 300,
            textShadow: `0 2px 15px ${COLORS.gold}60`,
          }}
        >
          2026
        </span>
      </div>

      {/* ---- Body text ---- */}
      <div
        style={{
          position: "absolute",
          top: 780,
          left: 60,
          right: 60,
          opacity: bodyOp,
          transform: `translateY(${bodyY}px)`,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: FONT.body,
            fontSize: 34,
            color: COLORS.warmGray,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          500+ builders. 36 hours.{"\n"}Compete for{" "}
          <span
            style={{
              color: COLORS.gold,
              fontWeight: 700,
              textShadow: `0 0 20px ${COLORS.gold}60, 0 0 40px ${COLORS.gold}30`,
            }}
          >
            $100,000
          </span>{" "}
          in prizes at Purdue's flagship hackathon.
        </p>
      </div>

      {/* ---- CTA Button ---- */}
      <div
        style={{
          position: "absolute",
          top: 980,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          transform: `scale(${ctaScale})`,
          opacity: ctaScale,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber}, #E8A800)`,
            borderRadius: 60,
            padding: "24px 80px",
            boxShadow: `0 0 ${30 + glowPulse * 30}px ${COLORS.gold}${Math.round(40 + glowPulse * 50).toString(16)}, 0 4px 20px rgba(0,0,0,0.4)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT.display,
              fontSize: 40,
              color: COLORS.black,
              letterSpacing: "0.08em",
            }}
          >
            Register Now
          </span>
        </div>
      </div>

      {/* ---- Robot walk ---- */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: "50%",
          transform: `translateX(calc(-50% + ${robotX}px))`,
        }}
      >
        {/* Ground shadow */}
        <div
          style={{
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 200,
            height: 20,
            borderRadius: "50%",
            background: `radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)`,
          }}
        />
        {/* Robot image */}
        <Img
          src={staticFile("unitree-product-2.png")}
          style={{
            width: 260,
            height: 260,
            objectFit: "contain",
            transform: `scaleX(${robotFlip}) translateY(${-robotBob}px) rotate(${robotSway}deg)`,
          }}
        />
      </div>

      {/* ---- Partner lockup ---- */}
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
          opacity: partnerOp,
          transform: `translateY(${partnerY}px)`,
        }}
      >
        <Img
          src={staticFile("purdue-logo.svg")}
          style={{ height: 44, opacity: 0.7 }}
        />
        <Img
          src={staticFile("unitree-logo.svg")}
          style={{ height: 38, opacity: 0.7 }}
        />
        <Img
          src={staticFile("futurology-logo-inverted.png")}
          style={{ height: 40, opacity: 0.7 }}
        />
      </div>

      {/* ---- Overlays ---- */}
      <Scanlines />
      <Grain />
    </AbsoluteFill>
  );
};
