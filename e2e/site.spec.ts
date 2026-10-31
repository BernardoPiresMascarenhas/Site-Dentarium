import { devices, expect, test } from "@playwright/test";

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
  "/tratamentos/planejamento-digital-do-sorriso",
  "/tratamentos/laserterapia",
  "/tratamentos/enxertos",
  "/tratamentos/extracao-de-terceiros-molares",
  "/tratamentos/facetas-e-lentes",
  "/tratamentos/manutencao-preventiva",
  "/tratamentos/periodontia",
  "/tratamentos/placas-de-bruxismo",
  "/tratamentos/primeira-consulta",
  "/tratamentos/protetores-esportivos",
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
  test("fotos do site anterior aparecem nas páginas planejadas", async ({ page }) => {
    await page.goto("/a-clinica");
    await expect(page.getByRole("img", { name: /mãe e a filha sorriem no balcão/ })).toHaveCount(1);
    await page.goto("/tecnologia");
    await expect(page.getByRole("img", { name: /aparelho de tomografia/ })).toBeVisible();
    await expect(page.getByRole("img", { name: /raio X intraoral/ })).toBeVisible();
    await page.goto("/tratamentos/primeira-consulta");
    await expect(page.getByRole("img", { name: /mostra informações no monitor/ })).toBeVisible();
    await page.goto("/tratamentos/protetores-esportivos");
    await expect(page.getByRole("img", { name: /protetor bucal azul/ })).toBeVisible();
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
    await expect(page.getByRole("button", { name: /Continuar pelo WhatsApp/ })).toBeVisible();
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
    // A primeira pergunta já abre aberta; testa uma das seguintes.
    const q = page.getByRole("button", { name: "A clínica tem acessibilidade?" });
    await q.scrollIntoViewIfNeeded();
    await expect(q).toHaveAttribute("aria-expanded", "false");
    await q.click();
    await expect(q).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("A clínica conta com plataforma elevatória.", { exact: false })).toBeVisible();
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
    await expect(dialog.getByText("5 de 9")).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByText("Poltronas da sala de espera", { exact: true })).toBeVisible();
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
    await expect(panel).toContainText(/escaneamento/i);
    await page.keyboard.press("ArrowDown");
    await expect(tablist.getByRole("tab", { name: /Anestesia/ })).toBeFocused();
    await expect(tablist.getByRole("tab", { name: /Anestesia/ })).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Home");
    await expect(first).toHaveAttribute("aria-selected", "true");
  });

  test("formulário valida os campos e abre o e-mail sem declarar agendamento feito", async ({ page }) => {
    // Registra o mailto em vez de abrir um aplicativo externo.
    await page.addInitScript(() => {
      HTMLAnchorElement.prototype.click = function () {
        (window as unknown as { __mailto: string }).__mailto = this.href;
      };
    });
    await page.goto("/contato");
    const form = page.locator("#agendar");
    const submit = form.getByRole("button", { name: "Enviar pelo seu e-mail" });

    // Campos obrigatórios: sem nome e WhatsApp, nada abre e os erros aparecem.
    await submit.click();
    expect(await page.evaluate(() => (window as unknown as { __mailto?: string }).__mailto)).toBeUndefined();
    await expect(form.getByText("Informe seu nome completo.")).toBeVisible();
    await expect(form.getByLabel("Nome completo")).toHaveAttribute("aria-invalid", "true");
    await expect(form.getByLabel("Nome completo")).toBeFocused();

    await form.getByLabel("Nome completo").fill("Maria Teste");
    await form.getByLabel("WhatsApp").fill("3190000");
    await submit.click();
    await expect(form.getByText(/Confira o número/)).toBeVisible();
    expect(await page.evaluate(() => (window as unknown as { __mailto?: string }).__mailto)).toBeUndefined();

    await form.getByLabel("WhatsApp").fill("31900000000");
    await expect(form.getByLabel("WhatsApp")).toHaveValue("(31) 90000-0000");
    await form.getByRole("combobox", { name: /Tratamento de interesse/ }).click();
    await form.getByRole("option", { name: "Ortodontia" }).click();
    await submit.click();

    const href = await page.evaluate(() => (window as unknown as { __mailto: string }).__mailto);
    expect(href.startsWith("mailto:contato@clinicadentarium.com.br?subject=Agendamento")).toBe(true);
    const body = decodeURIComponent(href.split("body=")[1]);
    expect(body).toContain("Nome: Maria Teste");
    expect(body).toContain("WhatsApp: (31) 90000-0000");
    expect(body).toContain("Tratamento de interesse: Ortodontia");
    expect(body).not.toContain("Mensagem:");

    const status = form.getByRole("status");
    await expect(status).toContainText("Mensagem pronta no seu aplicativo de e-mail");
    await expect(status).toContainText("só fica marcado quando a recepção responder");
    await expect(status).not.toContainText(/agendad[oa]|confirmad[oa]|recebid[oa]|enviad[oa] com sucesso/i);
  });

  test("seletor de tratamento rola dentro do painel e funciona por teclado", async ({ page }) => {
    await page.goto("/contato");
    const form = page.locator("#agendar");
    const combo = form.getByRole("combobox", { name: /Tratamento de interesse/ });
    await expect(combo).toHaveAttribute("aria-expanded", "false");
    await expect(combo).toContainText("Avaliação geral (ainda não sei)");

    // Clique abre o painel; a lista rola dentro dele, sem mover a página.
    await combo.click();
    const list = form.getByRole("listbox");
    await expect(list).toBeVisible();
    await expect(combo).toHaveAttribute("aria-expanded", "true");
    const scrolls = await list.evaluate((el) => el.scrollHeight > el.clientHeight);
    expect(scrolls).toBe(true);
    await list.hover();
    const pageY = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, 400);
    await expect.poll(() => list.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
    expect(await page.evaluate(() => scrollY)).toBe(pageY);
    await list.getByRole("option", { name: "Laserterapia" }).click();
    await expect(list).toBeHidden();
    await expect(combo).toContainText("Laserterapia");
    await expect(combo).toBeFocused();

    // Teclado: setas, digitação e Enter; Esc fecha sem mudar.
    await combo.press("ArrowDown");
    await expect(list).toBeVisible();
    await page.keyboard.press("Home");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(combo).not.toContainText("Laserterapia");
    const chosen = (await combo.textContent())!.trim();
    await expect(form.locator('[role="option"][aria-selected="true"]')).toHaveText(chosen);
    await combo.press("Enter");
    await page.keyboard.type("orto");
    await page.keyboard.press("Enter");
    await expect(combo).toContainText("Ortodontia");
    await combo.press("Enter");
    await page.keyboard.press("Escape");
    await expect(list).toBeHidden();
    await expect(combo).toContainText("Ortodontia");

    // Clique fora fecha.
    await combo.click();
    await page.getByRole("heading", { level: 1 }).click();
    await expect(list).toBeHidden();
  });

  test("formulário monta a mensagem no WhatsApp sem declarar agendamento feito", async ({ page }) => {
    await page.addInitScript(() => {
      window.open = ((url: string) => {
        (window as unknown as { __opened: string }).__opened = url;
        return null;
      }) as typeof window.open;
    });
    await page.goto("/contato");
    const form = page.locator("#agendar");
    await form.getByLabel("Nome completo").fill("Maria Teste");
    await form.getByLabel("WhatsApp").fill("(31) 90000-0000");
    await form.getByLabel(/Mensagem/).fill("Prefiro contato à tarde.");
    await form.getByRole("button", { name: /Continuar pelo WhatsApp/ }).click();

    const url = await page.evaluate(() => (window as unknown as { __opened: string }).__opened);
    expect(url.startsWith("https://wa.me/5531998083126?text=")).toBe(true);
    const text = decodeURIComponent(url.split("text=")[1]);
    expect(text).toContain("Olá! Gostaria de solicitar uma avaliação na Clínica Dentarium.");
    expect(text).toContain("Nome: Maria Teste");
    expect(text).toContain("WhatsApp: (31) 90000-0000");
    expect(text).toContain("Tratamento de interesse: Avaliação geral (ainda não sei)");
    expect(text).toContain("Mensagem: Prefiro contato à tarde.");
    const status = form.getByRole("status");
    await expect(status).toContainText("Mensagem pronta no WhatsApp");
    await expect(status).not.toContainText(/agendad[oa]|confirmad[oa]|recebid[oa]|enviad[oa] com sucesso/i);
  });

  test("foco visível e navegação por teclado no header", async ({ page, isMobile }) => {
    test.skip(isMobile, "teclado físico: desktop");
    await page.goto("/");
    await page.keyboard.press("Tab"); // link "pular para o conteúdo"
    await expect(page.getByRole("link", { name: "Pular para o conteúdo" })).toBeFocused();
    await page.keyboard.press("Tab");
    const logo = page.getByRole("banner").getByRole("link", { name: "Dentarium, página inicial" });
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

  test("busca encontra modalidades internas pelos termos", async ({ page: fullPage }) => {
    await fullPage.goto("/tratamentos");
    const page = fullPage.getByRole("main");
    const search = page.getByRole("searchbox", { name: "Buscar tratamento" });
    await search.fill("gestante");
    await expect(page.getByRole("link", { name: /Odontopediatria/ })).toBeVisible();
    await search.fill("dentadura");
    await expect(page.getByRole("link", { name: /Próteses/ })).toBeVisible();
    await search.fill("siso");
    await expect(page.getByRole("link", { name: /terceiros molares/ })).toBeVisible();
  });

  test("seções internas têm âncoras navegáveis", async ({ page }) => {
    await page.goto("/tratamentos/odontopediatria#pre-natal-odontologico");
    await expect(page.getByRole("heading", { name: "Pré-natal odontológico" })).toBeInViewport();
    await page.goto("/tratamentos/proteses");
    await expect(page.getByRole("heading", { name: "Mais retenção para dentaduras" })).toBeVisible();
  });

  test("etapas do CAD/CAM respondem a clique, setas e botões", async ({ page }) => {
    await page.goto("/tecnologia");
    const tablist = page.getByRole("tablist", { name: "Etapas do CAD/CAM" });
    await tablist.scrollIntoViewIfNeeded();
    const panel = page.locator("#cad-cam").getByRole("tabpanel");
    await expect(panel.getByRole("heading", { name: /Escaneamento/ })).toBeVisible();
    await expect(panel.getByRole("heading")).toHaveCount(1);
    await page.getByRole("button", { name: "Próxima etapa" }).click();
    await expect(tablist.getByRole("tab", { name: /Desenho/ })).toHaveAttribute("aria-selected", "true");
    await tablist.getByRole("tab", { name: /Desenho/ }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(tablist.getByRole("tab", { name: /Produção/ })).toBeFocused();
    await expect(panel.getByRole("heading", { name: "Fabricação da peça" })).toBeVisible();
    await expect(panel.getByRole("heading")).toHaveCount(1);
    await expect(page.getByRole("button", { name: "Próxima etapa" })).toBeDisabled();
  });

  test("CAD/CAM no celular estreito: navegação em uma linha e altura estável", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/tecnologia");
    const tablist = page.getByRole("tablist", { name: "Etapas do CAD/CAM" });
    await tablist.scrollIntoViewIfNeeded();
    const card = tablist.locator("xpath=..");
    const prev = page.getByRole("button", { name: "Etapa anterior" });
    const next = page.getByRole("button", { name: "Próxima etapa" });
    await expect(prev.locator("span:visible")).toHaveText("Anterior");
    await expect(next.locator("span:visible")).toHaveText("Próxima");
    const heights: number[] = [];
    for (let i = 0; i < 3; i++) {
      await tablist.getByRole("tab").nth(i).click();
      heights.push((await card.boundingBox())!.height);
      // Rótulos e contador em uma única linha; botões com área de toque de 44 px.
      for (const el of [prev.locator("span:visible"), next.locator("span:visible"), card.getByText(`${i + 1} de 3`)]) {
        expect(await el.evaluate((n) => n.getClientRects().length)).toBe(1);
      }
      for (const b of [prev, next, ...(await tablist.getByRole("tab").all())]) {
        const box = (await b.boundingBox())!;
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
    expect(new Set(heights.map(Math.round)).size).toBe(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test("cartões de tratamento levam às páginas individuais", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Ortodontia[\s\S]*Saiba mais/ }).click();
    await expect(page).toHaveURL("/tratamentos/ortodontia");
    await expect(page.getByText("A indicação depende de avaliação individual com cirurgião-dentista.")).toBeVisible();
  });

  test("contato usa WhatsApp, tel:, mailto: e mostra o horário", async ({ page }) => {
    await page.goto("/contato");
    const main = page.getByRole("main");
    await expect(main.locator('a[href="tel:+553132616991"]').first()).toBeVisible();
    await expect(main.locator('a[href^="mailto:contato@clinicadentarium.com.br"]').first()).toBeVisible();
    const whatsapp = main.locator('a[href^="https://wa.me/5531998083126"]');
    await expect(whatsapp.first()).toBeVisible();
    await expect(whatsapp.first()).toHaveAttribute("target", "_blank");
    const href = (await whatsapp.first().getAttribute("href"))!;
    expect(decodeURIComponent(href.split("text=")[1])).toBe(
      "Olá! Gostaria de saber mais sobre os atendimentos da Clínica Dentarium.",
    );
    await expect(main.getByText("(31) 99808-3126").first()).toBeVisible();
    await expect(main.getByText("08h às 18h30")).toBeVisible();
    await expect(main.getByText("Fechado")).toHaveCount(2);
    await expect(page.getByText(/WhatsApp em breve|sendo confirmado/)).toHaveCount(0);
    await expect(main.locator('a[href^="https://www.google.com/maps"]').first()).toHaveAttribute("target", "_blank");
  });
});

test.describe("páginas de tratamento", () => {
  test("WhatsApp do tratamento abre com mensagem do próprio tratamento", async ({ page }) => {
    await page.goto("/tratamentos/implantes");
    const link = page.getByRole("link", { name: /Tirar dúvidas pelo WhatsApp/ });
    await expect(link).toHaveAttribute("target", "_blank");
    const href = (await link.getAttribute("href"))!;
    expect(href.startsWith("https://wa.me/5531998083126?text=")).toBe(true);
    expect(decodeURIComponent(href.split("text=")[1])).toBe(
      "Olá! Gostaria de informações sobre o tratamento de implantes dentários e como agendar uma avaliação.",
    );
  });

  test("títulos são próprios de cada tratamento", async ({ page }) => {
    const expected: Record<string, string> = {
      implantes: "Quando considerar um implante dentário?",
      clareamento: "Quando procurar uma avaliação para clareamento?",
      ortodontia: "Quais opções existem para alinhar os dentes?",
      proteses: "Como recuperar a função e a estética do sorriso?",
      "extracao-de-terceiros-molares": "Quando a extração dos sisos pode ser indicada?",
    };
    for (const [slug, heading] of Object.entries(expected)) {
      await page.goto(`/tratamentos/${slug}`);
      await expect(page.getByRole("heading", { level: 2, name: heading })).toBeVisible();
      await expect(page.getByText("Quando conversar com o dentista sobre esta opção")).toHaveCount(0);
    }
  });

  test("ortodontia apresenta alinhadores com crédito da foto e sem citar marcas", async ({ page }) => {
    await page.goto("/tratamentos/ortodontia#alinhadores-transparentes");
    const section = page.locator("#alinhadores-transparentes");
    await expect(section.getByRole("heading", { level: 2 })).toBeInViewport();
    await expect(section.getByRole("img", { name: /Alinhador ortodôntico transparente/ })).toBeVisible();
    await expect(section).toContainText("Não representa a marca nem o produto utilizado na Dentarium");
    await expect(section.getByRole("link", { name: /ClearCorrect, via Wikimedia Commons/ })).toHaveAttribute(
      "href",
      "https://commons.wikimedia.org/wiki/File:Aligner_on_Table_v2_(2).jpg",
    );
    await expect(section.getByRole("link", { name: "CC BY-SA 3.0" })).toHaveAttribute("href", /creativecommons\.org\/licenses\/by-sa\/3\.0/);
    await expect(section).toContainText("pode ajustar o planejamento ao longo do tratamento");
    await expect(page.getByRole("main")).not.toContainText(/Invisalign|material institucional/);
  });

  test("detalhes complementares ficam em \"Entenda mais\" e abrem pela âncora", async ({ page }) => {
    await page.goto("/tratamentos/implantes");
    const nav = page.getByRole("navigation", { name: "Nesta página" });
    await expect(nav.getByRole("link", { name: "Entenda mais" })).toHaveAttribute("href", "#entenda-mais");
    const section = page.locator("#entenda-mais");
    const item = section.getByRole("button", { name: "Quando falta osso" });
    await expect(item).toHaveAttribute("aria-expanded", "false");
    const panel = page.locator(`#${await item.getAttribute("aria-controls")}`);
    // Recolhido: o painel tem altura zero (o texto continua no HTML).
    expect((await panel.boundingBox())!.height).toBeLessThan(2);
    await item.click();
    await expect(item).toHaveAttribute("aria-expanded", "true");
    await expect(section.getByText(/um enxerto ósseo cria condições/)).toBeVisible();
    await expect(section.getByRole("link", { name: "Enxerto ósseo" })).toHaveAttribute("href", "/tratamentos/enxertos#enxerto-osseo");

    // Link de outra página para um item recolhido: chega com o item aberto e visível.
    await page.goto("/tratamentos/enxertos");
    await page.getByRole("link", { name: "Retração gengival" }).click();
    await expect(page).toHaveURL("/tratamentos/periodontia#retracao-gengival");
    const retracao = page.locator("#retracao-gengival");
    await expect(retracao.getByRole("button", { name: "Retração gengival" })).toHaveAttribute("aria-expanded", "true");
    await expect(retracao.getByText(/escovação com força excessiva/)).toBeInViewport();

    // Endereço aberto direto com a âncora.
    await page.goto("/tratamentos/facetas-e-lentes#cad-cam");
    await expect(page.locator("#cad-cam").getByRole("button", { name: "Confecção com CAD/CAM" })).toHaveAttribute("aria-expanded", "true");
  });

  test("índice da ortodontia tem rótulos e âncoras únicos e funcionais", async ({ page }) => {
    await page.goto("/tratamentos/ortodontia");
    const nav = page.getByRole("navigation", { name: "Nesta página" });
    const links = nav.getByRole("link");
    const labels = await links.allTextContents();
    const hrefs = await links.evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
    expect(new Set(labels).size).toBe(labels.length);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(labels).toContain("Tipos de aparelhos");
    expect(labels.filter((l) => l === "Alinhadores transparentes")).toHaveLength(1);
    for (const href of hrefs) {
      await nav.locator(`a[href="${href}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${href}$`));
      await expect(page.locator(href)).toHaveCount(1);
      await expect(page.locator(href).getByRole("heading").first()).toBeInViewport();
    }
  });

  test("cada ilustração aparece no tratamento correto", async ({ page }) => {
    const expected: Record<string, RegExp> = {
      implantes: /\/implante[^/]*\.jpg/,
      proteses: /protese-fixa-dentadura[^/]*\.jpg/,
      "facetas-e-lentes": /lentes-de-contato-de-porcelana[^/]*\.jpg/,
      odontopediatria: /pre-natal-odontologico[^/]*\.png/,
      "odontopediatria#dentarium-kids": /odontologia-bh-dentarium-kids[^/]*\.png/,
      ortodontia: /aligner-on-table-v2[^/]*\.jpg/,
    };
    for (const [slug, file] of Object.entries(expected)) {
      await page.goto(`/tratamentos/${slug}`);
      const srcs = await page.locator("main img").evaluateAll((imgs) =>
        imgs.map((i) => decodeURIComponent((i as HTMLImageElement).getAttribute("src") ?? "")),
      );
      expect(srcs.some((src) => file.test(src)), `${slug} deveria usar ${file}`).toBe(true);
    }
  });

  test("imagens reservadas para revisão nunca são carregadas", async ({ page }) => {
    const requested: string[] = [];
    page.on("request", (r) => requested.push(decodeURIComponent(r.url())));
    for (const slug of ["odontopediatria", "placas-de-bruxismo", "manutencao-preventiva", "clareamento"]) {
      await page.goto(`/tratamentos/${slug}`, { waitUntil: "networkidle" });
    }
    const blocked = requested.filter((u) =>
      /placas-de-bruxismo-dentarium|manutencao-preventiva[^/]*\.png|claremento-dental/.test(u),
    );
    expect(blocked).toEqual([]);
  });

  test("navega entre tratamentos da mesma área e pelo índice da página", async ({ page }) => {
    await page.goto("/tratamentos/implantes");
    const area = page.getByRole("navigation", { name: "Outros tratamentos da área" });
    await expect(area.getByRole("link", { name: "Implantes" })).toHaveAttribute("aria-current", "page");
    await area.getByRole("link", { name: "Próteses" }).click();
    await expect(page).toHaveURL("/tratamentos/proteses");
    await page.getByRole("navigation", { name: "Nesta página" }).getByRole("link", { name: "Dúvidas" }).click();
    await expect(page).toHaveURL(/#duvidas$/);
    await expect(page.locator("#duvidas").getByRole("heading", { level: 2 })).toBeInViewport();
  });
});

test.describe("rolagem suave", () => {
  test("âncoras da página rolam suave e links para seções de outra página chegam à seção", async ({ page }) => {
    await page.goto("/tratamentos/ortodontia");
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("smooth");
    await page.getByRole("navigation", { name: "Nesta página" }).getByRole("link", { name: "Dúvidas" }).click();
    // Logo após o clique a página ainda está a caminho da seção.
    const mid = await page.evaluate(() => new Promise<number>((r) => setTimeout(() => r(scrollY), 60)));
    await expect(page.locator("#duvidas").getByRole("heading", { level: 2 })).toBeInViewport();
    const end = await page.evaluate(() => scrollY);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(end);

    await page.goto("/");
    await page.getByRole("region", { name: "Agende uma avaliação." }).getByRole("link", { name: "Agendar avaliação" }).click();
    await expect(page).toHaveURL("/contato#agendar");
    await expect(page.locator("#agendar").getByRole("heading", { name: "Solicite sua avaliação" })).toBeInViewport();
  });
});

test.describe("compartilhamento", () => {
  test("link tem título, texto e imagem de pré-visualização", async ({ page, request }) => {
    await page.goto("/");
    const meta = (sel: string) => page.locator(`meta[${sel}]`).getAttribute("content");
    expect(await meta('property="og:title"')).toBe("Clínica Dentarium | Odontologia funcional e estética em Belo Horizonte");
    expect(await meta('property="og:description"')).toContain("Odontologia funcional e estética no bairro Serra");
    expect(await meta('property="og:url"')).toBe("https://site-dentarium.vercel.app");
    expect(await meta('name="twitter:card"')).toBe("summary_large_image");
    expect(await meta('property="og:image:width"')).toBe("1200");
    expect(await meta('property="og:image:alt"')).toContain("Clínica Dentarium");
    const image = new URL((await meta('property="og:image"'))!);
    expect(image.origin).toBe("https://site-dentarium.vercel.app");
    const res = await request.get(image.pathname + image.search);
    expect(res.status()).toBe(200);
    expect(image.pathname).toBe("/og/dentarium-compartilhamento-v3.png");
    expect(await meta('name="twitter:image"')).toBe(image.href);
    expect(res.headers()["content-type"]).toBe("image/png");
    expect((await res.body()).length).toBeLessThan(300_000);
  });
});

test.describe("privacidade", () => {
  test("aviso descreve o formulário com WhatsApp e e-mail e o mapa opcional", async ({ page }) => {
    await page.goto("/privacidade");
    const main = page.getByRole("main");
    await expect(main.getByText("Documento demonstrativo")).toBeVisible();
    await expect(main.getByText(/o WhatsApp abre com a mensagem pronta/)).toBeVisible();
    await expect(main.getByText(/nada é enviado até você confirmar o envio/)).toBeVisible();
    await expect(main.getByText(/não agenda uma consulta/)).toBeVisible();
    await expect(main.getByText(/só é carregado quando você clica em “Mostrar mapa interativo”/)).toBeVisible();
    await expect(main.getByText(/apenas monta uma mensagem no aplicativo de e-mail/)).toHaveCount(0);
  });
});

test.describe("convênios", () => {
  test("contato mostra os convênios entre o formulário e o mapa", async ({ page }) => {
    await page.goto("/contato");
    const section = page.getByRole("region", { name: "Convênios atendidos" });
    for (const name of [/Agros/, /OdontoVida/, /Coopeder/]) {
      const img = section.getByRole("img", { name });
      await img.scrollIntoViewIfNeeded();
      await expect(img).toBeVisible();
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
    const order = await page.evaluate(() =>
      ["#agendar", "#convenios-title", "#como-chegar"].map((s) => document.querySelector(s)!.getBoundingClientRect().top),
    );
    expect(order[0]).toBeLessThan(order[1]);
    expect(order[1]).toBeLessThan(order[2]);
    await page.goto("/");
    await expect(page.getByRole("region", { name: "Convênios atendidos" })).toHaveCount(0);
  });
});

test.describe("ambientes no celular", () => {
  test.skip(({ isMobile }) => !isMobile, "carrossel só no celular");

  test("fotos passam sozinhas, com indicadores e botão de pausa", async ({ page }) => {
    await page.goto("/");
    const list = page.getByRole("list", { name: "Fotos da clínica" });
    await list.scrollIntoViewIfNeeded();
    const dots = page.getByRole("button", { name: /Ver foto \d de 3/ });
    await expect(dots).toHaveCount(3);
    await expect(dots.nth(0)).toHaveAttribute("aria-current", "true");

    // Avança sozinho.
    await expect(dots.nth(1)).toHaveAttribute("aria-current", "true", { timeout: 7000 });
    expect(await list.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);

    // Pausa: a posição não muda depois do intervalo.
    await page.getByRole("button", { name: "Pausar fotos" }).click();
    // Deixa terminar a rolagem suave que estiver em andamento antes de medir.
    await page.waitForTimeout(1200);
    const left = await list.evaluate((el) => el.scrollLeft);
    await page.waitForTimeout(4800);
    expect(await list.evaluate((el) => el.scrollLeft)).toBe(left);
    await expect(page.getByRole("button", { name: "Retomar fotos" })).toHaveAttribute("aria-pressed", "true");

    // Indicadores levam direto à foto.
    await dots.nth(2).click();
    await expect(dots.nth(2)).toHaveAttribute("aria-current", "true");
  });

  test("com movimento reduzido, nada passa sozinho e não há botão de pausa", async ({ browser }) => {
    const context = await browser.newContext({ ...devices["Pixel 7"], reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    const list = page.getByRole("list", { name: "Fotos da clínica" });
    await list.scrollIntoViewIfNeeded();
    const start = await list.evaluate((el) => el.scrollLeft);
    await page.waitForTimeout(4800);
    expect(await list.evaluate((el) => el.scrollLeft)).toBe(start);
    await expect(page.getByRole("button", { name: /Pausar fotos/ })).toHaveCount(0);
    await context.close();
  });
});

test.describe("tecnologia", () => {
  test("seções na ordem planejada e grade de recursos levando a cada aprofundamento", async ({ page }) => {
    await page.goto("/tecnologia");
    const main = page.getByRole("main");
    const headings = await main.getByRole("heading", { level: 2 }).allTextContents();
    expect(headings).toEqual([
      "Tecnologia aplicada à odontologia.",
      "Ver com clareza antes de decidir.",
      "CAD/CAM em três etapas.",
      "Recursos de conforto e precisão.",
      "Cuidado também nos detalhes.",
      expect.stringMatching(/Vamos conversar/),
    ]);

    const grid = page.getByRole("region", { name: "Tecnologia aplicada à odontologia." });
    const cards = grid.getByRole("link");
    await expect(cards).toHaveCount(8);
    for (const href of await cards.evaluateAll((as) => as.map((a) => a.getAttribute("href")!))) {
      await expect(page.locator(href)).toHaveCount(1);
    }
    await grid.getByRole("link", { name: /Laboratório de prótese/ }).click();
    await expect(page).toHaveURL(/#laboratorio$/);
    await expect(page.getByRole("heading", { name: "Laboratório de prótese na clínica" })).toBeInViewport();

    // Fotografias reais nos blocos de diagnóstico e planejamento, carregadas.
    for (const name of [/aparelho de tomografia/, /raio X intraoral/, /mostra informações no monitor/, /monitores suspensos/]) {
      const img = page.locator("#diagnostico").getByRole("img", { name });
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
    await expect(page.locator("#conforto").getByText("Quando é usado")).toHaveCount(3);
  });
});

test.describe("logo", () => {
  test("leva ao início e, já na home, volta ao topo", async ({ page, isMobile }) => {
    await page.goto("/equipe");
    await page.getByRole("banner").getByRole("link", { name: "Dentarium, página inicial" }).click();
    await expect(page).toHaveURL("/");

    await page.evaluate(() => window.scrollTo({ top: 3000, behavior: "instant" }));
    await page.getByRole("banner").getByRole("link", { name: "Dentarium, página inicial" }).click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);

    if (isMobile) {
      await page.goto("/tecnologia");
      await page.getByRole("button", { name: "Abrir menu" }).click();
      const dialog = page.getByRole("dialog", { name: "Menu" });
      await dialog.getByRole("link", { name: "Dentarium, página inicial" }).click();
      await expect(page).toHaveURL("/");
      await expect(dialog).toBeHidden();
    }
  });
});

test.describe("localização", () => {
  test("home mantém o bloco de contato com a fachada e não tem mapa", async ({ page }) => {
    await page.goto("/");
    const contact = page.getByRole("region", { name: "Agende uma avaliação." });
    await expect(contact.locator("img")).toHaveCount(1);
    await expect(contact.getByRole("link", { name: "Agendar avaliação" })).toHaveAttribute("href", "/contato#agendar");
    const rotas = contact.getByRole("link", { name: "Ver rotas" });
    await expect(rotas).toHaveAttribute("target", "_blank");
    await expect(rotas).toHaveAttribute("href", /^https:\/\/www\.google\.com\/maps\//);
    await expect(page.getByRole("region", { name: /Como chegar|Estamos esperando/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Mostrar mapa interativo" })).toHaveCount(0);
  });

  test("mapa do contato só carrega do Google depois do clique e aponta para a clínica", async ({ page }) => {
    const google: string[] = [];
    page.on("request", (r) => {
      if (/google\.com\/maps|gstatic|googleapis/.test(r.url())) google.push(r.url());
    });
    await page.goto("/contato", { waitUntil: "networkidle" });
    const section = page.getByRole("region", { name: "Como chegar à Dentarium" });
    await section.scrollIntoViewIfNeeded();
    await expect(section).toContainText("Rua do Ouro, 857 — Serra, Belo Horizonte/MG");
    await expect(section.locator("iframe")).toHaveCount(0);
    expect(google).toEqual([]);

    const rotas = section.getByRole("link", { name: /Ver rotas no Google Maps/ });
    await expect(rotas).toHaveAttribute("target", "_blank");
    const href = (await rotas.getAttribute("href"))!;
    expect(href.startsWith("https://www.google.com/maps/dir/?api=1&destination=")).toBe(true);
    expect(decodeURIComponent(href)).toContain("Dentarium, R. do Ouro, 857 - Serra, Belo Horizonte - MG");
    await expect(section.getByRole("link", { name: /Abrir a ficha no Google Maps/ })).toHaveAttribute(
      "href",
      /google\.com\/maps\/place\/Dentarium\/.*0xa699be9f59bc37:0xe0a2f87764437ea3/,
    );

    await section.getByRole("button", { name: "Mostrar mapa interativo" }).click();
    const frame = section.locator("iframe");
    await expect(frame).toHaveAttribute("src", /^https:\/\/www\.google\.com\/maps\/embed\?pb=.*0xa699be9f59bc37%3A0xe0a2f87764437ea3.*Dentarium/);
    await expect(frame).toHaveAttribute("title", /Clínica Dentarium/);
    const box = (await frame.boundingBox())!;
    expect(box.width).toBeGreaterThan(280);
    expect(box.height).toBeGreaterThan(280);
  });
});
