/**
 * GR7 — Media primitives
 * Universal slots: renders image, video, or an elegant animated
 * placeholder — always preserving container dimensions so the
 * layout never shifts when real media is dropped in.
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageIcon, Play, Video as VideoIcon } from "lucide-react";
import type { MediaItem } from "./mediaConfig";

interface SlotProps extends MediaItem {
  className?: string;
  /** Ícone/rótulo do placeholder. */
  icon?: "image" | "video" | "reel";
  /** Rótulo textual dentro do placeholder. */
  label?: string;
  /** Controla exibição de gradiente decorativo. */
  ornate?: boolean;
  /** Estilos customizados para a camada de mídia (ex: objectPosition). */
  style?: React.CSSProperties;
}


/* ------------------------------------------------------------------ */
/*  Placeholder elegante e animado                                     */
/* ------------------------------------------------------------------ */
function Placeholder({
  icon = "image",
  label,
  ornate = false,
}: {
  icon?: "image" | "video" | "reel";
  label?: string;
  ornate?: boolean;
}) {
  const Icon = icon === "video" || icon === "reel" ? VideoIcon : ImageIcon;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-[#ff1a1a]/[0.12]">
      {ornate && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}
      <div className="relative z-10 flex flex-col items-center gap-2 text-white/40">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/70 backdrop-blur">
          <Icon className="h-4 w-4" />
        </div>
        {label && (
          <span className="text-[10px] uppercase tracking-[0.3em]">{label}</span>
        )}
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/*  MediaSlot — imagem, vídeo ou placeholder                           */
/* ------------------------------------------------------------------ */
export function MediaSlot({
  src,
  kind,
  poster,
  alt,
  className = "",
  icon,
  label,
  ornate = false,
  style,
  bg,
  autoPlay = true,
  muted = true,
  loop = true,
  onClick,
}: SlotProps & { 
  bg?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  onClick?: () => void;
}) {

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src, kind, poster]);

  useEffect(() => {
    if (kind === 'video' && videoRef.current && autoPlay) {
      if (loaded) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [kind, autoPlay, loaded]);

  const handleMediaLoad = () => {
    setLoaded(true);
  };

  const handleMediaError = () => {
    setError(true);
    setLoaded(true);
  };

  const isInstagramUrl = (url?: string) => {
    if (!url) return false;
    return url.includes('instagram.com/reel/') || url.includes('instagram.com/p/');
  };

  // Prevent trying to play Instagram HTML as video
  const effectiveKind = kind === 'video' && isInstagramUrl(src) ? 'image' : kind;
  const effectiveSrc = isInstagramUrl(src) ? (poster || src) : src;

  return (
    <div 
      className={`relative overflow-hidden h-full w-full ${className} ${onClick ? 'cursor-pointer' : ''}`} 
      style={bg ? { backgroundColor: bg } : {}}
      onClick={onClick}
    >
      <AnimatePresence mode="wait">
        {!loaded && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-10"
          >
            <Placeholder
              icon={icon ?? (effectiveKind === "video" ? "video" : "image")}
              label={label}
              ornate={ornate}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 text-white/40 p-4 text-center">
          <ImageIcon className="mb-2 h-6 w-6" />
          <span className="text-[10px] uppercase tracking-widest">Mídia indisponível</span>
        </div>
      ) : (
        <>
          {effectiveSrc && effectiveKind === "video" && (
            <motion.video
              ref={videoRef}
              className="h-full w-full object-cover"
              style={style}
              src={effectiveSrc}
              poster={poster}
              autoPlay={autoPlay}
              muted={muted}
              loop={loop}
              playsInline
              onLoadedData={handleMediaLoad}
              onError={handleMediaError}
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            />

          )}

          {effectiveSrc && effectiveKind !== "video" && (
            <motion.img
              className={`h-full w-full ${className.includes("object-contain") ? "object-contain" : "object-cover"}`}
              style={style}
              src={effectiveSrc}
              alt={alt ?? ""}
              onLoad={handleMediaLoad}
              onError={handleMediaError}
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            />

          )}

          {!effectiveSrc && poster && (
            <motion.img
              className="h-full w-full object-cover"
              src={poster}
              alt={alt ?? ""}
              onLoad={handleMediaLoad}
              onError={handleMediaError}
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PhoneFrame — moldura de smartphone para reels                      */
/* ------------------------------------------------------------------ */
export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] w-full rounded-[2.5rem] border border-white/10 bg-black p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-neutral-900">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NotebookFrame — mockup de notebook para dashboards                 */
/* ------------------------------------------------------------------ */
export function NotebookFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="rounded-t-2xl border border-b-0 border-white/15 bg-neutral-900 p-3 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.5)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-800">
          {children}
        </div>
      </div>
      <div className="mx-auto h-3 w-[110%] -translate-x-[4.5%] rounded-b-2xl bg-gradient-to-b from-neutral-700 to-neutral-900 shadow-[0_20px_30px_-15px_rgba(0,0,0,0.4)]" />
      <div className="mx-auto mt-0 h-1 w-[40%] rounded-b-full bg-neutral-950/60" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Autoplay opcional para vídeo somente quando visível                */
/* ------------------------------------------------------------------ */
export function useInViewAutoplay<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current as unknown as HTMLVideoElement | null;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(el as unknown as Element);
    return () => io.disconnect();
  }, []);
  return ref;
}
