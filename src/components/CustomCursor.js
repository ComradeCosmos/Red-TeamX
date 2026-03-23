"use client";

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update cursor immediately
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animateFollower = () => {
      // Smooth interpolation for the follower
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(animateFollower);
    };

    const handleMouseOver = (e) => {
      // Add hover state if the target is interactive
      const isInteractive = e.target.tagName.toLowerCase() === 'a' || 
                            e.target.tagName.toLowerCase() === 'button' ||
                            e.target.tagName.toLowerCase() === 'input' ||
                            e.target.closest('.flip-card') ||
                            e.target.closest('.t-btn');
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    
    // Start animation loop for smooth follower
    const animationId = requestAnimationFrame(animateFollower);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={followerRef} className={`cursor-follower ${isHovering ? 'hover-state' : ''}`}></div>
    </>
  );
}
