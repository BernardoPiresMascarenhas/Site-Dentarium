import type { VerificationStatus } from "./clinic";

/**
 * Profissionais citados no site anterior. Nenhuma formação, especialidade ou
 * cargo além do que foi divulgado é atribuído aqui. A foto coletiva dos
 * fundadores não é usada para individualizar ninguém.
 */
export type TeamMember = {
  name: string;
  /** Registro exatamente como apresentado no site anterior. */
  cro: string;
  /** Função exibida ao visitante — só quando divulgada pela clínica. */
  role?: string;
  status: VerificationStatus;
  note: string;
  /**
   * Chave de `images` com a foto individual do profissional. Só preencher
   * quando houver evidência de quem é a pessoa retratada.
   */
  photo?: "profissional";
  photoEvidence?: string;
};

export const team: TeamMember[] = [
  {
    name: "Denise Ligório Fialho Aiala",
    cro: "35.195",
    role: "Fundadora",
    status: "public-site-unconfirmed",
    note: "Situação da inscrição a confirmar antes da publicação.",
  },
  {
    name: "Gabriel Faria Aiala",
    cro: "33.950",
    role: "Fundador",
    status: "public-site-unconfirmed",
    note: "Situação da inscrição a confirmar antes da publicação.",
    photo: "profissional",
    photoEvidence:
      "Mesmo profissional que, em fundadores.webp, veste jaleco bordado “…riel Aiala” (a fundadora veste “Dra. Denise Fialho”). Confirmar com a clínica.",
  },
  {
    name: "Fernanda de Paula T. Bastos",
    cro: "24533",
    status: "public-site-unconfirmed",
    note: "Vínculo atual e dados de registro a confirmar.",
  },
];

export const founders = team.filter((m) => m.role?.startsWith("Fundador"));
