/**
 * GR7 — Central Media Config
 * ------------------------------------------------------------
 * Toda mídia da landing page é referenciada por este arquivo.
 * Para trocar imagens, vídeos, reels, logos e prints da GR7:
 *   1. Faça upload da mídia (ou hospede em qualquer CDN).
 *   2. Cole a URL no slot correspondente abaixo.
 *   3. Salve. Nenhum outro arquivo precisa ser tocado.
 *
 * Formatos aceitos: PNG, JPG, SVG, GIF, MP4, WebM.
 * Se `src` estiver vazio, um placeholder elegante é exibido
 * mantendo exatamente as mesmas dimensões da mídia final.
 */

export type MediaKind = "image" | "video";

export interface MediaItem {
  /** URL da mídia (imagem ou vídeo). Vazio = placeholder. */
  src?: string;
  /** Tipo. `video` habilita autoplay/loop/muted. */
  kind?: MediaKind;
  /** Poster do vídeo (JPG/PNG) ou fallback. */
  poster?: string;
  /** Texto alternativo. */
  alt?: string;
}

/* ------------------------------------------------------------------ */
/*  PROJETOS — "Alguns projetos que falam por nós"                     */
/* ------------------------------------------------------------------ */
export interface ProjectCard extends MediaItem {
  client: string;
  category: string;
  href?: string;
}

export const projects: ProjectCard[] = [
  { client: "Studio Vértice", category: "Branding · Meta Ads", src: "" },
  { client: "Elva Cosméticos", category: "Social · Reels", src: "" },
  { client: "Nova Corretora", category: "Performance · Google Ads", src: "" },
  { client: "Casa Nord", category: "Identidade Visual", src: "" },
  { client: "Restaurante Aro", category: "Vídeo · Captação", src: "" },
  { client: "Prisma Advogados", category: "Site · SEO", src: "" },
  { client: "Bloom Skincare", category: "Direção Criativa", src: "" },
  { client: "Ateliê Gaia", category: "Fotografia · E-commerce", src: "" },
];

/* ------------------------------------------------------------------ */
/*  REELS — feed vertical em smartphones                              */
/* ------------------------------------------------------------------ */
export const reels: MediaItem[] = [
  { kind: "video", src: "", poster: "" },
  { kind: "video", src: "", poster: "" },
  { kind: "video", src: "", poster: "" },
  { kind: "video", src: "", poster: "" },
];

/* ------------------------------------------------------------------ */
/*  STORIES — círculos horizontais estilo Instagram                    */
/* ------------------------------------------------------------------ */
export interface StoryItem extends MediaItem {
  title: string;
}

export const stories: StoryItem[] = [
  { title: "Bastidores", src: "" },
  { title: "Ensaio Aro", src: "" },
  { title: "Lançamento", src: "" },
  { title: "Meta Ads", src: "" },
  { title: "Captação", src: "" },
  { title: "Making Of", src: "" },
  { title: "Equipe", src: "" },
  { title: "Cliente", src: "" },
];

/* ------------------------------------------------------------------ */
/*  ARTES — galeria Masonry                                            */
/* ------------------------------------------------------------------ */
export interface ArtItem extends MediaItem {
  /** Proporção do card no masonry (altura relativa). */
  aspect: "tall" | "square" | "wide" | "portrait";
  label?: string;
}

export const arts: ArtItem[] = [
  { aspect: "tall", label: "Post feed", src: "" },
  { aspect: "square", label: "Carrossel 01", src: "" },
  { aspect: "wide", label: "Banner site", src: "" },
  { aspect: "portrait", label: "Story anúncio", src: "" },
  { aspect: "square", label: "Criativo Meta", src: "" },
  { aspect: "tall", label: "Flyer", src: "" },
  { aspect: "wide", label: "Header e-mail", src: "" },
  { aspect: "portrait", label: "Reel cover", src: "" },
  { aspect: "square", label: "Post branding", src: "" },
  { aspect: "tall", label: "Print anúncio", src: "" },
];

/* ------------------------------------------------------------------ */
/*  IDENTIDADE VISUAL — antes / depois + brandbook                     */
/* ------------------------------------------------------------------ */
export const identity = {
  before: { src: "", alt: "Logo antiga do cliente" } as MediaItem,
  after: { src: "", alt: "Logo criada pela GR7" } as MediaItem,
  brandbook: [
    { src: "", alt: "Página do brandbook" },
    { src: "", alt: "Paleta de cores" },
    { src: "", alt: "Tipografia" },
    { src: "", alt: "Mockup papelaria" },
  ] as MediaItem[],
  palette: ["#0a0a0a", "#ff1a1a", "#f5f5f5", "#1a1a1a", "#ffcccc"],
};

/* ------------------------------------------------------------------ */
/*  VÍDEO CINEMATOGRÁFICO — hero fullscreen                            */
/* ------------------------------------------------------------------ */
export const cinematic: MediaItem = {
  kind: "video",
  src: "",
  poster: "",
  alt: "Reel institucional GR7",
};

/* ------------------------------------------------------------------ */
/*  BASTIDORES — grid irregular                                        */
/* ------------------------------------------------------------------ */
export interface BackstageItem extends MediaItem {
  span: "sm" | "md" | "lg" | "xl";
  label?: string;
}

export const backstage: BackstageItem[] = [
  { span: "lg", label: "Captação Drone", src: "" },
  { span: "sm", label: "Set fotográfico", src: "" },
  { span: "md", label: "Reunião estratégia", src: "" },
  { span: "sm", label: "Making of", src: "" },
  { span: "xl", label: "Equipe GR7", src: "" },
  { span: "md", label: "Bastidores Reels", src: "" },
  { span: "sm", label: "Estúdio", src: "" },
];

/* ------------------------------------------------------------------ */
/*  CLIENTES — marquee de logos                                        */
/* ------------------------------------------------------------------ */
export interface ClientLogo extends MediaItem {
  name: string;
}

export const clientLogos: ClientLogo[] = [
  { name: "Vértice" },
  { name: "Elva" },
  { name: "Nova" },
  { name: "Casa Nord" },
  { name: "Aro" },
  { name: "Prisma" },
  { name: "Bloom" },
  { name: "Gaia" },
  { name: "Northstar" },
  { name: "Kaia" },
  { name: "Luma" },
  { name: "Orbit" },
];

/* ------------------------------------------------------------------ */
/*  CASES — cards grandes                                              */
/* ------------------------------------------------------------------ */
export interface CaseItem extends MediaItem {
  client: string;
  problem: string;
  strategy: string;
  result: string;
  href?: string;
}

export const cases: CaseItem[] = [
  {
    client: "Studio Vértice",
    problem: "Baixa geração de leads qualificados no mercado premium.",
    strategy: "Reposicionamento de marca + funil de Meta Ads segmentado.",
    result: "+380% em vendas em 90 dias.",
    src: "",
  },
  {
    client: "Elva Cosméticos",
    problem: "Presença digital fraca e engajamento estagnado.",
    strategy: "Direção criativa completa com 32 Reels por mês.",
    result: "1.2M de alcance orgânico em 4 meses.",
    src: "",
  },
  {
    client: "Nova Corretora",
    problem: "CAC alto e ROI negativo em campanhas pagas.",
    strategy: "Auditoria + reestruturação de Google Ads e landing pages.",
    result: "CAC reduzido em 62%, ROI 7,3x.",
    src: "",
  },
];

/* ------------------------------------------------------------------ */
/*  DASHBOARDS — prints dentro de notebooks                            */
/* ------------------------------------------------------------------ */
export interface DashboardItem extends MediaItem {
  label: string;
}

export const dashboards: DashboardItem[] = [
  { label: "Meta Ads Manager", src: "" },
  { label: "Google Analytics", src: "" },
  { label: "CRM GR7", src: "" },
  { label: "Relatório mensal", src: "" },
];

/* ------------------------------------------------------------------ */
/*  DEPOIMENTOS EM VÍDEO                                               */
/* ------------------------------------------------------------------ */
export interface VideoTestimonial extends MediaItem {
  name: string;
  company: string;
}

export const videoTestimonials: VideoTestimonial[] = [
  { name: "Marina Souza", company: "Studio Vértice", kind: "video", src: "", poster: "" },
  { name: "Rafael Prado", company: "Elva Cosméticos", kind: "video", src: "", poster: "" },
  { name: "Camila Nunes", company: "Nova Corretora", kind: "video", src: "", poster: "" },
  { name: "Diego Aro", company: "Restaurante Aro", kind: "video", src: "", poster: "" },
];

/* ------------------------------------------------------------------ */
/*  INSTAGRAM — perfil simulado                                        */
/* ------------------------------------------------------------------ */
export const instagram = {
  handle: "@gr7.company",
  bio: "Marketing que transforma empresas em referências. · Branding, Performance, Vídeo & Direção Criativa.",
  avatar: { src: "", alt: "GR7 Company" } as MediaItem,
  posts: Array.from({ length: 9 }).map(() => ({ src: "" } as MediaItem)),
};

/* ------------------------------------------------------------------ */
/*  GR7 EM AÇÃO — colagem cinematográfica final                        */
/* ------------------------------------------------------------------ */
export const inAction: MediaItem[] = Array.from({ length: 10 }).map(() => ({ src: "" }));
