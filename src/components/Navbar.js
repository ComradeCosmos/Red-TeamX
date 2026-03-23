"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${isHidden ? 'hidden' : ''}`}>
      <div className="nav-logo">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontWeight: 700, color: 'var(--accent-red)', fontSize: '1.5rem' }}>red</span>
          <span style={{ fontWeight: 300, color: 'var(--text-main)', fontSize: '1.5rem' }}>teamX</span>
        </Link>
      </div>
      
      <div className="nav-links">
        <Link href="/about">About</Link>
        <Link href="/operations">We Do</Link>
        <Link href="/team">Team</Link>
        <Link href="/cache">Cache</Link>
      </div>

      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
        <Link href="/operations" onClick={() => setIsMobileMenuOpen(false)}>We Do</Link>
        <Link href="/team" onClick={() => setIsMobileMenuOpen(false)}>Team</Link>
        <Link href="/cache" onClick={() => setIsMobileMenuOpen(false)}>Cache</Link>
      </div>
    </nav>
  );
}
