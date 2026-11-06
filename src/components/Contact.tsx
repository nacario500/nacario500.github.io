import { useEffect, useRef, useState, type FormEvent } from 'react';
import Reveal from './Reveal';

type Social = {
  href: string;
  label: string;
  icon: string;
};

const SOCIALS: Social[] = [
  { href: '#', label: 'GitHub', icon: 'fa-brands fa-github' },
  { href: '#', label: 'Facebook', icon: 'fa-brands fa-facebook' },
  { href: '#', label: 'LinkedIn', icon: 'fa-brands fa-linkedin' },
  { href: 'mailto:your-email@example.com', label: 'Email', icon: 'fa-solid fa-envelope' },
];

const TARGET_EMAIL = 'your-email@example.com';

const readField = (form: HTMLFormElement, name: string): string => {
  const field = form.elements.namedItem(name);
  return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement
    ? field.value.trim()
    : '';
};

export default function Contact() {
  const [status, setStatus] = useState<string>('');
  const [submitLabel, setSubmitLabel] = useState<string>('SEND MESSAGE');
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = readField(form, 'name');
    const email = readField(form, 'email');
    const subject = readField(form, 'subject');
    const message = readField(form, 'message');

    if (!name || !email || !subject || !message) {
      setStatus('Please fill in every field before sending.');
      return;
    }

    const mailBody = `${message}\n\n— ${name} (${email})`;
    const mailtoLink = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailtoLink;

    setSubmitLabel('MESSAGE READY');
    setStatus('Your email client should now be open with the message pre-filled.');

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setSubmitLabel('SEND MESSAGE'), 3000);
  };

  return (
    <section className="section section--contact" id="contact">
      <div className="section-inner">
        <Reveal className="section-head">
          <span className="section-number">05</span>
          <span className="section-label">GET IN TOUCH</span>
        </Reveal>
        <Reveal as="h2" className="section-heading section-heading--big">
          LET&apos;S BUILD SOMETHING<br /> TOGETHER.
        </Reveal>
        <Reveal as="p" className="section-intro">
          Have a project idea, collaboration, or simply want to connect? Feel free to reach out.
        </Reveal>

        <div className="contact-grid">
          <Reveal as="form" className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required autoComplete="name" />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required autoComplete="email" />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-submit">
              <span>{submitLabel}</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
            <p className="form-status" role="status" aria-live="polite">{status}</p>
          </Reveal>

          <Reveal className="contact-side">
            <div className="contact-socials">
              {SOCIALS.map(({ href, label, icon }) => (
                <a key={label} href={href} className="social-link" aria-label={label}>
                  <i className={icon}></i><span>{label}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
