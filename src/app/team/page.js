export const metadata = {
  title: 'Team | redteamX',
};

export default function Team() {
  return (
    <section id="team" className="section" style={{ paddingTop: '12rem' }}>
      <div className="section-header reveal active">
        <h2 className="pixel-font"><span className="slash">/</span> Command Center</h2>
      </div>
      <div className="about-grid reveal active" style={{ gridTemplateColumns: '1fr' }}>
        <div className="terminal-window" style={{ marginTop: '0', maxWidth: '100%' }}>
          <div className="terminal-header">
            <div className="t-btn red"></div>
            <div className="t-btn yellow"></div>
            <div className="t-btn green"></div>
            <div className="t-title" style={{ fontFamily: 'var(--font-pixel)', letterSpacing: '0.05em' }}>guest@redteamX: ~/team</div>
          </div>
          <div className="terminal-body" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', height: 'auto', overflow: 'visible' }}>
            {/* Member 1 */}
            <div style={{ flex: '1', minWidth: '250px', textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '2px solid var(--accent-red)', margin: '0 auto 1rem', overflow: 'hidden', background: 'var(--bg-darker)' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>👨‍💻</div>
              </div>
              <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>Alex Neo</h3>
              <p style={{ color: 'var(--accent-red)', fontSize: '0.85rem', textTransform: 'uppercase' }}>President / Root</p>
            </div>
            {/* Member 2 */}
            <div style={{ flex: '1', minWidth: '250px', textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '2px solid #555', margin: '0 auto 1rem', overflow: 'hidden', background: 'var(--bg-darker)' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>👩‍💻</div>
              </div>
              <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>Sarah Kerrigan</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>VP / Sudoer</p>
            </div>
             {/* Member 3 */}
             <div style={{ flex: '1', minWidth: '250px', textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '2px solid #555', margin: '0 auto 1rem', overflow: 'hidden', background: 'var(--bg-darker)' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🤖</div>
              </div>
              <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>JD Cipher</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Tech Lead</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
