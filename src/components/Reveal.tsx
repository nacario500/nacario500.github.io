import {
  createElement,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react';

type RevealProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'className' | 'children'>;

export default function Reveal<T extends ElementType = 'div'>({
  as,
  className = '',
  children,
  ...props
}: RevealProps<T>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const allReveals = Array.from(document.querySelectorAll('.reveal'));
    const index = allReveals.indexOf(el);
    const delay = prefersReducedMotion ? 0 : (Math.max(index, 0) % 4) * 70;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => entry.target.classList.add('is-visible'), delay);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as ?? 'div',
    { ...props, ref, className: `reveal ${className}`.trim() },
    children
  );
}
