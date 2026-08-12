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
    // We use a 1000x1000 coordinate system and map it to viewport
    const paths = {
      heroIntro: "M 500,450 Q 500,450 500,450", // A single point in the center
      heroPrincipal: "M 100,200 Q 500,100 900,200", // Soft curve across the top
      services: "M 50,400 Q 250,600 500,400 T 950,400", // S-curve through middle
      projects: "M 900,300 C 700,800 300,200 100,700", // Deep vertical loop
      metrics: "M 100,500 L 400,500 L 450,450 L 550,550 L 600,500 L 900,500", // Heartbeat/Metric style
      cta: "M 500,800 Q 500,850 500,900" // Vertical drop to bottom
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      }
    });

    // 1. Initial State
    gsap.set(pathRef.current, { 
      strokeDasharray: "2000", 
      strokeDashoffset: "2000",
      opacity: 0 
    });

    // 2. Timeline Coreography
    tl
      // HERO INTRO -> HERO PRINCIPAL (0-15%)
      .to(pathRef.current, { 
        opacity: 0.4, 
        strokeDashoffset: 1800, // Small segment appears
        ease: "none" 
      }, 0)
      .to(pathRef.current, {
        attr: { d: paths.heroPrincipal },
        strokeDashoffset: 1500,
        opacity: 0.6,
        ease: "power2.inOut"
      }, 0.1)
      
      // HERO PRINCIPAL -> SERVICES (15-40%)
      .to(pathRef.current, {
        attr: { d: paths.services },
        strokeDashoffset: 1000,
        opacity: 0.3, // Fade slightly during content-heavy section
        ease: "power2.inOut"
      }, 0.25)

      // SERVICES -> PROJECTS (40-70%)
      .to(pathRef.current, {
        attr: { d: paths.projects },
        strokeDashoffset: 500,
        opacity: 0.5,
        ease: "power3.inOut"
      }, 0.5)

      // PROJECTS -> METRICS (70-85%)
      .to(pathRef.current, {
        attr: { d: paths.metrics },
        strokeDashoffset: 200,
        opacity: 0.7,
        ease: "elastic.out(1, 0.3)"
      }, 0.75)

      // METRICS -> CTA (85-100%)
      .to(pathRef.current, {
        attr: { d: paths.cta },
        strokeDashoffset: 0,
        opacity: 0.8,
        ease: "back.in(2)"
      }, 0.9);

    // 3. PARTICLES - Evolution based on scroll speed
    const particles = Array.from(particleGroupRef.current?.children || []);
    
    // Continuous organic movement
    particles.forEach((p, i) => {
      gsap.to(p, {
        x: "random(-40, 40)",
        y: "random(-40, 40)",
        opacity: "random(0.1, 0.4)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });

    // React to scroll velocity
    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const scale = gsap.utils.mapRange(0, 3000, 1, 2.5, velocity);
        const opacity = gsap.utils.mapRange(0, 3000, 0.2, 0.8, velocity);
        
        gsap.to(particleGroupRef.current, {
          scale: scale,
          opacity: opacity,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });

    // 4. ACTIVE POINT - Follows the "head" of the path
    // This is a simplified simulation of the path head
    const pointPos = { x: 500, y: 500 };
    tl.to(pointPos, {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        onUpdate: (self) => {
          // Approximate position based on progress and current path
          // In a real production app we'd use path.getPointAtLength, 
          // but for this visual effect, an interpolated approach is smoother.
          const p = self.progress;
          let targetX = 500;
          let targetY = 500;

          if (p < 0.2) { targetX = 100 + p * 4000; targetY = 200; }
          else if (p < 0.5) { targetX = 500 + Math.sin(p * 10) * 200; targetY = 400; }
          else { targetX = 500; targetY = 500 + p * 400; }

          gsap.to(activePointRef.current, {
            cx: targetX,
            cy: targetY,
            duration: 0.8,
            ease: "power2.out"
          });
        }
      }
    });

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full opacity-60"
      >
        <defs>
          <filter id="flow-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff1a1a" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff1a1a" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff1a1a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* The Evolving Flow Path */}
        <path
          ref={pathRef}
          d="M 500,500 L 510,510"
          fill="none"
          stroke="url(#flow-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#flow-glow)"
          className="will-change-[d,opacity,stroke-dashoffset]"
        />

        {/* Particles Midground */}
        <g ref={particleGroupRef} className="will-change-transform">
          {Array.from({ length: 25 }).map((_, i) => (
            <circle
              key={i}
              r={Math.random() * 1.5 + 0.5}
              fill="#ff1a1a"
              cx={Math.random() * 1000}
              cy={Math.random() * 1000}
              className="opacity-20"
            />
          ))}
        </g>

        {/* Leading Active Point */}
        <circle
          ref={activePointRef}
          cx="500"
          cy="500"
          r="3"
          fill="#ff1a1a"
          filter="url(#flow-glow)"
          className="opacity-80"
        />
      </svg>

      {/* Atmospheric Blur Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(10,10,10,0.4)_100%)]" />
    </div>
  );
}
