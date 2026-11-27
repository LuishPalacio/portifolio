# Portfólio · Luis Henrique Palacio

Site pessoal com sobre, experiência, formação, habilidades, projetos e contato.

**No ar:** https://luishpalacio.github.io/portifolio/

## Stack

React 19, TypeScript (modo estrito), Vite 7, react-icons e Motion (animações). Fontes Geist e
Geist Mono via Fontsource, hospedadas no próprio site. Sem framework de CSS: os estilos ficam em
`src/index.css`, com tema claro e escuro (as cores e fontes são tokens no topo do arquivo).

## Interatividade

- **Hero animado:** entrada em sequência (feita em CSS, roda já na primeira pintura), aurora de
  cores em movimento, luz que segue o mouse, palavra que troca sozinha ("web", "mobile",
  "com IA") e terminal inclinado em 3D que flutua.
- **Terminal no Hero:** depois da animação de digitação, aceita comandos (`help` lista todos).
  `projetos ia` filtra os projetos e rola até eles, e `cd contato` vai até a seção. Tab
  completa, ↑/↓ navegam no histórico. Só aparece em telas acima de 768px.
- **Faixa de tecnologias** em loop logo abaixo do Hero (pausa com o mouse em cima).
- **Seções que aparecem ao rolar:** títulos saem do desfoque e os cards entram em cascata.
- **Linha do tempo** da Experiência que se preenche conforme a rolagem e **trilha de
  semestres** na Formação.
- **Cards com borda que acende** perto do mouse; os de projeto também **inclinam em 3D**.
- **Filtro de projetos** por área, com os cards se reorganizando animados.
- **Troca de tema** com um círculo que se espalha a partir do botão (View Transitions; nos
  navegadores sem suporte, a troca é imediata).
- **Contadores** no Contato que contam ao aparecer na tela, e botão de **copiar e-mail**.
- Header de vidro que encolhe ao rolar, **barra de progresso** de leitura e botão de
  **voltar ao topo** com anel de progresso.

Todos os movimentos respeitam o "reduzir movimento" do sistema operacional: o Hero aparece
pronto, a faixa de tecnologias vira uma lista parada e as decorações em loop param.

## Como rodar

Requer Node.js 22.

```bash
npm ci
npm run dev        # servidor de desenvolvimento
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build em http://localhost:4173/portifolio/
npm run lint
```

## Onde editar o conteúdo

| O quê | Arquivo |
|---|---|
| Cards de projetos (exceto FinFlow), ícone de cada card e categorias do filtro | `src/data/projects.tsx` |
| Comandos do terminal | `src/lib/terminal.tsx` |
| Linhas digitadas no terminal (`developer.ts`) | `src/components/Terminal.tsx` |
| Card do FinFlow (destaque com mockup) | `src/components/Projects.tsx` |
| Experiência (o emprego com `current` ganha o selo "atual") | `src/components/Experience.tsx` |
| Formação, certificações (e o link de cada certificado) e idiomas | `src/components/Education.tsx` |
| Semestre atual da trilha de semestres (`SEMESTER`) | `src/components/Education.tsx` (o texto do Sobre também cita o semestre) |
| PDFs de certificados hospedados no site | `public/certificados/` |
| Habilidades (chips e o fluxo "Como integro IA") | `src/components/Skills.tsx` |
| Faixa de tecnologias abaixo do Hero | `src/components/TechMarquee.tsx` (logos em `src/lib/techIcons.ts`) |
| Sobre, "Como eu trabalho" e os selos da foto | `src/components/About.tsx` |
| Textos do Hero (incluindo as palavras que trocam) | `src/components/Hero.tsx` |
| Animações de entrada compartilhadas | `src/lib/motion.ts` |
| E-mail, LinkedIn, GitHub e CV | `src/lib/links.ts` |
| Currículo em PDF | `public/cv/luis-henrique-palacio.pdf` |

O contador "Projetos no portfólio" é calculado a partir de `src/data/projects.tsx`.

## Deploy

Todo push na branch `master` roda o workflow `Deploy to GitHub Pages`
(`.github/workflows/deploy.yml`). O workflow `CI` roda typecheck, lint e build. O `base` do
Vite (`vite.config.ts`) precisa ser igual ao nome do repositório.

O histórico de mudanças está em [CHANGELOG.md](CHANGELOG.md).
