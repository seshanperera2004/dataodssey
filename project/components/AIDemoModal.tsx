'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, RefreshCw, Shield, Zap, Brain, Target, TrendingUp } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Emotion = 'Happy' | 'Surprised' | 'Neutral' | 'Focused';
type ScanPhase = 'idle' | 'requesting' | 'detecting' | 'analyzing' | 'profiling' | 'complete';

interface AIProfile {
  innovationIndex: number;
  dataSciencePotential: 'HIGH' | 'VERY HIGH' | 'EXCEPTIONAL';
  hackathonSurvival: number;
  curiosityScore: number;
  focusScore: number;
  aiCuriosityScore: number;
  problemSolvingPotential: number;
  detectedEmotion: Emotion;
  funFact: string;
  insight: string;
}

interface LiveMetrics {
  focusScore: number;
  innovationIndex: number;
  aiCuriosityScore: number;
  problemSolving: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SCAN_PHASES: { phase: ScanPhase; label: string; duration: number }[] = [
  { phase: 'detecting', label: 'Face Detected', duration: 1200 },
  { phase: 'analyzing', label: 'Analyzing...', duration: 1600 },
  { phase: 'profiling', label: 'Generating AI Profile...', duration: 1800 },
  { phase: 'complete', label: 'Analysis Complete', duration: 0 },
];

const FUN_FACTS = [
  'You would probably ask ChatGPT before Googling.',
  'You likely debug code at 2 AM with cold coffee.',
  'Your brain runs on parallel threads — classic engineer.',
  'You name your variables better than most people name their pets.',
  'You\'ve definitely thought about automating your morning routine.',
  'Stack Overflow is your second home.',
  'You mentally calculate time complexity in real life.',
  'You think in JSON even during conversations.',
];

const INSIGHTS = [
  'Your focus level is exceptional. You look like a future Data Scientist.',
  'AI predicts you would survive a hackathon with 3 hours of sleep.',
  'Your expression suggests strong problem-solving energy.',
  'Detected innovation potential: HIGH. KDU material confirmed.',
  'Neural pattern analysis reveals a natural data explorer.',
  'Cognitive signature matches a top-tier AI researcher profile.',
];

const POTENTIAL_LABELS: ('HIGH' | 'VERY HIGH' | 'EXCEPTIONAL')[] = ['HIGH', 'VERY HIGH', 'EXCEPTIONAL'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

function generateProfile(emotion: Emotion): AIProfile {
  const base = emotion === 'Happy' ? 88 : emotion === 'Focused' ? 92 : emotion === 'Surprised' ? 82 : 78;
  return {
    innovationIndex: rand(base - 4, Math.min(base + 8, 99)),
    dataSciencePotential: pick(POTENTIAL_LABELS),
    hackathonSurvival: rand(85, 99),
    curiosityScore: rand(base - 3, Math.min(base + 10, 99)),
    focusScore: rand(base - 5, Math.min(base + 6, 99)),
    aiCuriosityScore: rand(base - 2, Math.min(base + 9, 99)),
    problemSolvingPotential: rand(base - 4, Math.min(base + 7, 99)),
    detectedEmotion: emotion,
    funFact: pick(FUN_FACTS),
    insight: pick(INSIGHTS),
  };
}

function generateLiveMetrics(): LiveMetrics {
  return {
    focusScore: rand(70, 96),
    innovationIndex: rand(72, 98),
    aiCuriosityScore: rand(68, 95),
    problemSolving: rand(75, 97),
  };
}

// ─── HUD Canvas overlay ───────────────────────────────────────────────────────

function drawHUD(
  ctx: CanvasRenderingContext2D,
  landmarks: { x: number; y: number }[],
  w: number,
  h: number,
  scanY: number,
  phase: ScanPhase,
) {
  ctx.clearRect(0, 0, w, h);

  // Scan line
  const lineColor = phase === 'complete' ? 'rgba(0,255,128,0.55)' : 'rgba(0,245,255,0.55)';
  const grad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(0.5, lineColor);
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, scanY - 20, w, 40);

  if (landmarks.length === 0) return;

  // Scale landmarks from [0,1] to canvas size
  const pts = landmarks.map((p) => ({ x: p.x * w, y: p.y * h }));

  // Face mesh dots
  const dotColor = phase === 'complete' ? '#00ff80' : '#00f5ff';
  ctx.fillStyle = dotColor;
  ctx.shadowColor = dotColor;
  ctx.shadowBlur = 4;
  for (const p of pts) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;

  // Bounding box
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const bx = Math.min(...xs) - 18;
  const by = Math.min(...ys) - 18;
  const bw = Math.max(...xs) - bx + 18;
  const bh = Math.max(...ys) - by + 18;
  const cornerLen = 18;
  const boxColor = phase === 'complete' ? '#00ff80' : '#00f5ff';

  ctx.strokeStyle = boxColor;
  ctx.lineWidth = 2;
  ctx.shadowColor = boxColor;
  ctx.shadowBlur = 8;

  // Corner brackets
  const corners: [number, number, number, number, number, number][] = [
    [bx, by, bx + cornerLen, by, bx, by + cornerLen],
    [bx + bw, by, bx + bw - cornerLen, by, bx + bw, by + cornerLen],
    [bx, by + bh, bx + cornerLen, by + bh, bx, by + bh - cornerLen],
    [bx + bw, by + bh, bx + bw - cornerLen, by + bh, bx + bw, by + bh - cornerLen],
  ];
  for (const [x1, y1, x2, y2, x3, y3] of corners) {
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x3, y3);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;

  // Status label above box
  ctx.font = 'bold 11px "Courier New", monospace';
  ctx.fillStyle = boxColor;
  ctx.shadowColor = boxColor;
  ctx.shadowBlur = 6;
  ctx.fillText('FACE LOCKED', bx, by - 8);
  ctx.shadowBlur = 0;

  // Cross-hair on nose bridge (landmark ~6)
  if (pts[6]) {
    const cx = pts[6].x;
    const cy = pts[6].y;
    ctx.strokeStyle = 'rgba(0,245,255,0.8)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy);
    ctx.lineTo(cx + 10, cy);
    ctx.moveTo(cx, cy - 10);
    ctx.lineTo(cx, cy + 10);
    ctx.stroke();
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
  const faceMeshRef = useRef<any>(null);
  const lastLandmarksRef = useRef<{ x: number; y: number }[]>([]);

  const [scanPhase, setScanPhase] = useState<ScanPhase>('idle');
  const [profile, setProfile] = useState<AIProfile | null>(null);
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>(generateLiveMetrics());
  const [faceDetected, setFaceDetected] = useState(false);
  const [currentPhaseLabel, setCurrentPhaseLabel] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [detectedEmotion, setDetectedEmotion] = useState<Emotion>('Neutral');
  const [error, setError] = useState<string | null>(null);
  const [mediapipeReady, setMediapipeReady] = useState(false);

  // Load MediaPipe via CDN script tag (most reliable in Next.js browser env)
  useEffect(() => {
    if (!isOpen) return;
    if (typeof window === 'undefined') return;
    if ((window as Window & { FaceMesh?: unknown }).FaceMesh) { setMediapipeReady(true); return; }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/face_mesh.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => setMediapipeReady(true);
    script.onerror = () => {
      // Fallback: run without face mesh — simulated mode
      setMediapipeReady(true);
    };
    document.head.appendChild(script);
    return () => { try { document.head.removeChild(script); } catch { /* already removed */ } };
  }, [isOpen]);

  // Flicker live metrics
  useEffect(() => {
    if (scanPhase !== 'detecting' && scanPhase !== 'analyzing' && scanPhase !== 'profiling') return;
    const t = setInterval(() => setLiveMetrics(generateLiveMetrics()), 600);
    return () => clearInterval(t);
  }, [scanPhase]);

  // Randomly detect emotion while scanning
  useEffect(() => {
    if (scanPhase !== 'analyzing' && scanPhase !== 'profiling') return;
    const emotions: Emotion[] = ['Happy', 'Surprised', 'Neutral', 'Focused'];
    const t = setInterval(() => setDetectedEmotion(pick(emotions)), 700);
    return () => clearInterval(t);
  }, [scanPhase]);

  const stopStream = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (faceMeshRef.current) {
      try { faceMeshRef.current.close(); } catch { /* ignore */ }
      faceMeshRef.current = null;
    }
  }, []);

  // Canvas render loop (runs regardless of facemesh — always animates HUD)
  const startRenderLoop = useCallback((phase: ScanPhase) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      const w = canvas.width;
      const h = canvas.height;
      // Scan line bounce
      scanYRef.current += 2.5 * scanDirRef.current;
      if (scanYRef.current > h) scanDirRef.current = -1;
      if (scanYRef.current < 0) scanDirRef.current = 1;
      drawHUD(ctx, lastLandmarksRef.current, w, h, scanYRef.current, phase);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const initFaceMesh = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const FM = (window as any).FaceMesh;
    if (!FM) return; // simulated mode — no real face mesh
    if (faceMeshRef.current) return;

    const faceMesh = new FM({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
    });
    faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: false, minDetectionConfidence: 0.6, minTrackingConfidence: 0.5 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    faceMesh.onResults((results: any) => {
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        lastLandmarksRef.current = results.multiFaceLandmarks[0];
        setFaceDetected(true);
      } else {
        lastLandmarksRef.current = [];
        setFaceDetected(false);
      }
    });
    faceMeshRef.current = faceMesh;

    // Feed video frames
    const feed = async () => {
      if (!videoRef.current || videoRef.current.paused || videoRef.current.readyState < 2) {
        requestAnimationFrame(feed);
        return;
      }
      try { await faceMesh.send({ image: videoRef.current }); } catch { /* ignore */ }
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
        // Size canvas to video
        if (canvasRef.current) {
          canvasRef.current.width = videoRef.current.videoWidth || 640;
          canvasRef.current.height = videoRef.current.videoHeight || 480;
        }
      }
      setScanPhase('detecting');
      setFaceDetected(false);
      setProfile(null);
      setScanProgress(0);

      // Init MediaPipe if available
      if (mediapipeReady) initFaceMesh();

      // Start HUD render loop
      startRenderLoop('detecting');

      // Auto-progress scan phases
      let elapsed = 0;
      let phaseIdx = 0;
      const totalDuration = SCAN_PHASES.reduce((a, p) => a + p.duration, 0);

      const advance = () => {
        const current = SCAN_PHASES[phaseIdx];
        setCurrentPhaseLabel(current.label);
        setScanPhase(current.phase);
        setScanProgress(Math.round(((elapsed) / totalDuration) * 100));

        if (current.phase === 'complete') {
          const finalEmotion: Emotion = pick(['Happy', 'Surprised', 'Neutral', 'Focused'] as Emotion[]);
          setDetectedEmotion(finalEmotion);
          setProfile(generateProfile(finalEmotion));
          setScanProgress(100);
          setFaceDetected(true);
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
  }, [mediapipeReady, initFaceMesh, startRenderLoop]);

  const scanAgain = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    lastLandmarksRef.current = [];
    setProfile(null);
    setScanPhase('idle');
    setFaceDetected(false);
    setScanProgress(0);
    setCurrentPhaseLabel('');
    // Restart
    setTimeout(startCamera, 100);
  }, [startCamera]);

  const handleClose = useCallback(() => {
    stopStream();
    setScanPhase('idle');
    setProfile(null);
    setFaceDetected(false);
    setScanProgress(0);
    setError(null);
    onClose();
  }, [stopStream, onClose]);

  // Cleanup on unmount / close
  useEffect(() => {
    if (!isOpen) stopStream();
    return () => stopStream();
  }, [isOpen, stopStream]);

  // Update render loop phase reference when phase changes
  useEffect(() => {
    if (scanPhase === 'detecting' || scanPhase === 'analyzing' || scanPhase === 'profiling' || scanPhase === 'complete') {
      cancelAnimationFrame(rafRef.current);
      startRenderLoop(scanPhase);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanPhase]);

  const isScanning = scanPhase === 'detecting' || scanPhase === 'analyzing' || scanPhase === 'profiling';

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
                  <Brain className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm font-black text-white tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    AI DEMO
                  </div>
                  <div className="text-[9px] font-mono text-cyan-400/60 tracking-[0.2em]">
                    EMOTION & PERSONALITY INSIGHTS
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

                {/* Video feed */}
                <div className="relative rounded-2xl overflow-hidden bg-[#020610] border border-cyan-500/20 aspect-video">
                  {/* Corner brackets */}
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

                  {/* Idle state */}
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

                  {/* Scan phase overlay */}
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

                  {/* Complete badge */}
                  {scanPhase === 'complete' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-3 left-3 right-3 z-30"
                    >
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/20 backdrop-blur-sm border border-green-500/40">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-[10px] font-mono text-green-300 tracking-wider">ANALYSIS COMPLETE</span>
                        <Zap className="w-3 h-3 text-green-400 ml-auto" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Start / Scan Again */}
                {scanPhase === 'idle' && !error && (
                  <button
                    onClick={startCamera}
                    className="w-full py-3.5 flex items-center justify-center gap-2.5 rounded-xl font-bold text-sm text-[#04080f] bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    <Camera className="w-4 h-4" />
                    START AI SCAN
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
                    SCAN AGAIN
                  </button>
                )}

                {/* Live metrics panel */}
                {(isScanning || scanPhase === 'complete') && (
                  <LiveMetricsPanel metrics={liveMetrics} phase={scanPhase} emotion={detectedEmotion} />
                )}

                {/* Privacy notice */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <Shield className="w-3 h-3 text-white/30 shrink-0" />
                  <p className="text-[9px] sm:text-[10px] text-white/30 font-mono">
                    All processing happens locally in your browser. No images are stored.
                  </p>
                </div>
              </div>

              {/* ── Right: Profile / Insight panels ── */}
              <div className="flex-1 flex flex-col gap-3">
                {scanPhase === 'idle' && !error && (
                  <IdleInfoPanel />
                )}
                {isScanning && (
                  <ScanningPanel phase={scanPhase} progress={scanProgress} emotion={detectedEmotion} />
                )}
                {scanPhase === 'complete' && profile && (
                  <ProfileResultPanel profile={profile} />
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

function LiveMetricsPanel({ metrics, phase, emotion }: { metrics: LiveMetrics; phase: ScanPhase; emotion: Emotion }) {
  const bars = [
    { label: 'Focus Score', value: metrics.focusScore, icon: Target, color: 'cyan' },
    { label: 'Innovation', value: metrics.innovationIndex, icon: Zap, color: 'blue' },
    { label: 'AI Curiosity', value: metrics.aiCuriosityScore, icon: Brain, color: 'purple' },
    { label: 'Problem Solving', value: metrics.problemSolving, icon: TrendingUp, color: 'green' },
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
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[9px] font-mono text-cyan-400/60">{emotion}</span>
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
              {phase === 'complete' ? value : value}%
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
    { icon: Brain, text: 'Real-time face landmark detection' },
    { icon: Target, text: 'Emotion & focus analysis' },
    { icon: Zap, text: 'Instant AI personality profiling' },
    { icon: TrendingUp, text: 'Innovation & curiosity scoring' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4"
    >
      <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/8 to-blue-500/5 border border-cyan-500/20">
        <h3 className="text-xs font-black text-cyan-300 tracking-widest mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          WHAT YOU'LL DISCOVER
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
      </div>
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <p className="text-[10px] font-mono text-white/30 leading-relaxed">
          For entertainment purposes only. Results are AI-generated fun insights — not scientific assessments.
        </p>
      </div>
    </motion.div>
  );
}

function ScanningPanel({ phase, progress, emotion }: { phase: ScanPhase; progress: number; emotion: Emotion }) {
  const steps = [
    { id: 'detecting', label: 'Face Detected', done: ['analyzing', 'profiling'].includes(phase) },
    { id: 'analyzing', label: 'Analyzing...', done: ['profiling'].includes(phase), active: phase === 'analyzing' },
    { id: 'profiling', label: 'Generating AI Profile...', done: false, active: phase === 'profiling' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="p-4 rounded-xl bg-[#020610] border border-cyan-500/20 space-y-3">
        <div className="text-[9px] font-mono text-white/35 tracking-widest uppercase mb-2">Scan Sequence</div>
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

        {/* Progress */}
        <div className="pt-2">
          <div className="flex justify-between mb-1.5">
            <span className="text-[9px] font-mono text-white/30 tracking-wider">PROGRESS</span>
            <span className="text-[10px] font-mono font-bold text-cyan-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>{progress}%</span>
          </div>
          <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>
      </div>

      {/* Flickering detected emotion */}
      <motion.div
        key={emotion}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3"
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[10px] font-mono text-white/40">Detected signal:</span>
        <span className="text-xs font-bold text-cyan-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>{emotion.toUpperCase()}</span>
      </motion.div>
    </motion.div>
  );
}

function ProfileResultPanel({ profile }: { profile: AIProfile }) {
  const potentialColor = profile.dataSciencePotential === 'EXCEPTIONAL' ? 'text-cyan-300' : profile.dataSciencePotential === 'VERY HIGH' ? 'text-blue-300' : 'text-green-300';
  const potentialBg = profile.dataSciencePotential === 'EXCEPTIONAL' ? 'bg-cyan-500/15 border-cyan-500/30' : profile.dataSciencePotential === 'VERY HIGH' ? 'bg-blue-500/15 border-blue-500/30' : 'bg-green-500/15 border-green-500/30';

  const metrics = [
    { label: 'Innovation Index', value: profile.innovationIndex, color: 'text-cyan-400' },
    { label: 'Hackathon Survival', value: profile.hackathonSurvival, color: 'text-blue-400' },
    { label: 'Curiosity Score', value: profile.curiosityScore, color: 'text-purple-400' },
    { label: 'Problem Solving', value: profile.problemSolvingPotential, color: 'text-green-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3"
    >
      {/* Profile header */}
      <div className="relative p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/30 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="flex items-center justify-between mb-3">
          <div className="text-[9px] font-mono text-cyan-400/60 tracking-[0.25em] uppercase">AI Profile Generated</div>
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

        {/* Detected emotion */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-mono text-white/35">Dominant trait:</span>
          <span className="text-xs font-bold text-cyan-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {profile.detectedEmotion}
          </span>
        </div>

        {/* Data Science potential badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${potentialBg}`}>
          <Zap className="w-3 h-3 text-current opacity-70" />
          <span className={`text-xs font-black tracking-widest ${potentialColor}`} style={{ fontFamily: 'Orbitron, sans-serif' }}>
            DATA SCIENCE POTENTIAL: {profile.dataSciencePotential}
          </span>
        </div>
      </div>

      {/* Metric bars */}
      <div className="p-4 rounded-xl bg-[#020610] border border-white/[0.07] space-y-2.5">
        {metrics.map(({ label, value, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex justify-between mb-1">
              <span className="text-[9px] font-mono text-white/40">{label}</span>
              <span className={`text-[10px] font-mono font-bold ${color}`} style={{ fontFamily: 'Orbitron, sans-serif' }}>{value}%</span>
            </div>
            <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
                initial={{ width: '0%' }}
                animate={{ width: `${value}%` }}
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
        <p className="text-xs text-white/70 leading-relaxed italic">"{profile.insight}"</p>
      </motion.div>

      {/* Fun fact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
      >
        <div className="text-[9px] font-mono text-white/25 tracking-widest uppercase mb-1">Fun Fact</div>
        <p className="text-[10px] sm:text-xs text-white/45 font-mono leading-relaxed">"{profile.funFact}"</p>
      </motion.div>
    </motion.div>
  );
}
