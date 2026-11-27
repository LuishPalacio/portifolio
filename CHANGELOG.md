# Changelog

Registro das mudanças do portfólio. Datas no formato AAAA-MM-DD.

## 2026-11-27: Interface nova e mais animada

**Motivo:** o site estava estático. Cada seção só aparecia com o mesmo fade, cada fundo tinha
um padrão diferente, as fontes eram as do sistema e o Hero não tinha movimento além da
digitação.

**Visual**

- **Sistema visual novo** em `index.css`, com tokens no topo (cores, raios, sombras, curvas,
  fontes) para os dois temas. A paleta é azul, violeta e ciano, com gradiente nos destaques.
  Os cards são de vidro e o fundo é unificado: granulado sutil e um brilho suave por seção.
- **Fontes Geist e Geist Mono** (`@fontsource-variable/geist` e `geist-mono`), hospedadas no
  próprio site. O navegador só baixa o subconjunto latino (29 KB + 23 KB em woff2).
- **Header:** logo "LP", menu em pílula de vidro com um destaque que desliza até a seção
  atual (`layoutId`) e fundo que aparece e encolhe ao rolar. No celular e no tablet
  (≤960px), o menu abre animado e fecha com Esc.
- **Títulos de seção** com rótulo numerado ("01 — sobre"), linha que se desenha e uma palavra
  em gradiente (`SectionHeading.tsx`).

**Animações**

- **Hero:** entrada em sequência feita em CSS (`.intro`), para aparecer animado já na primeira
  pintura sem esperar o chunk do Motion. Tem aurora de cores, grade com máscara, luz que segue o
  mouse, selo "Disponível para novas oportunidades" pulsando, palavra que troca sozinha
  (`RotatingWord.tsx`), botões "magnéticos" (`useMagnetic`), terminal inclinado em 3D que
  flutua (endireita no hover e no foco) e indicador de rolagem.
- **Faixa de tecnologias** em loop abaixo do Hero (`TechMarquee.tsx`). Os logos do Simple
  Icons pesam cerca de 24 KB, então a faixa é carregada com `lazy` num chunk próprio, e o
  espaço fica reservado com `min-height` para a página não pular.
- **Entradas ao rolar** com o Motion. As variantes compartilhadas ficam em `lib/motion.ts`
  (subir, sair do desfoque, cascata, mola). O `useScrollReveal` e a classe `.fade-in` foram
  removidos.
- **Experiência:** virou linha do tempo, com uma linha que se preenche conforme a rolagem
  (`useScroll`) e o selo "atual" no emprego corrente.
- **Formação:** trilha de 8 semestres (5 concluídos, o atual pulsando, 2 pela frente) no
  lugar do texto do semestre. "Idiomas" passou para o card da graduação, para equilibrar a
  altura com o card de certificações.
- **Habilidades:** grade em mosaico, com as tecnologias em chips. O card de IA tem o fluxo
  "o modelo interpreta → o código valida → o usuário confirma", com um ponto percorrendo os
  passos.
- **Projetos:** cada card ganhou um ícone (campo `icon` em `data/projects.tsx`). O card do
  FinFlow ganhou celular com moldura que flutua e destaques com ícone de check.
- **Borda que acende perto do mouse** nos cards (`.glow` + `usePointerGlow`: um único listener
  para a página, limitado a uma atualização por quadro). O `useTilt` passou a cuidar só da
  inclinação.
- **Contato:** painel em destaque, botão "Copiar e-mail" com confirmação (anunciada para
  leitores de tela) e cards de contato com seta animada.
- **Troca de tema** com View Transitions: o tema novo se espalha num círculo a partir do
  botão (também pelo comando `tema`). Sem suporte, ou com "reduzir movimento", a troca é
  imediata.
- **Barra de progresso** de leitura no topo e botão **voltar ao topo** com anel de progresso.

**Textos novos (visuais):** o selo "Disponível para novas oportunidades", que vem do
`status: "open to work"` do terminal. A frase do Hero virou "Da interface ao banco, construo
produtos web. / mobile. / com IA.", e leitores de tela continuam recebendo a frase original.
Também entraram a frase de abertura do Contato, o rótulo "tecnologias do meu dia a dia" e os
selos da foto ("Ciência da Computação" e "T.I · ODEEN"). Os títulos das seções e todo o resto
do conteúdo continuam iguais.

**Correções**

- O cursor do terminal não piscava: o keyframe animava `border-color` num elemento sem borda.
- No bloco de movimento reduzido, `transition-delay: 0` era inválido (falta a unidade) e o
  navegador ignorava a regra. Agora é `0s`.

**Correção durante o teste**

- **Problema:** no celular aparecia rolagem horizontal, e o header e o botão do LinkedIn
  ficavam cortados na borda direita.
- **Causa:** os cards da linha do tempo começavam deslocados 48px para a direita até a
  animação de entrada rodar.
- **Correção:** os cards entram pela esquerda (deslocamento negativo não cria área de
  rolagem), e as seções têm `overflow-x: clip` como proteção.

**Tamanho:** o JS inicial foi de 99,1 KB para 112,7 KB (gzip), quase tudo dos ícones novos.
A faixa de tecnologias tem um chunk próprio de 10,5 KB, carregado depois, e o chunk do Motion
continua com 33,6 KB. O CSS foi de 5,4 KB para 10,1 KB (gzip).

**Validação:** typecheck, lint e build sem erros. Prints no Edge headless em 1440, 900 e
390px, nos dois temas. Sem rolagem horizontal em 360, 390 e 900px. 19 testes de interação
passaram no build de produção e no servidor de desenvolvimento, sem erro nem aviso no console:
terminal (`help`, `projetos ia`, `tema`), filtro, brilho e inclinação dos cards, copiar e-mail,
troca de tema, menu e scrollspy, voltar ao topo, menu do celular (abre, Esc fecha, link fecha
e rola) e "reduzir movimento" (Hero visível de imediato, faixa parada, palavra fixa e todo o
conteúdo visível ao rolar). CLS de 0,055 no desktop e 0,018 no celular com rede lenta simulada.

## 2026-11-17: Nova captura do FinFlow com valores fictícios

**Motivo:** a interface do app mudou, e a captura nova tinha os valores financeiros reais do
Luis. Eles foram trocados por valores fictícios antes de entrar no site.

**Como foi editado**

- Nenhuma fonte foi usada para redesenhar o texto. Cada dígito novo foi copiado da própria
  captura, de um dígito do mesmo estilo (Roboto com algarismos de largura fixa, então trocar um
  dígito não desloca os outros). As bordas foram ajustadas por cor: o Android suaviza texto
  branco, verde e vermelho de jeitos diferentes, e por isso há uma curva gama por par de cores
  e uma normalização do miolo dos traços.
- As barras foram redesenhadas para bater com os números novos, copiando colunas do próprio
  trilho e a ponta arredondada original.
- Os valores fictícios são coerentes entre si:
  - Saldo geral R$ 725,50 e saldo previsto R$ 925,50.
  - Entradas R$ 4.850,00 − saídas R$ 4.305,10 = balanço R$ 544,90.
  - Lazer 29% (R$ 1.236,40), Educação 13% (R$ 564,30) e Outros 11% (R$ 463,50), percentuais
    sobre as saídas.
- Todo o processo rodou localmente, num canvas do Edge headless, sem enviar a imagem para
  serviço externo.

**Mudanças no site**

- `public/img/finflow-screenshot.jpeg` (66 KB) e `.webp` (32 KB) agora têm 540×1170, metade da
  captura de 1080×2340.
- `Projects.tsx`: `width`/`height` 540×1170 e texto alternativo avisando que os valores são
  fictícios.
- `index.css`: proporção do `.phone-mockup` atualizada para `540 / 1170`.

**Validação:** comparação lado a lado, ampliada, de cada área editada (original × editado).
Typecheck, lint e build sem erros. Foto do card no Edge headless: celular com 261×566 px e
card com a mesma altura de antes (628 px).

## 2026-11-17: Celular do FinFlow proporcional

- **Problema:** o mockup tinha tamanho fixo de 190×370 px. Parecia pequeno ao lado do texto do
  card (cerca de 566 px de altura). Além disso, a proporção era diferente da captura (440×982),
  e o `object-fit: cover` cortava a parte de baixo do app.
- **Correção:** a `.finflow-phone-col` usa `container-type: size` e estica até a altura da
  linha do grid, que é definida pelo texto. O `.phone-mockup` ocupa essa altura com
  `aspect-ratio: 440 / 982`, limitado pela largura da coluna:
  `width: min(100cqw, 100cqh * 440 / 982)`. Sem suporte a container queries, o fallback é
  240px. O raio da borda passou de 32 para 36px.
- **Validação:** foto e medição com o Edge headless. Em 1536px, o celular fica com 253×566 px,
  igual à altura do texto, e o card mantém os 628 px de altura. Em 820px, o celular é limitado
  pela largura (229×512 px) e fica centralizado. Nos dois casos o app aparece inteiro, incluindo
  a barra de navegação. No mobile (≤768px) o celular continua oculto.

## 2026-11-17: Links dos certificados da FIAP

**Motivo:** as três certificações da FIAP ainda não abriam nada (ver a entrada
"Certificações clicáveis" abaixo).

**Mudanças**

- O formato do link veio do Luis:
  `on.fiap.com.br/local/nanocourses/gerar_certificado.php?chave=<chave>&action=view`. A partir
  dele, `Education.tsx` monta os links com o helper `fiapCertificate(chave)` e as chaves de
  credencial do LinkedIn.
- "Big Data" passou a se chamar "Big Data & Analytics", que é o nome no certificado.
- Agora as 5 certificações são clicáveis.

**Validação:** os 3 links respondem 200 com `application/pdf`, sem login e sem
redirecionamento. Cada PDF é uma imagem, e foi aberta e conferida: Engenharia de Software (100h,
17/08/2026), Android (80h, 15/08/2026) e Big Data & Analytics (60h, 20/08/2026). Todas estão em
nome de Luis Henrique Palacio, com a chave impressa igual à do link.

## 2026-11-17: Certificações clicáveis

**Motivo:** ao clicar numa certificação, abrir o certificado do curso.

**Mudanças**

- `Education.tsx`: cada certificação virou um objeto (`name`, `issuer`, `hours`, `url`). Com
  `url`, a pílula vira link (nova aba, ícone de link externo, hover e foco visível). Sem `url`,
  continua como texto. A `url` aceita link do emissor (`https://…`) ou arquivo em `public/`.
- **Minicurso React Native (Rocketseat):** link oficial
  `app.rocketseat.com.br/certificates/<código da credencial>`. Conferido: a página responde
  200 e descreve o "Minicurso React Native".
- **Networking Basics (Cisco):** PDF do certificado publicado em
  `public/certificados/networking-basics-cisco.pdf`. O nome original do arquivo trazia o e-mail
  da faculdade e foi trocado. O conteúdo foi conferido antes: nome, curso, Cisco Networking
  Academy e data de conclusão, sem e-mail.
- **FIAP (Engenharia de Software, Android, Big Data):** ainda sem link. Os links de "Exibir
  credencial" do LinkedIn não foram capturados e o formato do link da FIAP não foi encontrado,
  então nada foi inventado. Basta preencher `url` em `Education.tsx`.
- CSS: estilo `.cert-link` (mesma pílula, com hover, brilho e foco).

**Observação:** o PDF da Cisco informa conclusão em 12/09/2025, mas o LinkedIn mostra a
emissão em ago/2024.

**Validação:** typecheck, lint e build sem erros. Renderização no servidor confirma 2 links
(Rocketseat e `/portifolio/certificados/networking-basics-cisco.pdf`) e 3 certificações FIAP
sem link. O PDF responde 200 (`application/pdf`) no `vite preview`.

## 2026-11-17: Interface interativa (terminal, filtro, cards 3D e contadores)

**Motivo:** deixar o site mais interativo, com efeitos que mostrem o trabalho em vez de só
decorar.

**Mudanças**

- **Motion** (`motion@14.14.0`, antigo Framer Motion) adicionado. O `App` usa `LazyMotion`
  com `strict` (só o componente leve `m`) e carrega os recursos (`domMax`) num chunk
  separado (`src/lib/motionFeatures.ts`). `MotionConfig reducedMotion="user"` desliga os
  movimentos para quem pediu menos animação no sistema.
- **Terminal interativo** (`components/Terminal.tsx` + comandos em `lib/terminal.tsx`): depois
  da digitação do `developer.ts`, aparece um prompt. Comandos: `help`, `sobre`, `stack`,
  `experiencia`, `projetos [área]`, `contato`, `cv`, `github`, `linkedin`, `ls`, `cd <seção>`,
  `tema`, `clear`, mais apelidos (`whoami`, `limpar`…) e um easter egg (`sudo contratar`).
  Tem histórico com ↑/↓, autocompletar com Tab e Esc para limpar a linha. Só aparece em telas
  acima de 768px, como antes.
- **Filtro de projetos:** botões Todos, IA, Web, Mobile, Back-end e Acadêmico, com contagem e
  um destaque que desliza entre eles. Os cards saem, entram e se reorganizam animados
  (`AnimatePresence` + `layout`). O filtro fica no `App`, então `projetos ia` no terminal
  filtra e rola até a seção. As categorias de cada projeto ficam em `src/data/projects.tsx`.
- **Cards 3D:** os cards de projeto inclinam seguindo o mouse (`hooks/useTilt.ts`, mola do
  Motion) e têm um brilho que acompanha o cursor (`.card-spotlight`). O card do FinFlow tem só
  o brilho. Toque e caneta não inclinam.
- **Contadores:** os números do Contato contam de 0 até o valor ao aparecer na tela
  (`components/AnimatedNumber.tsx`). Leitores de tela recebem só o valor final.
- **CSS:** novos estilos do terminal, filtro, brilho e `.sr-only`. O `.project-card` perdeu a
  `transition`/`:hover` de transform, que agora vêm do Motion. A transition de CSS brigaria com
  a mola a cada quadro.

**Correção durante o teste**

- **Problema:** digitar algo sem completar possível (ex.: `who`) e apertar Tab tirava o foco do
  terminal, e o que se digitava depois ia para a página.
- **Causa:** o Tab só era interceptado quando havia um completar único.
- **Correção:** com texto no prompt, o Tab sempre fica no terminal. Ele completa quando há uma
  opção só e lista as opções quando há várias. Com o prompt vazio ou com Shift+Tab, a navegação
  normal continua, para não criar armadilha de teclado. Os apelidos entram no autocompletar
  depois dos comandos principais (`proj` → `projetos`, `who` → `whoami`).

**Tamanho:** JS inicial de cerca de 75 KB para 99 KB (gzip), mais 34 KB de recursos do Motion
carregados depois da primeira pintura.

**Validação:** typecheck, lint e build sem erros. 22 testes de lógica dos comandos e do
autocompletar rodados em Node. Renderização no servidor dos 6 filtros (10, 3, 6, 1, 8 e 3
cards), do terminal e dos contadores. No navegador: terminal com `help` e o autocompletar de
`sobre`. A extensão do Chrome caiu antes dos testes visuais do filtro, da inclinação e dos
contadores.

## 2026-11-17: Conteúdo sincronizado com LinkedIn e GitHub

**Motivo:** o site estava desatualizado em relação ao perfil do LinkedIn e aos repositórios
publicados desde agosto (agentes de IA, StockFlow em produção, Task Manager em Java).

**Mudanças**

- **Hero:** novo posicionamento ("Desenvolvedor Full Stack", integração segura de IA generativa:
  o modelo interpreta, o código valida e o usuário confirma). Terminal com Next.js, Python,
  Java + Spring Boot e a linha `ai`.
- **Sobre:** texto reescrito a partir do "Sobre" do LinkedIn, incluindo o sistema colocado em
  produção na ODEEN e o novo bloco "Como eu trabalho" (estilos `.sobre-subtitle` e
  `.sobre-principles` em `index.css`). Tags com Java / Spring Boot, IA Generativa e Docker.
- **Experiência:** ODEEN ganhou o item sobre o sistema interno de ativos de T.I (Flask, MySQL,
  SSO Microsoft, pytest, CI, Docker, Railway). Cargo na DiscoverON corrigido para "Professor de
  Informática e Robótica", com o treinamento dos novos professores.
- **Certificações:** emissor e carga horária em todas (FIAP, Rocketseat, Cisco).
- **Habilidades:** cards atualizados com Java/Spring Boot, Tailwind, tool calling, RAG, DuckDB,
  scikit-learn, AWS (S3, EC2), Railway, Vercel e Microsoft Entra ID.
- **Projetos:**
  - FinFlow: descrição com o painel web em Next.js, o agente Finn (48 intenções), RPCs
    idempotentes, CSV/OFX e fila offline, além do botão "Acessar Painel Web".
  - Novos cards: Agente de IA para Análise de Vendas (Sabor da Casa), Empório da Música (agente
    de atendimento), Task Manager (selo "em desenvolvimento", repositório privado), FoodNode
    Analytics e Ferreira & Moreira (com link para o site no ar).
  - StockFlow reescrito como sistema em produção na ODEEN.
  - Os dados dos cards saíram de `components/Projects.tsx` para `src/data/projects.tsx`, com os
    campos novos `status`, `live` e `liveLabel`.
- **Contato:** "Projetos no portfólio" deixou de ser o fixo "6+" e passou a ser calculado
  (`PROJECT_COUNT`).
- **Metadados:** `description`, `og:description` e `twitter:description` atualizados no
  `index.html`.

**Correção: URLs apontando para `/portfolio/`**

- **Problema:** canonical, `og:url`, `og:image`, `twitter:image`, `sitemap.xml`, `robots.txt` e
  `SITE_URL` usavam `luishpalacio.github.io/portfolio/`, que retorna 404.
- **Causa:** os commits de 2026-11-17 trocaram o caminho para `/portfolio/`, mas o repositório
  continua `portifolio`. Por isso o GitHub Pages (e o `base` do Vite) servem em `/portifolio/`.
- **Correção:** todas as URLs voltaram para `https://luishpalacio.github.io/portifolio/`.
- **Validação:** `og:image` e o CV respondem 200 na URL publicada.

**Validação:** `npm run typecheck`, `npm run lint` e `npm run build` sem erros; revisão visual
no `vite preview` (Hero, Sobre, Experiência, Formação, Habilidades, Projetos e Contato).
