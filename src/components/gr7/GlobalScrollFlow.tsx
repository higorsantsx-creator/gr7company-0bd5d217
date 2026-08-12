import { useEffect, useRef, useMemo } from 'react';
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
  const particleRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    if (!pathRef.current) return;

    // 1. PATH MORPHING / PROGRESSION
    // We'll use a single path that "evolves"
    // Hero Intro: Start as a small dot/line
    // Hero Principal: Curve and expand
    // Services: Branch out (simulated by path changes)
    // Projects: Convergence
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // Initial State (Hero Intro) - almost invisible or a point
    gsap.set(pathRef.current, { strokeDasharray: "0 1000", opacity: 0 });

    // Evolution Phases
    tl.to(pathRef.current, {
      opacity: 0.4,
      strokeDasharray: "100 1000",
      ease: "none",
    }, 0)
    .to(pathRef.current, {
      attr: { d: "M 50,200 Q 150,150 250,200 T 450,200 T 650,200 T 850,200" }, // Simple wave
      opacity: 0.6,
      ease: "power1.inOut"
    }, 0.1)
    .to(pathRef.current, {
      attr: { d: "M 50,300 C 200,100 400,500 600,300 S 800,100 1000,300" }, // More complex curve
      ease: "power2.inOut"
    }, 0.3)
    .to(pathRef.current, {
      opacity: 0.2, // Fade out in some sections as requested
      ease: "power1.inOut"
    }, 0.5)
    .to(pathRef.current, {
      opacity: 0.5,
      attr: { d: "M 100,500 L 900,500" }, // Straighten for convergence
      ease: "power2.inOut"
    }, 0.8)
    .to(pathRef.current, {
      opacity: 0.8,
      attr: { d: "M 450,500 L 550,500" }, // Converge to a point near bottom
      ease: "back.in(2)"
    }, 0.95);

    // 2. PARTICLES FOLLOW
    const particles = particleRef.current?.children;
    if (particles) {
      Array.from(particles).forEach((p, i) => {
        gsap.to(p, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          opacity: "random(0.1, 0.5)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1
        });
        
        // Follow scroll loosely
        gsap.to(p, {
          y: "+=200",
          scrollTrigger: {
            trigger: "body",
            scrub: 2,
          }
        });
      });
    }

    // 3. GLOW PULSE
    gsap.to(glowRef.current, {
      r: "+=10",
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  // Mouse Interaction (Displacement)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!pathRef.current) return;
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.02;
      const moveY = (clientY - window.innerHeight / 2) * 0.02;
      
      gsap.to([pathRef.current, particleRef.current, glowRef.current], {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {/* The Main Flow Path */}
        <path
          ref={pathRef}
          d="M 500,500 L 510,510" // Initial tiny segment
          fill="none"
          stroke="#ff1a1a"
          strokeWidth="0.5"
          strokeLinecap="round"
          filter="url(#glow)"
          className="will-change-[d,opacity,stroke-dasharray]"
        />

        {/* Dynamic Glow Definition */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Partículas / Flow Detail */}
        <g ref={particleRef}>
          {Array.from({ length: 15 }).map((_, i) => (
            <circle
              key={i}
              r="1"
              fill="#ff1a1a"
              cx={Math.random() * 1000}
              cy={Math.random() * 1000}
              className="opacity-20"
            />
          ))}
        </g>

        {/* Pulse Point (The "Active" element) */}
        <circle
          ref={glowRef}
          cx="500"
          cy="500"
          r="2"
          fill="#ff1a1a"
          className="opacity-60"
        />
      </svg>
    </div>
  );
}
