import { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface GlobalScrollFlowProps {
  logoTargetRef: React.RefObject<HTMLDivElement | null>;
}

interface SectionMeta {
  id: string;
  el: HTMLElement;
  start: number;
  end: number;
  progress: number;
  path: string;
  opacity: number;
}

// Normalized paths using cubic Beziers for smooth interpolation
// Command count must match for stable morphing
const PATH_STATES = {
  heroIntro: "M 500,500 C 500,500 500,500 500,500 C 500,500 500,500 500,500 C 500,500 500,500 500,500",
  hero: "M 100,400 C 300,200 700,200 900,400 C 900,400 900,400 900,400 C 900,400 900,400 900,400",
  services: "M 50,500 C 250,800 500,200 750,800 C 850,500 950,500 950,500 C 950,500 950,500 950,500",
  portfolio: "M 900,200 C 700,800 300,200 100,800 C 100,800 100,800 100,800 C 100,800 100,800 100,800",
  reels: "M 500,100 C 800,400 200,600 500,900 C 500,900 500,900 500,900 C 500,900 500,900 500,900",
  results: "M 100,500 C 300,500 350,200 400,800 C 450,500 900,500 900,500 C 900,500 900,500 900,500",
  testimonials: "M 50,300 C 300,700 700,300 950,700 C 950,700 950,700 950,700 C 950,700 950,700 950,700",
  cta: "M 500,500 C 500,700 500,900 500,1000 C 500,1000 500,1000 500,1000 C 500,1000 500,1000 500,1000"
};

const SECTION_PATH_MAP: Record<string, string> = {
  'hero-intro': PATH_STATES.heroIntro,
  'hero': PATH_STATES.hero,
  'services': PATH_STATES.services,
  'portfolio': PATH_STATES.portfolio,
  'reels': PATH_STATES.reels,
  'results': PATH_STATES.results,
  'testimonials': PATH_STATES.testimonials,
  'cta': PATH_STATES.cta
};

class Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;

  constructor() {
    this.x = this.baseX = Math.random() * 1000;
    this.y = this.baseY = Math.random() * 1000;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.size = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.2 + 0.1;
    this.life = Math.random();
  }

  update(velocity: number, mouseX: number, mouseY: number, isMobile: boolean) {
    // Scroll velocity influence
    const vFactor = Math.min(velocity / 1000, 2);
    this.x += this.vx * (1 + vFactor * 5);
    this.y += this.vy * (1 + vFactor * 5);

    // Mouse influence (disabled on mobile)
    if (!isMobile) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        this.x -= dx * force * 0.02;
        this.y -= dy * force * 0.02;
      }
    }

    // Boundary wrap
    if (this.x < 0) this.x = 1000;
    if (this.x > 1000) this.x = 0;
    if (this.y < 0) this.y = 1000;
    if (this.y > 1000) this.y = 0;

    // Organic drift
    this.vx += (Math.random() - 0.5) * 0.01;
    this.vy += (Math.random() - 0.5) * 0.01;
    
    // Speed limit
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > 0.5) {
      this.vx *= 0.95;
      this.vy *= 0.95;
    }
  }
}

export default function GlobalScrollFlow({ logoTargetRef }: GlobalScrollFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const activePointRef = useRef<SVGCircleElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const particleElsRef = useRef<SVGCircleElement[]>([]);
  
  const mouseRef = useRef({ x: 500, y: 500, targetX: 500, targetY: 500 });
  const scrollRef = useRef({ velocity: 0, progress: 0, lastY: 0 });
  const sectionsRef = useRef<SectionMeta[]>([]);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const refreshMeasurements = contextSafe(() => {
    const sectionEls = document.querySelectorAll('[data-scroll-flow]');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    sectionsRef.current = Array.from(sectionEls).map((el) => {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const start = (rect.top + scrollTop) / (totalHeight || 1);
      const end = (rect.bottom + scrollTop) / (totalHeight || 1);
      const id = (el as HTMLElement).dataset.scrollFlow || '';
      
      console.log(`Section ${id}: start=${start.toFixed(3)}, end=${end.toFixed(3)}`);

      return {
        id,
        el: el as HTMLElement,
        start,
        end,
        progress: 0,
        path: SECTION_PATH_MAP[id] || PATH_STATES.hero,
        opacity: id === 'hero-intro' ? 0.3 : 0.6
      };
    });
    
    ScrollTrigger.refresh();
  });

  useGSAP(() => {
    if (!pathRef.current) return;

    // Initialize particles
    const count = isMobile ? 15 : 35;
    particlesRef.current = Array.from({ length: count }, () => new Particle());

    // Single Animation Loop
    const ticker = (time: number, deltaTime: number) => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? scrollY / totalHeight : 0;
      
      // Calculate Velocity
      const dy = scrollY - scrollRef.current.lastY;
      scrollRef.current.velocity = dy / (deltaTime / 1000);
      scrollRef.current.lastY = scrollY;
      scrollRef.current.progress = progress;

      // Mouse smoothing (1-2% displacement)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      
      const mouseOffset = {
        x: (mouseRef.current.x / window.innerWidth - 0.5) * 20,
        y: (mouseRef.current.y / window.innerHeight - 0.5) * 20
      };

      // Find active sections and interpolate
      let targetPath = PATH_STATES.heroIntro;
      let targetOpacity = 0.3;

      if (sectionsRef.current.length > 0) {
        // Fallback to the first section state if we're before it
        targetPath = sectionsRef.current[0].path;
        targetOpacity = sectionsRef.current[0].opacity;

        for (let i = 0; i < sectionsRef.current.length; i++) {
          const s = sectionsRef.current[i];
          // Use a small buffer to prevent sticking at the top
          if (progress >= s.start - 0.01) {
            targetPath = s.path;
            targetOpacity = s.opacity;
          }
        }
      }

      // Update Path & Active Node
      if (pathRef.current) {
        // We use a direct set for transform properties to avoid tween overhead
        // but keep a quick transition for the path 'd' attribute.
        gsap.to(pathRef.current, {
          attr: { d: targetPath },
          opacity: targetOpacity,
          duration: 0.8,
          ease: "power2.out",
          overwrite: 'auto'
        });

        gsap.set(pathRef.current, {
          x: mouseOffset.x,
          y: mouseOffset.y
        });

        // Position Active Node along path
        try {
          const length = pathRef.current.getTotalLength();
          const point = pathRef.current.getPointAtLength(length * (progress % 1));
          if (activePointRef.current) {
            gsap.set(activePointRef.current, {
              cx: point.x,
              cy: point.y,
              x: mouseOffset.x,
              y: mouseOffset.y
            });
          }
        } catch (e) {}
      }

      // Update Particles
      particlesRef.current.forEach((p, i) => {
        p.update(Math.abs(scrollRef.current.velocity), mouseRef.current.x, mouseRef.current.y, isMobile);
        const el = particleElsRef.current[i];
        if (el) {
          gsap.set(el, {
            cx: p.x,
            cy: p.y,
            opacity: p.opacity,
            scale: 1 + Math.abs(scrollRef.current.velocity) / 5000
          });
        }
      });
    };

    gsap.ticker.add(ticker);

    // Initial measurements
    refreshMeasurements();

    // Listeners
    window.addEventListener('resize', refreshMeasurements);
    window.addEventListener('scroll', ScrollTrigger.update);
    
    // Handle dynamic content
    const observer = new MutationObserver(refreshMeasurements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('resize', refreshMeasurements);
      window.removeEventListener('scroll', ScrollTrigger.update);
      observer.disconnect();
    };
  }, { scope: containerRef });

  // Mouse Interaction
  useEffect(() => {
    if (isMobile) return;
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden will-change-transform"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <filter id="flow-blur-new" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
          
          <linearGradient id="flow-grad-new" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff1a1a" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff1a1a" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff1a1a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* The Core Path */}
        <path
          ref={pathRef}
          d={PATH_STATES.heroIntro}
          fill="none"
          stroke="url(#flow-grad-new)"
          strokeWidth="1.2"
          strokeLinecap="round"
          filter="url(#flow-blur-new)"
          className="will-change-[d,opacity]"
        />

        {/* Particles */}
        <g className="particles-layer">
          {Array.from({ length: 35 }).map((_, i) => (
            <circle
              key={i}
              ref={el => { if (el) particleElsRef.current[i] = el; }}
              r={1}
              fill="#ff1a1a"
              className="will-change-[cx,cy,opacity]"
            />
          ))}
        </g>

        {/* Active Node */}
        <circle
          ref={activePointRef}
          r="3"
          fill="#ff1a1a"
          filter="url(#flow-blur-new)"
          className="opacity-80 will-change-[cx,cy]"
        />
      </svg>
    </div>
  );
}