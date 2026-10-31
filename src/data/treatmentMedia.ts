/**
 * Imagens usadas dentro das páginas individuais de tratamento.
 *
 * Origem de cada arquivo:
 * - "site-anterior": material publicado no site oficial anterior da clínica.
 *   O uso no novo site depende de confirmação da licença com a clínica
 *   (ver docs/REVISAO_CONTEUDO_DENTARIUM.md). Nenhuma delas mostra paciente
 *   identificável, procedimento em andamento ou antes e depois, exceto as
 *   marcadas em comentário (autorização informada pelo responsável).
 * - "licenciada": banco de imagens com licença aberta. Exibe crédito, licença
 *   e link para a fonte, como a licença exige.
 *
 * Arquivos que dependem de autorização de pessoas retratadas ou que não são
 * adequados à publicidade odontológica ficam fora deste arquivo, listados em
 * `reviewOnlyMedia`, e nunca são importados nas páginas.
 */
import type { StaticImageData } from "next/image";

import implante from "../../public/images/dentarium/implante.jpg";
import proteseFixaDentadura from "../../public/images/dentarium/protese-fixa-dentadura.jpg";
import lentesPorcelana from "../../public/images/dentarium/lentes-de-contato-de-porcelana.jpg";
import preNatal from "../../public/images/dentarium/pre-natal-odontologico.png";
import dentariumKids from "../../public/images/dentarium/odontologia-bh-dentarium-kids.png";
import protetorEsportivo from "../../public/images/dentarium/odontologia-bh-protetor-bucal-esportivo.png";
import alinhador from "../../public/images/licenciadas/aligner-on-table-v2.jpg";

export type MediaCredit = {
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

export type TreatmentMedia = {
  src: StaticImageData;
  alt: string;
  caption: string;
  origin: "site-anterior" | "licenciada";
  /** Obrigatório para imagens licenciadas. */
  credit?: MediaCredit;
  /** Fundo da moldura: as ilustrações têm fundo branco e pedem uma "prancha" clara. */
  plate: "white" | "photo";
  /** Largura máxima exibida, em px: nunca maior que o arquivo original. */
  maxWidth: number;
};

export const treatmentMedia = {
  implante: {
    src: implante,
    alt: "Ilustração de um implante dentário: parafuso de titânio no osso sustentando uma coroa entre dois dentes naturais.",
    caption: "Ilustração da estrutura de um implante, sem valor de resultado clínico.",
    origin: "site-anterior",
    plate: "white",
    maxWidth: 560,
  },
  proteseFixaDentadura: {
    src: proteseFixaDentadura,
    alt: "Ilustração de uma dentadura inferior apoiada sobre quatro implantes com encaixes.",
    caption: "Ilustração de dentadura apoiada em implantes. A alternativa indicada depende de avaliação.",
    origin: "site-anterior",
    plate: "white",
    maxWidth: 440,
  },
  lentesPorcelana: {
    src: lentesPorcelana,
    alt: "Sorriso em close, com dentes claros e lábios em tom rosado, sobre fundo branco.",
    caption: "Imagem ilustrativa. Não é um caso tratado na Dentarium.",
    origin: "site-anterior",
    plate: "white",
    maxWidth: 460,
  },
  preNatal: {
    src: preNatal,
    alt: "Gestante segurando um coração de papel vermelho junto à barriga.",
    caption: "Cuidado odontológico também durante a gravidez.",
    origin: "site-anterior",
    plate: "white",
    maxWidth: 420,
  },
  /**
   * Publicada a pedido do responsável pelo projeto (30/10/2026). Mostra uma
   * paciente menor de idade em atendimento: depende de autorização dos
   * responsáveis legais e de conferência com as regras de publicidade do CFO
   * antes da publicação oficial.
   */
  dentariumKids: {
    src: dentariumKids,
    alt: "Odontopediatra de touca colorida atende uma menina sentada na cadeira odontológica.",
    caption: "Atendimento no Dentarium Kids.",
    origin: "site-anterior",
    plate: "white",
    maxWidth: 460,
  },
  /**
   * Foto do site anterior com pessoa identificável: autorização de uso
   * informada pelo responsável pelo projeto em 2026-10-31.
   */
  protetorEsportivo: {
    src: protetorEsportivo,
    alt: "Lutador de jiu-jítsu de quimono branco, em posição de guarda, usando um protetor bucal azul.",
    caption: "Protetor bucal em uso no esporte de contato.",
    origin: "site-anterior",
    plate: "photo",
    maxWidth: 460,
  },
  alinhador: {
    src: alinhador,
    alt: "Alinhador ortodôntico transparente sobre uma superfície branca.",
    caption: "Imagem ilustrativa de um alinhador transparente. Não representa a marca nem o produto utilizado na Dentarium.",
    origin: "licenciada",
    credit: {
      author: "ClearCorrect",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.pt-br",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Aligner_on_Table_v2_(2).jpg",
    },
    plate: "white",
    maxWidth: 620,
  },
} satisfies Record<string, TreatmentMedia>;

export type TreatmentMediaKey = keyof typeof treatmentMedia;

/** Diagramas educativos desenhados em SVG (src/components/treatments/ToothDiagram.tsx). */
export type DiagramKey = "camadas" | "canal" | "gengiva" | "siso";

/**
 * Arquivos recebidos que NÃO são publicados. Ficam registrados aqui para a
 * revisão com a clínica; nenhum é importado pelo site.
 */
export const reviewOnlyMedia = [
  {
    file: "public/images/dentarium/placas-de-bruxismo-dentarium.jpg",
    treatment: "placas-de-bruxismo",
    status: "não publicar",
    reason: "Fotografia clínica intraoral, com aparência antiga e pouca qualidade para divulgação.",
  },
  {
    file: "public/images/dentarium/manutencao-preventiva.png",
    treatment: "manutencao-preventiva",
    status: "não publicar",
    reason: "Comparações clínicas de tártaro e manchas, inadequadas à divulgação institucional.",
  },
  {
    file: "public/images/dentarium/claremento-dental.png",
    treatment: "clareamento",
    status: "não publicar",
    reason: "Comparação de antes e depois, vedada como promessa de resultado.",
  },
] as const;
