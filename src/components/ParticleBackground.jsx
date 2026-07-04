import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticleBackground = () => {
  const init = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 50, density: { enable: true, area: 800 } },
          color: { value: ['#9d4edd', '#00f2fe', '#f72585'] },
          shape: { type: 'circle' },
          opacity: {
            value: 0.35,
            random: true,
            animation: { enable: true, speed: 0.6, minimumValue: 0.1, sync: false },
          },
          size: {
            value: { min: 1, max: 3.5 },
            random: true,
          },
          links: {
            enable: true,
            distance: 130,
            color: '#00f2fe',
            opacity: 0.1,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'none',
            random: true,
            straight: false,
            outModes: 'out',
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
            onClick: { enable: true, mode: 'push' },
          },
          modes: {
            grab: { distance: 130, links: { opacity: 0.25 } },
            push: { quantity: 2 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
