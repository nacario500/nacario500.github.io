import Reveal from './Reveal.jsx';

const PROJECTS = [
  {
    index: '01',
    category: 'Web Application',
    title: 'Sport Tournament Management System',
    description: 'A web-based system designed to help manage sports tournaments, teams, players, coaches, registrations, schedules, and tournament information.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    preview: 'dashboard',
    demoLabel: 'LIVE DEMO',
    secondLabel: 'VIEW PROJECT',
  },
  {
    index: '02',
    category: 'Website',
    title: 'Personal Portfolio Website',
    description: 'A responsive personal portfolio designed to showcase my skills, projects, and experience as a student developer.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    preview: 'landing',
    demoLabel: 'LIVE DEMO',
    secondLabel: 'SOURCE CODE',
  },
  {
    index: '03',
    category: 'Web Application',
    title: 'Web Application Project',
    description: 'A modern web application demonstrating responsive design, interactive components, and JavaScript functionality.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    preview: 'chart',
    demoLabel: 'LIVE DEMO',
    secondLabel: 'SOURCE CODE',
  },
];

function MockPreview({ variant }) {
  return (
    <div className={`mock-ui mock-ui--${variant}`} aria-hidden="true">
      <div className="mock-topbar"><span></span><span></span><span></span></div>
      <div className="mock-panel">
        {variant === 'dashboard' && (
          <>
            <div className="mock-row"></div>
            <div className="mock-cards">
              <div className="mock-card"></div>
              <div className="mock-card"></div>
              <div className="mock-card"></div>
            </div>
            <div className="mock-line"></div>
            <div className="mock-line short"></div>
          </>
        )}
        {variant === 'landing' && (
          <>
            <div className="mock-hero-block"></div>
            <div className="mock-line"></div>
            <div className="mock-line short"></div>
            <div className="mock-dots"><span></span><span></span><span></span></div>
          </>
        )}
        {variant === 'chart' && (
          <>
            <div className="mock-grid-vis">
              <div className="mock-bar" style={{ '--h': '40%' }}></div>
              <div className="mock-bar" style={{ '--h': '70%' }}></div>
              <div className="mock-bar" style={{ '--h': '55%' }}></div>
              <div className="mock-bar" style={{ '--h': '85%' }}></div>
              <div className="mock-bar" style={{ '--h': '35%' }}></div>
            </div>
            <div className="mock-line"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="section-inner">
        <Reveal className="section-head">
          <span className="section-number">03</span>
          <span className="section-label">SELECTED WORK</span>
        </Reveal>
        <Reveal as="h2" className="section-heading">Projects I&apos;ve Built</Reveal>
        <Reveal as="p" className="section-intro">
          A collection of projects that represent my learning, creativity, and experience in building digital solutions.
        </Reveal>

        <div className="projects-grid">
          {PROJECTS.map(({ index, category, title, description, tech, preview, demoLabel, secondLabel }) => (
            <Reveal as="article" className="project-card" key={index}>
              <div className="project-preview">
                <MockPreview variant={preview} />
              </div>
              <div className="project-info">
                <div className="project-meta">
                  <span className="project-index">{index}</span>
                  <span className="project-category">{category}</span>
                </div>
                <h3 className="project-title">{title}</h3>
                <p className="project-desc">{description}</p>
                <div className="project-tech">
                  {tech.map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">
                    {demoLabel} <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  </a>
                  <a href="#" className="project-link project-link--ghost">{secondLabel}</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
