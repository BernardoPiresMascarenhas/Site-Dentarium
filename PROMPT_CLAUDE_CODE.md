# PROJETO DENTARIUM — BRIEFING COMPLETO PARA CLAUDE CODE (OPUS 5.5)

> **Sua tarefa é implementar, não apenas planejar.** Desenvolva um website demonstrativo de redesign para a Clínica Dentarium, usando os arquivos locais em `public/images/dentarium/` e este briefing. Este projeto é um **conceito independente de portfólio, não é um site oficial ou trabalho contratado pela clínica**. Não publicar em nome da clínica sem aprovação e licenças de uso.

## 0. MODO DE EXECUÇÃO — LEIA ANTES DE COMEÇAR

1. Inspecione a pasta/repositório e seus arquivos. Leia também `INSTRUCOES_E_IMAGENS.md`.
2. Se existir aplicação, preserve infraestrutura útil; se estiver vazio, crie projeto Next.js com App Router, TypeScript e Tailwind CSS, usando versões estáveis e compatíveis instaladas no ambiente. Não dependa cegamente de uma versão específica desatualizada.
3. Inspecione **todas** as imagens fornecidas e suas dimensões. Crie um catálogo tipado de assets e use caminhos explícitos; não use imagens aleatórias ou genéricas como se fossem da Dentarium.
4. Consulte o site de referência quando houver acesso: https://clinicadentarium.com.br/ — use-o como **fonte de verificação factual e inventário de conteúdo, não como template visual ou código a ser copiado**. Alguns links do site antigo podem estar indisponíveis; isso não impede a implementação. Não bloqueie o desenvolvimento caso o site fique inacessível.
5. Implemente todas as páginas e as interações descritas abaixo, sem parar na fase de plano. Decida os detalhes visuais coerentemente com o briefing.
6. Faça uma primeira revisão em desktop e mobile, corrija os problemas visuais encontrados e execute lint, testes adequados e build de produção.
7. Ao terminar, relate: arquivos alterados, decisões visuais, rotas concluídas, verificações executadas, itens pendentes de aprovação e comando para iniciar o projeto.
8. Não invente resultados de testes nem afirme que navegou visualmente se não houver navegador/screenshot disponível; nesse caso, execute as verificações disponíveis e explique a limitação.

## 1. OBJETIVO DO PROJETO

Criar um **redesign premium da Clínica Dentarium**, Belo Horizonte, que seja sofisticado, leve, acolhedor e tecnicamente impecável, adequado como destaque de portfólio frontend e como possível conceito de apresentação comercial futura. Não imitar sites anteriores de advocacia escura, concessionárias automotivas ou templates prontos de odontologia.

A experiência deve transmitir: **confiança, atenção individualizada, precisão clínica, conforto, ambiente contemporâneo, tecnologia sem sensacionalismo e facilidade de contato**. Equilíbrio entre autoridade profissional e calor humano.

O site deve impressionar por direção de arte, qualidade de espaçamento, composições fotográficas, animações suaves e utilidade real, não por efeitos excessivos. O design precisa permanecer convincente com imagens reais de resolução limitada.

## 2. IDENTIDADE VISUAL / DESIGN SYSTEM

Direção: **Boutique Dental contemporânea / editorial clean**.

Paleta inicial sugerida (ajustar após comparação com a identidade real nas fotos):
- `--background: #F7F6F2` — marfim claro, fundo primário.
- `--surface: #FFFFFF` — cartões e superfícies.
- `--surface-muted: #ECEFEA` — seções suaves.
- `--accent: #3F655E` — verde-petróleo dessaturado.
- `--accent-hover: #2D4D47` — hover.
- `--text: #202A28` — grafite esverdeado.
- `--muted: #65716C` — texto secundário.
- `--warm: #C9B8A3` — areia/bege discreto.
- `--border: #DFE3DE` — divisores.

A cor do logotipo real é mais neutra; ajuste a saturação do verde para que a marca não pareça fictícia. Priorize o material institucional e preserve a identidade sem redesenhar letras de forma imprecisa.

Tipografia: título editorial sofisticado (serifada de boa legibilidade, por exemplo DM Serif Display / Cormorant Garamond, se disponível por método estável) + sans-serif contemporânea para interface e texto (por exemplo Manrope / DM Sans). Boa escala, com `clamp()`, títulos com quebras intencionais e subtítulos curtos. Evitar tudo em caixa alta; dar preferência a caixa alta apenas em microtags/eyebrows.

Grid com muito respiro, composição assimétrica sutil, bordas curvas discretas (não exagerar em pill cards), sombras quase invisíveis, textura arquitetônica muito suave opcional. Nada de gradiente azul hospitalar, ícones enormes de dentes em cada card, brilho neon, glassmorphism excessivo, emojis ou decoração infantil.

## 3. IMAGENS DO KIT — USO EXATO E PRIORIDADES

Os arquivos estão em `public/images/dentarium/`, organizados para você. **São arquivos fornecidos pelo usuário para prototipação**, sem garantia de licença para uso público e sem autorização de imagem de pacientes. O protótipo só deve ser publicado depois de obtenção das permissões relevantes.

| Arquivo | Conteúdo visível | Uso recomendado |
|---|---|---|
| `fundadores.webp` | Dois profissionais posando juntos, plantas ao fundo, assinatura Dentarium | Hero em bloco editorial com tamanho controlado; seção de fundadores; **não atribuir nomes individualmente sem confirmar** |
| `sala-espera.webp` | Sala de espera elegante, poltronas e iluminação clara | Principal da seção Ambientes / Conforto, bloco visual institucional |
| `recepcao-familia.webp` | Recepção com funcionária, mulher e criança | **Não publicar sem autorização das pessoas e responsável legal pela criança**; por padrão NÃO integrar à página pública demonstrativa; manter como asset pendente |
| `fachada.webp` | Fachada com nome da Dentarium | Contato / Encontre a clínica; página A Clínica; composição de localização |
| `logo-parede.webp` | Parede com símbolo e nome Dentarium | Referência de identidade, composição institucional de menor tamanho; **não equivale a um logo transparente** |
| `consultorio-roxo.webp` | Sala clínica com cadeira roxa | Galeria de estrutura, não hero |
| `consultorio-equipamentos.webp` | Consultório com equipamentos | Galeria de estrutura, não hero |
| `tomografia.webp` | Equipamento diagnóstico com pessoas | Uso promocional **pendente de revisão ética/autorização**; não usar inicialmente; conteúdo de tecnologia pode ser ilustrado por elementos abstratos ou texto |
| `atendimento-procedimento.webp` | Profissional realizando procedimento em paciente identificável | **NÃO PUBLICAR/EXIBIR NO SITE PROMOCIONAL**; manter apenas como arquivo de referência privada e não importar nos componentes. Imagens durante procedimentos são particularmente problemáticas sob normas de publicidade odontológica. |

**Cuidados de imagem obrigatórios**:
- Fotografias com resolução modesta (~510–680px). Não expandi-las irresponsavelmente para 1920px e não fingir alta resolução. No hero, use `fundadores.webp` em coluna com largura máxima apropriada (cerca de 420–520px em desktop), com composição de cor, tipografia e elementos vetoriais/CSS ao redor.
- Manter conteúdo real, não gerar pessoas fictícias com aparência de funcionários da clínica e não alterar a fisionomia dos profissionais.
- Usar `next/image`, `sizes`, crops conscientes (`object-position`), lazy loading para conteúdo abaixo do hero e placeholders sólidos.
- Marcas d'água/cantos da Dentarium são parte do arquivo. Não remover deliberadamente autoria/créditos.
- Se o logo original em SVG/PNG transparente não estiver disponível, crie wordmark **textual provisório claramente identificado como placeholder de interface**, coerente com a marca, e indique a necessidade do arquivo oficial. Não redesenhar o símbolo por aproximação de IA.
- Fotos da clínica não devem ser tratadas como fotos atuais certificadas sem confirmação da data e dos ambientes.

## 4. DADOS FACTUAIS E REGRAS DE CONTEÚDO

**Fonte pública de referência:** `https://clinicadentarium.com.br/`, especialmente `/sobre/` e `/sobre/estrutura/`. Informação publicada no site antigo pode estar desatualizada. Estruture tudo em `src/data/clinic.ts` (ou equivalente) com `source`, `lastVerified`, `status: "public-site-unconfirmed" | "confirmed" | "placeholder"` ou formato claro semelhante.

Dados publicados no site de referência, para exibição com revisão futura:
- Nome: **Clínica Dentarium — Odontologia Funcional e Estética**.
- Endereço divulgado: **Rua do Ouro, 857 — Serra, Belo Horizonte/MG**.
- Telefones divulgados: **(31) 3261-6991** e **(31) 3785-3126**.
- E-mail divulgado: **contato@clinicadentarium.com.br**.
- Horário no cabeçalho antigo: segunda a sexta, 8h às 18h30 — **necessita confirmação**.
- WhatsApp **inconsistente** no site antigo: no cabeçalho aparece `(31) 9808-3126` (formato aparentemente incompleto para celular) e no rodapé `(31) 99808-3126`. **Não escolha silenciosamente um dos números nem crie `wa.me` incorreto**. Centralize campo `whatsappVerified: null` e mantenha CTA 'Agendar avaliação' encaminhando para `/contato` ou para telefone/e-mail confirmado enquanto a informação estiver pendente. O eventual `wa.me` deve ser ativado apenas com número confirmado.
- Fundadores mencionados publicamente: **Denise Ligório Fialho Aiala** (CRO apresentado como `35.195`) e **Gabriel Faria Aiala** (CRO apresentado como `33.950`); confirmar situação e inscrições antes de publicar.
- Também é mencionada **Fernanda de Paula T. Bastos** (CRO apresentado como `24533`); confirmar vínculo atual e dados.
- Estrutura publicamente divulgada: estacionamento próprio, acessibilidade/plataforma elevatória, sala de espera, consultórios, laboratório de próteses e exames de imagem no local — **confirmar quais serviços/equipamentos continuam disponíveis**.
- Tecnologias mencionadas: CAD/CAM, radiografia digital, tomografia, anestesia computadorizada, laser; não transformar isso em promessas ou alegações de superioridade.
- Tratamentos listados no site antigo: primeira consulta, odontopediatria/Dentarium Kids, clareamento, facetas/lentes de porcelana, ortodontia, implantes, periodontia, endodontia (canal), próteses, placas de bruxismo, protetores esportivos, extrações de terceiros molares, enxertos e manutenção preventiva. Catálogo sujeito a revisão pelo responsável técnico.

**Não copiar afirmações absolutas do site antigo**, como "equipamentos que apenas 1% das clínicas possui", "satisfação garantida", "resultado garantido", "sem dor", "tratamento mais rápido" ou "preços especiais". Evitar dados científicos não verificados e textos médicos que aconselham diagnóstico individual.

Texto: português do Brasil, natural, humano, sóbrio; sem chavões repetitivos como "transformar sorrisos" em todas as seções. Preferir frases reais, como "Cuidado especializado, em um espaço pensado para você", "Precisão técnica e atenção em cada etapa" e "Conheça a estrutura da Dentarium". Revisar com atenção gramática, acentos e plural.

## 5. ARQUITETURA DE NAVEGAÇÃO / ROTAS — IMPLEMENTAR TODAS

Sugestão de rotas com App Router (pode ajustar slugs desde que tudo funcione):
- `/` — home de alto nível, completa.
- `/a-clinica` — história, fundadores, estrutura e galeria do espaço.
- `/tratamentos` — visão geral, categorias navegáveis e busca/filtros leves opcionais.
- `/tratamentos/[slug]` — página detalhada para tratamentos principais, dados tipados (mínimo seis rotas funcionais: implantes, ortodontia, clareamento, proteses, tratamento-de-canal, odontopediatria; ampliar quando houver conteúdo verificado).
- `/tecnologia` — diferenciais e infraestrutura apresentados com responsabilidade e sem imagens clínicas problemáticas.
- `/equipe` — profissionais informados no site antigo, com CRO e status "a confirmar" fora da apresentação pública final.
- `/contato` — endereço, mapa externo, e-mail e telefones, CTA honesto.
- `/privacidade` — versão **demonstrativa** de aviso de privacidade, claramente rotulada para posterior revisão jurídica e do controlador de dados; sem políticas fictícias como se fossem oficiais.
- `not-found.tsx` e estados de erro apropriados, com retorno para home e tratamentos.

Navbar: logotipo/texto, Início, A Clínica, Tratamentos, Tecnologia, Equipe, Contato e CTA "Agendar avaliação". Menu mobile real e acessível. Cabeçalho sticky discreto que se torna sólido depois de scroll. Tratamentos podem ter mega menu simples e acessível, mas **evite os submenus intermináveis do site antigo**. Navegação por teclado e foco visível.

## 6. HOME — DIREÇÃO DE ARTE E COMPONENTES

### 6.1 Hero premium
- Começa imediatamente abaixo de navbar discreta e com largura respirada.
- À esquerda: microtag "ODONTOLOGIA FUNCIONAL E ESTÉTICA", título editorial em 2–3 linhas (ex.: **"Cuidado especializado, em cada detalhe."**), subtítulo moderado explicando atendimento integrado e ambiente confortável, CTA principal "Agendar avaliação" e secundário "Conheça a Dentarium".
- À direita: `fundadores.webp` como retrato editorial vertical em moldura refinada com cantos suaves e leve elemento de borda/shape; evitar ampliar foto pequena demais. Sem atribuição de quem é quem na imagem até confirmação.
- Detalhes sutis: número de seção, linha verde, selo "Belo Horizonte • Serra" e uma pequena sobreposição com texto "Odontologia funcional e estética"; **não inventar números de pacientes, anos de experiência, avaliações ou títulos**.
- O hero deve caber visualmente em 768px de altura em desktop padrão, sem cortar botões. Hierarquia e CTA visíveis acima da dobra quando possível.
- No mobile: imagem em seguida ou parcialmente ao lado conforme largura, headline com `clamp`, sem overflow horizontal ou CLS.
- Animação: stagger curto de título, microtag, CTAs e imagem; nada de letras voando ou scroll hijacking.

### 6.2 Pequena faixa de atributos
Três a quatro itens sóbrios baseados em dados da clínica: "Atendimento multidisciplinar", "Ambiente planejado para seu conforto", "Diagnóstico e planejamento", "Localização na região Centro-Sul"; evitar afirmações absolutas.

### 6.3 Sobre a Dentarium
Composição editorial com `sala-espera.webp` ou foto da equipe, texto apresentando a abordagem, endereço e link para `/a-clinica`. Destaque a conexão entre cuidado e ambiente sem apelo publicitário excessivo.

### 6.4 Tratamentos
Grid adaptável com 6 cartões principais, cada um com nome, explicação simples e link efetivo para rota individual. Ícones lineares discretos e/ou composição tipográfica, sem necessidade de fotos stock de dentes. Nos cartões: Implantes, Ortodontia, Clareamento, Próteses, Endodontia e Odontopediatria. Links de "Ver todos" para `/tratamentos`.

### 6.5 Tecnologia, sem exagero
Seção com fundo verde profundo/gráfite esverdeado e tipografia marfim. Layout editorial com ilustração abstrata construída em CSS/SVG simples, ícones elegantes, explicações de CAD/CAM, radiografia/tomografia e planejamento multidisciplinar — com aviso de checagem antes de publicar. Não usar `atendimento-procedimento.webp` nem `tomografia.webp` como marketing.

### 6.6 Ambientes — destaque fotográfico
Galeria assimétrica `sala-espera.webp`, `consultorio-roxo.webp`, `consultorio-equipamentos.webp`, `fachada.webp`, lightbox funcional e thumbnails. Respeitar proporção/orientação, não usar mosaico que corte a arquitetura. Comportamento suave e teclas Esc/←/→ na galeria (se implementado).

### 6.7 Equipe/fundadores
Uma seção contida com foto `fundadores.webp`, nomes e registros apresentados no site antigo, mas com texto qualificado por confirmação e SEM tentar identificar esquerda/direita sem evidência. Link à `/equipe`. Não criar formação fictícia, especializações específicas ou foto individual falsa.

### 6.8 Jornada do atendimento
Linha do tempo interativa bem feita: 1. Entre em contato; 2. Avaliação clínica; 3. Planejamento individual; 4. Acompanhamento. Não sugerir diagnóstico automatizado nem garantir procedimento ou resultado. Responsividade com degraus empilhados.

### 6.9 Perguntas frequentes
Accordion funcional com 5–7 perguntas informativas: como agendar, onde fica, especialidades, acessibilidade, o que levar à primeira consulta, informações sobre avaliação (sem mencionar preço/prazo inexistentes). Não fazer aconselhamento clínico individual.

### 6.10 Contato e encerramento
Seção com endereço, foto `fachada.webp`, CTA para `/contato`, telefones/e-mail verificados como publicados e um mapa aberto por link "Ver rotas". Rodapé completo com navegação, políticas demonstrativas e crédito de conceito de portfólio. Nenhum link fake.

## 7. PÁGINAS INTERNAS — CONTEÚDO REAL E ÚTIL

`/a-clinica`: introdução, história dos fundadores, foto, diferenciais do espaço, galeria e bloco de localização. Não afirmar datas de fundação ou número de colaboradores não confirmados.

`/tratamentos`: hero próprio (não copiar composição integral da home), categorias navegáveis, lista real de tratamentos fornecida no site antigo, links individuais. Filtros se incluídos devem funcionar; caso não haja necessidade, usar navegação por categoria simples. Não deixar cartões sem destino.

`/tratamentos/[slug]`: templates com título, resumo objetivo, "quando conversar com o dentista sobre esta opção" em linguagem genérica, explicação geral do procedimento sem prescrever, pequena FAQ e CTA para contato. Aviso: "A indicação depende de avaliação individual com cirurgião-dentista". Não prometer resultados, prazos ou benefícios universais.

`/tecnologia`: apresentar grupos de tecnologias divulgadas no site e conferir consistência. Se não houver foto autorizada adequada, use infográficos abstratos CSS/SVG e texto. Não usar imagens de procedimento em andamento.

`/equipe`: os 3 nomes publicados, respectivos registros divulgados e cards sóbrios. Não afirmar vínculo atual sem revisão; criar arquivo `PENDENCIAS_PUBLICACAO.md` com conferências necessárias. Se usar retrato coletivo, não individualizar sem identificação explícita.

`/contato`: endereço, e-mail, telefones, mapa externo e CTA para agendar por contato. Um formulário demonstrativo é opcional, mas **NÃO coletar informações de saúde, CPF, documentos ou relato clínico**. Se não houver backend real, não simular "solicitação enviada". Preferir CTA que abre e-mail (`mailto:`) com assunto, ou telefone. Não criar WhatsApp até a confirmação do número.

## 8. ANIMAÇÃO / INTERAÇÕES — VISUAL PREMIUM, NÃO EXCESSIVO

- Motion for React (quando fizer sentido) + CSS transitions otimizadas.
- Reveals progressivos na entrada de seções, duração curta 0.45–0.7s, deslocamentos discretos.
- Fotografia do hero com leve fade e escala sutil; nada que esconda conteúdo por segundos.
- Hover dos tratamentos com deslocamento sutil e detalhe gráfico verde.
- Animação ilustrativa da jornada acompanhando o scroll, sem scroll-jacking.
- Menu mobile com overlay/painel acessível, foco correto e fechamento via ESC.
- Accordion sem jump brusco.
- Galeria/lightbox com navegação e botão fechar.
- Ao navegar para nova página, topo da página, respeitando histórico/voltar quando adequado.
- Respeitar `prefers-reduced-motion` em TODAS as animações; contraste WCAG AA e área de toque suficiente.
- Não usar animações contínuas que distraiam durante leitura; não forçar autoplay de vídeo.

## 9. IMPLEMENTAÇÃO TÉCNICA

- Next.js App Router, TypeScript, Tailwind, Motion, Lucide; componentes semânticos e separação em `components`, `data`, `lib`, `app`.
- `next/image` com sizes e crop corretos. Fontes otimizadas; sistema de tokens CSS; evitar CSS inline repetitivo e componentes monolíticos gigantes.
- Rotas dinâmicas seguras: `generateStaticParams` quando aplicável; tratamento de slug desconhecido via notFound.
- Conteúdo e pessoas definidos em arquivos de dados tipados, sem valores hardcoded espalhados.
- Metadata por página, idioma `pt-BR`, título/descrição coerentes, OpenGraph local se houver asset com direito de uso, URLs canônicas somente após definir domínio do protótipo.
- Robots `noindex, nofollow` **por padrão no ambiente demonstrativo** para não confundir buscadores e evitar aparentar ser o site oficial. Ao publicar uma versão autorizada, revisar esse comportamento.
- Links reais, botões clicáveis, erros e loading adequados. Telefone `tel:` e e-mail `mailto:` funcionais.
- Sem API keys, sem integrações pagas inventadas, sem banco de dados desnecessário.
- Não capturar dados clínicos nem transferir dados pessoais a terceiros.
- Incluir `README.md` de instalação e `PENDENCIAS_PUBLICACAO.md`.

## 10. RESPONSIVIDADE E ACABAMENTO

Teste, no mínimo, larguras 360, 390, 430, 768, 1024, 1366, 1440 e 1920px quando houver ferramenta disponível. Em 768px de altura no desktop, hero deve mostrar pelo menos CTA principal sem ser cortado. Revisar cuidadosamente:

- Navbar logo e menu mobile.
- Overflow horizontal, quebra de títulos e linhas órfãs.
- Fotos da equipe sem recorte indevido de rostos.
- Seções com contrastes suficientes.
- Cards de tratamentos e todos os links.
- Galeria/lightbox com teclado, toque e mobile.
- Formulários (se existirem) sem falso sucesso.
- Footer completo e sem coluna colapsada.
- Animações sem flicker, layout shift e scroll preso.

## 11. ASPECTOS ÉTICOS E AUTORIZAÇÕES — OBRIGATÓRIO

Este é um **site institucional de clínica odontológica, pessoa jurídica**. Evite imagens de procedimentos em andamento, imagens de diagnóstico/resultado e comparativos antes/depois usados como publicidade da clínica. O CFO destaca na Resolução 196/2019 restrições relevantes para divulgação por clínicas, exigências de consentimento e proibição de imagens do transcurso dos tratamentos. Não inclua a foto `atendimento-procedimento.webp` no site; fotos com crianças ou pacientes identificáveis só com autorização explícita adequada, nunca presumida.

**Fontes oficiais a consultar antes de um site público:**
- https://website.cfo.org.br/redes-sociais-na-odontologia-fique-atento-as-normas-eticas-e-acerte-na-publicacao-dos-conteudos/
- https://website.cfo.org.br/resolucao-cfo-196-2019/
- Código de Ética Odontológica e orientações do CRO-MG.

Outras regras:
- Não inventar depoimentos, notas do Google, fotos de pacientes, certificados, prêmios, especializações ou número de procedimentos.
- Não fazer ofertas comerciais agressivas, "consultas grátis", cupons, sorteios, garantia ou promessa de resultado.
- Confirmar o responsável técnico da pessoa jurídica, registros profissionais e dados obrigatórios antes da publicação.
- Imagens, logotipo, textos e marca pertencem aos titulares; **não publicar em domínio público como site oficial sem consentimento da clínica e direitos de imagem pertinentes**.
- Deixar no footer da demonstração discreto aviso "Estudo conceitual de redesign — projeto independente, não é o site oficial da Clínica Dentarium".

## 12. CRITÉRIOS DE ACEITE / CHECKLIST FINAL

- [ ] Hero com composição autoral, legível, sem botão cortado e usando foto real adequadamente.
- [ ] Paleta boutique premium consistente, diferente de JAT/Daniel.
- [ ] Home completa com tratamentos, estrutura, equipe, jornada, FAQ, contato.
- [ ] Todas as páginas internas e rotas individuais implementadas.
- [ ] Todas as opções do header navegam corretamente; NENHUMA tela preta, rota quebrada ou submenu morto.
- [ ] Fotos reais do kit usadas de acordo com permissões e orientação acima.
- [ ] Não usar foto de procedimento nem imagem identificável de criança em marketing.
- [ ] Sem afirmações profissionais inventadas nem WhatsApp incerto ativado.
- [ ] Testes de botões, menus, accordion, galerias, navegação e responsive.
- [ ] ESLint e build concluídos com resultado informado honestamente.
- [ ] README e checklist pendências para publicação.

**Execute a implementação inteira no repositório agora.** Não pare em wireframes, mockups ou sugestão de plano. Priorize resultado visual forte, funcionamento de verdade e revisão de acabamento. Se alguma informação ou asset for inseguro/desconhecido, use uma alternativa visual profissional e registre a pendência — sem travar o projeto.
