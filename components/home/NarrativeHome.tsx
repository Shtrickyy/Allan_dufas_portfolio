import { EditorialImage } from "@/components/home/EditorialImage";
import {
  narrativeBridge,
  narrativeChapterMarker,
  narrativeChapterTitle,
  narrativeFragmentInline,
  narrativeFragmentMargin,
  narrativeHeadline,
  narrativeHonestLine,
  narrativeLink,
  narrativeProtagonist,
  narrativeProse,
  narrativeProseTight,
  narrativeThinkingLabel,
} from "@/components/home/narrative-layout";
import { chapterMarkers } from "@/components/home/narrative-tokens";
import { Chapter } from "@/components/sections/HomeSection";
import type { HomeNarrative, NarrativeStory } from "@/types/home-narrative";
import { cn } from "@/lib/utils";
import Link from "next/link";

type NarrativeHomeProps = {
  narrative: HomeNarrative;
};

function ChapterHeader({
  marker,
  title,
  bridge,
}: {
  marker: string;
  title: string;
  bridge?: string;
}) {
  return (
    <header className="space-y-3">
      <p className={narrativeChapterMarker}>{marker}</p>
      <p className={narrativeChapterTitle}>{title}</p>
      {bridge ? <p className={narrativeBridge}>{bridge}</p> : null}
    </header>
  );
}

function StoryBlock({ story }: { story: NarrativeStory }) {
  const prose = (
    <div className="space-y-6">
      <p className={narrativeProtagonist}>{story.protagonist}</p>
      {story.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className={narrativeProse}>
          {paragraph}
        </p>
      ))}
      <p className={narrativeHonestLine}>{story.honestLine}</p>
      <Link href={story.href} className={cn(narrativeLink, "inline-flex pt-1")}>
        {story.linkLabel}
      </Link>
    </div>
  );

  const evidence = (
    <EditorialImage
      image={story.evidence}
      sizes="(max-width: 768px) 100vw, 480px"
    />
  );

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16 xl:gap-20">
      {story.evidencePosition === "left" ? (
        <>
          <div className="lg:pt-4">{evidence}</div>
          <div className="lg:pl-4">{prose}</div>
        </>
      ) : (
        <>
          <div className="lg:pr-6">{prose}</div>
          <div className="lg:pt-8">{evidence}</div>
        </>
      )}
    </div>
  );
}

export function NarrativeHome({ narrative }: NarrativeHomeProps) {
  const { chapters } = narrative;

  return (
    <article className="font-sans">
      {/* Chapter I — Someone is losing time. */}
      <Chapter
        spacing="tight"
        tone="default"
        ariaLabel={chapters.one.title}
        containerClassName="md:pl-4 lg:pl-8"
      >
        <div className="mx-auto max-w-[540px] space-y-10 md:mr-auto md:ml-0">
          <ChapterHeader
            marker={chapterMarkers[0]}
            title={chapters.one.title}
          />
          <div className="space-y-6">
            {chapters.one.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={narrativeProseTight}>
                {paragraph}
              </p>
            ))}
          </div>
          <EditorialImage
            image={chapters.one.image}
            className="max-w-none pt-4 md:-mr-8 lg:-mr-16"
          />
        </div>
      </Chapter>

      {/* Chapter II — Someone finally notices. */}
      <Chapter
        spacing="standard"
        tone="warm"
        ariaLabel={chapters.two.title}
        containerClassName="lg:pr-8"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,600px)_minmax(0,1fr)] lg:gap-20">
          <div className="space-y-10 lg:pt-6">
            <ChapterHeader
              marker={chapterMarkers[1]}
              title={chapters.two.title}
            />
            <div className="space-y-6">
              {chapters.two.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={narrativeProse}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="space-y-4 border-t border-[#c8bfb0]/40 pt-6">
              {chapters.two.fragments
                .filter((fragment) => fragment.placement !== "margin")
                .map((fragment) => (
                  <p key={fragment.text} className={narrativeFragmentInline}>
                    {fragment.text}
                  </p>
                ))}
            </div>
          </div>
          <div className="space-y-10 lg:pt-20">
            {chapters.two.fragments
              .filter((fragment) => fragment.placement === "margin")
              .map((fragment) => (
                <blockquote
                  key={fragment.text}
                  className={cn(narrativeFragmentMargin, "max-w-xs lg:ml-auto")}
                >
                  {fragment.text}
                </blockquote>
              ))}
            <EditorialImage
              image={chapters.two.image}
              className="max-w-sm lg:ml-auto lg:mr-4"
            />
          </div>
        </div>
      </Chapter>

      {/* Chapter III — Handover Engine */}
      <Chapter
        spacing="standard"
        tone="paper"
        divider
        ariaLabel={chapters.three.title}
      >
        <div className="space-y-12">
          <div className="max-w-[620px] space-y-4 md:ml-8 lg:ml-16">
            <ChapterHeader
              marker={chapterMarkers[2]}
              title={chapters.three.title}
              bridge={chapters.three.bridge}
            />
          </div>
          <StoryBlock story={chapters.three.story} />
        </div>
      </Chapter>

      {/* Chapter IV — Training OS */}
      <Chapter spacing="standard" tone="stone" ariaLabel={chapters.four.title}>
        <div className="space-y-12">
          <div className="max-w-[620px] space-y-4 md:ml-auto md:mr-8 lg:mr-16">
            <ChapterHeader
              marker={chapterMarkers[3]}
              title={chapters.four.title}
              bridge={chapters.four.bridge}
            />
          </div>
          <StoryBlock story={chapters.four.story} />
        </div>
      </Chapter>

      {/* Chapter V — The life behind the work */}
      <Chapter spacing="airy" tone="warm" ariaLabel={chapters.five.title}>
        <div className="space-y-12 md:space-y-16">
          <div className="mx-auto max-w-[640px] space-y-4 text-center md:text-left">
            <ChapterHeader
              marker={chapterMarkers[4]}
              title={chapters.five.title}
              bridge={chapters.five.bridge}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-6 sm:gap-4">
            {chapters.five.photos.map((photo, index) => (
              <EditorialImage
                key={photo.id}
                image={photo}
                className={cn(
                  index === 0 && "sm:col-span-2 sm:row-span-2 sm:mt-4",
                  index === 1 && "sm:col-span-4 sm:-mt-2",
                  index === 2 && "sm:col-span-3 sm:mt-6",
                  index === 3 && "sm:col-span-2 sm:mt-2",
                  index === 4 && "sm:col-span-3 sm:col-start-2 sm:-mt-4",
                )}
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            ))}
          </div>

          <div className="mx-auto grid max-w-[780px] grid-cols-1 gap-5 sm:grid-cols-2 md:gap-8">
            {chapters.five.fragments.map((fragment, index) => (
              <p
                key={fragment}
                className={cn(
                  narrativeFragmentInline,
                  index % 2 === 1 && "sm:pt-3",
                )}
              >
                {fragment}
              </p>
            ))}
          </div>
        </div>
      </Chapter>

      {/* Chapter VI — The conversation continues */}
      <Chapter spacing="airy" tone="open" ariaLabel={chapters.six.title}>
        <div className="mx-auto max-w-[560px] space-y-12 md:ml-12 lg:ml-24">
          <header className="space-y-5">
            <p className={narrativeChapterMarker}>{chapterMarkers[5]}</p>
            <p className={narrativeChapterTitle}>{chapters.six.title}</p>
            <p className={narrativeHeadline}>{chapters.six.bridge}</p>
          </header>

          <div className="space-y-4 border-l border-[#9a8668]/50 pl-5 md:pl-7">
            <p className={narrativeThinkingLabel}>Currently thinking about</p>
            <p className="font-serif text-base leading-relaxed text-ink-primary md:text-lg md:leading-[1.7]">
              {chapters.six.thinkingPrompt}
            </p>
            <p className={narrativeHonestLine}>
              {chapters.six.thinkingEmptyLabel}
            </p>
          </div>

          <nav
            aria-label="Continue exploring"
            className="flex flex-col gap-4 border-t border-[#c8bfb0]/40 pt-8"
          >
            {chapters.six.links.map((link) => (
              <Link key={link.href} href={link.href} className={narrativeLink}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Chapter>
    </article>
  );
}
