import { EditorialImage } from "@/components/home/EditorialImage";
import {
  narrativeBridge,
  narrativeChapterTitle,
  narrativeFragmentInline,
  narrativeFragmentMargin,
  narrativeHeadline,
  narrativeHonestLine,
  narrativeProse,
  narrativeProseTight,
} from "@/components/home/narrative-layout";
import { Chapter } from "@/components/sections/HomeSection";
import { TextLink } from "@/components/system/TextLink";
import type { HomeNarrative, NarrativeStory } from "@/types/home-narrative";
import { cn } from "@/lib/utils";

type NarrativeHomeProps = {
  narrative: HomeNarrative;
};

function StoryBlock({ story }: { story: NarrativeStory }) {
  const prose = (
    <div className="space-y-5">
      <p className="text-sm text-ink-secondary">{story.protagonist}</p>
      {story.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className={narrativeProse}>
          {paragraph}
        </p>
      ))}
      <p className={narrativeHonestLine}>{story.honestLine}</p>
      <TextLink href={story.href} className="inline-flex pt-1">
        {story.linkLabel}
      </TextLink>
    </div>
  );

  const evidence = (
    <EditorialImage
      image={story.evidence}
      sizes="(max-width: 768px) 100vw, 480px"
    />
  );

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
      {story.evidencePosition === "left" ? (
        <>
          {evidence}
          {prose}
        </>
      ) : (
        <>
          {prose}
          {evidence}
        </>
      )}
    </div>
  );
}

export function NarrativeHome({ narrative }: NarrativeHomeProps) {
  const { chapters } = narrative;

  return (
    <article>
      {/* Chapter I — Someone is losing time. */}
      <Chapter spacing="tight" tone="default" ariaLabel={chapters.one.title}>
        <div className="mx-auto max-w-[580px] space-y-8">
          <header className="space-y-4">
            <p className={narrativeChapterTitle}>{chapters.one.title}</p>
          </header>
          <div className="space-y-5">
            {chapters.one.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={narrativeProseTight}>
                {paragraph}
              </p>
            ))}
          </div>
          <EditorialImage
            image={chapters.one.image}
            className="max-w-none pt-2"
          />
        </div>
      </Chapter>

      {/* Chapter II — Someone finally notices. */}
      <Chapter spacing="standard" tone="warm" ariaLabel={chapters.two.title}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,680px)_minmax(0,1fr)] lg:gap-16">
          <div className="space-y-8">
            <header className="space-y-4">
              <p className={narrativeChapterTitle}>{chapters.two.title}</p>
            </header>
            <div className="space-y-5">
              {chapters.two.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={narrativeProse}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="space-y-4 pt-2">
              {chapters.two.fragments
                .filter((fragment) => fragment.placement !== "margin")
                .map((fragment) => (
                  <p key={fragment.text} className={narrativeFragmentInline}>
                    {fragment.text}
                  </p>
                ))}
            </div>
          </div>
          <div className="space-y-8 lg:pt-16">
            {chapters.two.fragments
              .filter((fragment) => fragment.placement === "margin")
              .map((fragment) => (
                <blockquote
                  key={fragment.text}
                  className={cn(narrativeFragmentMargin, "max-w-sm lg:ml-auto")}
                >
                  {fragment.text}
                </blockquote>
              ))}
            <EditorialImage
              image={chapters.two.image}
              className="max-w-md lg:ml-auto"
            />
          </div>
        </div>
      </Chapter>

      {/* Chapter III — Handover Engine */}
      <Chapter
        spacing="standard"
        tone="default"
        divider
        ariaLabel={chapters.three.title}
      >
        <div className="space-y-10">
          <header className="mx-auto max-w-[680px] space-y-4">
            <p className={narrativeChapterTitle}>{chapters.three.title}</p>
            <p className={narrativeBridge}>{chapters.three.bridge}</p>
          </header>
          <StoryBlock story={chapters.three.story} />
        </div>
      </Chapter>

      {/* Chapter IV — Training OS */}
      <Chapter
        spacing="standard"
        tone="default"
        ariaLabel={chapters.four.title}
      >
        <div className="space-y-10">
          <header className="mx-auto max-w-[680px] space-y-4">
            <p className={narrativeChapterTitle}>{chapters.four.title}</p>
            <p className={narrativeBridge}>{chapters.four.bridge}</p>
          </header>
          <StoryBlock story={chapters.four.story} />
        </div>
      </Chapter>

      {/* Chapter V — The life behind the work */}
      <Chapter spacing="airy" tone="warm" ariaLabel={chapters.five.title}>
        <div className="space-y-10 md:space-y-12">
          <header className="mx-auto max-w-[680px] space-y-4">
            <p className={narrativeChapterTitle}>{chapters.five.title}</p>
            <p className={narrativeBridge}>{chapters.five.bridge}</p>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-5">
            {chapters.five.photos.map((photo, index) => (
              <EditorialImage
                key={photo.id}
                image={photo}
                className={cn(
                  index === 0 && "sm:col-span-2 sm:row-span-2",
                  index === 1 && "sm:col-span-4",
                  index === 2 && "sm:col-span-3",
                  index === 3 && "sm:col-span-2",
                  index === 4 && "sm:col-span-3 sm:col-start-2",
                )}
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            ))}
          </div>

          <div className="mx-auto grid max-w-[820px] grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {chapters.five.fragments.map((fragment) => (
              <p key={fragment} className={narrativeFragmentInline}>
                {fragment}
              </p>
            ))}
          </div>
        </div>
      </Chapter>

      {/* Chapter VI — The conversation continues */}
      <Chapter spacing="airy" tone="open" ariaLabel={chapters.six.title}>
        <div className="mx-auto max-w-[580px] space-y-10">
          <header className="space-y-5">
            <p className={narrativeChapterTitle}>{chapters.six.title}</p>
            <p className={narrativeHeadline}>{chapters.six.bridge}</p>
          </header>

          <div className="space-y-3 border-l-2 border-border pl-4 md:pl-5">
            <p className="text-sm text-ink-secondary">
              Currently thinking about
            </p>
            <p className="text-base leading-relaxed text-ink-primary md:text-lg">
              {chapters.six.thinkingPrompt}
            </p>
            <p className={narrativeHonestLine}>
              {chapters.six.thinkingEmptyLabel}
            </p>
          </div>

          <nav
            aria-label="Continue exploring"
            className="flex flex-col gap-3 pt-2"
          >
            {chapters.six.links.map((link) => (
              <TextLink key={link.href} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </nav>
        </div>
      </Chapter>
    </article>
  );
}
