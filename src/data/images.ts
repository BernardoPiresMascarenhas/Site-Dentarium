import type { StaticImageData } from "next/image";

import heroEquipe from "../../public/images/dentarium/hero-equipe-dentarium.png";
import profissional from "../../public/images/dentarium/profissional-dentarium.png";
import fundadores from "../../public/images/dentarium/fundadores.webp";
import salaEspera from "../../public/images/dentarium/sala-espera.webp";
import jardimExterno from "../../public/images/dentarium/jardim-externo.png";
import salaApoio from "../../public/images/dentarium/sala-apoio-clinico.png";
import fachada from "../../public/images/dentarium/fachada.webp";
import logoParede from "../../public/images/dentarium/logo-parede.webp";
import consultorioRoxo from "../../public/images/dentarium/consultorio-roxo.webp";
import consultorioEquipamentos from "../../public/images/dentarium/consultorio-equipamentos.webp";

/**
 * Catálogo das fotografias da Dentarium.
 *
 * Só as imagens liberadas para a demonstração são importadas. As restritas
 * aparecem em `restrictedImages` apenas como registro: nunca são importadas
 * por componentes (ver PENDENCIAS_PUBLICACAO.md).
 *
 * Distribuição por página (evita repetição):
 * - Home: heroEquipe (hero), salaEspera + logoParede (sobre),
 *   consultorioEquipamentos (tecnologia), homeGallery, fachada (contato).
 * - A Clínica: logoParede (abertura), fundadores (registro institucional),
 *   tour (fachada, jardim, sala de espera, consultórios, apoio clínico).
 * - Tecnologia: salaApoio. Equipe: profissional. Contato: fachada.
 */

export type ClinicImage = {
  id: string;
  src: StaticImageData;
  alt: string;
  caption: string;
  /** Ponto focal para `object-position` quando houver recorte. */
  focus: string;
  /** Cor média aproximada, usada como placeholder sólido. */
  tone: string;
  /**
   * Foto com tratamento digital por IA: recurso demonstrativo até a
   * aprovação de fidelidade e uso pelos retratados.
   */
  aiTreated?: boolean;
};

export const images = {
  heroEquipe: {
    id: "hero-equipe",
    src: heroEquipe,
    alt: "Os fundadores da Dentarium, uma mulher de blusa vinho e um homem de jaleco branco, sorrindo diante da parede com a marca da clínica.",
    caption: "Fundadores da Dentarium",
    focus: "0% 30%",
    tone: "#b79488",
    aiTreated: true,
  },
  profissional: {
    id: "profissional",
    src: profissional,
    alt: "Gabriel Faria Aiala, de jaleco branco e gravata preta, diante da parede com o símbolo e o nome Dentarium.",
    caption: "Gabriel Faria Aiala",
    focus: "38% 28%",
    tone: "#c1bdb6",
    aiTreated: true,
  },
  fundadores: {
    id: "fundadores",
    src: fundadores,
    alt: "Os dois fundadores da Dentarium, de jaleco cinza, sorrindo diante de uma parede com plantas.",
    caption: "Fundadores da Dentarium",
    focus: "50% 30%",
    tone: "#cfd2cb",
  },
  salaEspera: {
    id: "sala-espera",
    src: salaEspera,
    alt: "Sala de espera clara, com poltronas cinza giratórias, mesa de centro redonda e painel de madeira.",
    caption: "Sala de espera",
    focus: "50% 55%",
    tone: "#dedbd5",
  },
  jardimExterno: {
    id: "jardim-externo",
    src: jardimExterno,
    alt: "Jardim externo com gramado, árvore, vasos de palmeiras e balizadores de iluminação junto a um caminho de piso claro.",
    caption: "Jardim externo",
    focus: "50% 50%",
    tone: "#757f74",
  },
  salaApoio: {
    id: "sala-apoio-clinico",
    src: salaApoio,
    alt: "Sala clara com armários brancos, bancada de granito e equipamentos organizados.",
    caption: "Área de apoio clínico",
    focus: "50% 50%",
    tone: "#aeb5bd",
  },
  fachada: {
    id: "fachada",
    src: fachada,
    alt: "Fachada do prédio da Dentarium, com letreiro, vidros espelhados e árvores ao redor.",
    caption: "Fachada na Rua do Ouro",
    focus: "50% 40%",
    tone: "#b9c6cf",
  },
  logoParede: {
    id: "logo-parede",
    src: logoParede,
    alt: "Símbolo e nome Dentarium aplicados sobre parede de revestimento em relevo.",
    caption: "Identidade da Dentarium",
    focus: "50% 50%",
    tone: "#d6d5d1",
  },
  consultorioRoxo: {
    id: "consultorio-roxo",
    src: consultorioRoxo,
    alt: "Consultório com cadeira odontológica roxa, painel de madeira e prateleiras decoradas.",
    caption: "Consultório",
    focus: "50% 60%",
    tone: "#d8d2cf",
  },
  consultorioEquipamentos: {
    id: "consultorio-equipamentos",
    src: consultorioEquipamentos,
    alt: "Consultório com cadeira odontológica bege, bancada de equipamentos e divisória de vidro.",
    caption: "Consultório e bancada técnica",
    focus: "50% 50%",
    tone: "#cbc3b4",
  },
} satisfies Record<string, ClinicImage>;

/** Galeria da home: só ambientes que não aparecem em outras seções da página. */
export const homeGallery: ClinicImage[] = [images.consultorioRoxo, images.jardimExterno, images.salaApoio];

/** Tour da página A Clínica, em capítulos — da chegada aos consultórios. */
export const tourChapters: { id: string; title: string; text: string; photos: ClinicImage[] }[] = [
  {
    id: "chegada",
    title: "Chegada",
    text: "O prédio na Rua do Ouro, com um jardim que recebe luz natural.",
    photos: [images.fachada, images.jardimExterno],
  },
  {
    id: "espera",
    title: "Espera",
    text: "Poltronas confortáveis, madeira e iluminação suave: um lugar para aguardar com tranquilidade.",
    photos: [images.salaEspera],
  },
  {
    id: "consultorios",
    title: "Consultórios",
    text: "Ambientes claros e organizados, com o equipamento ao alcance da equipe.",
    photos: [images.consultorioRoxo, images.consultorioEquipamentos],
  },
  {
    id: "apoio",
    title: "Apoio clínico",
    text: "Os bastidores do atendimento: materiais e equipamentos organizados em uma área dedicada.",
    photos: [images.salaApoio],
  },
];

/** Todas as fotos do tour, na ordem de leitura (usada pelo lightbox). */
export const tourImages: ClinicImage[] = tourChapters.flatMap((c) => c.photos);

export type RestrictedImage = {
  file: string;
  status: "pending-authorization" | "do-not-publish";
  reason: string;
};

export const restrictedImages: RestrictedImage[] = [
  {
    file: "recepcao-familia.webp",
    status: "pending-authorization",
    reason:
      "Pessoas identificáveis, incluindo uma criança. Exige autorização expressa dos retratados e do responsável legal.",
  },
  {
    file: "tomografia.webp",
    status: "pending-authorization",
    reason:
      "Mostra um paciente identificável dentro do equipamento. Uso promocional depende de autorização e revisão ética.",
  },
  {
    file: "atendimento-procedimento.png e atendimento-procedimento.webp",
    status: "do-not-publish",
    reason: "Procedimento em andamento com paciente identificável (restrição da Resolução CFO 196/2019).",
  },
];
