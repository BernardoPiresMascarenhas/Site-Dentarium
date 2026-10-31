import type { StaticImageData } from "next/image";

/**
 * Logomarca oficial da Dentarium.
 *
 * Arquivo atual: PNG transparente de 236 × 60 px — suficiente para o
 * header em telas comuns, mas abaixo do ideal em telas de alta densidade.
 *
 * Para usar uma versão melhor (SVG oficial ou PNG ≥ 944 × 240 px), coloque o
 * arquivo em public/images/dentarium/ e troque SOMENTE o import abaixo, por
 * exemplo:
 *   import logoFile from "../../public/images/dentarium/logo-dentarium.svg";
 * Proporção, tamanhos e textos alternativos se ajustam sozinhos.
 * Não vetorizar nem redesenhar a marca a partir do PNG.
 */
import logoFile from "../../public/images/dentarium/logo-dentarium-2.png";

export type BrandLogo = {
  src: StaticImageData;
  alt: string;
  /** Largura ÷ altura do arquivo, usada para reservar espaço sem distorcer. */
  ratio: number;
  status: "official-low-res" | "official-high-res" | "official-vector";
};

export const logo: BrandLogo = {
  src: logoFile,
  alt: "Dentarium, odontologia funcional e estética",
  ratio: logoFile.width / logoFile.height,
  status: logoFile.src.endsWith(".svg")
    ? "official-vector"
    : logoFile.width >= 944
      ? "official-high-res"
      : "official-low-res",
};

/** Cores extraídas da logomarca, para referência (tokens em globals.css). */
export const brandColors = {
  graphite: "#5E625E",
  clay: "#7A5C4F",
  roseOnLight: "#BCADA7",
} as const;
