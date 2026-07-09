import fs from "fs";
import path from "path";

const COVER_IMAGE_DIMENSIONS: Record<
  string,
  { width: number; height: number }
> = {
  "/images/systems/training-os/training-os-cover.jpg": {
    width: 921,
    height: 2048,
  },
  "/images/systems/handover-engine/handover-engine-cover.png": {
    width: 2750,
    height: 1632,
  },
};

export function publicImageExists(src: string): boolean {
  return fs.existsSync(
    path.join(process.cwd(), "public", src.replace(/^\//, "")),
  );
}

export function resolveCoverImage(src: string) {
  const dimensions = COVER_IMAGE_DIMENSIONS[src];
  const showCover = publicImageExists(src) && Boolean(dimensions);

  return {
    coverSrc: src,
    coverWidth: dimensions?.width ?? 0,
    coverHeight: dimensions?.height ?? 0,
    showCover,
  };
}
