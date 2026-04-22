import { Img, useCurrentFrame, staticFile, useVideoConfig, spring } from "remotion";
import { COLORS } from "../styles";

export const PersistentHeader: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entry = spring({ frame: frame - 3, fps, config: { damping: 14, stiffness: 200 } });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "40px 50px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        opacity: entry,
        transform: `translateY(${(1 - entry) * -30}px)`,
      }}
    >
      <Img src={staticFile("brand/unitree-logo-white.svg")} style={{ height: 38, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }} />
      <div style={{ width: 2, height: 28, background: "rgba(255,255,255,0.4)" }} />
      <Img src={staticFile("brand/futurology-logo-inverted.png")} style={{ height: 36, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }} />
    </div>
  );
};
