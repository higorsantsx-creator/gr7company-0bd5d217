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
  { client: "Postos Total Giro", category: "Social Media · Branding · Meta Ads", src: new URL("../../assets/projects/totalgiro/cover.png", import.meta.url).href },
  { client: "Elva Cosméticos", category: "Social · Reels", src: new URL("../../assets/instagram/post-01.jpg", import.meta.url).href },
  { client: "Nova Corretora", category: "Performance · Google Ads", src: new URL("../../assets/instagram/post-03.jpg", import.meta.url).href },
  { client: "Casa Nord", category: "Identidade Visual", src: new URL("../../assets/projects/totalgiro/loja-01.jpg", import.meta.url).href },
  { client: "Restaurante Aro", category: "Vídeo · Captação", src: new URL("../../assets/instagram/post-05.jpg", import.meta.url).href },
  { client: "Prisma Advogados", category: "Site · SEO", src: new URL("../../assets/projects/totalgiro/frota.jpg", import.meta.url).href },
  { client: "Bloom Skincare", category: "Direção Criativa", src: new URL("../../assets/instagram/post-07.jpg", import.meta.url).href },
  { client: "Ateliê Gaia", category: "Fotografia · E-commerce", src: new URL("../../assets/projects/totalgiro/cafe.jpg", import.meta.url).href },
];

/* ------------------------------------------------------------------ */
/*  REELS — feed vertical em smartphones                              */
/* ------------------------------------------------------------------ */
export const reels: MediaItem[] = [
  { kind: "image", src: new URL("../../assets/instagram/post-02.jpg", import.meta.url).href },
  { kind: "image", src: new URL("../../assets/instagram/post-04.jpg", import.meta.url).href },
  { kind: "image", src: new URL("../../assets/instagram/post-06.jpg", import.meta.url).href },
  { kind: "image", src: new URL("../../assets/instagram/post-08.jpg", import.meta.url).href },
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
  { aspect: "tall", label: "Post feed", src: new URL("../../assets/instagram/post-09.jpg", import.meta.url).href },
  { aspect: "square", label: "Carrossel 01", src: new URL("../../assets/projects/totalgiro/frota.jpg", import.meta.url).href },
  { aspect: "wide", label: "Banner site", src: new URL("../../assets/projects/totalgiro/loja-01.jpg", import.meta.url).href },
  { aspect: "portrait", label: "Story anúncio", src: new URL("../../assets/instagram/post-10.jpg", import.meta.url).href },
  { aspect: "square", label: "Criativo Meta", src: new URL("../../assets/projects/totalgiro/atendimento-01.jpg", import.meta.url).href },
  { aspect: "tall", label: "Flyer", src: new URL("../../assets/instagram/post-11.jpg", import.meta.url).href },
  { aspect: "wide", label: "Header e-mail", src: new URL("../../assets/projects/totalgiro/cafe.jpg", import.meta.url).href },
  { aspect: "portrait", label: "Reel cover", src: new URL("../../assets/instagram/post-12.jpg", import.meta.url).href },
  { aspect: "square", label: "Post branding", src: new URL("../../assets/projects/totalgiro/bastidores.jpg", import.meta.url).href },
  { aspect: "tall", label: "Print anúncio", src: new URL("../../assets/instagram/post-01.jpg", import.meta.url).href },
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
  kind: "image",
  src: new URL("../../assets/projects/totalgiro/frota.jpg", import.meta.url).href,
  poster: new URL("../../assets/projects/totalgiro/frota.jpg", import.meta.url).href,
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
  { span: "lg", label: "Captação Drone", src: new URL("../../assets/projects/totalgiro/frota.jpg", import.meta.url).href },
  { span: "sm", label: "Set fotográfico", src: new URL("../../assets/projects/totalgiro/perto.jpg", import.meta.url).href },
  { span: "md", label: "Reunião estratégia", src: new URL("../../assets/projects/totalgiro/loja-01.jpg", import.meta.url).href },
  { span: "sm", label: "Making of", src: new URL("../../assets/projects/totalgiro/bastidores.jpg", import.meta.url).href },
  { span: "xl", label: "Equipe GR7", src: new URL("../../assets/projects/totalgiro/atendimento-01.jpg", import.meta.url).href },
  { span: "md", label: "Bastidores Reels", src: new URL("../../assets/projects/totalgiro/atendimento-02.jpg", import.meta.url).href },
  { span: "sm", label: "Estúdio", src: new URL("../../assets/projects/totalgiro/loja-02.jpg", import.meta.url).href },
];

/* ------------------------------------------------------------------ */
/*  CLIENTES — marquee de logos                                        */
/* ------------------------------------------------------------------ */
export interface ClientLogo extends MediaItem {
  name: string;
}

export const clientLogos: ClientLogo[] = [
  { name: "Total Giro" },
  { name: "Bobby Móveis" },
  { name: "Shineray" },
  { name: "JVE Forros" },
  { name: "Maurício Arts" },
  { name: "Chalés IA" },
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
    src: new URL("../../assets/projects/totalgiro/loja-01.jpg", import.meta.url).href,
  },
  {
    client: "Elva Cosméticos",
    problem: "Presença digital fraca e engajamento estagnado.",
    strategy: "Direção criativa completa com 32 Reels por mês.",
    result: "1.2M de alcance orgânico em 4 meses.",
    src: new URL("../../assets/instagram/post-03.jpg", import.meta.url).href,
  },
  {
    client: "Nova Corretora",
    problem: "CAC alto e ROI negativo em campanhas pagas.",
    strategy: "Auditoria + reestruturação de Google Ads e landing pages.",
    result: "CAC reduzido em 62%, ROI 7,3x.",
    src: new URL("../../assets/instagram/post-06.jpg", import.meta.url).href,
  },
];

/* ------------------------------------------------------------------ */
/*  DASHBOARDS — prints dentro de notebooks                            */
/* ------------------------------------------------------------------ */
export interface DashboardItem extends MediaItem {
  label: string;
}

export const dashboards: DashboardItem[] = [
  { label: "Meta Ads Manager", src: new URL("../../assets/dashboards/dash-01.jpg", import.meta.url).href },
  { label: "Google Analytics", src: new URL("../../assets/dashboards/dash-02.jpg", import.meta.url).href },
  { label: "CRM GR7", src: new URL("../../assets/dashboards/dash-03.jpg", import.meta.url).href },
  { label: "Relatório mensal", src: new URL("../../assets/dashboards/dash-04.jpg", import.meta.url).href },
];

/* ------------------------------------------------------------------ */
/*  DEPOIMENTOS EM VÍDEO                                               */
/* ------------------------------------------------------------------ */
export interface VideoTestimonial extends MediaItem {
  name: string;
  company: string;
  href?: string;
}

export const videoTestimonials: VideoTestimonial[] = [
  { name: "Cliente GR7", company: "@gr7company", kind: "image", src: new URL("../../assets/testimonials/test-01.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DajRUOoSTU6/" },
  { name: "Cliente GR7", company: "@gr7company", kind: "image", src: new URL("../../assets/testimonials/test-02.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DbDzpvYyB4z/" },
  { name: "Cliente GR7", company: "@gr7company", kind: "image", src: new URL("../../assets/testimonials/test-03.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DaWXQ2VyFzL/" },
  { name: "Cliente GR7", company: "@gr7company", kind: "image", src: new URL("../../assets/testimonials/test-04.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DZ0RrtmS7Ni/" },
  { name: "Ruivo G.", company: "@ruivoo_g", kind: "image", src: new URL("../../assets/testimonials/test-05.jpg", import.meta.url).href, href: "https://www.instagram.com/ruivoo_g/reel/DZLdj8HxzgZ/" },
  { name: "Ruivo G.", company: "@ruivoo_g", kind: "image", src: new URL("../../assets/testimonials/test-06.jpg", import.meta.url).href, href: "https://www.instagram.com/ruivoo_g/reel/DZOKcfAxRUo/" },
];


/* ------------------------------------------------------------------ */
/*  INSTAGRAM — perfil real @gr7company                                */
/* ------------------------------------------------------------------ */
export const instagram = {
  handle: "gr7company",
  name: "GR7 Company",
  category: "Advertising/Marketing",
  stats: {
    posts: 12,
    followers: "2.065",
    following: 53,
  },
  bio: [
    "1. A solução certa para o crescimento do seu negócio. 🏆",
    "2. O marketing que conecta, engaja e vende 📊",
    "3. audiência, distribuição, aumento de receita 💹",
  ],
  avatar: { src: "", alt: "GR7 Company" } as MediaItem,
  posts: [
    { src: new URL("../../assets/instagram/post-01.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DZD19KoykUi/" },
    { src: new URL("../../assets/instagram/post-02.jpg", import.meta.url).href, href: "https://www.instagram.com/ruivoo_g/reel/DZLdj8HxzgZ/" },
    { src: new URL("../../assets/instagram/post-03.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DZNZZw2SaqV/" },
    { src: new URL("../../assets/instagram/post-04.jpg", import.meta.url).href, href: "https://www.instagram.com/ruivoo_g/reel/DZOKcfAxRUo/" },
    { src: new URL("../../assets/instagram/post-05.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DZQxdi5SPi0/" },
    { src: new URL("../../assets/instagram/post-06.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DZ0RrtmS7Ni/" },
    { src: new URL("../../assets/instagram/post-07.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DaWXQ2VyFzL/" },
    { src: new URL("../../assets/instagram/post-08.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DajRUOoSTU6/" },
    { src: new URL("../../assets/instagram/post-09.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/p/DajSDJRy9bw/" },
    { src: new URL("../../assets/instagram/post-10.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/Daqszvrytya/" },
    { src: new URL("../../assets/instagram/post-11.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DbDzpvYyB4z/" },
    { src: new URL("../../assets/instagram/post-12.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DbJqI34SxWJ/" },
  ] as (MediaItem & { href: string })[],
};

/* ------------------------------------------------------------------ */
/*  GR7 EM AÇÃO — colagem cinematográfica final                        */
/* ------------------------------------------------------------------ */
export const inAction: MediaItem[] = [
  { src: new URL("../../assets/projects/totalgiro/frota.jpg", import.meta.url).href },
  { src: new URL("../../assets/instagram/post-02.jpg", import.meta.url).href },
  { src: new URL("../../assets/projects/totalgiro/loja-01.jpg", import.meta.url).href },
  { src: new URL("../../assets/instagram/post-04.jpg", import.meta.url).href },
  { src: new URL("../../assets/projects/totalgiro/atendimento-01.jpg", import.meta.url).href },
  { src: new URL("../../assets/instagram/post-06.jpg", import.meta.url).href },
  { src: new URL("../../assets/projects/totalgiro/cafe.jpg", import.meta.url).href },
  { src: new URL("../../assets/instagram/post-08.jpg", import.meta.url).href },
  { src: new URL("../../assets/projects/totalgiro/bastidores.jpg", import.meta.url).href },
  { src: new URL("../../assets/instagram/post-10.jpg", import.meta.url).href },
];
