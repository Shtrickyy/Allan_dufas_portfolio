type ScaffoldHeadingProps = {
  title: string;
  description?: string;
};

export function ScaffoldHeading({ title, description }: ScaffoldHeadingProps) {
  return (
    <div className="py-16 md:py-24">
      <h1 className="text-[2rem] font-medium leading-tight tracking-tight text-ink-primary md:text-[3rem]">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-secondary">
          {description}
        </p>
      ) : null}
    </div>
  );
}
