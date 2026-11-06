import Reveal from './Reveal';

type Skill = {
  num: string;
  icon: string;
  title: string;
  description: string;
};

const SKILLS: Skill[] = [
  { num: '01', icon: 'fa-brands fa-html5', title: 'HTML5', description: 'Semantic structure and accessible web development.' },
  { num: '02', icon: 'fa-brands fa-css3-alt', title: 'CSS3', description: 'Responsive layouts, animations, and modern visual design.' },
  { num: '03', icon: 'fa-brands fa-js', title: 'JavaScript', description: 'Interactive interfaces and dynamic web applications.' },
  { num: '04', icon: 'fa-solid fa-fire', title: 'Firebase', description: 'Database, authentication, hosting, and backend services.' },
  { num: '05', icon: 'fa-brands fa-git-alt', title: 'Git & GitHub', description: 'Version control and project deployment.' },
  { num: '06', icon: 'fa-solid fa-pen-ruler', title: 'UI/UX Design', description: 'Designing clean and user-friendly interfaces.' },
  { num: '07', icon: 'fa-solid fa-mobile-screen', title: 'Responsive Design', description: 'Experiences that work across desktop, tablet, and mobile.' },
  { num: '08', icon: 'fa-solid fa-code', title: 'Web Development', description: 'Building functional and modern web applications.' },
];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-inner">
        <Reveal className="section-head">
          <span className="section-number">02</span>
          <span className="section-label">WHAT I WORK WITH</span>
        </Reveal>
        <Reveal as="h2" className="section-heading">Technologies &amp; Skills</Reveal>

        <div className="skills-grid">
          {SKILLS.map(({ num, icon, title, description }) => (
            <Reveal as="article" className="skill-card" key={num}>
              <span className="skill-num">{num}</span>
              <i className={`${icon} skill-icon`} aria-hidden="true"></i>
              <h3>{title}</h3>
              <p>{description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
