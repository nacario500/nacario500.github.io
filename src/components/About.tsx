import Reveal from './Reveal';

type Stat = {
  number: string;
  label: string;
};

const STATS: Stat[] = [
  { number: '01+', label: 'Years Learning' },
  { number: '05+', label: 'Projects' },
  { number: '\u221e', label: 'Ideas to Build' },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="section-inner">
        <Reveal className="section-head">
          <span className="section-number">01</span>
          <span className="section-label">ABOUT ME</span>
        </Reveal>

        <div className="about-grid">
          <Reveal as="h2" className="section-heading">Turning ideas into digital experiences.</Reveal>

          <div className="about-body">
            <Reveal as="p">
              My name is Janwell Clark Nacario. I&apos;m a student and aspiring web developer who enjoys creating
              websites and web applications. I&apos;m interested in modern user interfaces, responsive web design,
              programming, and building systems that solve real problems for the people who use them.
            </Reveal>
            <Reveal as="p">
              I&apos;m still early in my journey, but I show up for the fundamentals: continuous learning, careful
              problem solving, and a genuine curiosity about how good design and clean code come together. Every
              project — school-assigned or personal — is a chance to get a little sharper at web development and
              UI/UX.
            </Reveal>

            <Reveal className="stats">
              {STATS.map(({ number, label }) => (
                <div className="stat" key={label}>
                  <span className="stat-number">{number}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
