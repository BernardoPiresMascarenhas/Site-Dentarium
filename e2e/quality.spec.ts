import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/a-clinica", "/tratamentos", "/tratamentos/implantes", "/tecnologia", "/equipe", "/contato", "/privacidade"];

test.describe("acessibilidade (axe)", () => {
  for (const route of routes) {
    test(`${route} sem violações sérias ou críticas`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });
      // Garante que as animações de entrada terminaram antes de medir contraste.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1200);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      const serious = results.violations
        .filter((v) => v.impact === "serious" || v.impact === "critical")
        .map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
      expect(serious, serious.join("\n")).toEqual([]);
    });
  }
});

test.describe("desempenho", () => {
  test("home: LCP, CLS e peso dentro do orçamento", async ({ page }) => {
    const transferred: number[] = [];
    page.on("response", async (r) => {
      const len = Number(r.headers()["content-length"] ?? 0);
      if (len) transferred.push(len);
    });
    await page.goto("/", { waitUntil: "networkidle" });
    const metrics = await page.evaluate(
      () =>
        new Promise<{ lcp: number; cls: number }>((resolve) => {
          let lcp = 0;
          let cls = 0;
          new PerformanceObserver((list) => {
            for (const e of list.getEntries()) lcp = e.startTime;
          }).observe({ type: "largest-contentful-paint", buffered: true });
          new PerformanceObserver((list) => {
            for (const e of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
              if (!e.hadRecentInput) cls += e.value;
            }
          }).observe({ type: "layout-shift", buffered: true });
          setTimeout(() => resolve({ lcp, cls }), 1500);
        }),
    );
    const totalKb = transferred.reduce((a, b) => a + b, 0) / 1024;
    console.log(`[desempenho] LCP ${Math.round(metrics.lcp)} ms · CLS ${metrics.cls.toFixed(3)} · ~${Math.round(totalKb)} KB`);
    expect(metrics.cls).toBeLessThan(0.1);
    expect(metrics.lcp).toBeLessThan(2500);
  });
});

test.describe("fotografias", () => {
  for (const route of routes) {
    test(`${route}: todas as imagens carregam`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });
      // Força o carregamento das imagens lazy.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
      });
      await page.waitForLoadState("networkidle");
      const broken = await page.evaluate(() =>
        [...document.images]
          .filter((img) => img.checkVisibility() && (!img.complete || img.naturalWidth === 0))
          .map((img) => img.getAttribute("alt") || img.currentSrc),
      );
      expect(broken).toEqual([]);
    });
  }

  test("distribuição: cada retrato só onde foi planejado", async ({ page }) => {
    const alts = async (route: string) => {
      await page.goto(route, { waitUntil: "networkidle" });
      return page.locator("main img").evaluateAll((els) => els.map((e) => e.getAttribute("alt") ?? ""));
    };
    const home = await alts("/");
    expect(home.filter((a) => a.startsWith("Os fundadores da Dentarium, uma mulher"))).toHaveLength(1);
    expect(home.some((a) => a.includes("de jaleco cinza"))).toBe(false); // fundadores.webp fora da home
    expect(home.some((a) => a.startsWith("Gabriel"))).toBe(false);

    const equipe = await alts("/equipe");
    expect(equipe.filter((a) => a.startsWith("Gabriel Faria Aiala"))).toHaveLength(1);
    expect(equipe.some((a) => a.startsWith("Os fundadores"))).toBe(false);

    const clinica = await alts("/a-clinica");
    expect(clinica.filter((a) => a.includes("de jaleco cinza"))).toHaveLength(1);
  });
});
