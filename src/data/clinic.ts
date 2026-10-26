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

  hours: fromPublicSite(
    "Segunda a sexta, das 8h às 18h30",
    "Horário exibido no cabeçalho do site anterior.",
  ),

  /**
   * O site anterior mostra dois números diferentes: (31) 9808-3126 no cabeçalho
   * e (31) 99808-3126 no rodapé. Nenhum link `wa.me` é gerado enquanto este
   * campo for `null`.
   */
  whatsappVerified: null as Phone | null,
  whatsappCandidates: ["(31) 9808-3126", "(31) 99808-3126"],

  /**
   * `equipment: true` marca itens que dependem de equipamento ou serviço
   * técnico. Eles ficam fora da interface até a confirmação com a clínica.
   */
  facilities: fromPublicSite([
    { label: "Estacionamento próprio" },
    { label: "Acessibilidade com plataforma elevatória" },
    { label: "Sala de espera" },
    { label: "Consultórios" },
    { label: "Laboratório de próteses", equipment: true },
    { label: "Exames de imagem no local", equipment: true },
  ]),
} as const;

/** Itens de estrutura exibidos ao visitante. */
export function publicFacilities() {
  return clinic.facilities.value.filter((f) => !("equipment" in f && f.equipment)).map((f) => f.label);
}

export const demoNotice =
  "Estudo conceitual de redesign — projeto independente, não é o site oficial da Clínica Dentarium.";

export function fullAddress() {
  const a = clinic.address.value;
  return `${a.street} — ${a.neighborhood}, ${a.city}/${a.state}`;
}

export function mapsUrl() {
  const a = clinic.address.value;
  const query = `${a.street}, ${a.neighborhood}, ${a.city} - ${a.state}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
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

export function whatsappHref(): string | null {
  const number = clinic.whatsappVerified;
  if (!number) return null;
  return `https://wa.me/${number.e164.replace(/\D/g, "")}`;
}

export const SCHEDULE_SUBJECT = "Agendamento de avaliação";
