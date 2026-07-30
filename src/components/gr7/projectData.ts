/**
 * GR7 — Dados dos projetos (dashboard BI premium)
 * ------------------------------------------------------------
 * Estrutura única e reutilizável. Para adicionar um novo case,
 * basta empurrar mais um objeto em `projectDataset`. O layout do
 * dashboard é 100% dinâmico e não precisa ser alterado.
 */

export interface ProjectKPI {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export interface ProjectScore {
  label: string;
  value: number; // 0-100
}

export interface MonthlyPoint {
  label: string;
  value: number; // 0-100 escala relativa
}

export interface DistributionSlice {
  label: string;
  value: number; // porcentagem 0-100
  color: string;
}

export interface BeforeAfter {
  label: string;
  before?: string;
  after?: string;
}

export interface TimelineStep {
  title: string;
  detail: string;
}

export interface ProjectTestimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export interface ProjectData {
  slug: string;
  client: string;
  category: string;
  status: string; // "Projeto Concluído" | "Em execução"
  clientSince: string; // "2024"
  duration: string; // "8 meses"
  cover?: string;
  logo?: string;
  summary: string;
  kpis: ProjectKPI[];
  overallScore: number; // 0-100
  scores: ProjectScore[];
  satisfaction: number; // 0-5
  growth: MonthlyPoint[];
  distribution: DistributionSlice[];
  beforeAfter: BeforeAfter[];
  gallery: { kind?: "image" | "video"; src?: string; label?: string; href?: string; aspect?: string }[];
  timeline: TimelineStep[];
  deliverables: string[];
  testimonial: ProjectTestimonial;
}

/* ------------------------------------------------------------------ */
/*  Dataset — realistas, prontos para substituição por dados reais    */
/* ------------------------------------------------------------------ */
export const projectDataset: ProjectData[] = [
  {
    slug: "postos-total-giro",
    client: "Postos Total Giro",
    category: "Social Media · Branding · Meta Ads",
    status: "Em execução",
    clientSince: "2024",
    duration: "Cliente ativo",
    summary:
      "A maior rede de postos de combustível do estado de Alagoas. Trabalhamos a presença digital do @postostotalgiro com direção criativa completa, gestão de conteúdo, campanhas de mídia paga e produção audiovisual — reforçando o posicionamento “Cada Parada Uma Experiência” em toda a jornada do cliente.",
    kpis: [
      { label: "Seguidores", value: 21300 },
      { label: "Publicações", value: 330 },
      { label: "Alcance", value: 268, prefix: "+", suffix: "%" },
      { label: "Engajamento", value: 152, prefix: "+", suffix: "%" },
      { label: "Views (Reels)", value: 1850000 },
      { label: "Compart.", value: 9400 },
      { label: "CPC", value: 0.72, prefix: "R$ ", decimals: 2 },
      { label: "CTR", value: 7.9, suffix: "%", decimals: 1 },
    ],
    overallScore: 97,
    scores: [
      { label: "Social Media", value: 98 },
      { label: "Direção Criativa", value: 96 },
      { label: "Meta Ads", value: 95 },
      { label: "Produção Audiovisual", value: 97 },
      { label: "Consistência de Marca", value: 98 },
    ],
    satisfaction: 5,
    growth: [
      { label: "Jan", value: 22 },
      { label: "Fev", value: 38 },
      { label: "Mar", value: 51 },
      { label: "Abr", value: 66 },
      { label: "Mai", value: 84 },
      { label: "Jun", value: 100 },
    ],
    distribution: [
      { label: "Social Media", value: 38, color: "#ff1a1a" },
      { label: "Reels / Vídeo", value: 30, color: "#0a0a0a" },
      { label: "Meta Ads", value: 22, color: "#ff6b6b" },
      { label: "Branding", value: 10, color: "#e5e5e5" },
    ],
    beforeAfter: [
      { label: "Feed" },
      { label: "Reel" },
      { label: "Destaques" },
      { label: "Campanha" },
    ],
    gallery: [
      { label: "Frota Total Giro", src: new URL("../../assets/projects/totalgiro/frota.jpg", import.meta.url).href, href: "https://www.instagram.com/postostotalgiro/reel/DbN-sYdxKj2/" },
      { label: "Loja de conveniência", src: new URL("../../assets/projects/totalgiro/loja-01.jpg", import.meta.url).href, href: "https://www.instagram.com/postostotalgiro/reel/Da2rFA7hj_O/" },
      { label: "Atendimento na pista", src: new URL("../../assets/projects/totalgiro/atendimento-01.jpg", import.meta.url).href, href: "https://www.instagram.com/postostotalgiro/reel/DawIrIDulyV/" },
      { label: "Café quentinho", src: new URL("../../assets/projects/totalgiro/cafe.jpg", import.meta.url).href, href: "https://www.instagram.com/postostotalgiro/p/DMFu4uDASwo/", aspect: "1/1" },
      { label: "Campanha \"Perto de você\"", src: new URL("../../assets/projects/totalgiro/perto.jpg", import.meta.url).href, href: "https://www.instagram.com/postostotalgiro/p/DN-q2nxwEMM/", aspect: "1/1" },
      { label: "Bastidores da rede", src: new URL("../../assets/projects/totalgiro/bastidores.jpg", import.meta.url).href, href: "https://www.instagram.com/postostotalgiro/reel/DS7pvtygNxQ/" },
    ],
    timeline: [
      { title: "Diagnóstico", detail: "Auditoria da presença digital da rede em Alagoas" },
      { title: "Planejamento", detail: "Editorial mensal por pilar (rede, pessoas, conveniência, campanhas)" },
      { title: "Direção Criativa", detail: "Padrão visual unificado para toda a rede" },
      { title: "Produção", detail: "Captação recorrente em posto, frota e loja" },
      { title: "Social Media", detail: "Gestão completa do @postostotalgiro" },
      { title: "Meta Ads", detail: "Campanhas geolocalizadas por unidade" },
      { title: "Otimizações", detail: "Testes semanais de criativo e segmentação" },
      { title: "Resultados", detail: "Crescimento consistente de alcance, seguidores e frequência" },
    ],
    deliverables: [
      "Social Media",
      "Direção Criativa",
      "Reels",
      "Fotografia",
      "Meta Ads",
      "Branding",
      "Motion Design",
      "Estratégia de Conteúdo",
    ],
    testimonial: {
      name: "Grupo Total Giro",
      role: "Postos Total Giro",
      company: "@postostotalgiro",
      quote:
        "A GR7 traduziu em conteúdo o que a nossa rede representa em Alagoas. Cada parada virou de fato uma experiência — e isso ficou claro no digital.",
    },
  },
  {
    slug: "elva-cosmeticos",
    client: "Elva Cosméticos",
    category: "Social + Reels",
    status: "Em execução",
    clientSince: "2025",
    duration: "5 meses",
    summary:
      "Reposicionamos a Elva no digital com uma linha editorial forte, calendário consistente de reels e uma direção criativa que traduz a marca em cada peça publicada.",
    kpis: [
      { label: "Alcance", value: 248, prefix: "+", suffix: "%" },
      { label: "Seguidores", value: 42000 },
      { label: "Views", value: 3800000 },
      { label: "Compart.", value: 12400 },
      { label: "CPC", value: 1.12, prefix: "R$ ", decimals: 2 },
      { label: "CTR", value: 6.7, suffix: "%", decimals: 1 },
      { label: "Salvos", value: 21800 },
      { label: "ROI", value: 3.6, suffix: "x", decimals: 1 },
    ],
    overallScore: 96,
    scores: [
      { label: "Direção Criativa", value: 98 },
      { label: "Meta Ads", value: 94 },
      { label: "Criativos", value: 97 },
      { label: "Conversão", value: 93 },
      { label: "Retenção", value: 95 },
    ],
    satisfaction: 5,
    growth: [
      { label: "Jan", value: 18 },
      { label: "Fev", value: 30 },
      { label: "Mar", value: 46 },
      { label: "Abr", value: 62 },
      { label: "Mai", value: 82 },
      { label: "Jun", value: 100 },
    ],
    distribution: [
      { label: "Reels", value: 44, color: "#ff1a1a" },
      { label: "Social", value: 28, color: "#0a0a0a" },
      { label: "Meta Ads", value: 20, color: "#ff6b6b" },
      { label: "Direção", value: 8, color: "#e5e5e5" },
    ],
    beforeAfter: [
      { label: "Feed" },
      { label: "Reel" },
      { label: "Capa de campanha" },
      { label: "Story" },
    ],
    gallery: [
      { label: "Reel destaque" },
      { label: "Campanha" },
      { label: "Bastidores" },
      { label: "Editorial" },
      { label: "Anúncio" },
      { label: "Story" },
    ],
    timeline: [
      { title: "Pesquisa", detail: "Estudo de linguagem e concorrência" },
      { title: "Planejamento", detail: "Editorial mensal por pilar" },
      { title: "Branding", detail: "Refino de tom e territórios" },
      { title: "Identidade Visual", detail: "Sistema para social" },
      { title: "Landing Page", detail: "Página de lançamento" },
      { title: "Campanhas", detail: "Reels + Meta Ads" },
      { title: "Otimizações", detail: "Testes A/B semanais" },
      { title: "Escala", detail: "Amplificação dos vencedores" },
      { title: "Resultados", detail: "Leitura editorial + mídia" },
    ],
    deliverables: [
      "Social Media",
      "Reels",
      "Meta Ads",
      "Direção Criativa",
      "Motion Design",
      "Editorial",
      "Estratégia",
    ],
    testimonial: {
      name: "Isadora Elva",
      role: "Diretora de Marca",
      company: "Elva Cosméticos",
      quote:
        "Nunca tivemos consistência assim no digital. Cada peça parece parte de um filme só — e os números confirmam.",
    },
  },
  {
    slug: "nova-corretora",
    client: "Nova Corretora",
    category: "Performance + Google Ads",
    status: "Projeto Concluído",
    clientSince: "2023",
    duration: "12 meses",
    summary:
      "Estruturamos toda a operação de mídia paga da Nova Corretora, reduzindo CPL, aumentando qualidade de lead e multiplicando o volume de contratos fechados no ano.",
    kpis: [
      { label: "Leads", value: 4820 },
      { label: "CPL", value: 18.4, prefix: "R$ ", decimals: 2 },
      { label: "Conversão", value: 6.8, suffix: "%", decimals: 1 },
      { label: "Contratos", value: 312 },
      { label: "CPC", value: 1.45, prefix: "R$ ", decimals: 2 },
      { label: "CTR", value: 7.2, suffix: "%", decimals: 1 },
      { label: "Impressões", value: 2100000 },
      { label: "ROI", value: 6.2, suffix: "x", decimals: 1 },
    ],
    overallScore: 97,
    scores: [
      { label: "Google Ads", value: 99 },
      { label: "Meta Ads", value: 95 },
      { label: "Landing Page", value: 96 },
      { label: "Conversão", value: 98 },
      { label: "Retenção", value: 94 },
    ],
    satisfaction: 5,
    growth: [
      { label: "T1", value: 20 },
      { label: "T2", value: 40 },
      { label: "T3", value: 62 },
      { label: "T4", value: 78 },
      { label: "T5", value: 88 },
      { label: "T6", value: 100 },
    ],
    distribution: [
      { label: "Google Ads", value: 46, color: "#ff1a1a" },
      { label: "Meta Ads", value: 30, color: "#0a0a0a" },
      { label: "Landing Page", value: 16, color: "#ff6b6b" },
      { label: "CRM", value: 8, color: "#e5e5e5" },
    ],
    beforeAfter: [
      { label: "Landing" },
      { label: "Anúncio Google" },
      { label: "Anúncio Meta" },
      { label: "Funil de CRM" },
    ],
    gallery: [
      { label: "Dashboard" },
      { label: "Landing" },
      { label: "Anúncio" },
      { label: "Relatório" },
      { label: "CRM" },
      { label: "Case" },
    ],
    timeline: [
      { title: "Diagnóstico", detail: "Auditoria completa da operação" },
      { title: "Planejamento", detail: "Estratégia por segmento" },
      { title: "Landing Page", detail: "Rebuild focado em CVR" },
      { title: "Campanhas", detail: "Google + Meta estruturados" },
      { title: "CRM", detail: "Integração e nutrição" },
      { title: "Otimizações", detail: "Iterações semanais" },
      { title: "Escala", detail: "Verba dobrada, CPL estável" },
      { title: "Resultados", detail: "Recorde histórico" },
    ],
    deliverables: [
      "Google Ads",
      "Meta Ads",
      "Landing Page",
      "CRM",
      "Analytics",
      "Estratégia",
    ],
    testimonial: {
      name: "Rafael Andrade",
      role: "CMO",
      company: "Nova Corretora",
      quote:
        "Reduzimos custo por lead pela metade e triplicamos o volume de contratos. A GR7 opera com nível de indústria.",
    },
  },
  {
    slug: "casa-nord",
    client: "Casa Nord",
    category: "Identidade Visual",
    status: "Projeto Concluído",
    clientSince: "2024",
    duration: "4 meses",
    summary:
      "Construção da identidade visual completa da Casa Nord — do logotipo aos sistemas de aplicação, entregando uma marca coerente, sofisticada e pronta para escalar.",
    kpis: [
      { label: "Aplicações", value: 84 },
      { label: "Peças", value: 210 },
      { label: "Reconhecimento", value: 62, prefix: "+", suffix: "%" },
      { label: "Preferência", value: 44, prefix: "+", suffix: "%" },
      { label: "NPS", value: 74 },
      { label: "Ticket médio", value: 28, prefix: "+", suffix: "%" },
      { label: "Recompra", value: 36, prefix: "+", suffix: "%" },
      { label: "Awareness", value: 3.2, suffix: "x", decimals: 1 },
    ],
    overallScore: 96,
    scores: [
      { label: "Branding", value: 98 },
      { label: "Identidade Visual", value: 99 },
      { label: "Aplicação", value: 95 },
      { label: "Consistência", value: 96 },
      { label: "Retenção", value: 92 },
    ],
    satisfaction: 5,
    growth: [
      { label: "M1", value: 15 },
      { label: "M2", value: 34 },
      { label: "M3", value: 58 },
      { label: "M4", value: 82 },
      { label: "M5", value: 92 },
      { label: "M6", value: 100 },
    ],
    distribution: [
      { label: "Branding", value: 48, color: "#0a0a0a" },
      { label: "Identidade", value: 34, color: "#ff1a1a" },
      { label: "Aplicação", value: 12, color: "#ff6b6b" },
      { label: "Manual", value: 6, color: "#e5e5e5" },
    ],
    beforeAfter: [
      { label: "Logotipo" },
      { label: "Papelaria" },
      { label: "Ponto de venda" },
      { label: "Digital" },
    ],
    gallery: [
      { label: "Logo" },
      { label: "Papelaria" },
      { label: "Aplicação" },
      { label: "Manual" },
      { label: "Signage" },
      { label: "Mockup" },
    ],
    timeline: [
      { title: "Pesquisa", detail: "Referência de mercado e público" },
      { title: "Estratégia", detail: "Plataforma de marca" },
      { title: "Concept", detail: "Três rotas visuais" },
      { title: "Sistema Visual", detail: "Construção e refino" },
      { title: "Aplicações", detail: "Ecossistema completo" },
      { title: "Manual", detail: "Guia de uso e governança" },
      { title: "Handover", detail: "Treinamento do time" },
      { title: "Resultados", detail: "Marca em campo" },
    ],
    deliverables: [
      "Branding",
      "Identidade Visual",
      "Papelaria",
      "Manual de Marca",
      "Aplicações",
      "Direção Criativa",
    ],
    testimonial: {
      name: "Henrique Nord",
      role: "Sócio-fundador",
      company: "Casa Nord",
      quote:
        "Recebemos uma marca que não parece feita por agência — parece construída junto com a gente. Ficou impecável.",
    },
  },
  {
    slug: "restaurante-aro",
    client: "Restaurante Aro",
    category: "Vídeo + Captação",
    status: "Projeto Concluído",
    clientSince: "2024",
    duration: "3 meses",
    summary:
      "Direção e produção audiovisual completa para o Restaurante Aro, elevando a percepção da marca com filmes autorais e uma biblioteca inteira de conteúdo.",
    kpis: [
      { label: "Views", value: 2100000 },
      { label: "Alcance", value: 268, prefix: "+", suffix: "%" },
      { label: "Reservas", value: 148, prefix: "+", suffix: "%" },
      { label: "Compart.", value: 8600 },
      { label: "Salvos", value: 14200 },
      { label: "Ticket médio", value: 22, prefix: "+", suffix: "%" },
      { label: "Retenção", value: 78, suffix: "%" },
      { label: "ROI", value: 5.1, suffix: "x", decimals: 1 },
    ],
    overallScore: 97,
    scores: [
      { label: "Direção", value: 99 },
      { label: "Captação", value: 98 },
      { label: "Edição", value: 96 },
      { label: "Distribuição", value: 94 },
      { label: "Retenção", value: 95 },
    ],
    satisfaction: 5,
    growth: [
      { label: "Sem 1", value: 20 },
      { label: "Sem 2", value: 38 },
      { label: "Sem 3", value: 55 },
      { label: "Sem 4", value: 72 },
      { label: "Sem 5", value: 88 },
      { label: "Sem 6", value: 100 },
    ],
    distribution: [
      { label: "Vídeo", value: 52, color: "#ff1a1a" },
      { label: "Reels", value: 26, color: "#0a0a0a" },
      { label: "Social", value: 14, color: "#ff6b6b" },
      { label: "Ads", value: 8, color: "#e5e5e5" },
    ],
    beforeAfter: [
      { label: "Feed" },
      { label: "Reel" },
      { label: "Manifesto" },
      { label: "Anúncio" },
    ],
    gallery: [
      { label: "Filme manifesto" },
      { label: "Reel prato" },
      { label: "Bastidores" },
      { label: "Retrato equipe" },
      { label: "Ambiente" },
      { label: "Detalhe" },
    ],
    timeline: [
      { title: "Pré-produção", detail: "Roteiro, decupagem e locação" },
      { title: "Captação", detail: "Dois dias de filmagem" },
      { title: "Edição", detail: "Cortes, color e trilha" },
      { title: "Motion", detail: "Vinhetas e selos" },
      { title: "Distribuição", detail: "Plano de veiculação" },
      { title: "Amplificação", detail: "Mídia paga em reels" },
      { title: "Resultados", detail: "Leitura editorial + mídia" },
    ],
    deliverables: [
      "Direção",
      "Roteiro",
      "Captação",
      "Edição",
      "Motion",
      "Distribuição",
    ],
    testimonial: {
      name: "Chef Otávio Aro",
      role: "Chef & Sócio",
      company: "Restaurante Aro",
      quote:
        "Os filmes mudaram como a gente é enxergado. Cliente chega falando do vídeo antes mesmo de sentar.",
    },
  },
  {
    slug: "shineray",
    client: "Shineray",
    category: "Branding · Social · Performance",
    status: "Em execução",
    clientSince: "2024",
    duration: "Cliente ativo",
    cover: new URL("../../assets/projects/shineray/logo.png", import.meta.url).href,
    logo: new URL("../../assets/projects/shineray/logo.png", import.meta.url).href,
    summary:
      "Marca de motocicletas e veículos utilitários. Conduzimos a comunicação digital da Shineray com direção criativa, gestão de conteúdo, campanhas de performance e apoio à rede de concessionárias — conectando o produto ao público certo em cada região.",
    kpis: [
      { label: "Alcance", value: 312, prefix: "+", suffix: "%" },
      { label: "Engajamento", value: 148, prefix: "+", suffix: "%" },
      { label: "Leads", value: 1240 },
      { label: "Test-drives", value: 186 },
      { label: "CPC", value: 0.68, prefix: "R$ ", decimals: 2 },
      { label: "CTR", value: 6.8, suffix: "%", decimals: 1 },
      { label: "Views (Reels)", value: 940000 },
      { label: "ROI", value: 5.4, suffix: "x", decimals: 1 },
    ],
    overallScore: 96,
    scores: [
      { label: "Branding", value: 96 },
      { label: "Social Media", value: 95 },
      { label: "Performance", value: 97 },
      { label: "Produção Audiovisual", value: 94 },
      { label: "Consistência de Marca", value: 97 },
    ],
    satisfaction: 5,
    growth: [
      { label: "M1", value: 14 },
      { label: "M2", value: 30 },
      { label: "M3", value: 48 },
      { label: "M4", value: 67 },
      { label: "M5", value: 85 },
      { label: "M6", value: 100 },
    ],
    distribution: [
      { label: "Performance", value: 36, color: "#ff1a1a" },
      { label: "Social Media", value: 30, color: "#0a0a0a" },
      { label: "Vídeo", value: 22, color: "#ff6b6b" },
      { label: "Branding", value: 12, color: "#e5e5e5" },
    ],
    beforeAfter: [
      { label: "Feed" },
      { label: "Criativos de anúncio" },
      { label: "Catálogo" },
      { label: "Concessionárias" },
    ],
    gallery: [
      { label: "Lançamento de modelo" },
      { label: "Criativo Meta Ads" },
      { label: "Reel test-drive" },
      { label: "Showroom" },
      { label: "Campanha regional" },
      { label: "Bastidores" },
    ],
    timeline: [
      { title: "Diagnóstico", detail: "Marca, público e concorrência" },
      { title: "Território visual", detail: "Direção de arte da linha" },
      { title: "Conteúdo", detail: "Calendário e produção mensal" },
      { title: "Performance", detail: "Estrutura de campanhas" },
      { title: "Rede", detail: "Kit para concessionárias" },
      { title: "Otimizações", detail: "Testes de criativo e público" },
      { title: "Escala", detail: "Expansão regional" },
    ],
    deliverables: [
      "Branding",
      "Social Media",
      "Meta & Google Ads",
      "Produção Audiovisual",
      "Criativos",
      "Relatórios",
    ],
    testimonial: {
      name: "Equipe Shineray",
      role: "Marketing",
      company: "Shineray",
      quote:
        "A GR7 entendeu o produto e a nossa rede. A comunicação ficou mais forte e o volume de leads mudou de patamar.",
    },
  },
  {
    slug: "bloom-skincare",
    client: "Bloom Skincare",
    category: "Direção Criativa",
    status: "Em execução",
    clientSince: "2025",
    duration: "6 meses",
    summary:
      "Direção criativa 360 para a Bloom Skincare — território visual, campanhas sazonais e produção contínua para social e mídia.",
    kpis: [
      { label: "Alcance", value: 286, prefix: "+", suffix: "%" },
      { label: "Engajamento", value: 162, prefix: "+", suffix: "%" },
      { label: "Vendas", value: 118, prefix: "+", suffix: "%" },
      { label: "Ticket médio", value: 34, prefix: "+", suffix: "%" },
      { label: "CPC", value: 0.96, prefix: "R$ ", decimals: 2 },
      { label: "CTR", value: 7.4, suffix: "%", decimals: 1 },
      { label: "Recorrência", value: 42, prefix: "+", suffix: "%" },
      { label: "ROI", value: 4.6, suffix: "x", decimals: 1 },
    ],
    overallScore: 95,
    scores: [
      { label: "Direção Criativa", value: 98 },
      { label: "Criativos", value: 96 },
      { label: "Meta Ads", value: 93 },
      { label: "Conversão", value: 94 },
      { label: "Retenção", value: 94 },
    ],
    satisfaction: 5,
    growth: [
      { label: "Jan", value: 14 },
      { label: "Fev", value: 28 },
      { label: "Mar", value: 46 },
      { label: "Abr", value: 66 },
      { label: "Mai", value: 84 },
      { label: "Jun", value: 100 },
    ],
    distribution: [
      { label: "Direção", value: 38, color: "#ff1a1a" },
      { label: "Social", value: 28, color: "#0a0a0a" },
      { label: "Meta Ads", value: 22, color: "#ff6b6b" },
      { label: "E-commerce", value: 12, color: "#e5e5e5" },
    ],
    beforeAfter: [
      { label: "Feed" },
      { label: "Campanha" },
      { label: "Packshot" },
      { label: "Anúncio" },
    ],
    gallery: [
      { label: "Editorial" },
      { label: "Reel" },
      { label: "Packshot" },
      { label: "Story" },
      { label: "Anúncio" },
      { label: "Bastidor" },
    ],
    timeline: [
      { title: "Imersão", detail: "Marca, público e produto" },
      { title: "Direção", detail: "Território criativo" },
      { title: "Produção", detail: "Captação editorial" },
      { title: "Social", detail: "Rollout mensal" },
      { title: "Meta Ads", detail: "Amplificação" },
      { title: "Otimizações", detail: "Criativo + mídia" },
      { title: "Resultados", detail: "Leitura contínua" },
    ],
    deliverables: [
      "Direção Criativa",
      "Social Media",
      "Meta Ads",
      "Produção",
      "Motion Design",
      "Estratégia",
    ],
    testimonial: {
      name: "Alícia Bloom",
      role: "CEO",
      company: "Bloom Skincare",
      quote:
        "Fomos elevados a outro patamar visual. Todo material da marca hoje tem o padrão que a gente sonhava.",
    },
  },
  {
    slug: "atelie-gaia",
    client: "Ateliê Gaia",
    category: "Fotografia + E-commerce",
    status: "Projeto Concluído",
    clientSince: "2024",
    duration: "5 meses",
    summary:
      "Produção fotográfica completa e reestruturação de e-commerce para o Ateliê Gaia, com foco em conversão e uma vitrine à altura das peças.",
    kpis: [
      { label: "Conversão", value: 3.9, suffix: "%", decimals: 1 },
      { label: "Ticket médio", value: 41, prefix: "+", suffix: "%" },
      { label: "Sessões", value: 128000 },
      { label: "Compras", value: 2140 },
      { label: "CPC", value: 1.02, prefix: "R$ ", decimals: 2 },
      { label: "CTR", value: 6.9, suffix: "%", decimals: 1 },
      { label: "Retorno", value: 38, prefix: "+", suffix: "%" },
      { label: "ROI", value: 5.4, suffix: "x", decimals: 1 },
    ],
    overallScore: 97,
    scores: [
      { label: "Fotografia", value: 99 },
      { label: "E-commerce", value: 96 },
      { label: "Meta Ads", value: 94 },
      { label: "Conversão", value: 97 },
      { label: "Retenção", value: 95 },
    ],
    satisfaction: 5,
    growth: [
      { label: "M1", value: 16 },
      { label: "M2", value: 32 },
      { label: "M3", value: 52 },
      { label: "M4", value: 74 },
      { label: "M5", value: 90 },
      { label: "M6", value: 100 },
    ],
    distribution: [
      { label: "Fotografia", value: 40, color: "#0a0a0a" },
      { label: "E-commerce", value: 32, color: "#ff1a1a" },
      { label: "Meta Ads", value: 20, color: "#ff6b6b" },
      { label: "Editorial", value: 8, color: "#e5e5e5" },
    ],
    beforeAfter: [
      { label: "Home" },
      { label: "Produto" },
      { label: "Checkout" },
      { label: "Anúncio" },
    ],
    gallery: [
      { label: "Editorial" },
      { label: "Packshot" },
      { label: "Home" },
      { label: "Produto" },
      { label: "Anúncio" },
      { label: "Story" },
    ],
    timeline: [
      { title: "Direção", detail: "Referência e briefing" },
      { title: "Produção", detail: "Captação editorial e packshot" },
      { title: "E-commerce", detail: "Rebuild da loja" },
      { title: "Meta Ads", detail: "Campanhas de aquisição" },
      { title: "CRO", detail: "Ajustes de conversão" },
      { title: "Escala", detail: "Verba multiplicada" },
      { title: "Resultados", detail: "Recorde de vendas" },
    ],
    deliverables: [
      "Fotografia",
      "E-commerce",
      "Meta Ads",
      "Direção",
      "CRO",
      "Estratégia",
    ],
    testimonial: {
      name: "Larissa Gaia",
      role: "Fundadora",
      company: "Ateliê Gaia",
      quote:
        "As peças finalmente ganharam a vitrine que mereciam. E o resultado em vendas veio junto — sem exagero, número atrás de número.",
    },
  },
];
