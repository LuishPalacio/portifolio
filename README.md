# Portfólio · Luis Henrique Palacio

Site pessoal com sobre, experiência, formação, habilidades, projetos e contato.

**No ar:** https://luishpalacio.github.io/portifolio/

## Stack

React 19, TypeScript (modo estrito), Vite 7, react-icons e Motion (animações). Sem framework
de CSS: os estilos ficam em `src/index.css`, com tema claro e escuro.

## Interatividade

- **Terminal no Hero:** depois da animação de digitação, aceita comandos (`help` lista todos).
  `projetos ia` filtra os projetos e rola até eles, e `cd contato` vai até a seção. Tab
  completa, ↑/↓ navegam no histórico. Só aparece em telas acima de 768px.
- **Filtro de projetos** por área, com os cards se reorganizando animados.
- **Cards 3D** que inclinam e brilham seguindo o mouse.
- **Contadores** no Contato que contam ao aparecer na tela.

Todos os movimentos respeitam o "reduzir movimento" do sistema operacional.

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
| Cards de projetos (exceto FinFlow) e categorias do filtro | `src/data/projects.tsx` |
| Comandos do terminal | `src/lib/terminal.tsx` |
| Linhas digitadas no terminal (`developer.ts`) | `src/components/Terminal.tsx` |
| Card do FinFlow (destaque com mockup) | `src/components/Projects.tsx` |
| Experiência | `src/components/Experience.tsx` |
| Formação, certificações (e o link de cada certificado) e idiomas | `src/components/Education.tsx` |
| PDFs de certificados hospedados no site | `public/certificados/` |
| Habilidades | `src/components/Skills.tsx` |
| Sobre e "Como eu trabalho" | `src/components/About.tsx` |
| Textos do Hero | `src/components/Hero.tsx` |
| E-mail, LinkedIn, GitHub e CV | `src/lib/links.ts` |
| Currículo em PDF | `public/cv/luis-henrique-palacio.pdf` |

O contador "Projetos no portfólio" é calculado a partir de `src/data/projects.tsx`.

## Deploy

Todo push na branch `master` roda o workflow `Deploy to GitHub Pages`
(`.github/workflows/deploy.yml`). O workflow `CI` roda typecheck, lint e build. O `base` do
Vite (`vite.config.ts`) precisa ser igual ao nome do repositório.

O histórico de mudanças está em [CHANGELOG.md](CHANGELOG.md).
