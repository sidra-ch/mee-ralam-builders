import { CinematicImage } from "@/components/motion/CinematicImage";
import type { ServiceImage } from "@/data/services";

interface ServiceGalleryProps {
  images: ServiceImage[];
}

/**
 * ServiceGallery
 *
 * Editorial composition: one feature photograph followed by two supporting
 * frames. Images are fixed — revealed once, never swapped or cycled.
 */
export function ServiceGallery({ images }: ServiceGalleryProps) {
  if (images.length === 0) return null;

  const [feature, ...supporting] = images;

  return (
    <div className="space-y-4 sm:space-y-5">
      <CinematicImage
        src={feature.src}
        alt={feature.alt}
        aspectRatio="h-[300px] sm:h-[440px] lg:h-[560px]"
        sizes="(max-width: 1024px) 100vw, 1200px"
        parallax={false}
        containerClassName="relative overflow-hidden rounded-[1.25rem] border border-[#1e1e1e] bg-[#0a0b0e]"
      />

      {supporting.length > 0 && (
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {supporting.map((image) => (
            <CinematicImage
              key={image.src}
              src={image.src}
              alt={image.alt}
              aspectRatio="h-[240px] sm:h-[320px] lg:h-[380px]"
              sizes="(max-width: 768px) 100vw, 50vw"
              parallax={false}
              containerClassName="relative overflow-hidden rounded-[1.25rem] border border-[#1e1e1e] bg-[#0a0b0e]"
            />
          ))}
        </div>
      )}
    </div>
  );
}
