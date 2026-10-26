export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/", label: "Início" },
  { href: "/a-clinica", label: "A Clínica" },
  { href: "/tratamentos", label: "Tratamentos" },
  { href: "/tecnologia", label: "Tecnologia" },
  { href: "/equipe", label: "Equipe" },
  { href: "/contato", label: "Contato" },
];

export const scheduleCta: NavItem = { href: "/contato#agendar", label: "Agendar avaliação" };

export const legalNav: NavItem[] = [{ href: "/privacidade", label: "Aviso de privacidade" }];

/** Rotas estáticas existentes — usadas nos testes para validar links internos. */
export const staticRoutes = [
  "/",
  "/a-clinica",
  "/tratamentos",
  "/tecnologia",
  "/equipe",
  "/contato",
  "/privacidade",
] as const;
