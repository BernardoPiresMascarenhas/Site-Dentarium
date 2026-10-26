import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { clinic, mailtoHref, mapsUrl, telHref, whatsappHref } from "./clinic";
import { faq, journey } from "./content";
import { mainNav, staticRoutes } from "./navigation";
import { team } from "./team";
import { categories, featuredTreatments, getTreatment, treatments } from "./treatments";

const SRC = join(__dirname, "..");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(tsx?|css)$/.test(name) && !name.endsWith(".test.ts") ? [full] : [];
  });
}

const allSource = sourceFiles(SRC).map((f) => ({ file: f, text: readFileSync(f, "utf8") }));

describe("tratamentos", () => {
  it("tem as seis rotas obrigatórias do briefing", () => {
    for (const slug of [
      "implantes",
      "ortodontia",
      "clareamento",
      "proteses",
      "tratamento-de-canal",
      "odontopediatria",
    ]) {
      expect(getTreatment(slug), slug).toBeDefined();
    }
  });

  it("destaca exatamente seis tratamentos na home", () => {
    expect(featuredTreatments).toHaveLength(6);
  });

  it("usa slugs únicos e válidos para URL", () => {
    const slugs = treatments.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("aponta apenas para tratamentos relacionados existentes", () => {
    for (const t of treatments) {
      for (const r of t.related) {
        expect(getTreatment(r), `${t.slug} → ${r}`).toBeDefined();
        expect(r).not.toBe(t.slug);
      }
    }
  });

  it("coloca todo tratamento em uma categoria existente e nenhuma categoria vazia", () => {
    const ids = categories.map((c) => c.id as string);
    for (const t of treatments) expect(ids).toContain(t.category);
    for (const c of categories) expect(treatments.some((t) => t.category === c.id), c.id).toBe(true);
  });

  it("tem conteúdo completo em cada página", () => {
    for (const t of treatments) {
      expect(t.intro.length, t.slug).toBeGreaterThan(120);
      expect(t.whenToTalk.length, t.slug).toBeGreaterThanOrEqual(2);
      expect(t.overview.length, t.slug).toBeGreaterThanOrEqual(3);
      expect(t.faq.length, t.slug).toBeGreaterThanOrEqual(1);
    }
  });
});

describe("conteúdo responsável", () => {
  const forbidden = [
    /garantid[oa]/i,
    /sem dor/i,
    /1% das clínicas/i,
    /preços? especia/i,
    /consulta grátis/i,
    /mais rápido/i,
    /depoimento/i,
    /\d+\s*anos de experiência/i,
    /\d+\s*(mil\s*)?pacientes/i,
  ];

  const texts = [
    ...treatments.flatMap((t) => [t.summary, t.intro, ...t.whenToTalk, ...t.overview.map((o) => o.text), ...t.faq.map((f) => f.answer)]),
    ...faq.map((f) => f.answer),
    ...journey.map((j) => j.text),
  ];

  it("não contém promessas nem afirmações absolutas proibidas", () => {
    for (const text of texts) {
      for (const re of forbidden) expect(text, text).not.toMatch(re);
    }
  });
});

describe("contato", () => {
  it("não ativa WhatsApp sem número confirmado", () => {
    expect(clinic.whatsappVerified).toBeNull();
    expect(whatsappHref()).toBeNull();
    for (const { file, text } of allSource) {
      expect(text, file).not.toMatch(/wa\.me\/\d/);
    }
  });

  it("gera links tel:, mailto: e de mapa válidos", () => {
    for (const p of clinic.phones.value) expect(telHref(p)).toMatch(/^tel:\+55\d{10,11}$/);
    expect(mailtoHref("Agendamento de avaliação")).toBe(
      "mailto:contato@clinicadentarium.com.br?subject=Agendamento%20de%20avalia%C3%A7%C3%A3o",
    );
    expect(mapsUrl()).toMatch(/^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=Rua%20do%20Ouro/);
  });

  it("marca os dados do site anterior como não confirmados", () => {
    expect(clinic.address.status).toBe("public-site-unconfirmed");
    expect(clinic.hours.status).toBe("public-site-unconfirmed");
    for (const m of team) expect(m.status).not.toBe("confirmed");
  });
});

describe("imagens", () => {
  it("nunca importa fotos restritas em componentes", () => {
    for (const { file, text } of allSource) {
      if (file.endsWith(join("data", "images.ts"))) {
        expect(text).not.toMatch(/import .* from ".*(atendimento-procedimento|recepcao-familia|tomografia)\.webp"/);
        continue;
      }
      expect(text, file).not.toMatch(/atendimento-procedimento|recepcao-familia|tomografia\.(webp|png)/);
    }
  });
});

describe("navegação", () => {
  it("só aponta para rotas existentes", () => {
    const valid = new Set<string>([...staticRoutes, ...treatments.map((t) => `/tratamentos/${t.slug}`)]);
    for (const item of mainNav) expect(valid.has(item.href), item.href).toBe(true);

    // Todo href interno literal no código precisa existir.
    const hrefs = allSource.flatMap(({ text }) =>
      [...text.matchAll(/href[=:]\s*\{?["'`](\/[^"'`#?$]*)/g)].map((m) => m[1]),
    );
    expect(hrefs.length).toBeGreaterThan(15);
    for (const href of hrefs) {
      if (href.startsWith("/tratamentos/")) continue; // montado com slug dinâmico
      const path = href === "/" ? "/" : href.replace(/\/$/, "");
      expect(valid.has(path), href).toBe(true);
    }
  });

  it("mantém cada página de rota com arquivo correspondente", () => {
    for (const route of staticRoutes) {
      const file = route === "/" ? "app/page.tsx" : `app${route}/page.tsx`;
      expect(() => statSync(join(SRC, file)), file).not.toThrow();
    }
  });
});

describe("marca", () => {
  const read = (rel: string) => readFileSync(join(SRC, rel), "utf8");

  it("usa a logomarca oficial no header, no menu mobile e no rodapé", () => {
    for (const file of ["components/layout/Header.tsx", "components/layout/MobileMenu.tsx", "components/layout/Footer.tsx"]) {
      expect(read(file), file).toMatch(/<Logo\b/);
    }
    expect(read("data/brand.ts")).toMatch(/public\/images\/dentarium\/logo-dentarium/);
  });

  it("não mantém o wordmark provisório nem a paleta verde antiga", () => {
    for (const { file, text } of allSource) {
      expect(text, file).not.toMatch(/Wordmark|petrol|#3e5f59/i);
    }
  });

  it("define só a altura da logo, preservando a proporção", () => {
    const logo = read("components/ui/Logo.tsx");
    expect(logo).toMatch(/w-auto/);
    expect(logo).toMatch(/aspectRatio: logo\.ratio/);
  });
});

describe("distribuição das fotografias", () => {
  const read = (rel: string) => readFileSync(join(SRC, rel), "utf8");
  const usesOf = (key: string) =>
    allSource.filter(({ file, text }) => !file.endsWith(join("data", "images.ts")) && text.includes(`images.${key}`)).map(({ file }) => file);

  it("usa a nova foto da equipe somente no hero da home", () => {
    expect(usesOf("heroEquipe").map((f) => f.split("src/")[1])).toEqual(["components/home/Hero.tsx"]);
  });

  it("não repete a foto antiga dos fundadores fora da página A Clínica", () => {
    expect(usesOf("fundadores").map((f) => f.split("src/")[1])).toEqual(["components/home/Founders.tsx"]);
    expect(read("app/page.tsx")).not.toMatch(/withPhoto/);
    expect(read("app/a-clinica/page.tsx")).toMatch(/<Founders withPhoto/);
  });

  it("associa a foto individual a um único profissional, com evidência registrada", () => {
    const withPhoto = team.filter((m) => m.photo);
    expect(withPhoto.map((m) => m.name)).toEqual(["Gabriel Faria Aiala"]);
    expect(withPhoto[0].photoEvidence).toBeTruthy();
  });

  it("não referencia nomes antigos de arquivos", () => {
    for (const { file, text } of allSource) {
      expect(text, file).not.toMatch(/sala-tecnica-biosseguranca|galleryImages/);
    }
  });
});
