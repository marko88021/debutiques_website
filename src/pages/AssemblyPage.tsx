import { Link } from 'react-router-dom';

const films = [
  {
    id: 'display-cabinet',
    title: 'Display cabinet',
    duration: '0:59',
    description: 'From the frame and panels to the shelves and glass door.',
  },
  {
    id: 'bedside-cabinet',
    title: 'Bedside cabinet',
    duration: '1:23',
    description: 'Frame assembly, door fitting and how to reverse the door opening.',
  },
];

export default function AssemblyPage() {
  return (
    <div className="assembly-page">
      <header className="simple-header assembly-header">
        <Link to="/" aria-label="Debutiques home">DEBUTIQUES</Link>
        <Link to="/#showcase">Portfolio</Link>
      </header>
      <main className="assembly-content">
        <h1>Assembly animations</h1>
        <p className="assembly-intro">See how each piece comes together, from the first fastener to the finished cabinet.</p>
        <div className="assembly-grid">
          {films.map(({ id, title, duration, description }) => (
            <article key={id} className="assembly-card">
              <div className="assembly-card-heading">
                <h2 id={id}>{title}</h2>
                <span>{duration}</span>
              </div>
              <video
                aria-labelledby={id}
                width="1080"
                height="1080"
                src={`/media/assembly/${id}.mp4`}
                poster={`/media/assembly/${id}.webp`}
                controls
                playsInline
                preload="none"
              >
                <a href={`/media/assembly/${id}.mp4`}>Watch {title}</a>
              </video>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="assembly-contact">
          <p>Need assembly animations for your products?</p>
          <Link className="editorial-button" to="/#schedule">Discuss your project</Link>
        </div>
      </main>
    </div>
  );
}
