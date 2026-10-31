import type { VerificationStatus } from "./clinic";

/**
 * Profissionais divulgados no site oficial anterior (info-dentarium.pdf).
 * Nenhuma formação, especialidade, cargo ou tempo de experiência além do que
 * foi divulgado é atribuído aqui.
 */
export type TeamMember = {
  /** Âncora da página Equipe (ex.: /equipe#fernanda-bastos). */
  id: string;
  name: string;
  /** Tratamento usado na apresentação: "Dr." ou "Dra.". */
  title: "Dr." | "Dra.";
  /** Registro como divulgado pela clínica. */
  cro: string;
  /** Função exibida ao visitante — só quando divulgada pela clínica. */
  role?: string;
  /** Formações e especialidades exatamente como divulgadas. */
  credentials: string[];
  /** Tratamento do catálogo ligado à área divulgada, quando houver. */
  area?: { label: string; slug: string };
  status: VerificationStatus;
  note: string;
  /** Chave de `images` com o retrato individual. */
  photo: "gabriel" | "denise" | "fernanda";
  photoEvidence: string;
};

export const team: TeamMember[] = [
  {
    id: "gabriel-aiala",
    name: "Gabriel Faria Aiala",
    title: "Dr.",
    cro: "33.950",
    role: "Fundador",
    credentials: ["Mestre em Implantodontia", "Especialista em Periodontia", "Especialista em Odontologia Legal"],
    status: "public-site-unconfirmed",
    note: "Situação da inscrição e títulos a confirmar antes da publicação.",
    photo: "gabriel",
    photoEvidence: "Arquivo gabriel.png, retrato individual entregue pela clínica; jaleco bordado com o nome.",
  },
  {
    id: "denise-aiala",
    name: "Denise Ligório Fialho Aiala",
    title: "Dra.",
    cro: "35.195",
    role: "Fundadora",
    credentials: ["Pós-graduada em Periodontia", "Mestrado em Periodontia", "Especialista em Endodontia"],
    status: "public-site-unconfirmed",
    note: "Situação da inscrição e títulos a confirmar antes da publicação.",
    photo: "denise",
    photoEvidence: "Arquivo denise.png, retrato individual entregue pela clínica; jaleco bordado “Dra. Denise Fialho”.",
  },
  {
    id: "fernanda-bastos",
    name: "Fernanda de Paula T. Bastos",
    title: "Dra.",
    cro: "24.533",
    credentials: ["Odontopediatria"],
    area: { label: "Odontopediatria", slug: "odontopediatria" },
    status: "public-site-unconfirmed",
    note: "Vínculo atual, registro e título de especialista a confirmar.",
    photo: "fernanda",
    photoEvidence: "Arquivo fernanda.png, retrato individual entregue pela clínica; jaleco bordado com o nome.",
  },
];

export const founders = team.filter((m) => m.role?.startsWith("Fundador"));
