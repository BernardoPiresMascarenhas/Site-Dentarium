"use client";

import type { ClinicImage } from "@/data/images";
import { PhotoTile, useLightbox } from "./Lightbox";

/**
 * Galeria da home. Desktop: fotos lado a lado, alinhadas pela base, cada uma
 * na proporção original. Celular: carrossel com encaixe e altura uniforme.
 */
export function Gallery({ items }: { items: ClinicImage[] }) {
  const { openAt, lightbox } = useLightbox(items);
  const count = items.length;

  return (
    <>
      <ul
        className="-mx-[clamp(1.25rem,4vw,2.5rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,2.5rem)] pb-4 [scrollbar-width:thin] md:hidden"
        aria-label="Fotos da clínica"
      >
        {items.map((img, i) => (
          <li key={img.id} className="shrink-0 snap-start">
            <PhotoTile img={img} index={i} count={count} onOpen={openAt} className="h-[19rem]" sizes="320px" fixedHeight />
          </li>
        ))}
      </ul>

      <ul className="hidden items-end gap-6 md:flex lg:gap-8">
        {items.map((img, i) => (
          // A largura de cada item é proporcional à razão largura/altura: alturas iguais, sem recorte.
          <li key={img.id} className={i === 1 ? "md:-translate-y-10" : ""} style={{ flex: `${img.src.width / img.src.height} 1 0` }}>
            <PhotoTile img={img} index={i} count={count} onOpen={openAt} sizes="(min-width: 1024px) 400px, 32vw" />
          </li>
        ))}
      </ul>

      {lightbox}
    </>
  );
}
