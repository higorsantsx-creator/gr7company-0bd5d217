/**
 * GR7 — Seções ricas em mídia (placeholders prontos para substituição)
 * Cada seção consome dados de `mediaConfig.ts` e usa `MediaSlot`
 * para permitir troca instantânea de imagens/vídeos sem alterar layout.
 */
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll as useMotionScroll, useTransform as useMotionTransform } from "motion/react";
import {
  ArrowRight,
  Play,
  X,
  Instagram as InstagramIcon,
  Grid3x3,
  Bookmark,
  Heart,
  MessageCircle as MsgIcon,
  Send,
  MoreHorizontal,
} from "lucide-react";

import { MediaSlot, PhoneFrame, NotebookFrame } from "./MediaSlot";

import gr7LogoDark from "@/assets/gr7-logo-dark.png";
import {
  projects,
  reels,
  stories,
  arts,
  identity,
  cinematic,
  backstage,
  clientLogos,
  cases,
  dashboards,
  videoTestimonials,
  instagram,
  inAction,
} from "./mediaConfig";
import { projectDataset, type ProjectData } from "./projectData";
import { ProjectDashboard } from "./ProjectDashboard";


/* ------------------------------------------------------------------ */
/*  Section header (kicker + big title + optional lead)                */
/* ------------------------------------------------------------------ */
function SectionHead({
  kicker,
  title,
  lead,
  align = "left",
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-[#ff1a1a]">
        / {kicker}
      </div>
      <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-6 max-w-2xl text-base text-white/60 md:text-lg">{lead}</p>
      )}
    </div>
  );
}

/* ================================================================== */
/*  1. PROJECTS GRID — "Alguns projetos que falam por nós"             */
/* ================================================================== */
export function ProjectsGrid() {
  const [active, setActive] = useState<ProjectData | null>(null);

  const largeItems = projects
    .map((p, i) => ({ p, i, data: projectDataset[i] }))
    .filter(({ i }) => i % 5 === 0);
  const smallItems = projects
    .map((p, i) => ({ p, i, data: projectDataset[i] }))
    .filter(({ i }) => i % 5 !== 0);

  return (
    <section id="projetos" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHead
          kicker="Portfólio"
          title={
            <>
              Alguns projetos <br />
              <span className="italic text-white/50">que falam por nós.</span>
            </>
          }
          lead="Cada card abre um relatório interativo com KPIs, gráficos, timeline e depoimento — como se você entrasse no painel BI da GR7."
        />

        {/* Desktop: primeira coluna independente (grande) + coluna direita (pequenos) */}
        <div className="mt-16 hidden grid-cols-1 gap-5 lg:grid lg:grid-cols-2">
          {/* Coluna esquerda — Total Giro e Shineray empilhados com gap uniforme */}
          <div className="grid grid-cols-1 gap-5">
            {largeItems.map(({ p, i, data }) => (
              <div key={i} style={{ aspectRatio: "1 / 1" }}>
                <button
                  type="button"
                  onClick={() => data && setActive(data)}
                  className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] text-left"
                >
                  <MediaSlot
                    src={p.src}
                    kind={p.kind}
                    alt={`${p.client} — ${p.category}`}
                    className={`absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-110 ${p.bg === "white" ? "object-contain p-8" : "object-cover"}`}
                    label={p.category}
                    bg={p.bg}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 z-10 translate-y-6 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                      {p.category}
                    </div>
                    <div className="mt-1 font-display text-xl text-white">{p.client}</div>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-2 text-xs font-semibold text-white">
                      Ver relatório <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-[#0a0a0a]/85 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/70 backdrop-blur transition-opacity duration-500 group-hover:opacity-0">
                    {p.category.split("·")[0].trim()}
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Coluna direita — 6 cards pequenos em grid 2x3 */}
          <div className="grid grid-cols-2 gap-5">
            {smallItems.map(({ p, i, data }) => (
              <div key={i} style={{ aspectRatio: "4 / 5" }}>
                <button
                  type="button"
                  onClick={() => data && setActive(data)}
                  className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] text-left"
                >
                  <MediaSlot
                    src={p.src}
                    kind={p.kind}
                    alt={`${p.client} — ${p.category}`}
                    className={`absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-110 ${p.bg === "white" ? "object-contain p-8" : "object-cover"}`}
                    label={p.category}
                    bg={p.bg}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 z-10 translate-y-6 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                      {p.category}
                    </div>
                    <div className="mt-1 font-display text-xl text-white">{p.client}</div>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-2 text-xs font-semibold text-white">
                      Ver relatório <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-[#0a0a0a]/85 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/70 backdrop-blur transition-opacity duration-500 group-hover:opacity-0">
                    {p.category.split("·")[0].trim()}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: grid original adaptativo */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
          {projects.map((p, i) => {
            const data = projectDataset[i];
            const isLarge = i % 5 === 0;
            return (
              <div
                key={i}
                className={`${isLarge ? "sm:col-span-2" : ""}`}
                style={{ aspectRatio: isLarge ? "1 / 1" : "4 / 5" }}
              >
                <button
                  type="button"
                  onClick={() => data && setActive(data)}
                  className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] text-left"
                >
                  <MediaSlot
                    src={p.src}
                    kind={p.kind}
                    alt={`${p.client} — ${p.category}`}
                    className={`absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-110 ${projects[i]?.bg === "white" ? "object-contain p-8" : "object-cover"}`}
                    label={p.category}
                    bg={projects[i]?.bg}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 z-10 translate-y-6 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                      {p.category}
                    </div>
                    <div className="mt-1 font-display text-xl text-white">{p.client}</div>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-2 text-xs font-semibold text-white">
                      Ver relatório <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-[#0a0a0a]/85 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/70 backdrop-blur transition-opacity duration-500 group-hover:opacity-0">
                    {p.category.split("·")[0].trim()}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <ProjectDashboard data={active} onClose={() => setActive(null)} />
    </section>
  );
}


/* ================================================================== */
/*  2. REELS — "THE ATTENTION MACHINE" Cinematic Composition           */
/* ================================================================== */


export function ReelsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax de scroll
  const { scrollYProgress } = useMotionScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Movimentos de parallax variados por telefone
  const y1 = useMotionTransform(scrollYProgress, [0, 1], [-40, 40]);
  const y2 = useMotionTransform(scrollYProgress, [0, 1], [-20, 20]);
  const y3 = useMotionTransform(scrollYProgress, [0, 1], [0, 15]);
  const y4 = useMotionTransform(scrollYProgress, [0, 1], [30, -30]);

  const phonePositions = useMemo(() => [
    { y: y1, rotate: -6, z: 10, scale: 0.95, delay: 0.25, x: "-15%" },
    { y: y2, rotate: -3, z: 20, scale: 0.98, delay: 0.35, x: "-5%" },
    { y: y3, rotate: 0, z: 40, scale: 1.12, delay: 0.45, x: "0%", isMain: true },
    { y: y4, rotate: 6, z: 10, scale: 0.95, delay: 0.55, x: "15%" },
  ], [y1, y2, y3, y4]);


  return (
    <section 
      id="reels" 
      ref={sectionRef}
      className="relative min-h-[120vh] py-32 flex flex-col items-center overflow-hidden"
    >
      {/* 1. Identificador Editorial */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 w-full mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/40">
            CONTEÚDO VERTICAL / 04
          </span>
          <div className="h-[1px] w-12 bg-white/10" />
        </motion.div>

        {/* 2. Título Principal */}
        <h2 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight text-white max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="block"
          >
            CONTEÚDO QUE
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="block italic text-white/50"
          >
            FAZ O SCROLL PARAR.
          </motion.span>
        </h2>

        {/* 3. Texto de Apoio */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 max-w-[520px] text-base md:text-lg text-white/60 leading-relaxed"
        >
          Reels, campanhas e narrativas visuais criadas para transformar atenção em percepção, desejo e ação.
        </motion.p>
      </div>

      {/* 4. Composição Central de Smartphones */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-7xl px-6 md:px-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mt-20 md:mt-32 perspective-1000"
      >
        {reels.map((r, i) => {
          const pos = phonePositions[i];
          const isMain = pos.isMain;
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100, rotate: pos.rotate, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotate: pos.rotate, scale: pos.scale }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.2, 
                delay: pos.delay,
                ease: [0.22, 1, 0.36, 1] 
              }}
              style={{ 
                y: !isMobile ? pos.y : 0,
                zIndex: isMain ? 40 : 10 + i,
                x: !isMobile ? pos.x : "0%",
                perspective: "1000px"
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative w-full max-w-[260px] md:w-[280px] shrink-0"
            >

              <PhoneCard 
                i={i} 
                isMain={!!isMain} 
                r={r} 
                hoveredIndex={hoveredIndex} 
                setHoveredIndex={setHoveredIndex} 
              />
            </motion.div>
          );
        })}
      </div>


      {/* 5. Microcopy lateral */}
      <motion.div 
        style={{ y: y2 }}
        className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="flex items-center gap-6 rotate-90 origin-right translate-x-1/2">
          <div className="h-[1px] w-20 bg-white/5" />
          <span className="text-[10px] font-medium tracking-[0.5em] text-white/20 uppercase whitespace-nowrap">
            FEITO PARA O FORMATO QUE DOMINA A ATENÇÃO.
          </span>
        </div>
      </motion.div>

      {/* 6. Indicador de Scroll */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-auto pt-24 pb-12 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">
          Continue
        </span>
        <motion.div 
          animate={{ height: [20, 60, 20], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] bg-[#ff1a1a]"
        />
      </motion.div>
    </section>
  );
}

// Subcomponente de card individual do telefone para isolar estado de hover e UI
function PhoneCard({ i, isMain, r, hoveredIndex, setHoveredIndex }: { 
  i: number, 
  isMain: boolean, 
  r: any, 
  hoveredIndex: number | null, 
  setHoveredIndex: (idx: number | null) => void 
}) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Intensidade baixa para o 3D parallax (máximo 8 graus)
    const factor = isMain ? 4 : 8;
    setRotation({
      x: (mouseY / (rect.height / 2)) * -factor,
      y: (mouseX / (rect.width / 2)) * factor
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={{
        scale: hoveredIndex === i ? 1.025 : 1,
        opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.88 : 1,
        rotateX: rotation.x,
        rotateY: rotation.y,
        z: hoveredIndex === i ? 50 : 0
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredIndex(i)}
      onMouseLeave={handleMouseLeave}
      transition={{ duration: 0.4 }}
      className="relative cursor-pointer"
    >

      {/* Micro-identificação discreta */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
         <span className="text-[9px] font-mono tracking-widest text-white/30 italic">REEL / 0{i+1}</span>
      </div>

      <PhoneFrame className={`${isMain ? 'ring-1 ring-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]' : 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]'}`}>
        {/* Smartphone Gloss Effect */}
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-[2rem]">
          <motion.div 
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent w-1/2 -skew-x-12"
          />
        </div>

        <ReelVideo r={r} i={i} />

        {/* UI Discreta */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5 text-white z-20">
          <div className="flex items-end justify-between">
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#ff1a1a] animate-pulse" />
                 <span className="text-[9px] font-bold tracking-tighter opacity-80 uppercase">Playing</span>
              </div>
              <div className="text-[11px] font-bold tracking-tight">@gr7.company</div>
            </div>
            <div className="flex flex-col gap-4 mb-3 opacity-60">
               <div className="w-1 h-1 rounded-full bg-white/40" />
               <div className="w-1 h-1 rounded-full bg-white/40" />
               <div className="w-1 h-1 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </PhoneFrame>

      {isMain && (
        <div className="absolute -inset-4 z-[-1] rounded-[3rem] bg-[#ff1a1a]/5 blur-3xl opacity-50" />
      )}
    </motion.div>
  );
}


function ReelVideo({ r, i }: { r: any; i: number }) {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // MediaSlot renders the video inside, we need to find it
    const container = videoRef.current;
    if (!container) return;

    const video = container.querySelector('video');
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoRef} className="absolute inset-0">
      <MediaSlot
        src={r.src}
        poster={r.poster}
        kind="video"
        className="absolute inset-0"
        icon="reel"
        label={`Reel ${i + 1}`}
      />
    </div>
  );
}



/* ================================================================== */
/*  3. STORIES — círculos horizontais + modal                          */
/* ================================================================== */
export function StoriesRow() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="stories" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHead
          kicker="Stories"
          title={
            <>
              Stories em <span className="italic text-white/50">tempo real.</span>
            </>
          }
          lead="Clique em qualquer círculo para abrir o modal — o mesmo espaço receberá imagem ou vídeo real."
        />

        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {stories.map((s, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className="group flex shrink-0 flex-col items-center gap-3"
            >
              <div className="relative rounded-full bg-gradient-to-tr from-[#ff1a1a] via-[#ff6b6b] to-[#ff1a1a] p-[3px] transition-transform duration-300 group-hover:scale-105">
                <div className="rounded-full bg-[#0a0a0a] p-[3px]">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full md:h-24 md:w-24">
                    <MediaSlot
                      src={s.src}
                      alt={s.title}
                      className="absolute inset-0"
                      ornate={false}
                      label=""
                    />
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-white/70">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="relative aspect-[9/16] h-[80vh] max-h-[720px] overflow-hidden rounded-3xl border border-white/10 bg-neutral-900"
              onClick={(e) => e.stopPropagation()}
            >
              <MediaSlot
                src={stories[open].src}
                kind={stories[open].kind}
                alt={stories[open].title}
                className="absolute inset-0"
                icon="reel"
                label={stories[open].title}
              />
              <div className="absolute inset-x-0 top-0 flex gap-1 p-3">
                {stories.map((_, k) => (
                  <div
                    key={k}
                    className={`h-0.5 flex-1 rounded-full ${
                      k === open ? "bg-[#0a0a0a]" : "bg-[#0a0a0a]/30"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setOpen(null)}
                className="absolute right-3 top-6 rounded-full bg-[#0a0a0a]/10 p-2 text-white backdrop-blur"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="font-display text-2xl">{stories[open].title}</div>
                <div className="mt-1 text-xs opacity-70">GR7 Company · Story</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ================================================================== */
/*  4. ARTS — galeria Masonry estilo Pinterest                         */
/* ================================================================== */
export function ArtsMasonry() {
  const heights: Record<string, string> = {
    tall: "row-span-2",
    square: "",
    wide: "",
    portrait: "row-span-2",
  };
  const aspects: Record<string, string> = {
    tall: "aspect-[3/5]",
    square: "aspect-square",
    wide: "aspect-[4/3]",
    portrait: "aspect-[4/6]",
  };
  return (
    <section id="artes" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHead
          kicker="Artes"
          title={
            <>
              Design que <span className="italic text-white/50">impacta as campanhas.</span>
            </>
          }
          lead="Posts, banners, carrosséis, flyers e criativos. Galeria masonry pronta para receber cada arte real."
        />

        <div className="mt-16 columns-2 gap-4 md:columns-3 lg:columns-4">
          {arts.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]`}
            >
              <div className={`relative ${aspects[a.aspect]}`}>
                <MediaSlot
                  src={a.src}
                  alt={a.label}
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  label={a.label}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="text-[10px] uppercase tracking-widest text-white/70">
                    Arte
                  </div>
                  <div className="text-sm font-semibold text-white">{a.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  5. BRAND IDENTITY — antes/depois + brandbook                       */
/* ================================================================== */
export function BrandIdentity() {
  return (
    <section id="identidade" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHead
          kicker="Identidade Visual"
          title={
            <>
              Antes → depois. <br />
              <span className="italic text-white/50">Marcas reposicionadas.</span>
            </>
          }
          lead="Logotipo antigo à esquerda, versão criada pela GR7 à direita — mais brandbook, paleta, tipografia e mockups."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
            <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/50">
              Antes
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 grayscale">
              <MediaSlot
                src={identity.before.src}
                alt={identity.before.alt}
                className="absolute inset-0"
                label="Logo antiga"
              />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-[#ff1a1a]/30 bg-gradient-to-br from-white to-[#ff1a1a]/[0.04] p-8 shadow-[0_30px_80px_-40px_rgba(255,26,26,0.4)]">
            <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#ff1a1a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff1a1a]" />
              Depois · GR7
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-50">
              <MediaSlot
                src={identity.after.src}
                alt={identity.after.alt}
                className="absolute inset-0"
                label="Logo GR7"
              />
            </div>
          </div>
        </div>

        {/* Brandbook grid */}
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {identity.brandbook.map((m, i) => (
            <div
              key={i}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]"
            >
              <MediaSlot
                src={m.src}
                alt={m.alt}
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                label={m.alt}
              />
            </div>
          ))}
        </div>

        {/* Palette + typography */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
            <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/50">
              Paleta
            </div>
            <div className="flex gap-3">
              {identity.palette.map((c) => (
                <div key={c} className="flex-1">
                  <div
                    className="aspect-square rounded-xl border border-white/10"
                    style={{ background: c }}
                  />
                  <div className="mt-2 text-[10px] text-white/60">{c}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
            <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/50">
              Tipografia
            </div>
            <div className="font-display text-5xl leading-none text-white">Aa</div>
            <div className="mt-2 text-sm text-white/60">
              Archivo Black · Manrope · Sistema tipográfico completo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  6. CINEMATIC VIDEO — tela cheia com Play                           */
/* ================================================================== */
export function CinematicVideo() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  return (
    <section id="cinema" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.5)]">
          {cinematic.src ? (
            <video
              ref={videoRef}
              src={cinematic.src}
              poster={cinematic.poster}
              muted={!playing}
              loop
              playsInline
              autoPlay
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <MediaSlot
              src={cinematic.poster}
              alt={cinematic.alt}
              className="absolute inset-0"
              icon="video"
              label="Reel institucional"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <button
              onClick={() => {
                setPlaying(true);
                videoRef.current?.play();
              }}
              className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-[#0a0a0a]/90 backdrop-blur transition hover:scale-110"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-[#0a0a0a]/40" />
              <Play className="relative z-10 h-8 w-8 translate-x-0.5 fill-[#0a0a0a] text-white" />
            </button>
            <div className="text-center">
              <div className="font-display text-2xl text-white md:text-4xl">
                GR7 em movimento
              </div>
              <div className="mt-2 text-sm text-white/70">
                Reel institucional · direção, captação e edição própria
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  7. BACKSTAGE — grid irregular                                      */
/* ================================================================== */
export function BackstageGrid() {
  const spans: Record<string, string> = {
    sm: "col-span-2 row-span-1",
    md: "col-span-3 row-span-1",
    lg: "col-span-3 row-span-2",
    xl: "col-span-4 row-span-2",
  };
  return (
    <section id="bastidores" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHead
          kicker="Bastidores"
          title={
            <>
              Dia a dia dentro <br />
              <span className="italic text-white/50">da GR7.</span>
            </>
          }
          lead="Captação, drone, making of, reuniões, equipe. Grid irregular preparado para fotos e vídeos reais."
        />

        <div className="mt-16 grid auto-rows-[140px] grid-cols-6 gap-4 md:auto-rows-[180px] md:grid-cols-8">
          {backstage.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] ${spans[b.span]}`}
            >
              <MediaSlot
                src={b.src}
                kind={b.kind}
                alt={b.label}
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                label={b.label}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="text-xs font-semibold text-white">{b.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  8. CLIENTS MARQUEE — logos infinitos                               */
/* ================================================================== */
export function ClientsMarquee() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section id="clientes" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#ff1a1a]">
            / Clientes
          </div>
          <h2 className="font-display text-3xl tracking-tight text-white md:text-5xl">
            Marcas que já assinam com a GR7.
          </h2>
        </div>
      </div>

      <div className="relative mt-16 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {row.map((c, i) => (
            <div
              key={i}
              className="flex h-24 w-56 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0a]"
            >
              {c.src ? (
                <img src={c.src} alt={c.name} className="max-h-12 max-w-[70%] object-contain" />
              ) : (
                <span className="font-display text-xl uppercase tracking-widest text-white/60">
                  {c.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  9. CASES — cards enormes                                           */
/* ================================================================== */
export function CasesShowcase() {
  return (
    <section id="cases" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHead
          kicker="Cases"
          title={
            <>
              Cases completos. <br />
              <span className="italic text-white/50">Problema, estratégia, resultado.</span>
            </>
          }
        />

        <div className="mt-16 space-y-8">
          {cases.map((c, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 gap-8 rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 md:p-10 lg:grid-cols-12 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 lg:col-span-6">
                <MediaSlot
                  src={c.src}
                  kind={c.kind}
                  alt={c.client}
                  className="absolute inset-0"
                  label={c.client}
                />
              </div>
              <div className="flex flex-col justify-between lg:col-span-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#ff1a1a]">
                    Case · {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-white md:text-4xl">
                    {c.client}
                  </h3>
                  <div className="mt-6 space-y-4 text-sm">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">
                        Problema
                      </div>
                      <p className="mt-1 text-white/70">{c.problem}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">
                        Estratégia
                      </div>
                      <p className="mt-1 text-white/70">{c.strategy}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#ff1a1a]">
                        Resultado
                      </div>
                      <p className="mt-1 font-display text-2xl text-white">
                        {c.result}
                      </p>
                    </div>
                  </div>
                </div>
                <a
                  href={c.href ?? "#"}
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff1a1a]"
                >
                  Ver case completo <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  10. DASHBOARDS — notebooks com prints                              */
/* ================================================================== */
export function DashboardsSection() {
  return (
    <section id="dashboards" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHead
          kicker="Dashboards"
          title={
            <>
              Resultados reais <br />
              <span className="italic text-white/50">nas telas certas.</span>
            </>
          }
          lead="Meta Ads, Google Ads, Analytics, CRM e relatórios. Cada notebook está pronto para receber o print completo."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
          {dashboards.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <NotebookFrame>
                <MediaSlot
                  src={d.src}
                  kind={d.kind}
                  alt={d.label}
                  className="absolute inset-0"
                  label={d.label}
                />
              </NotebookFrame>
              <div className="mt-6 text-center">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Print · Dashboard
                </div>
                <div className="mt-1 font-display text-lg text-white">{d.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  11. VIDEO TESTIMONIALS — carrossel horizontal                      */
/* ================================================================== */
export function VideoTestimonialsSection() {
  return (
    <section id="depoimentos-video" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHead
          kicker="Depoimentos"
          title={
            <>
              Quem viveu <span className="italic text-white/50">conta melhor.</span>
            </>
          }
          lead="Clientes reais falando sobre a experiência com a GR7. Toque em qualquer card para assistir no Instagram."
        />
      </div>

      <div className="mt-16 flex gap-6 overflow-x-auto px-6 pb-6 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {videoTestimonials.map((v, i) => (
          <motion.a
            key={i}
            href={v.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative aspect-[9/16] w-[280px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900"
          >
            <MediaSlot
              src={v.src}
              kind="image"
              alt={`${v.name} — ${v.company}`}
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              icon="reel"
              label="Depoimento"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0a0a0a]/90 p-4 backdrop-blur transition group-hover:scale-110">
              <Play className="h-5 w-5 translate-x-0.5 fill-[#0a0a0a] text-white" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <div className="font-display text-lg">{v.name}</div>
              <div className="text-xs opacity-80">{v.company}</div>
            </div>
          </motion.a>
        ))}
      </div>

    </section>
  );
}

/* ================================================================== */
/*  12. INSTAGRAM PROFILE — feed 3x3 simulado                          */
/* ================================================================== */
export function InstagramProfile() {
  return (
    <section id="instagram" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]">
          {/* header */}
          <div className="flex items-center gap-3 border-b border-white/5 px-6 py-4">
            <InstagramIcon className="h-5 w-5" />
            <div className="font-semibold">instagram.com</div>
          </div>

          <div className="p-6 md:p-10">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-12">
              <div className="rounded-full bg-gradient-to-tr from-[#ff1a1a] via-[#ff6b6b] to-[#ff1a1a] p-1">
                <div className="rounded-full bg-white p-1">
                  <div className="relative h-28 w-28 overflow-hidden rounded-full bg-white md:h-32 md:w-32">
                    <img
                      src={instagram.avatar.src || gr7LogoDark}
                      alt={instagram.avatar.alt}
                      className="absolute inset-0 h-full w-full object-contain p-3"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <span className="text-lg font-light">{instagram.handle}</span>
                </div>
                <div className="mt-4 flex items-center justify-center gap-8 text-sm md:justify-start">
                  <div><b>{instagram.stats.posts}</b> posts</div>
                  <div><b>{instagram.stats.followers}</b> seguidores</div>
                  <div><b>{instagram.stats.following}</b> seguindo</div>
                </div>
                <div className="mt-4 max-w-md space-y-1 text-sm text-white/80">
                  <div className="font-semibold">{instagram.name}</div>
                  <div className="text-white/60">{instagram.category}</div>
                  {instagram.bio.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-10 border-t border-white/5 pt-4 text-xs uppercase tracking-widest text-white/60">
              <div className="flex items-center gap-2 border-t-2 border-[#0a0a0a] pt-3 text-white">
                <Grid3x3 className="h-3.5 w-3.5" /> Posts
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-1 md:gap-2">
              {instagram.posts.map((p, i) => (
                <a
                  key={i}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-[9/16] overflow-hidden bg-neutral-100"
                >
                  <MediaSlot
                    src={p.src}
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    label=""
                    ornate={false}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  13. GR7 EM AÇÃO — colagem cinematográfica final                    */
/* ================================================================== */
export function GR7InAction() {
  return (
    <section id="gr7-em-acao" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHead
          kicker="A GR7 em ação"
          title={
            <>
              Tudo, ao mesmo tempo, <br />
              <span className="italic text-white/50">funcionando.</span>
            </>
          }
          lead="Vídeos, fotos, artes, reels, dashboards, logos e clientes em uma única montagem. Preparada para receber cada mídia real."
          align="center"
        />

        <div className="mt-16 grid grid-cols-6 gap-3 md:gap-4">
          {inAction.map((m, i) => {
            const patterns = [
              "col-span-3 row-span-2 aspect-square",
              "col-span-3 aspect-[3/2]",
              "col-span-2 row-span-2 aspect-[2/3]",
              "col-span-2 aspect-square",
              "col-span-2 aspect-square",
              "col-span-4 aspect-[16/9]",
              "col-span-2 row-span-2 aspect-[2/3]",
              "col-span-2 aspect-square",
              "col-span-2 aspect-square",
              "col-span-4 aspect-[16/9]",
            ];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] ${patterns[i]}`}
              >
                <MediaSlot
                  src={m.src}
                  kind={m.kind}
                  className="absolute inset-0 transition-transform duration-[900ms] group-hover:scale-110"
                  label={`Slot ${i + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
