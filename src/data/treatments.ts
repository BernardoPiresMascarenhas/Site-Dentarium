/**
 * Catálogo de tratamentos da Dentarium.
 *
 * Os textos combinam explicações gerais com o conteúdo do site oficial
 * anterior (ver info-dentarium.pdf e docs/REVISAO_CONTEUDO_DENTARIUM.md).
 * Afirmações do material antigo que dependem de comprovação — prazos,
 * durabilidade, "indolor", indicações específicas — ficaram de fora e estão
 * registradas como pendência. Nada aqui promete resultado; todo o conteúdo
 * precisa de revisão do responsável técnico antes de publicar.
 */
import type { ClinicImageKey } from "./images";
import type { DiagramKey, TreatmentMediaKey } from "./treatmentMedia";

export type TreatmentCategory = {
  id: string;
  name: string;
  description: string;
};

export const categories = [
  {
    id: "prevencao",
    name: "Prevenção e saúde bucal",
    description: "Consultas, acompanhamento e cuidado com gengivas e tecidos de suporte.",
  },
  {
    id: "estetica",
    name: "Estética",
    description: "Cor, forma e harmonia do sorriso, planejadas a partir de uma base saudável.",
  },
  {
    id: "reabilitacao",
    name: "Reabilitação",
    description: "Reposição de dentes e de estruturas perdidas para recuperar função.",
  },
  {
    id: "funcao",
    name: "Função e alinhamento",
    description: "Mordida, posição dos dentes e proteção contra desgaste e impacto.",
  },
  {
    id: "clinica",
    name: "Procedimentos clínicos",
    description: "Tratamento de canal, cirurgia de terceiros molares e laserterapia.",
  },
  {
    id: "criancas",
    name: "Crianças",
    description: "Dentarium Kids: do pré-natal odontológico ao acompanhamento da infância.",
  },
] as const satisfies readonly TreatmentCategory[];

export type CategoryId = (typeof categories)[number]["id"];

/** Link interno exibido ao fim de um bloco. */
export type TreatmentLink = { href: string; label: string };

/** Seção aprofundada da página: modalidade, técnica ou recurso do tratamento. */
export type TreatmentDetail = {
  /** Âncora da seção (ex.: /tratamentos/proteses#retencao-de-dentaduras). */
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  /** Imagem de apoio, exibida ao lado do texto. */
  media?: TreatmentMediaKey;
  link?: TreatmentLink;
};

/**
 * Bloco editorial próprio de cada tratamento, exibido depois da abertura.
 * - split: imagem, foto ou diagrama ao lado do texto, com partes numeradas.
 * - flow: sequência horizontal de partes (ex.: como a luz age nos tecidos).
 * - facts: partes lado a lado, sem ordem.
 * - stages: fases da vida, com links para as seções da página.
 */
export type TreatmentFeature = {
  id: string;
  style: "split" | "flow" | "facts" | "stages";
  kicker: string;
  title: string;
  paragraphs?: string[];
  parts?: { label: string; text: string; href?: string }[];
  media?: TreatmentMediaKey;
  clinicImage?: ClinicImageKey;
  diagram?: DiagramKey;
  /** Observação em destaque (ex.: marca citada no material histórico). */
  note?: { title: string; text: string };
  link?: TreatmentLink;
};

export type Treatment = {
  slug: string;
  name: string;
  category: CategoryId;
  /** Frase curta para cartões e listas. */
  summary: string;
  /** Parágrafo de abertura da página individual. */
  intro: string;
  /** Situações em que vale conversar com o dentista — nunca uma indicação. */
  whenToTalk: string[];
  /** Visão geral, em etapas, de como o tratamento costuma ser conduzido. */
  overview: { title: string; text: string }[];
  /** Títulos próprios da página, no lugar dos genéricos. */
  headings?: { when?: string; steps?: string; care?: string; faq?: string };
  /** Composição da página. Os padrões são lista, lista e blocos empilhados. */
  layout?: {
    when?: "list" | "cards";
    steps?: "list" | "timeline" | "cycle";
    details?: "stack" | "compare";
    /** Mostra as seções aprofundadas antes do bloco editorial e das etapas. */
    detailsFirst?: boolean;
  };
  feature?: TreatmentFeature;
  /** Título do bloco de seções aprofundadas. */
  detailsTitle?: string;
  /**
   * Entrada única no índice "Nesta página" para todo o bloco de seções
   * aprofundadas, no lugar de uma entrada por seção (evita rótulos repetidos).
   */
  detailsNav?: { id: string; label: string };
  details?: TreatmentDetail[];
  /** Cuidados e informações importantes. */
  care?: string[];
  faq: { question: string; answer: string }[];
  /** Assunto da mensagem pronta do WhatsApp (ex.: "o tratamento de implantes dentários"). */
  whatsappTopic?: string;
  /** Termos alternativos usados pela busca. */
  keywords?: string[];
  related: string[];
  featured?: boolean;
  /** Nome alternativo usado no site anterior, quando houver. */
  alsoKnownAs?: string;
};

export const treatments: Treatment[] = [
  {
    slug: "implantes",
    name: "Implantes",
    category: "reabilitacao",
    featured: true,
    summary: "Reposição de dentes perdidos com uma raiz artificial que sustenta a coroa.",
    intro:
      "O implante dentário é uma peça, geralmente de titânio, instalada no osso para fazer o papel da raiz de um dente ausente. Sobre ele é fixada uma coroa ou outra prótese. Se ele é uma boa opção para você depende da avaliação da saúde geral, da gengiva e da quantidade de osso disponível.",
    whenToTalk: [
      "Você perdeu um ou mais dentes e quer entender as alternativas de reposição.",
      "Usa uma prótese removível e gostaria de saber se há outras possibilidades.",
      "Tem um dente com indicação de extração e quer planejar o que vem depois.",
    ],
    overview: [
      {
        title: "Avaliação e exames",
        text: "Conversa sobre histórico de saúde, exame clínico e, quando necessário, exames de imagem para avaliar o osso. A avaliação individual vem antes de qualquer planejamento.",
      },
      {
        title: "Planejamento",
        text: "Definição da posição do implante e do tipo de prótese, considerando a mordida e os dentes vizinhos.",
      },
      {
        title: "Instalação e cicatrização",
        text: "O implante é instalado em procedimento cirúrgico. Segue-se um período de integração ao osso, que varia de pessoa para pessoa.",
      },
      {
        title: "Prótese e acompanhamento",
        text: "A coroa ou prótese é confeccionada e instalada. Revisões periódicas ajudam a manter gengiva e implante saudáveis.",
      },
    ],
    faq: [
      {
        question: "Qualquer pessoa pode fazer implante?",
        answer:
          "Não necessariamente. Condições de saúde, hábitos e a quantidade de osso influenciam a indicação. Por isso a avaliação individual vem antes de qualquer planejamento.",
      },
      {
        question: "E se faltar osso no local?",
        answer:
          "Em alguns casos é possível considerar enxertos antes ou durante a instalação. O cirurgião-dentista explica as alternativas depois de examinar a região.",
      },
    ],
    detailsTitle: "Implantes no conjunto do tratamento",
    details: [
      {
        id: "quando-falta-osso",
        title: "Quando falta osso",
        paragraphs: [
          "Depois da perda de um dente, o osso da região pode diminuir de altura ou de espessura. Nesses casos, um enxerto ósseo pode ser planejado para criar condições de instalar o implante.",
        ],
        link: { href: "/tratamentos/enxertos#enxerto-osseo", label: "Enxerto ósseo" },
      },
      {
        id: "implantes-e-dentaduras",
        title: "Implantes e dentaduras",
        paragraphs: [
          "Implantes também podem servir de apoio para dentaduras, aumentando a retenção e a estabilidade da prótese.",
        ],
        link: { href: "/tratamentos/proteses#retencao-de-dentaduras", label: "Retenção de dentaduras" },
      },
    ],
    keywords: ["implante dentário", "dente perdido", "reposição de dentes", "osseointegração"],
    headings: {
      when: "Quando considerar um implante dentário?",
      steps: "Da avaliação à prótese, etapa por etapa",
      care: "Antes de decidir",
      faq: "Dúvidas sobre implantes",
    },
    layout: { steps: "timeline" },
    feature: {
      id: "estrutura-do-implante",
      style: "split",
      kicker: "Como é um implante",
      title: "Três partes que trabalham juntas.",
      paragraphs: [
        "O implante substitui a raiz do dente. É sobre ele que a parte visível (a coroa ou outra prótese) é fixada, por meio de um componente de ligação.",
        "Posição, tipo de prótese e materiais são definidos no planejamento, a partir dos exames de cada paciente.",
      ],
      parts: [
        { label: "Implante", text: "Peça, geralmente de titânio, instalada no osso no lugar da raiz." },
        { label: "Componente de ligação", text: "Conecta o implante à prótese." },
        { label: "Coroa ou prótese", text: "A parte visível, confeccionada para o sorriso e a mordida de cada pessoa." },
      ],
      media: "implante",
    },
    care: [
      "O tempo de integração ao osso e o número de etapas variam de pessoa para pessoa.",
      "Condições de saúde, hábitos e a quantidade de osso influenciam a indicação.",
      "Implantes também precisam de higiene diária e de revisões periódicas.",
    ],
    whatsappTopic: "o tratamento de implantes dentários",
    related: ["enxertos", "proteses", "manutencao-preventiva"],
  },
  {
    slug: "ortodontia",
    name: "Ortodontia",
    category: "funcao",
    featured: true,
    summary: "Correção da posição dos dentes e da mordida com aparelhos fixos ou alinhadores transparentes.",
    intro:
      "A ortodontia trata do posicionamento dos dentes e da relação entre as arcadas. Além da aparência, o alinhamento interfere na mastigação, na higiene e na distribuição de forças sobre os dentes. Existem diferentes tipos de aparelho, dos fixos convencionais aos alinhadores transparentes, e a escolha depende do diagnóstico de cada caso.",
    whenToTalk: [
      "Seus dentes estão apinhados, espaçados ou desalinhados.",
      "Você percebe que a mordida não encaixa como deveria.",
      "Quer avaliar o desenvolvimento da arcada de uma criança ou adolescente.",
    ],
    overview: [
      {
        title: "Diagnóstico ortodôntico",
        text: "Exame clínico, fotografias e exames de imagem ajudam a entender a posição dos dentes e dos ossos.",
      },
      {
        title: "Planejamento e escolha do aparelho",
        text: "O tipo de aparelho é definido junto com você, considerando as necessidades do caso e sua rotina. No caso dos alinhadores, o planejamento digital define a sequência de placas.",
      },
      {
        title: "Consultas de ajuste",
        text: "O tratamento é acompanhado em consultas periódicas, nas quais o aparelho é ajustado ou a evolução dos alinhadores é conferida.",
      },
      {
        title: "Contenção",
        text: "Ao final, uma contenção ajuda a manter os dentes na nova posição.",
      },
    ],
    faq: [
      {
        question: "Existe idade certa para começar?",
        answer:
          "A ortodontia pode ser feita em diferentes fases da vida. Em crianças, a avaliação precoce ajuda a acompanhar o crescimento; em adultos, o tratamento também é possível.",
      },
      {
        question: "Alinhadores transparentes servem para qualquer caso?",
        answer:
          "Não necessariamente. A indicação depende do tipo de correção necessária, que só é definida no diagnóstico ortodôntico. Em alguns casos, o aparelho fixo pode ser a alternativa mais adequada.",
      },
      {
        question: "Quanto tempo dura o tratamento?",
        answer:
          "Varia bastante de um caso para outro. Uma estimativa só pode ser dada depois do diagnóstico ortodôntico.",
      },
    ],
    keywords: ["aparelho", "aparelho ortodôntico", "dentes tortos", "mordida", "alinhamento", "alinhador", "alinhadores transparentes", "aparelho invisível"],
    headings: {
      when: "Quando avaliar o alinhamento dos dentes?",
      steps: "Do diagnóstico à contenção",
      faq: "Dúvidas sobre ortodontia",
    },
    layout: { details: "compare", detailsFirst: true },
    detailsTitle: "Quais opções existem para alinhar os dentes?",
    detailsNav: { id: "tipos-de-aparelhos", label: "Tipos de aparelhos" },
    details: [
      {
        id: "aparelho-fixo",
        title: "Aparelho fixo convencional",
        paragraphs: [
          "Pequenas peças, os bráquetes, são coladas aos dentes e ligadas por um fio. Os ajustes feitos nas consultas orientam a movimentação dos dentes.",
          "Fica instalado durante todo o tratamento e é removido apenas pelo dentista.",
        ],
      },
      {
        id: "alinhadores",
        title: "Alinhadores transparentes",
        paragraphs: [
          "Placas transparentes e removíveis, feitas sob medida a partir de um planejamento digital. Cada placa da sequência promove uma pequena movimentação dos dentes.",
          "São retiradas para comer e escovar os dentes e dependem do uso pelo tempo orientado pelo dentista.",
        ],
        link: { href: "#alinhadores-transparentes", label: "Saiba mais sobre alinhadores" },
      },
    ],
    feature: {
      id: "alinhadores-transparentes",
      style: "split",
      kicker: "Alinhadores transparentes",
      title: "Discretos, removíveis e planejados no computador.",
      paragraphs: [
        "Os alinhadores são placas finas e transparentes que se encaixam sobre os dentes. Em vez de bráquetes e fio, o tratamento usa uma sequência de placas, trocadas conforme a orientação do ortodontista.",
        "O planejamento é individualizado: parte do diagnóstico ortodôntico e dos registros digitais da arcada de cada paciente para definir a sequência de placas. Nas consultas de acompanhamento, o ortodontista confere a evolução e pode ajustar o planejamento ao longo do tratamento.",
      ],
      parts: [
        { label: "Diferença dos convencionais", text: "São transparentes e removíveis; o aparelho fixo permanece colado aos dentes." },
        { label: "Planejamento", text: "Feito para cada paciente e dividido em etapas, uma para cada placa. O acompanhamento permite ajustes durante o tratamento." },
        { label: "Indicação", text: "Nem todo caso é indicado para alinhadores. A decisão depende da avaliação ortodôntica." },
      ],
      media: "alinhador",
    },
    care: [
      "Alinhadores só funcionam quando usados pelo tempo orientado pelo dentista.",
      "Aparelho fixo e alinhadores pedem cuidado redobrado com a escovação e o fio dental.",
      "Duração, tipo de aparelho e frequência das consultas são definidos no diagnóstico.",
    ],
    related: ["placas-de-bruxismo", "odontopediatria", "primeira-consulta"],
  },
  {
    slug: "clareamento",
    name: "Clareamento",
    category: "estetica",
    featured: true,
    summary: "Redução de manchas e escurecimento dos dentes com acompanhamento profissional.",
    intro:
      "Cada vez mais procurado, o clareamento dental está ligado à aparência e à autoestima. O gel clareador age na dentina, o tecido do dente que retém pigmentos de alimentos e bebidas responsáveis pelo tom amarelado, e atenua essa coloração. Pode ser feito no consultório, em casa com moldeiras sob medida ou combinando as duas formas, sempre depois de verificar se dentes e gengivas estão saudáveis.",
    whenToTalk: [
      "Você nota que a cor dos dentes escureceu com o tempo.",
      "Quer saber se restaurações ou próteses existentes acompanhariam a mudança de cor.",
      "Tem sensibilidade e quer entender como isso influencia o clareamento.",
    ],
    overview: [
      {
        title: "Avaliação prévia",
        text: "Verificação de cáries, restaurações e sensibilidade, que podem exigir cuidados antes do clareamento.",
      },
      {
        title: "Escolha da técnica",
        text: "Consultório, caseiro supervisionado ou combinado: a técnica é escolhida conforme o caso.",
      },
      {
        title: "Acompanhamento",
        text: "O dentista acompanha a evolução e orienta sobre sensibilidade e cuidados durante o processo.",
      },
    ],
    faq: [
      {
        question: "O clareamento muda a cor de restaurações?",
        answer:
          "Não. Restaurações, facetas e coroas mantêm a cor original, o que deve ser considerado no planejamento.",
      },
      {
        question: "Posso usar produtos clareadores por conta própria?",
        answer:
          "O ideal é que qualquer clareamento seja indicado e acompanhado por um cirurgião-dentista, que avalia riscos e a técnica mais adequada.",
      },
    ],
    detailsTitle: "Duas técnicas, sempre com acompanhamento",
    details: [
      {
        id: "clareamento-em-consultorio",
        title: "Clareamento em consultório",
        paragraphs: [
          "Também chamado de clareamento imediato, é feito na própria clínica. O dentista aplica um gel clareador mais concentrado que o de uso caseiro e utiliza luz de LED, que ajuda a acelerar a reação química de clareamento.",
          "Todo o processo acontece sob a supervisão direta do profissional.",
        ],
      },
      {
        id: "clareamento-caseiro",
        title: "Clareamento caseiro supervisionado",
        paragraphs: [
          "Também chamado de clareamento mediato. O paciente recebe moldeiras feitas sob medida e aplica o gel clareador em casa, no horário que preferir, seguindo as orientações e o acompanhamento do dentista.",
          "As duas técnicas também podem ser combinadas, conforme a avaliação.",
        ],
      },
    ],
    care: [
      "Restaurações, facetas e coroas não mudam de cor com o clareamento.",
      "Sensibilidade durante o processo pode acontecer e deve ser comunicada ao dentista.",
      "A técnica, a concentração do gel e o número de sessões são definidos na avaliação.",
    ],
    keywords: ["clareamento dental", "dentes amarelados", "manchas", "LED", "moldeira"],
    headings: {
      when: "Quando procurar uma avaliação para clareamento?",
      steps: "Como o clareamento é conduzido",
      care: "O que saber antes de clarear",
      faq: "Dúvidas sobre clareamento",
    },
    layout: { details: "compare" },
    feature: {
      id: "como-age",
      style: "split",
      kicker: "Como o clareamento age",
      title: "A cor do dente vem de dentro.",
      paragraphs: [
        "Pigmentos de alimentos e bebidas ficam retidos na dentina, o tecido logo abaixo do esmalte. É nela que o gel clareador age, atenuando o tom amarelado.",
        "Por isso a avaliação vem antes: cáries, restaurações, retração da gengiva e sensibilidade influenciam a técnica e os cuidados de cada caso.",
      ],
      parts: [
        { label: "Esmalte", text: "Camada externa e translúcida, que deixa a cor da dentina aparecer." },
        { label: "Dentina", text: "Retém os pigmentos responsáveis pelo tom amarelado. É onde o gel clareador age." },
      ],
      diagram: "camadas",
    },
    related: ["facetas-e-lentes", "planejamento-digital-do-sorriso", "manutencao-preventiva"],
  },
  {
    slug: "proteses",
    name: "Próteses",
    category: "reabilitacao",
    featured: true,
    summary: "Coroas, pontes e próteses para recuperar dentes perdidos ou muito desgastados.",
    intro:
      "A perda de dentes vai além da estética: pode prejudicar a fala e a mastigação, levar à movimentação dos dentes que restaram e à perda de osso na região. As próteses dentárias substituem dentes ausentes ou muito comprometidos para recuperar função e aparência. Cada caso é analisado considerando os hábitos e o histórico de saúde do paciente, e diferentes materiais podem ser usados.",
    whenToTalk: [
      "Um dente está muito destruído ou fraturado.",
      "Você perdeu dentes e sente dificuldade para mastigar.",
      "Sua prótese atual está desconfortável, solta ou desgastada.",
    ],
    overview: [
      {
        title: "Avaliação",
        text: "Exame dos dentes remanescentes, da gengiva e da mordida para definir o tipo de prótese.",
      },
      {
        title: "Preparo e moldagem",
        text: "Quando necessário, os dentes de apoio são preparados e a região é registrada por moldagem ou escaneamento.",
      },
      {
        title: "Confecção e ajustes",
        text: "A prótese é confeccionada e provada, com ajustes de encaixe, mordida e estética.",
      },
      {
        title: "Manutenção",
        text: "Consultas de revisão ajudam a conservar a prótese e a saúde dos tecidos ao redor.",
      },
    ],
    faq: [
      {
        question: "A falta de dentes pode me prejudicar?",
        answer:
          "Sim. Além da aparência, a ausência de dentes pode afetar a fala e a mastigação, favorecer a movimentação dos dentes vizinhos e a perda de osso na região. Por isso vale avaliar as alternativas de reposição.",
      },
      {
        question: "Prótese fixa ou removível: qual é melhor?",
        answer:
          "Depende de quantos dentes faltam, da condição dos dentes de apoio e do osso. Cada alternativa tem vantagens e limitações, apresentadas na avaliação.",
      },
    ],
    detailsTitle: "Como recuperar a função e a estética do sorriso?",
    details: [
      {
        id: "fixas-e-removiveis",
        title: "Próteses fixas e removíveis",
        paragraphs: [
          "A prótese fixa é uma estrutura parafusada ou cimentada sobre implantes ou dentes naturais, e não é retirada pelo paciente. A prótese removível pode ser colocada e retirada para higiene. A escolha depende de quantos dentes faltam, das condições dos dentes de apoio e do osso.",
        ],
      },
      {
        id: "retencao-de-dentaduras",
        title: "Mais retenção para dentaduras",
        paragraphs: [
          "Conviver com uma dentadura que se movimenta exige atenção constante. Uma das alternativas é a dentadura apoiada em implantes, que aumenta a retenção e a estabilidade da prótese e pode ajudar a reduzir a perda óssea.",
          "O planejamento parte de um estudo da arcada dentária, que pode ser complementado pelo planejamento digital do sorriso, buscando um resultado natural e confortável.",
        ],
        media: "proteseFixaDentadura",
        link: { href: "/tratamentos/implantes", label: "Como funcionam os implantes" },
      },
      {
        id: "laboratorio",
        title: "Confecção no laboratório",
        paragraphs: [
          "Cada sorriso e cada arcada têm características próprias, e considerá-las na confecção é fundamental para uma aparência natural. A Dentarium conta com laboratório de prótese, e algumas peças podem ser produzidas pelo sistema CAD/CAM.",
        ],
        link: { href: "/tecnologia#cad-cam", label: "CAD/CAM em três etapas" },
      },
    ],
    care: [
      "Próteses precisam de higiene diária e de revisões periódicas.",
      "Desconforto, folga ou desgaste da prótese são motivos para uma consulta de revisão.",
    ],
    keywords: ["dentadura", "retenção de dentadura", "dentadura sobre implante", "prótese fixa", "prótese removível", "coroa", "ponte"],
    headings: {
      when: "Quando avaliar uma prótese?",
      steps: "Da avaliação à manutenção",
      faq: "Dúvidas sobre próteses",
    },
    layout: { steps: "timeline" },
    related: ["implantes", "enxertos", "planejamento-digital-do-sorriso"],
  },
  {
    slug: "tratamento-de-canal",
    name: "Tratamento de canal",
    alsoKnownAs: "Endodontia",
    category: "clinica",
    featured: true,
    summary: "Tratamento do interior do dente quando a polpa está inflamada ou infectada.",
    intro:
      "A endodontia, conhecida como tratamento de canal, cuida da polpa, o tecido no interior do dente. Quando ela inflama ou infecciona, por exemplo após uma cárie profunda ou uma fratura, o tratamento remove o tecido comprometido, limpa e sela os canais, buscando preservar o dente.",
    whenToTalk: [
      "Você sente dor persistente ou sensibilidade prolongada ao quente ou ao frio.",
      "Um dente escureceu ou houve inchaço na gengiva próxima a ele.",
      "Teve uma fratura ou uma cárie profunda.",
    ],
    overview: [
      {
        title: "Diagnóstico",
        text: "Exame clínico e radiografias para avaliar a polpa e os tecidos ao redor da raiz.",
      },
      {
        title: "Limpeza e modelagem",
        text: "Com anestesia, o tecido comprometido é removido e os canais são limpos e modelados.",
      },
      {
        title: "Obturação",
        text: "Os canais são preenchidos e selados para evitar nova contaminação.",
      },
      {
        title: "Restauração do dente",
        text: "Depois do canal, o dente precisa ser restaurado, às vezes com uma coroa, para recuperar resistência.",
      },
    ],
    faq: [
      {
        question: "O tratamento de canal é feito em uma única sessão?",
        answer:
          "Depende do dente e da situação clínica. Alguns casos são concluídos em uma sessão; outros pedem mais de uma.",
      },
      {
        question: "Por que restaurar o dente depois?",
        answer:
          "O dente tratado pode ficar mais frágil. A restauração adequada protege contra fraturas e infiltrações.",
      },
    ],
    care: [
      "Exames de imagem e recursos específicos da endodontia apoiam o profissional durante o tratamento.",
      "Após o canal, siga as orientações sobre a restauração definitiva do dente.",
    ],
    keywords: ["endodontia", "canal", "dor de dente", "polpa", "nervo do dente"],
    headings: {
      when: "Quando o tratamento de canal pode ser necessário?",
      steps: "Como o canal é tratado",
      care: "Depois do tratamento",
      faq: "Dúvidas sobre tratamento de canal",
    },
    layout: { steps: "timeline" },
    feature: {
      id: "dentro-do-dente",
      style: "split",
      kicker: "Por dentro do dente",
      title: "O tratamento acontece onde não se vê.",
      paragraphs: [
        "Sob o esmalte e a dentina fica a polpa, um tecido com vasos e nervos que se estende pelos canais da raiz. Quando ela inflama ou infecciona, o tratamento remove o tecido comprometido e sela os canais.",
        "Exames de imagem e recursos próprios da endodontia apoiam o profissional em um espaço tão pequeno.",
      ],
      parts: [
        { label: "Polpa", text: "Tecido no interior do dente. É ela que pode inflamar após cárie profunda ou fratura." },
        { label: "Canal da raiz", text: "É limpo, modelado e preenchido para evitar nova contaminação." },
      ],
      diagram: "canal",
      link: { href: "/tecnologia", label: "Recursos usados na clínica" },
    },
    related: ["proteses", "primeira-consulta"],
  },
  {
    slug: "odontopediatria",
    name: "Odontopediatria",
    alsoKnownAs: "Dentarium Kids",
    category: "criancas",
    featured: true,
    summary: "Cuidado com a saúde bucal de bebês, crianças e adolescentes.",
    intro:
      "A odontopediatria acompanha a saúde bucal desde a gestação e os primeiros dentes até a adolescência. Mais do que tratar, o foco é prevenir: observar o desenvolvimento da arcada e orientar a família sobre alimentação, higiene e hábitos. Na Dentarium, esse atendimento se chama Dentarium Kids.",
    whenToTalk: [
      "Os primeiros dentes do bebê estão nascendo.",
      "Você tem dúvidas sobre escovação, uso de chupeta ou hábitos da criança.",
      "Notou manchas, dor ou alterações nos dentes de leite.",
    ],
    overview: [
      {
        title: "Adaptação",
        text: "As primeiras consultas buscam criar familiaridade da criança com o ambiente e a equipe.",
      },
      {
        title: "Prevenção",
        text: "Orientação de higiene e alimentação para a família, além de medidas preventivas indicadas pelo dentista.",
      },
      {
        title: "Acompanhamento do desenvolvimento",
        text: "Observação da troca dos dentes e do crescimento, com encaminhamento quando necessário.",
      },
    ],
    faq: [
      {
        question: "Quando levar a criança ao dentista pela primeira vez?",
        answer:
          "É comum recomendar a primeira visita por volta do nascimento dos primeiros dentes. O odontopediatra orienta a frequência ideal para cada criança.",
      },
      {
        question: "Gestantes podem ir ao dentista?",
        answer:
          "Sim, e o acompanhamento é recomendado. No pré-natal odontológico, o dentista cuida da saúde bucal da gestante e orienta sobre os primeiros cuidados com o bebê. Informe sempre a gestação e o período ao agendar.",
      },
      {
        question: "Dentes de leite precisam de tratamento se vão cair?",
        answer:
          "Sim. Eles participam da mastigação, da fala e guardam espaço para os dentes permanentes.",
      },
    ],
    detailsTitle: "Cuidado em cada fase",
    details: [
      {
        id: "pre-natal-odontologico",
        title: "Pré-natal odontológico",
        paragraphs: [
          "A gestação pede cuidados específicos, inclusive com a boca. Algumas alterações, como a inflamação da gengiva, tendem a ser mais frequentes nesse período e merecem atenção também pela saúde do bebê.",
          "O acompanhamento odontológico durante a gravidez é também o momento de receber orientações sobre os primeiros cuidados com a saúde bucal do recém-nascido.",
        ],
        points: [
          "Informe a gestação e o período ao agendar.",
          "Informe também os medicamentos em uso.",
        ],
        media: "preNatal",
      },
      {
        id: "dentarium-kids",
        title: "Dentarium Kids",
        paragraphs: [
          "Para os pequenos, o atendimento usa brinquedos e acessórios lúdicos que criam um ambiente descontraído durante a consulta.",
          "O vínculo de confiança entre a criança e o odontopediatra é construído a cada visita, para que ir ao dentista seja uma experiência mais tranquila.",
        ],
        media: "dentariumKids",
      },
      {
        id: "acompanhamento-pediatrico",
        title: "Acompanhamento pediátrico",
        paragraphs: [
          "O acompanhamento tem foco na prevenção, e não apenas no tratamento de doenças. Ele permite identificar cedo alterações nos dentes e no desenvolvimento, abrindo espaço para abordagens preventivas desde o nascimento dos primeiros dentes.",
          "Com orientação e compreensão da importância de cuidados como a escovação, a própria criança começa a assumir responsabilidade pela sua saúde bucal, o que ajuda a prevenir cáries e outros problemas.",
        ],
      },
    ],
    keywords: ["Dentarium Kids", "criança", "bebê", "dentista infantil", "pré-natal odontológico", "gestante", "gravidez", "acompanhamento pediátrico"],
    headings: {
      when: "Quando levar a criança ao dentista?",
      steps: "Como o acompanhamento acontece",
      faq: "Dúvidas das famílias",
    },
    layout: { when: "cards" },
    feature: {
      id: "fases",
      style: "stages",
      kicker: "Dentarium Kids",
      title: "Da gestação à adolescência.",
      paragraphs: [
        "O cuidado começa antes do primeiro dente e acompanha a criança enquanto ela cresce, com um ambiente descontraído e uma relação de confiança construída a cada visita.",
      ],
      parts: [
        { label: "Gestação", text: "Pré-natal odontológico: saúde bucal da gestante e orientações para o bebê.", href: "#pre-natal-odontologico" },
        { label: "Primeiros dentes", text: "Primeiras visitas, adaptação e orientação à família.", href: "#dentarium-kids" },
        { label: "Infância e adolescência", text: "Prevenção e acompanhamento da troca dos dentes e do crescimento.", href: "#acompanhamento-pediatrico" },
      ],
    },
    whatsappTopic: "o atendimento de odontopediatria (Dentarium Kids)",
    related: ["ortodontia", "manutencao-preventiva", "protetores-esportivos"],
  },
  {
    slug: "primeira-consulta",
    name: "Primeira consulta",
    category: "prevencao",
    summary: "Conversa, exame clínico e orientação sobre os próximos passos.",
    intro:
      "A primeira consulta é essencial para que o dentista conheça o seu histórico e os aspectos que compõem a sua saúde bucal. Antes de começar qualquer tratamento, é importante conhecer a fundo o paciente: por isso ela inclui a anamnese, um levantamento da sua saúde geral, além do exame clínico.",
    whenToTalk: [
      "Faz tempo desde sua última consulta.",
      "Você mudou de cidade ou de dentista e quer uma nova avaliação.",
      "Tem uma queixa específica e quer entender a causa.",
    ],
    overview: [
      {
        title: "Conversa e anamnese",
        text: "Seu motivo de consulta, expectativas e histórico de saúde, como diabetes, hipertensão, problemas cardíacos e medicamentos em uso. Essas informações orientam a segurança do tratamento.",
      },
      {
        title: "Exame clínico e registros",
        text: "Avaliação de dentes, gengivas, mucosas e mordida. Quando necessário, são feitas fotografias de diferentes ângulos para apoiar a análise.",
      },
      {
        title: "Análise em conjunto",
        text: "Depois da consulta, os profissionais analisam o caso em conjunto, cada um em sua área, para chegar a um diagnóstico multidisciplinar.",
      },
      {
        title: "Retorno com o plano",
        text: "Um retorno é agendado para apresentar o diagnóstico e o plano de tratamento, com as alternativas e o que esperar de cada etapa.",
      },
    ],
    faq: [
      {
        question: "O que levar para a primeira consulta?",
        answer:
          "Um documento de identificação e, se tiver, exames e radiografias recentes. Vale informar também os medicamentos que usa. Ao agendar, confirme se há alguma orientação adicional.",
      },
    ],
    keywords: ["avaliação", "consulta inicial", "anamnese", "check-up"],
    headings: {
      when: "Quando agendar uma primeira consulta?",
      steps: "Como é a primeira consulta",
      faq: "Antes de vir",
    },
    layout: { steps: "timeline" },
    feature: {
      id: "plano-individual",
      style: "split",
      kicker: "Planejamento individualizado",
      title: "Um diagnóstico construído em conjunto.",
      paragraphs: [
        "Depois da consulta, os profissionais da clínica analisam o caso juntos, cada um em sua área. O plano de tratamento nasce dessa análise multidisciplinar.",
        "No retorno, o plano é apresentado com calma no consultório, com as alternativas possíveis e o que esperar de cada etapa.",
      ],
      clinicImage: "primeiraConsulta",
      link: { href: "/equipe", label: "Conheça a equipe" },
    },
    whatsappTopic: "a primeira consulta",
    related: ["manutencao-preventiva", "periodontia", "planejamento-digital-do-sorriso"],
  },
  {
    slug: "manutencao-preventiva",
    name: "Manutenção preventiva",
    category: "prevencao",
    summary: "Revisões periódicas, limpeza profissional e orientação de higiene.",
    intro:
      "A manutenção preventiva reúne as consultas regulares de revisão. Nelas o dentista acompanha dentes, gengivas, restaurações e próteses, faz a limpeza profissional quando indicada e ajusta as orientações de higiene. Identificar alterações cedo costuma permitir tratamentos mais simples.",
    whenToTalk: [
      "Você concluiu um tratamento e quer manter os resultados.",
      "Tem implantes, próteses ou aparelho ortodôntico.",
      "Sua gengiva sangra durante a escovação.",
    ],
    overview: [
      {
        title: "Revisão",
        text: "Exame de dentes, gengiva, restaurações e próteses existentes.",
      },
      {
        title: "Limpeza profissional",
        text: "Remoção de placa e tártaro em locais que a escovação não alcança.",
      },
      {
        title: "Orientação",
        text: "Ajustes na técnica de escovação, uso de fio e outros recursos de higiene.",
      },
    ],
    faq: [
      {
        question: "O que é sensibilidade dentária?",
        answer:
          "É o incômodo ou a dor ao ingerir alimentos quentes, gelados ou muito ácidos. Em geral, está ligada à perda de esmalte, a cáries, à retração da gengiva ou ao clareamento. Identificar a causa com o dentista é o primeiro passo para definir o tratamento adequado.",
      },
      {
        question: "Com que frequência devo fazer revisões?",
        answer:
          "O intervalo depende do seu histórico e do risco individual. O dentista define a periodicidade adequada para você.",
      },
    ],
    keywords: ["limpeza", "profilaxia", "revisão", "tártaro", "sensibilidade"],
    headings: {
      when: "Quando agendar uma revisão?",
      steps: "Um ciclo de cuidado",
      faq: "Dúvidas sobre prevenção",
    },
    layout: { when: "cards", steps: "cycle" },
    care: [
      "Identificar alterações cedo costuma permitir tratamentos mais simples.",
      "Escovação e fio dental todos os dias continuam sendo a base da prevenção.",
      "Implantes, próteses e aparelhos pedem cuidados de higiene específicos, orientados nas revisões.",
    ],
    whatsappTopic: "uma consulta de revisão e limpeza",
    related: ["periodontia", "primeira-consulta", "clareamento"],
  },
  {
    slug: "periodontia",
    name: "Periodontia",
    category: "prevencao",
    summary: "Prevenção e tratamento de doenças da gengiva e dos tecidos de suporte.",
    intro:
      "A periodontia cuida da gengiva e das estruturas que sustentam os dentes. Inflamações como a gengivite e a periodontite podem evoluir de forma silenciosa. O tratamento busca controlar a inflamação e preservar o suporte dos dentes.",
    whenToTalk: [
      "Sua gengiva sangra, está inchada ou avermelhada.",
      "Você percebe retração gengival ou dentes com mobilidade.",
      "Tem mau hálito persistente.",
    ],
    overview: [
      {
        title: "Avaliação periodontal",
        text: "Medição da gengiva ao redor dos dentes e, quando necessário, exames de imagem.",
      },
      {
        title: "Tratamento",
        text: "Raspagem e controle da placa bacteriana; alguns casos podem exigir abordagens cirúrgicas.",
      },
      {
        title: "Manutenção",
        text: "Retornos periódicos para acompanhar a estabilidade dos tecidos.",
      },
    ],
    faq: [
      {
        question: "Gengiva que sangra é normal?",
        answer:
          "O sangramento costuma indicar inflamação. Vale procurar avaliação em vez de deixar de escovar a região.",
      },
    ],
    detailsTitle: "Gengiva e suporte dos dentes",
    details: [
      {
        id: "retracao-gengival",
        title: "Retração gengival",
        paragraphs: [
          "A gengiva pode retrair por diferentes motivos, como escovação com força excessiva, mau posicionamento dos dentes ou o próprio tipo de gengiva. As consequências vão da sensibilidade até, em casos avançados, a perda do dente. Em algumas situações, o enxerto gengival é uma das alternativas.",
        ],
        link: { href: "/tratamentos/enxertos#enxerto-gengival", label: "Enxerto gengival" },
      },
    ],
    keywords: ["gengiva", "gengivite", "periodontite", "doença periodontal", "sangramento gengival", "raspagem"],
    headings: {
      when: "Sinais de que a gengiva precisa de atenção",
      steps: "Como o tratamento periodontal é conduzido",
      faq: "Dúvidas sobre gengiva",
    },
    layout: { when: "cards" },
    feature: {
      id: "suporte-dos-dentes",
      style: "split",
      kicker: "Tecidos de suporte",
      title: "O que sustenta cada dente.",
      paragraphs: [
        "Cada dente se apoia em um conjunto de tecidos: a gengiva, que o envolve, e o osso, onde a raiz se fixa. A inflamação desses tecidos pode avançar sem dor e comprometer o suporte do dente.",
      ],
      parts: [
        { label: "Gengiva", text: "Sangramento, inchaço e vermelhidão são sinais de inflamação." },
        { label: "Osso de suporte", text: "Na periodontite, a inflamação pode chegar ao osso que sustenta o dente." },
        { label: "Raiz", text: "Com a retração gengival, parte da raiz pode ficar exposta e sensível." },
      ],
      diagram: "gengiva",
    },
    related: ["manutencao-preventiva", "enxertos", "implantes"],
  },
  {
    slug: "facetas-e-lentes",
    name: "Facetas e lentes de porcelana",
    category: "estetica",
    summary: "Lâminas cerâmicas que modificam cor, forma ou proporção dos dentes.",
    intro:
      "Facetas e lentes de contato de porcelana são películas cerâmicas muito finas, cimentadas na face externa dos dentes para corrigir cor e forma. O tratamento parte de um desenho personalizado do sorriso. A indicação exige dentes e gengivas saudáveis e um planejamento cuidadoso, já que, em muitos casos, há algum preparo do dente.",
    whenToTalk: [
      "Você gostaria de mudar a forma ou o tamanho de alguns dentes.",
      "Tem manchas que não respondem ao clareamento.",
      "Possui pequenos espaços entre os dentes ou desgastes nas bordas.",
    ],
    overview: [
      {
        title: "Avaliação e planejamento",
        text: "Análise do sorriso, da mordida e dos tecidos, com simulação do resultado planejado quando possível.",
      },
      {
        title: "Preparo",
        text: "Conforme o caso, os dentes recebem um preparo mínimo para acomodar as lâminas.",
      },
      {
        title: "Confecção e cimentação",
        text: "As peças são produzidas, provadas e cimentadas, com ajustes finais na mordida.",
      },
    ],
    faq: [
      {
        question: "O que são facetas ou lentes de contato?",
        answer:
          "São películas finas de porcelana cimentadas na face externa dos dentes. Elas podem corrigir cor e forma, a partir de um desenho personalizado do sorriso. A indicação depende de avaliação.",
      },
      {
        question: "Facetas precisam de manutenção?",
        answer:
          "Sim. Revisões periódicas e cuidados com hábitos como ranger os dentes ajudam a preservar as peças.",
      },
    ],
    detailsTitle: "Do desenho digital à peça de porcelana",
    details: [
      {
        id: "desenho-personalizado",
        title: "Desenho personalizado",
        paragraphs: [
          "Cada sorriso é desenhado de forma individual. O planejamento digital do sorriso pode ajudar a visualizar e discutir a proposta antes da confecção das peças.",
        ],
        link: { href: "/tratamentos/planejamento-digital-do-sorriso", label: "Planejamento digital do sorriso" },
      },
      {
        id: "cad-cam",
        title: "Confecção com CAD/CAM",
        paragraphs: [
          "O CAD/CAM é uma tecnologia de desenho e fabricação de peças assistida por computador. Em alguns casos, ele agiliza a confecção das facetas e reduz o número de etapas. A viabilidade depende de cada situação.",
        ],
        link: { href: "/tecnologia#cad-cam", label: "CAD/CAM em três etapas" },
      },
    ],
    care: [
      "Escovação e fio dental continuam indispensáveis.",
      "Revisões periódicas ajudam a conservar as peças e a gengiva ao redor.",
      "Hábitos como ranger os dentes devem ser avaliados, pois podem exigir proteção adicional.",
    ],
    keywords: ["facetas", "lentes de contato dental", "porcelana", "cerâmica", "lente de contato"],
    headings: {
      when: "Quando considerar facetas ou lentes de porcelana?",
      steps: "Como o tratamento é conduzido",
      care: "Para conservar as peças",
      faq: "Dúvidas sobre facetas e lentes",
    },
    layout: { steps: "timeline" },
    feature: {
      id: "planejamento-personalizado",
      style: "split",
      kicker: "Planejamento personalizado",
      title: "Um desenho para cada sorriso.",
      paragraphs: [
        "Antes de qualquer peça, o sorriso é estudado: proporções do rosto, dos dentes, da gengiva e dos lábios. Esse estudo orienta a forma, a cor e a espessura das lâminas.",
        "Recursos digitais apoiam esse caminho, do planejamento do sorriso, que permite visualizar a proposta, à confecção das peças pelo sistema CAD/CAM, quando indicado. O resultado depende das condições de cada caso.",
      ],
      media: "lentesPorcelana",
    },
    related: ["planejamento-digital-do-sorriso", "clareamento", "placas-de-bruxismo"],
  },
  {
    slug: "placas-de-bruxismo",
    name: "Placas de bruxismo",
    category: "funcao",
    summary: "Placas sob medida para proteger os dentes do apertamento e do ranger.",
    intro:
      "O bruxismo é o hábito de apertar ou ranger os dentes, muitas vezes durante o sono. A placa oclusal é um dispositivo feito sob medida que ajuda a proteger os dentes do desgaste. O dentista avalia os sinais e, quando necessário, orienta sobre outros acompanhamentos.",
    whenToTalk: [
      "Você acorda com dor ou cansaço na mandíbula.",
      "Alguém já ouviu você ranger os dentes durante o sono.",
      "Seus dentes apresentam desgastes ou pequenas fraturas.",
    ],
    overview: [
      {
        title: "Avaliação",
        text: "Exame dos dentes, da musculatura e da articulação da mandíbula.",
      },
      {
        title: "Moldagem",
        text: "Registro das arcadas para confeccionar uma placa sob medida.",
      },
      {
        title: "Instalação e ajustes",
        text: "A placa é ajustada à mordida e revisada nas consultas seguintes.",
      },
    ],
    faq: [
      {
        question: "A placa cura o bruxismo?",
        answer:
          "A placa protege os dentes e ajuda no controle dos sinais, mas o bruxismo pode ter causas diversas. O acompanhamento é definido caso a caso.",
      },
    ],
    keywords: ["bruxismo", "ranger os dentes", "apertamento", "placa oclusal", "placa de mordida"],
    headings: {
      when: "Sinais que merecem atenção",
      steps: "Como a placa é feita",
      faq: "Dúvidas sobre bruxismo",
    },
    layout: { when: "cards", steps: "timeline" },
    feature: {
      id: "placa-oclusal",
      style: "facts",
      kicker: "A placa oclusal",
      title: "Proteção feita sob medida.",
      paragraphs: [
        "A placa é usada principalmente durante o sono e se encaixa sobre os dentes de uma arcada. Ela não elimina o hábito, mas ajuda a proteger os dentes enquanto o bruxismo é acompanhado.",
      ],
      parts: [
        { label: "Sob medida", text: "Confeccionada a partir do registro das suas arcadas." },
        { label: "Proteção", text: "Ajuda a proteger os dentes do desgaste causado pelo apertamento e pelo ranger." },
        { label: "Acompanhamento", text: "É ajustada à mordida e revisada nas consultas seguintes." },
      ],
    },
    care: [
      "O bruxismo pode ter causas diversas; o dentista orienta, quando necessário, outros acompanhamentos.",
      "Leve a placa às consultas de revisão para conferir o ajuste e o desgaste.",
    ],
    related: ["ortodontia", "facetas-e-lentes", "protetores-esportivos"],
  },
  {
    slug: "protetores-esportivos",
    name: "Protetores bucais esportivos",
    category: "funcao",
    summary: "Protetores bucais sob medida para quem pratica esportes de contato ou impacto.",
    intro:
      "O protetor bucal esportivo cobre a parte da frente dos dentes e tem como principal função reduzir o risco de fraturas dentárias e lesões na boca. Feito sob medida, protege dentes, rebordo e lábios em esportes de alto impacto, com contato ou quedas, como MMA, basquete, hóquei e rúgbi.",
    whenToTalk: [
      "Você ou seu filho praticam lutas, futebol, basquete ou outros esportes de contato.",
      "Usa aparelho ortodôntico e pratica atividades de impacto.",
      "Já teve algum trauma dental durante o esporte.",
    ],
    overview: [
      {
        title: "Avaliação",
        text: "Verificação dos dentes e da modalidade praticada.",
      },
      {
        title: "Moldagem e confecção",
        text: "O protetor é produzido a partir do registro da sua arcada.",
      },
      {
        title: "Entrega e orientações",
        text: "Ajuste final e orientações de uso, limpeza e substituição.",
      },
    ],
    faq: [
      {
        question: "Crianças podem usar protetor sob medida?",
        answer:
          "Sim, mas como a arcada muda durante o crescimento, o protetor precisa ser revisado com frequência.",
      },
    ],
    feature: {
      id: "caracteristicas",
      style: "split",
      kicker: "Escolha do protetor",
      title: "O que um bom protetor precisa ter.",
      paragraphs: [
        "Existem muitos tipos de protetor bucal. O protetor individualizado é confeccionado a partir do registro da arcada de quem vai usá-lo. Independentemente do modelo, ele deve ser:",
      ],
      parts: [
        { label: "Flexível", text: "Confortável durante todo o treino ou a competição." },
        { label: "Resistente", text: "Feito para não fraturar com os impactos." },
        { label: "Adaptado", text: "Ajustado à boca sem restringir a respiração nem a fala." },
      ],
      media: "protetorEsportivo",
    },
    keywords: ["protetor bucal", "MMA", "luta", "esporte", "trauma dental"],
    headings: {
      when: "Quem deve usar um protetor bucal?",
      steps: "Como o protetor individualizado é feito",
      faq: "Dúvidas sobre protetores",
    },
    layout: { steps: "timeline" },
    related: ["odontopediatria", "placas-de-bruxismo"],
  },
  {
    slug: "extracao-de-terceiros-molares",
    name: "Extração de terceiros molares",
    alsoKnownAs: "Sisos",
    category: "clinica",
    summary: "Avaliação e remoção dos sisos quando há indicação clínica.",
    intro:
      "Os terceiros molares, conhecidos como dentes do siso, costumam nascer entre os 16 e os 25 anos e são os últimos a aparecer na boca. Nem sempre há espaço para que nasçam na posição adequada. A extração pode ser indicada quando estão mal posicionados, quando falta espaço na arcada ou quando a erupção não se completa. A decisão depende de exame clínico e de imagem.",
    whenToTalk: [
      "Você sente dor ou inflamação na região do fundo da boca.",
      "Um exame de imagem mostrou sisos inclusos ou mal posicionados.",
      "Seu ortodontista recomendou avaliar os terceiros molares.",
    ],
    overview: [
      {
        title: "Avaliação clínica",
        text: "Conversa sobre sintomas e histórico de saúde, e exame da região do fundo da boca.",
      },
      {
        title: "Exame de imagem",
        text: "Radiografia ou tomografia mostram a posição dos sisos, a inclinação e a relação com o dente vizinho e outras estruturas.",
      },
      {
        title: "Indicação e planejamento",
        text: "Com os exames, o dentista explica se a extração é indicada, o momento adequado e como o procedimento será feito.",
      },
      {
        title: "Procedimento e pós-operatório",
        text: "A cirurgia é realizada com anestesia local. Depois, você recebe orientações de cuidados e retorna para acompanhar a cicatrização.",
      },
    ],
    faq: [
      {
        question: "Todo siso precisa ser removido?",
        answer:
          "Não. Sisos bem posicionados e saudáveis podem permanecer. A indicação é individual.",
      },
    ],
    detailsTitle: "Duas situações que pedem avaliação",
    details: [
      {
        id: "parcialmente-erupcionado",
        title: "Siso parcialmente erupcionado",
        paragraphs: [
          "Quando o siso nasce só em parte, a higiene da região fica difícil. Isso pode provocar inflamação da gengiva, irritação local, dor, inchaço e até cárie.",
        ],
      },
      {
        id: "incluso",
        title: "Siso incluso",
        paragraphs: [
          "Quando permanece totalmente dentro do osso, o siso pode causar reabsorção do dente vizinho e quadros dolorosos, entre outras alterações. O acompanhamento por imagem ajuda a decidir o momento adequado de intervir.",
        ],
      },
    ],
    keywords: ["siso", "dente do siso", "terceiro molar", "extração", "cirurgia"],
    headings: {
      when: "Quando a extração dos sisos pode ser indicada?",
      steps: "Da avaliação ao pós-operatório",
      care: "Cuidados importantes",
      faq: "Dúvidas sobre sisos",
    },
    layout: { steps: "timeline", details: "compare" },
    feature: {
      id: "posicao-dos-sisos",
      style: "split",
      kicker: "Os últimos dentes a nascer",
      title: "Nem sempre há espaço para os sisos.",
      paragraphs: [
        "Os terceiros molares chegam quando os outros dentes já ocupam a arcada. Sem espaço, podem nascer inclinados, ficar parcialmente cobertos pela gengiva ou permanecer dentro do osso.",
        "Por isso a decisão parte dos exames: é a imagem que mostra a posição de cada siso e a relação com os dentes vizinhos.",
      ],
      parts: [
        { label: "Siso", text: "Inclinado na direção do dente vizinho e parcialmente dentro do osso." },
        { label: "Segundo molar", text: "O dente ao lado, que pode ser afetado quando o siso está mal posicionado." },
      ],
      diagram: "siso",
    },
    care: [
      "Nem todo siso precisa ser removido: a indicação é individual.",
      "Siga as orientações do pós-operatório e compareça ao retorno.",
      "Informe ao dentista condições de saúde e medicamentos em uso.",
    ],
    whatsappTopic: "a avaliação e a extração de sisos",
    related: ["primeira-consulta", "ortodontia"],
  },
  {
    slug: "enxertos",
    name: "Enxertos ósseos e gengivais",
    category: "reabilitacao",
    summary: "Recuperação de osso para implantes ou de gengiva em casos de retração.",
    intro:
      "Enxertos ósseos e gengivais são cirurgias que repõem tecido perdido. O enxerto ósseo aumenta a altura ou a espessura do osso para permitir a instalação de implantes. O enxerto gengival trata retrações da gengiva. O tipo de enxerto, o material e a sequência do tratamento dependem de cada situação.",
    whenToTalk: [
      "Foi informado de que não há osso suficiente para um implante.",
      "Você tem retração gengival com raízes expostas.",
      "Está planejando uma reabilitação após a perda de dentes.",
    ],
    overview: [
      {
        title: "Diagnóstico",
        text: "Avaliação clínica e por imagem da região a ser tratada.",
      },
      {
        title: "Procedimento",
        text: "Instalação do enxerto, de acordo com a técnica e o material planejados.",
      },
      {
        title: "Integração",
        text: "Período de cicatrização acompanhado antes das próximas etapas do tratamento.",
      },
    ],
    faq: [
      {
        question: "O que é enxerto ósseo?",
        answer:
          "É um procedimento que aumenta a altura ou a espessura do osso em uma região, geralmente para permitir a instalação de implantes. Pode usar osso do próprio paciente ou biomateriais.",
      },
      {
        question: "O enxerto é sempre necessário antes do implante?",
        answer:
          "Não. Ele é considerado apenas quando o volume de osso não é suficiente para o planejamento proposto.",
      },
    ],
    detailsTitle: "Osso ou gengiva: dois enxertos, dois objetivos",
    details: [
      {
        id: "enxerto-osseo",
        title: "Enxerto ósseo",
        paragraphs: [
          "Indicado quando houve perda óssea e o volume de osso não é suficiente para o implante. O material usado para preencher a região pode ser osso do próprio paciente ou biomateriais.",
          "Em geral, o implante é instalado depois da cicatrização do enxerto, período que leva alguns meses e varia de caso para caso. Em algumas situações, é possível planejar o tratamento de forma a reduzir o número de procedimentos cirúrgicos.",
        ],
        link: { href: "/tratamentos/implantes", label: "Implantes" },
      },
      {
        id: "enxerto-gengival",
        title: "Enxerto gengival",
        paragraphs: [
          "Também conhecido como cirurgia plástica periodontal. A retração da gengiva pode ter causas como escovação com força excessiva, mau posicionamento dos dentes ou o próprio tipo de gengiva, e levar desde sensibilidade até a perda do dente.",
          "O enxerto gengival trata a retração e também pode contribuir para um sorriso mais harmônico.",
        ],
        link: { href: "/tratamentos/periodontia#retracao-gengival", label: "Retração gengival" },
      },
    ],
    keywords: ["enxerto ósseo", "enxerto gengival", "retração gengival", "plástica gengival", "cirurgia plástica periodontal", "biomaterial"],
    headings: {
      when: "Quando um enxerto pode ser considerado?",
      steps: "Como o enxerto é planejado",
      faq: "Dúvidas sobre enxertos",
    },
    layout: { details: "compare", detailsFirst: true },
    care: [
      "O tipo de enxerto, o material e a sequência do tratamento dependem de cada situação.",
      "O período de cicatrização varia de caso para caso e é acompanhado antes das próximas etapas.",
    ],
    related: ["implantes", "periodontia", "proteses"],
  },
  {
    slug: "planejamento-digital-do-sorriso",
    name: "Planejamento digital do sorriso",
    category: "estetica",
    summary: "Fotos, vídeos e software para planejar o sorriso antes de começar o tratamento.",
    intro:
      "O planejamento digital do sorriso permite visualizar como o sorriso pode ficar depois do tratamento. Com ele, o profissional planeja as correções de acordo com os desejos, as necessidades e a personalidade de cada paciente, de forma individual. É um recurso usado sobretudo em tratamentos estéticos e reabilitações.",
    whenToTalk: [
      "Você pensa em mudar a forma, a cor ou a proporção dos dentes.",
      "Está avaliando facetas, lentes de contato ou uma reabilitação com próteses.",
      "Gostaria de visualizar a proposta antes de decidir pelo tratamento.",
    ],
    overview: [
      {
        title: "Registro",
        text: "São feitas fotografias e vídeos do sorriso e do rosto do paciente.",
      },
      {
        title: "Análise",
        text: "Em um software, o profissional analisa as proporções faciais e dentárias: dentes, gengivas, lábios e até a expressão do rosto em movimento.",
      },
      {
        title: "Redesenho",
        text: "O software auxilia no redesenho do sorriso, gerando um projeto que ajuda a definir o plano de tratamento.",
      },
      {
        title: "Conversa sobre o projeto",
        text: "O paciente visualiza a proposta e discute com o dentista os ajustes antes de iniciar o tratamento.",
      },
    ],
    detailsTitle: "Por que planejar digitalmente",
    details: [
      {
        id: "beneficios",
        title: "Diagnóstico e comunicação",
        paragraphs: [
          "O planejamento digital enriquece o diagnóstico, aproxima a comunicação entre paciente e dentista, já que o paciente visualiza o projeto, e torna o tratamento mais previsível.",
        ],
      },
      {
        id: "tratamentos-esteticos",
        title: "Onde ele pode ser usado",
        paragraphs: ["O planejamento pode apoiar diferentes tratamentos estéticos e de reabilitação, como:"],
        points: [
          "Clareamento dental.",
          "Facetas e lentes de contato de porcelana.",
          "Tratamentos ortodônticos.",
          "Implantes e próteses, incluindo dentaduras apoiadas em implantes.",
          "Plástica gengival.",
        ],
      },
    ],
    care: [
      "A simulação é uma ferramenta de planejamento: o resultado final depende das condições de cada caso.",
      "Dentes e gengivas precisam estar saudáveis antes de tratamentos estéticos.",
    ],
    faq: [
      {
        question: "Consigo ver como meu sorriso pode ficar antes do tratamento?",
        answer:
          "O planejamento digital gera um projeto do sorriso a partir de fotos, vídeos e análise em software. Ele ajuda a visualizar e discutir a proposta, que depois é ajustada às condições clínicas reais.",
      },
      {
        question: "Como posso melhorar a estética do meu sorriso?",
        answer:
          "Existem diferentes caminhos, como clareamento, facetas, ortodontia, implantes e plástica gengival. O ponto de partida é uma avaliação, e o planejamento digital pode ajudar a escolher e combinar as alternativas.",
      },
    ],
    keywords: ["DSD", "simulação do sorriso", "estética", "tratamentos estéticos", "design do sorriso"],
    headings: {
      when: "Para quem o planejamento digital pode ajudar?",
      steps: "Como o sorriso é planejado",
      care: "O que a simulação é, e o que não é",
      faq: "Dúvidas sobre o planejamento",
    },
    layout: { steps: "timeline" },
    related: ["facetas-e-lentes", "clareamento", "proteses"],
  },
  {
    slug: "laserterapia",
    name: "Laserterapia",
    category: "clinica",
    summary: "Laser de baixa potência como recurso complementar de cicatrização e conforto.",
    intro:
      "A laserterapia utiliza um equipamento de laser de baixa potência como recurso complementar de cicatrização e conforto. É indicada conforme cada situação, e não substitui o tratamento principal.",
    whenToTalk: [
      "Você vai passar ou passou por uma cirurgia e quer entender os recursos de apoio à cicatrização.",
      "Tem lesões ou feridas na boca que demoram a cicatrizar.",
      "Quer saber se o laser pode complementar o seu tratamento.",
    ],
    overview: [
      {
        title: "Avaliação",
        text: "O profissional examina a lesão ou a região a ser tratada e o seu histórico de saúde.",
      },
      {
        title: "Aplicação",
        text: "O laser é aplicado de forma localizada, na região definida no planejamento.",
      },
      {
        title: "Sessões e acompanhamento",
        text: "O número de sessões varia conforme a lesão tratada e o perfil de cada paciente.",
      },
    ],
    care: [
      "A laserterapia complementa, e não substitui, o tratamento indicado para cada caso.",
      "Informe ao dentista condições de saúde e medicamentos em uso.",
    ],
    faq: [
      {
        question: "Quantas sessões de laserterapia são necessárias?",
        answer:
          "Depende da lesão a ser tratada e do perfil do paciente. O número de sessões é definido e reavaliado pelo profissional ao longo do acompanhamento.",
      },
    ],
    keywords: ["laser", "laser de baixa potência", "cicatrização", "fotobiomodulação"],
    headings: {
      when: "Quando o laser pode complementar o tratamento?",
      steps: "Como as sessões acontecem",
      faq: "Dúvidas sobre laserterapia",
    },
    feature: {
      id: "como-a-luz-age",
      style: "flow",
      kicker: "Laser de baixa potência",
      title: "Como a luz age nos tecidos.",
      parts: [
        { label: "Absorção", text: "A energia da luz é absorvida pelas células da região tratada." },
        { label: "Circulação", text: "A microcirculação local aumenta." },
        { label: "Energia celular", text: "A produção de ATP é estimulada, favorecendo a cicatrização, com ação anti-inflamatória e analgésica." },
      ],
    },
    related: ["extracao-de-terceiros-molares", "periodontia", "enxertos"],
  },
];

export const featuredTreatments = treatments.filter((t) => t.featured);

/** Mensagem pronta do WhatsApp para a página do tratamento. */
export function treatmentWhatsappMessage(t: Treatment) {
  const topic = t.whatsappTopic ?? `o tratamento de ${t.name.toLowerCase()}`;
  return `Olá! Gostaria de informações sobre ${topic} e como agendar uma avaliação.`;
}

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}

export function treatmentsByCategory(id: CategoryId) {
  return treatments.filter((t) => t.category === id);
}
