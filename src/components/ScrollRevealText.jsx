import { useEffect, useRef, useState } from 'react';

/**
 * ScrollRevealText — Cinematic scroll-driven text reveal.
 * 
 * Each character transitions from blurred + transparent to sharp + visible,
 * synced precisely to the element's scroll position in the viewport.
 */
const ScrollRevealText = ({ children, className = '', as: Tag = 'h2' }) => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const text = typeof children === 'string' ? children : '';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Element starts revealing when its top enters the bottom 85% of viewport
      // and is fully revealed when its top reaches 40% from top
      const startReveal = windowH * 0.85;
      const endReveal = windowH * 0.35;

      if (rect.top >= startReveal) {
        setProgress(0);
      } else if (rect.top <= endReveal) {
        setProgress(1);
      } else {
        const p = (startReveal - rect.top) / (startReveal - endReveal);
        setProgress(Math.max(0, Math.min(1, p)));
      }
    };

    handleScroll(); // initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chars = text.split('');

  return (
    <Tag ref={containerRef} className={`scroll-reveal-text ${className}`}>
      {chars.map((char, i) => {
        // Each character has its own reveal threshold within the overall progress
        const charStart = i / chars.length;
        const charEnd = (i + 1) / chars.length;

        // How revealed this character is (0 = hidden, 1 = fully visible)
        let charProgress;
        if (progress >= charEnd) {
          charProgress = 1;
        } else if (progress <= charStart) {
          charProgress = 0;
        } else {
          charProgress = (progress - charStart) / (charEnd - charStart);
        }

        const opacity = 0.08 + charProgress * 0.92;
        const blur = (1 - charProgress) * 6; // 6px blur → 0
        const yShift = (1 - charProgress) * 8; // 8px down → 0

        return (
          <span
            key={i}
            className="scroll-reveal-char"
            style={{
              opacity,
              filter: `blur(${blur}px)`,
              transform: `translateY(${yShift}px)`,
              display: 'inline-block',
              transition: 'none', // synced to scroll, no CSS transition
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </Tag>
  );
};

export default ScrollRevealText;
