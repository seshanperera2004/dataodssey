'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number; y: number; vx: number; vy: number;
  radius: number; pulse: number; pulseSpeed: number;
}
interface Particle {
  x: number; y: number; vx: number; vy: number;
  alpha: number; size: number; color: string;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    let animId: number;
    let nodes: Node[] = [];
    let particles: Particle[] = [];
    let time = 0;
    const mouse = { x: -9999, y: -9999 };
    const NODE_COUNT = 50;
    const PARTICLE_COUNT = 100;
    const CONNECTION_DIST = 155;
    const COLORS = ['#00f5ff', '#0066ff', '#8b5cf6', '#00f5ff'];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initNodes();
      initParticles();
    }

    function initNodes() {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2.5 + 1,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
        });
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          alpha: Math.random() * 0.4 + 0.1,
          size: Math.random() * 1.5 + 0.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }

    function drawBackground() {
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const orbs = [
        { cx: canvas.width * 0.5, cy: canvas.height * 0.4, r: canvas.height * 0.7, color: 'rgba(0,245,255,0.025)' },
        { cx: canvas.width * 0.8, cy: canvas.height * 0.2, r: canvas.height * 0.5, color: 'rgba(0,102,255,0.03)' },
        { cx: canvas.width * 0.15, cy: canvas.height * 0.7, r: canvas.height * 0.45, color: 'rgba(139,92,246,0.025)' },
      ];
      orbs.forEach(({ cx, cy, r, color }) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, color);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
    }

    function drawGrid() {
      ctx.strokeStyle = 'rgba(0,245,255,0.025)';
      ctx.lineWidth = 0.5;
      const gap = 80;
      for (let px = 0; px < canvas.width; px += gap) {
        ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, canvas.height); ctx.stroke();
      }
      for (let py = 0; py < canvas.height; py += gap) {
        ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(canvas.width, py); ctx.stroke();
      }
    }

    function drawParticles() {
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const hex = Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + hex;
        ctx.fill();
      });
    }

    function drawNodes() {
      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            const g = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            g.addColorStop(0, `rgba(0,102,255,${alpha})`);
            g.addColorStop(0.5, `rgba(0,245,255,${alpha * 0.8})`);
            g.addColorStop(1, `rgba(139,92,246,${alpha})`);
            ctx.beginPath();
            ctx.strokeStyle = g;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((node) => {
        node.pulse += node.pulseSpeed;
        const pf = Math.sin(node.pulse) * 0.5 + 0.5;
        const r = node.radius + pf * 1.5;

        // Mouse attraction
        const mdx = mouse.x - node.x;
        const mdy = mouse.y - node.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) { node.vx += (mdx / mdist) * 0.04; node.vy += (mdy / mdist) * 0.04; }

        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 1.2) { node.vx *= 0.9; node.vy *= 0.9; }

        node.x += node.vx; node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 6);
        glow.addColorStop(0, `rgba(0,245,255,${0.12 * pf})`);
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        const core = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r);
        core.addColorStop(0, `rgba(255,255,255,${0.7 + pf * 0.3})`);
        core.addColorStop(0.5, `rgba(0,245,255,${0.8 + pf * 0.2})`);
        core.addColorStop(1, 'rgba(0,102,255,0.6)');
        ctx.fillStyle = core;
        ctx.fill();
      });
    }

    function drawDataStream() {
      time += 0.008;
      for (let i = 0; i < nodes.length; i += 5) {
        for (let j = i + 1; j < nodes.length; j += 5) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST * 0.8) {
            const t = ((time * 0.6 + i * 0.3 + j * 0.1) % 1);
            const px = nodes[j].x + dx * t;
            const py = nodes[j].y + dy * t;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,245,255,${0.6 - t * 0.5})`;
            ctx.fill();
          }
        }
      }
    }

    function drawScanLine() {
      const sy = ((time * 80) % (canvas.height + 40)) - 20;
      const g = ctx.createLinearGradient(0, sy - 20, 0, sy + 20);
      g.addColorStop(0, 'transparent');
      g.addColorStop(0.5, 'rgba(0,245,255,0.035)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, sy - 20, canvas.width, 40);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      drawGrid();
      drawParticles();
      drawDataStream();
      drawNodes();
      drawScanLine();
      animId = requestAnimationFrame(animate);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    animate();
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
