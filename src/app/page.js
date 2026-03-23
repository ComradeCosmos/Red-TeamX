import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <section id="hero" className="hero-section">
      <div className="logo-wrap">
        <div className="wordmark">
          <span className="letter">R</span>
          <span className="letter">E</span>
          <span className="letter">D</span>
          <span className="spacer"></span>
          <span className="letter">T</span>
          <span className="letter">E</span>
          <span className="letter">A</span>
          <span className="letter">M</span>
        </div>

        <div className="target-wrap">
          <svg className="target-svg" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
            <defs>
              <filter id="xGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="b1"/>
                <feGaussianBlur stdDeviation="2.5" result="b2"/>
                <feMerge>
                  <feMergeNode in="b1"/>
                  <feMergeNode in="b2"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="ringF" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.5" result="b"/>
                <feMerge>
                  <feMergeNode in="b"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <circle className="ring-outer" cx="30" cy="30" r="28" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" fill="none"/>
            <circle className="ring-inner" cx="30" cy="30" r="22" stroke="#ff2020" strokeWidth="0.9" fill="none" filter="url(#ringF)" opacity="0.6"/>
            <circle cx="30" cy="30" r="17" fill="#131313"/>

            <line x1="30" y1="8" x2="30" y2="52" stroke="white" strokeWidth="0.3" opacity="0.05"/>
            <line x1="8" y1="30" x2="52" y2="30" stroke="white" strokeWidth="0.3" opacity="0.05"/>

            <g className="tick" style={{ transformOrigin: '30px 4px' }}><line x1="30" y1="1" x2="30" y2="8" stroke="#ff2020" strokeWidth="1.3"/></g>
            <g className="tick" style={{ transformOrigin: '30px 56px' }}><line x1="30" y1="52" x2="30" y2="59" stroke="#ff2020" strokeWidth="1.3"/></g>
            <g className="tick" style={{ transformOrigin: '4px 30px' }}><line x1="1" y1="30" x2="8" y2="30" stroke="#ff2020" strokeWidth="1.3"/></g>
            <g className="tick" style={{ transformOrigin: '56px 30px' }}><line x1="52" y1="30" x2="59" y2="30" stroke="#ff2020" strokeWidth="1.3"/></g>

            <g className="x-glow-group" filter="url(#xGlow)">
              <line className="x-line" x1="17" y1="17" x2="43" y2="43" stroke="#ff2020" strokeWidth="3.4" strokeLinecap="round"/>
              <line className="x-line" x1="43" y1="17" x2="17" y2="43" stroke="#ff2020" strokeWidth="3.4" strokeLinecap="round"/>
            </g>
          </svg>
        </div>

        <div className="underline"></div>
      </div>
      
      <p className="subtitle fade-in-up">The elite cybersecurity collective of PDEU</p>
      
      <a href="#vfs-terminal" className="cta-button fade-in-up-delay">
        <span className="cta-text">Enter the System</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
      </a>

      {/* Embedded VFS Terminal */}
      <div id="vfs-terminal" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Terminal />
      </div>
    </section>
  );
}
