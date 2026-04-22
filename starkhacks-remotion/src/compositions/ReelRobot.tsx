import {
  AbsoluteFill, Img, Audio, interpolate, useCurrentFrame, useVideoConfig,
  staticFile, Easing, random, spring,
} from "remotion";
import { COLORS, FONTS } from "../styles";
import { PersistentHeader } from "../components/PersistentHeader";
import { PersistentCTA } from "../components/PersistentCTA";

const PHOTOS = [
  { src: "event/g1-dance-1.jpeg", label: "DANCE" },
  { src: "event/g1-dance-2.jpeg", label: "GESTURE" },
  { src: "event/g1-kick.jpeg", label: "KICK" },
  { src: "event/g1-jump.jpeg", label: "JUMP" },
  { src: "event/g1-pose.jpeg", label: "POSE" },
  { src: "event/g1-run.jpeg", label: "RUN" },
];

export const ReelRobot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const photoFrames = 38;
  const transFrames = 8;
  const activeIndex = Math.min(PHOTOS.length - 1, Math.floor(frame / (photoFrames - transFrames)));
  const titleEntry = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 220 } });
  const subEntry = spring({ frame: frame - 15, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Audio src={staticFile("audio/upbeat2.mp3")} volume={0.7} />

      {/* Photos — BRIGHT */}
      {PHOTOS.map((photo, i) => {
        const start = i * (photoFrames - transFrames);
        const lf = frame - start;
        const opacity = interpolate(lf, [-transFrames, 0, photoFrames - transFrames * 2, photoFrames - transFrames], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
        if (opacity <= 0) return null;
        const progress = Math.max(0, lf) / photoFrames;
        const scale = 1.05 + 0.15 * progress;
        const tx = (random(`kbx-${i}`) - 0.5) * 40 * progress;
        const ty = (random(`kby-${i}`) - 0.5) * 30 * progress;
        return (
          <div key={photo.src} style={{ position: "absolute", inset: -30, opacity, transform: `scale(${scale}) translate(${tx}px, ${ty}px)` }}>
            <Img src={staticFile(photo.src)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.1) saturate(1.2) brightness(1.0)" }} />
          </div>
        );
      })}

      {/* Light bottom gradient for text readability only */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 700, background: "linear-gradient(transparent, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.7))" }} />

      {/* Photo label */}
      <div style={{ position: "absolute", top: 120, right: 55, opacity: 0.8 }}>
        <div style={{ fontFamily: FONTS.display, fontSize: 36, color: COLORS.white, letterSpacing: "0.3em", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{PHOTOS[activeIndex].label}</div>
      </div>

      {/* Title */}
      <div style={{ position: "absolute", bottom: 440, left: 55, right: 55, opacity: titleEntry, transform: `scale(${0.7 + titleEntry * 0.3})`, transformOrigin: "left bottom" }}>
        <div style={{ fontFamily: FONTS.body, fontSize: 32, color: COLORS.gold, letterSpacing: "0.4em", fontWeight: 600, marginBottom: 10, textShadow: `0 2px 10px rgba(0,0,0,0.4)` }}>UNITREE</div>
        <div style={{ fontFamily: FONTS.display, fontSize: 140, color: COLORS.white, lineHeight: 0.9, textShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 40px ${COLORS.gold}20` }}>G1 EDU+</div>
      </div>

      {/* Subtitle */}
      <div style={{ position: "absolute", bottom: 360, left: 55, opacity: subEntry, transform: `translateX(${(1 - subEntry) * -40}px)` }}>
        <div style={{ fontFamily: FONTS.serif, fontSize: 40, color: COLORS.white, fontStyle: "italic", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>29 DOF Humanoid — Live at Purdue</div>
      </div>

      {/* Counter dots */}
      <div style={{ position: "absolute", bottom: 310, left: 55, display: "flex", gap: 8 }}>
        {PHOTOS.map((_, i) => (
          <div key={i} style={{
            width: i === activeIndex ? 28 : 8, height: 8, borderRadius: 4,
            background: i === activeIndex ? COLORS.gold : "rgba(255,255,255,0.5)",
            boxShadow: i === activeIndex ? `0 0 10px ${COLORS.gold}60` : "none",
          }} />
        ))}
      </div>

      <PersistentHeader />
      <PersistentCTA />
    </AbsoluteFill>
  );
};
