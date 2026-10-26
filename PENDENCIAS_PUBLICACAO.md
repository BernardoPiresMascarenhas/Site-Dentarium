# Pendências antes de qualquer publicação

Este site é um **estudo conceitual de redesign**, independente, e não o site oficial da Clínica Dentarium. Antes de qualquer publicação em domínio público, todos os itens abaixo precisam ser resolvidos com a clínica.

Os dados ficam centralizados em `src/data/`. Cada dado institucional tem um `status` (`public-site-unconfirmed`, `confirmed` ou `placeholder`). **Esta lista é o controle interno das pendências**: a interface do visitante não exibe marcadores "a confirmar".

Para não afirmar o que não foi confirmado, a interface já:
- **não exibe** itens de estrutura que dependem de equipamento (laboratório de próteses, exames de imagem no local), marcados com `equipment: true` em `src/data/clinic.ts`;
- apresenta os recursos de tecnologia como **explicação do que cada recurso é**, com a nota "A disponibilidade de cada recurso e a indicação para o seu caso são definidas na avaliação.";
- **não exibe função** para Fernanda de Paula T. Bastos (só nome e registro), porque nenhuma função foi divulgada.

## 1. Autorizações e direitos

- [ ] Consentimento da clínica para usar a marca, o nome e os textos.
- [ ] Licença de uso de todas as fotografias do kit (autoria e direitos).
- [ ] Autorização de imagem dos dois profissionais retratados em `fundadores.webp`.
- [ ] Confirmar se as fotos dos ambientes representam o espaço atual (e a data delas).

## 2. Fotografias com tratamento digital (em uso, demonstrativas)

| Arquivo | Onde | Pendência |
|---|---|---|
| `hero-equipe-dentarium.png` | Hero da home | Tratada por IA a partir de material da clínica. Aprovação de fidelidade e de uso pelos dois retratados. |
| `profissional-dentarium.png` | Página Equipe | Tratada por IA. Aprovação do retratado. Associada a **Gabriel Faria Aiala** por evidência visual: é o mesmo profissional que, em `fundadores.webp`, veste jaleco bordado "…riel Aiala" (a fundadora veste "Dra. Denise Fialho"). **Confirmar a identificação com a clínica.** |

As duas imagens estão marcadas com `aiTreated: true` em `src/data/images.ts`. O arquivo `hero-equipe-dentarium.png` tem uma coluna escura de 1 px na borda direita (artefato de exportação). Ela é recortada na exibição, sem alterar o arquivo; numa nova exportação, vale corrigir na origem.

## 3. Fotografias restritas (não usadas no site)

| Arquivo | Situação | Motivo |
|---|---|---|
| `recepcao-familia.webp` | Pendente | Pessoas identificáveis, incluindo uma criança. Exige autorização expressa dos retratados e do responsável legal. |
| `tomografia.webp` | Pendente | Além do profissional, mostra um **paciente identificável** dentro do equipamento. Só pode ir para a página Tecnologia com autorização do paciente e revisão ética. |
| `atendimento-procedimento.png` e `.webp` | **Não publicar** | Procedimento em andamento com paciente identificável (Resolução CFO 196/2019). |

Esses arquivos continuam em `public/images/dentarium/` só como referência. Nenhum componente os importa, e isso é verificado por testes (`src/data/data.test.ts` e `e2e/site.spec.ts`). Se os arquivos forem publicados na pasta `public/` de um servidor, ficam acessíveis por URL direta, então devem ser **removidos da pasta antes do deploy**.

## 4. Identidade visual

- [x] Logomarca oficial aplicada no header, no menu mobile e no rodapé (`public/images/dentarium/logo-dentarium-2.png`, configurada em `src/data/brand.ts`). O favicon (`src/app/icon.png`) é o recorte do símbolo desse mesmo arquivo, sem alterações.
- [ ] **Obter a logo em SVG** (ou PNG com pelo menos 944 × 240 px). O arquivo atual tem 236 × 60 px e fica levemente suave em telas retina. Para trocar, coloque o arquivo novo em `public/images/dentarium/` e altere apenas o `import` em `src/data/brand.ts`. A marca não deve ser vetorizada nem redesenhada a partir do PNG.
- [ ] Confirmar com a clínica a paleta derivada da marca: grafite `#5E625E`, argila `#7A5C4F` e rosado `#BCADA7` (ver `src/app/globals.css`).
- [ ] O símbolo da logo é semitransparente: mantê-la sempre sobre fundos claros. Se a clínica tiver uma versão para fundo escuro, ela pode ser adicionada em `src/data/brand.ts`.

## 5. Dados a confirmar (`src/data/clinic.ts`)

- [ ] Endereço: Rua do Ouro, 857 — Serra, Belo Horizonte/MG.
- [ ] Telefones: (31) 3261-6991 e (31) 3785-3126.
- [ ] E-mail: contato@clinicadentarium.com.br.
- [ ] Horário: segunda a sexta, 8h às 18h30.
- [ ] **WhatsApp**: o site anterior mostra `(31) 9808-3126` no cabeçalho e `(31) 99808-3126` no rodapé. Nenhum link `wa.me` é gerado enquanto `whatsappVerified` for `null`. Depois de confirmar, preencha esse campo e o link aparece automaticamente na página de contato.
- [ ] Estrutura exibida: estacionamento próprio, plataforma elevatória, sala de espera, consultórios.
- [ ] Estrutura oculta até confirmação: laboratório de próteses e exames de imagem no local (ao confirmar, remova `equipment: true`).

## 6. Equipe (`src/data/team.ts`)

- [ ] Denise Ligório Fialho Aiala, CRO 35.195: situação da inscrição.
- [ ] Gabriel Faria Aiala, CRO 33.950: situação da inscrição.
- [ ] Fernanda de Paula T. Bastos, CRO 24533: vínculo atual e dados.
- [ ] Informar a UF dos registros (CRO-MG?) e a categoria profissional, se aplicável.
- [ ] **Responsável técnico** da pessoa jurídica e seu registro (exigência de publicidade odontológica).
- [ ] Não individualizar os profissionais da foto coletiva sem identificação explícita.

## 7. Conteúdo clínico (`src/data/treatments.ts`, `src/data/content.ts`)

- [ ] Revisão de todos os textos de tratamento pelo responsável técnico.
- [ ] Confirmar quais tratamentos continuam sendo oferecidos (inclusive Dentarium Kids).
- [ ] Confirmar a disponibilidade de CAD/CAM, radiografia digital, tomografia, anestesia computadorizada e laser.
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
