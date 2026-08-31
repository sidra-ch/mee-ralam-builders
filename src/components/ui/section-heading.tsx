import { CinematicHeading } from "@/components/motion/CinematicHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-4">
      <CinematicHeading
        eyebrow={eyebrow}
        lines={title}
        className="font-display text-3xl leading-none text-[#f5f2ea] sm:text-4xl lg:text-5xl"
        mode="masked-line"
      />
      {description ? (
        <ScrollReveal delay={0.15}>
          <p className="max-w-xl text-base text-[#c7c0b5] sm:text-lg">{description}</p>
        </ScrollReveal>
      ) : null}
    </div>
  );
}
