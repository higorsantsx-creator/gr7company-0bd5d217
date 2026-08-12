/**
 * GR7 — Project Dashboard (experiência cinematográfica)
 * ------------------------------------------------------------
 * Transição shared-element (layoutId) do card → tela cheia,
 * sequência de loading premium com frases encadeadas, e
 * dashboard BI completo (KPIs count-up, scores, gráficos
 * animados, before/after slider, timeline, galeria, entregas
 * e depoimento). Todo o layout consome `ProjectData`.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  X,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowLeftRight,
  Star,
  Clock3,
  CalendarDays,
  Layers,
  Quote,
  Instagram as InstagramIcon,
} from "lucide-react";
import type { ProjectData, ProjectKPI } from "./projectData";
import { cn } from "@/lib/utils";
import gr7Logo from "@/assets/gr7-logo.png";

/* ------------------------------------------------------------------ */
/*  CountUp — número anima do 0 até o valor final                      */
/* ------------------------------------------------------------------ */
function CountUp({
  value,
  duration = 1600,
  decimals = 0,
  prefix = "",
  suffix = "",
  start,
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  start: boolean;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(eased * value);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, start]);
  const formatted = useMemo(() => {
    if (value >= 1000 && decimals === 0) {
      return Math.round(n).toLocaleString("pt-BR");
    }
    return n.toFixed(decimals);
  }, [n, decimals, value]);
  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading premium                                                    */
/* ------------------------------------------------------------------ */
const LOADING_PHRASES = [
  "Preparando relatório...",
  "Conectando aos dados...",
  "Analisando campanhas...",
  "Processando resultados...",
  "Gerando dashboard...",
  "Concluído.",
];

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const total = 2000;
    const perPhrase = total / LOADING_PHRASES.length;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / total);
      setProgress(p);
      const next = Math.min(
        LOADING_PHRASES.length - 1,
        Math.floor((t - t0) / perPhrase),
      );
      setIdx(next);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0a0a0a]/85 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ff1a1a]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: "linear", repeat: Infinity }}
          />
        </div>
        <span className="text-[11px] uppercase tracking-[0.35em] text-white/50">
          GR7 · Business Intelligence
        </span>
      </div>

      <div className="mt-10 h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ y: 12, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -12, opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.35 }}
            className="text-sm text-white/70"
          >
            {LOADING_PHRASES[idx]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 h-[3px] w-64 overflow-hidden rounded-full bg-[#0a0a0a]/10">
        <motion.div
          className="h-full rounded-full bg-[#ff1a1a]"
          style={{ width: `${progress * 100}%`, boxShadow: "0 0 12px rgba(255,26,26,0.6)" }}
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Placeholder de mídia (elegante)                                    */
/* ------------------------------------------------------------------ */
function MediaPlaceholder({ label, ratio = "4/5" }: { label?: string; ratio?: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-[#ff1a1a]/[0.18]"
      style={{ aspectRatio: ratio }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {label && (
        <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-[#0a0a0a]/80 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/60 backdrop-blur">
          {label}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BAR chart (crescimento mensal) — barras crescem                    */
/* ------------------------------------------------------------------ */
function GrowthChart({ data }: { data: { label: string; value: number }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#ff1a1a]">
            / crescimento
          </div>
          <h4 className="mt-1 font-display text-xl text-white">
            Evolução mensal
          </h4>
        </div>
        <Sparkles className="h-4 w-4 text-white/30" />
      </div>
      <div className="flex h-56 items-end gap-3">
        {data.map((d, i) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative flex h-full w-full items-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: inView ? `${d.value}%` : 0 }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-t-md bg-gradient-to-t from-[#0a0a0a] to-[#ff1a1a]"
              />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">
              {d.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DONUT chart — desenhado com stroke-dashoffset                      */
/* ------------------------------------------------------------------ */
function DonutChart({
  data,
}: {
  data: { label: string; value: number; color: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const total = data.reduce((s, d) => s + d.value, 0);
  const R = 70;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const segments = data.map((d) => {
    const len = (d.value / total) * C;
    const seg = { ...d, len, off: offset };
    offset += len;
    return seg;
  });
  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#ff1a1a]">
            / distribuição
          </div>
          <h4 className="mt-1 font-display text-xl text-white">
            Peso por frente
          </h4>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <svg viewBox="0 0 180 180" className="h-44 w-44 -rotate-90">
          <circle cx="90" cy="90" r={R} fill="none" stroke="#f4f4f4" strokeWidth="18" />
          {segments.map((s, i) => (
            <motion.circle
              key={i}
              cx="90"
              cy="90"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth="18"
              strokeDasharray={`${s.len} ${C}`}
              strokeDashoffset={-s.off}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: "easeOut" }}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <ul className="flex-1 space-y-3">
          {data.map((d, i) => (
            <motion.li
              key={d.label}
              initial={{ opacity: 0, x: 8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: d.color }}
                />
                <span className="text-white">{d.label}</span>
              </div>
              <span className="text-white/50">{d.value}%</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Score bar (0-100 anima)                                            */
/* ------------------------------------------------------------------ */
function ScoreBar({
  label,
  value,
  large = false,
  delay = 0,
}: {
  label: string;
  value: number;
  large?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      <div className="mb-2 flex items-baseline justify-between">
        <span className={`${large ? "font-display text-lg text-white" : "text-sm text-white"}`}>
          {label}
        </span>
        <span className={`${large ? "font-display text-2xl text-white" : "text-sm text-white/60"}`}>
          {inView ? <CountUp value={value} start suffix="/100" /> : "0/100"}
        </span>
      </div>
      <div className={`overflow-hidden rounded-full bg-[#0a0a0a]/[0.06] ${large ? "h-2" : "h-1.5"}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${value}%` : 0 }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-[#0a0a0a] to-[#ff1a1a]"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  KPI card                                                           */
/* ------------------------------------------------------------------ */
function KpiCard({ kpi, i }: { kpi: ProjectKPI; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: i * 0.04 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 ring-1 ring-white/5 transition-all hover:-translate-y-0.5 hover:border-[#ff1a1a]/40 hover:ring-[#ff1a1a]/20"
    >
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
        {kpi.label}
      </div>
      <div className="mt-3 font-display text-3xl leading-none text-white md:text-4xl">
        <CountUp
          value={kpi.value}
          decimals={kpi.decimals ?? 0}
          prefix={kpi.prefix ?? ""}
          suffix={kpi.suffix ?? ""}
          start={inView}
        />
      </div>
      <div className="mt-4 h-[2px] w-8 bg-[#ff1a1a] transition-all duration-500 group-hover:w-16" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Before/After slider (arrastável)                                   */
/* ------------------------------------------------------------------ */
function BeforeAfterSlider({ label }: { label: string }) {
  const [pos, setPos] = useState(50);
  const boxRef = useRef<HTMLDivElement>(null);
  const drag = (clientX: number) => {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">
          {label}
        </div>
        <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/40">
          <ArrowLeftRight className="h-3 w-3" /> arraste
        </div>
      </div>
      <div
        ref={boxRef}
        className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-xl border border-white/10"
        onMouseMove={(e) => e.buttons === 1 && drag(e.clientX)}
        onMouseDown={(e) => drag(e.clientX)}
        onTouchMove={(e) => drag(e.touches[0].clientX)}
      >
        {/* DEPOIS (fundo) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#ff1a1a]/40">
          <div className="absolute right-3 top-3 rounded-full bg-[#ff1a1a] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
            depois
          </div>
        </div>
        {/* ANTES (recortado pela posição) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-[#f5f3ee]"
          style={{ width: `${pos}%` }}
        >
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-[#0a0a0a]/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/60">
            antes
          </div>
        </div>
        {/* handle */}
        <div
          className="absolute inset-y-0 z-10 w-[2px] bg-[#0a0a0a] shadow-[0_0_20px_rgba(255,26,26,0.6)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] text-[#ff1a1a] shadow-lg">
            <ArrowLeftRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline vertical revelada por scroll                              */
/* ------------------------------------------------------------------ */
function TimelineItem({ step, i }: { step: ProjectData["timeline"][number]; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      className="relative mb-8 last:mb-0"
    >
      <span className="absolute -left-[31px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]">
        <span className="h-2 w-2 rounded-full bg-[#ff1a1a]" />
      </span>
      <div className="font-display text-lg text-white">{step.title}</div>
      <div className="mt-1 text-sm text-white/55">{step.detail}</div>
    </motion.li>
  );
}

function Timeline({ steps }: { steps: ProjectData["timeline"] }) {
  return (
    <ol className="relative border-l border-white/10 pl-6">
      {steps.map((s, i) => (
        <TimelineItem key={s.title} step={s} i={i} />
      ))}
    </ol>
  );
}


/* ------------------------------------------------------------------ */
/*  DASHBOARD — conteúdo (após loader)                                 */
/* ------------------------------------------------------------------ */
function DashboardContent({ data }: { data: ProjectData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-full overflow-y-auto"
    >
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-14">
        {/* CABEÇALHO */}
        <div className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <img src={gr7Logo} alt="GR7" className="h-8 w-8 rounded-full object-cover" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                GR7 · relatório de projeto
              </span>
            </div>
            <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
              {data.client}
            </h1>
            <div className="mt-3 text-sm text-white/60">{data.category}</div>
          </div>
          <div className="flex flex-wrap items-end gap-8 text-sm">
            <div>
              <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/40">
                Status
              </div>
              <div className="flex items-center gap-2 font-medium text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#ff1a1a] opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-[#ff1a1a]" />
                </span>
                {data.status}
              </div>
            </div>
            <div>
              <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/40">
                <Clock3 className="mr-1 inline h-3 w-3" /> Execução
              </div>
              <div className="font-medium text-white">{data.duration}</div>
            </div>
            <div>
              <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/40">
                <CalendarDays className="mr-1 inline h-3 w-3" /> Cliente desde
              </div>
              <div className="font-medium text-white">{data.clientSince}</div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff1a1a]/30 bg-[#ff1a1a]/[0.06] px-3 py-1.5 text-xs font-medium text-[#ff1a1a]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Projeto Certificado pela GR7
            </div>
          </div>
        </div>

        {/* RESUMO */}
        <section className="mt-12 grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#ff1a1a]">
              / objetivo
            </div>
            <h2 className="font-display text-2xl leading-tight text-white">
              O que buscávamos entregar
            </h2>
          </div>
          <p className="text-base leading-relaxed text-white/70 md:text-lg">
            {data.summary}
          </p>
        </section>

        {/* KPIs */}
        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#ff1a1a]">
                / kpis
              </div>
              <h2 className="font-display text-3xl text-white md:text-4xl">
                Resultados que importam
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {data.kpis.map((k, i) => (
              <KpiCard key={k.label} kpi={k} i={i} />
            ))}
          </div>
        </section>

        {/* PERFORMANCE */}
        <section className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8">
            <div className="mb-6 flex items-baseline justify-between">
              <div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#ff1a1a]">
                  / performance geral
                </div>
                <h3 className="font-display text-2xl text-white">
                  Nota do projeto
                </h3>
              </div>
              <div className="font-display text-5xl text-white md:text-6xl">
                <CountUp value={data.overallScore} start />
                <span className="text-2xl text-white/40">/100</span>
              </div>
            </div>
            <ScoreBar label="Performance geral" value={data.overallScore} large />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {data.scores.map((s, i) => (
                <ScoreBar key={s.label} label={s.label} value={s.value} delay={i * 0.05} />
              ))}
              <div className="sm:col-span-2 flex items-center justify-between border-t border-white/5 pt-5">
                <span className="text-sm text-white">Satisfação</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i <= data.satisfaction
                          ? "fill-[#ff1a1a] text-[#ff1a1a]"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <GrowthChart data={data.growth} />
          </div>
        </section>

        {/* DISTRIBUIÇÃO + BEFORE/AFTER */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <DonutChart data={data.distribution} />
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
            <div className="mb-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#ff1a1a]">
                / antes × depois
              </div>
              <h4 className="mt-1 font-display text-xl text-white">
                A virada visual
              </h4>
            </div>
            <div className="grid gap-4">
              {data.beforeAfter.slice(0, 2).map((b) => (
                <BeforeAfterSlider key={b.label} label={b.label} />
              ))}
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section className="mt-16">
          <div className="mb-6">
            <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#ff1a1a]">
              / galeria
            </div>
            <h2 className="font-display text-3xl text-white md:text-4xl">
              Mídias do projeto
            </h2>
          </div>
          <div className="columns-2 gap-4 space-y-4 md:columns-3">
            {data.gallery.map((g, i) => {
              const inner = g.src || g.href ? (
                <div 
                  className={cn(
                    "relative w-full overflow-hidden rounded-2xl ring-1 ring-white/10",
                    g.bg === "white" ? "bg-white p-6" : ""
                  )} 
                  style={{ aspectRatio: g.aspect ?? "9/16" }}
                >
                  {g.isInstagram ? (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-900/50 p-6 text-center">
                      <div className="relative mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-0.5 shadow-xl">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0a0a]">
                          <InstagramIcon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <span className="mb-2 block font-display text-xs font-medium text-white">
                        Instagram
                      </span>
                      <p className="max-w-[140px] text-[9px] leading-tight text-white/40">
                        Toque para abrir este conteúdo no App
                      </p>
                    </div>
                  ) : g.src ? (
                    <img 
                      src={g.src} 
                      alt={g.label ?? ""} 
                      loading="lazy" 
                      className={cn(
                        "h-full w-full transition-transform duration-500 group-hover:scale-105",
                        g.bg === "white" ? "object-contain" : "object-cover"
                      )} 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const placeholder = document.createElement('div');
                          placeholder.className = "flex h-full w-full flex-col items-center justify-center bg-neutral-900/50";
                          placeholder.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-2 h-6 w-6 text-white/20"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.51"></line></svg>
                            <span class="text-[9px] uppercase tracking-[0.2em] text-white/30">Abrir Post</span>
                          `;
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-900/50">
                      <InstagramIcon className="mb-2 h-6 w-6 text-white/20" />
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Abrir Post</span>
                    </div>
                  )}
                  {g.label && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-[11px] font-medium uppercase tracking-[0.15em] text-white">
                      {g.label}
                    </div>
                  )}
                </div>
              ) : (
                <MediaPlaceholder label={g.label} ratio={i % 3 === 0 ? "4/5" : "4/3"} />
              );
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group cursor-pointer break-inside-avoid transition-transform hover:-translate-y-0.5"
                >
                  {g.href ? (
                    <a href={g.href} target="_blank" rel="noopener noreferrer">{inner}</a>
                  ) : inner}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* TIMELINE + ENTREGAS */}
        <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="mb-6">
              <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#ff1a1a]">
                / linha do tempo
              </div>
              <h2 className="font-display text-3xl text-white md:text-4xl">
                Como o projeto rodou
              </h2>
            </div>
            <Timeline steps={data.timeline} />
          </div>
          <div>
            <div className="mb-6">
              <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#ff1a1a]">
                / entregas
              </div>
              <h2 className="font-display text-3xl text-white md:text-4xl">
                O que a GR7 entregou
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.deliverables.map((d, i) => (
                <motion.span
                  key={d}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0a0a] px-4 py-2 text-sm text-white ring-1 ring-white/5"
                >
                  <Check className="h-3.5 w-3.5 text-[#ff1a1a]" />
                  {d}
                </motion.span>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0a0a] to-[#141414] p-4">
              <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
                <Layers className="h-3 w-3" /> stack aplicada
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-white/60">
                {["Meta Ads", "Google Ads", "GA4", "Looker", "Figma", "Notion"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-[#0a0a0a] px-2 py-1"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* DEPOIMENTO */}
        <section className="mt-16">
          <motion.blockquote
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/60 p-10 backdrop-blur-xl md:p-14"
          >
            <Quote className="absolute right-8 top-8 h-12 w-12 text-[#ff1a1a]/15" />
            <p className="font-display text-2xl leading-snug text-white md:text-3xl">
              "{data.testimonial.quote}"
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#0a0a0a] font-display text-white">
                {data.testimonial.name
                  .split(" ")
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <div className="font-medium text-white">{data.testimonial.name}</div>
                <div className="text-xs text-white/50">
                  {data.testimonial.role} · {data.testimonial.company}
                </div>
              </div>
            </div>
          </motion.blockquote>
        </section>

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.35em] text-white/40">
          <span>GR7 · relatório confidencial</span>
          <span>Gerado por GR7 BI</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MODAL WRAPPER — transição cinematográfica                          */
/* ------------------------------------------------------------------ */
export function ProjectDashboard({
  data,
  onClose,
}: {
  data: ProjectData | null;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"opening" | "loading" | "ready">("opening");

  useEffect(() => {
    if (!data) {
      setPhase("opening");
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setPhase("loading"), 650);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [data]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key="dash-root"
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* backdrop desfocado */}
          <motion.div
            className="absolute inset-0 bg-[#0a0a0a]/60 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />
          {/* painel — cresce como se fosse o próprio card */}
          <motion.div
            layoutId={`project-card-${data.slug}`}
            className="absolute inset-4 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.35)] md:inset-8"
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* botão fechar */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/80 text-white/60 backdrop-blur transition-all hover:border-[#ff1a1a] hover:text-[#ff1a1a]"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>

            <AnimatePresence mode="wait">
              {phase === "loading" && (
                <LoadingScreen key="loading" onDone={() => setPhase("ready")} />
              )}
              {phase === "ready" && (
                <motion.div key="content" className="h-full">
                  <DashboardContent data={data} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
