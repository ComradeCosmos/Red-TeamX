export const metadata = {
  title: 'About | redteamX',
};

export default function About() {
  return (
    <section id="about" className="section" style={{ paddingTop: '12rem' }}>
      <div className="section-header reveal active">
        <h2 className="pixel-font"><span className="slash">/</span> Let us take a walk together</h2>
      </div>
      <div className="about-grid reveal active" style={{ gridTemplateColumns: '1fr' }}>
        <div className="about-stats" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: '1fr', gap: '2rem' }}>
          <div className="stat-card">
            <h3 className="pixel-font">400+</h3>
            <p>Members</p>
          </div>
          <div className="stat-card">
            <h3 className="pixel-font">50+</h3>
            <p>CTFs Played</p>
          </div>
          <div className="stat-card">
            <h3 className="pixel-font">20+</h3>
            <p>Workshops</p>
          </div>
          <div className="stat-card accent-card">
            <h3 className="pixel-font">1</h3>
            <p>Mission</p>
          </div>
        </div>
        
        <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--bg-darker)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
            <strong style={{ color: 'var(--accent-red)', fontSize: '1.2em' }}>redteamX</strong> is the premier cybersecurity community at PDEU. We are a collective of ethical hackers, security researchers, and cyber enthusiasts dedicated to uncovering vulnerabilities and strengthening digital defenses.
          </p>
          <br/>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', fontFamily: 'var(--font-pixel)', letterSpacing: '0.05em' }}>
            {'> Hack the planet.'}
          </p>
        </div>
      </div>
    </section>
  );
}
