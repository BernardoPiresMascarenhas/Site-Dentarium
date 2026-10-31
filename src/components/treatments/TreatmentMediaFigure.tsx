import Image from "next/image";

import { type ClinicImageKey, images } from "@/data/images";
import { type TreatmentMediaKey, treatmentMedia } from "@/data/treatmentMedia";

/**
 * Ilustração ou fotografia de apoio dentro da página de tratamento.
 * As ilustrações têm fundo branco: ficam numa "prancha" branca com borda fina
 * e um arco taupe atrás, para parecerem parte do layout e não um arquivo
 * solto. A largura nunca passa da largura original do arquivo.
 */
export function TreatmentMediaFigure({ media, className = "" }: { media: TreatmentMediaKey; className?: string }) {
  const m = treatmentMedia[media];
  const width = Math.min(m.maxWidth, m.src.width);
  return (
    <figure className={`mx-auto w-full ${className}`} style={{ maxWidth: width }}>
      <div className="relative">
        <span aria-hidden className="arch absolute inset-x-6 -top-3 bottom-6 bg-taupe-tint" />
        <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-line bg-white">
          <Image
            src={m.src}
            alt={m.alt}
            placeholder="blur"
            sizes={`(min-width: 768px) ${width}px, 90vw`}
            className="block h-auto w-full"
          />
        </div>
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-stone">
        {m.caption}
        {"credit" in m && m.credit && (
          <span className="mt-1 block text-[0.8rem]">
            Foto:{" "}
            <a href={m.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-ink">
              {m.credit.author}, via Wikimedia Commons
            </a>{" "}
            ·{" "}
            <a href={m.credit.licenseUrl} target="_blank" rel="noopener noreferrer license" className="link-underline text-ink">
              {m.credit.license}
            </a>
          </span>
        )}
      </figcaption>
    </figure>
  );
}

/** Fotografia da própria clínica, exibida no tamanho original (arquivos pequenos do site antigo). */
export function ClinicPhotoFigure({ image, className = "" }: { image: ClinicImageKey; className?: string }) {
  const img = images[image];
  return (
    <figure className={`mx-auto w-full ${className}`} style={{ maxWidth: img.src.width + 24 }}>
      <div className="relative pt-3 pr-3">
        <span aria-hidden className="absolute inset-0 top-0 right-0 left-6 bottom-6 rounded-[var(--radius-md)] bg-clay/[0.12]" />
        <div className="relative overflow-hidden rounded-[var(--radius-md)]" style={{ backgroundColor: img.tone }}>
          <Image
            src={img.src}
            alt={img.alt}
            placeholder="blur"
            sizes={`${img.src.width}px`}
            className="block h-auto w-full"
          />
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-stone">{img.caption}, Dentarium</figcaption>
    </figure>
  );
}
