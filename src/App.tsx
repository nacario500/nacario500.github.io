import { useCallback, useEffect, useState } from 'react';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import type { Theme } from './types';

const THEME_KEY = 'jcn-portfolio-theme';

const readStoredTheme = (): Theme => {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

export default function App() {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }, [theme]);

  useEffect(() => {
    document.body.classList.add('is-loaded');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <div className="noise" aria-hidden="true" />

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main id="top">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
