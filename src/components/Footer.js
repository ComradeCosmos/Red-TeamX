"use client";

export default function Footer() {
  return (
    <footer className="footer reveal active">
      <div className="footer-content">
        <h2 className="pixel-font">READY TO HACK?</h2>
        <a href="mailto:hello@redteamx.pdeu" className="contact-link pixel-font">hello@redteamx.pdeu</a>
        <div className="social-links">
          <a href="#">Discord</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} redteamX PDEU. All rights reversed.</p>
      </div>
    </footer>
  );
}
