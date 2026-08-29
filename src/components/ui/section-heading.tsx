type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-4">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl text-[#f5f2ea] sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="max-w-xl text-base text-[#c7c0b5] sm:text-lg">{description}</p> : null}
    </div>
  );
}
