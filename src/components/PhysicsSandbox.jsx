import { useEffect, useRef, useState } from 'react';

const PhysicsSandbox = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const skillsList = [
    { name: 'Python', color: '#3572A5', radius: 36 },
    { name: 'OpenCV', color: '#00f2fe', radius: 36 },
    { name: 'PyTorch', color: '#EE4F27', radius: 38 },
    { name: 'C++', color: '#f34b7d', radius: 32 },
    { name: 'Arduino', color: '#00979D', radius: 36 },
    { name: 'ESP32', color: '#E7352C', radius: 32 },
    { name: 'Deep Learning', color: '#9d4edd', radius: 46 },
    { name: 'ROS', color: '#22313F', radius: 32 },
    { name: 'Git', color: '#F1502F', radius: 28 },
    { name: 'SolidWorks', color: '#00548B', radius: 38 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let bubbles = [];

    // Mouse drag state
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let activeBubble = null;
    let dragOffset = { x: 0, y: 0 };
    let lastMousePos = { x: 0, y: 0 };
    let mouseVelocity = { x: 0, y: 0 };

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 380;
      canvas.width = width;
      canvas.height = height;
      initPhysics();
    };

    const initPhysics = () => {
      bubbles = skillsList.map((skill, index) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        return {
          ...skill,
          id: index,
          x: Math.random() * (width - 100) + 50,
          y: Math.random() * (height - 200) + 50,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          mass: skill.radius, // proportional mass
          isDragging: false,
        };
      });
    };

    // Collision math solver
    const resolveCollision = (b1, b2) => {
      const xVelocityDiff = b1.vx - b2.vx;
      const yVelocityDiff = b1.vy - b2.vy;

      const xDist = b2.x - b1.x;
      const yDist = b2.y - b1.y;

      // Prevent overlap stickiness
      if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        const angle = -Math.atan2(b2.y - b1.y, b2.x - b1.x);

        const m1 = b1.mass;
        const m2 = b2.mass;

        // Velocity vectors rotation
        const u1 = rotate(b1.vx, b1.vy, angle);
        const u2 = rotate(b2.vx, b2.vy, angle);

        // One-dimensional elastic collision equations
        const v1 = { x: (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2), y: u1.y };
        const v2 = { x: (u2.x * (m2 - m1) + 2 * m1 * u1.x) / (m1 + m2), y: u2.y };

        // Rotate velocities back
        const vFinal1 = rotate(v1.x, v1.y, -angle);
        const vFinal2 = rotate(v2.x, v2.y, -angle);

        // Apply new velocities
        b1.vx = vFinal1.x;
        b1.vy = vFinal1.y;
        b2.vx = vFinal2.x;
        b2.vy = vFinal2.y;
      }
    };

    const rotate = (vx, vy, angle) => {
      return {
        x: vx * Math.cos(angle) - vy * Math.sin(angle),
        y: vx * Math.sin(angle) + vy * Math.cos(angle),
      };
    };

    // Mouse handlers
    const handleMouseDown = (e) => {
      isMouseDown = true;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Find clicked bubble
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        const dist = Math.hypot(mouseX - b.x, mouseY - b.y);
        if (dist <= b.radius) {
          activeBubble = b;
          b.isDragging = true;
          dragOffset = { x: mouseX - b.x, y: mouseY - b.y };
          lastMousePos = { x: mouseX, y: mouseY };
          break;
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (activeBubble) {
        activeBubble.x = mouseX - dragOffset.x;
        activeBubble.y = mouseY - dragOffset.y;

        // Calculate cursor drag velocity
        mouseVelocity = {
          x: mouseX - lastMousePos.x,
          y: mouseY - lastMousePos.y,
        };
        lastMousePos = { x: mouseX, y: mouseY };
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      if (activeBubble) {
        activeBubble.isDragging = false;
        // Throw with cursor speed limit
        activeBubble.vx = Math.max(-12, Math.min(12, mouseVelocity.x * 0.8));
        activeBubble.vy = Math.max(-12, Math.min(12, mouseVelocity.y * 0.8));
        activeBubble = null;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    resize();
    window.addEventListener('resize', resize);

    // Physics Update + Render loop
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      }
      for (let j = 0; j < height; j += 30) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(width, j); ctx.stroke();
      }

      // Physics loop
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];

        if (!b.isDragging) {
          // Gravitational pull towards mouse when mouse is clicked
          if (isMouseDown && !activeBubble) {
            const dx = mouseX - b.x;
            const dy = mouseY - b.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 5) {
              const pull = 0.25; // gravity force
              b.vx += (dx / dist) * pull;
              b.vy += (dy / dist) * pull;
            }
          }

          // Apply Gravity
          b.vy += 0.15;

          // Velocity Dampening (friction)
          b.vx *= 0.99;
          b.vy *= 0.99;

          // Apply Position updates
          b.x += b.vx;
          b.y += b.vy;

          // Border bounce collision detection
          const bounce = -0.75;
          // Left Wall
          if (b.x - b.radius < 0) {
            b.x = b.radius;
            b.vx *= bounce;
          }
          // Right Wall
          if (b.x + b.radius > width) {
            b.x = width - b.radius;
            b.vx *= bounce;
          }
          // Ceiling
          if (b.y - b.radius < 0) {
            b.y = b.radius;
            b.vy *= bounce;
          }
          // Floor
          if (b.y + b.radius > height) {
            b.y = height - b.radius;
            b.vy *= bounce;
            b.vx *= 0.96; // ground friction deceleration
          }
        }

        // Bubble-to-Bubble collision checks
        for (let j = i + 1; j < bubbles.length; j++) {
          const b2 = bubbles[j];
          const dist = Math.hypot(b2.x - b.x, b2.y - b.y);
          if (dist < b.radius + b2.radius) {
            resolveCollision(b, b2);
          }
        }

        // Draw glowing visual bubble
        ctx.save();
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(13, 18, 32, 0.85)';
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0; // reset shadow

        // Render skill text label
        ctx.font = '600 11px var(--font-sans)';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.name, b.x, b.y);

        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      <span
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '20px',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          pointerEvents: 'none',
        }}
      >
        [ THROW BUBBLES | HOLD CLICK FOR GRAVITY WELL ]
      </span>
    </div>
  );
};

export default PhysicsSandbox;
