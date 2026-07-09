import fs from "fs";
import path from "path";

import Image from "next/image";

import { MediaPlaceholder } from "@/components/system/MediaPlaceholder";
import {
  caseStudyGalleryGrid,
  caseStudySectionTitle,
} from "@/components/system/case-study-layout";
import { SectionLabel } from "@/components/system/SectionLabel";
import type { GalleryImage } from "@/types/system";

type SystemGalleryProps = {
  title: string;
  items: GalleryImage[];
};

function publicImageExists(src: string): boolean {
  return fs.existsSync(
    path.join(process.cwd(), "public", src.replace(/^\//, "")),
  );
}

type GalleryImageFrameProps = {
  item: GalleryImage;
  title: string;
  index: number;
};

function GalleryImageFrame({ item, title, index }: GalleryImageFrameProps) {
  const hasImage = publicImageExists(item.src);

  return (
    <figure className="overflow-hidden rounded-md border border-border bg-surface">
      {hasImage ? (
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className="h-auto w-full bg-background"
          sizes="(max-width: 768px) 100vw, 576px"
        />
      ) : (
        <MediaPlaceholder
          title={`${title} — screenshot ${index + 1}`}
          className="rounded-none border-0 bg-background"
        />
      )}
      <figcaption className="border-t border-border px-4 py-3">
        {item.caption ? (
          <p className="text-sm leading-[1.6] text-ink-secondary">
            {item.caption}
          </p>
        ) : (
          <p className="font-mono text-xs font-medium tracking-[0.08em] text-ink-secondary uppercase">
            Visual forthcoming
          </p>
        )}
      </figcaption>
    </figure>
  );
}

export function SystemGallery({ title, items }: SystemGalleryProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="system-gallery-heading"
      className="space-y-8 md:space-y-10"
    >
      <div className="mx-auto max-w-[680px] space-y-3">
        <SectionLabel>Proof</SectionLabel>
        <h2 id="system-gallery-heading" className={caseStudySectionTitle}>
          Screenshots
        </h2>
      </div>

      <div className={caseStudyGalleryGrid}>
        {items.map((item, index) => (
          <GalleryImageFrame
            key={item.src}
            item={item}
            title={title}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
