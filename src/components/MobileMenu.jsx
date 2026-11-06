import { useEffect, useState } from 'react';

const PROFILE_LINKS = [
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills & Tools' },
  { id: 'journey', label: 'My Journey' },
];

const SOCIALS = [
  { href: '#', label: 'GitHub', icon: 'fa-brands fa-github' },
  { href: '#', label: 'Facebook', icon: 'fa-brands fa-facebook' },
  { href: '#', label: 'LinkedIn', icon: 'fa-brands fa-linkedin' },
  { href: 'mailto:your-email@example.com', label: 'Email', icon: 'fa-solid fa-envelope' },
];

export default function MobileMenu({ open, onClose, active }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) setDropdownOpen(false);
  }, [open]);

  return (
    <div className={`mobile-menu${open ? ' is-open' : ''}`} id="mobileMenu">
      <nav aria-label="Mobile">
        <a href="#home" className={active === 'home' ? 'active' : ''} data-nav="home" onClick={onClose}>
          Home
        </a>
        <div className={`mobile-dropdown${dropdownOpen ? ' is-open' : ''}`}>
          <button
            type="button"
            className="mobile-dropdown-toggle"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            onClick={() => setDropdownOpen((isOpen) => !isOpen)}
          >
            Profile <i className="fa-solid fa-chevron-down mobile-dropdown-arrow" aria-hidden="true" />
          </button>
          <ul className={`mobile-dropdown-menu${dropdownOpen ? ' show' : ''}`} hidden={!dropdownOpen}>
            {PROFILE_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={active === id ? 'active' : ''}
                  data-nav={id}
                  onClick={onClose}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a href="#projects" className={active === 'projects' ? 'active' : ''} data-nav="projects" onClick={onClose}>
          Projects
        </a>
        <a href="#contact" className={active === 'contact' ? 'active' : ''} data-nav="contact" onClick={onClose}>
          Contact
        </a>
      </nav>

      <div className="mobile-menu-socials">
        {SOCIALS.map(({ href, label, icon }) => (
          <a key={label} href={href} aria-label={label}>
            <i className={icon}></i>
          </a>
        ))}
      </div>
    </div>
  );
}
