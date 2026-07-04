import { useState, useEffect } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
};

// Synth sounds using Web Audio API
export const playHoverSound = () => {
  try {
    const isMuted = localStorage.getItem('sound_muted') === 'true';
    if (isMuted) return;

    const ctx = getAudioContext();
    if (ctx.state === 'suspended') return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Chirp sweep
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  } catch (e) {
    // Ignore audio context blocks
  }
};

export const playClickSound = () => {
  try {
    const isMuted = localStorage.getItem('sound_muted') === 'true';
    if (isMuted) return;

    const ctx = getAudioContext();
    if (ctx.state === 'suspended') return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch (e) {
    // Ignore audio context blocks
  }
};

export const playTypeSound = () => {
  try {
    const isMuted = localStorage.getItem('sound_muted') === 'true';
    if (isMuted) return;

    const ctx = getAudioContext();
    if (ctx.state === 'suspended') return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.012, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    // Ignore audio context blocks
  }
};

const SoundManager = () => {
  const [muted, setMuted] = useState(() => {
    return localStorage.getItem('sound_muted') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sound_muted', muted);
  }, [muted]);

  const toggleMute = () => {
    // Resume context on user action (browser security compliance)
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    setMuted((prev) => !prev);
  };

  // Add click sound listener to document
  useEffect(() => {
    const handleDocumentClick = (e) => {
      const isButtonOrLink = e.target.closest('a, button, [role="button"], input[type="submit"]');
      if (isButtonOrLink) {
        playClickSound();
      }
    };

    const handleDocumentHover = (e) => {
      const isInteractive = e.target.closest('a, button, [role="button"], .orbit-node, .filter-btn');
      if (isInteractive && e.type === 'mouseenter') {
        playHoverSound();
      }
    };

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('mouseenter', handleDocumentHover, { capture: true });

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('mouseenter', handleDocumentHover, { capture: true });
    };
  }, []);

  return (
    <button
      onClick={toggleMute}
      aria-label="Toggle sound effects"
      title={muted ? 'Unmute UI sounds' : 'Mute UI sounds'}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9999,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-glass)',
        color: muted ? 'var(--text-muted)' : 'var(--accent-cyan)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: muted ? 'var(--shadow-sm)' : 'var(--shadow-glow)',
        transition: 'all var(--transition-base)',
      }}
      className="sound-toggle-btn"
    >
      {muted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
    </button>
  );
};

export default SoundManager;
