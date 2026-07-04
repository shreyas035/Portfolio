import { useEffect, useRef, useState } from 'react';

const Loader = ({ onComplete }) => {
  const progressRef = useRef(null);
  const loaderRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let currentCount = 0;
    const duration = 1800; // 1.8 seconds loading animation
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      currentCount = Math.min(currentCount + increment, 100);
      setCount(Math.floor(currentCount));

      if (progressRef.current) {
        progressRef.current.style.width = `${currentCount}%`;
      }

      if (currentCount >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          if (loaderRef.current) {
            loaderRef.current.classList.add('fade-out');
          }
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500); // match fade-out CSS duration
        }, 200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader-wrap" aria-label="Loading">
      <div className="loader-bg" />
      <div className="loader-content">
        <div className="loader-logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">SJ</span>
          <span className="logo-bracket">/&gt;</span>
        </div>
        <p className="loader-tagline">Building intelligent systems...</p>
        <div className="loader-bar-wrap">
          <div ref={progressRef} className="loader-bar" />
        </div>
        <span className="loader-count">{count}%</span>
      </div>
      <div className="loader-grid" />
    </div>
  );
};

export default Loader;