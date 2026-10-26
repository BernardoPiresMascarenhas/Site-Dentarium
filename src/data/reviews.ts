/**
 * Avaliações de pacientes publicadas no Google — fonte única.
 *
 * Os textos são cópias LITERAIS das avaliações originais: não corrigir,
 * reescrever, resumir nem completar. Respostas da clínica, selos de Local
 * Guide, contagens e fotos do Google não fazem parte destes dados.
 *
 * - status "complete": texto integral disponível — publicado no site.
 * - status "incomplete": texto truncado na extração — NÃO publicado.
 *   Ativar trocando o texto pelo integral e o status para "complete".
 */

export type ReviewStatus = "complete" | "incomplete";

export type Review = {
  id: string;
  author: string;
  text: string;
  status: ReviewStatus;
  /**
   * Nota individual (1–5) somente quando confirmada na avaliação original.
   * `null` = não verificada: nenhuma estrela é exibida.
   * As notas 5 das avaliações publicadas foram confirmadas pelo responsável
   * pelo projeto em 25/10/2026.
   */
  rating: number | null;
  source: "google";
};

export const reviews: Review[] = [
  {
    id: "ana-flavia-ceolin",
    author: "Ana Flavia Ceolin",
    text: "Excelente atendimento da marcação ao resultado final. Atenção diferenciada a todas as nossas necessidades. Dra Denise tem mãos de fada. Tenho aversão à anestesia, mas não gosto de sentir dor. Com ela consigo tolerar os procedimentos sem incômodo algum.",
    status: "complete",
    rating: 5,
    source: "google",
  },
  {
    id: "jane-baptista",
    author: "Jane Baptista",
    text: "Clínica dentária com serviços de várias intervenções, inclusiva ortodôntica. O ambiente é muito agradável, com atendentes simpáticos e atenciosos. Os profissionais são competentes, explicam com atenção e paciência a todas às indagações. O serviço prestado foi de alta qualidade. Estou muito contente com a escolha desta clínica.",
    status: "complete",
    rating: 5,
    source: "google",
  },
  {
    id: "mg-solucoes-bh",
    author: "MG Soluções BH licitação para gênero alimentício",
    text: "Espetacular. Profissionais de altíssimo nível e excelente atendimento. Recomendação máxima",
    status: "complete",
    rating: 5,
    source: "google",
  },
  {
    id: "corei-max",
    author: "Corei Max",
    text: "Excelente, atendimento perfeito.",
    status: "complete",
    rating: 5,
    source: "google",
  },
  {
    id: "nathalie-bambirra",
    author: "Nathalie Bambirra",
    text: "Ambiente acolhedor, bem localizado, estrutura de primeiríssima qualidade e profissionais maravilhosos. Não é a toa que toda minha família cuida dos dentes aqui.",
    status: "complete",
    rating: 5,
    source: "google",
  },

  // Textos truncados na extração — aguardando o conteúdo integral.
  {
    id: "wenderson-luiz-vieira",
    author: "Wenderson luiz Vieira",
    text: "Melhor profissional do universo.\nJá trato com a Dra. Denise a quase 20 anos e o Dr. Gabriel faz com que problemas complicados e dolorosos, se tornem simples, pela sabedoria, competência e …",
    status: "incomplete",
    rating: null,
    source: "google",
  },
  {
    id: "ankelly-marques",
    author: "Ankelly Marques",
    text: "Atendimento de excelência em todos os aspectos, tanto no ato da marcação da consulta quanto na recepção, ambiente e tratamento.\nAtenção aos detalhes, interesse emouvir o paciente, averiguação completa, …",
    status: "incomplete",
    rating: null,
    source: "google",
  },
  {
    id: "ana-luiza-amaral-cornelio",
    author: "ana luiza amaral cornelio",
    text: "Minha filha extraiu os sisos com o Dr. Gabriel e a cirurgia foi muito exitosas. Como os inferiores estavam parcialmente oclusos e em posição muito próxima do nervo facial ele solicitou exames complementares. …",
    status: "incomplete",
    rating: null,
    source: "google",
  },
];

/** Somente avaliações com texto integral vão para o site. */
export const publishedReviews = reviews.filter((r) => r.status === "complete");

/**
 * Painel de avaliações da Clínica Dentarium no Google (link fornecido pelo
 * responsável pelo projeto). O trecho `#lrd=` abre a lista de avaliações do
 * local, onde também fica o botão "Escrever uma avaliação".
 */
const GOOGLE_REVIEWS_PANEL =
  "https://www.google.com/search?q=dentarium+bh#lrd=0xa699be9f59bc37:0xe0a2f87764437ea3,1,,,,";

export const googleReviewLinks: { reviewsUrl: string | null; writeReviewUrl: string | null } = {
  reviewsUrl: GOOGLE_REVIEWS_PANEL,
  writeReviewUrl: GOOGLE_REVIEWS_PANEL,
};
