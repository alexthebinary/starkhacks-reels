import { CSSProperties } from "react";

export const COLORS = {
  black: "#0a0a0a",
  charcoal: "#1a1a1a",
  gold: "#F59E0B",
  amber: "#FBBF24",
  white: "#FAFAFA",
  offWhite: "#F5F5F0",
  warmGray: "#9CA3AF",
};

// Import FONT from ./fonts.ts in compositions instead
export const FONTS = {
  display: "Anton, Impact, sans-serif",
  serif: "'Instrument Serif', Georgia, serif",
  body: "Inter, 'Helvetica Neue', Arial, sans-serif",
};

export const fullFrame: CSSProperties = {
  width: 1080,
  height: 1920,
  position: "relative",
  overflow: "hidden",
};

export const centered: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export const absoluteFill: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};
