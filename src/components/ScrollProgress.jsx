import { useEffect, useRef } from 'react';

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Trigger scroll calculations initially
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div ref={barRef} className="scroll-progress-bar" />;
};

export default ScrollProgress;