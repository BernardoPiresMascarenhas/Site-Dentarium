# Pendências antes de qualquer publicação

Este site é um **estudo conceitual de redesign**, independente, e não o site oficial da Clínica Dentarium. Antes de qualquer publicação em domínio público, todos os itens abaixo precisam ser resolvidos com a clínica.

Os dados ficam centralizados em `src/data/`. Cada dado institucional tem um `status` (`public-site-unconfirmed`, `confirmed` ou `placeholder`). **Esta lista é o controle interno das pendências**: a interface do visitante não exibe marcadores "a confirmar".

A conferência completa com o conteúdo do site oficial anterior (`info-dentarium.pdf`), incluindo todas as afirmações que ficaram de fora por falta de comprovação, está em **`docs/REVISAO_CONTEUDO_DENTARIUM.md`**.

Para não afirmar o que não foi confirmado, a interface:
- exibe laboratório de prótese e sala de radiografia/tomografia porque constam do material da clínica (e a sala aparece em foto), mas eles seguem marcados com `equipment: true` em `src/data/clinic.ts` e **precisam de confirmação**;
- apresenta os recursos de tecnologia como **explicação do que cada recurso é**, com a nota "A disponibilidade de cada recurso e a indicação para o seu caso são definidas na avaliação.";
- apresenta Fernanda de Paula T. Bastos com a área divulgada (odontopediatria), **sem** identificá-la como fundadora.

## 1. Autorizações e direitos

- [ ] Consentimento da clínica para usar a marca, o nome e os textos.
- [ ] Licença de uso de todas as fotografias do kit (autoria e direitos).
- [ ] Autorização de imagem dos dois profissionais retratados em `fundadores.webp`.
- [ ] Confirmar se as fotos dos ambientes representam o espaço atual (e a data delas).
- [ ] Licença das ilustrações do site anterior usadas nos tratamentos: `implante.jpg`, `protese-fixa-dentadura.jpg`, `lentes-de-contato-de-porcelana.jpg`, `pre-natal-odontologico.png`.
- [ ] **Autorização dos responsáveis legais** pela criança de `odontologia-bh-dentarium-kids.png` (publicada em Odontopediatria a pedido do responsável pelo projeto) e conferência com as regras de publicidade do CFO.
- [ ] Confirmar com a clínica os convênios atendidos hoje (Agros, OdontoVida e Coopeder, exibidos em `/contato`; lista em `src/data/healthPlans.ts`) e a autorização de uso das logomarcas.
- [ ] Arquivar a cópia das autorizações de uso de imagem das fotos do site anterior com pessoas retratadas, publicadas em 2026-10-31 com autorização informada pelo responsável pelo projeto (ver seção 3).
- [ ] Manter o crédito CC BY-SA 3.0 da foto do alinhador (ClearCorrect, Wikimedia Commons) enquanto ela for usada.
- [ ] Alinhadores: confirmar se a clínica oferece hoje e qual marca/sistema (Invisalign é citado no material antigo; a foto ClearCorrect é só ilustrativa). Nenhuma marca é citada publicamente até a confirmação.

## 2. Fotografias com tratamento digital (em uso, demonstrativas)

| Arquivo | Onde | Pendência |
|---|---|---|
| `hero-equipe-dentarium.png` | Hero da home | Tratada por IA a partir de material da clínica. Aprovação de fidelidade e de uso pelos dois retratados. |
| `profissional-dentarium.png` | **Não usada** | Substituída pelos retratos individuais `gabriel.png`, `denise.png` e `fernanda.png`. Arquivo mantido. |

As duas imagens estão marcadas com `aiTreated: true` em `src/data/images.ts`. O arquivo `hero-equipe-dentarium.png` tem uma coluna escura de 1 px na borda direita (artefato de exportação). Ela é recortada na exibição, sem alterar o arquivo; numa nova exportação, vale corrigir na origem.

## 3. Fotografias com pessoas retratadas (publicadas com autorização informada)

Vieram do site anterior da clínica. Em 2026-10-31, o responsável pelo projeto informou que todas têm autorização de uso de imagem, e elas passaram a ser publicadas. Vale arquivar a cópia das autorizações.

| Arquivo | Onde | Observação |
|---|---|---|
| `recepcao-familia.webp` | `/a-clinica`, capítulo "Recepção" do tour | Inclui uma criança: a autorização precisa ser do responsável legal. |
| `tomografia.webp` | `/tecnologia`, grupo "Enxergar" | Paciente identificável no equipamento. Substituiu `sala-de-radiografia-dentarium-300x240.png`, que deixou de ser usada. |
| `atendimento-procedimento.webp` | `/tecnologia`, grupo "Executar com conforto" | Procedimento com paciente identificável: conferir também as regras de publicidade do CFO (Resolução CFO 196/2019). O `.png` do mesmo arquivo não é usado. |
| `primeira-consulta.png` | `/tratamentos/primeira-consulta` | Substituiu `consultorio.png` nessa página (a foto segue em `/a-clinica`). |
| `odontologia-bh-protetor-bucal-esportivo.png` | `/tratamentos/protetores-esportivos` | Ao lado do bloco "O que um bom protetor precisa ter". |

## 4. Identidade visual

- [x] Logomarca oficial aplicada no header, no menu mobile e no rodapé (`public/images/dentarium/logo-dentarium-2.png`, configurada em `src/data/brand.ts`). O favicon (`src/app/icon.png`) é o recorte do símbolo desse mesmo arquivo, sem alterações.
- [ ] **Obter a logo em SVG** (ou PNG com pelo menos 944 × 240 px). O arquivo atual tem 236 × 60 px e fica levemente suave em telas retina. Para trocar, coloque o arquivo novo em `public/images/dentarium/` e altere apenas o `import` em `src/data/brand.ts`. A marca não deve ser vetorizada nem redesenhada a partir do PNG.
- [ ] Confirmar com a clínica a paleta derivada da marca: grafite `#5E625E`, argila `#7A5C4F` e rosado `#BCADA7` (ver `src/app/globals.css`).
- [ ] O símbolo da logo é semitransparente: mantê-la sempre sobre fundos claros. Se a clínica tiver uma versão para fundo escuro, ela pode ser adicionada em `src/data/brand.ts`.

## 5. Dados a confirmar (`src/data/clinic.ts`)

- [ ] Endereço: Rua do Ouro, 857 — Serra, Belo Horizonte/MG.
- [ ] Telefones: (31) 3261-6991 e (31) 3785-3126.
- [ ] E-mail: contato@clinicadentarium.com.br.
- [x] Horário: segunda a sexta, 08h às 18h30; sábado e domingo fechados (informado pelo responsável pelo projeto em 30/10/2026).
- [x] **WhatsApp**: (31) 99808-3126, `https://wa.me/5531998083126` (informado em 30/10/2026). Mensagens prontas por contexto em `clinic.ts` e `treatmentWhatsappMessage()`.
- [ ] Estrutura exibida: estacionamento próprio, plataforma elevatória, sala de espera, consultórios, apoio clínico.
- [ ] Estrutura com equipamento, exibida e a confirmar: sala de radiografia e tomografia, laboratório de prótese (`equipment: true`).

## 6. Equipe (`src/data/team.ts`)

- [ ] Denise Ligório Fialho Aiala, CRO 35.195: situação da inscrição.
- [ ] Gabriel Faria Aiala, CRO 33.950: situação da inscrição.
- [ ] Fernanda de Paula T. Bastos, CRO 24.533: vínculo atual, dados e título de especialista em odontopediatria.
- [ ] Formações exibidas na página Equipe (conforme o site anterior) e autorização de uso dos três retratos individuais.
- [ ] Informar a UF dos registros (CRO-MG?) e a categoria profissional, se aplicável.
- [ ] **Responsável técnico** da pessoa jurídica e seu registro (exigência de publicidade odontológica).
- [ ] Não individualizar os profissionais da foto coletiva sem identificação explícita (os retratos individuais da página Equipe vieram em arquivos próprios, nomeados pela clínica).

## 7. Conteúdo clínico (`src/data/treatments.ts`, `src/data/content.ts`)

- [ ] Revisão de todos os textos de tratamento pelo responsável técnico.
- [ ] Confirmar quais tratamentos continuam sendo oferecidos (inclusive Dentarium Kids).
- [ ] Confirmar a disponibilidade de CAD/CAM, radiografia, tomografia, anestesia computadorizada, laser e localizador apical.
- [ ] Validar ou descartar as afirmações antigas listadas em `docs/REVISAO_CONTEUDO_DENTARIUM.md` §5 (ISO 9002, "1% das clínicas", "indolor", prazos, durabilidade).
- [ ] Conferir a conformidade com a Resolução CFO 196/2019, o Código de Ética Odontológica e as orientações do CRO-MG:
  - https://website.cfo.org.br/resolucao-cfo-196-2019/
  - https://website.cfo.org.br/redes-sociais-na-odontologia-fique-atento-as-normas-eticas-e-acerte-na-publicacao-dos-conteudos/

## 8. Avaliações do Google (`src/data/reviews.ts`)

- [ ] **Links oficiais do Google**: `googleReviewLinks.reviewsUrl` ("Ver avaliações no Google") e `googleReviewLinks.writeReviewUrl` ("Deixar avaliação no Google") estão como `null`, porque dependem do identificador oficial do local (Place ID). Enquanto forem `null`, o link e o botão não aparecem; o convite "Já é paciente da Dentarium?" é exibido sem botão.
- [ ] **Notas individuais**: nenhuma foi informada, então `rating: null` em todas e nenhuma estrela é exibida. Preencher só com a nota confirmada de cada avaliação. Nenhuma média geral deve ser exibida.
- [ ] **Avaliações truncadas** (Wenderson luiz Vieira, Ankelly Marques, ana luiza amaral cornelio): cadastradas com `status: "incomplete"` e fora do site. Para ativar, substituir pelo texto integral e mudar para `"complete"`.
- [ ] **Conformidade ética**: confirmar com o responsável técnico se a divulgação de depoimentos de pacientes no site da clínica atende ao Código de Ética Odontológica, à Resolução CFO 196/2019 e às orientações do CRO-MG. Alguns textos citam profissionais pelo nome e descrevem experiências clínicas, como a anestesia.
- [ ] **Dados pessoais**: as avaliações são públicas no Google, mas reproduzir nome e comentário em outro canal merece avaliação sob a LGPD (base legal ou consentimento).

## 9. Jurídico e técnico

- [ ] Substituir o aviso de privacidade **demonstrativo** (`/privacidade`) por um texto revisado juridicamente e aprovado pelo controlador dos dados.
- [ ] Definir o domínio e então configurar `metadataBase`, URLs canônicas e Open Graph.
- [ ] Remover o `noindex` (`src/app/layout.tsx`) e o `Disallow: /` (`src/app/robots.ts`) **somente** na versão autorizada.
- [ ] Remover o aviso de estudo conceitual do rodapé (`demoNotice`) na versão autorizada.
