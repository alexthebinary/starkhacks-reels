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
/*  Icon shapes                                                        */
/* ------------------------------------------------------------------ */
const IconBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: 112,
      height: 112,
      borderRadius: 20,
      background: `${COLORS.gold}22`,
      border: `2px solid ${COLORS.gold}44`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

const LLMIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <rect x="10" y="10" width="36" height="36" rx="6" fill="none" stroke={COLORS.amber} strokeWidth="3" />
    <line x1="18" y1="22" x2="38" y2="22" stroke={COLORS.amber} strokeWidth="2" opacity="0.8" />
    <line x1="18" y1="28" x2="34" y2="28" stroke={COLORS.amber} strokeWidth="2" opacity="0.6" />
    <line x1="18" y1="34" x2="30" y2="34" stroke={COLORS.amber} strokeWidth="2" opacity="0.4" />
  </svg>
);

const ToolIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <path d="M16 40 L28 16 L40 40 Z" fill="none" stroke={COLORS.amber} strokeWidth="3" />
    <circle cx="28" cy="32" r="5" fill={COLORS.amber} opacity="0.6" />
  </svg>
);

const VisionIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <ellipse cx="28" cy="28" rx="20" ry="14" fill="none" stroke={COLORS.amber} strokeWidth="3" />
    <circle cx="28" cy="28" r="7" fill={COLORS.amber} opacity="0.6" />
  </svg>
);

const NavIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <polygon points="28,8 44,44 28,36 12,44" fill={COLORS.amber} opacity="0.5" />
    <polygon points="28,8 44,44 28,36 12,44" fill="none" stroke={COLORS.amber} strokeWidth="3" />
  </svg>
);

const VoiceIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <rect x="22" y="12" width="12" height="22" rx="6" fill="none" stroke={COLORS.amber} strokeWidth="3" />
    <path d="M14 30 Q14 44 28 44 Q42 44 42 30" fill="none" stroke={COLORS.amber} strokeWidth="3" />
    <line x1="28" y1="44" x2="28" y2="50" stroke={COLORS.amber} strokeWidth="3" />
  </svg>
);

const SDKIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <path d="M16 20 L8 28 L16 36" fill="none" stroke={COLORS.amber} strokeWidth="3" />
    <path d="M40 20 L48 28 L40 36" fill="none" stroke={COLORS.amber} strokeWidth="3" />
    <line x1="24" y1="40" x2="32" y2="16" stroke={COLORS.amber} strokeWidth="3" opacity="0.7" />
  </svg>
);

const ICONS = [LLMIcon, ToolIcon, VisionIcon, NavIcon, VoiceIcon, SDKIcon];

/* ------------------------------------------------------------------ */
/*  Spec data                                                          */
/* ------------------------------------------------------------------ */
const SPECS = [
  { label: "LLM", value: "Gemma 4 e2b (q4_K_M)", sub: "Ollama \u00B7 100% GPU \u00B7 Flash Attn \u00B7 4.4 tok/s" },
  { label: "TOOL USE", value: "Native Gemma 4 calls", sub: "~9s warm \u00B7 typed JSON schema" },
  { label: "VISION", value: "NanoTrack + ORB", sub: "OpenCV 4.13 \u00B7 30 fps tracking" },
  { label: "NAV", value: "Multi-waypoint autonomy", sub: "Visual + WiFi + IMU localization" },
  { label: "VOICE", value: "faster-whisper + Chatterbox", sub: "Arnold voice clone \u00B7 ZMQ stream" },
  { label: "SDK", value: "unitree_sdk2py 1.0.1", sub: "CycloneDDS 0.10.2 \u00B7 ROS2 Humble" },
];

const TAGS = [
  "VLM scene loop",
  "360\u00B0 scan",
  "Door push",
  "Room map",
  "ORB SLAM",
  "WBC policy",
];

/* ------------------------------------------------------------------ */
/*  Main composition                                                   */
/* ------------------------------------------------------------------ */
export const CardSpecSoftware: React.FC = () => {
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

  // Subtitle
  const subOp = interpolate(frame, [15, 25], [0, 1], clamp);
  const subY = interpolate(frame, [15, 25], [30, 0], clamp);

  // Spec label
  const specLabelOp = interpolate(frame, [5, 15], [0, 1], clamp);

  // Tags row
  const tagsOp = interpolate(frame, [55, 70], [0, 1], clamp);
  const tagsY = interpolate(frame, [55, 70], [20, 0], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Dual radial glows */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 70% 50% at 15% 85%, rgba(99,102,241,0.15) 0%, transparent 70%), radial-gradient(ellipse 70% 50% at 85% 15%, ${COLORS.gold}20 0%, transparent 70%)`,
        }}
      />

      {/* Code grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.gold}0A 1px, transparent 1px), linear-gradient(90deg, ${COLORS.gold}0A 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,0,0,0.4) 0%, transparent 70%)",
          pointerEvents: "none",
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
          SPEC SHEET &middot; 02/05
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 64,
          right: 64,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])})`,
          opacity: titleSpring,
        }}
      >
        <span
          style={{
            fontFamily: FONT.display,
            fontSize: 100,
            color: COLORS.white,
            lineHeight: 1.05,
          }}
        >
          Software /{" "}
        </span>
        <span
          style={{
            fontFamily: FONT.display,
            fontSize: 100,
            color: COLORS.amber,
            lineHeight: 1.05,
          }}
        >
          + AI brain.
        </span>
      </div>

      {/* Spec rows */}
      <div
        style={{
          position: "absolute",
          top: 370,
          left: 48,
          right: 48,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {SPECS.map((spec, i) => {
          const delay = 20 + i * 4;
          const rowOp = interpolate(frame, [delay, delay + 10], [0, 1], clamp);
          const rowX = interpolate(frame, [delay, delay + 10], [-60, 0], clamp);
          const Icon = ICONS[i];
          return (
            <div
              key={spec.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "20px 28px",
                opacity: rowOp,
                transform: `translateX(${rowX}px)`,
                backdropFilter: "blur(8px)",
              }}
            >
              <IconBox>
                <Icon />
              </IconBox>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.amber,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {spec.label}
                </span>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 40,
                    fontWeight: 700,
                    color: COLORS.white,
                    lineHeight: 1.2,
                  }}
                >
                  {spec.value}
                </span>
                <span
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 32,
                    color: `${COLORS.white}77`,
                    lineHeight: 1.3,
                  }}
                >
                  {spec.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tags row */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 48,
          right: 48,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
          opacity: tagsOp,
          transform: `translateY(${tagsY}px)`,
        }}
      >
        {TAGS.map((tag) => (
          <div
            key={tag}
            style={{
              background: `${COLORS.gold}18`,
              border: `1px solid ${COLORS.gold}44`,
              borderRadius: 40,
              padding: "10px 24px",
            }}
          >
            <span
              style={{
                fontFamily: FONT.body,
                fontSize: 24,
                fontWeight: 600,
                color: COLORS.amber,
                letterSpacing: "0.04em",
              }}
            >
              {tag}
            </span>
          </div>
        ))}
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
          opacity: interpolate(frame, [50, 65], [0, 1], clamp),
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
