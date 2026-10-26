import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/a-clinica",
  "/tratamentos",
  "/tratamentos/implantes",
  "/tratamentos/ortodontia",
  "/tratamentos/clareamento",
  "/tratamentos/proteses",
  "/tratamentos/tratamento-de-canal",
  "/tratamentos/odontopediatria",
  "/tecnologia",
  "/equipe",
  "/contato",
  "/privacidade",
];

test.describe("rotas", () => {
  for (const route of routes) {
    test(`${route} carrega com h1 e sem overflow horizontal`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test("slug desconhecido mostra 404 com caminhos de volta", async ({ page }) => {
    const response = await page.goto("/tratamentos/nao-existe");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("não existe");
    await expect(page.getByRole("link", { name: "Voltar ao início" })).toBeVisible();
  });

  test("a demonstração não é indexável", async ({ page, request }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const robots = await request.get("/robots.txt");
    expect(await robots.text()).toContain("Disallow: /");
  });
});

test.describe("imagens", () => {
  test("nenhuma foto restrita é carregada", async ({ page }) => {
    const requested: string[] = [];
    page.on("request", (r) => requested.push(r.url()));
    for (const route of ["/", "/a-clinica", "/equipe", "/contato", "/tecnologia"]) {
      await page.goto(route, { waitUntil: "networkidle" });
    }
    const restricted = requested.filter((u) =>
      /atendimento-procedimento|recepcao-familia|tomografia/.test(decodeURIComponent(u)),
    );
    expect(restricted).toEqual([]);
  });
});

test.describe("navegação desktop", () => {
  test.skip(({ isMobile }) => isMobile, "somente desktop");

  test("todos os itens do header navegam", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Principal" });
    for (const [label, path] of [
      ["A Clínica", "/a-clinica"],
      ["Tratamentos", "/tratamentos"],
      ["Tecnologia", "/tecnologia"],
      ["Equipe", "/equipe"],
      ["Contato", "/contato"],
      ["Início", "/"],
    ] as const) {
      await nav.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(path);
      await expect(nav.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
    }
  });

  test("mega menu abre, navega e fecha com Esc", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Abrir lista de tratamentos" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const panel = page.locator("#mega-tratamentos");
    await expect(panel).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();

    await toggle.click();
    await panel.getByRole("link", { name: "Periodontia" }).click();
    await expect(page).toHaveURL("/tratamentos/periodontia");
    await expect(panel).toBeHidden();
  });

  test("CTA do header leva ao agendamento", async ({ page }) => {
    await page.goto("/tecnologia");
    await page.getByRole("banner").getByRole("link", { name: "Agendar avaliação" }).click();
    await expect(page).toHaveURL("/contato#agendar");
    await expect(page.getByRole("button", { name: "Abrir e-mail de agendamento" })).toBeVisible();
  });
});

test.describe("menu mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "somente mobile");

  test("abre, fecha com Esc e navega", async ({ page }) => {
    await page.goto("/");
    const openButton = page.getByRole("button", { name: "Abrir menu" });
    await openButton.click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await openButton.click();
    await dialog.getByRole("link", { name: "Equipe" }).click();
    await expect(page).toHaveURL("/equipe");
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Profissionais");
  });
});

test.describe("interações", () => {
  test("acordeão do FAQ abre e fecha", async ({ page }) => {
    await page.goto("/");
    const q = page.getByRole("button", { name: "Onde fica a clínica?" });
    await q.scrollIntoViewIfNeeded();
    await expect(q).toHaveAttribute("aria-expanded", "false");
    await q.click();
    await expect(q).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("Rua do Ouro, 857, no bairro Serra")).toBeVisible();
    await q.click();
    await expect(q).toHaveAttribute("aria-expanded", "false");
  });

  test("galeria abre, navega por teclado e fecha", async ({ page }) => {
    await page.goto("/");
    // A galeria tem carrossel (mobile) e linha de fotos (desktop); só uma versão é visível.
    const opener = page.getByRole("button", { name: "Ampliar foto: Consultório" }).locator("visible=true");
    await opener.click();
    const dialog = page.getByRole("dialog", { name: "Galeria de fotos da clínica" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("1 de 3")).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByText("2 de 3")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowLeft");
    await expect(dialog.getByText("3 de 3")).toBeVisible();
    await dialog.getByRole("button", { name: "Ver Jardim externo", exact: true }).click();
    await expect(dialog.getByText("2 de 3")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    // O foco volta para a miniatura que abriu a galeria.
    await expect(opener).toBeFocused();
  });

  test("tour da clínica: lightbox percorre todos os ambientes", async ({ page }) => {
    await page.goto("/a-clinica#ambientes");
    await page.getByRole("button", { name: "Ampliar foto: Sala de espera" }).click();
    const dialog = page.getByRole("dialog", { name: "Galeria de fotos da clínica" });
    await expect(dialog.getByText("3 de 6")).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByText("Consultório", { exact: true })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("galeria: miniaturas acessíveis por teclado", async ({ page, isMobile }) => {
    test.skip(isMobile, "teclado físico: desktop");
    await page.goto("/a-clinica");
    const tile = page.getByRole("button", { name: "Ampliar foto: Fachada na Rua do Ouro" }).locator("visible=true");
    await tile.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Galeria de fotos da clínica" }).getByText("Fachada na Rua do Ouro")).toBeVisible();
    await page.keyboard.press("Escape");
  });

  test("abas de tecnologia respondem a clique e setas", async ({ page }) => {
    await page.goto("/");
    const tablist = page.getByRole("tablist", { name: "Recursos" });
    await tablist.scrollIntoViewIfNeeded();
    const first = tablist.getByRole("tab", { name: /Radiografia/ });
    await expect(first).toHaveAttribute("aria-selected", "true");
    await tablist.getByRole("tab", { name: /CAD\/CAM/ }).click();
    const panel = page.getByRole("tabpanel");
    await expect(panel).toContainText("escaneamento");
    await page.keyboard.press("ArrowDown");
    await expect(tablist.getByRole("tab", { name: /Anestesia/ })).toBeFocused();
    await expect(tablist.getByRole("tab", { name: /Anestesia/ })).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Home");
    await expect(first).toHaveAttribute("aria-selected", "true");
  });

  test("formulário abre o e-mail sem declarar agendamento feito", async ({ page }) => {
    // Registra o mailto em vez de abrir um aplicativo externo.
    await page.addInitScript(() => {
      HTMLAnchorElement.prototype.click = function () {
        (window as unknown as { __mailto: string }).__mailto = this.href;
      };
    });
    await page.goto("/contato");
    const form = page.locator("#agendar");
    const submit = form.getByRole("button", { name: "Abrir e-mail de agendamento" });

    // Campos obrigatórios: sem nome, nada acontece.
    await submit.click();
    expect(await page.evaluate(() => (window as unknown as { __mailto?: string }).__mailto)).toBeUndefined();

    await form.getByLabel("Seu nome").fill("Maria Teste");
    await form.getByLabel("Telefone ou e-mail para retorno").fill("(31) 90000-0000");
    await form.getByText("Manhã", { exact: true }).click();
    await submit.click();

    const href = await page.evaluate(() => (window as unknown as { __mailto: string }).__mailto);
    expect(href.startsWith("mailto:contato@clinicadentarium.com.br?subject=Agendamento")).toBe(true);
    const body = decodeURIComponent(href.split("body=")[1]);
    expect(body).toContain("Nome: Maria Teste");
    expect(body).toContain("Período de preferência: Manhã");

    const status = form.getByRole("status");
    await expect(status).toContainText("Mensagem pronta no seu aplicativo de e-mail");
    await expect(status).toContainText("só fica marcado quando a recepção responder");
    await expect(status).not.toContainText(/agendad[oa]|confirmad[oa]|enviad[oa] com sucesso/i);
  });

  test("foco visível e navegação por teclado no header", async ({ page, isMobile }) => {
    test.skip(isMobile, "teclado físico: desktop");
    await page.goto("/");
    await page.keyboard.press("Tab"); // link "pular para o conteúdo"
    await expect(page.getByRole("link", { name: "Pular para o conteúdo" })).toBeFocused();
    await page.keyboard.press("Tab");
    const logo = page.getByRole("banner").getByRole("link", { name: "Dentarium — página inicial" });
    await expect(logo).toBeFocused();
    const outline = await logo.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).toBe("solid");
  });

  test("filtro e busca de tratamentos funcionam", async ({ page: fullPage }) => {
    await fullPage.goto("/tratamentos");
    const page = fullPage.getByRole("main");
    await page.getByRole("button", { name: "Estética", exact: true }).click();
    await expect(page.getByRole("link", { name: /Clareamento/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Implantes/ })).toHaveCount(0);

    await page.getByRole("button", { name: "Todos", exact: true }).click();
    await page.getByRole("searchbox", { name: "Buscar tratamento" }).fill("canal");
    await expect(page.getByRole("link", { name: /Tratamento de canal/ })).toBeVisible();
    await page.getByRole("searchbox", { name: "Buscar tratamento" }).fill("xyz");
    await expect(page.getByText("Nenhum tratamento encontrado")).toBeVisible();
    await page.getByRole("button", { name: "veja todos os tratamentos" }).click();
    await expect(page.getByRole("link", { name: /Odontopediatria/ })).toBeVisible();
  });

  test("cartões de tratamento levam às páginas individuais", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Ortodontia[\s\S]*Saiba mais/ }).click();
    await expect(page).toHaveURL("/tratamentos/ortodontia");
    await expect(page.getByText("A indicação depende de avaliação individual com cirurgião-dentista.")).toBeVisible();
  });

  test("contato usa tel:, mailto: e não ativa WhatsApp", async ({ page }) => {
    await page.goto("/contato");
    const main = page.getByRole("main");
    await expect(main.locator('a[href="tel:+553132616991"]').first()).toBeVisible();
    await expect(main.locator('a[href^="mailto:contato@clinicadentarium.com.br"]').first()).toBeVisible();
    await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
    await expect(main.locator('a[href^="https://www.google.com/maps"]').first()).toHaveAttribute("target", "_blank");
  });
});
