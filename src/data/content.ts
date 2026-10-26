import { clinic } from "./clinic";

/**
 * Recursos tecnológicos citados no site anterior. Os textos explicam O QUE é
 * cada recurso e como ele apoia o cuidado — sem afirmar disponibilidade, que
 * ainda precisa ser confirmada com a clínica (ver PENDENCIAS_PUBLICACAO.md).
 */
export const technologies = [
  {
    id: "imagem",
    stage: "Diagnóstico",
    name: "Radiografia digital e tomografia",
    text: "Exames de imagem ajudam a enxergar o que o exame clínico não alcança, como raízes, osso e dentes inclusos. Eles apoiam o diagnóstico e o planejamento quando indicados.",
  },
  {
    id: "planejamento",
    stage: "Planejamento",
    name: "Planejamento multidisciplinar",
    text: "Quando o caso envolve mais de uma área, as etapas são pensadas em conjunto para que cada tratamento considere os demais.",
  },
  {
    id: "cadcam",
    stage: "Confecção de peças",
    name: "CAD/CAM",
    text: "Sistema que combina escaneamento, desenho digital e fresagem para produzir peças como coroas e facetas a partir de um modelo virtual.",
  },
  {
    id: "anestesia",
    stage: "Conforto",
    name: "Anestesia computadorizada",
    text: "Equipamento que controla, de forma gradual, o ritmo de aplicação do anestésico. Seu uso depende da indicação do profissional.",
  },
  {
    id: "laser",
    stage: "Recurso complementar",
    name: "Laser",
    text: "Pode ser usado em algumas situações clínicas como recurso complementar, sempre com indicação individual.",
  },
] as const;

export const technologyNote =
  "A disponibilidade de cada recurso e a indicação para o seu caso são definidas na avaliação.";

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
    answer: `Por telefone, nos números ${phoneList}, ou pelo e-mail ${clinic.email.value}. O atendimento por WhatsApp será informado assim que o número oficial for confirmado.`,
  },
  {
    question: "Onde fica a clínica?",
    answer: `Na ${clinic.address.value.street}, no bairro ${clinic.address.value.neighborhood}, em Belo Horizonte. A clínica conta com estacionamento próprio; se precisar, confirme a vaga ao agendar.`,
  },
  {
    question: "Quais áreas da odontologia são atendidas?",
    answer:
      "Prevenção, periodontia, estética, implantes, próteses, ortodontia, endodontia, cirurgia de terceiros molares e odontopediatria, entre outras áreas. A indicação de cada tratamento depende de avaliação individual.",
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
    question: "Como funciona a avaliação?",
    answer:
      "É uma conversa seguida de exame clínico. A partir dela, o dentista explica o que observou e quais caminhos são possíveis. Nenhum tratamento é decidido sem que você entenda as alternativas.",
  },
  {
    question: "Vocês atendem crianças?",
    answer:
      "Sim. O atendimento infantil da clínica se chama Dentarium Kids. Ao agendar, informe a idade da criança para que a recepção indique o melhor horário.",
  },
] as const;
