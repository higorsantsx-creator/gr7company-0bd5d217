/**
 * GR7 — Central Media Config
 * ------------------------------------------------------------
 * Toda mídia da landing page é referenciada por este arquivo.
 */

export type MediaKind = "image" | "video";

export interface MediaItem {
  src?: string;
  kind?: MediaKind;
  poster?: string;
  alt?: string;
}

export interface ProjectCard extends MediaItem {
  client: string;
  category: string;
  href?: string;
  bg?: string;
}

export const projects: ProjectCard[] = [
  { client: "Postos Total Giro", category: "Social Media · Branding · Meta Ads", src: new URL("../../assets/projects/totalgiro/cover.png", import.meta.url).href },
  { client: "Lagosta Fitness", category: "Performance · Social Media · Meta Ads", src: "/__l5e/assets-v1/d8da49b7-d726-463b-b41c-78142c4440a8/lagosta-fitness-new.png", bg: "white" },
  { client: "Elva Cosméticos", category: "Social · Reels", src: "" },
  { client: "Nova Corretora", category: "Performance · Google Ads", src: "" },
  { client: "Casa Nord", category: "Identidade Visual", src: "" },
  { client: "Bobby Móveis", category: "Social Media · Tráfego Pago", src: "/__l5e/assets-v1/b1aa1ca6-7663-4eb1-a07a-208b9c231551/logo.png", bg: "white" },
  { client: "Shineray", category: "Branding · Social · Performance", src: new URL("../../assets/projects/shineray/logo.png", import.meta.url).href, bg: "white" },
  { client: "Bloom Skincare", category: "Direção Criativa", src: "" },
];

export const reels: MediaItem[] = [
  { kind: "video", src: "https://scontent-ams2-1.cdninstagram.com/o1/v/t2/f2/m86/AQNVUR2YRxq1uz4IkJ3_0QY3U8SKDxeXI5FoVgJ_rGmkyanscFWUfK9Q4Bx3iNHsq18PNIjy8hMabWx-16YjE_l755gIvxWIFvQsC38.mp4?_nc_cat=109&_nc_sid=5e9851&_nc_ht=scontent-ams2-1.cdninstagram.com&_nc_ohc=vK9NPQbEYIIQ7kNvwFr51d3&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MTY3ODEwNjg3NjgxNjg4OCwiYXNzZXRfYWdlX2RheXMiOjQ3LCJ2aV91c2VjYXNlX2lkIjoxMDA5OSwiZHVyYXRpb25fcyI6MzAsInVybGdlbl9zb3VyY2UiOiJ3d3cifQ%3D%3D&ccb=17-1&vs=aed928cf0ab32e44&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC8xMTREQzZGRUY2NUNFNEVBNzRGMkY1MUY3Njg1NTc5NV92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyLzk0NDU3RDU3NjFBOTlDMkFBRDM2NThFQzk0RUM0QjgzX2F1ZGlvX2Rhc2hpbml0Lm1wNBUCAsgBEgAoABgAGwKIB3VzZV9vaWwBMRJwcm9ncmVzc2l2ZV9yZWNpcGUBMRUAACbwt83E1o77BRUCKAJDMywXQD73S8an754YEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HZeadAQA&_nc_gid=sJ5AiLPbZddBHHxfFiJp1Q&_nc_ss=7960f&_nc_zt=28&oh=00_AQF63rNsfo6qnCuDujDtzPPrRXfPyLbTmurpKQLLLZ13PA&oe=6A8167AA", poster: "" },
  { kind: "video", src: "https://scontent-ams2-1.cdninstagram.com/o1/v/t2/f2/m86/AQN6PfehLqOzRyHnOmBUQgTBNWPe0wkM324sW9PGUhaG5SjvG-PwVLWP3-F2njyWr2PY2DpRuupnT37SYFfWSf4AEfeTXHbJXMjbUfk.mp4?_nc_cat=105&_nc_sid=5e9851&_nc_ht=scontent-ams2-1.cdninstagram.com&_nc_ohc=xliNCeirT6UQ7kNvwHIc2jB&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6Mjc0NTM1MzUyNjQzMTc5MjYsImFzc2V0X2FnZV9kYXlzIjoyMSwidmlfdXNlY2FzZV9pZCI6MTAwOTksImR1cmF0aW9uX3MiOjU0LCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=997eb9f1db449fc6&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC8xRDQ1RDQ0MzIxQjlFMjk3MDhERTY2ODUzQTBFRkE4NV92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyLzBENDBBQzBCQ0I2REY3REExMjk4MTkzNjRFOERBQkE0X2F1ZGlvX2Rhc2hpbml0Lm1wNBUCAsgBEgAoABgAGwKIB3VzZV9vaWwBMRJwcm9ncmVzc2l2ZV9yZWNpcGUBMRUAACbMh5GUibbEYRUCKAJDMywXQEtu2RaHKwIYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HZeadAQA&_nc_gid=zT5h1YcH5NcAFq7XABAaJA&_nc_ss=7960f&_nc_zt=28&oh=00_AQGYfzxyA8oqBWN9HDp7wQKvReHTUDdLC80RJxZW14UPsg&oe=6A813AE6", poster: "" },
  { kind: "video", src: "https://scontent-ams2-1.cdninstagram.com/o1/v/t2/f2/m86/AQOc-wKz3cDTuA1dgKfcWI0Yy7gvhmxjZCFHML2oWSmqSIynAgJLXAMSooMz3qHI8em4mefU-Gzsa_BbPsTaMP50E8ntr1hn0iruya0.mp4?_nc_cat=106&_nc_sid=5e9851&_nc_ht=scontent-ams2-1.cdninstagram.com&_nc_ohc=wt14UzJZaX4Q7kNvwFQ9OpX&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MTAzNzk3ODkwNTI3OTA0NSwiYXNzZXRfYWdlX2RheXMiOjIwLCJ2aV91c2VjYXNlX2lkIjoxMDA5OSwiZHVyYXRpb25fcyI6MTUsInVybGdlbl9zb3VyY2UiOiJ3d3cifQ%3D%3D&ccb=17-1&vs=7f0f2b52e0dea13&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9GMDQxNTg3RUU2NUEyMjIzNzFDMkZBNkU1MkJGRDA5RV92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyLzFFNEQ4Mzg0NEM0MEQ0QThBQTU3RUZGQTUwOUNEMUFCX2F1ZGlvX2Rhc2hpbml0Lm1wNBUCAsgBEgAoABgAGwKIB3VzZV9vaWwBMRJwcm9ncmVzc2l2ZV9yZWNpcGUBMRUAACaK6fe-qYLYAxUCKAJDMywXQC9mZmZmZmYYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HZeadAQA&_nc_gid=h9ajd6SHvRp2qqOEEVqcjQ&_nc_ss=7960f&_nc_zt=28&oh=00_AQHzgi3wSKx3g6gfzP_Mux4RuWyEnelm_ET3ZTOQEz4I6Q&oe=6A8151CF", poster: "" },
  { kind: "video", src: "https://scontent-ams2-1.cdninstagram.com/o1/v/t2/f2/m86/AQNyv7kLCzndMx_PTaX5KOWj9xCLCpyFnVlbGBZNaGd6Y119_uGeCmnsfkr3nb6Q9ZiJyOAMHIO03k1ru1stoipnaR724C9k-wPrv_A.mp4?_nc_cat=109&_nc_sid=5e9851&_nc_ht=scontent-ams2-1.cdninstagram.com&_nc_ohc=_opTLWRrMkEQ7kNvwHCYyUT&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MjIyMzQyOTAwODE5ODI2NSwiYXNzZXRfYWdlX2RheXMiOjI1LCJ2aV91c2VjYXNlX2lkIjoxMDA5OSwiZHVyYXRpb25fcyI6MjEsInVybGdlbl9zb3VyY2UiOiJ3d3cifQ%3D%3D&ccb=17-1&vs=f894f6ca13bef2c4&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC85ODQ5QjIwRDAyRjhDRDA5ODIwRjVDMjNBOERDNUFCMl92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyLzI2NDFGNDVGMjY2NjBCNUM1QzY3NDcyNDRCQTVDMUI5X2F1ZGlvX2Rhc2hpbml0Lm1wNBUCAsgBEgAoABgAGwKIB3VzZV9vaWwBMRJwcm9ncmVzc2l2ZV9yZWNpcGUBMRUAACbyqbyDzYzzBxUCKAJDMywXQDXVP3ztkWgYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HZeadAQA&_nc_gid=aAjcwMdUTJTVJstW7l9jng&_nc_ss=7960f&_nc_zt=28&oh=00_AQEJmaUBhwLKRmAg6vjbL1QJc4eqaGJgTloXiMyWyStHuA&oe=6A815522", poster: "" },
];

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

export interface ArtItem extends MediaItem {
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

export const cinematic: MediaItem = {
  kind: "video",
  src: "",
  poster: "",
  alt: "Reel institucional GR7",
};

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

export interface DashboardItem extends MediaItem {
  label: string;
}

export const dashboards: DashboardItem[] = [
  { label: "Meta Ads Manager", src: "" },
  { label: "Google Analytics", src: "" },
  { label: "CRM GR7", src: "" },
  { label: "Relatório mensal", src: "" },
];

export interface VideoTestimonial {
  name: string;
  company: string;
  role: string;
  segment: string;
  quote: string;
  tags: string[];
  thumbnail: string;
  logo?: string;
  // perfil oficial do cliente
  href: string;
  // Reel específico do depoimento
  reelHref: string;
}

const testimonial01Thumb = new URL("../../assets/testimonials/test-01.jpg", import.meta.url).href;
const testimonial02Thumb = new URL("../../assets/testimonials/test-02.jpg", import.meta.url).href;
const testimonial03Thumb = new URL("../../assets/testimonials/test-03.jpg", import.meta.url).href;
const testimonial04Thumb = new URL("../../assets/testimonials/test-04.jpg", import.meta.url).href;
const testimonial05Thumb = new URL("../../assets/testimonials/test-05.jpg", import.meta.url).href;

export const videoTestimonials: VideoTestimonial[] = [
  {
    name: "Ricardo S.",
    company: "EcoChalés",
    role: "Proprietário",
    segment: "CONSTRUÇÃO DE CHALÉS",
    quote: "A GR7 conseguiu mostrar o valor do nosso trabalho antes mesmo do cliente conhecer o nosso projeto.",
    tags: ["POSICIONAMENTO", "CONTEÚDO", "ESTRATÉGIA"],
    thumbnail: testimonial01Thumb,
    href: "https://www.instagram.com/chales_ia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    reelHref: "https://www.instagram.com/gr7company/reel/DajRUOoSTU6/",
  },
  {
    name: "Ana C.",
    company: "Bobby Móveis",
    role: "CEO",
    segment: "MÓVEIS & DECORAÇÃO",
    quote: "A nossa comunicação finalmente começou a transmitir o nível dos produtos que realmente entregamos.",
    tags: ["BRANDING", "CONTEÚDO", "POSICIONAMENTO"],
    thumbnail: testimonial02Thumb,
    logo: "/__l5e/assets-v1/b1aa1ca6-7663-4eb1-a07a-208b9c231551/logo.png",
    href: "https://www.instagram.com/bobbymoveis?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    reelHref: "https://www.instagram.com/gr7company/reel/DbDzpvYyB4z/",
  },
  {
    name: "Carlos M.",
    company: "JVE Forros",
    role: "Diretor Comercial",
    segment: "FORROS & DIVISÓRIAS",
    quote: "A GR7 fez nossa empresa parecer nas redes tão profissional quanto ela é no trabalho.",
    tags: ["ESTRATÉGIA", "MARCA", "PRESENÇA DIGITAL"],
    thumbnail: testimonial03Thumb,
    href: "https://www.instagram.com/jveforrosedivisorias?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    reelHref: "https://www.instagram.com/gr7company/reel/DZ0RrtmS7Ni/",
  },
  {
    name: "Felipe G.",
    company: "Lagosta Fitness",
    role: "Fundador",
    segment: "FITNESS & PERFORMANCE",
    quote: "A gente começou a mostrar a energia da academia de um jeito que realmente dá vontade de fazer parte.",
    tags: ["CONTEÚDO", "ENGAJAMENTO", "PERFORMANCE"],
    thumbnail: testimonial04Thumb,
    logo: "/__l5e/assets-v1/d8da49b7-d726-463b-b41c-78142c4440a8/lagosta-fitness-new.png",
    href: "https://www.instagram.com/lagostafitness?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    reelHref: "https://www.instagram.com/ruivoo_g/reel/DZLdj8HxzgZ/",
  },
  {
    name: "Marcos L.",
    company: "Shineray MotoNow",
    role: "Gestor",
    segment: "MOTOCICLETAS & AUTOMOTIVO",
    quote: "A comunicação da nossa loja passou a ter a mesma presença que as motos que vendemos.",
    tags: ["MARCA", "PERFORMANCE", "PRESENÇA"],
    thumbnail: testimonial05Thumb,
    logo: new URL("../../assets/projects/shineray/logo.png", import.meta.url).href,
    href: "https://www.instagram.com/shineraymotonowpe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    reelHref: "https://www.instagram.com/ruivoo_g/reel/DZOKcfAxRUo/",
  },
];

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
    "3. audiência, distribution, aumento de receita 💹",
  ],
  avatar: { src: "", alt: "GR7 Company" } as MediaItem,
  posts: [
    { src: new URL("../../assets/instagram/post-01.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DZD19KoykUi/" },
    { src: new URL("../../assets/instagram/post-02.jpg", import.meta.url).href, href: "https://www.instagram.com/ruivoo_g/reel/DZLdj8HxzgZ/" },
    { src: new URL("../../assets/instagram/post-03.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DZNZZw2SaqV/" },
    { src: new URL("../../assets/instagram/post-04.jpg", import.meta.url).href, href: "https://www.instagram.com/ruivoo_g/reel/DZOKcfAxRUo/" },
    { src: new URL("../../assets/instagram/post-05.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DZQxdi5SPi0/" },
    { src: new URL("../../assets/instagram/post-06.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DZ0RrtmS7Ni/" },
    { src: new URL("../../assets/instagram/post-08.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DajRUOoSTU6/" },
    { src: new URL("../../assets/instagram/post-09.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/p/DajSDJRy9bw/" },
    { src: new URL("../../assets/instagram/post-10.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/Daqszvrytya/" },
    { src: new URL("../../assets/instagram/post-11.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DbDzpvYyB4z/" },
    { src: new URL("../../assets/instagram/post-12.jpg", import.meta.url).href, href: "https://www.instagram.com/gr7company/reel/DbJqI34SxWJ/" },
  ] as (MediaItem & { href: string })[],
};

export const inAction: MediaItem[] = Array.from({ length: 10 }).map(() => ({ src: "" }));
