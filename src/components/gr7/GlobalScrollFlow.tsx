import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Unified path states with matching command structures for smooth morphing
// Using 6 cubic Bezier segments per path
const PATH_STATES = {
  heroIntro: "M 500,100 C 600,100 700,200 800,300 C 900,400 950,550 900,700 C 850,850 700,900 500,900 C 300,900 150,850 100,700 C 50,550 100,400 200,300 C 300,200 400,100 500,100 Z",
  hero: "M 500,50 C 700,50 950,200 950,500 C 950,800 700,950 500,950 C 300,950 50,800 50,500 C 50,200 300,50 500,50 C 500,50 500,50 500,50 C 500,50 500,50 500,50 Z",
  services: "M 100,500 C 100,200 300,100 500,100 C 700,100 900,200 900,500 C 900,800 700,900 500,900 C 300,900 100,800 100,500 C 100,500 100,500 100,500 C 100,500 100,500 100,500 Z",
  portfolio: "M 500,200 C 800,200 900,300 900,500 C 900,700 800,800 500,800 C 200,800 100,700 100,500 C 100,300 200,200 500,200 C 500,200 500,200 500,200 C 500,200 500,200 500,200 Z",
  reels: "M 200,500 C 200,300 350,200 500,200 C 650,200 800,300 800,500 C 800,700 650,800 500,800 C 350,800 200,700 200,500 C 200,500 200,500 200,500 C 200,500 200,500 200,500 Z",
  results: "M 500,100 C 900,100 900,300 900,500 C 900,700 900,900 500,900 C 100,900 100,700 100,500 C 100,300 100,100 500,100 C 500,100 500,100 500,100 C 500,100 500,100 500,100 Z",
  testimonials: "M 500,400 C 600,400 700,450 700,500 C 700,550 600,600 500,600 C 400,600 300,550 300,500 C 300,450 400,400 500,400 C 500,400 500,400 500,400 C 500,400 500,400 500,400 Z",
  cta: "M 500,50 C 950,50 950,500 950,500 C 950,500 950,950 500,950 C 50,950 50,500 50,500 C 50,500 50,50 500,50 C 500,50 500,50 500,50 C 500,50 500,50 500,50 Z"
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

interface SectionInfo {
  id: string;
  el: HTMLElement;
  start: number;
  end: number;
  progress: number;
  path: string;
  opacity: number;
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.baseSize = Math.random() * 2 + 1;
    this.size = this.baseSize;
  }

  update(velocity: number) {
    this.x += this.vx * (1 + velocity * 2);
    this.y += this.vy * (1 + velocity * 2);
    
    // Bounce particles within viewbox
    if (this.x < 0 || this.x > 1000) this.vx *= -1;
    if (this.y < 0 || this.y > 1000) this.vy *= -1;
  }
}

export const GlobalScrollFlow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const activePointRef = useRef<SVGCircleElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sectionsRef = useRef<SectionInfo[]>([]);
  const scrollRef = useRef({ current: 0, target: 0, velocity: 0 });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useGSAP(() => {
    // 1. Initialize Particles
    particlesRef.current = Array.from({ length: 40 }, () => 
      new Particle(Math.random() * 1000, Math.random() * 1000)
    );

    // 2. Section Detection & Measurement
    const refreshMeasurements = () => {
      const sectionEls = document.querySelectorAll('[data-scroll-flow]');
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      sectionsRef.current = Array.from(sectionEls).map((el) => {
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const start = (rect.top + scrollTop) / (totalHeight || 1);
        const end = (rect.bottom + scrollTop) / (totalHeight || 1);
        const id = (el as HTMLElement).dataset.scrollFlow || '';
        
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
    };

    refreshMeasurements();
    window.addEventListener('resize', refreshMeasurements);
    
    // Performance: Refresh on load and dynamic changes
    const mutationObserver = new MutationObserver(refreshMeasurements);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // 3. The Engine: Single high-performance ticker loop
    const ticker = (time: number, deltaTime: number) => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / (totalHeight || 1);
      
      // Smooth scroll tracking
      scrollRef.current.target = progress;
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.1;
      scrollRef.current.velocity = Math.abs(scrollRef.current.target - scrollRef.current.current) * 100;

      // Smooth mouse tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      
      const mouseOffset = {
        x: (mouseRef.current.x / window.innerWidth - 0.5) * 20,
        y: (mouseRef.current.y / window.innerHeight - 0.5) * 20
      };

      // Find active sections
      let targetPath = PATH_STATES.heroIntro;
      let targetOpacity = 0.3;

      if (sectionsRef.current.length > 0) {
        let activeIdx = 0;
        for (let i = 0; i < sectionsRef.current.length; i++) {
          if (progress >= sectionsRef.current[i].start - 0.01) {
            activeIdx = i;
          }
        }
        const s = sectionsRef.current[activeIdx];
        targetPath = s.path;
        targetOpacity = s.opacity;
      }

      // Update Path
      if (pathRef.current) {
        if (pathRef.current.getAttribute('data-last-path') !== targetPath) {
          pathRef.current.setAttribute('data-last-path', targetPath);
          gsap.to(pathRef.current, {
            attr: { d: targetPath },
            opacity: targetOpacity,
            duration: 0.8,
            ease: "power2.out",
            overwrite: 'auto'
          });
        }

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
              y: mouseOffset.y,
              opacity: targetOpacity + 0.2
            });
          }
        } catch (e) {
          // Path might not be ready
        }
      }

      // Update Particles
      const particleEls = containerRef.current?.querySelectorAll('.flow-particle');
      particlesRef.current.forEach((p, i) => {
        p.update(scrollRef.current.velocity);
        const el = particleEls?.[i];
        if (el) {
          gsap.set(el, {
            x: p.x + mouseOffset.x * 0.5,
            y: p.y + mouseOffset.y * 0.5,
            scale: 1 + scrollRef.current.velocity * 0.05,
            opacity: Math.max(0.1, 0.4 - scrollRef.current.velocity * 0.1)
          });
        }
      });
    };

    gsap.ticker.add(ticker);

    // Mouse events
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('resize', refreshMeasurements);
      window.removeEventListener('mousemove', onMouseMove);
      mutationObserver.disconnect();
    };
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-2 overflow-hidden"
      aria-hidden="true"
    >
      <svg 
        ref={svgRef}
        viewBox="0 0 1000 1000" 
        className="absolute inset-0 w-full h-full opacity-60"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="flow-blur-new" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </filter>
          
          <radialGradient id="flow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff1a1a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff1a1a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* The Core Flow Path */}
        <path
          ref={pathRef}
          d={PATH_STATES.heroIntro}
          fill="none"
          stroke="url(#flow-grad)"
          strokeWidth="2"
          filter="url(#flow-blur-new)"
          className="will-change-[d,transform,opacity]"
        />

        {/* The Active Node */}
        <circle
          ref={activePointRef}
          r="4"
          fill="#ff1a1a"
          className="filter blur-[2px] will-change-[transform,opacity]"
        />

        {/* Particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <circle
            key={i}
            r="1.5"
            fill="#ff1a1a"
            className="flow-particle opacity-20 will-change-transform"
          />
        ))}
      </svg>
      
      {/* Background Ambience Bloom */}
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-[#ff1a1a]/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default GlobalScrollFlow;