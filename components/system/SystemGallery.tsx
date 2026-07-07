import { MediaPlaceholder } from "@/components/system/MediaPlaceholder";
import type { GalleryImage } from "@/types/system";

type SystemGalleryProps = {
  title: string;
  items: GalleryImage[];
};

export function SystemGallery({ title, items }: SystemGalleryProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="system-gallery-heading" className="space-y-6">
      <h2
        id="system-gallery-heading"
        className="text-2xl font-medium leading-snug tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]"
      >
        Proof
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((item, index) => {
          const caption =
            item.caption.startsWith("TODO:") || item.caption.length === 0
              ? null
              : item.caption;

          return (
            <figure key={item.src} className="space-y-3">
              <MediaPlaceholder title={`${title} — screenshot ${index + 1}`} />
              {caption ? (
                <figcaption className="text-sm leading-relaxed text-ink-secondary">
                  {caption}
                </figcaption>
              ) : (
                <figcaption className="font-mono text-xs font-medium tracking-widest text-ink-secondary uppercase">
                  Visual forthcoming
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
