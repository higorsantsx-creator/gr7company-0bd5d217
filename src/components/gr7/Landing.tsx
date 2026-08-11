import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  animate,
  AnimatePresence,
} from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Instagram,
  Mail,
  Share2,
  Palette,
  Video,
  Camera,
  Target,
  LineChart,
  Compass,
  BrainCircuit,
  TrendingUp,
  Sparkles,
  FileText,
  Layers,
  BarChart3,
  ChevronRight,
  Star,
  Play,
} from "lucide-react";
import logoImg from "@/assets/gr7-logo.png";
import {
  ProjectsGrid,
  ReelsSection,
  
  ArtsMasonry,
  
  CinematicVideo,
  BackstageGrid,
  ClientsMarquee,
  CasesShowcase,
  DashboardsSection,
  VideoTestimonialsSection,
  InstagramProfile,
  GR7InAction,
} from "./MediaSections";
import HeroIntro from "./HeroIntro";



/* ------------------------------------------------------------------ */
/*  GR7 wordmark (SVG, used on dark backgrounds)                       */
/* ------------------------------------------------------------------ */
function GR7Mark({ className = "h-8" }: { className?: string }) {
  return (
    <img src={logoImg} alt="GR7 Company" className={`${className} w-auto object-contain`} />
  );
}

/* ------------------------------------------------------------------ */
/*  Animated global background — floating blobs + grid + aurora        */
/* ------------------------------------------------------------------ */
function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const yA = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* deep base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, #1a0505 0%, #0a0a0a 45%, #050505 100%)",
        }}
      />

      {/* red aurora — drifts with scroll */}
      <motion.div
        style={{ y: yA }}
        className="absolute -left-52 -top-40 h-[52rem] w-[52rem] will-change-transform"
      >
        <motion.div
          className="h-full w-full rounded-full blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 30, 0], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at center, #ff1a1a 0%, rgba(255,26,26,0.25) 35%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: yB }}
        className="absolute -right-40 top-1/3 h-[42rem] w-[42rem] will-change-transform"
      >
        <motion.div
          className="h-full w-full rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at center, #ff3d3d 0%, rgba(179,0,0,0.35) 40%, transparent 72%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: yC }}
        className="absolute left-1/2 bottom-[-20%] h-[48rem] w-[48rem] -translate-x-1/2 will-change-transform"
      >
        <motion.div
          className="h-full w-full rounded-full blur-3xl"
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at center, #b30000 0%, transparent 65%)",
          }}
        />
      </motion.div>

      {/* rotating conic sweep — very subtle, gives sense of motion */}
      <motion.div
        style={{ rotate: rot }}
        className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] will-change-transform"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,26,26,0.6) 40deg, transparent 90deg, transparent 180deg, rgba(255,77,77,0.4) 220deg, transparent 270deg)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* precision grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 90%)",
        }}
      />

      {/* film grain / noise */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "220px 220px",
        }}
      />

      {/* scan line drifting */}
      <motion.div
        className="absolute inset-x-0 h-40 opacity-30 will-change-transform"
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,26,26,0.08) 50%, transparent 100%)",
        }}
      />

      {/* edge vignette — locks focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}



/* ------------------------------------------------------------------ */
/*  Scroll progress bar + custom cursor                                */
/* ------------------------------------------------------------------ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-gradient-to-r from-[#ff1a1a] via-[#ff4d4d] to-[#ff1a1a]"
      style={{ scaleX: w, boxShadow: "0 0 20px rgba(255,26,26,0.6)" }}
    />
  );
}

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      // Native zoom is back to 100%. No compensation needed.
      const zoom = 1;
      x.set(e.clientX / zoom);
      y.set(e.clientY / zoom);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);
  const sx = useSpring(x, { stiffness: 400, damping: 30 });
  const sy = useSpring(y, { stiffness: 400, damping: 30 });
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff1a1a] md:block"
        style={{ x: sx, y: sy }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[89] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff1a1a]/40 md:block"
        style={{ x: sx, y: sy }}
        animate={{ width: hover ? 56 : 28, height: hover ? 56 : 28, opacity: hover ? 1 : 0.5 }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Loader                                                             */
/* ------------------------------------------------------------------ */
function Loader({ done, logoTargetRef }: { done: () => void; logoTargetRef: React.RefObject<HTMLDivElement | null> }) {
  const [p, setP] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setP((v) => {
        const n = v + Math.random() * 12 + 4;
        if (n >= 100) {
          clearInterval(id);
          setIsTransitioning(true);
          return 100;
        }
        return n;
      });
    }, 90);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      const sequence = async () => {
        const startElement = logoRef.current;
        // Search specifically for the nav logo image
        const endElement = document.querySelector('header img[alt="GR7 Company"]');

        if (startElement && endElement) {
          // 1. Zoom and 3D Rotation in center
          await animate(startElement, 
            { 
              scale: [1, 2.5],
              rotateY: [0, 360],
            }, 
            { 
              duration: 1.2, 
              ease: "easeOut" 
            }
          );

          // Get fresh coordinates AFTER the first animation and potentially some layout shifts
          const startRect = startElement.getBoundingClientRect();
          const endRect = endElement.getBoundingClientRect();

          const startCenterX = startRect.left + startRect.width / 2;
          const startCenterY = startRect.top + startRect.height / 2;
          const endCenterX = endRect.left + endRect.width / 2;
          const endCenterY = endRect.top + endRect.height / 2;

          // Calculate displacement needed relative to current transformed position
          const deltaX = endCenterX - startCenterX;
          const deltaY = endCenterY - startCenterY;
          
          // Final scale relative to the NATURAL size
          const targetScale = endRect.height / (startRect.height / 2.5);

          // 2. Move to corner with high precision
          await animate(startElement, 
            { 
              x: deltaX, 
              y: deltaY, 
              scale: targetScale,
              opacity: 1
            }, 
            { 
              duration: 1.2, 
              ease: [0.65, 0, 0.35, 1],
            }
          );
        }
        
        done();
      };

      sequence();
    }
  }, [isTransitioning, done]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <div className="absolute inset-0 opacity-30" style={{
        background:
          "radial-gradient(600px circle at 50% 50%, rgba(255,26,26,0.25), transparent 60%)",
      }} />
      
      <div ref={logoRef} className="relative z-20" style={{ perspective: "1000px" }}>
        <div className="relative transform-gpu preserve-3d">
          {/* Main Logo Layer */}
          <div className="relative z-10 drop-shadow-[0_10px_20px_rgba(255,26,26,0.3)]">
            <GR7Mark className="h-9 w-auto object-contain" />
          </div>
          
          {/* 3D Depth Layers (Extrusion) */}
          <div className="absolute inset-0 depth-1 opacity-90 brightness-110">
            <GR7Mark className="h-9 w-auto object-contain" />
          </div>
          <div className="absolute inset-0 depth-2 opacity-85 brightness-105">
            <GR7Mark className="h-9 w-auto object-contain" />
          </div>
          <div className="absolute inset-0 depth-3 opacity-80 brightness-95">
            <GR7Mark className="h-9 w-auto object-contain" />
          </div>
          <div className="absolute inset-0 depth-4 opacity-75 brightness-85">
            <GR7Mark className="h-9 w-auto object-contain" />
          </div>
          <div className="absolute inset-0 depth-5 opacity-70 brightness-75">
            <GR7Mark className="h-9 w-auto object-contain" />
          </div>
          
          {/* Internal shadow to give it more depth when rotating */}
          <div 
            className="absolute inset-0 bg-black/10 depth-2 mix-blend-multiply"
            style={{ maskImage: "linear-gradient(to right, transparent, black, transparent)" }}
          />
        </div>
      </div>

      <AnimatePresence>
        {!isTransitioning && (
          <motion.div 
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col items-center mt-10"
          >
            <div className="relative z-10 w-64 h-[2px] bg-white/5 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff1a1a] to-[#ff6b6b]"
                style={{ width: `${p}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <div className="mt-4 font-mono text-xs tracking-[0.3em] text-white/50 relative z-10">
              {Math.round(p).toString().padStart(3, "0")}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal helper                                                      */
/* ------------------------------------------------------------------ */
type RevealVariant =
  | "rise"
  | "fall"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "mask"
  | "tilt";

const REVEAL_VARIANTS: Record<
  RevealVariant,
  { hidden: Record<string, any>; shown: Record<string, any> }
> = {

  rise: {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    shown: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fall: {
    hidden: { opacity: 0, y: -40, rotate: -1.5, filter: "blur(4px)" },
    shown: { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -60, filter: "blur(4px)" },
    shown: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 60, filter: "blur(4px)" },
    shown: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    shown: { opacity: 1, scale: 1, y: 0 },
  },
  mask: {
    hidden: {
      opacity: 0,
      y: 60,
      clipPath: "inset(100% 0 0 0)",
    },
    shown: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0 0 0)",
    },
  },
  tilt: {
    hidden: { opacity: 0, rotate: -3, scale: 0.96, y: 24 },
    shown: { opacity: 1, rotate: 0, scale: 1, y: 0 },
  },
};

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  variant = "rise",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px", once: true });
  const v = REVEAL_VARIANTS[variant];
  // permite override do deslocamento vertical no rise clássico
  const hidden =
    variant === "rise" ? { ...v.hidden, y } : v.hidden;
  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? v.shown : hidden}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity, filter" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


/* ------------------------------------------------------------------ */
/*  NAV                                                                */
/* ------------------------------------------------------------------ */
function Nav({ logoRef }: { logoRef?: React.RefObject<HTMLDivElement | null> }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0a0a0a]/70 border-b border-white/5 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <div ref={logoRef}>
          <GR7Mark className="h-7" />
        </div>
        <nav className="hidden items-center gap-9 text-sm text-white/60 md:flex">
          {[
            ["Serviços", "servicos"],
            ["Diferencial", "diferencial"],
            ["Processo", "processo"],
            ["Portfólio", "portfolio"],
            ["Depoimentos", "depoimentos"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="relative transition hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#cta"
          className="group hidden items-center gap-2 rounded-full border border-white/10 bg-[#0a0a0a]/[0.03] px-5 py-2.5 text-xs font-medium text-white backdrop-blur-md transition hover:border-[#ff1a1a]/50 hover:bg-[#ff1a1a]/10 md:inline-flex"
        >
          Fale com a GR7
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-screen w-full overflow-hidden pt-32 md:pt-40"
    >
      {/* grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 70%)",
        }}
      />
      {/* red glow */}
      <motion.div
        style={{ y: y1 }}
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[900px] w-[900px] -translate-x-1/2 rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,26,26,0.35), rgba(255,26,26,0.08) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </motion.div>

      {/* particles — lightweight */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#ff1a1a]/60 will-change-transform"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}


      {/* abstract lines */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full opacity-40"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        <motion.path
          d="M 0 600 C 300 500 500 700 700 550 S 1100 400 1200 500"
          stroke="url(#lineg)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 200 C 200 350 400 100 700 250 S 1000 400 1200 300"
          stroke="url(#lineg)"
          strokeWidth="0.7"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        />
        <defs>
          <linearGradient id="lineg" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(255,26,26,0)" />
            <stop offset="0.5" stopColor="rgba(255,26,26,0.5)" />
            <stop offset="1" stopColor="rgba(255,26,26,0)" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 pb-32 md:px-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-7 lg:pt-12">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0a0a]/[0.02] px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] text-white/60 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff1a1a] shadow-[0_0_10px_#ff1a1a]" />
              Marketing de alta performance
            </div>
          </Reveal>
          <Reveal delay={0.1} variant="mask">

            <h1
              className="font-display text-[44px] leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-[92px]"
            >
              Marketing que{" "}
              <span className="relative inline-block">
                <span
                  className="bg-gradient-to-r from-[#ff2a2a] via-[#ff6b6b] to-[#ff2a2a] bg-clip-text text-transparent"
                >
                  transforma
                </span>
              </span>{" "}
              empresas em <span className="italic font-light text-white/90">referências</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              Nós não criamos apenas posts. Construímos posicionamentos, aumentamos vendas e
              transformamos marcas em negócios que dominam o mercado.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#ff1a1a] px-7 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(255,26,26,0.7)] transition hover:shadow-[0_20px_60px_-10px_rgba(255,26,26,0.9)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Quero crescer
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#0a0a0a] px-7 py-4 text-sm font-medium text-white backdrop-blur-md transition hover:border-white/20 hover:bg-[#0a0a0a]/[0.03]"
              >
                <MessageCircle className="h-4 w-4 text-[#ff6b6b]" />
                Falar no WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 text-xs uppercase tracking-widest text-white/50">
              <span>Meta Business Partner</span>
              <span className="h-px w-6 bg-[#0a0a0a]/20" />
              <span>Google Ads Certified</span>
              <span className="h-px w-6 bg-[#0a0a0a]/20" />
              <span>+200 Marcas escaladas</span>
            </div>
          </Reveal>
        </div>

        {/* Right dashboard composition */}
        <motion.div style={{ y: y2 }} className="relative lg:col-span-5">
          <HeroDashboard />
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-white/50"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll
      </motion.div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* main card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/[0.04] to-black/[0.01] p-6 backdrop-blur-xl"
        style={{
          boxShadow:
            "0 40px 120px -20px rgba(255,26,26,0.25), inset 0 1px 0 rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">Campanha ativa</div>
            <div className="mt-1 font-display text-lg font-semibold text-white">
              Meta Ads · Conversão
            </div>
          </div>
          <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[10px] font-medium text-emerald-300">
            LIVE
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            ["ROAS", "6.4x", "+38%"],
            ["CTR", "3.9%", "+12%"],
            ["CPL", "R$4,20", "-27%"],
          ].map(([label, v, d], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.15 }}
              className="rounded-xl border border-white/5 bg-[#0a0a0a]/[0.03] p-3"
            >
              <div className="text-[9px] uppercase tracking-wider text-white/50">{label}</div>
              <div className="mt-1 font-display text-lg font-bold text-white">{v}</div>
              <div className="text-[10px] text-emerald-300">{d}</div>
            </motion.div>
          ))}
        </div>

        {/* mini chart */}
        <div className="mt-6 h-32 rounded-xl border border-white/5 bg-[#0a0a0a]/[0.03] p-3">
          <svg viewBox="0 0 200 80" className="h-full w-full">
            <defs>
              <linearGradient id="ch1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(255,26,26,0.5)" />
                <stop offset="1" stopColor="rgba(255,26,26,0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0 60 L20 55 L40 58 L60 45 L80 40 L100 42 L120 30 L140 25 L160 18 L180 12 L200 6 L200 80 L0 80 Z"
              fill="url(#ch1)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            />
            <motion.path
              d="M0 60 L20 55 L40 58 L60 45 L80 40 L100 42 L120 30 L140 25 L160 18 L180 12 L200 6"
              stroke="#ff4d4d"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.2, duration: 1.6, ease: "easeInOut" }}
            />
            {[20, 60, 100, 140, 180].map((x, i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={[55, 45, 42, 25, 12][i]}
                r="2"
                fill="#fff"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2 + i * 0.1 }}
              />
            ))}
          </svg>
        </div>
      </motion.div>

      {/* floating instagram card */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute -right-4 -top-6 w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/85 p-3 backdrop-blur-xl md:-right-10"
        style={{ boxShadow: "0 20px 50px -10px rgba(0,0,0,0.6)" }}
      >
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#ff1a1a] via-fuchsia-500 to-amber-400" />
          <div>
            <div className="text-[10px] font-semibold text-white">@sua.marca</div>
            <div className="text-[9px] text-white/50">alcance +512%</div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="aspect-square rounded bg-gradient-to-br from-black/[0.06] to-black/[0.02]"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </motion.div>

      {/* floating google ads pill */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0a0a0a]/85 px-4 py-3 backdrop-blur-xl md:-left-8"
        style={{ boxShadow: "0 20px 50px -10px rgba(0,0,0,0.6)" }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0a0a0a]/[0.03]">
          <TrendingUp className="h-4 w-4 text-emerald-300" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/50">Google Ads</div>
          <div className="font-display text-sm font-semibold text-white">
            +312% conversões
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICES                                                           */
/* ------------------------------------------------------------------ */
const services = [
  { icon: Share2, title: "Gestão de redes sociais", desc: "Presença consistente e magnética em todas as plataformas." },
  { icon: Palette, title: "Criação de artes", desc: "Design com identidade, feito para converter." },
  { icon: Video, title: "Produção de Reels", desc: "Vídeos que prendem e viralizam com propósito." },
  { icon: Camera, title: "Captação de imagens", desc: "Fotografia e vídeo com direção cinematográfica." },
  { icon: Target, title: "Meta Ads", desc: "Campanhas cirúrgicas em Facebook e Instagram." },
  { icon: LineChart, title: "Google Ads", desc: "Tráfego pago com CPA imbatível." },
  { icon: Compass, title: "Planejamento estratégico", desc: "Direção clara guiada por dados e mercado." },
  { icon: BrainCircuit, title: "Consultoria", desc: "Diagnóstico e correção do que trava o crescimento." },
  { icon: BarChart3, title: "Análise de vendas", desc: "Do clique ao fechamento — funil sob controle." },
  { icon: Sparkles, title: "Posicionamento de marca", desc: "Sua marca ocupando o lugar que merece." },
  { icon: FileText, title: "Roteiros", desc: "Copywriting e roteiros que conduzem à ação." },
  { icon: Layers, title: "Identidade visual", desc: "Sistemas visuais consistentes e memoráveis." },
  { icon: TrendingUp, title: "Relatórios inteligentes", desc: "Métricas que importam, apresentadas com clareza." },
];

function Services() {
  return (
    <section id="servicos" className="relative isolate py-32 md:py-44">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(1000px circle at 80% 20%, rgba(255,26,26,0.08), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <div className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#ff6b6b]">
                / o que fazemos
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="fall">

              <h2 className="max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
                Um ecossistema completo para escalar sua marca.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Estratégia, criativo, mídia e dados — operando juntos, dentro do mesmo padrão de
              excelência.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const Icon = s.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.92 }}
      transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] p-6 shadow-[0_1px_0_rgba(0,0,0,0.04),0_10px_28px_-18px_rgba(0,0,0,0.18)] ring-1 ring-white/5 transition-colors hover:border-[#ff1a1a]/60"
      style={{ minHeight: 180, willChange: "transform, opacity" }}
    >

      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at 50% 0%, rgba(255,26,26,0.15), transparent 60%)",
        }}
      />
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#0a0a0a]/70 transition-all duration-500 group-hover:border-[#ff1a1a]/40 group-hover:bg-[#ff1a1a]/10">
        <Icon className="h-5 w-5 text-white/80 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#ff6b6b]" />
      </div>
      <h3 className="mt-6 font-display text-lg font-semibold text-white">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/50">{s.desc}</p>
      <ChevronRight className="absolute right-5 top-5 h-4 w-4 -translate-x-2 text-white/30 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-[#ff6b6b] group-hover:opacity-100" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  DIFFERENCE + Counters                                              */
/* ------------------------------------------------------------------ */
function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (x) => setV(x),
    });
    return () => controls.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {to >= 1000000
        ? (v / 1000000).toFixed(1) + "M"
        : to >= 1000
        ? Math.round(v).toLocaleString("pt-BR")
        : Math.round(v)}
      {suffix}
    </span>
  );
}

function Difference() {
  return (
    <section id="diferencial" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-6 text-[11px] uppercase tracking-[0.3em] text-[#ff6b6b]">
                / diferencial
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="slide-right">

              <h2 className="font-display text-4xl leading-[1.02] tracking-[-0.02em] text-white md:text-6xl lg:text-7xl">
                Você não precisa de mais marketing.
                <br />
                <span className="text-white/50">Você precisa de </span>
                <span className="italic font-light text-[#ff6b6b]">estratégia.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
                A GR7 opera na intersecção de <span className="text-white">dados</span>,{" "}
                <span className="text-white">posicionamento</span>,{" "}
                <span className="text-white">criatividade</span> e{" "}
                <span className="text-white">vendas</span>. Cada decisão é validada por métrica,
                cada criativo é pensado para converter, cada campanha existe para gerar receita —
                não vaidade.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:col-span-5">
            {[
              { n: 200, s: "+", label: "Projetos realizados" },
              { n: 5000000, s: "+", label: "Alcance gerado" },
              { n: 98, s: "%", label: "Clientes satisfeitos" },
            ].map((k, i) => (
              <Reveal key={k.label} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-7 backdrop-blur">
                  <div
                    className="pointer-events-none absolute -inset-1 opacity-30 blur-3xl"
                    style={{
                      background:
                        "radial-gradient(200px circle at 20% 50%, rgba(255,26,26,0.4), transparent)",
                    }}
                  />
                  <div className="relative font-display text-5xl font-bold tracking-tight text-white md:text-6xl">
                    <Counter to={k.n} suffix={k.s} />
                  </div>
                  <div className="relative mt-2 text-sm text-white/50">{k.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROCESS                                                            */
/* ------------------------------------------------------------------ */
const steps = [
  { n: "01", t: "Diagnóstico", d: "Mergulho profundo em marca, mercado e concorrência." },
  { n: "02", t: "Planejamento", d: "Estratégia sob medida, com metas e KPIs claros." },
  { n: "03", t: "Execução", d: "Criativo e mídia em ritmo de alta performance." },
  { n: "04", t: "Otimização", d: "Ajuste fino contínuo baseado em dados reais." },
  { n: "05", t: "Escala", d: "Multiplicamos o que funciona, com previsibilidade." },
];

function Process() {
  return (
    <section id="processo" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <div className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#ff6b6b]">
                / processo
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="fall">

              <h2 className="max-w-xl font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
                Um método afinado em cinco atos.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-14 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:block" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1} variant="fall">
                <div className="group relative">
                  <div className="mb-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] text-[10px] font-semibold text-white/60 transition-all group-hover:border-[#ff1a1a] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(255,26,26,0.5)]">
                    {i + 1}
                  </div>
                  <div className="font-mono text-[11px] tracking-widest text-[#ff6b6b]">
                    {s.n}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PORTFOLIO                                                          */
/* ------------------------------------------------------------------ */
const projects = [
  {
    title: "Lumina Cosméticos",
    tag: "Branding · Meta Ads",
    metric: "+380% em vendas",
    color: "from-rose-500/40 to-fuchsia-500/40",
  },
  {
    title: "Núcleo Fitness",
    tag: "Social · Reels",
    metric: "1.2M alcance orgânico",
    color: "from-amber-500/40 to-red-500/40",
  },
  {
    title: "Vertex Imóveis",
    tag: "Google Ads · Landing",
    metric: "CPL reduzido em 62%",
    color: "from-sky-500/40 to-indigo-500/40",
  },
  {
    title: "Orla Restaurante",
    tag: "Identidade · Conteúdo",
    metric: "Reservas 4x maiores",
    color: "from-emerald-500/40 to-teal-500/40",
  },
];

function Portfolio() {
  return (
    <section id="portfolio" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16">
          <Reveal>
            <div className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#ff6b6b]">
              / portfólio
            </div>
          </Reveal>
          <Reveal delay={0.1} variant="mask">

            <h2 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
              Cases reais. Números que falam por si.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} variant="scale">
              <div
                data-cursor="hover"
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.6), transparent 60%)",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="absolute inset-0 bg-[#0a0a0a]/0 transition-colors duration-700 group-hover:bg-[#0a0a0a]/80" />
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/80">
                      {p.tag}
                    </div>
                    <div className="rounded-full border border-white/20 bg-[#0a0a0a]/[0.04] px-3 py-1 text-[10px] font-medium text-white backdrop-blur">
                      {p.metric}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-semibold text-white md:text-4xl">
                      {p.title}
                    </h3>
                    <div className="mt-4 flex translate-y-4 items-center gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-2 text-xs font-semibold text-white">
                        Ver projeto <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    name: "Ana Ribeiro",
    company: "CEO · Lumina",
    text:
      "A GR7 mudou completamente nossa curva de crescimento. Estratégia impecável, execução cirúrgica.",
  },
  {
    name: "Rafael Marques",
    company: "Diretor · Vertex",
    text:
      "Reduziram nosso CPL em mais de 60% em três meses. Nunca vi um time tão obcecado por dados.",
  },
  {
    name: "Camila Duarte",
    company: "Founder · Orla",
    text:
      "Não é agência. É extensão do nosso time. Posicionamento e presença ficaram outros.",
  },
  {
    name: "Bruno Teixeira",
    company: "COO · Núcleo",
    text:
      "Criativos com identidade forte e resultado real. O ROI fala por si.",
  },
  {
    name: "Marina Souza",
    company: "Founder · Atrio",
    text:
      "Profissionalismo raro. Cada campanha entregue no timing e no padrão prometidos.",
  },
];

function Testimonials() {
  return (
    <section id="depoimentos" className="relative isolate overflow-hidden py-32 md:py-44">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(800px circle at 20% 50%, rgba(255,26,26,0.06), transparent 60%)",
        }}
      />
      <div className="mx-auto mb-16 max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#ff6b6b]">
            / depoimentos
          </div>
        </Reveal>
        <Reveal delay={0.1} variant="fall">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
            Marcas que já vivem no próximo nível.
          </h2>
        </Reveal>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#050505] to-transparent" />
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="relative w-[360px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/[0.02] p-7 backdrop-blur-xl"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              <div className="flex gap-1 text-[#ff6b6b]">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-white/80">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ff1a1a] to-[#b30000] font-display text-sm font-bold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/50">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  RESULTS                                                            */
/* ------------------------------------------------------------------ */
function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6 text-center md:px-10">
        <Reveal>
          <div className="mb-6 text-[11px] uppercase tracking-[0.3em] text-[#ff6b6b]">
            / resultados
          </div>
        </Reveal>
        <Reveal delay={0.1} variant="mask">

          <h2 className="mx-auto max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.03em] text-white md:text-8xl">
            Não entregamos <span className="italic font-light text-white/50">curtidas.</span>
            <br />
            Entregamos <span className="bg-gradient-to-r from-[#ff2a2a] to-[#ff6b6b] bg-clip-text text-transparent">crescimento.</span>
          </h2>
        </Reveal>

        <div ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur md:p-10">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                {[
                  ["Conversões", "#ff4d4d"],
                  ["CTR", "#f97316"],
                  ["ROI", "#10b981"],
                ].map(([l, c]) => (
                  <div key={l} className="flex items-center gap-2 text-white/60">
                    <span className="h-2 w-2 rounded-full" style={{ background: c }} />
                    {l}
                  </div>
                ))}
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-medium text-emerald-300">
                +412% em 90 dias
              </div>
            </div>

            <svg viewBox="0 0 800 260" className="h-64 w-full md:h-80">
              <defs>
                <linearGradient id="rg1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="rgba(255,77,77,0.4)" />
                  <stop offset="1" stopColor="rgba(255,77,77,0)" />
                </linearGradient>
              </defs>
              {/* grid */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={40 + i * 50}
                  x2="800"
                  y2={40 + i * 50}
                  stroke="rgba(255,255,255,0.05)"
                />
              ))}
              {/* area */}
              <motion.path
                d="M0 220 L60 200 L120 210 L180 180 L240 170 L300 150 L360 155 L420 120 L480 100 L540 85 L600 60 L660 55 L720 30 L780 20 L800 15 L800 260 L0 260 Z"
                fill="url(#rg1)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 1 }}
              />
              {/* red line */}
              <motion.path
                d="M0 220 L60 200 L120 210 L180 180 L240 170 L300 150 L360 155 L420 120 L480 100 L540 85 L600 60 L660 55 L720 30 L780 20"
                stroke="#ff4d4d"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* orange line */}
              <motion.path
                d="M0 200 L100 190 L200 175 L300 165 L400 140 L500 130 L600 105 L700 90 L800 70"
                stroke="#f97316"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2.2, delay: 0.2, ease: "easeInOut" }}
              />
              {/* green line */}
              <motion.path
                d="M0 230 L100 225 L200 210 L300 195 L400 175 L500 155 L600 130 L700 105 L800 80"
                stroke="#10b981"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2.4, delay: 0.4, ease: "easeInOut" }}
              />
            </svg>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["ROI médio", "6.4x"],
                ["CTR", "3.9%"],
                ["Conversões", "12.4k"],
                ["Alcance", "5.2M"],
              ].map(([l, v]) => (
                <div key={l} className="rounded-xl border border-white/5 bg-[#0a0a0a]/[0.03] p-4 text-left">
                  <div className="text-[10px] uppercase tracking-widest text-white/50">{l}</div>
                  <div className="mt-1 font-display text-2xl font-bold text-white">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */
function CTA() {
  return (
    <section id="cta" className="relative isolate overflow-hidden py-32 md:py-48">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff1a1a] via-[#c9000f] to-[#7a0000]" />
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.5), transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <Reveal variant="mask">

          <h2 className="mx-auto max-w-4xl font-display text-4xl leading-[0.98] tracking-[-0.03em] text-white md:text-7xl">
            Sua empresa pode continuar sendo{" "}
            <span className="italic font-light text-white/70">mais uma...</span>
            <br />
            ou pode se tornar <span className="underline decoration-white/70 decoration-2 underline-offset-8">referência.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <motion.a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-3 rounded-full bg-[#0a0a0a] px-10 py-6 font-display text-base font-semibold text-white md:text-lg"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(0,0,0,0.4)",
                  "0 0 0 24px rgba(0,0,0,0)",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
            >
              Quero falar com a GR7
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-8 text-xs uppercase tracking-[0.35em] text-white/70">
            Resposta em até 24h · Sem compromisso
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a] py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-3 md:px-10">
        <div>
          <div className="inline-block rounded-2xl bg-[#0a0a0a] p-3">
            <img src={logoImg} alt="GR7 Company" className="h-10 w-auto" />
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">
            Marketing estratégico e criativo para marcas que decidiram dominar seu mercado.
          </p>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">Navegação</div>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {[
              ["Serviços", "#servicos"],
              ["Diferencial", "#diferencial"],
              ["Processo", "#processo"],
              ["Portfólio", "#portfolio"],
              ["Depoimentos", "#depoimentos"],
            ].map(([l, h]) => (
              <li key={h}>
                <a href={h} className="transition hover:text-[#ff6b6b]">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">Contato</div>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-[#ff6b6b]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/gr7.company"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-[#ff6b6b]"
              >
                <Instagram className="h-4 w-4" /> @gr7.company
              </a>
            </li>
            <li>
              <a
                href="mailto:contato@gr7.company"
                className="inline-flex items-center gap-2 transition hover:text-[#ff6b6b]"
              >
                <Mail className="h-4 w-4" /> contato@gr7.company
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/5 px-6 pt-8 text-xs text-white/50 md:flex-row md:px-10">
        <div>© {new Date().getFullYear()} GR7 Company. Todos os direitos reservados.</div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff1a1a] shadow-[0_0_10px_#ff1a1a]" />
          Operando em tempo real
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  MANIFESTO — bloco puramente tipográfico                            */
/* ------------------------------------------------------------------ */
function Manifesto() {
  const lines: { text: string; red: string }[] = [
    { text: "Marketing não é sorte.", red: "sorte" },
    { text: "É método aplicado com repertório.", red: "método" },
    { text: "É criativo que respeita o dado.", red: "criativo" },
    { text: "É consistência todo santo dia.", red: "consistência" },
  ];
  return (
    <section id="manifesto" className="relative border-y border-white/5 bg-[#0a0a0a] py-32 md:py-44">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="mb-10 text-[11px] uppercase tracking-[0.3em] text-[#ff6b6b]">
            / manifesto
          </div>
        </Reveal>
        <div className="space-y-4 md:space-y-6">
          {lines.map((l, i) => (
            <Reveal key={l.text} delay={i * 0.08} variant="mask">
              <h2 className="font-display text-3xl leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
                {l.text.split(l.red).map((chunk, idx, arr) => (
                  <span key={idx}>
                    {chunk}
                    {idx < arr.length - 1 && (
                      <span className="text-[#ff1a1a]">{l.red}</span>
                    )}
                  </span>
                ))}
              </h2>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <p className="mt-14 max-w-xl text-sm leading-relaxed text-white/50">
            É por isso que a GR7 opera diferente. Nada de improviso, nada de
            "achismo". Cada decisão passa por estratégia, execução e leitura de
            dado — no mesmo time, no mesmo padrão.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STACK & FERRAMENTAS — grid enxuto                                  */
/* ------------------------------------------------------------------ */
const stack: { name: string; icon: typeof Target }[] = [
  { name: "Meta Ads", icon: Target },
  { name: "Google Ads", icon: LineChart },
  { name: "GA4", icon: BarChart3 },
  { name: "Looker Studio", icon: TrendingUp },
  { name: "HubSpot", icon: BrainCircuit },
  { name: "Notion", icon: FileText },
  { name: "Figma", icon: Layers },
  { name: "CapCut", icon: Video },
  { name: "Premiere", icon: Play },
  { name: "Photoshop", icon: Palette },
  { name: "Illustrator", icon: Sparkles },
  { name: "WhatsApp Business", icon: MessageCircle },
];

function Stack() {
  return (
    <section id="stack" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <div className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#ff6b6b]">
                / stack &amp; ferramentas
              </div>
            </Reveal>
            <Reveal delay={0.1} variant="fall">
              <h2 className="max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
                As mesmas ferramentas que as grandes agências usam.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Do criativo à mensuração, operamos com o topo de mercado — sem
              atalho, sem improviso.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {stack.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.03} variant="scale">
              <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-4 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff1a1a]/40 hover:ring-[#ff1a1a]/20">
                <t.icon className="h-4 w-4 text-white/70 transition-colors group-hover:text-[#ff1a1a]" />
                <span className="text-sm font-medium tracking-tight text-white">
                  {t.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ — acordeão minimalista                                         */
/* ------------------------------------------------------------------ */
const faq: { q: string; a: string }[] = [
  {
    q: "Vocês trabalham com qual porte de cliente?",
    a: "Trabalhamos com marcas que já faturam e querem escalar com previsibilidade — de negócios locais consolidados a empresas nacionais. Não atendemos quem busca apenas 'testar marketing'.",
  },
  {
    q: "Como funciona o onboarding?",
    a: "Nas duas primeiras semanas mergulhamos no seu negócio: diagnóstico de marca, auditoria de canais, plano estratégico e cronograma de produção. A partir daí, execução contínua com rituais semanais.",
  },
  {
    q: "Em quanto tempo aparecem os primeiros resultados?",
    a: "Mídia paga tem leitura em 15–30 dias. Marca, conteúdo e SEO começam a compor entre 60–90 dias. Sempre com metas claras e relatório mensurável desde o primeiro mês.",
  },
  {
    q: "Vocês fecham contrato mensal?",
    a: "Sim. Contrato de 6 meses no mínimo — é o prazo em que a estratégia amadurece e o resultado se estabiliza. Marketing sério não cabe em ciclo de 30 dias.",
  },
  {
    q: "Como é o relatório entregue?",
    a: "Dashboard ao vivo no Looker Studio + reunião mensal de leitura com o time. Você acompanha número, criativo e decisão — sem planilha confusa, sem métrica de vaidade.",
  },
  {
    q: "Vocês assumem o marketing inteiro ou complementam time interno?",
    a: "Os dois formatos. Podemos operar como seu departamento de marketing completo ou integrar com seu time atual, cobrindo o que estiver faltando (criativo, mídia, dados, estratégia).",
  },
];

function FAQItem({ item, i }: { item: (typeof faq)[number]; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={i * 0.05}>
      <div className="border-b border-white/10">
        <button
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-lg leading-snug tracking-tight text-white md:text-2xl">
            {item.q}
          </span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 group-hover:border-[#ff1a1a] group-hover:text-[#ff1a1a] ${open ? "rotate-45 border-[#ff1a1a] text-[#ff1a1a]" : ""}`}
          >
            <span className="text-lg leading-none">+</span>
          </span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-3xl pb-6 pr-12 text-sm leading-relaxed text-white/60 md:text-base">
                {item.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function FAQ() {
  return (
    <section id="faq" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="mb-14">
          <Reveal>
            <div className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#ff6b6b]">
              / perguntas frequentes
            </div>
          </Reveal>
          <Reveal delay={0.1} variant="fall">
            <h2 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
              O que perguntam antes de contratar a GR7.
            </h2>
          </Reveal>
        </div>
        <div>
          {faq.map((f, i) => (
            <FAQItem key={f.q} item={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ROOT                                                               */
/* ------------------------------------------------------------------ */
export default function Landing() {
  const [loading, setLoading] = useState(true);
  const logoTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0a0a] font-sans text-white antialiased"
      style={{ cursor: "auto" }}
    >
      <AnimatePresence>
        {loading && (
          <Loader 
            done={() => setLoading(false)} 
            logoTargetRef={logoTargetRef}
          />
        )}
      </AnimatePresence>

      <AnimatedBackground />

      <ScrollProgress />
      <CustomCursor />
      <div className="relative z-10">
        <Nav logoRef={logoTargetRef} />

        {/* Global Progress Indicators for Sections */}
        <div className="fixed left-6 top-1/2 z-[40] hidden -translate-y-1/2 flex-col gap-3 lg:flex">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className={`text-[8px] font-bold ${i === 0 ? 'text-[#ff1a1a]' : 'text-white/20'}`}>0{i+1}</span>
              <div className={`h-8 w-[1px] ${i === 0 ? 'bg-[#ff1a1a]' : 'bg-white/10'}`} />
            </div>
          ))}
        </div>

        <main>
          <HeroIntro />
          <Hero />
          <Services />
          <ProjectsGrid />
          <Difference />
          
          <CinematicVideo />
          <Manifesto />
          <ReelsSection />

          
          <Process />
          <ArtsMasonry />
          <Stack />
          <BackstageGrid />
          <CasesShowcase />
          <Results />
          <DashboardsSection />
          <FAQ />
          <VideoTestimonialsSection />
          <ClientsMarquee />
          <InstagramProfile />
          <GR7InAction />
          <CTA />
        </main>

        <Footer />
      </div>
    </div>
  );
}
