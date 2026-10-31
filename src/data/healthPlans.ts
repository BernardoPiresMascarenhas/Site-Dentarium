import type { StaticImageData } from "next/image";

import agros from "../../public/images/dentarium/dentarium-planos-de-saude-agros.png";
import odontovida from "../../public/images/dentarium/dentarium-planos-de-saude-odontovida.png";
import coopeder from "../../public/images/dentarium/dentarium-planos-de-saude-coopeder.png";

export type HealthPlan = {
  name: string;
  /** Logomarca em cinza, fundo transparente (500 × 500, marca centralizada). */
  logo: StaticImageData;
  alt: string;
};

/**
 * Convênios exibidos na página de contato, com as logomarcas fornecidas pelo
 * responsável pelo projeto em 2026-10-31. A lista atual precisa ser
 * confirmada com a clínica antes da publicação (ver PENDENCIAS_PUBLICACAO.md).
 */
export const healthPlans: HealthPlan[] = [
  { name: "Agros", logo: agros, alt: "Agros, Instituto UFV de Seguridade Social" },
  { name: "OdontoVida", logo: odontovida, alt: "OdontoVida Planos Odontológicos" },
  { name: "Coopeder", logo: coopeder, alt: "Coopeder" },
];
