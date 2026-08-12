import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import logoImg from "@/assets/gr7-logo.png";

export default function HeroIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isReady, setIsReady] = useState(false);

  // Scroll tracking for transition
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollSmooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform values for scroll-driven transition
  const logoScale = useTransform(scrollSmooth, [0, 0.5], [1, 1.4]);
  const logoOpacity = useTransform(scrollSmooth, [0, 0.4, 0.6], [1, 1, 0]);
  const contentY = useTransform(scrollSmooth, [0, 0.5], [0, -100]);
  const bgOpacity = useTransform(scrollSmooth, [0, 0.4, 1], [1, 1, 0]);
  const waveScale = useTransform(scrollSmooth, [0.2, 0.8], [0, 2.5]);
  const waveOpacity = useTransform(scrollSmooth, [0.2, 0.5, 0.8], [0, 1, 0]);

  useEffect(() => {
    setIsReady(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Parallax values based on mouse
  const pX = (mousePos.x - 0.5) * 20;
  const pY = (mousePos.y - 0.5) * 20;

  return (
    <div 
      ref={containerRef}
      className="relative z-[60] h-[150vh] w-full bg-[#050505] overflow-visible"
    >
      {/* Fixed viewport container */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >
        {/* ATMOSPHERIC BACKGROUND */}
        <div className="absolute inset-0 z-0">
          {/* Deep Red Ambient Glow */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,26,26,0.15) 0%, transparent 50%)`
            }}
          />
          
          {/* Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          {/* Grid Layer */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              transform: `translate(${pX * 0.2}px, ${pY * 0.2}px)`
            }}
          />

          {/* Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.1, 0.4, 0.1],
                  y: [0, -40, 0],
                  x: [0, (i % 2 === 0 ? 20 : -20), 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                className="absolute w-1 h-1 rounded-full bg-[#ff1a1a]/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translate(${pX * 0.5}px, ${pY * 0.5}px)`
                }}
              />
            ))}
          </div>

          {/* Dynamic Lines (forming System) */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <motion.path
              d="M -100 500 Q 300 400 600 500 T 1300 500"
              stroke="#ff1a1a"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isReady ? { pathLength: 1, opacity: 0.4 } : {}}
              transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M 600 0 L 600 1000"
              stroke="#ff1a1a"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isReady ? { pathLength: 1, opacity: 0.2 } : {}}
              transition={{ duration: 2, delay: 1 }}
            />
          </svg>
        </div>

        {/* TRANSITION WAVE */}
        <motion.div 
          style={{ scale: waveScale, opacity: waveOpacity }}
          className="absolute z-10 w-[100vmax] h-[100vmax] rounded-full border-[2px] border-[#ff1a1a]/30 pointer-events-none"
        />

        {/* LOGO & TEXT CONTAINER */}
        <motion.div 
          style={{ 
            scale: logoScale, 
            opacity: logoOpacity, 
            y: contentY,
            x: pX * 0.3,
            rotateX: -pY * 0.1,
            rotateY: pX * 0.1
          }}
          className="relative z-20 flex flex-col items-center justify-center transform-gpu preserve-3d"
        >
          {/* Entering Message during Transition */}
          <motion.div
            style={{ 
              opacity: useTransform(scrollSmooth, [0.4, 0.6, 0.8], [0, 1, 0]),
              scale: useTransform(scrollSmooth, [0.4, 0.8], [0.8, 1.2])
            }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
          >
            <span className="text-[10px] tracking-[1em] text-[#ff1a1a] uppercase mb-4">Entering GR7 System</span>
            <div className="flex gap-2">
              <div className="h-[1px] w-12 bg-[#ff1a1a]" />
              <span className="text-[8px] font-mono text-white/40">INITIALIZING_PHASE_01</span>
              <div className="h-[1px] w-12 bg-[#ff1a1a]" />
            </div>
          </motion.div>

          {/* Initial Pulsing Dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, times: [0, 0.5, 1] }}
            className="absolute w-4 h-4 bg-[#ff1a1a] rounded-full blur-sm"
          />

          {/* The Logo Reveal */}
          <div className="relative transform-gpu preserve-3d">
            {/* Continuous Glow behind the logo */}
            <motion.div
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 -z-10 bg-[#ff1a1a]/20 blur-[40px] rounded-full"
            />
            
            <motion.div
              initial={{ opacity: 0, filter: "blur(20px)", scale: 0.8 }}
              animate={isReady ? { opacity: 1, filter: "blur(0px)", scale: 1 } : {}}
              transition={{ duration: 1.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 hero-intro-logo"
            >
              <img src={logoImg} alt="GR7 Company" className="h-20 md:h-28 w-auto object-contain drop-shadow-[0_0_30px_rgba(255,26,26,0.3)]" />
            </motion.div>

            {/* Continuous Glint/Glow passing through */}
            <motion.div
              animate={{ 
                x: ["-250%", "250%"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                times: [0, 0.2, 0.8, 1]
              }}
              className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[35deg] pointer-events-none"
            />
          </div>

          {/* Text Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 2.2 }}
            className="mt-8 text-center"
          >
            <h2 className="font-display text-xl tracking-[0.4em] text-white uppercase mb-2">GR7 COMPANY</h2>
            <p className="text-[10px] tracking-[0.6em] text-white/40 uppercase font-medium">
              Marketing • Criatividade • Performance
            </p>
          </motion.div>
        </motion.div>

        {/* SCROLL TO ENTER INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 1 }}
          style={{ opacity: logoOpacity }}
          className="absolute bottom-12 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] tracking-[0.5em] text-white/30 uppercase">Scroll to Enter</span>
          <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#ff1a1a] to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* TRANSITION OVERLAY (appears during scroll) */}
      <motion.div 
        style={{ 
          opacity: useTransform(scrollSmooth, [0.6, 0.95], [0, 1]),
          pointerEvents: "none"
        }}
        className="fixed inset-0 z-[55] bg-[#050505]"
      />
      
      {/* GRADIENT TRANSITION (smoother blend) */}
      <motion.div 
        style={{ 
          opacity: useTransform(scrollSmooth, [0.4, 0.7], [0, 1]),
          pointerEvents: "none"
        }}
        className="fixed inset-0 z-[54] bg-gradient-to-b from-[#050505] via-[#ff1a1a]/5 to-[#050505]"
      />
    </div>
  );
}
