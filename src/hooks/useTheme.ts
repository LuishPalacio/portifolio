import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'dark' | 'light';

/** Ponto da tela (px) de onde o novo tema se espalha. */
export interface ThemeOrigin {
  x: number;
  y: number;
}

function readInitialTheme(): Theme {
  // O script inline no index.html já aplicou data-theme antes da hidratação;
  // aqui só lemos o que ficou definido para manter o React em sincronia.
  const current = document.documentElement.getAttribute('data-theme');
  if (current === 'light' || current === 'dark') return current;

  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* localStorage indisponível */
  }

  try {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  } catch {
    /* matchMedia indisponível */
  }

  return 'dark';
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Centro do botão de tema; usado quando o tema muda pelo terminal (`tema`). */
function defaultOrigin(): ThemeOrigin {
  const rect = document.querySelector('.theme-toggle')?.getBoundingClientRect();
  if (rect && rect.width > 0) {
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

/**
 * Controla o tema (data-theme + localStorage). Onde há View Transitions (Chrome, Edge,
 * Safari 18+), o tema novo se espalha num círculo a partir do botão; nos outros
 * navegadores, e com "reduzir movimento", a troca é imediata.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback((origin?: ThemeOrigin) => {
    const root = document.documentElement;
    const next: Theme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';

    // A troca precisa acontecer de forma síncrona dentro da transição, para a
    // "foto" do estado novo já sair com o tema certo.
    const apply = () => {
      flushSync(() => setTheme(next));
      root.setAttribute('data-theme', next);
    };

    if (typeof document.startViewTransition !== 'function' || prefersReducedMotion()) {
      apply();
      return;
    }

    const { x, y } = origin ?? defaultOrigin();
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(apply);
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 650,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => {
        /* transição pulada (ex.: aba em segundo plano): o tema já foi aplicado */
      });
  }, []);

  return { theme, toggleTheme };
}
