import { describe, expect, it } from "vitest";

import { googleReviewLinks, publishedReviews, reviews } from "./reviews";

/** Textos exatamente como fornecidos — qualquer edição deve quebrar o teste. */
const ORIGINAL: Record<string, string> = {
  "Ana Flavia Ceolin":
    "Excelente atendimento da marcação ao resultado final. Atenção diferenciada a todas as nossas necessidades. Dra Denise tem mãos de fada. Tenho aversão à anestesia, mas não gosto de sentir dor. Com ela consigo tolerar os procedimentos sem incômodo algum.",
  "Jane Baptista":
    "Clínica dentária com serviços de várias intervenções, inclusiva ortodôntica. O ambiente é muito agradável, com atendentes simpáticos e atenciosos. Os profissionais são competentes, explicam com atenção e paciência a todas às indagações. O serviço prestado foi de alta qualidade. Estou muito contente com a escolha desta clínica.",
  "MG Soluções BH licitação para gênero alimentício":
    "Espetacular. Profissionais de altíssimo nível e excelente atendimento. Recomendação máxima",
  "Corei Max": "Excelente, atendimento perfeito.",
  "Nathalie Bambirra":
    "Ambiente acolhedor, bem localizado, estrutura de primeiríssima qualidade e profissionais maravilhosos. Não é a toa que toda minha família cuida dos dentes aqui.",
};

describe("avaliações", () => {
  it("publica exatamente as 5 avaliações completas, com o texto original", () => {
    expect(publishedReviews.map((r) => r.author)).toEqual(Object.keys(ORIGINAL));
    for (const r of publishedReviews) expect(r.text).toBe(ORIGINAL[r.author]);
  });

  it("mantém as 3 avaliações truncadas cadastradas, mas fora do site", () => {
    const incomplete = reviews.filter((r) => r.status === "incomplete");
    expect(incomplete.map((r) => r.author)).toEqual([
      "Wenderson luiz Vieira",
      "Ankelly Marques",
      "ana luiza amaral cornelio",
    ]);
    for (const r of incomplete) {
      expect(r.text.trim().endsWith("…")).toBe(true);
      expect(publishedReviews).not.toContain(r);
    }
  });

  it("exibe nota só nas avaliações publicadas, com a nota confirmada (5)", () => {
    for (const r of publishedReviews) expect(r.rating).toBe(5);
    for (const r of reviews.filter((x) => x.status === "incomplete")) expect(r.rating).toBeNull();
  });

  it("usa ids únicos", () => {
    const ids = reviews.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("só aceita links do Google quando configurados com o domínio oficial", () => {
    for (const url of Object.values(googleReviewLinks)) {
      if (url !== null)
        expect(url).toMatch(/^https:\/\/(www\.google\.com\/(maps|search\?q=dentarium)|search\.google\.com\/local\/writereview|g\.page)/);
    }
  });
});
