import Image from "next/image";

import { MediaPlaceholder } from "@/components/system/MediaPlaceholder";
import { resolveCoverImage } from "@/lib/public-image";
import { cn } from "@/lib/utils";

type CoverImageProps = {
  src: string;
  alt: string;
  title: string;
  className?: string;
  priority?: boolean;
};

export function CoverImage({
  src,
  alt,
  title,
  className,
  priority = false,
}: CoverImageProps) {
  const { showCover, coverSrc, coverWidth, coverHeight } =
    resolveCoverImage(src);

  if (!showCover) {
    return <MediaPlaceholder title={title} className={className} />;
  }

  return (
    <Image
      src={coverSrc}
      alt={alt}
      width={coverWidth}
      height={coverHeight}
      priority={priority}
      className={cn(
        "aspect-[4/3] h-auto w-full bg-background object-cover",
        className,
      )}
      sizes="(max-width: 768px) 100vw, 680px"
    />
  );
}
