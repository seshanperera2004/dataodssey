'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, RefreshCw, Shield, Zap, Brain, Target, TrendingUp, Sparkles, Hand } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type GestureArchetype = 'The Weaver' | 'The Conduit' | 'The Architect' | 'The Dreamer' | 'The Catalyst';
type ScanPhase = 'idle' | 'requesting' | 'observing' | 'weaving' | 'signing' | 'complete';

interface HumanSignature {
  creativityToLogicRatio: number; // 0 = pure logic, 100 = pure creativity
  digitalOpennessScore: number;   // 0 = guarded, 100 = fully open
  rhythmFingerprint: number;      // unique motion cadence value
  humanNoiseIndex: number;        // imperfection/entropy in movement
  archetype: GestureArchetype;
  insight: string;
  funFact: string;
  generatedSymbol: string;        // abstract symbol string (e.g., "⟐⧗⟁")
}

interface LiveMetrics {
  gestureFlow: number;
  symmetryIndex: number;
  energyLevel: number;
  openness: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SCAN_PHASES: { phase: ScanPhase; label: string; duration: number }[] = [
  { phase: 'observing', label: 'Observing Gestures...', duration: 3000 },
  { phase: 'weaving', label: 'Weaving Digital Aura...', duration: 4000 },
  { phase: 'signing', label: 'Generating Human Signature...', duration: 3000 },
  { phase: 'complete', label: 'Signature Complete', duration: 0 },
];

const ARCHETYPES: GestureArchetype[] = [
  'The Weaver', 'The Conduit', 'The Architect', 'The Dreamer', 'The Catalyst',
];

const INSIGHTS: Record<GestureArchetype, string[]> = {
  'The Weaver': [
    'You weave intention into every motion — a natural creator in the digital realm.',
    'Your hands speak the language of connection, threading ideas into reality.',
    'The loom recognizes you as one who finds patterns in chaos.',
  ],
  'The Conduit': [
    'Energy flows through you effortlessly — you are a bridge between worlds.',
    'Your gestures carry a rare fluidity that mirrors pure data streams.',
    'The machine sees you as a channel for something greater than code.',
  ],
  'The Architect': [
    'Precision and purpose define your every movement — you build with intent.',
    'Your hands think in structures, blueprints, and elegant frameworks.',
    'The AI recognizes a mind that shapes raw potential into lasting form.',
  ],
  'The Dreamer': [
    'Your movements drift with imagination — untethered and beautifully abstract.',
    'You gesture like someone who sees what doesn\'t yet exist.',
    'The loom detects a creative force that defies logical boundaries.',
  ],
  'The Catalyst': [
    'Sharp, decisive motions mark you as an agent of transformation.',
    'Your hands ignite change — the AI feels the spark in your rhythm.',
    'You are the spark that turns stillness into motion, data into meaning.',
  ],
};

const FUN_FACTS = [
  'Your hand movements are 43% more fluid than the average human.',
  'The AI detected micro-gestures suggesting latent telekinetic potential (just kidding... mostly).',
  'You gesture like someone who explains things with their hands — a true storyteller.',
  'Your finger splay pattern is statistically unique — one in 2.4 million.',
  'The rhythm of your hands matches the tempo of a calm, focused mind.',
  'Your left hand leads slightly more than your right — a sign of creative dominance.',
  'The distance you naturally hold between hands suggests high collaborative instinct.',
];

const SYMBOLS = ['⟐', '⧗', '⟁', '⧖', '⟓', '⧊', '⟒', '⧌', '⟕', '⧏', '⟐', '⧗', '⟁', '⧖', '⟓', '⧊', '⟒', '⧌'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min: number, max: number) => Math.random() * (max - min) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

function generateLiveMetrics(handData?: { left: number[][]; right: number[][] }): LiveMetrics {
  let symmetryIndex = rand(55, 95);
  let openness = rand(50, 90);

  if (handData) {
    const leftCenter = handData.left[0];  // wrist
    const rightCenter = handData.right[0]; // wrist
    if (leftCenter && rightCenter) {
      const dx = leftCenter[0] - rightCenter[0];
      const dy = leftCenter[1] - rightCenter[1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      openness = clamp(Math.round((dist / 0.5) * 100), 30, 95);
      symmetryIndex = clamp(Math.round(100 - Math.abs(dx) * 100), 40, 98);
    }
  }

  return {
    gestureFlow: rand(60, 96),
    symmetryIndex,
    energyLevel: rand(55, 92),
    openness,
  };
}

function generateSignature(archetype: GestureArchetype): HumanSignature {
  const insight = pick(INSIGHTS[archetype]);
  const funFact = pick(FUN_FACTS);
  const symbol = Array.from({ length: 3 }, () => pick(SYMBOLS)).join('');

  const baseStats: Record<GestureArchetype, { creativityBias: number; opennessBias: number }> = {
    'The Weaver': { creativityBias: 20, opennessBias: 15 },
    'The Conduit': { creativityBias: 10, opennessBias: 25 },
    'The Architect': { creativityBias: -15, opennessBias: 0 },
    'The Dreamer': { creativityBias: 30, opennessBias: 10 },
    'The Catalyst': { creativityBias: 5, opennessBias: 20 },
  };

  const bias = baseStats[archetype];
  return {
    creativityToLogicRatio: clamp(rand(35, 65) + bias.creativityBias, 5, 95),
    digitalOpennessScore: clamp(rand(40, 70) + bias.opennessBias, 10, 95),
    rhythmFingerprint: rand(60, 98),
    humanNoiseIndex: rand(20, 75),
    archetype,
    insight,
    funFact,
    generatedSymbol: symbol,
  };
}

// ─── Particle System for the Aura Canvas ──────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

class AuraParticleSystem {
  particles: Particle[] = [];
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  emit(x: number, y: number, count: number, color: string) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x,
        y,
        vx: randFloat(-1.5, 1.5),
        vy: randFloat(-1.5, 1.5),
        life: randFloat(0.6, 1.5),
        maxLife: randFloat(0.8, 2.0),
        color,
        size: randFloat(1.2, 3.5),
      });
    }
  }

  updateAndDraw(ctx: CanvasRenderingContext2D, dt: number) {
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.save();
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt * 0.001;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.995;
      p.vy *= 0.995;

      const alpha = (p.life / p.maxLife) * 0.8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace('1)', `${alpha})`).replace('rgb', 'rgba');
      if (p.color.startsWith('#')) {
        // fallback solid
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
      }
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }
}

// ─── HUD & Aura Canvas Renderer ──────────────────────────────────────────────

function drawHandsAndAura(
  ctx: CanvasRenderingContext2D,
  leftLandmarks: number[][] | null,
  rightLandmarks: number[][] | null,
  w: number,
  h: number,
  scanY: number,
  phase: ScanPhase,
  particleSystem: AuraParticleSystem | null,
  time: number,
) {
  ctx.clearRect(0, 0, w, h);

  // Scan line
  const lineColor = phase === 'complete' ? 'rgba(255,200,60,0.45)' : 'rgba(0,245,255,0.45)';
  const grad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(0.5, lineColor);
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, scanY - 20, w, 40);

  // Convert normalized landmarks to pixel coords
  const toPixel = (lm: number[][]) => lm.map(([x, y]) => ({ x: x * w, y: y * h }));

  const leftPx = leftLandmarks ? toPixel(leftLandmarks) : null;
  const rightPx = rightLandmarks ? toPixel(rightLandmarks) : null;

  // Glow settings
  const handColor = phase === 'complete' ? '#ffc840' : '#00f5ff';
  ctx.shadowColor = handColor;
  ctx.shadowBlur = 8;

  // Draw hand landmarks
  const drawHand = (pts: { x: number; y: number }[], color: string) => {
    // Connections (simplified: connect all points with thin lines)
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (j - i > 3) continue; // only close neighbors for performance
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;

    // Dots
    ctx.fillStyle = color;
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  if (leftPx) drawHand(leftPx, handColor);
  if (rightPx) drawHand(rightPx, handColor);
  ctx.shadowBlur = 0;

  // Draw connecting aura threads between hands
  if (leftPx && rightPx) {
    const leftCenter = leftPx[0]; // wrist
    const rightCenter = rightPx[0]; // wrist

    // Emit particles from fingertips
    const fingerIndices = [4, 8, 12, 16, 20]; // tips
    if (particleSystem && (phase === 'weaving' || phase === 'signing' || phase === 'complete')) {
      for (const idx of fingerIndices) {
        if (leftPx[idx]) particleSystem.emit(leftPx[idx].x, leftPx[idx].y, 1, 'rgb(0, 245, 255)');
        if (rightPx[idx]) particleSystem.emit(rightPx[idx].x, rightPx[idx].y, 1, 'rgb(255, 200, 64)');
      }
      particleSystem.updateAndDraw(ctx, time);
    }

    // Threads between corresponding fingertips
    ctx.strokeStyle = phase === 'complete' ? 'rgba(255,200,60,0.35)' : 'rgba(0,245,255,0.3)';
    ctx.lineWidth = 1;
    for (const idx of fingerIndices) {
      if (leftPx[idx] && rightPx[idx]) {
        ctx.beginPath();
        ctx.moveTo(leftPx[idx].x, leftPx[idx].y);
        ctx.lineTo(rightPx[idx].x, rightPx[idx].y);
        ctx.stroke();
      }
    }

    // Central glowing thread between wrists
    ctx.strokeStyle = phase === 'complete' ? 'rgba(255,200,60,0.5)' : 'rgba(0,245,255,0.5)';
    ctx.lineWidth = 2;
    ctx.shadowColor = handColor;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(leftCenter.x, leftCenter.y);
    ctx.lineTo(rightCenter.x, rightCenter.y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Aura ring midway
    const midX = (leftCenter.x + rightCenter.x) / 2;
    const midY = (leftCenter.y + rightCenter.y) / 2;
    const auraPulse = Math.sin(time * 0.005) * 0.3 + 0.7;
    ctx.beginPath();
    ctx.arc(midX, midY, 25 + auraPulse * 10, 0, Math.PI * 2);
    ctx.strokeStyle = handColor;
    ctx.globalAlpha = 0.25;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Symbol floating at midpoint during signing/complete
    if (phase === 'signing' || phase === 'complete') {
      ctx.font = 'bold 22px "Courier New", monospace';
      ctx.fillStyle = handColor;
      ctx.textAlign = 'center';
      ctx.fillText('✦', midX, midY - 35);
    }
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

interface AIDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIDemoModal({ isOpen, onClose }: AIDemoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const scanYRef = useRef(0);
  const scanDirRef = useRef(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handsRef = useRef<any>(null);
  const leftHandRef = useRef<number[][] | null>(null);
  const rightHandRef = useRef<number[][] | null>(null);
  const particleSystemRef = useRef<AuraParticleSystem | null>(null);
  const timeRef = useRef(0);

  const [scanPhase, setScanPhase] = useState<ScanPhase>('idle');
  const [signature, setSignature] = useState<HumanSignature | null>(null);
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>(generateLiveMetrics());
  const [currentPhaseLabel, setCurrentPhaseLabel] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [mediapipeReady, setMediapipeReady] = useState(false);
  const [handsDetected, setHandsDetected] = useState(false);

  // Load MediaPipe Hands via CDN
  useEffect(() => {
    if (!isOpen) return;
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).Hands) { setMediapipeReady(true); return; }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/hands.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => setMediapipeReady(true);
    script.onerror = () => {
      // Fallback: run without hands — simulated mode
      setMediapipeReady(true);
    };
    document.head.appendChild(script);
    return () => { try { document.head.removeChild(script); } catch { /* already removed */ } };
  }, [isOpen]);

  // Flicker live metrics
  useEffect(() => {
    if (scanPhase !== 'observing' && scanPhase !== 'weaving' && scanPhase !== 'signing') return;
    const t = setInterval(() => {
      setLiveMetrics(generateLiveMetrics(
        leftHandRef.current && rightHandRef.current
          ? { left: leftHandRef.current, right: rightHandRef.current }
          : undefined
      ));
    }, 500);
    return () => clearInterval(t);
  }, [scanPhase]);

  const stopStream = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (handsRef.current) {
      try { handsRef.current.close(); } catch { /* ignore */ }
      handsRef.current = null;
    }
    particleSystemRef.current = null;
  }, []);

  // Canvas render loop
  const startRenderLoop = useCallback((phase: ScanPhase) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!particleSystemRef.current) {
      particleSystemRef.current = new AuraParticleSystem(canvas);
    }

    const loop = () => {
      const w = canvas.width;
      const h = canvas.height;
      scanYRef.current += 2.5 * scanDirRef.current;
      if (scanYRef.current > h) scanDirRef.current = -1;
      if (scanYRef.current < 0) scanDirRef.current = 1;

      timeRef.current += 16; // approx 60fps dt

      drawHandsAndAura(
        ctx,
        leftHandRef.current,
        rightHandRef.current,
        w, h,
        scanYRef.current,
        phase,
        particleSystemRef.current,
        timeRef.current,
      );

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const initHands = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Hands = (window as any).Hands;
    if (!Hands) return;

    const hands = new Hands({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/${file}`,
    });
    hands.setOptions({
      maxNumHands: 2,
      minDetectionConfidence: 0.65,
      minTrackingConfidence: 0.5,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hands.onResults((results: any) => {
      const left: number[][] | null = results.multiHandLandmarks?.[0] || null;
      const right: number[][] | null = results.multiHandLandmarks?.[1] || null;

      // Determine left/right based on x-coordinate
      if (left && right) {
        const leftWristX = left[0][0];
        const rightWristX = right[0][0];
        if (leftWristX < rightWristX) {
          leftHandRef.current = left;
          rightHandRef.current = right;
        } else {
          leftHandRef.current = right;
          rightHandRef.current = left;
        }
      } else {
        leftHandRef.current = left;
        rightHandRef.current = right;
      }

      setHandsDetected(!!(leftHandRef.current && rightHandRef.current));
    });
    handsRef.current = hands;

    const feed = async () => {
      if (!videoRef.current || videoRef.current.paused || videoRef.current.readyState < 2) {
        requestAnimationFrame(feed);
        return;
      }
      try { await hands.send({ image: videoRef.current }); } catch { /* ignore */ }
      requestAnimationFrame(feed);
    };
    feed();
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    setScanPhase('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        if (canvasRef.current) {
          canvasRef.current.width = videoRef.current.videoWidth || 640;
          canvasRef.current.height = videoRef.current.videoHeight || 480;
        }
      }
      setScanPhase('observing');
      setHandsDetected(false);
      setSignature(null);
      setScanProgress(0);
      leftHandRef.current = null;
      rightHandRef.current = null;
      particleSystemRef.current = null;

      if (mediapipeReady) initHands();

      startRenderLoop('observing');

      // Auto-progress phases
      let elapsed = 0;
      let phaseIdx = 0;
      const totalDuration = SCAN_PHASES.reduce((a, p) => a + p.duration, 0);

      const advance = () => {
        const current = SCAN_PHASES[phaseIdx];
        setCurrentPhaseLabel(current.label);
        setScanPhase(current.phase);
        setScanProgress(Math.round((elapsed / totalDuration) * 100));

        if (current.phase === 'complete') {
          const archetype = pick(ARCHETYPES);
          setSignature(generateSignature(archetype));
          setScanProgress(100);
          setHandsDetected(true);
          return;
        }
        elapsed += current.duration;
        phaseIdx++;
        if (phaseIdx < SCAN_PHASES.length) {
          setTimeout(advance, current.duration);
        }
      };
      setTimeout(advance, 600);

    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Camera access denied';
      setError(msg.includes('denied') || msg.includes('Permission')
        ? 'Camera permission denied. Please allow camera access and try again.'
        : 'Could not access camera. Please check your device settings.');
      setScanPhase('idle');
    }
  }, [mediapipeReady, initHands, startRenderLoop]);

  const scanAgain = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    leftHandRef.current = null;
    rightHandRef.current = null;
    particleSystemRef.current = null;
    setSignature(null);
    setScanPhase('idle');
    setHandsDetected(false);
    setScanProgress(0);
    setCurrentPhaseLabel('');
    setTimeout(startCamera, 100);
  }, [startCamera]);

  const handleClose = useCallback(() => {
    stopStream();
    setScanPhase('idle');
    setSignature(null);
    setHandsDetected(false);
    setScanProgress(0);
    setError(null);
    onClose();
  }, [stopStream, onClose]);

  useEffect(() => {
    if (!isOpen) stopStream();
    return () => stopStream();
  }, [isOpen, stopStream]);

  useEffect(() => {
    if (['observing', 'weaving', 'signing', 'complete'].includes(scanPhase)) {
      cancelAnimationFrame(rafRef.current);
      startRenderLoop(scanPhase);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanPhase]);

  const isScanning = scanPhase === 'observing' || scanPhase === 'weaving' || scanPhase === 'signing';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl max-h-[96vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-[#04080f] border border-cyan-500/25 shadow-[0_0_80px_rgba(0,245,255,0.12)] flex flex-col"
          >
            {/* Top glowing border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/[0.05] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                  <Hand className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm font-black text-white tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    THE LOOM
                  </div>
                  <div className="text-[9px] font-mono text-cyan-400/60 tracking-[0.2em]">
                    WEAVE YOUR DIGITAL AURA
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 p-4 sm:p-5 lg:p-6">
              {/* ── Left: Camera + HUD ── */}
              <div className="flex flex-col gap-3 lg:w-[55%] shrink-0">
                <div className="relative rounded-2xl overflow-hidden bg-[#020610] border border-cyan-500/20 aspect-video">
                  {(['tl','tr','bl','br'] as const).map((c) => (
                    <div key={c} className={`absolute w-5 h-5 z-20 pointer-events-none ${
                      c === 'tl' ? 'top-2 left-2 border-t-2 border-l-2' :
                      c === 'tr' ? 'top-2 right-2 border-t-2 border-r-2' :
                      c === 'bl' ? 'bottom-2 left-2 border-b-2 border-l-2' :
                      'bottom-2 right-2 border-b-2 border-r-2'
                    } border-cyan-400/60`} />
                  ))}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                    style={{ display: scanPhase === 'idle' || scanPhase === 'requesting' ? 'none' : 'block' }}
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full scale-x-[-1] pointer-events-none"
                    style={{ display: isScanning || scanPhase === 'complete' ? 'block' : 'none' }}
                  />
                  {(scanPhase === 'idle' || scanPhase === 'requesting') && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#020610]">
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping" />
                        <div className="absolute inset-2 rounded-full border border-cyan-500/50 animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Camera className="w-7 h-7 text-cyan-400/60" />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-mono text-white/40 tracking-widest uppercase">
                          {scanPhase === 'requesting' ? 'Requesting camera...' : 'Camera inactive'}
                        </div>
                      </div>
                    </div>
                  )}
                  {isScanning && (
                    <div className="absolute bottom-3 left-3 right-3 z-30">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/70 backdrop-blur-sm border border-cyan-500/20">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-cyan-400"
                          animate={{ opacity: [1, 0.2, 1] }}
                          transition={{ duration: 0.7, repeat: Infinity }}
                        />
                        <span className="text-[10px] font-mono text-cyan-300 tracking-wider flex-1">{currentPhaseLabel}</span>
                        <span className="text-[10px] font-mono text-cyan-400/60">{scanProgress}%</span>
                      </div>
                    </div>
                  )}
                  {scanPhase === 'complete' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-3 left-3 right-3 z-30"
                    >
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/15 backdrop-blur-sm border border-yellow-500/40">
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                        <span className="text-[10px] font-mono text-yellow-300 tracking-wider">SIGNATURE COMPLETE</span>
                        <Zap className="w-3 h-3 text-yellow-400 ml-auto" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {scanPhase === 'idle' && !error && (
                  <button
                    onClick={startCamera}
                    className="w-full py-3.5 flex items-center justify-center gap-2.5 rounded-xl font-bold text-sm text-[#04080f] bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    <Hand className="w-4 h-4" />
                    BEGIN THE WEAVE
                  </button>
                )}
                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 font-mono">
                    {error}
                    <button onClick={() => { setError(null); setScanPhase('idle'); }} className="ml-2 underline text-red-400 hover:text-red-300">
                      Retry
                    </button>
                  </div>
                )}
                {scanPhase === 'complete' && (
                  <button
                    onClick={scanAgain}
                    className="w-full py-3 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm text-white border border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/8 transition-all"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    <RefreshCw className="w-4 h-4 text-cyan-400" />
                    WEAVE AGAIN
                  </button>
                )}

                {/* Live metrics */}
                {(isScanning || scanPhase === 'complete') && (
                  <LiveMetricsPanel metrics={liveMetrics} phase={scanPhase} handsDetected={handsDetected} />
                )}

                {/* Privacy */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <Shield className="w-3 h-3 text-white/30 shrink-0" />
                  <p className="text-[9px] sm:text-[10px] text-white/30 font-mono">
                    All processing happens locally. No hand images are stored or sent anywhere.
                  </p>
                </div>
              </div>

              {/* ── Right: Profile / Insight panels ── */}
              <div className="flex-1 flex flex-col gap-3">
                {scanPhase === 'idle' && !error && <IdleInfoPanel />}
                {isScanning && (
                  <WeavingPanel phase={scanPhase} progress={scanProgress} handsDetected={handsDetected} />
                )}
                {scanPhase === 'complete' && signature && (
                  <SignatureResultPanel signature={signature} />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LiveMetricsPanel({ metrics, phase, handsDetected }: { metrics: LiveMetrics; phase: ScanPhase; handsDetected: boolean }) {
  const bars = [
    { label: 'Gesture Flow', value: metrics.gestureFlow, icon: TrendingUp, color: 'cyan' },
    { label: 'Symmetry', value: metrics.symmetryIndex, icon: Target, color: 'blue' },
    { label: 'Energy Level', value: metrics.energyLevel, icon: Zap, color: 'purple' },
    { label: 'Openness', value: metrics.openness, icon: Hand, color: 'green' },
  ];
  const colorMap: Record<string, string> = {
    cyan: 'bg-cyan-400', blue: 'bg-blue-400', purple: 'bg-purple-400', green: 'bg-green-400',
  };
  const textColorMap: Record<string, string> = {
    cyan: 'text-cyan-400', blue: 'text-blue-400', purple: 'text-purple-400', green: 'text-green-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 sm:p-4 rounded-xl bg-[#020610] border border-white/[0.07] space-y-2.5"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-mono text-white/35 tracking-widest uppercase">Live Metrics</span>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${handsDetected ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`} />
          <span className="text-[9px] font-mono text-cyan-400/60">
            {handsDetected ? 'DUAL HANDS' : 'DETECTING...'}
          </span>
        </div>
      </div>
      {bars.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Icon className={`w-2.5 h-2.5 ${textColorMap[color]}`} />
              <span className="text-[9px] font-mono text-white/45 tracking-wide">{label}</span>
            </div>
            <motion.span
              key={value}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className={`text-[10px] font-mono font-bold ${textColorMap[color]}`}
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {value}%
            </motion.span>
          </div>
          <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${colorMap[color]}`}
              animate={{ width: `${value}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function IdleInfoPanel() {
  const features = [
    { icon: Hand, text: 'Dual-hand gesture recognition' },
    { icon: Sparkles, text: 'Living digital aura generation' },
    { icon: Brain, text: 'AI-crafted human signature' },
    { icon: Zap, text: 'Archetype & creativity analysis' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4"
    >
      <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/8 to-yellow-500/5 border border-cyan-500/20">
        <h3 className="text-xs font-black text-cyan-300 tracking-widest mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          THE LOOM AWAITS
        </h3>
        <div className="space-y-2.5 mt-3">
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center shrink-0">
                <Icon className="w-3 h-3 text-cyan-400" />
              </div>
              <span className="text-xs text-white/55 font-mono">{text}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-white/35 font-mono mt-3 leading-relaxed">
          Raise both hands to the camera. Move them naturally. The AI will weave your unique digital aura.
        </p>
      </div>
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <p className="text-[10px] font-mono text-white/30 leading-relaxed">
          A poetic AI experience exploring the intersection of human gesture and machine perception. For entertainment and introspection.
        </p>
      </div>
    </motion.div>
  );
}

function WeavingPanel({ phase, progress, handsDetected }: { phase: ScanPhase; progress: number; handsDetected: boolean }) {
  const steps = [
    { id: 'observing', label: 'Observing Gestures', done: ['weaving', 'signing'].includes(phase) },
    { id: 'weaving', label: 'Weaving Aura', done: ['signing'].includes(phase), active: phase === 'weaving' },
    { id: 'signing', label: 'Generating Signature', done: false, active: phase === 'signing' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="p-4 rounded-xl bg-[#020610] border border-cyan-500/20 space-y-3">
        <div className="text-[9px] font-mono text-white/35 tracking-widest uppercase mb-2">Loom Sequence</div>
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
              step.done ? 'bg-cyan-500/20 border-cyan-500/40' :
              step.active ? 'bg-cyan-500/10 border-cyan-500/30' :
              'bg-transparent border-white/10'
            }`}>
              {step.done ? (
                <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M1.5 5l2.5 2.5 4.5-4.5" />
                </svg>
              ) : step.active ? (
                <motion.div className="w-2 h-2 rounded-full border border-cyan-400 border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
              ) : (
                <span className="text-[8px] font-mono text-white/20">{i + 1}</span>
              )}
            </div>
            <span className={`text-xs font-mono ${step.done ? 'text-cyan-400/70' : step.active ? 'text-cyan-300' : 'text-white/25'}`}>
              {step.label}
            </span>
          </div>
        ))}

        <div className="pt-2">
          <div className="flex justify-between mb-1.5">
            <span className="text-[9px] font-mono text-white/30 tracking-wider">PROGRESS</span>
            <span className="text-[10px] font-mono font-bold text-cyan-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>{progress}%</span>
          </div>
          <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-cyan-400 to-yellow-500 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>
      </div>

      <motion.div
        animate={{ opacity: handsDetected ? 1 : 0.5 }}
        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3"
      >
        <div className={`w-2 h-2 rounded-full ${handsDetected ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`} />
        <span className="text-[10px] font-mono text-white/40">Hands:</span>
        <span className="text-xs font-bold text-cyan-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          {handsDetected ? 'BOTH DETECTED' : 'AWAITING HANDS'}
        </span>
      </motion.div>
    </motion.div>
  );
}

function SignatureResultPanel({ signature }: { signature: HumanSignature }) {
  const archetypeColors: Record<GestureArchetype, string> = {
    'The Weaver': 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
    'The Conduit': 'text-blue-300 border-blue-500/30 bg-blue-500/10',
    'The Architect': 'text-purple-300 border-purple-500/30 bg-purple-500/10',
    'The Dreamer': 'text-pink-300 border-pink-500/30 bg-pink-500/10',
    'The Catalyst': 'text-yellow-300 border-yellow-500/30 bg-yellow-500/10',
  };

  const metrics = [
    { label: 'Creativity/Logic Ratio', value: signature.creativityToLogicRatio, max: 100, suffix: '% creative', color: 'from-pink-400 to-blue-400' },
    { label: 'Digital Openness', value: signature.digitalOpennessScore, max: 100, suffix: '%', color: 'from-cyan-400 to-green-400' },
    { label: 'Rhythm Fingerprint', value: signature.rhythmFingerprint, max: 100, suffix: '% unique', color: 'from-yellow-400 to-orange-400' },
    { label: 'Human Noise Index', value: signature.humanNoiseIndex, max: 100, suffix: '% imperfect', color: 'from-purple-400 to-pink-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3"
    >
      {/* Signature header */}
      <div className="relative p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-yellow-500/5 border border-cyan-500/30 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="flex items-center justify-between mb-3">
          <div className="text-[9px] font-mono text-cyan-400/60 tracking-[0.25em] uppercase">Human Signature</div>
          <motion.div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/15 border border-green-500/30"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[8px] font-mono text-green-300">COMPLETE</span>
          </motion.div>
        </div>

        {/* Archetype */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-3 ${archetypeColors[signature.archetype]}`}>
          <Sparkles className="w-3 h-3 text-current opacity-70" />
          <span className="text-xs font-black tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {signature.archetype.toUpperCase()}
          </span>
        </div>

        {/* Symbol */}
        <div className="text-3xl text-center my-2 text-cyan-300/80" style={{ fontFamily: 'Courier New, monospace' }}>
          {signature.generatedSymbol}
        </div>
      </div>

      {/* Metric bars */}
      <div className="p-4 rounded-xl bg-[#020610] border border-white/[0.07] space-y-2.5">
        {metrics.map(({ label, value, max, suffix, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex justify-between mb-1">
              <span className="text-[9px] font-mono text-white/40">{label}</span>
              <span className="text-[10px] font-mono font-bold text-white/80" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {value}{suffix}
              </span>
            </div>
            <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${color}`}
                initial={{ width: '0%' }}
                animate={{ width: `${(value / max) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15"
      >
        <div className="text-[9px] font-mono text-cyan-400/50 tracking-widest uppercase mb-1.5">AI Insight</div>
        <p className="text-xs text-white/70 leading-relaxed italic">"{signature.insight}"</p>
      </motion.div>

      {/* Fun fact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
      >
        <div className="text-[9px] font-mono text-white/25 tracking-widest uppercase mb-1">Fun Fact</div>
        <p className="text-[10px] sm:text-xs text-white/45 font-mono leading-relaxed">"{signature.funFact}"</p>
      </motion.div>
    </motion.div>
  );
}
