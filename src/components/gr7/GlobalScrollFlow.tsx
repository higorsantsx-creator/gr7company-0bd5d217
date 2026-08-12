import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface GlobalScrollFlowProps {
  logoTargetRef: React.RefObject<HTMLDivElement | null>;
}

export default function GlobalScrollFlow({ logoTargetRef }: GlobalScrollFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const particleGroupRef = useRef<SVGGElement>(null);
  const activePointRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    if (!pathRef.current || !activePointRef.current) return;

    // Define standard path states for different scroll phases
    const paths = {
      heroIntro: "M 500,500 L 510,500", 
      heroPrincipal: "M 100,300 Q 500,100 900,300", 
      services: "M 50,500 Q 250,800 500,500 T 950,500", 
      projects: "M 900,400 C 700,900 300,100 100,800", 
      results: "M 100,500 L 300,500 L 350,400 L 400,600 L 450,500 L 900,500", 
      cta: "M 500,800 Q 500,900 500,950" 
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // Initial State
    gsap.set(pathRef.current, { 
      strokeDasharray: "3000", 
      strokeDashoffset: "3000",
      opacity: 0 
    });

    // Evolution Flow
    tl
      // Phase 1: Hero Intro (Point to Line)
      .to(pathRef.current, { 
        opacity: 0.5, 
        strokeDashoffset: 2800,
        ease: "none" 
      }, 0)
      
      // Phase 2: Hero Principal (Curve)
      .to(pathRef.current, {
        attr: { d: paths.heroPrincipal },
        strokeDashoffset: 2200,
        opacity: 0.7,
        ease: "power2.inOut"
      }, 0.1)
      
      // Phase 3: Services (Waves + Branching simulation via opacity)
      .to(pathRef.current, {
        attr: { d: paths.services },
        strokeDashoffset: 1500,
        opacity: 0.3, 
        ease: "power2.inOut"
      }, 0.3)

      // Phase 4: Projects (Looping)
      .to(pathRef.current, {
        attr: { d: paths.projects },
        strokeDashoffset: 800,
        opacity: 0.5,
        ease: "power3.inOut"
      }, 0.55)

      // Phase 5: Results (Metric Pulses)
      .to(pathRef.current, {
        attr: { d: paths.results },
        strokeDashoffset: 300,
        opacity: 0.8,
        ease: "elastic.out(1, 0.3)"
      }, 0.8)

      // Phase 6: CTA (Convergence)
      .to(pathRef.current, {
        attr: { d: paths.cta },
        strokeDashoffset: 0,
        opacity: 1,
        ease: "back.in(2)"
      }, 0.95);

    // Particle behavior - reaction to scroll speed
    const particles = Array.from(particleGroupRef.current?.children || []);
    
    // Base organic movement
    particles.forEach((p, i) => {
      gsap.to(p, {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        opacity: "random(0.1, 0.5)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1
      });
    });

    // Reactive velocity
    ScrollTrigger.create({
      onUpdate: (self) => {
        const vel = Math.abs(self.getVelocity());
        const scale = gsap.utils.mapRange(0, 4000, 1, 3, vel);
        const blur = gsap.utils.mapRange(0, 4000, 0, 4, vel);
        
        gsap.to(particleGroupRef.current, {
          scale: scale,
          filter: `blur(${blur}px)`,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });

    // Pulse effects on specific elements (Services, Projects, Results)
    const sections = ['[data-service-card]', '#projetos button', '#resultados h2'];
    sections.forEach(selector => {
      gsap.utils.toArray(selector).forEach((el: any) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          onEnter: () => {
            gsap.fromTo(activePointRef.current, 
              { scale: 1, filter: "brightness(1)" },
              { scale: 3, filter: "brightness(2)", duration: 0.3, yoyo: true, repeat: 1 }
            );
          }
        });
      });
    });

  }, { scope: containerRef });

  // Mouse repulsion interaction
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) * 0.015;
      const moveY = (clientY - centerY) * 0.015;

      gsap.to(pathRef.current, { x: moveX, y: moveY, duration: 1.2, ease: "power2.out" });
      gsap.to(particleGroupRef.current, { x: moveX * 1.5, y: moveY * 1.5, duration: 1.5, ease: "power2.out" });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <filter id="flow-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
          
          <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff1a1a" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff1a1a" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff1a1a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* The Core Path */}
        <path
          ref={pathRef}
          d="M 500,500 L 510,500"
          fill="none"
          stroke="url(#flow-grad)"
          strokeWidth="1.2"
          strokeLinecap="round"
          filter="url(#flow-blur)"
          className="will-change-[d,opacity,stroke-dashoffset]"
        />

        {/* Particles */}
        <g ref={particleGroupRef} className="will-change-transform">
          {Array.from({ length: 30 }).map((_, i) => (
            <circle
              key={i}
              r={Math.random() * 1.2 + 0.4}
              fill="#ff1a1a"
              cx={Math.random() * 1000}
              cy={Math.random() * 1000}
              className="opacity-15"
            />
          ))}
        </g>

        {/* Active Node */}
        <circle
          ref={activePointRef}
          cx="500"
          cy="500"
          r="2.5"
          fill="#ff1a1a"
          filter="url(#flow-blur)"
          className="opacity-70"
        />
      </svg>
    </div>
  );
}
