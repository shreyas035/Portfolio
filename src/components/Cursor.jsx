import { useEffect, useRef } from 'react';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let isHovering = false;
    let isClicking = false;
    let raf;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Immediately move the center dot
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;

      // Spotlight tracking for glassmorphism cards
      const glassCard = e.target.closest('.glass-card');
      if (glassCard) {
        const rect = glassCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glassCard.style.setProperty('--mouse-x', `${x}px`);
        glassCard.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const animateRing = () => {
      // Lerp (Linear Interpolation) for smooth following behavior
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      raf = requestAnimationFrame(animateRing);
    };

    const onMouseDown = (e) => {
      isClicking = true;
      ring.style.transform = 'translate(-50%, -50%) scale(0.8)';
      ring.style.backgroundColor = 'rgba(0, 242, 254, 0.2)';

      // Spawn glowing visual ripple
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 500);
    };

    const onMouseUp = () => {
      isClicking = false;
      if (isHovering) {
        ring.style.transform = 'translate(-50%, -50%) scale(1.6)';
      } else {
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.backgroundColor = 'transparent';
      }
    };

    const onMouseEnterLink = () => {
      isHovering = true;
      ring.style.transform = 'translate(-50%, -50%) scale(1.6)';
      ring.style.borderColor = '#9d4edd'; // purple accent
      ring.style.backgroundColor = 'rgba(157, 78, 221, 0.05)';
      dot.style.backgroundColor = '#00f2fe'; // cyan accent
    };

    const onMouseLeaveLink = () => {
      isHovering = false;
      if (!isClicking) {
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.borderColor = '#00f2fe';
        ring.style.backgroundColor = 'transparent';
        dot.style.backgroundColor = '#9d4edd';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    // Add hover listeners to links and buttons
    const addListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    addListeners();
    raf = requestAnimationFrame(animateRing);

    // Watch for DOM changes to attach listeners to dynamic elements
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
};

export default Cursor;