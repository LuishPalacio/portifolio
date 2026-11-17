import { useState } from 'react';
import { LazyMotion, MotionConfig } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import type { CategoryId } from './data/projects';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useTheme } from './hooks/useTheme';

const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default);

export default function App() {
  const { theme, toggleTheme } = useTheme();
  // Compartilhado entre o filtro da seção Projetos e o comando `projetos` do terminal.
  const [projectFilter, setProjectFilter] = useState<CategoryId>('todos');
  useScrollReveal();

  return (
    // `strict` garante que só o `m` (leve) seja usado; `reducedMotion="user"` desliga
    // movimentos de transform para quem pediu menos animação no sistema.
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero onProjectFilter={setProjectFilter} onToggleTheme={toggleTheme} />
          <About />
          <Experience />
          <Education />
          <Skills />
          <Projects filter={projectFilter} onFilterChange={setProjectFilter} />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
