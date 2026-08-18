/**
 * GR7 — Seções ricas em mídia (placeholders prontos para substituição)
 * Cada seção consome dados de `mediaConfig.ts` e usa `MediaSlot`
 * para permitir troca instantânea de imagens/vídeos sem alterar layout.
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
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
  Volume2,
  VolumeX,
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
/*  2. REELS — feed vertical em smartphones                            */
/* ================================================================== */
export function ReelsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Smooth scroll progression
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Specific rotations for each phone as requested
  const rotations = [-8, -3, 3, 8];

  return (
    <section className="relative py-32 md:py-40 overflow-hidden" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHead
          kicker="Reels"
          title={
            <>
              Formato vertical <br />
              <span className="italic text-white/50">feito para viralizar.</span>
            </>
          }
          lead="Substitua o placeholder por um MP4/WebM vertical. Autoplay silencioso, loop infinito, borda premium — pronto para publicar."
        />

        <div className="mt-24 relative min-h-[700px] md:min-h-[600px]">
          {/* Centered stack container */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-[220px]">
            {reels.map((r, i) => (
              <ReelSmartphone 
                key={i} 
                index={i} 
                media={r} 
                progress={smoothProgress} 
                rotation={rotations[i]} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReelSmartphone({
  index,
  media,
  progress,
  rotation,
}: {
  index: number;
  media: any;
  progress: any;
  rotation: number;
}) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // X-Travel (from center to grid)
  // Indices: 0 (-1.5 cols), 1 (-0.5 cols), 2 (0.5 cols), 3 (1.5 cols)
  const xDesktop = (index - 1.5) * 260; 
  // Mobile layout: 2 columns. Indices 0,1 top; 2,3 bottom.
  // Col positions: index 0,2 -> -0.5 width; index 1,3 -> 0.5 width
  const xMobile = (index % 2 === 0 ? -0.55 : 0.55) * 160;
  
  const xTarget = isMobile ? xMobile : xDesktop;
  const x = useTransform(progress, [0, 0.8, 1], [0, xTarget * 1.05, xTarget]);
  
  // Y-Travel
  const yMobile = index < 2 ? -180 : 180;
  const yTarget = isMobile ? yMobile : 0;
  const y = useTransform(progress, [0, 0.5, 0.8, 1], [0, isMobile ? yTarget * 0.5 : -40, yTarget * 1.05, yTarget]);
  
  // Rotation
  const r = useTransform(progress, [0, 0.2, 0.8, 1], [0, 0, rotation * 1.2, rotation]);
  
  // Scale gain life
  const scale = useTransform(progress, [0, 0.3, 1], [0.95, 1.05, isMobile ? 0.85 : 1]);
  
  // Z-index / Depth initial stack
  const zIndex = 10 - index;
  const initialZ = index * -10;
  const z = useTransform(progress, [0, 1], [initialZ, 0]);

  // Continuous micro-animation after expansion
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    return progress.on("change", (v: number) => {
      if (v >= 0.99) setIsFinished(true);
      else setIsFinished(false);
    });
  }, [progress]);

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        rotateZ: r,
        scale,
        zIndex,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        animate={isFinished ? {
          y: [0, index % 2 === 0 ? -5 : 5, 0],
          rotateZ: [rotation, rotation + (index % 2 === 0 ? 0.5 : -0.5), rotation],
        } : {}}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <PhoneFrame className="!shadow-2xl">
          <MediaSlot
            src={media.src}
            poster={media.poster}
            kind="video"
            className="absolute inset-0"
            icon="reel"
            label={`Reel ${index + 1}`}
          />
          {/* UI overlay estilo Reels */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 text-white">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-semibold">Reels</span>
              <span className="opacity-70">•</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[11px] font-semibold">@gr7.company</div>
                <div className="text-[10px] opacity-80">Direção GR7 · 2026</div>
              </div>
              <div className="flex flex-col gap-2 opacity-90">
                <Heart className="h-4 w-4" />
                <MsgIcon className="h-4 w-4" />
                <Send className="h-4 w-4" />
              </div>
            </div>
          </div>
        </PhoneFrame>
      </motion.div>
    </motion.div>
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeIndex = hoveredIndex ?? selectedIndex;
  const hasActiveCard = activeIndex !== null;

  return (
    <section 
      id="depoimentos" 
      className="relative flex min-h-[800px] items-center overflow-visible py-32 md:py-48"
    >
      <div className="mx-auto flex w-full flex-col">
        {/* Heading contained */}
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <SectionHead
              kicker="Depoimentos"
              title={
                <>
                  Quem viveu <span className="italic text-white/50">conta melhor.</span>
                </>
              }
              lead="Explore a experiência de quem já transformou seu posicionamento digital com a GR7."
            />
          </motion.div>
        </div>

        {/* Testimonials breakout */}
        <div className="mx-auto w-[94vw] max-w-[1680px]">
          {/* Testimonials Row */}
          <div 
            className="relative flex w-full flex-col gap-4 perspective-[1200px] lg:flex-row lg:items-stretch lg:justify-between lg:gap-2"
            style={{ transformStyle: "preserve-3d" }}
            onPointerLeave={() => setHoveredIndex(null)}
          >
            {videoTestimonials.map((v, i) => (
              <TestimonialCard
                key={i}
                index={i}
                data={v}
              isActive={activeIndex === i}
              activeIndex={activeIndex}
              isAnyActive={hasActiveCard}
                onPointerEnter={() => setHoveredIndex(i)}
                onClick={() => setSelectedIndex(selectedIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* Cinematic Ambient Lighting */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(255,26,26,0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
    </section>
  );
}

function TestimonialCard({
  index,
  data,
  isActive,
  activeIndex,
  isAnyActive,
  onPointerEnter,
  onClick,
}: {
  index: number;
  data: typeof videoTestimonials[0];
  isActive: boolean;
  activeIndex: number | null;
  isAnyActive: boolean;
  onPointerEnter: () => void;
  onClick: () => void;
}) {
  const total = videoTestimonials.length;
  const mid = (total - 1) / 2;
  const tiltY = (mid - index) * 2.5;



  return (
    <motion.div
      className="testimonial-slot relative h-[450px] w-full lg:h-[620px] xl:h-[640px] lg:basis-0"
      onPointerEnter={onPointerEnter}
      animate={{
        flexGrow: isActive ? 5.2 : isAnyActive ? 0.45 : 1,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.article
        onClick={onClick}
        initial={false}
        animate={{
          scale: isActive ? 1.025 : isAnyActive ? 0.975 : 1,
          zIndex: isActive ? 40 : isAnyActive ? 10 : 20,
          rotateY: isActive ? tiltY : 0,
          rotateX: isActive ? 1 : 0,
          translateZ: isActive ? 34 : activeIndex !== null && (index === activeIndex + 1 || index === activeIndex - 1) ? -8 : isAnyActive ? -14 : 0,
          opacity: isAnyActive && !isActive ? 0.52 : 1,
          filter: isAnyActive && !isActive ? "brightness(0.72) saturate(0.75)" : "brightness(1) saturate(1)",
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`testimonial-visual group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-[#0a0a0a] transition-colors duration-500 shadow-2xl will-change-transform lg:flex-row ${
          isActive
            ? "border-[#ff1a1a]/40 shadow-[0_30px_60px_-15px_rgba(255,26,26,0.3)]"
            : "border-white/10"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Active Edge Light */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: "radial-gradient(circle at 42% 50%, rgba(255,26,26,0.12), transparent 42%)",
            }}
          />
        )}
        
        {/* Border Light Sweep */}
        {isActive && (
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            className="absolute top-0 h-[1px] w-[30%] bg-gradient-to-r from-transparent via-[#ff1a1a] to-transparent"
          />
        )}
        {/* Media Column */}
        <motion.div
          className="relative h-full w-full lg:flex-none"
          initial={false}
          animate={{
            flexBasis: isActive ? "42%" : "100%",
            width: isActive ? "42%" : "100%",
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* LAYER A — CLOSED COVER */}
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: isActive ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <MediaSlot
                src={data.thumbnail}
                kind="image"
                alt={data.company}
                className="absolute inset-0 grayscale-[0.2] transition-all duration-700 group-hover:scale-[1.03] group-hover:brightness-[1.05] group-hover:grayscale-0 object-cover"
                icon="reel"
                ornate={false}
              />
            </motion.div>

            {/* LAYER B — ACTIVE ATMOSPHERIC BACKGROUND */}
            <motion.img
              src={data.thumbnail}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              initial={false}
              animate={{
                opacity: isActive ? 0.45 : 0,
                scale: isActive ? 1.15 : 1.05,
                filter: isActive
                  ? "blur(22px) brightness(0.4) saturate(0.85)"
                  : "blur(8px) brightness(0.7)",
              }}
              transition={{ duration: 0.55 }}
            />

            {/* LAYER C — ORIGINAL COVER / POSTER (Active Poster Mode) */}
            <motion.div
              className="absolute inset-[15px] z-20 h-[calc(100%-30px)] w-[calc(100%-30px)]"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.95,
                translateZ: isActive ? 12 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                src={data.thumbnail}
                alt={`${data.company} — depoimento`}
                className="h-full w-full object-contain object-center shadow-2xl"
              />
            </motion.div>
          </div>

          <div
            className={`absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/20 to-transparent transition-opacity duration-500 ${isActive ? "opacity-30" : "opacity-60"}`}
          />

          {/* Hit area for Reel Play (Central) */}
          <a
            href={data.reelHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Assistir depoimento de ${data.company}`}
            className="absolute left-1/2 top-1/2 z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur transition-all duration-300 hover:scale-110 hover:border-[#ff1a1a] focus-visible:ring-2 focus-visible:ring-[#ff1a1a]"
          >
            <Play className="h-6 w-6 translate-x-0.5 fill-white text-white transition-colors hover:fill-[#ff1a1a] hover:text-[#ff1a1a]" />
          </a>

          {/* Small Play Button (Top Left) */}
          <a
            href={data.reelHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Assistir depoimento de ${data.company} no Instagram`}
            className={`absolute left-4 top-4 z-30 rounded-full bg-[#0a0a0a]/80 p-2 backdrop-blur transition-all duration-500 hover:bg-[#ff1a1a]/20 hover:scale-110 active:scale-95 ${
              isActive ? "scale-100 opacity-100" : "scale-75 opacity-70"
            }`}
          >
            <Play className="h-3 w-3 fill-[#ff1a1a] text-[#ff1a1a]" />
          </a>

          <div className="absolute inset-x-0 bottom-0 p-5 lg:hidden">
            <div className="font-display text-lg text-white">{data.company}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff1a1a]">
              {data.segment}
            </div>
          </div>

          {/* Desktop-only simple label when not active */}
          {!isActive && (
            <div className="absolute inset-x-0 bottom-0 hidden p-6 lg:block">
              <div className={`font-display text-white transition-all duration-300 ${isAnyActive ? 'text-lg' : 'text-xl'}`}>
                {data.company}
              </div>
              {!isAnyActive && (
                <div className="mt-1 text-[9px] font-bold uppercase tracking-widest text-white/40">
                  {data.segment.split(" ")[0]}
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Content Column (Revealed on active) */}
        <motion.div
          initial={false}
          animate={{
            flexBasis: isActive ? "58%" : "0%",
            width: isActive ? "58%" : "0%",
            opacity: isActive ? 1 : 0,
            x: isActive ? 0 : 20,
          }}
          transition={{
            flexBasis: {
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            },
            width: {
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: isActive ? 0.28 : 0.12,
              delay: isActive ? 0.10 : 0,
            },
            x: {
              duration: 0.30,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden p-5 lg:flex-none xl:p-6"
        >
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex h-9 w-24 items-center justify-start opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              {data.logo ? (
                <img
                  src={data.logo}
                  alt={data.company}
                  className="h-full object-contain object-left"
                />
              ) : (
                <div className="max-w-full truncate font-display text-sm font-bold uppercase tracking-tight text-white/20">
                  {data.company}
                </div>
              )}
            </div>

            <div className="mt-5">
              <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#ff1a1a]">
                {data.segment}
              </div>
              <h3 className="mt-2 font-display text-2xl leading-[1.05] text-white whitespace-normal break-normal hyphens-none xl:text-[28px]">
                {data.company}
              </h3>
            </div>
 
            <blockquote className="mt-5 border-l border-[#ff1a1a] pl-4 text-sm italic leading-[1.5] text-white/70 xl:text-[15px]">
              “{data.quote}”
            </blockquote>
          </div>

          <div className="mt-5 shrink-0 space-y-3">
            <div>
              <div className="text-sm font-semibold text-white">{data.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                {data.role}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {data.tags.slice(0, 2).map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={data.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#ff1a1a] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#d90000] hover:scale-105 active:scale-95"
            >
              <InstagramIcon className="h-3 w-3" />
              Ver no Instagram
            </a>
          </div>
        </motion.div>
      </motion.article>
    </motion.div>
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
