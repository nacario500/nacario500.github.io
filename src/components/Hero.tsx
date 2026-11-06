import { Fragment, useEffect, useRef, type ReactNode } from 'react';
import Reveal from './Reveal';

const CODE_LINES: ReactNode[] = [
  <>
    <span className="tk-key">const</span> <span className="tk-var">developer</span> = {'{'}
  </>,
  <>
    {'  '}<span className="tk-prop">name</span>: <span className="tk-str">&quot;Janwell Clark Nacario&quot;</span>,
  </>,
  <>
    {'  '}<span className="tk-prop">role</span>: <span className="tk-str">&quot;Web Developer&quot;</span>,
  </>,
  <>
    {'  '}<span className="tk-prop">passion</span>: <span className="tk-str">&quot;Building Digital Experiences&quot;</span>,
  </>,
  <>
    {'  '}<span className="tk-prop">status</span>: <span className="tk-str">&quot;Available for opportunities&quot;</span>
  </>,
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || prefersReducedMotion) return undefined;

    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return undefined;

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      glow.style.setProperty('--x', `${e.clientX - rect.left}px`);
      glow.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };

    hero.addEventListener('mousemove', onMouseMove);
    return () => hero.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" ref={glowRef} aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-text">
          <Reveal as="p" className="eyebrow">WELCOME TO MY PORTFOLIO</Reveal>
          <Reveal as="h1" className="hero-title">
            JANWELL CLARK<br /><span className="gradient-text">NACARIO</span>
          </Reveal>
          <Reveal as="p" className="hero-role">
            Web Developer <span className="sep">·</span> UI/UX Designer <span className="sep">·</span> Student
          </Reveal>
          <Reveal as="p" className="hero-statement">
            I build modern, responsive, and user-focused digital experiences.
          </Reveal>

          <Reveal className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <span>VIEW MY WORK</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
            <a href="#contact" className="btn btn-ghost">
              <span>CONTACT ME</span>
            </a>
          </Reveal>
        </div>

        <Reveal className="hero-visual">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="dot-red"></span><span className="dot-yellow"></span><span className="dot-green"></span>
              <span className="terminal-title">developer.js</span>
            </div>
            <div className="terminal-body">
              <pre><code>
                {CODE_LINES.map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    {'\n'}
                  </Fragment>
                ))}
                {'};'}<span className="cursor-blink">|</span>
              </code></pre>
            </div>
          </div>
        </Reveal>
      </div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll to explore">
        <span>SCROLL TO EXPLORE</span>
        <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
      </a>
    </section>
  );
}
