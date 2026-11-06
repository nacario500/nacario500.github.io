import { useEffect, useRef, useState } from 'react';
import MobileMenu from './MobileMenu.jsx';

const PROFILE_LINKS = [
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills & Tools' },
  { id: 'journey', label: 'My Journey' },
];

const PROFILE_IDS = PROFILE_LINKS.map((link) => link.id);

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;

    const sections = document.querySelectorAll('main section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return undefined;

    const dropdownNode = dropdownRef.current;
    const onDocumentClick = (e) => {
      if (dropdownNode && !dropdownNode.contains(e.target)) setDropdownOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setDropdownOpen(false);
        dropdownButtonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth <= 860) setDropdownOpen(false);
    };
    const onFocusOut = () => {
      window.setTimeout(() => {
        if (dropdownNode && !dropdownNode.contains(document.activeElement)) {
          setDropdownOpen(false);
        }
      }, 0);
    };

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    dropdownNode?.addEventListener('focusout', onFocusOut);

    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      dropdownNode?.removeEventListener('focusout', onFocusOut);
    };
  }, [dropdownOpen]);

  const isProfileActive = PROFILE_IDS.includes(active);

  const toggleMobile = () => {
    if (!mobileOpen) setDropdownOpen(false);
    setMobileOpen((open) => !open);
  };

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <a href="#home" className="nav-logo">
            JANWELL<span className="dot">.</span>CLARK<span className="accent">.NACARIO</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#home" className={`nav-link${active === 'home' ? ' active' : ''}`} data-nav="home">
              Home
            </a>
            <div
              className={`dropdown${dropdownOpen ? ' is-open' : ''}${isProfileActive ? ' is-profile-active' : ''}`}
              ref={dropdownRef}
            >
              <button
                type="button"
                ref={dropdownButtonRef}
                className={`nav-link dropdown-toggle${isProfileActive ? ' active' : ''}`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-controls="dropdownMenu"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                Profile <i className="fa-solid fa-chevron-down dropdown-arrow" aria-hidden="true" />
              </button>
              <ul
                id="dropdownMenu"
                className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}
                role="menu"
                hidden={!dropdownOpen}
                aria-hidden={!dropdownOpen}
              >
                {PROFILE_LINKS.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`dropdown-link${active === id ? ' active' : ''}`}
                      data-nav={id}
                      role="menuitem"
                      tabIndex={dropdownOpen ? undefined : -1}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a href="#projects" className={`nav-link${active === 'projects' ? ' active' : ''}`} data-nav="projects">
              Projects
            </a>
            <a href="#contact" className={`nav-link${active === 'contact' ? ' active' : ''}`} data-nav="contact">
              Contact
            </a>
          </nav>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle light and dark theme">
              <i className={`fa-solid ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
            </button>
            <button
              className={`hamburger${mobileOpen ? ' is-open' : ''}`}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobileMenu"
              onClick={toggleMobile}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} active={active} />
    </>
  );
}
