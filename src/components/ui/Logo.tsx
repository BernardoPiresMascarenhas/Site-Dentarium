import Image from "next/image";

import { logo } from "@/data/brand";

type LogoProps = {
  /** Classes de altura (ex.: "h-10 sm:h-12"); a largura acompanha a proporção. */
  className?: string;
  priority?: boolean;
};

/**
 * Logomarca oficial, sem alterações: só a altura é definida, então a
 * proporção do arquivo é sempre preservada. O símbolo é semitransparente,
 * por isso a logo deve ficar apenas sobre fundos claros.
 */
export function Logo({ className = "h-11", priority = false }: LogoProps) {
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      priority={priority}
      // Arquivo pequeno (PNG) ou vetorial (SVG): servido como está, sem recompressão.
      unoptimized
      className={`block w-auto max-w-none select-none ${className}`}
      style={{ aspectRatio: logo.ratio }}
      draggable={false}
    />
  );
}
