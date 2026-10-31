import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { images, tourChapters } from "./images";
import { clinic, mailtoHref, mapsUrl, telHref, whatsappHref } from "./clinic";
import { cadcamSteps, faq, journey, sterilization, technologies, technologyFaq } from "./content";
import { mainNav, staticRoutes } from "./navigation";
import { team } from "./team";
import { categories, featuredTreatments, getTreatment, treatmentWhatsappMessage, treatments } from "./treatments";
import { reviewOnlyMedia, treatmentMedia } from "./treatmentMedia";

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
    /indolor/i,
    /ISO 9002/i,
    /perfeit[oa]/i,
    /preços? especia/i,
    /consulta grátis/i,
    /mais rápido/i,
    /depoimento/i,
    /\d+\s*anos de experiência/i,
    /\d+\s*(mil\s*)?pacientes/i,
  ];

  const texts = [
    ...treatments.flatMap((t) => [
      t.summary,
      t.intro,
      ...t.whenToTalk,
      ...t.overview.map((o) => o.text),
      ...t.faq.map((f) => f.answer),
      ...(t.details ?? []).flatMap((d) => [...d.paragraphs, ...(d.points ?? [])]),
      ...(t.care ?? []),
    ]),
    ...technologies.map((t) => t.text),
    ...technologyFaq.map((f) => f.answer),
    ...cadcamSteps.map((s) => s.text),
    ...sterilization.map((s) => s.text),
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
  it("gera o link do WhatsApp com o número confirmado e a mensagem pronta", () => {
    expect(clinic.whatsapp.value.display).toBe("(31) 99808-3126");
    expect(clinic.whatsapp.status).toBe("confirmed");
    const general = whatsappHref();
    expect(general.startsWith("https://wa.me/5531998083126?text=")).toBe(true);
    expect(decodeURIComponent(general.split("text=")[1])).toBe(
      "Olá! Gostaria de saber mais sobre os atendimentos da Clínica Dentarium.",
    );
    const implantes = treatments.find((t) => t.slug === "implantes")!;
    expect(treatmentWhatsappMessage(implantes)).toBe(
      "Olá! Gostaria de informações sobre o tratamento de implantes dentários e como agendar uma avaliação.",
    );
  });

  it("publica o horário de segunda a sexta, com fim de semana fechado", () => {
    expect(clinic.hours.value).toBe("Segunda a sexta, das 8h às 18h30");
    expect(clinic.schedule.map((s) => s.time)).toEqual(["08h às 18h30", "Fechado", "Fechado"]);
  });

  it("gera links tel:, mailto: e de mapa válidos", () => {
    for (const p of clinic.phones.value) expect(telHref(p)).toMatch(/^tel:\+55\d{10,11}$/);
    expect(mailtoHref("Agendamento de avaliação")).toBe(
      "mailto:contato@clinicadentarium.com.br?subject=Agendamento%20de%20avalia%C3%A7%C3%A3o",
    );
    expect(mapsUrl()).toMatch(/^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=Rua%20do%20Ouro/);
  });

  it("usa cada ilustração de tratamento em um único lugar e credita as licenciadas", () => {
    const used = treatments.flatMap((t) => [t.feature?.media, ...(t.details ?? []).map((d) => d.media)].filter(Boolean));
    expect(new Set(used).size).toBe(used.length);
    for (const key of Object.keys(treatmentMedia)) expect(used).toContain(key);
    for (const m of Object.values(treatmentMedia)) {
      if (m.origin === "licenciada") expect("credit" in m && m.credit?.license).toBeTruthy();
    }
  });

  it("não importa as imagens reservadas para revisão em nenhuma página", () => {
    const code = sourceFiles(SRC)
      .filter((f) => /\.tsx?$/.test(f) && !f.endsWith("treatmentMedia.ts") && !f.endsWith(".test.ts"))
      .map((f) => readFileSync(f, "utf8"))
      .join("\n");
    for (const m of reviewOnlyMedia) {
      const name = m.file.split("/").pop()!;
      expect(code).not.toContain(name);
    }
  });

  it("marca os dados do site anterior como não confirmados", () => {
    expect(clinic.address.status).toBe("public-site-unconfirmed");
    for (const m of team) expect(m.status).not.toBe("confirmed");
  });
});

describe("imagens", () => {
  it("publica as fotos do site anterior com autorização informada", () => {
    const keys = ["recepcaoFamilia", "tomografia", "atendimentoProcedimento", "primeiraConsulta"] as const;
    for (const k of keys) expect(images[k].alt.length).toBeGreaterThan(40);
    expect(tourChapters.some((c) => c.photos.includes(images.recepcaoFamilia))).toBe(true);
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

  it("dá a cada profissional o próprio retrato, com evidência registrada", () => {
    const photos = team.map((m) => m.photo);
    expect(new Set(photos).size).toBe(team.length);
    for (const m of team) expect(m.photoEvidence, m.name).toBeTruthy();
    expect(usesOf("profissional")).toEqual([]);
  });

  it("só apresenta como fundadores Gabriel e Denise", () => {
    expect(team.filter((m) => m.role).map((m) => m.name).sort()).toEqual([
      "Denise Ligório Fialho Aiala",
      "Gabriel Faria Aiala",
    ]);
  });

  it("não referencia nomes antigos de arquivos", () => {
    for (const { file, text } of allSource) {
      expect(text, file).not.toMatch(/sala-tecnica-biosseguranca|galleryImages/);
    }
  });
});
