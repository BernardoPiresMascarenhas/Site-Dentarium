import type { StaticImageData } from "next/image";

import heroEquipe from "../../public/images/dentarium/hero-equipe-dentarium.png";
import gabriel from "../../public/images/dentarium/gabriel.png";
import denise from "../../public/images/dentarium/denise.png";
import fernanda from "../../public/images/dentarium/fernanda.png";
import salaRadiografia from "../../public/images/dentarium/sala-de-radiografia-dentarium-300x240.png";
import consultorioOdontologico from "../../public/images/dentarium/Consultorio-odontologico.png";
import consultorioAtendimento from "../../public/images/dentarium/consultorio.png";
import consultorioVidro from "../../public/images/dentarium/consultorio2.png";
import salaEsperaPoltronas from "../../public/images/dentarium/salaespera.png";
import estacionamento from "../../public/images/dentarium/estacionamento.png";
import fundadores from "../../public/images/dentarium/fundadores.webp";
import salaEspera from "../../public/images/dentarium/sala-espera.webp";
import jardimExterno from "../../public/images/dentarium/jardim-externo.png";
import salaApoio from "../../public/images/dentarium/sala-apoio-clinico.png";
import fachada from "../../public/images/dentarium/fachada.webp";
import logoParede from "../../public/images/dentarium/logo-parede.webp";
import consultorioRoxo from "../../public/images/dentarium/consultorio-roxo.webp";
import consultorioEquipamentos from "../../public/images/dentarium/consultorio-equipamentos.webp";
import recepcaoFamilia from "../../public/images/dentarium/recepcao-familia.webp";
import tomografia from "../../public/images/dentarium/tomografia.webp";
import atendimentoProcedimento from "../../public/images/dentarium/atendimento-procedimento.webp";
import primeiraConsulta from "../../public/images/dentarium/primeira-consulta.png";

/**
 * Catálogo das fotografias da Dentarium.
 *
 * Fotos com pacientes ou pessoas atendidas (recepcaoFamilia, tomografia,
 * atendimentoProcedimento, primeiraConsulta) vieram do site anterior da
 * clínica, com autorização de uso informada pelo responsável pelo projeto em
 * 2026-10-31 (ver PENDENCIAS_PUBLICACAO.md).
 *
 * Distribuição por página (evita repetição):
 * - Home: heroEquipe (hero), salaEspera + logoParede (sobre),
 *   consultorioEquipamentos (tecnologia), homeGallery, fachada (contato).
 * - A Clínica: logoParede (abertura), fundadores (história), consultorioAtendimento
 *   (estrutura), tour (fachada, jardim, estacionamento, recepção, salas de
 *   espera, consultórios, apoio clínico).
 * - Tecnologia: salaApoio (abertura), tomografia (exames de imagem),
 *   consultorioVidro (planejamento digital), atendimentoProcedimento
 *   (atendimento).
 * - Equipe: gabriel, denise, fernanda. Contato: sem fotos.
 * - Tratamentos: primeiraConsulta apoia a página de primeira consulta. As
 *   ilustrações dos tratamentos ficam em treatmentMedia.ts.
 *
 * Os arquivos de 300 × 240 px (site antigo) nunca são exibidos acima da
 * largura original: os componentes limitam a largura a `src.width`.
 * `profissional-dentarium.png` (tratada por IA) deixou de ser usada quando
 * os retratos individuais foram entregues, e `salaRadiografia` (300 px) deu
 * lugar à foto da tomografia em Tecnologia.
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
  gabriel: {
    id: "gabriel",
    src: gabriel,
    alt: "Dr. Gabriel Faria Aiala, sorridente, de jaleco cinza, camisa azul-clara e gravata, diante da parede em relevo com o nome Dentarium.",
    caption: "Dr. Gabriel Faria Aiala",
    focus: "50% 30%",
    tone: "#dcdbd8",
  },
  denise: {
    id: "denise",
    src: denise,
    alt: "Dra. Denise Ligório Fialho Aiala, sorridente, de cabelos castanhos ondulados e jaleco cinza, diante da parede em relevo com o nome Dentarium.",
    caption: "Dra. Denise Ligório Fialho Aiala",
    focus: "47% 30%",
    tone: "#dcdbd8",
  },
  fernanda: {
    id: "fernanda",
    src: fernanda,
    alt: "Dra. Fernanda de Paula T. Bastos, sorridente, de cabelos castanhos lisos e jaleco branco, diante da parede em relevo com o nome Dentarium.",
    caption: "Dra. Fernanda de Paula T. Bastos",
    focus: "48% 30%",
    tone: "#dcdbd8",
  },
  salaRadiografia: {
    id: "sala-radiografia",
    src: salaRadiografia,
    alt: "Sala de radiografia com aparelho de exame panorâmico de parede e aparelho de raio X intraoral em suporte com rodízios.",
    caption: "Sala de radiografia",
    focus: "50% 50%",
    tone: "#dfe0e0",
  },
  consultorioOdontologico: {
    id: "consultorio-odontologico",
    src: consultorioOdontologico,
    alt: "Consultório claro com cadeira odontológica verde-água, armários brancos e bancada de granito sob a janela.",
    caption: "Consultório com bancada",
    focus: "50% 50%",
    tone: "#dcdad6",
  },
  consultorioAtendimento: {
    id: "consultorio-atendimento",
    src: consultorioAtendimento,
    alt: "Consultório com cadeira odontológica roxa, televisão em painel de madeira e mesa de atendimento com computador.",
    caption: "Consultório com mesa de atendimento",
    focus: "50% 50%",
    tone: "#d9d3cd",
  },
  consultorioVidro: {
    id: "consultorio-vidro",
    src: consultorioVidro,
    alt: "Consultório visto através de divisória de vidro, com cadeira odontológica bege e monitores suspensos.",
    caption: "Consultório com monitores",
    focus: "50% 50%",
    tone: "#e6e6e4",
  },
  salaEsperaPoltronas: {
    id: "sala-espera-poltronas",
    src: salaEsperaPoltronas,
    alt: "Sala de espera com poltronas cinza, mesa de centro, orquídea branca e portas de vidro.",
    caption: "Poltronas da sala de espera",
    focus: "50% 50%",
    tone: "#e3dfda",
  },
  estacionamento: {
    id: "estacionamento",
    src: estacionamento,
    alt: "Estacionamento coberto da clínica, com piso de bloquetes, um carro estacionado e o número 857 na parede.",
    caption: "Estacionamento próprio",
    focus: "50% 50%",
    tone: "#cfccc8",
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
  recepcaoFamilia: {
    id: "recepcao-familia",
    src: recepcaoFamilia,
    alt: "Na recepção da Dentarium, uma mãe e a filha sorriem no balcão enquanto a recepcionista as atende ao computador; ao lado, um vaso de orquídeas brancas.",
    caption: "Recepção",
    focus: "60% 40%",
    tone: "#b1b1b6",
  },
  tomografia: {
    id: "tomografia",
    src: tomografia,
    alt: "Dentista de jaleco cinza posiciona um paciente no aparelho de tomografia, na sala de exames de imagem.",
    caption: "Sala de tomografia",
    focus: "50% 40%",
    tone: "#9f9fa3",
  },
  atendimentoProcedimento: {
    id: "atendimento-procedimento",
    src: atendimentoProcedimento,
    alt: "Dentista de jaleco cinza e touca estampada posiciona o aparelho de raio X intraoral junto ao rosto de uma paciente deitada na cadeira odontológica.",
    caption: "Atendimento no consultório",
    focus: "40% 50%",
    tone: "#b4b1b1",
  },
  primeiraConsulta: {
    id: "primeira-consulta",
    src: primeiraConsulta,
    alt: "Dentista de jaleco cinza mostra informações no monitor do computador a uma paciente sentada à mesa de atendimento.",
    caption: "Conversa na mesa de atendimento",
    focus: "50% 40%",
    tone: "#8d9190",
  },
} satisfies Record<string, ClinicImage>;

export type ClinicImageKey = keyof typeof images;

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
    id: "estacionamento",
    title: "Estacionamento",
    text: "Estacionamento próprio na entrada do prédio, para chegar com mais comodidade.",
    photos: [images.estacionamento],
  },
  {
    id: "recepcao",
    title: "Recepção",
    text: "A recepção acolhe pacientes de todas as idades e organiza cada horário com atenção.",
    photos: [images.recepcaoFamilia],
  },
  {
    id: "espera",
    title: "Espera",
    text: "Poltronas acolchoadas, televisão e lavabo: um lugar para aguardar com tranquilidade.",
    photos: [images.salaEspera, images.salaEsperaPoltronas],
  },
  {
    id: "consultorios",
    title: "Consultórios",
    text: "Ambientes claros e organizados, com televisão e mesa de atendimento com computador para apresentar as possibilidades de tratamento.",
    photos: [images.consultorioRoxo, images.consultorioOdontologico],
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
