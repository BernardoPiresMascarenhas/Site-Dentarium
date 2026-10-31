/**
 * Dados institucionais da Clínica Dentarium.
 *
 * Todos os valores vieram do site público anterior (clinicadentarium.com.br),
 * conforme o briefing. Nada aqui foi confirmado com a clínica: cada campo
 * carrega `status` para que a interface e o checklist de publicação saibam
 * o que ainda precisa de revisão.
 */

export type VerificationStatus =
  | "confirmed"
  | "public-site-unconfirmed"
  | "placeholder";

export type Verified<T> = {
  value: T;
  status: VerificationStatus;
  source: string;
  lastVerified: string | null;
  note?: string;
};

const PUBLIC_SITE = "https://clinicadentarium.com.br/";
const BRIEFING_DATE = "2026-10-24";

function fromProjectOwner<T>(value: T): Verified<T> {
  return {
    value,
    status: "confirmed",
    source: "Informado pelo responsável pelo projeto",
    lastVerified: "2026-10-30",
  };
}

function fromPublicSite<T>(value: T, note?: string): Verified<T> {
  return {
    value,
    status: "public-site-unconfirmed",
    source: PUBLIC_SITE,
    lastVerified: BRIEFING_DATE,
    note,
  };
}

export type Phone = {
  label: string;
  display: string;
  /** Formato E.164 usado em links `tel:`. */
  e164: string;
};

export const clinic = {
  name: "Clínica Dentarium",
  tagline: "Odontologia funcional e estética",

  address: fromPublicSite({
    street: "Rua do Ouro, 857",
    neighborhood: "Serra",
    city: "Belo Horizonte",
    state: "MG",
    region: "Região Centro-Sul",
  }),

  phones: fromPublicSite<Phone[]>([
    { label: "Recepção", display: "(31) 3261-6991", e164: "+553132616991" },
    { label: "Recepção", display: "(31) 3785-3126", e164: "+553137853126" },
  ]),

  email: fromPublicSite("contato@clinicadentarium.com.br"),

  /**
   * Horário e WhatsApp informados pelo responsável pelo projeto em
   * 2026-10-30, para atualização em todo o site.
   */
  hours: fromProjectOwner("Segunda a sexta, das 8h às 18h30"),
  /** Horário por dia, para a página de contato e o rodapé. */
  schedule: [
    { days: "Segunda a sexta-feira", time: "08h às 18h30" },
    { days: "Sábado", time: "Fechado" },
    { days: "Domingo", time: "Fechado" },
  ],

  whatsapp: fromProjectOwner<Phone>({
    label: "WhatsApp",
    display: "(31) 99808-3126",
    e164: "+5531998083126",
  }),
  /**
   * Estrutura descrita no site oficial anterior (seções "Sobre" e
   * "Estrutura"). Itens com `equipment: true` dependem de equipamento ou
   * serviço técnico: são exibidos porque constam do material da clínica e a
   * sala de radiografia aparece em fotografia, mas a situação atual precisa
   * ser confirmada (ver docs/REVISAO_CONTEUDO_DENTARIUM.md).
   */
  facilities: fromPublicSite([
    { label: "Estacionamento próprio", text: "Vagas na entrada da clínica, na Rua do Ouro." },
    { label: "Plataforma elevatória", text: "Acesso para pessoas com mobilidade reduzida." },
    { label: "Sala de espera", text: "Poltronas acolchoadas, televisão e lavabo." },
    {
      label: "Consultórios equipados",
      text: "Com televisão e mesa de atendimento com computador, para apresentar as possibilidades de tratamento.",
    },
    {
      label: "Radiografia e tomografia",
      text: "Sala de exames de imagem ao lado dos consultórios: o exame é feito no mesmo local, com o acompanhamento do seu dentista.",
      equipment: true,
    },
    {
      label: "Laboratório de prótese",
      text: "Confecção de próteses dentro da clínica, com peças produzidas também pelo sistema CAD/CAM.",
      equipment: true,
    },
    { label: "Apoio clínico", text: "Áreas dedicadas aos materiais e ao preparo de cada atendimento." },
  ]),
} as const;

export const demoNotice =
  "Estudo conceitual de redesign: projeto independente, não é o site oficial da Clínica Dentarium.";

export function fullAddress() {
  const a = clinic.address.value;
  return `${a.street}, ${a.neighborhood}, ${a.city}/${a.state}`;
}

export function mapsUrl() {
  const a = clinic.address.value;
  const query = `${a.street}, ${a.neighborhood}, ${a.city} - ${a.state}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Ficha "Dentarium" no Google Maps, conferida em 2026-10-30: R. do Ouro, 857,
 * Serra, Belo Horizonte/MG, CEP 30220-000, com o site clinicadentarium.com.br
 * e o WhatsApp (31) 99808-3126. O `embedSrc` é o código oficial de
 * "Compartilhar > Incorporar um mapa" dessa ficha (não exige chave de API).
 */
export const googleMaps = {
  placeName: "Dentarium",
  postalCode: "30220-000",
  placeUrl:
    "https://www.google.com/maps/place/Dentarium/@-19.9385362,-43.9199912,17z/data=!3m1!4b1!4m6!3m5!1s0xa699be9f59bc37:0xe0a2f87764437ea3!8m2!3d-19.9385362!4d-43.9199912!16s%2Fg%2F11dy1m33_0",
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.6645432236132!2d-43.9199912!3d-19.938536199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa699be9f59bc37%3A0xe0a2f87764437ea3!2sDentarium!5e0!3m2!1spt-BR!2sbr!4v1793408988777!5m2!1spt-BR!2sbr",
} as const;

/** Rotas até a clínica (Google Maps URLs, `api=1`: não exige chave). */
export function directionsUrl() {
  const destination = `${googleMaps.placeName}, R. do Ouro, 857 - Serra, Belo Horizonte - MG, ${googleMaps.postalCode}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

export function telHref(phone: Phone) {
  return `tel:${phone.e164}`;
}

export function mailtoHref(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString().replace(/\+/g, "%20");
  return `mailto:${clinic.email.value}${qs ? `?${qs}` : ""}`;
}

/** Mensagem padrão do botão geral de WhatsApp. */
export const WHATSAPP_GENERAL_MESSAGE =
  "Olá! Gostaria de saber mais sobre os atendimentos da Clínica Dentarium.";

/**
 * Link `wa.me` com a mensagem já escrita. Abrir a conversa não agenda nada:
 * o visitante revisa e envia a mensagem pelo próprio WhatsApp.
 */
export function whatsappHref(message: string = WHATSAPP_GENERAL_MESSAGE): string {
  const number = clinic.whatsapp.value.e164.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const SCHEDULE_SUBJECT = "Agendamento de avaliação";
