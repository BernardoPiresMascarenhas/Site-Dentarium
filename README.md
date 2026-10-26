# Dentarium — estudo conceitual de redesign

Redesign demonstrativo para a Clínica Dentarium (odontologia funcional e estética, Belo Horizonte). **Projeto independente de portfólio — não é o site oficial da clínica.** Antes de publicar, leia `PENDENCIAS_PUBLICACAO.md`.

## Stack

- Next.js 16 (App Router, Cache Components, Turbopack) e React 19
- TypeScript e Tailwind CSS 4
- Motion (animações), com `prefers-reduced-motion` respeitado em todo o site
- Lucide (ícones de interface)
- Vitest (testes de dados e regras de conteúdo) e Playwright (testes E2E)

## Como rodar

```bash
npm install
npm run dev          # http://localhost:3000
```

Produção:

```bash
npm run build
npm run start
```

## Verificações

```bash
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run test         # Vitest: dados, links internos, fotos restritas, WhatsApp, termos proibidos
npm run test:e2e     # Playwright: rotas, header, menus, galeria, abas de tecnologia, FAQ, filtros,
                     # formulário, carrossel de avaliações (movimento, pausas, ler mais, teclado,
                     # toque, movimento reduzido), 404, acessibilidade (axe) e desempenho
npm run check        # lint + typecheck + test + build
```

Na primeira vez, instale o navegador dos testes E2E com `npx playwright install chromium --only-shell`. O `test:e2e` sobe o servidor de produção na porta 3100, então rode `npm run build` antes e deixe essa porta livre.

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Hero, atributos, sobre, tratamentos, tecnologia, ambientes (galeria), fundadores, jornada, FAQ e contato |
| `/a-clinica` | Abordagem, fundadores, estrutura, galeria e localização |
| `/tratamentos` | Catálogo com filtro por área e busca |
| `/tratamentos/[slug]` | 14 páginas estáticas de tratamento; slug desconhecido responde 404 (via `src/proxy.ts`) |
| `/tecnologia` | Recursos citados pela clínica, com diagrama abstrato em SVG |
| `/equipe` | Profissionais e registros divulgados (marcados "a confirmar") |
| `/contato` | Endereço, mapa externo, telefones, e-mail e formulário que só monta um `mailto:` |
| `/privacidade` | Aviso de privacidade **demonstrativo** |

## Estrutura

```
src/
  app/          rotas, layout, 404, erro, robots
  components/   layout (header, menu mobile, rodapé), home, clinic, treatments, ui
  data/         clinic, treatments, team, content, images, navigation (fonte única dos dados)
  proxy.ts      404 real para slugs de tratamento desconhecidos
e2e/            testes Playwright
public/images/dentarium/   fotografias do kit
```

## Fotografias

O catálogo fica em `src/data/images.ts`. Cada foto aparece no máximo uma vez por página:

| Página | Fotografias |
|---|---|
| Home | `hero-equipe-dentarium.png` (hero), `sala-espera` + `logo-parede` (sobre), `consultorio-equipamentos` (tecnologia), `consultorio-roxo` + `jardim-externo` + `sala-apoio-clinico` (ambientes), `fachada` (contato) |
| A Clínica | `logo-parede` (abertura), `fundadores.webp` (registro institucional), tour: `fachada`, `jardim-externo`, `sala-espera`, `consultorio-roxo`, `consultorio-equipamentos`, `sala-apoio-clinico` |
| Tecnologia | `sala-apoio-clinico` + `consultorio-equipamentos` (seção escura) |
| Equipe | `profissional-dentarium.png` (Gabriel Faria Aiala) |
| Contato | `fachada` |

Não usadas (ver `PENDENCIAS_PUBLICACAO.md`): `tomografia.webp`, `recepcao-familia.webp`, `atendimento-procedimento.png/.webp`.

## Decisões de design

- **Marca**: logomarca oficial (`src/data/brand.ts` + `src/components/ui/Logo.tsx`) no header, no menu mobile e no rodapé, com só a altura definida para preservar a proporção. Para usar um SVG ou PNG maior, troque o `import` em `src/data/brand.ts`.
- **Paleta derivada da logo**: fundos claros e quentes (`#F7F5F2`, `#EFE9E4`), texto grafite (`#2A2C2A`; grafite da marca `#5E625E`), botões em grafite `#454945`, detalhes em argila `#7A5C4F` e rosado `#BCADA7` (o tom do símbolo). A seção de tecnologia e a faixa de CTA usam grafite profundo `#2E302E`; o rodapé é claro para acomodar a logo.
- **Tipografia**: Newsreader (serifada editorial com tamanho óptico) nos títulos e Manrope na interface.
- **Motivo do arco**: vem da arquitetura e aparece no retrato do hero (com eco bege-rosado e linha em argila), na galeria, nos marcadores e no diagrama de tecnologia. O símbolo da marca não é redesenhado.
- **Fotos**: exibidas no tamanho nativo ou menor (os arquivos têm entre 382 e 680 px), sem ampliação nem recortes que escondam a marca d'água.
- **Movimento**: uma sequência de abertura em CSS no hero, a linha da jornada acompanhando o scroll (sem prender a rolagem) e transições apenas em resposta a ações do usuário.
- **Honestidade**: nenhum número, depoimento, prêmio ou promessa inventados; o WhatsApp fica desativado até o número ser confirmado; o formulário não envia nem armazena nada.
