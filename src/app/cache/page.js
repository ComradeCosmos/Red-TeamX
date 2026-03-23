import { getAllInfo } from '@/lib/db';

export const metadata = {
  title: 'Cache | redteamX',
};

// Next.js config to ensure the page doesn't fully cache if entries are added.
// By default, App Router might cache server components.
export const revalidate = 0; // Disable full caching for this dynamic page

export default function Cache() {
  // Fetch data directly on the server component
  const cachedData = getAllInfo();

  return (
    <section id="cache" className="section" style={{ paddingTop: '12rem' }}>
      <div className="section-header reveal active">
        <h2 className="pixel-font"><span className="slash">/</span> System Cache</h2>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
          Archived knowledge, writeups, and intercepted transmissions.
        </p>
      </div>

      <div className="cache-grid reveal active">
        {cachedData.length === 0 ? (
          <div className="terminal-window" style={{ gridColumn: '1 / -1', marginTop: '0', maxWidth: '100%' }}>
            <div className="terminal-header">
              <div className="t-btn red"></div><div className="t-btn yellow"></div><div className="t-btn green"></div>
              <div className="t-title">/var/log/messages</div>
            </div>
            <div className="terminal-body" style={{ height: 'auto', padding: '1rem' }}>
              <p style={{ color: '#a0a0a0' }}>[INFO] The cache is currently empty. Awaiting new transmissions.</p>
            </div>
          </div>
        ) : (
          cachedData.map((item) => (
            <div key={item.id} className="cache-item" style={{ background: 'var(--bg-darker)', border: '1px solid var(--accent-red)', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
              <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>{item.title}</h3>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'var(--font-pixel)', letterSpacing: '0.05em' }}>
                <span style={{ color: '#27c93f' }}>{item.author}</span> @ {new Date(item.date_added).toLocaleString()}
              </div>
              <p style={{ color: '#ccc', lineHeight: '1.6' }}>{item.content}</p>
            </div>
          ))
        )}
      </div>

    </section>
  );
}
