import Image from "next/image";

import {
  aspectClass,
  narrativeCaption,
  narrativePlaceholderLabel,
} from "@/components/home/narrative-layout";
import { placeholderGradient } from "@/components/home/narrative-tokens";
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
          "overflow-hidden",
          aspectClass[image.aspect],
          hasImage
            ? "rounded-sm border border-[#c8bfb0]/50 bg-surface shadow-[inset_0_0_0_1px_rgba(154,134,104,0.08)]"
            : cn(
                placeholderGradient,
                "rounded-sm border border-[#c8bfb0]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]",
              ),
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
          <div className="flex h-full flex-col justify-between p-5 md:p-6">
            <p className={narrativePlaceholderLabel}>Reserved</p>
            <div className="space-y-2">
              <p className="font-serif text-sm leading-relaxed text-[#5c4f42]/85 md:text-[0.9375rem]">
                {image.alt}
              </p>
            </div>
          </div>
        )}
      </div>
      {image.caption ? (
        <figcaption className={narrativeCaption}>{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}
