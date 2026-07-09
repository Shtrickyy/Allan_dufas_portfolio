import Image from "next/image";

import {
  aspectClass,
  narrativeCaption,
  narrativePlaceholderLabel,
} from "@/components/home/narrative-layout";
import { publicImageExists } from "@/lib/public-image";
import { cn } from "@/lib/utils";
import type { NarrativeImage } from "@/types/home-narrative";

type EditorialImageProps = {
  image: NarrativeImage;
  className?: string;
  sizes?: string;
};

export function EditorialImage({
  image,
  className,
  sizes = "(max-width: 768px) 100vw, 560px",
}: EditorialImageProps) {
  const hasImage =
    image.src && image.width && image.height && publicImageExists(image.src);

  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-md border border-border",
          aspectClass[image.aspect],
          hasImage ? "bg-surface" : "bg-surface/80",
        )}
      >
        {hasImage ? (
          <Image
            src={image.src!}
            alt={image.alt}
            width={image.width!}
            height={image.height!}
            className="h-full w-full object-cover object-top"
            sizes={sizes}
          />
        ) : (
          <div className="flex h-full flex-col justify-end p-4 md:p-5">
            <p className={narrativePlaceholderLabel}>Photo reserved</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              {image.alt}
            </p>
          </div>
        )}
      </div>
      <figcaption className={narrativeCaption}>{image.caption}</figcaption>
    </figure>
  );
}
