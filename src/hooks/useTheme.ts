import { useCallback, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

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

/** Controla o tema (data-theme + localStorage). */
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

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
}
