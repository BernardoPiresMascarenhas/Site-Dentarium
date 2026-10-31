# Revisão de conteúdo — Clínica Dentarium

Conferência entre `info-dentarium.pdf` (14 páginas recuperadas do site oficial anterior) e o site novo.
Data da revisão: 30/10/2026.

O PDF contém apenas texto (nenhuma imagem embutida), então não havia texto escondido em figuras.
Ele **não traz** endereço, telefones, WhatsApp, e-mail, horário, preços nem respostas para a maior parte das perguntas frequentes.

Legenda: **Usado** = publicado no site · **Adaptado** = publicado com redação revisada ou suavizada · **Pendente** = não publicado até ser validado.

## 1. Tabela de conferência

| Pág. | Seção do PDF | Situação | Onde está no site / motivo |
|---|---|---|---|
| 1 | Sobre — tecnologia de ponta, "equipamentos que apenas 1% das clínicas no Brasil possui" | **Pendente** | Afirmação sem comprovação atual. Só "tecnologia" e "inovação" foram usadas (`/tecnologia`, `/a-clinica`). |
| 1 | Sobre — região Centro-Sul, bairro Serra, ambiente agradável e seguro | Usado | `/a-clinica` (Estrutura), home (Sobre), Contato. |
| 1 | Sobre — estacionamento próprio | Usado | `/a-clinica` (Estrutura e tour, capítulo Estacionamento, foto `estacionamento.png`), FAQ da home. |
| 1 | Sobre — plataforma elevatória para pessoas com mobilidade reduzida | Usado | `/a-clinica` (Estrutura), FAQ da home. |
| 1 | Sobre — origem na união dos fundadores Denise e Gabriel; mesmos valores e filosofia; inovação como pilar | Adaptado | `/a-clinica` → "Nossa história" (`history` em `src/data/content.ts`). Nenhum ano de fundação foi inventado. Resumo na home (Fundadores). |
| 1 | Gabriel Faria Aiala — CRO 33.950; Mestre em Implantodontia; Especialista em Periodontia; Especialista em Odontologia Legal | Usado | `/equipe` (foto `gabriel.png`), cartão de fundadores (home e `/a-clinica`). |
| 1 | Fernanda de Paula T. Bastos — CRO 24533; Odontopediatra | Usado | `/equipe` (foto `fernanda.png`), com link para Odontopediatria. **Não** apresentada como fundadora. CRO exibido como 24.533 (mesmo número, formatação igual à dos demais). |
| 1–2 | Denise Ligório Fialho Aiala — CRO 35.195; Pós-graduada em Periodontia; Mestrado em Periodontia; Especialista em Endodontia | Usado | `/equipe` (foto `denise.png`), cartão de fundadores. |
| 2 | Próteses — consequências da perda dentária (fonética, mastigação, movimentação dos dentes, reabsorção óssea) | Usado | `/tratamentos/proteses` (introdução) e FAQ "A falta de dentes pode me prejudicar?". |
| 2 | Próteses — diferentes materiais; análise de hábitos e contexto médico | Usado | `/tratamentos/proteses` (introdução). |
| 2 | Próteses — "garantindo uma vida normal sem desconfortos" | **Pendente** | Promessa de resultado; removida. |
| 2 | Próteses — fixa (parafusada/cimentada em implantes e dentes naturais) e removível | Usado | `/tratamentos/proteses#fixas-e-removiveis`. |
| 2–3 | Melhoria do sistema de retenção da dentadura — dentadura sobre implantes, retenção, estabilidade, reabsorção óssea, estudo da arcada + planejamento digital | Adaptado | Seção interna `/tratamentos/proteses#retencao-de-dentaduras` (sem página própria, para não duplicar). "Evita ou diminui a reabsorção" virou "pode ajudar a reduzir". Mencionado também em Implantes e no Planejamento digital. |
| 3 | "Descubra como é fácil voltar a ter dentes fortes e um sorriso lindo" | Não usado | Apelo publicitário; substituído pelos CTAs de avaliação existentes. |
| 3 | Primeira consulta — histórico, anamnese (diabetes, hipertensão, cardiopatias), análise conjunta multidisciplinar, plano, fotografias, retorno | Adaptado | `/tratamentos/primeira-consulta` (introdução e 4 etapas), FAQ da home "Como funciona a primeira consulta?", recurso "Análise multidisciplinar" em `/tecnologia`, princípio "Áreas que conversam" em `/a-clinica`. "Análise perfeita" e "menor prazo possível" foram retirados. |
| 3 | Dentarium Kids — brinquedos e acessórios lúdicos; vínculo de confiança | Usado | `/tratamentos/odontopediatria#dentarium-kids`. |
| 3–4 (e repetido na 4) | Pré-natal odontológico | Adaptado | `/tratamentos/odontopediatria#pre-natal-odontologico` + FAQ "Gestantes podem ir ao dentista?". "Infecção na gengiva que pode prejudicar a saúde do bebê" foi suavizado (ver pendência C3). Busca encontra por "gestante", "gravidez", "pré-natal". |
| 4–5 (repetido) | Acompanhamento pediátrico — prevenção, identificação precoce, autonomia da criança na escovação | Usado | `/tratamentos/odontopediatria#acompanhamento-pediatrico`. "Correções precisas" foi omitido. |
| 5 | Tratamentos estéticos — "mais avançados e tecnológicos do mercado, rapidez, conforto e segurança" | Adaptado | Categoria Estética (`/tratamentos`) e seção "Onde ele pode ser usado" do Planejamento digital. Superlativos removidos. |
| 5–6 (repetido) | Planejamento digital do sorriso — fotos, vídeos, software, proporções faciais e dentais, redesenho, diagnóstico, comunicação, previsibilidade | Adaptado | **Nova página** `/tratamentos/planejamento-digital-do-sorriso`; recurso em `/tecnologia` (grupo Planejar) e aba na home. "Acelera o tempo de tratamento" virou "torna o tratamento mais previsível"; "visualiza o resultado final" virou "visualiza o projeto". |
| 5 | Lista "outras possibilidades estéticas": clareamento, lentes, ortodontia, **Invisalign**, implantes, **plástica gengival** | Adaptado | Lista no Planejamento digital. Plástica gengival ligada ao enxerto gengival (busca e página Enxertos). **Invisalign: pendente** — não aparece na interface. A página de ortodontia explica alinhadores transparentes de forma genérica, sem citar marca (ver S1). |
| 6 | Clareamento — duas técnicas (consultório com LED; caseiro com moldeira), ação na dentina | Adaptado | `/tratamentos/clareamento` (introdução + seções "Clareamento em consultório" e "Clareamento caseiro supervisionado"). Ver pendência C4 sobre o agente clareador. "Moldeiras confeccionadas na mesma hora" omitido (prazo). |
| 7 | Facetas/lentes de porcelana — películas finas, cor e forma, desenho artesanal e personalizado, CAD/CAM, manutenção, escovação e fio | Adaptado | `/tratamentos/facetas-e-lentes` (introdução, seções, cuidados, FAQ "O que são facetas ou lentes de contato?"). |
| 7 | Facetas — "mais procuradas por artistas e famosos", "resultado fica perfeito", "uma só consulta", "ótimo estado após 15 anos" | **Pendente** | Promessas, prazos e dado de durabilidade sem fonte. Viraram "em alguns casos o CAD/CAM agiliza e reduz etapas". |
| 7 | Protetores bucais esportivos — sob medida, dentes/rebordo/lábios, MMA, basquete, hóquei, rúgbi; requisitos (flexível, confortável, resistente, sem restringir respiração/fala) | Usado | `/tratamentos/protetores-esportivos` (renomeado para "Protetores bucais esportivos"; URL mantida). |
| 8 | Enxertos ósseos — aumento de altura/espessura, osso próprio ou biomateriais, implante após cicatrização, redução de cirurgias | Adaptado | `/tratamentos/enxertos#enxerto-osseo` + FAQ "O que é enxerto ósseo?". Página renomeada "Enxertos ósseos e gengivais" (URL mantida). "Seis a doze meses" foi substituído por "alguns meses, variando de caso para caso" (pendência C5). |
| 8 | Enxerto gengival / cirurgia plástica periodontal — causas da retração, consequências, harmonia do sorriso | Usado | `/tratamentos/enxertos#enxerto-gengival` e `/tratamentos/periodontia#retracao-gengival`. "Soluciona" virou "trata". |
| 8 | Extração de terceiros molares — erupção entre 16 e 25 anos; indicações; parcialmente erupcionado; incluso | Usado | `/tratamentos/extracao-de-terceiros-molares` (introdução + 2 seções; "Sisos" como nome alternativo e na busca). "Degenerações" omitido. |
| 8–9 | Laserterapia — laser de baixa potência, microcirculação, ATP, cicatrização, ação anti-inflamatória e analgésica, nº de sessões variável | Adaptado | **Nova página** `/tratamentos/laserterapia`; recurso "Laser" em `/tecnologia` e na home. |
| 9 | Laserterapia — "indolor", "cirurgia sem sangramento e sem sutura", "livre de infecção", "um dos mais eficientes", indicação para cardiopatas e diabéticos | **Pendente** | Afirmações clínicas que misturam laser de baixa e de alta potência; exigem revisão técnico-científica (C6). |
| 9 | FAQ — "O que é sensibilidade dentária?" (única resposta recuperada) | Usado | `/tratamentos/manutencao-preventiva` (FAQ). |
| 9–10 | FAQ sem resposta recuperada (24 perguntas) | Parcial | Ver seção 3. Nenhuma resposta foi inventada em nome da clínica. |
| 10 | Estrutura — estacionamento, elevador de acessibilidade, sala de espera (TV, poltronas, lavabo), consultórios com equipamentos novos, TV e mesa com computador | Usado | `/a-clinica` (Estrutura + tour). "Equipamentos novos" omitido (datado). |
| 10 | Estrutura — protetores para calçados na chegada | **Pendente** | Procedimento operacional possivelmente desatualizado; confirmar antes de publicar. |
| 10 | Estrutura — laboratório de prótese e sala de radiografia/tomografia ao lado dos consultórios; exame no mesmo local | Usado (com pendência) | `/a-clinica` (Estrutura), `/tecnologia`. Antes ficavam ocultos (`equipment: true`); agora são exibidos porque constam do material e a sala aparece em foto, mas a situação atual precisa de confirmação (E1). |
| 10 | "Os pacientes aprovam e recomendam" | Não usado | A seção de avaliações do Google já cumpre esse papel, com regras próprias. |
| 11 | Valores — equipe "totalmente formada por especialistas e mestres" | **Pendente** | Para Fernanda, o PDF só informa "Odontopediatra"; confirmar títulos antes de afirmar (P3). |
| 11 | Valores — excelência, paciente como foco, ir além do esperado, extrema qualidade, atenção aos detalhes, inovação com foco em resultados, respeito, honestidade, confiança, referência premium em BH | Adaptado | `/a-clinica` → seção "Valores" (seis valores em composição tipográfica). "Referência" apresentada como objetivo, não como fato. |
| 11–12 | Tecnologia Avançada — CAD/CAM, exames de imagem, "Apical" para endodontia, anestesia computadorizada, lasers | Adaptado | `/tecnologia` (4 grupos) e abas da home. "Apical" interpretado como localizador apical (pendência E3). "1% das clínicas" e "extrema rapidez" removidos. |
| 12 | Esterilização — assepsia da sala e equipamentos, instrumentais esterilizados, proteção do material, ambientes higienizados | Usado | `/tecnologia#biosseguranca`. |
| 12 | Esterilização — "protocolos ISO 9002" | **Pendente** | A ISO 9002 foi descontinuada em 2000 (incorporada à ISO 9001). Não publicar sem certificação vigente (C1). |
| 12–13 | Odontologia Digital — sigla CAD/CAM, três etapas (scanner, desenho CAD, produção), etapas na própria clínica, materiais | Usado | `/tecnologia#cad-cam` — componente interativo em três etapas (`CadcamSteps`), materiais e FAQ. "Elevou em potência a qualidade" omitido. |
| 13 | Laboratório de Prótese — individualidade do sorriso, laboratório na clínica, CAD/CAM, planejamento por mestres especialistas | Adaptado | `/tecnologia` (grupo Confeccionar), `/tratamentos/proteses#laboratorio`, `/a-clinica` (Estrutura). "Última geração", "mais avançada do Brasil e do mundo" e "perfeição" removidos. |
| 14 | Anestesia computadorizada — equipamento digital, aplicação lenta e precisa | Adaptado | `/tecnologia`, aba da home, FAQ "Como funciona a anestesia computadorizada?". |
| 14 | Anestesia — "praticamente indolor", "eliminação do inchaço e da dormência", "criado por um odontologista brasileiro" | **Pendente** | Promessas e afirmação histórica sem fonte (C2). |
| 14 | Link para reportagem da TV Record (YouTube) | **Pendente** | Conteúdo de terceiros; confirmar direitos, atualidade e conformidade ética antes de incorporar. |

## 2. Tratamentos

| Assunto pedido | Onde ficou | Tipo |
|---|---|---|
| Primeira consulta | `/tratamentos/primeira-consulta` | Página existente, enriquecida |
| Dentarium Kids | `/tratamentos/odontopediatria#dentarium-kids` | Seção interna |
| Pré-natal odontológico | `/tratamentos/odontopediatria#pre-natal-odontologico` | Seção interna |
| Acompanhamento pediátrico | `/tratamentos/odontopediatria#acompanhamento-pediatrico` | Seção interna |
| Tratamentos estéticos | Categoria "Estética" + `/tratamentos/planejamento-digital-do-sorriso#tratamentos-esteticos` | Categoria + seção |
| Planejamento digital do sorriso | `/tratamentos/planejamento-digital-do-sorriso` | **Nova página** |
| Clareamento dental | `/tratamentos/clareamento` | Existente, enriquecida |
| Facetas e lentes de porcelana | `/tratamentos/facetas-e-lentes` | Existente, enriquecida |
| Implantes dentários | `/tratamentos/implantes` | Existente, com seções sobre osso e dentaduras |
| Próteses dentárias | `/tratamentos/proteses` | Existente, enriquecida |
| Retenção de dentaduras com implantes | `/tratamentos/proteses#retencao-de-dentaduras` | Seção interna |
| Tratamentos ortodônticos | `/tratamentos/ortodontia` | Existente (PDF só cita o nome) |
| Protetores bucais esportivos | `/tratamentos/protetores-esportivos` | Existente, enriquecida e renomeada |
| Placas de bruxismo | `/tratamentos/placas-de-bruxismo` | Existente (não detalhada no PDF) |
| Enxertos ósseos e gengivais | `/tratamentos/enxertos#enxerto-osseo` e `#enxerto-gengival` | Existente, renomeada, com seções |
| Extração de sisos | `/tratamentos/extracao-de-terceiros-molares` | Existente, enriquecida |
| Laserterapia | `/tratamentos/laserterapia` | **Nova página** |
| Tratamentos periodontais | `/tratamentos/periodontia` | Existente, com seção de retração gengival |
| Tratamentos endodônticos | `/tratamentos/tratamento-de-canal` | Existente, com cuidados |
| Manutenção preventiva | `/tratamentos/manutencao-preventiva` | Existente (não citada no PDF), com FAQ de sensibilidade |

Total: 16 páginas (14 anteriores + 2 novas). Nenhuma URL foi alterada, portanto não houve necessidade de redirects. A busca de `/tratamentos` passou a considerar termos alternativos e os títulos das seções internas (ex.: "gestante", "dentadura", "siso", "plástica gengival").

## 3. Perguntas frequentes do PDF (págs. 9–10)

| Pergunta | Situação |
|---|---|
| O que é sensibilidade dentária? | Usada com a resposta do PDF — Manutenção preventiva. |
| O que são facetas ou lentes de contato? | Respondida com o texto da seção Facetas do PDF — Facetas e lentes. |
| A falta de dentes pode me prejudicar? | Respondida com o texto da seção Próteses do PDF — Próteses. |
| O que é enxerto ósseo? | Respondida com o texto da seção Enxertos do PDF — Enxertos. |
| Como posso melhorar a estética do meu sorriso? | Respondida com a lista de tratamentos estéticos do PDF — Planejamento digital. |
| Qual o tempo ideal para manutenção da limpeza (profilaxia)? | **Pendente.** A página já tem a pergunta genérica "Com que frequência devo fazer revisões?" (resposta: definido individualmente), sem intervalo atribuído à clínica. |
| Quanto tempo dura o clareamento dental? | **Pendente** — sem resposta no material. |
| Existe contraindicação para clareamento dental? | **Pendente.** |
| Posso fazer facetas ou lentes em todos os dentes de uma vez? | **Pendente.** |
| É possível escolher a cor e forma das facetas? | **Pendente.** |
| Quais os benefícios das facetas e lentes de contato? | **Pendente** (o PDF só traz afirmações que exigem validação). |
| Qual é melhor: implante ou prótese convencional? | **Pendente.** Existe a pergunta genérica "Prótese fixa ou removível: qual é melhor?" (depende de avaliação). |
| Existe idade mínima para implante? | **Pendente.** |
| O implante melhora a mastigação? | **Pendente.** |
| O que são implantes osseointegráveis? | **Pendente.** |
| O que são implantes de carga imediata? | **Pendente.** |
| Existe risco de rejeição no implante? | **Pendente.** |
| É possível refazer um implante malsucedido? | **Pendente.** |
| O que é implante zigomático? | **Pendente** — e confirmar se a clínica realiza. |
| Dói muito para colocar os implantes? | **Pendente.** |
| Como é o pós-operatório? | **Pendente.** |
| O implante só é colocado após perder o dente? | **Pendente.** |
| O que é doença periodontal? | **Pendente.** |
| O tratamento de implantes exige manutenção? | **Pendente.** |

Perguntas novas, com resposta sustentada pelo próprio PDF: "Como funciona a primeira consulta?" (home), "Gestantes podem ir ao dentista?" (Odontopediatria), "Consigo ver como meu sorriso pode ficar antes do tratamento?" (Planejamento digital), "Quantas sessões de laserterapia são necessárias?" (Laserterapia), e quatro perguntas de tecnologia em `/tecnologia` (sigla CAD/CAM, materiais, escaneamento × moldagem, anestesia computadorizada).

## 4. Fotografias

| Arquivo | Uso | Observação |
|---|---|---|
| `gabriel.png` (512×512) | `/equipe` | Moldura 4:5 limitada a 320 px. Jaleco com o nome bordado. |
| `denise.png` (512×512) | `/equipe` | Jaleco "Dra. Denise Fialho". |
| `fernanda.png` (512×512) | `/equipe` | Jaleco com o nome bordado. |
| `sala-de-radiografia-dentarium-300x240.png` | `/tecnologia` (grupo Enxergar) | Exibida em no máximo 300 px. |
| `Consultorio-odontologico.png` | `/a-clinica`, tour → Consultórios | Legenda "Consultório com bancada"; no máximo 300 px. |
| `consultorio.png` | `/a-clinica`, seção Estrutura | Mostra a mesa com computador e a TV citadas no PDF. É o mesmo consultório de `consultorio-roxo.webp` (outro ângulo), por isso fica em outra seção. |
| `consultorio2.png` | `/tecnologia` (grupo Planejar) | Mesmo consultório de `consultorio-equipamentos.webp` (home); páginas diferentes. |
| `salaespera.png` | `/a-clinica`, tour → Espera | Legenda "Poltronas da sala de espera". |
| `estacionamento.png` | `/a-clinica`, tour → Estacionamento | O carro fotografado aparece de lado/traseira; conferir se a placa não fica legível em versões maiores. |

### 4.1 Imagens das páginas de tratamento (rodada de 30/10/2026)

A pasta `public/images/dentarium/tratamentos/` citada no briefing não existe: os dez arquivos estão em `public/images/dentarium/`, com os nomes e extensões originais preservados. Configuração central em `src/data/treatmentMedia.ts`.

| Arquivo | Dimensões | Decisão | Onde |
|---|---|---|---|
| `implante.jpg` | 750×750 | **Usado** (ilustração) | `/tratamentos/implantes#estrutura-do-implante`, ao lado das três partes do implante. Legenda: "sem valor de resultado clínico". |
| `protese-fixa-dentadura.jpg` | 500×500 | **Usado** (ilustração) | `/tratamentos/proteses#retencao-de-dentaduras`, máx. 440 px. |
| `lentes-de-contato-de-porcelana.jpg` | 500×500 | **Usado** (foto ilustrativa) | `/tratamentos/facetas-e-lentes#planejamento-personalizado`. Legenda: "Não é um caso tratado na Dentarium". Sem antes e depois. |
| `pre-natal-odontologico.png` | 500×500 | **Usado** | `/tratamentos/odontopediatria#pre-natal-odontologico`, máx. 420 px. |
| `odontologia-bh-protetor-bucal-esportivo.png` | 500×500 | Usada (autorização informada em 2026-10-31) | Pessoa identificável. Ao lado do bloco "O que um bom protetor precisa ter". |
| `primeira-consulta.png` | 500×500 | Usada (autorização informada em 2026-10-31) | Profissional + pessoa atendida. Bloco "Um diagnóstico construído em conjunto". |
| `odontologia-bh-dentarium-kids.png` | 750×750 | **Usado a pedido do responsável pelo projeto** | `/tratamentos/odontopediatria#dentarium-kids`, máx. 460 px. Mostra paciente menor de idade em atendimento: **exige autorização dos responsáveis legais** e conferência com as regras de publicidade do CFO antes da publicação oficial. |
| `placas-de-bruxismo-dentarium.jpg` | 750×750 | **Não publicar** | Foto intraoral antiga. Página usa cards tipográficos sobre a placa oclusal. |
| `manutencao-preventiva.png` | 500×500 | **Não publicar** | Comparações clínicas (tártaro/manchas). Página usa etapas em ciclo. |
| `claremento-dental.png` | 500×500 | **Não publicar** | Antes e depois. Página usa diagrama SVG próprio (esmalte/dentina). |

Imagens das quatro primeiras linhas vieram do site anterior da clínica: **confirmar a licença** (podem ser de banco de imagens comprado pela clínica). Nenhum arquivo "aguardando" ou "não publicar" é importado; um teste unitário e um teste e2e garantem isso.

**Imagem complementar licenciada**

| Arquivo | Fonte | Licença | Uso |
|---|---|---|---|
| `public/images/licenciadas/aligner-on-table-v2.jpg` (1593×1066) | [Wikimedia Commons — "Aligner on Table v2 (2).jpg"](https://commons.wikimedia.org/wiki/File:Aligner_on_Table_v2_(2).jpg), autor ClearCorrect | CC BY-SA 3.0 (atribuição obrigatória) | `/tratamentos/ortodontia#alinhadores-transparentes`, com crédito, licença e links na legenda. Legenda deixa claro que não representa a marca nem o produto usado pela clínica. Arquivo sem modificações. |

Outras opções do Commons foram avaliadas e descartadas: ilustração de canal da Blausen (CC BY 3.0, rótulos em inglês), placa rígida laranja (CC BY-SA 2.0, estética destoante), ilustrações 3D de escovação (CC BY-SA 3.0, paleta destoante), desenho antigo de sisos (domínio público, estilo destoante). Para canal, periodontia, sisos e clareamento foram desenhados diagramas SVG próprios (`src/components/treatments/ToothDiagram.tsx`), sem direitos de terceiros.

O retrato `profissional-dentarium.png` (tratado por IA) deixou de ser usado; o arquivo foi mantido. A foto do hero (`hero-equipe-dentarium.png`) e a foto coletiva `fundadores.webp` (em `/a-clinica`) não mudaram. Nenhuma imagem de paciente identificável foi adicionada.

## 5. Pendências de validação

### Afirmações clínicas e técnicas (não publicadas)
- **C1** — "Protocolos ISO 9002" (norma extinta). Publicar só com certificação vigente.
- **C2** — Anestesia computadorizada "praticamente indolor", "elimina inchaço e dormência", "criada por um odontologista brasileiro".
- **C3** — Pré-natal: relação entre infecção gengival e saúde do bebê — publicada de forma suavizada; revisar redação com o responsável técnico.
- **C4** — Clareamento em consultório "à base de peróxido de carbamina" (provável carbamida; em consultório costuma-se usar peróxido de hidrogênio). O site não cita o agente do clareamento em consultório.
- **C5** — Enxerto ósseo: cicatrização "em média seis a doze meses".
- **C6** — Laserterapia: "indolor", "sem sangramento e sem sutura", "livre de infecção", indicação a cardiopatas e diabéticos.
- **C7** — Facetas: "resultado perfeito", "uma consulta", "ótimo estado após 15 anos", "mais procuradas por artistas".
- **C8** — Tecnologia: "apenas 1% das clínicas no Brasil", "mais avançada tecnologia do Brasil e do mundo".
- **C9** — Revisão geral de todos os textos de tratamento pelo responsável técnico (Resolução CFO 196/2019).

### Equipamentos e estrutura
- **E1** — Confirmar se continuam em funcionamento: sala de radiografia **e tomografia**, laboratório de prótese, CAD/CAM com as três etapas na clínica, anestesia computadorizada, laser de baixa potência.
- **E2** — Plataforma elevatória × "elevador de acessibilidade" (o PDF usa os dois termos). O site usa "plataforma elevatória".
- **E3** — "Apical para tratamentos endodônticos": o site interpreta como localizador apical. Confirmar.
- **E4** — Protetores para calçados na chegada (não publicado).
- **E5** — Confirmar se as fotos de 300×240 representam o espaço atual e obter versões em maior resolução.

### Profissionais
- **P1** — Situação ativa dos três CROs e a UF (CRO-MG?).
- **P2** — Vínculo atual de Fernanda de Paula T. Bastos e se ela atende o Dentarium Kids.
- **P3** — Títulos de especialista registrados no CFO (exigência para anunciar especialidade) — em especial "Odontopediatria" para Fernanda e a frase "equipe totalmente formada por especialistas e mestres".
- **P4** — Autorização de uso dos três retratos individuais.
- **P5** — Responsável técnico da clínica e seu registro.

### Serviços
- **S1** — Alinhadores transparentes — confirmar se a clínica oferece alinhadores hoje e **qual marca/sistema** (o PDF antigo cita Invisalign; a foto da página é da ClearCorrect, usada só como ilustração) e se há credenciamento. Até a confirmação, nenhuma marca é citada na interface pública.
- **S2** — Implante zigomático e carga imediata (citados só nas perguntas) — confirmar se são oferecidos.
- **S3** — Confirmar se todos os 16 tratamentos continuam sendo oferecidos.

### Contato e dados comerciais
- O PDF não contém endereço, telefones, WhatsApp, e-mail, horário, link de mapa nem de agendamento.
- **Atualizado em 30/10/2026 por informação do responsável pelo projeto:** WhatsApp (31) 99808-3126 (`https://wa.me/5531998083126`) e horário de segunda a sexta, 08h às 18h30; sábado e domingo fechados. Ativos em header (menu mobile), rodapé, contato, bloco de contato da home, faixas de CTA, páginas de tratamento (mensagem própria de cada tratamento) e no formulário de agendamento.
- Endereço conferido em 30/10/2026 na ficha "Dentarium" do Google Maps (R. do Ouro, 857, Serra, Belo Horizonte/MG, CEP 30220-000; site e WhatsApp da clínica). O mapa incorporado e os links de rotas da home usam essa ficha (`googleMaps` em `src/data/clinic.ts`). O mapa só é carregado do Google depois do clique do visitante.
- Continuam pendentes: telefones (31) 3261-6991 e (31) 3785-3126 e e-mail. Feriados não foram informados e não são mencionados.

### SEO
- **Dados estruturados (JSON-LD)** não foram adicionados: só WhatsApp e horário estão confirmados; endereço e telefones ainda não. Adicionar `Dentist`/`MedicalClinic` depois da confirmação de endereço, telefone e horário.
- `sitemap.xml` criado (`src/app/sitemap.ts`), usando `NEXT_PUBLIC_SITE_URL` ou a URL de demonstração. O `noindex` e o `Disallow: /` continuam ativos até a versão autorizada.
