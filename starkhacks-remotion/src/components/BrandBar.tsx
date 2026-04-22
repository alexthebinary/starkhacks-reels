import { Img, interpolate, useCurrentFrame, staticFile, spring, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../styles";

type BrandBarProps = {
  startFrame?: number;
  showCTA?: boolean;
  size?: "medium" | "large";
};

export const BrandBar: React.FC<BrandBarProps> = ({
  startFrame = 60,
  showCTA = false,
  size = "large",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({ frame: frame - startFrame, fps, config: { damping: 14 } });
  const ctaEntry = spring({ frame: frame - startFrame - 12, fps, config: { damping: 16 } });

  const logoH = size === "large" ? 50 : 38;
  const gap = size === "large" ? 44 : 32;
  const divH = size === "large" ? 44 : 32;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        opacity: entry,
        transform: `scale(${0.85 + entry * 0.15})`,
      }}
    >
      {/* CTA */}
      {showCTA && (
        <div
          style={{
            opacity: ctaEntry,
            transform: `translateY(${(1 - ctaEntry) * 15}px)`,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})`,
              borderRadius: 50,
              padding: size === "large" ? "18px 56px" : "14px 40px",
              boxShadow: `0 0 20px ${COLORS.gold}40, 0 6px 24px rgba(0,0,0,0.3)`,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: size === "large" ? 26 : 20,
                color: COLORS.black,
                letterSpacing: "0.12em",
              }}
            >
              NOW IN STOCK AT FUTUROLOGY.TECH
            </span>
          </div>
        </div>
      )}

      {/* Partner label */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: size === "large" ? 14 : 11,
          color: `${COLORS.warmGray}`,
          letterSpacing: "0.45em",
          fontWeight: 600,
        }}
      >
        IN PARTNERSHIP WITH
      </div>

      {/* Logos row */}
      <div style={{ display: "flex", alignItems: "center", gap }}>
        <Img
          src={staticFile("brand/purdue-logo-white.svg")}
          style={{ height: logoH }}
        />
        <div style={{ width: 1, height: divH, background: `${COLORS.warmGray}50` }} />
        <Img
          src={staticFile("brand/unitree-logo-white.svg")}
          style={{ height: logoH * 0.75 }}
        />
        <div style={{ width: 1, height: divH, background: `${COLORS.warmGray}50` }} />
        <Img
          src={staticFile("brand/futurology-logo-inverted.png")}
          style={{ height: logoH * 0.85 }}
        />
      </div>
    </div>
  );
};
