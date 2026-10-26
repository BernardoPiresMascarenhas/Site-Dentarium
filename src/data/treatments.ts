/**
 * Catálogo de tratamentos listados no site anterior da Dentarium.
 *
 * Os textos são explicações gerais, escritas para orientar a conversa com o
 * cirurgião-dentista. Não descrevem protocolos da clínica, não prometem
 * resultado e precisam de revisão do responsável técnico antes de publicar.
 */

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
    description: "Cor, forma e harmonia dos dentes, sempre a partir de uma base saudável.",
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
    description: "Tratamentos de canal e cirurgias como a remoção de terceiros molares.",
  },
  {
    id: "criancas",
    name: "Crianças",
    description: "Atendimento voltado à infância, com ritmo e linguagem adequados.",
  },
] as const satisfies readonly TreatmentCategory[];

export type CategoryId = (typeof categories)[number]["id"];

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
  faq: { question: string; answer: string }[];
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
        text: "Conversa sobre histórico de saúde, exame clínico e, quando necessário, exames de imagem para avaliar o osso.",
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
    related: ["enxertos", "proteses", "manutencao-preventiva"],
  },
  {
    slug: "ortodontia",
    name: "Ortodontia",
    category: "funcao",
    featured: true,
    summary: "Correção da posição dos dentes e da mordida com aparelhos ortodônticos.",
    intro:
      "A ortodontia trata do posicionamento dos dentes e da relação entre as arcadas. Além da aparência, o alinhamento interfere na mastigação, na higiene e na distribuição de forças sobre os dentes. Existem diferentes tipos de aparelho, e a escolha depende de cada caso.",
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
        title: "Escolha do aparelho",
        text: "O tipo de aparelho é definido junto com você, considerando as necessidades do caso e sua rotina.",
      },
      {
        title: "Consultas de ajuste",
        text: "O tratamento é acompanhado em consultas periódicas, nas quais o aparelho é ajustado.",
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
        question: "Quanto tempo dura o tratamento?",
        answer:
          "Varia bastante de um caso para outro. Uma estimativa só pode ser dada depois do diagnóstico ortodôntico.",
      },
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
      "O clareamento dental usa agentes clareadores para atenuar o escurecimento dos dentes. Ele pode ser feito no consultório, em casa com moldeiras orientadas pelo dentista, ou combinando as duas formas. Antes de começar, é importante verificar se dentes e gengivas estão saudáveis.",
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
    related: ["facetas-e-lentes", "manutencao-preventiva"],
  },
  {
    slug: "proteses",
    name: "Próteses",
    category: "reabilitacao",
    featured: true,
    summary: "Coroas, pontes e próteses para recuperar dentes perdidos ou muito desgastados.",
    intro:
      "As próteses dentárias substituem dentes ausentes ou partes de dentes muito comprometidos. Podem ser fixas, como coroas e pontes, ou removíveis, e também podem ser apoiadas sobre implantes. O objetivo é devolver mastigação, fala e conforto com uma aparência natural.",
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
        question: "Prótese fixa ou removível: qual é melhor?",
        answer:
          "Depende de quantos dentes faltam, da condição dos dentes de apoio e do osso. Cada alternativa tem vantagens e limitações, apresentadas na avaliação.",
      },
    ],
    related: ["implantes", "facetas-e-lentes", "enxertos"],
  },
  {
    slug: "tratamento-de-canal",
    name: "Tratamento de canal",
    alsoKnownAs: "Endodontia",
    category: "clinica",
    featured: true,
    summary: "Endodontia: tratamento do interior do dente quando a polpa está inflamada ou infectada.",
    intro:
      "A endodontia, conhecida como tratamento de canal, cuida da polpa — o tecido no interior do dente. Quando ela inflama ou infecciona, por exemplo após uma cárie profunda ou uma fratura, o tratamento remove o tecido comprometido, limpa e sela os canais, buscando preservar o dente.",
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
        text: "Depois do canal, o dente precisa ser restaurado — às vezes com uma coroa — para recuperar resistência.",
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
      "A odontopediatria acompanha a saúde bucal desde os primeiros dentes até a adolescência. Além de prevenir e tratar cáries, observa o desenvolvimento da arcada e orienta a família sobre alimentação, higiene e hábitos. Na Dentarium, esse atendimento é chamado de Dentarium Kids.",
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
        question: "Dentes de leite precisam de tratamento se vão cair?",
        answer:
          "Sim. Eles participam da mastigação, da fala e guardam espaço para os dentes permanentes.",
      },
    ],
    related: ["ortodontia", "manutencao-preventiva", "protetores-esportivos"],
  },
  {
    slug: "primeira-consulta",
    name: "Primeira consulta",
    category: "prevencao",
    summary: "Conversa, exame clínico e orientação sobre os próximos passos.",
    intro:
      "A primeira consulta é o momento de contar o que motivou sua visita, apresentar seu histórico de saúde e passar por um exame clínico. A partir dele, o dentista explica o que observou e, se for o caso, indica exames complementares e as possibilidades de tratamento.",
    whenToTalk: [
      "Faz tempo desde sua última consulta.",
      "Você mudou de cidade ou de dentista e quer uma nova avaliação.",
      "Tem uma queixa específica e quer entender a causa.",
    ],
    overview: [
      {
        title: "Conversa inicial",
        text: "Seu motivo de consulta, histórico de saúde, medicamentos em uso e expectativas.",
      },
      {
        title: "Exame clínico",
        text: "Avaliação de dentes, gengivas, mucosas e mordida.",
      },
      {
        title: "Próximos passos",
        text: "Explicação do que foi observado e, quando necessário, solicitação de exames e proposta de plano.",
      },
    ],
    faq: [
      {
        question: "O que levar para a primeira consulta?",
        answer:
          "Um documento de identificação e, se tiver, exames e radiografias recentes. Vale informar também os medicamentos que usa. Ao agendar, confirme se há alguma orientação adicional.",
      },
    ],
    related: ["manutencao-preventiva", "periodontia"],
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
        question: "Com que frequência devo fazer revisões?",
        answer:
          "O intervalo depende do seu histórico e do risco individual. O dentista define a periodicidade adequada para você.",
      },
    ],
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
    related: ["manutencao-preventiva", "enxertos", "implantes"],
  },
  {
    slug: "facetas-e-lentes",
    name: "Facetas e lentes de porcelana",
    category: "estetica",
    summary: "Lâminas cerâmicas que modificam cor, forma ou proporção dos dentes.",
    intro:
      "Facetas e lentes de contato dental são lâminas, geralmente de cerâmica, cimentadas sobre a face visível dos dentes. Podem alterar cor, forma e proporção. A indicação exige dentes e gengivas saudáveis e um planejamento cuidadoso, já que, em muitos casos, há algum desgaste do dente.",
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
        question: "Facetas precisam de manutenção?",
        answer:
          "Sim. Revisões periódicas e cuidados com hábitos como ranger os dentes ajudam a preservar as peças.",
      },
    ],
    related: ["clareamento", "proteses", "placas-de-bruxismo"],
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
    related: ["ortodontia", "facetas-e-lentes", "protetores-esportivos"],
  },
  {
    slug: "protetores-esportivos",
    name: "Protetores esportivos",
    category: "funcao",
    summary: "Protetores bucais sob medida para quem pratica esportes de contato ou impacto.",
    intro:
      "O protetor bucal esportivo ajuda a reduzir o risco de lesões nos dentes, lábios e gengiva durante atividades com contato ou risco de queda. Feito sob medida, tende a se adaptar melhor à boca e a interferir menos na respiração e na fala.",
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
    related: ["odontopediatria", "placas-de-bruxismo"],
  },
  {
    slug: "extracao-de-terceiros-molares",
    name: "Extração de terceiros molares",
    category: "clinica",
    summary: "Avaliação e remoção dos sisos quando há indicação clínica.",
    intro:
      "Os terceiros molares, conhecidos como sisos, nem sempre têm espaço para nascer na posição adequada. Quando ficam inclusos, parcialmente erupcionados ou causam problemas aos dentes vizinhos, a remoção pode ser indicada. A decisão depende de exame clínico e de imagem.",
    whenToTalk: [
      "Você sente dor ou inflamação na região do fundo da boca.",
      "Um exame de imagem mostrou sisos inclusos ou mal posicionados.",
      "Seu ortodontista recomendou avaliar os terceiros molares.",
    ],
    overview: [
      {
        title: "Avaliação",
        text: "Exame clínico e de imagem para ver a posição dos dentes e a relação com estruturas vizinhas.",
      },
      {
        title: "Procedimento",
        text: "A cirurgia é realizada com anestesia local, conforme o planejamento.",
      },
      {
        title: "Pós-operatório",
        text: "Orientações de cuidados e retorno para acompanhar a cicatrização.",
      },
    ],
    faq: [
      {
        question: "Todo siso precisa ser removido?",
        answer:
          "Não. Sisos bem posicionados e saudáveis podem permanecer. A indicação é individual.",
      },
    ],
    related: ["primeira-consulta", "ortodontia"],
  },
  {
    slug: "enxertos",
    name: "Enxertos",
    category: "reabilitacao",
    summary: "Recuperação de osso ou gengiva para viabilizar outros tratamentos.",
    intro:
      "Enxertos ósseos ou gengivais são usados para repor tecido perdido. O enxerto ósseo pode criar condições para a instalação de implantes; o gengival pode tratar retrações e proteger a raiz dos dentes. O tipo de enxerto e o material dependem de cada situação.",
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
        question: "O enxerto é sempre necessário antes do implante?",
        answer:
          "Não. Ele é considerado apenas quando o volume de osso não é suficiente para o planejamento proposto.",
      },
    ],
    related: ["implantes", "periodontia", "proteses"],
  },
];

export const featuredTreatments = treatments.filter((t) => t.featured);

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}

export function treatmentsByCategory(id: CategoryId) {
  return treatments.filter((t) => t.category === id);
}
