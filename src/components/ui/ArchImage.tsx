import Image from "next/image";

import type { ClinicImage } from "@/data/images";

type ArchImageProps = {
  image: ClinicImage;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Arco deslocado em linha clay atrás da foto. */
  echo?: boolean;
  aspect?: string;
  imageClassName?: string;
};

/** Fotografia em moldura de arco, com eco opcional em linha. */
export function ArchImage({
  image,
  sizes,
  className = "",
  priority = false,
  echo = false,
  aspect = "1 / 1",
  imageClassName = "",
}: ArchImageProps) {
  return (
    <div className={`relative ${className}`}>
      {echo && (
        <div
          aria-hidden
          className="arch absolute inset-0 translate-x-[7%] -translate-y-[5%] border border-clay/45"
        />
      )}
      <div
        className="arch relative overflow-hidden"
        style={{ aspectRatio: aspect, backgroundColor: image.tone }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className={`object-cover ${imageClassName}`}
          style={{ objectPosition: image.focus }}
        />
      </div>
    </div>
  );
}
