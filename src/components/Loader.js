"use client";

import { useEffect, useState } from 'react';

export default function Loader() {
  const [isFading, setIsFading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [matrixChars, setMatrixChars] = useState([]);

  useEffect(() => {
    // Generate matrix background characters client-side to avoid hydration mismatches
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const newChars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      char: chars.charAt(Math.floor(Math.random() * chars.length)),
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 20 + 10}px`,
      opacity: Math.random(),
      animationDuration: `${Math.random() * 2 + 1}s`
    }));
    setMatrixChars(newChars);

    // Start fading out after 1.8s
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1800);

    // Remove from DOM after 0.6s fade transition finishes
    const removeTimer = setTimeout(() => {
      setIsRemoved(true);
    }, 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div className={`loader-wrapper matrix-loader ${isFading ? 'hidden' : ''}`}>
      <div className="loader-content">
        <div className="matrix-bg">
          {matrixChars.map((item) => (
            <span
              key={item.id}
              style={{
                position: 'absolute',
                left: item.left,
                top: item.top,
                fontSize: item.fontSize,
                opacity: item.opacity,
                animation: `pulse ${item.animationDuration} infinite`
              }}
            >
              {item.char}
            </span>
          ))}
        </div>
        <h1 className="glitch-text pixel-font" data-text="SYSTEM COMPROMISED">SYSTEM COMPROMISED</h1>
        <p className="loader-subtext">Establishing secure connection...</p>
      </div>
    </div>
  );
}
