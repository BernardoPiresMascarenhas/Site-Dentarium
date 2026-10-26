import { expect, type Page, test } from "@playwright/test";

const region = (page: Page) => page.getByRole("region", { name: "Avaliações de pacientes" });
const cards = (page: Page) => region(page).locator("article");

/** Posição horizontal atual do primeiro card (translateX em px). */
const firstX = (page: Page) =>
  cards(page)
    .first()
    .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);

async function gotoReviews(page: Page) {
  await page.goto("/");
  await region(page).scrollIntoViewIfNeeded();
  // Mouse fora do carrossel.
  await page.mouse.move(2, 2);
}

test.describe("avaliações — conteúdo", () => {
  test("mostra só as 5 avaliações completas, cada uma uma única vez", async ({ page }) => {
    await gotoReviews(page);
    await expect(cards(page)).toHaveCount(5);
    for (const name of ["Ana Flavia Ceolin", "Jane Baptista", "Corei Max", "Nathalie Bambirra"]) {
      await expect(page.getByRole("heading", { name: new RegExp(name) })).toHaveCount(1);
    }
    // Truncadas não aparecem.
    for (const name of ["Wenderson", "Ankelly", "amaral cornelio"]) {
      await expect(page.getByText(name)).toHaveCount(0);
    }
    // Nota confirmada: 5 estrelas em cada card.
    await expect(region(page).getByRole("img", { name: "Nota 5 de 5" })).toHaveCount(5);
    await expect(region(page).getByText("Avaliação no Google")).toHaveCount(5);
  });

  test("links do Google abrem o painel oficial de avaliações em nova aba", async ({ page }) => {
    await gotoReviews(page);
    await expect(page.getByRole("heading", { name: "Já é paciente da Dentarium?" })).toBeVisible();
    for (const name of [/Ver avaliações no Google/, /Deixar avaliação no Google/]) {
      const link = page.getByRole("link", { name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("href", /google\.com\/search\?q=dentarium\+bh#lrd=0xa699be9f59bc37:0xe0a2f87764437ea3/);
    }
  });

  test("cards começam com a mesma altura", async ({ page }) => {
    await gotoReviews(page);
    const heights = await cards(page).evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().height)));
    expect(new Set(heights).size).toBe(1);
  });
});

test.describe("avaliações — movimento", () => {
  test("desliza sozinho e pausa com o mouse em cima", async ({ page, isMobile }) => {
    test.skip(isMobile, "hover: desktop");
    await gotoReviews(page);
    const a = await firstX(page);
    await page.waitForTimeout(1500);
    const b = await firstX(page);
    expect(Math.abs(b - a)).toBeGreaterThan(10);

    await region(page).hover();
    await page.waitForTimeout(1600); // desacelera suavemente
    const c = await firstX(page);
    await page.waitForTimeout(1000);
    expect(Math.abs((await firstX(page)) - c)).toBeLessThan(1);

    await page.mouse.move(2, 2);
    await page.waitForTimeout(1500);
    expect(Math.abs((await firstX(page)) - c)).toBeGreaterThan(5);
  });

  test("pausa quando a aba fica em segundo plano", async ({ page }) => {
    await gotoReviews(page);
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { configurable: true, get: () => true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForTimeout(1600);
    const a = await firstX(page);
    await page.waitForTimeout(800);
    expect(Math.abs((await firstX(page)) - a)).toBeLessThan(1);
  });

  test("botão de pausa interrompe e retoma", async ({ page }) => {
    await gotoReviews(page);
    const toggle = page.getByRole("button", { name: "Pausar movimento" });
    await toggle.click();
    await page.mouse.move(2, 2);
    await expect(page.getByRole("button", { name: "Retomar movimento" })).toHaveAttribute("aria-pressed", "true");
    await page.waitForTimeout(1600);
    const a = await firstX(page);
    await page.waitForTimeout(800);
    expect(Math.abs((await firstX(page)) - a)).toBeLessThan(1);
  });

  test("movimento reduzido: estático e navegável pelas setas", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoReviews(page);
    const a = await firstX(page);
    await page.waitForTimeout(1200);
    expect(await firstX(page)).toBeCloseTo(a, 0);
    await expect(page.getByRole("button", { name: /Pausar movimento/ })).toHaveCount(0);
    await page.getByRole("button", { name: "Próxima avaliação" }).click();
    expect(await firstX(page)).toBeLessThan(a - 100);
  });
});

test.describe("avaliações — ler mais", () => {
  test("detecta o excesso real e expande/recolhe o próprio card, pausando", async ({ page }) => {
    await gotoReviews(page);
    const jane = cards(page).filter({ has: page.getByRole("heading", { name: /Jane Baptista/ }) });
    const corei = cards(page).filter({ has: page.getByRole("heading", { name: /Corei Max/ }) });
    await expect(corei.getByRole("button", { name: /Ler mais/ })).toHaveCount(0);

    const more = jane.getByRole("button", { name: /Ler mais/ });
    await expect(more).toHaveCount(1);
    await expect(more).toHaveAttribute("aria-expanded", "false");
    const before = await jane.evaluate((el) => el.getBoundingClientRect().height);

    await more.click({ force: true }); // o card pode estar em movimento
    const less = jane.getByRole("button", { name: /Ler menos/ });
    await expect(less).toHaveAttribute("aria-expanded", "true");
    await page.waitForTimeout(700);
    const after = await jane.evaluate((el) => el.getBoundingClientRect().height);
    expect(after).toBeGreaterThan(before + 10);
    // Texto inteiro visível, sem rolagem interna.
    const clipped = await jane.locator("p").evaluate((p) => p.parentElement!.clientHeight < p.scrollHeight - 1);
    expect(clipped).toBe(false);

    // Pausado enquanto expandido, mesmo sem mouse ou foco.
    await page.mouse.move(2, 2);
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.waitForTimeout(1600);
    const x = await firstX(page);
    await page.waitForTimeout(800);
    expect(Math.abs((await firstX(page)) - x)).toBeLessThan(1);

    await less.click({ force: true });
    await expect(jane.getByRole("button", { name: /Ler mais/ })).toHaveAttribute("aria-expanded", "false");
    await page.waitForTimeout(700);
    expect(Math.abs((await jane.evaluate((el) => el.getBoundingClientRect().height)) - before)).toBeLessThan(2);
  });
});

test.describe("avaliações — teclado e toque", () => {
  test("foco por teclado traz o card para a vista e pausa", async ({ page, isMobile }) => {
    test.skip(isMobile, "teclado físico: desktop");
    await gotoReviews(page);
    await page.getByRole("heading", { name: "Histórias de confiança e cuidado." }).click();
    // Tab até chegar ao 4º card (os botões "Ler mais" também recebem foco no caminho).
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const index = await page.evaluate(() => {
        const el = document.activeElement;
        return el?.tagName === "ARTICLE" ? [...el.parentElement!.children].indexOf(el) : -1;
      });
      if (index >= 3) break;
    }
    const focused = page.locator("article:focus");
    await expect(focused).toHaveCount(1);
    await page.waitForTimeout(700);
    const [box, vp] = await Promise.all([
      focused.boundingBox(),
      region(page).locator("> div").first().boundingBox(),
    ]);
    expect(box!.x).toBeGreaterThanOrEqual(vp!.x - 1);
    expect(box!.x + box!.width).toBeLessThanOrEqual(vp!.x + vp!.width + 1);
    const a = await firstX(page);
    await page.waitForTimeout(800);
    expect(Math.abs((await firstX(page)) - a)).toBeLessThan(1);
  });

  test("gesto horizontal avança no celular, sem rolagem lateral da página", async ({ page, isMobile }) => {
    test.skip(!isMobile, "toque: mobile");
    await gotoReviews(page);
    await page.getByRole("button", { name: "Pausar movimento" }).click();
    await page.waitForTimeout(1200);
    const vp = (await region(page).locator("> div").first().boundingBox())!;
    const y = vp.y + vp.height / 2;
    // No anel o 1º card pode dar a volta; o 2º card mostra o avanço sem ambiguidade.
    const secondX = () => cards(page).nth(1).evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
    const before = await secondX();

    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: vp.x + vp.width * 0.8, y }] });
    for (let i = 1; i <= 8; i++) {
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: vp.x + vp.width * 0.8 - i * 25, y }],
      });
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await page.waitForTimeout(700);
    expect(await secondX()).toBeLessThan(before - 100);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
