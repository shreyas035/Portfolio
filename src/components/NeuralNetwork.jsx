import { useEffect, useRef, useState } from 'react';

const NeuralNetwork = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const animationRef = useRef(null);

  // Network structure: inputs, hidden layer nodes, outputs
  const layerStructure = [4, 5, 3];
  const nodeLabels = [
    // Layer 0 (Input)
    ['Camera Feeds', 'Telemetry Sensors', 'NLP Prompts', 'Tabular Data'],
    // Layer 1 (Hidden)
    ['Convolutions', 'Activation Layer', 'Weights Matrix', 'Feature Mapping', 'Biases Filter'],
    // Layer 2 (Output)
    ['Object Boundaries', 'Motor Command', 'Confidence Score'],
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let nodes = [];
    let connections = [];
    let pulses = [];

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 380;
      canvas.width = width;
      canvas.height = height;
      initNetwork();
    };

    const initNetwork = () => {
      nodes = [];
      connections = [];
      const numLayers = layerStructure.length;
      const layerSpacing = width / (numLayers + 0.6);
      const startX = layerSpacing * 0.8;

      // Create Nodes
      for (let layerIdx = 0; layerIdx < numLayers; layerIdx++) {
        const numNodes = layerStructure[layerIdx];
        const nodeSpacing = height / (numNodes + 1);

        for (let nodeIdx = 0; nodeIdx < numNodes; nodeIdx++) {
          nodes.push({
            id: `${layerIdx}-${nodeIdx}`,
            layer: layerIdx,
            index: nodeIdx,
            x: startX + layerIdx * layerSpacing,
            y: nodeSpacing * (nodeIdx + 1),
            radius: 12,
            label: nodeLabels[layerIdx][nodeIdx] || `Node ${nodeIdx + 1}`,
            pulseCharge: 0,
          });
        }
      }

      // Create Connections (Synapses)
      for (let i = 0; i < nodes.length; i++) {
        const source = nodes[i];
        if (source.layer === numLayers - 1) continue; // no outputs for final layer

        const targets = nodes.filter((n) => n.layer === source.layer + 1);
        for (let j = 0; j < targets.length; j++) {
          const target = targets[j];
          connections.push({
            id: `${source.id}=>${target.id}`,
            source,
            target,
            weight: Math.random() * 0.8 + 0.2, // synapse opacity/weight
          });
        }
      }
    };

    // Inject pulses through the network starting from a specific node
    const triggerFeedForward = (startNode) => {
      const feed = (currentNode, delay = 0) => {
        // Highlight node
        setTimeout(() => {
          currentNode.pulseCharge = 1;
        }, delay);

        // Find outgoing connections
        const outgoing = connections.filter((c) => c.source.id === currentNode.id);
        outgoing.forEach((c) => {
          // Spawn pulse
          setTimeout(() => {
            pulses.push({
              connection: c,
              progress: 0,
              speed: 0.02 + Math.random() * 0.01,
            });
          }, delay);

          // Recursively feed forward next node
          feed(c.target, delay + 800); // 800ms travel delay
        }, delay);
      };

      feed(startNode);
    };

    // Listen to canvas clicks
    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Find if we clicked on a node
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const dist = Math.hypot(clickX - node.x, clickY - node.y);
        if (dist <= node.radius + 6) {
          triggerFeedForward(node);
          break;
        }
      }
    };

    // Mouse hover tracking
    const handleCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let foundNode = null;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const dist = Math.hypot(mouseX - node.x, mouseY - node.y);
        if (dist <= node.radius + 6) {
          foundNode = node;
          break;
        }
      }
      setHoveredNode(foundNode);
    };

    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleCanvasMouseMove);

    resize();
    window.addEventListener('resize', resize);

    // Feed forward loop randomly in the background
    const randomFeedInterval = setInterval(() => {
      const inputNodes = nodes.filter((n) => n.layer === 0);
      if (inputNodes.length) {
        const randomInput = inputNodes[Math.floor(Math.random() * inputNodes.length)];
        triggerFeedForward(randomInput);
      }
    }, 4000);

    // Canvas animation tick
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Connection Lines (Synapses)
      connections.forEach((c) => {
        const isHoveredPath =
          hoveredNode && (hoveredNode.id === c.source.id || hoveredNode.id === c.target.id);
        ctx.beginPath();
        ctx.moveTo(c.source.x, c.source.y);
        ctx.lineTo(c.target.x, c.target.y);

        if (isHoveredPath) {
          ctx.strokeStyle = 'rgba(0, 242, 254, 0.7)'; // highlight connection cyan
          ctx.lineWidth = 2.5;
        } else {
          ctx.strokeStyle = `rgba(157, 78, 221, ${c.weight * 0.18})`; // purple connection
          ctx.lineWidth = 1;
        }
        ctx.stroke();
      });

      // Update & Draw Pulses (Signals)
      pulses = pulses.filter((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          // Charge target node upon arrival
          p.connection.target.pulseCharge = 1;
          return false; // delete pulse
        }

        // Draw pulse
        const currX = p.connection.source.x + (p.connection.target.x - p.connection.source.x) * p.progress;
        const currY = p.connection.source.y + (p.connection.target.y - p.connection.source.y) * p.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe'; // glowing cyan signal
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset glow

        return true;
      });

      // Draw Nodes
      nodes.forEach((n) => {
        const isNodeHovered = hoveredNode && hoveredNode.id === n.id;

        // Node charge dissipation
        if (n.pulseCharge > 0) {
          n.pulseCharge -= 0.05;
        }

        // Outer glow on hover or charge
        if (isNodeHovered || n.pulseCharge > 0) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 6, 0, Math.PI * 2);
          ctx.fillStyle = isNodeHovered ? 'rgba(0, 242, 254, 0.12)' : 'rgba(157, 78, 221, 0.12)';
          ctx.fill();
        }

        // Draw node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = isNodeHovered
          ? '#00f2fe'
          : n.pulseCharge > 0
            ? '#f72585'
            : 'rgba(13, 18, 32, 0.9)'; // background dark
        ctx.strokeStyle = isNodeHovered ? '#ffffff' : '#9d4edd';
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();

        // Node label
        ctx.font = '500 11px var(--font-sans)';
        ctx.fillStyle = isNodeHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = n.layer === 0 ? 'right' : n.layer === layerStructure.length - 1 ? 'left' : 'center';
        const textX = n.layer === 0 ? n.x - 20 : n.layer === layerStructure.length - 1 ? n.x + 20 : n.x;
        const textY = n.layer === 0 || n.layer === layerStructure.length - 1 ? n.y + 4 : n.y - 20;
        ctx.fillText(n.label, textX, textY);
      });

      animationRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('mousemove', handleCanvasMouseMove);
      cancelAnimationFrame(animationRef.current);
      clearInterval(randomFeedInterval);
    };
  }, [hoveredNode]);

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
        [ CLICK NODES TO FEED FORWARD ]
      </span>
    </div>
  );
};

export default NeuralNetwork;
