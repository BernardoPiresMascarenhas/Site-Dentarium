import { clinic } from "./clinic";

/**
 * Recursos tecnológicos descritos no site oficial anterior ("Tecnologia
 * Avançada", "Odontologia Digital", "Laboratório de Prótese", "Anestesia
 * Computadorizada"). Os textos explicam o que é cada recurso, sem as
 * afirmações antigas que dependem de comprovação (raridade do equipamento,
 * "indolor", "perfeição"). A situação atual de cada equipamento está
 * registrada em docs/REVISAO_CONTEUDO_DENTARIUM.md.
 *
 * `onHome` marca os recursos exibidos nas abas da página inicial.
 */
export type Technology = {
  id: string;
  stage: string;
  name: string;
  text: string;
  /** Uma frase para a grade de recursos da página Tecnologia. */
  short: string;
  /** Seção da página Tecnologia que aprofunda o recurso. */
  anchor: string;
  /** Quando o recurso é usado (recursos de tratamento). */
  use?: string;
  onHome?: boolean;
  /** Página do catálogo que aprofunda o assunto. */
  href?: string;
};

export const technologies: Technology[] = [
  {
    id: "imagem",
    stage: "Diagnóstico",
    name: "Radiografia e tomografia",
    text: "Exames de imagem mostram o que o exame clínico não alcança, como raízes, osso e dentes inclusos. A sala de exames fica ao lado dos consultórios, e o exame é feito no mesmo local, com o acompanhamento do seu dentista.",
    short: "Exames de imagem feitos na própria clínica, ao lado dos consultórios.",
    anchor: "diagnostico",
    onHome: true,
  },
  {
    id: "planejamento-digital",
    stage: "Planejamento",
    name: "Planejamento digital do sorriso",
    text: "Fotos, vídeos e software para analisar as proporções do rosto e dos dentes e redesenhar o sorriso antes do tratamento, com o paciente participando das decisões.",
    short: "Fotos, vídeos e software para projetar o sorriso antes do tratamento.",
    anchor: "planejamento",
    onHome: true,
    href: "/tratamentos/planejamento-digital-do-sorriso",
  },
  {
    id: "cadcam",
    stage: "Confecção de peças",
    name: "CAD/CAM",
    text: "Escaneamento, desenho digital e fabricação de restaurações, como coroas e facetas, a partir de um modelo virtual.",
    short: "Escaneamento, desenho e fabricação de restaurações a partir de um modelo virtual.",
    anchor: "cad-cam",
    onHome: true,
    href: "/tecnologia#cad-cam",
  },
  {
    id: "anestesia",
    stage: "Conforto",
    name: "Anestesia computadorizada",
    text: "Equipamento digital que introduz o anestésico na gengiva de forma lenta e controlada, buscando uma aplicação mais confortável.",
    short: "Anestésico aplicado de forma lenta e controlada.",
    anchor: "conforto",
    use: "Avaliada pelo profissional em cada caso.",
    onHome: true,
  },
  {
    id: "laser",
    stage: "Recurso complementar",
    name: "Laser",
    text: "Laser de baixa potência, usado como recurso complementar para favorecer a cicatrização, com ação anti-inflamatória e analgésica, sempre com indicação individual.",
    short: "Laser de baixa potência como recurso complementar à cicatrização.",
    anchor: "conforto",
    use: "Complementa o tratamento principal, sem substituí-lo.",
    onHome: true,
    href: "/tratamentos/laserterapia",
  },
  {
    id: "multidisciplinar",
    stage: "Planejamento",
    name: "Análise multidisciplinar",
    text: "Depois da primeira consulta, os profissionais analisam o caso em conjunto, cada um em sua área, para chegar a um plano de tratamento mais completo.",
    short: "Casos analisados em conjunto pelos profissionais de cada área.",
    anchor: "planejamento",
    href: "/tratamentos/primeira-consulta",
  },
  {
    id: "endodontia",
    stage: "Tratamento de canal",
    name: "Recursos para endodontia",
    text: "Equipamentos de apoio ao tratamento de canal, como o localizador apical, que auxilia o profissional a determinar o comprimento dos canais durante o procedimento.",
    short: "Localizador apical e outros apoios ao tratamento de canal.",
    anchor: "conforto",
    use: "Durante o tratamento de canal.",
    href: "/tratamentos/tratamento-de-canal",
  },
  {
    id: "laboratorio",
    stage: "Confecção de peças",
    name: "Laboratório de prótese",
    text: "Próteses confeccionadas dentro da clínica, considerando as características de cada arcada, com apoio do sistema CAD/CAM.",
    short: "Próteses confeccionadas dentro da própria clínica.",
    anchor: "laboratorio",
    href: "/tratamentos/proteses#laboratorio",
  },
];

export const homeTechnologies = technologies.filter((t) => t.onHome);

export const technologyNote =
  "A disponibilidade de cada recurso e a indicação para o seu caso são definidas na avaliação.";

/** As três etapas do CAD/CAM, como descritas em "Odontologia Digital". */
export const cadcamSteps = [
  {
    id: "digitalizacao",
    label: "Digitalização",
    title: "Escaneamento do preparo e do sorriso",
    text: "Os dentes preparados e o sorriso são digitalizados e transmitidos ao computador, permitindo uma análise tridimensional do que precisa ser corrigido. Em muitos casos, essa etapa dispensa a moldagem convencional, tornando-a mais confortável.",
  },
  {
    id: "desenho",
    label: "Desenho (CAD)",
    title: "Projeto da restauração no software",
    text: "Com o sorriso digitalizado, o cirurgião-dentista projeta virtualmente as correções estéticas e funcionais, simulando o resultado com mais precisão e previsibilidade.",
  },
  {
    id: "producao",
    label: "Produção (CAM)",
    title: "Fabricação da peça",
    text: "Na etapa final, as restaurações projetadas são produzidas a partir do modelo virtual e ficam prontas para ser instaladas na boca.",
  },
] as const;

export const cadcamMaterials = ["Cerâmica", "Resinas reforçadas", "Titânio", "Ligas metálicas"] as const;

/**
 * Biossegurança, conforme a seção "Esterilização" do site anterior e a lista de
 * estrutura. Sem citar normas ou certificações: a conformidade atual precisa
 * ser confirmada com a clínica.
 */
export const sterilization = [
  {
    title: "Ambientes e equipamentos",
    text: "Após cada atendimento, a sala e os equipamentos usados passam por assepsia. Os demais ambientes são higienizados com frequência.",
  },
  {
    title: "Instrumentais",
    text: "Os instrumentais são esterilizados depois de cada uso.",
  },
  {
    title: "Proteção do material",
    text: "Depois da esterilização, o material recebe uma embalagem de proteção até o próximo uso.",
  },
  {
    title: "Áreas de apoio",
    text: "Espaços dedicados aos materiais e ao preparo de cada atendimento.",
  },
] as const;

/** História e valores, conforme "Sobre a Clínica" e "Valores Dentarium". */
export const history = {
  title: "A união de dois dentistas e uma mesma filosofia de trabalho.",
  paragraphs: [
    "A Dentarium nasceu da união profissional dos dentistas Gabriel Faria Aiala e Denise Ligório Fialho Aiala, alinhados nos mesmos valores e na mesma filosofia de trabalho.",
    "Desde o início, a inovação é um dos pilares da clínica, ao lado do atendimento multidisciplinar e da atenção a cada paciente.",
  ],
} as const;

export const values = [
  { name: "Qualidade", text: "Excelência no atendimento e nos resultados, com o paciente no centro." },
  { name: "Atenção aos detalhes", text: "Em todos os trabalhos executados." },
  { name: "Inovação", text: "Atualização constante, com foco nos resultados." },
  { name: "Respeito", text: "Em toda e qualquer situação." },
  { name: "Honestidade", text: "Base de uma relação sólida com cada paciente." },
  { name: "Confiança", text: "Construída junto com a honestidade, consulta a consulta." },
] as const;

export const attributes = [
  {
    title: "Atendimento multidisciplinar",
    text: "Diferentes áreas da odontologia reunidas no mesmo endereço.",
  },
  {
    title: "Diagnóstico e planejamento",
    text: "Cada tratamento começa por uma avaliação cuidadosa.",
  },
  {
    title: "Ambiente pensado para o conforto",
    text: "Espaços claros e acolhedores, da recepção aos consultórios.",
  },
  {
    title: "Região Centro-Sul de BH",
    text: "No bairro Serra, com estacionamento próprio.",
  },
] as const;

/** Etapas do atendimento — uma sequência real, por isso numerada. */
export const journey = [
  {
    title: "Entre em contato",
    text: "Pelo WhatsApp, por telefone ou por e-mail, a recepção combina o melhor horário com você.",
  },
  {
    title: "Avaliação clínica",
    text: "Você conta o que motivou a visita e passa pelo exame clínico. Exames complementares, só quando necessários.",
  },
  {
    title: "Planejamento individual",
    text: "O dentista explica o que foi observado e apresenta as alternativas, com o que esperar de cada uma.",
  },
  {
    title: "Acompanhamento",
    text: "Consultas de revisão, durante e depois do tratamento, para manter a saúde da boca.",
  },
] as const;

export const faq = [
  {
    question: "Onde fica a clínica?",
    answer: `Na ${clinic.address.value.street}, no bairro ${clinic.address.value.neighborhood}, em Belo Horizonte. A clínica conta com estacionamento próprio; se precisar, confirme a vaga ao agendar.`,
  },
  {
    question: "Quais áreas da odontologia são atendidas?",
    answer:
      "Prevenção, periodontia, estética, implantes, próteses, enxertos, ortodontia, endodontia, cirurgia de terceiros molares, laserterapia e odontopediatria (incluindo o pré-natal odontológico), entre outras áreas. A indicação de cada tratamento depende de avaliação individual.",
  },
  {
    question: "A clínica tem acessibilidade?",
    answer:
      "A clínica conta com plataforma elevatória. Se você tiver alguma necessidade específica, avise a recepção ao agendar para que tudo esteja preparado.",
  },
  {
    question: "O que levar à primeira consulta?",
    answer:
      "Um documento de identificação e, se tiver, exames e radiografias recentes. Também ajuda informar os medicamentos que você usa. Ao agendar, pergunte se há alguma orientação adicional.",
  },
  {
    question: "Vocês atendem crianças?",
    answer:
      "Sim. O atendimento infantil da clínica se chama Dentarium Kids. Ao agendar, informe a idade da criança para que a recepção indique o melhor horário.",
  },
] as const;
