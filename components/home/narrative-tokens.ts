/**
 * Homepage-scoped identity tokens — material palette from Identity System.
 * Not wired into globals.css; narrative components only.
 */

export const narrativePalette = {
  stone: "#c8bfb0",
  stoneLight: "#e8e2d8",
  olive: "#6b7355",
  oliveMuted: "#8a9478",
  terracotta: "#b5694a",
  terracottaMuted: "#c4896e",
  brass: "#9a8668",
  cream: "#f7f4ee",
  linen: "#ebe5d9",
  paper: "#f2efe8",
  walnut: "#5c4f42",
} as const;

export const chapterMarkers = ["I", "II", "III", "IV", "V", "VI"] as const;

export const chapterToneClasses = {
  default: "bg-background",
  warm: "bg-[#ebe5d9]",
  open: "bg-[#f7f4ee]",
  stone: "bg-[#e8e2d8]",
  paper: "bg-[#f2efe8]",
} as const;

export const placeholderGradient =
  "bg-gradient-to-br from-[#e8e2d8] via-[#f2efe8] to-[#ebe5d9]";
