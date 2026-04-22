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

const ComputeIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <path d="M28 8 L48 20 L48 36 L28 48 L8 36 L8 20 Z" fill="none" stroke={COLORS.amber} strokeWidth="3" />
    <circle cx="28" cy="28" r="8" fill={COLORS.amber} opacity="0.6" />
  </svg>
);

const StorageIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <rect x="12" y="16" width="32" height="8" rx="2" fill={COLORS.amber} opacity="0.7" />
    <rect x="12" y="28" width="32" height="8" rx="2" fill={COLORS.amber} opacity="0.5" />
    <rect x="12" y="40" width="32" height="8" rx="2" fill={COLORS.amber} opacity="0.3" />
  </svg>
);

const VisionIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <circle cx="28" cy="28" r="16" fill="none" stroke={COLORS.amber} strokeWidth="3" />
    <circle cx="28" cy="28" r="8" fill={COLORS.amber} opacity="0.6" />
    <circle cx="28" cy="28" r="3" fill={COLORS.amber} />
  </svg>
);

const IMUIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <polygon points="28,8 48,44 8,44" fill="none" stroke={COLORS.amber} strokeWidth="3" />
    <line x1="28" y1="20" x2="28" y2="36" stroke={COLORS.amber} strokeWidth="3" />
    <circle cx="28" cy="40" r="3" fill={COLORS.amber} />
  </svg>
);

const NetworkIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <path d="M12 40 Q28 8 44 40" fill="none" stroke={COLORS.amber} strokeWidth="3" />
    <path d="M18 40 Q28 18 38 40" fill="none" stroke={COLORS.amber} strokeWidth="3" opacity="0.7" />
    <path d="M24 40 Q28 28 32 40" fill="none" stroke={COLORS.amber} strokeWidth="3" opacity="0.4" />
    <circle cx="28" cy="42" r="4" fill={COLORS.amber} />
  </svg>
);

const ActuationIcon: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <circle cx="28" cy="28" r="18" fill="none" stroke={COLORS.amber} strokeWidth="3" />
    <circle cx="28" cy="28" r="6" fill={COLORS.amber} opacity="0.5" />
    <line x1="28" y1="10" x2="28" y2="16" stroke={COLORS.amber} strokeWidth="3" />
    <line x1="28" y1="40" x2="28" y2="46" stroke={COLORS.amber} strokeWidth="3" />
    <line x1="10" y1="28" x2="16" y2="28" stroke={COLORS.amber} strokeWidth="3" />
    <line x1="40" y1="28" x2="46" y2="28" stroke={COLORS.amber} strokeWidth="3" />
  </svg>
);

const ICONS = [ComputeIcon, StorageIcon, VisionIcon, IMUIcon, NetworkIcon, ActuationIcon];

/* ------------------------------------------------------------------ */
/*  Spec data                                                          */
/* ------------------------------------------------------------------ */
const SPECS = [
  { label: "COMPUTE", value: "NVIDIA Orin NX 16 GB", sub: "JetPack 6.2.1 \u00B7 CUDA 12.6 \u00B7 TRT 10.3" },
  { label: "STORAGE", value: "233 GB NVMe / 15 GB RAM", sub: "7.6 GB zram swap" },
  { label: "VISION", value: "RealSense D435i", sub: "RGB + depth \u00B7 head-mounted" },
  { label: "IMU", value: "Pelvis + torso", sub: "100 Hz DDS \u00B7 quat/gyro/accel" },
  { label: "NETWORK", value: "WiFi 6 \u00B7 RTL8852BU", sub: "RSSI fingerprinting \u00B7 28 APs" },
  { label: "ACTUATION", value: "29 DOF \u00B7 waist unlocked", sub: "Hip/knee/ankle torque feedback" },
];

/* ------------------------------------------------------------------ */
/*  Main composition                                                   */
/* ------------------------------------------------------------------ */
export const CardSpecHardware: React.FC = () => {
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

  // Hero image
  const heroOp = interpolate(frame, [0, 20], [0, 0.4], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Background radial gold glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 85% 15%, ${COLORS.gold}25 0%, transparent 70%)`,
        }}
      />

      {/* Faded robot hero image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: -60,
          width: 1080 * 0.7,
          height: 1920 * 0.5,
          opacity: heroOp,
          WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 80%), linear-gradient(270deg, rgba(0,0,0,0.8) 0%, transparent 60%)",
          WebkitMaskComposite: "intersect",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("unitree-g1-hero.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

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
          SPEC SHEET &middot; 01/05
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
            fontSize: 108,
            color: COLORS.white,
            lineHeight: 1.05,
          }}
        >
          Hardware /{" "}
        </span>
        <span
          style={{
            fontFamily: FONT.display,
            fontSize: 108,
            color: COLORS.amber,
            lineHeight: 1.05,
          }}
        >
          stack.
        </span>
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
            fontSize: 32,
            color: `${COLORS.white}99`,
            letterSpacing: "0.04em",
          }}
        >
          Unitree G1 EDU+ &middot; 29 DOF humanoid
        </span>
      </div>

      {/* Spec rows */}
      <div
        style={{
          position: "absolute",
          top: 380,
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
