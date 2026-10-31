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
  onHome?: boolean;
  /** Página do catálogo que aprofunda o assunto. */
  href?: string;
};

export const technologies: Technology[] = [
  {
    id: "imagem",
    stage: "Diagnóstico",
    name: "Radiografia e tomografia",
    text: "Exames de imagem mostram o que o exame clínico não alcança, como raízes, osso e dentes inclusos. A sala de exames fica ao lado dos consultórios, e o paciente faz o exame no mesmo local, acompanhado pelo seu dentista.",
    onHome: true,
  },
  {
    id: "planejamento-digital",
    stage: "Planejamento",
    name: "Planejamento digital do sorriso",
    text: "Fotos, vídeos e software para analisar as proporções do rosto e dos dentes e redesenhar o sorriso antes do tratamento, com o paciente participando das decisões.",
    onHome: true,
    href: "/tratamentos/planejamento-digital-do-sorriso",
  },
  {
    id: "cadcam",
    stage: "Confecção de peças",
    name: "CAD/CAM",
    text: "Sistema que combina escaneamento, desenho digital e fabricação para produzir restaurações, como coroas e facetas, a partir de um modelo virtual.",
    onHome: true,
    href: "/tecnologia#cad-cam",
  },
  {
    id: "anestesia",
    stage: "Conforto",
    name: "Anestesia computadorizada",
    text: "Equipamento digital que introduz o anestésico na gengiva de forma lenta e controlada, buscando uma aplicação mais confortável. Seu uso depende da indicação do profissional.",
    onHome: true,
  },
  {
    id: "laser",
    stage: "Recurso complementar",
    name: "Laser",
    text: "Laser de baixa potência, usado como recurso complementar para favorecer a cicatrização, com ação anti-inflamatória e analgésica, sempre com indicação individual.",
    onHome: true,
    href: "/tratamentos/laserterapia",
  },
  {
    id: "multidisciplinar",
    stage: "Planejamento",
    name: "Análise multidisciplinar",
    text: "Depois da primeira consulta, os profissionais analisam o caso em conjunto, cada um em sua área, para chegar a um diagnóstico e a um plano de tratamento mais completos.",
    href: "/tratamentos/primeira-consulta",
  },
  {
    id: "endodontia",
    stage: "Tratamento de canal",
    name: "Recursos para endodontia",
    text: "Equipamentos de apoio ao tratamento de canal, como o localizador apical, que auxilia o profissional a determinar o comprimento dos canais durante o procedimento.",
    href: "/tratamentos/tratamento-de-canal",
  },
  {
    id: "laboratorio",
    stage: "Confecção de peças",
    name: "Laboratório de prótese",
    text: "Cada sorriso e cada arcada têm características próprias. O laboratório dentro da clínica permite confeccionar as próteses considerando essa individualidade, com apoio do sistema CAD/CAM.",
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

/** Biossegurança, conforme a seção "Esterilização" do site anterior. */
export const sterilization = [
  {
    title: "Sala e equipamentos",
    text: "Após cada atendimento, toda a sala passa por um processo de assepsia, incluindo os equipamentos utilizados.",
  },
  {
    title: "Instrumentais",
    text: "Os instrumentais são esterilizados de acordo com as normas de biossegurança.",
  },
  {
    title: "Proteção do material",
    text: "Depois da esterilização, o material recebe uma embalagem de proteção até o próximo uso.",
  },
  {
    title: "Ambientes",
    text: "Os ambientes são higienizados com frequência, para mais segurança e tranquilidade.",
  },
] as const;

/** Perguntas da página Tecnologia — respostas sustentadas pelo material da clínica. */
export const technologyFaq = [
  {
    question: "O que significa CAD/CAM?",
    answer:
      "É a sigla, em inglês, de Computer Aided Design / Computer Aided Manufacturing: desenho e fabricação assistidos por computador. O sistema digitaliza os dentes, permite projetar a restauração em software e produzi-la a partir desse projeto.",
  },
  {
    question: "Quais materiais podem ser usados no CAD/CAM?",
    answer:
      "A tecnologia permite trabalhar com diferentes materiais, como cerâmica, resinas reforçadas, titânio e ligas metálicas, entre outros. O material de cada peça é definido no planejamento.",
  },
  {
    question: "O escaneamento substitui a moldagem?",
    answer:
      "Em muitos casos, sim: a digitalização dispensa a moldagem convencional, o que torna essa etapa mais confortável. A indicação depende do tratamento planejado.",
  },
  {
    question: "Como funciona a anestesia computadorizada?",
    answer:
      "Um equipamento digital controla a aplicação e introduz o anestésico lentamente na gengiva, com mais precisão. O objetivo é tornar a aplicação mais confortável. O uso é avaliado pelo profissional em cada caso.",
  },
] as const;

/** História e valores, conforme "Sobre a Clínica" e "Valores Dentarium". */
export const history = {
  title: "A união de dois dentistas e uma mesma filosofia de trabalho.",
  paragraphs: [
    "A Dentarium nasceu da união profissional dos dentistas Gabriel Faria Aiala e Denise Ligório Fialho Aiala, alinhados nos mesmos valores e na mesma filosofia de trabalho.",
    "Desde o início, a inovação é um dos principais pilares da clínica, ao lado do atendimento multidisciplinar, com diferentes especialidades analisando cada caso em conjunto, e da atenção individualizada a cada paciente.",
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
    text: "Ligue ou envie um e-mail para combinar o melhor horário. A recepção explica como funciona a primeira consulta.",
  },
  {
    title: "Avaliação clínica",
    text: "Você conta o que motivou a visita e passa por um exame completo. Exames complementares são pedidos apenas quando necessários.",
  },
  {
    title: "Planejamento individual",
    text: "O dentista explica o que foi observado e apresenta as alternativas, com etapas, cuidados e o que esperar de cada uma.",
  },
  {
    title: "Acompanhamento",
    text: "Durante e depois do tratamento, as consultas de revisão ajudam a manter a saúde da boca ao longo do tempo.",
  },
] as const;

// Espaço e hífen não separáveis: o número nunca quebra no meio da linha.
const unbreakable = (text: string) => text.replace(/ /g, "\u00a0").replace(/-/g, "\u2011");
const phoneList = clinic.phones.value.map((p) => unbreakable(p.display)).join(" ou ");

export const faq = [
  {
    question: "Como agendar uma avaliação?",
    answer: `Pelo WhatsApp ${unbreakable(clinic.whatsapp.value.display)}, pelos telefones ${phoneList} ou pelo e-mail ${clinic.email.value}. A clínica atende de segunda a sexta, das 8h às 18h30. O horário fica confirmado quando a recepção responder.`,
  },
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
    question: "Como funciona a primeira consulta?",
    answer:
      "Começa com uma conversa e a anamnese, um levantamento da sua saúde geral, seguidas de exame clínico e, quando necessário, fotografias. Depois, os profissionais analisam o caso em conjunto, e um retorno é marcado para apresentar o diagnóstico e o plano de tratamento.",
  },
  {
    question: "Vocês atendem crianças?",
    answer:
      "Sim. O atendimento infantil da clínica se chama Dentarium Kids. Ao agendar, informe a idade da criança para que a recepção indique o melhor horário.",
  },
] as const;
