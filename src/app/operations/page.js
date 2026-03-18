export const metadata = {
  title: 'Operations | redteamX',
};

export default function Operations() {
  return (
    <section id="whatwedo" className="section" style={{ paddingTop: '12rem' }}>
      <div className="section-header reveal active">
        <h2 className="pixel-font"><span className="slash">/</span> Operations</h2>
      </div>
      <div className="cards-grid reveal active">
        
        {/* Card 1 */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card-icon">🚩</div>
              <h3 className="pixel-font">Capture the Flag</h3>
            </div>
            <div className="flip-card-back">
              <p>Sharpening skills in competitive cybersecurity challenges from Web Exploitation to Reverse Engineering.</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card-icon">🛡️</div>
              <h3 className="pixel-font">Cybersecurity for Everyone</h3>
            </div>
            <div className="flip-card-back">
              <p>Spreading awareness about online threats, privacy, and proactive defense mechanisms.</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card-icon">⚡</div>
              <h3 className="pixel-font">Live Workshops</h3>
            </div>
            <div className="flip-card-back">
              <p>Hands-on sessions on penetration testing, networking, OSINT, and malware analysis.</p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card-icon">🌐</div>
              <h3 className="pixel-font">Web Development</h3>
            </div>
            <div className="flip-card-back">
              <p>Building secure, high-performance applications and understanding backend vulnerabilities.</p>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card-icon">🔌</div>
              <h3 className="pixel-font">Networking</h3>
            </div>
            <div className="flip-card-back">
              <p>Mastering the backbone of the internet, analyzing packets, and configuring enterprise networks.</p>
            </div>
          </div>
        </div>

        {/* Card 6 */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card-icon">🎮</div>
              <h3 className="pixel-font">Game Nights</h3>
            </div>
            <div className="flip-card-back">
              <p>Bonding over tactical shooters and co-op games. Building chemistry within the team.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
