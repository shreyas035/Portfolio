import { useState, useRef, useEffect } from 'react';
import { FiMusic, FiPlay, FiPause, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

let audioCtx = null;
let synthInterval = null;
let activeOscillators = [];

const MusicPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackName, setTrackName] = useState('Ambient Dreamscape');
  const visualizerCanvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Dreamy ambient meditation pad generator
  const startSynthTrack = () => {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Very slow, dreamy minor chord progression (meditation style)
      const chords = [
        [65.41, 98.00, 130.81],   // C2, G2, C3 — deep ocean
        [73.42, 110.0, 146.83],   // D2, A2, D3 — warm drift
        [55.00, 82.41, 110.0],    // A1, E2, A2 — deep space
        [61.74, 92.50, 123.47],   // B1, F#2, B2 — twilight
      ];

      let chordIdx = 0;

      const playDreamPad = () => {
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        const chord = chords[chordIdx];

        chord.forEach((freq) => {
          // Layer 1: Deep base sine tone
          const osc1 = audioCtx.createOscillator();
          const gain1 = audioCtx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(freq, now);
          gain1.gain.setValueAtTime(0, now);
          gain1.gain.linearRampToValueAtTime(0.012, now + 3.0);  // very slow 3s fade-in
          gain1.gain.setValueAtTime(0.012, now + 5.0);
          gain1.gain.linearRampToValueAtTime(0, now + 8.0);      // 3s fade-out
          osc1.connect(gain1);
          gain1.connect(audioCtx.destination);
          osc1.start(now);
          osc1.stop(now + 8.2);

          // Layer 2: Slightly detuned shimmer (creates warmth)
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(freq * 2.003, now); // octave + tiny detune
          gain2.gain.setValueAtTime(0, now);
          gain2.gain.linearRampToValueAtTime(0.005, now + 3.5);
          gain2.gain.setValueAtTime(0.005, now + 5.5);
          gain2.gain.linearRampToValueAtTime(0, now + 8.0);
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.start(now);
          osc2.stop(now + 8.2);
        });

        chordIdx = (chordIdx + 1) % chords.length;
      };

      // First pad immediately, then every 7 seconds (overlapping for continuous sound)
      playDreamPad();
      synthInterval = setInterval(playDreamPad, 7000);
    } catch (e) {
      // Silently fail if browser blocks audio
    }
  };

  const stopSynthTrack = () => {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopSynthTrack();
      setIsPlaying(false);
    } else {
      startSynthTrack();
      setIsPlaying(true);
      setTrackName('Ambient Dreamscape');
    }
  };

  // Mock Audio visualizer animation loops
  useEffect(() => {
    const canvas = visualizerCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const barsCount = 8;
    const barWidth = 4;
    const barGap = 3;
    const heights = Array(barsCount).fill(2);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < barsCount; i++) {
        if (isPlaying) {
          // Dynamic jitter heights
          heights[i] = Math.max(3, Math.min(24, heights[i] + (Math.random() - 0.5) * 8));
        } else {
          // Stabilize to zero
          heights[i] = Math.max(2, heights[i] - 1);
        }

        ctx.fillStyle = '#00f2fe';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 4;

        const x = i * (barWidth + barGap) + 4;
        const y = canvas.height - heights[i];
        ctx.fillRect(x, y, barWidth, heights[i]);
      }

      ctx.shadowBlur = 0;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      stopSynthTrack();
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'all var(--transition-base)',
      }}
      className="music-deck-wrapper"
    >
      {/* Pure Web Audio synthesis — no external audio files needed */}

      {/* Cassette Player expanded deck */}
      {isOpen && (
        <div
          className="glass-card"
          style={{
            width: '230px',
            height: '84px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'var(--shadow-glow-purple)',
            border: '1px solid var(--border-primary)',
            background: 'rgba(13, 18, 32, 0.9)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {/* Cassette Tape Spindle visualizer */}
          <div
            style={{
              position: 'relative',
              width: '54px',
              height: '34px',
              background: '#040713',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '0 4px',
            }}
          >
            {/* Left Spindle */}
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px dashed var(--accent-cyan)',
                animation: isPlaying ? 'spinClockwise 4s linear infinite' : 'none',
              }}
            />
            {/* Right Spindle */}
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px dashed var(--accent-cyan)',
                animation: isPlaying ? 'spinClockwise 4s linear infinite' : 'none',
              }}
            />
          </div>

          {/* Controls Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '4px' }}>
            <span
              style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
                maxWidth: '120px',
              }}
            >
              {trackName}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={handlePlayPause}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: isPlaying ? 'var(--accent-pink)' : 'var(--gradient-primary)',
                  border: 'none',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                }}
                title={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying ? <FiPause size={12} /> : <FiPlay size={12} style={{ marginLeft: '1px' }} />}
              </button>

              <canvas
                ref={visualizerCanvasRef}
                width="60"
                height="26"
                style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Floater Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glass)',
          color: isOpen ? 'var(--accent-pink)' : 'var(--accent-cyan)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-glow)',
          transition: 'all var(--transition-base)',
        }}
        className="sound-toggle-btn"
        title={isOpen ? 'Collapse player' : 'Expand music player'}
      >
        {isOpen ? <FiChevronRight size={18} /> : <FiMusic size={18} />}
      </button>
    </div>
  );
};

export default MusicPlayer;
