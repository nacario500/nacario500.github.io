import Reveal from './Reveal';

type TimelineItem = {
  tag: string;
  text: string;
};

const TIMELINE: TimelineItem[] = [
  { tag: 'START', text: 'Started learning programming and web development.' },
  { tag: 'LEARNING', text: 'Explored HTML, CSS, JavaScript, UI/UX, and databases.' },
  { tag: 'BUILDING', text: 'Started creating real-world web applications and school projects.' },
  { tag: 'NOW', text: 'Continuing to improve as a developer and building better digital experiences.' },
];

export default function Journey() {
  return (
    <section className="section" id="journey">
      <div className="section-inner">
        <Reveal className="section-head">
          <span className="section-number">04</span>
          <span className="section-label">MY JOURNEY</span>
        </Reveal>
        <Reveal as="h2" className="section-heading">Learning. Building. Improving.</Reveal>

        <div className="timeline">
          {TIMELINE.map(({ tag, text }) => (
            <Reveal className="timeline-item" key={tag}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-tag">{tag}</span>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
