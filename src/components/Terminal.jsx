import { useState, useRef, useEffect } from 'react';
import { playTypeSound } from './SoundManager';
import ScrollRevealText from './ScrollRevealText';

const HELP_TEXT = `Available commands:
  about       - Summarize Shreyas's background
  skills      - Print technical skills matrix
  projects    - List featured research projects
  education   - Print Savitribai Phule Pune University info
  game        - Launch retro ASCII Snake console game
  clear       - Clear terminal console
  hack        - Run holographic security nodes sweep`;

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 10;

const Terminal = () => {
  const [history, setHistory] = useState([
    'Welcome to Shreyas Jadhav Command Console [Version 1.2.0]',
    'Type "help" to list available commands.',
    '',
  ]);
  const [input, setInput] = useState('');
  const [isHacking, setIsHacking] = useState(false);
  const inputRef = useRef(null);
  const consoleContainerRef = useRef(null);

  // --- SNAKE GAME STATE ---
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [food, setFood] = useState({ x: 12, y: 5 });
  const [dir, setDir] = useState({ x: 1, y: 0 }); // moving right initially
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameIntervalRef = useRef(null);

  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [history, isHacking, isPlayingGame]);

  // Handle Command Routing
  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, `shreyas@sppu:~$ ${cmd}`];

    if (trimmed === 'help') {
      newHistory.push(HELP_TEXT);
    } else if (trimmed === 'about') {
      newHistory.push(
        'Name: Shreyas Jadhav',
        'Role: AI & Machine Learning Engineer | Computer Vision & Robotics Specialist',
        'Focus: training neural models, developing real-time OpenCV tracking nodes, and hardware microcontroller integrations.',
        'Location: Pune, Maharashtra, India'
      );
    } else if (trimmed === 'skills') {
      newHistory.push(
        'SKILLS MATRIX:',
        '  [==============================] Python (90%)',
        '  [==============================] OpenCV (90%)',
        '  [=======================       ] Machine Learning (88%)',
        '  [=======================       ] Computer Vision (85%)',
        '  [======================        ] ESP32 & Arduino (82%)',
        '  [====================          ] PyTorch (75%)',
        '  [==================            ] React.js (72%)'
      );
    } else if (trimmed === 'projects') {
      newHistory.push(
        'FEATURED PROJECTS:',
        '  1. Accident Detection System - Traffic camera collision monitoring [YOLO]',
        '  2. Hand & Face Tracking - Gestural telemetry analysis [MediaPipe]',
        '  3. Object Detection Pipeline - PyTorch multi-class bounding box tool',
        '  4. PID Line Following Robot - Autonomous Arduino steering controller',
        '  5. ESP32 Wi-Fi Vision System - Wireless low-latency streaming node'
      );
    } else if (trimmed === 'education') {
      newHistory.push(
        'UNIVERSITY INFO:',
        '  University: Savitribai Phule Pune University (SPPU)',
        '  Degree: Bachelor of Engineering (B.E.) in Computer Engineering',
        '  Status: Expected graduation 2027'
      );
    } else if (trimmed === 'clear') {
      setHistory([]);
      return;
    } else if (trimmed === 'game') {
      newHistory.push('Initializing retro console game nodes...', 'Launching ASCII Snake [v1.0.0]...');
      setHistory(newHistory);
      setTimeout(() => {
        setIsPlayingGame(true);
        resetGame();
      }, 500);
      return;
    } else if (trimmed === 'hack') {
      setIsHacking(true);
      setHistory([]);
      let counts = 0;
      const hackInterval = setInterval(() => {
        setHistory((prev) => [
          ...prev,
          `SYSTEM_DECRYPT_NODE_${Math.floor(Math.random() * 1000)}: SUCCESS [KEY_${(Math.random() * 1e8).toString(16)}]`,
          `HOLOGRAPHIC_GRID_SWEEP: LATENCY=${Math.floor(Math.random() * 40)}ms STATUS=READY`,
        ]);
        counts++;
        if (counts > 20) {
          clearInterval(hackInterval);
          setIsHacking(false);
          setHistory((prev) => [
            ...prev,
            '',
            '🔓 DECRYPTION COMPLETED: SECURITY NODE SWEEP SUCCESSFUL.',
            'Terminal returned to normal mode.',
            '',
          ]);
        }
      }, 150);
      return;
    } else if (trimmed !== '') {
      newHistory.push(`Command not found: "${cmd}". Type "help" for a list of commands.`);
    }

    setHistory(newHistory);
  };

  // --- SNAKE GAME ENGINE ---
  const resetGame = () => {
    setSnake([{ x: 5, y: 5 }]);
    setFood({ x: 12, y: 5 });
    setDir({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
  };

  const exitGame = () => {
    setIsPlayingGame(false);
    setHistory((prev) => [...prev, '', 'ASCII Snake game session terminated. Score: ' + score, '']);
  };

  // Game Loop interval
  useEffect(() => {
    if (!isPlayingGame || gameOver) return;

    const gameTick = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { x: head.x + dir.x, y: head.y + dir.y };

        // Border Collision check
        if (newHead.x < 0 || newHead.x >= BOARD_WIDTH || newHead.y < 0 || newHead.y >= BOARD_HEIGHT) {
          setGameOver(true);
          return prevSnake;
        }

        // Self Collision check
        for (let i = 0; i < prevSnake.length; i++) {
          if (prevSnake[i].x === newHead.x && prevSnake[i].y === newHead.y) {
            setGameOver(true);
            return prevSnake;
          }
        }

        const newSnake = [newHead, ...prevSnake];

        // Food collision check
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          // Spawn food at new coordinates
          let newFood;
          let isOnSnake = true;
          while (isOnSnake) {
            newFood = {
              x: Math.floor(Math.random() * BOARD_WIDTH),
              y: Math.floor(Math.random() * BOARD_HEIGHT),
            };
            isOnSnake = newSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
          }
          setFood(newFood);
        } else {
          newSnake.pop(); // remove tail segment
        }

        return newSnake;
      });
    };

    gameIntervalRef.current = setInterval(gameTick, 180);
    return () => clearInterval(gameIntervalRef.current);
  }, [isPlayingGame, gameOver, dir, food]);

  // Watch key commands for game controls or terminal clicks
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlayingGame) return;

      // Prevent window scrolling during game
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (gameOver) {
        if (e.key === 'r' || e.key === 'R') resetGame();
        if (e.key === 'Escape') exitGame();
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          if (dir.y === 0) setDir({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (dir.y === 0) setDir({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (dir.x === 0) setDir({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (dir.x === 0) setDir({ x: 1, y: 0 });
          break;
        case 'Escape':
          exitGame();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlayingGame, gameOver, dir, score]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isHacking) return;
    handleCommand(input);
    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    playTypeSound();
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Render Game Board Matrix
  const renderGameBoard = () => {
    const rows = [];
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      let rowStr = '';
      for (let x = 0; x < BOARD_WIDTH; x++) {
        const isHead = snake[0].x === x && snake[0].y === y;
        const isSegment = snake.some((s, idx) => idx > 0 && s.x === x && s.y === y);
        const isFood = food.x === x && food.y === y;

        if (isHead) rowStr += '●';
        else if (isSegment) rowStr += '■';
        else if (isFood) rowStr += '★';
        else rowStr += '·';
      }
      rows.push(rowStr);
    }
    return rows;
  };

  return (
    <section className="section terminal-section" id="console" style={{ background: 'transparent' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <p className="section-label">Command Line Interface</p>
          <ScrollRevealText className="section-title">Developer Console</ScrollRevealText>
          <p className="section-subtitle">
            An interactive terminal for you to query my profile, check technical parameters, or run scripts.
          </p>
        </div>

        {/* Terminal Box */}
        <div
          className="terminal-box glass-card"
          onClick={focusInput}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            minHeight: '340px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            color: 'var(--accent-cyan)',
            padding: '0',
            overflow: 'hidden',
            border: '1px solid var(--border-primary)',
            boxShadow: 'var(--shadow-glow-purple)',
            cursor: 'text',
          }}
        >
          {/* Header window bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              background: 'rgba(157, 78, 221, 0.15)',
              borderBottom: '1px solid var(--border-glass)',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              shreyas@sppu: ~ (react-bash)
            </span>
            <div style={{ width: '52px' }} />
          </div>

          {/* Console output / Game screen display */}
          <div
            ref={consoleContainerRef}
            style={{
              padding: '20px',
              height: '320px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              background: 'rgba(4, 6, 11, 0.75)',
            }}
          >
            {isPlayingGame ? (
              // --- RENDER SNAKE GAME ---
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  height: '100%',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px', fontSize: '0.8rem' }}>
                  <span>SCORE: {score}</span>
                  <span style={{ color: 'var(--accent-purple)' }}>ESC to Exit</span>
                </div>

                <div
                  style={{
                    border: '1px solid rgba(0, 242, 254, 0.3)',
                    padding: '8px 16px',
                    lineHeight: '1.2',
                    letterSpacing: '5px',
                    fontSize: '1rem',
                    background: 'rgba(0,0,0,0.4)',
                    borderRadius: '8px',
                  }}
                >
                  {renderGameBoard().map((row, idx) => (
                    <div key={idx}>{row}</div>
                  ))}
                </div>

                {gameOver ? (
                  <div style={{ textAlign: 'center', marginTop: '4px' }}>
                    <p style={{ color: 'var(--accent-pink)', fontWeight: '700' }}>GAME OVER</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Press 'R' to Restart | ESC to Exit</p>
                  </div>
                ) : (
                  // Mobile Control Buttons helper
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '4px',
                    }}
                    className="mobile-controls-wrapper"
                  >
                    <button
                      onClick={() => dir.y === 0 && setDir({ x: 0, y: -1 })}
                      style={{
                        padding: '2px 10px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      ▲
                    </button>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => dir.x === 0 && setDir({ x: -1, y: 0 })}
                        style={{
                          padding: '2px 10px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--border-glass)',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          color: 'var(--text-primary)',
                        }}
                      >
                        ◀
                      </button>
                      <button
                        onClick={() => dir.x === 0 && setDir({ x: 1, y: 0 })}
                        style={{
                          padding: '2px 10px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--border-glass)',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          color: 'var(--text-primary)',
                        }}
                      >
                        ▶
                      </button>
                    </div>
                    <button
                      onClick={() => dir.y === 0 && setDir({ x: 0, y: 1 })}
                      style={{
                        padding: '2px 10px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      ▼
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // --- RENDER NORMAL TERMINAL HISTORY ---
              <>
                {history.map((line, index) => (
                  <div key={index} style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                    {line.startsWith('shreyas@sppu:~$') ? (
                      <span style={{ color: 'var(--accent-purple)', fontWeight: '600' }}>{line}</span>
                    ) : line.includes('SUCCESS') || line.includes('🔓') ? (
                      <span style={{ color: 'var(--accent-green)' }}>{line}</span>
                    ) : (
                      <span style={{ color: 'var(--text-primary)' }}>{line}</span>
                    )}
                  </div>
                ))}
                {isHacking && (
                  <div style={{ color: 'var(--accent-green)', animation: 'pulse 1s infinite' }}>
                    DECRYPTING SECURITY KEY NODES... PLEASE WAIT
                  </div>
                )}
              </>
            )}
          </div>

          {/* Command input prompt */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 20px',
              background: 'rgba(13, 18, 32, 0.8)',
              borderTop: '1px solid var(--border-glass)',
            }}
          >
            <span style={{ color: 'var(--accent-purple)', fontWeight: '600', marginRight: '8px' }}>
              shreyas@sppu:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              disabled={isHacking || isPlayingGame}
              style={{
                flexGrow: 1,
                border: 'none',
                background: 'none',
                color: 'var(--accent-cyan)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                outline: 'none',
              }}
              placeholder={
                isHacking
                  ? 'Sweeping nodes...'
                  : isPlayingGame
                    ? "Use Arrow keys to play (ESC to Exit)"
                    : 'Type a command...'
              }
              autoComplete="off"
            />
            {isPlayingGame && (
              <button
                type="button"
                onClick={exitGame}
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--accent-pink)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Exit Game
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
