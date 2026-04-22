import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { COLORS, FONTS } from "../styles";

export const PersistentCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({ frame: frame - 8, fps, config: { damping: 12, stiffness: 180 } });
  const glowPulse = 10 + Math.sin(frame * 0.1) * 8;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "20px 50px 50px",
        display: "flex",
        justifyContent: "center",
        background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
        opacity: entry,
        transform: `translateY(${(1 - entry) * 40}px)`,
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})`,
          borderRadius: 60,
          padding: "20px 48px",
          boxShadow: `0 0 ${glowPulse}px ${COLORS.gold}50, 0 4px 20px rgba(0,0,0,0.4)`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 28,
            color: COLORS.black,
            letterSpacing: "0.08em",
          }}
        >
          NOW IN STOCK AT FUTUROLOGY.TECH
        </span>
      </div>
    </div>
  );
};
