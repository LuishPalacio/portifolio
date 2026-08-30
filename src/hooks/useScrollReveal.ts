import { useEffect } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Observa todos os elementos `.fade-in` e adiciona `.visible` quando entram na
 * viewport. Com `prefers-reduced-motion`, revela tudo de imediato.
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.fade-in');

    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
