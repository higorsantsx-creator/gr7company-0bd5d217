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
export const projects = [
    { client: "Postos Total Giro", category: "Social Media · Branding · Meta Ads", src: new URL("../../assets/projects/totalgiro/cover.png", import.meta.url).href },
    { client: "Lagosta Fitness", category: "Performance · Social Media · Meta Ads", src: "/__l5e/assets-v1/d8da49b7-d726-463b-b41c-78142c4440a8/lagosta-fitness-new.png", bg: "white" },
    { client: "Elva Cosméticos", category: "Social · Reels", src: "" },
    { client: "Nova Corretora", category: "Performance · Google Ads", src: "" },
    { client: "Casa Nord", category: "Identidade Visual", src: "" },
    { client: "Bobby Móveis", category: "Social Media · Tráfego Pago", src: "/__l5e/assets-v1/b1aa1ca6-7663-4eb1-a07a-208b9c231551/logo.png", bg: "white" },
    { client: "Shineray", category: "Branding · Social · Performance", src: new URL("../../assets/projects/shineray/logo.png", import.meta.url).href, bg: "white" },
    { client: "Bloom Skincare", category: "Direção Criativa", src: "" },
];
/* ------------------------------------------------------------------ */
/*  REELS — feed vertical em smartphones                              */
/* ------------------------------------------------------------------ */
export const reels = [
    { kind: "video", src: "", poster: "" },
    { kind: "video", src: "", poster: "" },
    { kind: "video", src: "", poster: "" },
    { kind: "video", src: "", poster: "" },
];
export const stories = [
    { title: "Bastidores", src: "" },
    { title: "Ensaio Aro", src: "" },
    { title: "Lançamento", src: "" },
    { title: "Meta Ads", src: "" },
    { title: "Captação", src: "" },
    { title: "Making Of", src: "" },
    { title: "Equipe", src: "" },
    { title: "Cliente", src: "" },
];
export const arts = [
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
    before: { src: "", alt: "Logo antiga do cliente" },
    after: { src: "", alt: "Logo criada pela GR7" },
    brandbook: [
        { src: "", alt: "Página do brandbook" },
        { src: "", alt: "Paleta de cores" },
        { src: "", alt: "Tipografia" },
        { src: "", alt: "Mockup papelaria" },
    ],
    palette: ["#0a0a0a", "#ff1a1a", "#f5f5f5", "#1a1a1a", "#ffcccc"],
};
/* ------------------------------------------------------------------ */
/*  VÍDEO CINEMATOGRÁFICO — hero fullscreen                            */
/* ------------------------------------------------------------------ */
export const cinematic = {
    kind: "video",
    src: "",
    poster: "",
    alt: "Reel institucional GR7",
};
export const backstage = [
    { span: "lg", label: "Captação Drone", src: "" },
    { span: "sm", label: "Set fotográfico", src: "" },
    { span: "md", label: "Reunião estratégia", src: "" },
    { span: "sm", label: "Making of", src: "" },
    { span: "xl", label: "Equipe GR7", src: "" },
    { span: "md", label: "Bastidores Reels", src: "" },
    { span: "sm", label: "Estúdio", src: "" },
];
export const clientLogos = [
    { name: "Total Giro" },
    { name: "Bobby Móveis" },
    { name: "Shineray" },
    { name: "JVE Forros" },
    { name: "Maurício Arts" },
    { name: "Chalés IA" },
];
export const cases = [
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
export const dashboards = [
    { label: "Meta Ads Manager", src: "" },
    { label: "Google Analytics", src: "" },
    { label: "CRM GR7", src: "" },
    { label: "Relatório mensal", src: "" },
];
export const videoTestimonials = [
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
    avatar: { src: "", alt: "GR7 Company" },
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
    ],
};
/* ------------------------------------------------------------------ */
/*  GR7 EM AÇÃO — colagem cinematográfica final                        */
/* ------------------------------------------------------------------ */
export const inAction = Array.from({ length: 10 }).map(() => ({ src: "" }));
