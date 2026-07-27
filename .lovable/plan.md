## Diagnóstico
Hoje a landing tem **12 seções seguidas de mídia** entre `ProjectsGrid` e `InstagramProfile`, sem respiro. O olho satura porque tudo vira "grid de imagem" e o conteúdo estratégico (números, processo, resultados) só aparece depois. A sensação é de portfólio pesado, não de agência com discurso.

## Estratégia
Duas frentes, aplicadas juntas:

### 1. Intercalar mídia com seções "de leitura"
Reordenar o `Landing.tsx` para que nunca haja mais de 2 blocos de mídia seguidos. Blocos de leitura (Services, Difference, Process, Results, Cases textuais, novos abaixo) entram entre as sequências de mídia.

Nova ordem proposta:

```text
Hero
Services              (leitura)
ProjectsGrid          (mídia)
Difference            (leitura, números)
CinematicVideo        (mídia)
Manifesto             (NOVO — leitura)
ReelsSection          (mídia)
StoriesRow            (mídia leve)
Process               (leitura)
ArtsMasonry           (mídia)
Stack & Ferramentas   (NOVO — leitura)
BackstageGrid         (mídia)
CasesShowcase         (misto)
Results               (leitura)
DashboardsSection     (mídia)
FAQ                   (NOVO — leitura)
VideoTestimonialsSection (mídia)
ClientsMarquee        (mídia leve)
InstagramProfile      (mídia)
GR7InAction           (mídia)
CTA
```

### 2. Adicionar 3 seções sem mídia
Para dar densidade editorial e quebrar o ritmo:

- **Manifesto** — bloco tipográfico grande ("O que a GR7 acredita"), 3-4 frases curtas em Archivo Black, com uma palavra em vermelho por linha. Zero imagem.
- **Stack & Ferramentas** — grid enxuto (2 linhas × 6 colunas) listando as ferramentas que a agência usa: Meta Ads Manager, Google Ads, GA4, Looker Studio, HubSpot, Notion, Figma, CapCut, Premiere, Photoshop, Illustrator, WhatsApp Business. Só nome + ícone monocromático (Lucide) — não conta como mídia.
- **FAQ** — 5-6 perguntas comuns ("Vocês trabalham com qual porte de cliente?", "Como funciona o onboarding?", "Prazo médio de resultado?", "Vocês fecham contrato mensal?", "Como é o relatório?"), em acordeão minimalista preto sobre branco.

Todas seguem o mesmo padrão visual das seções atuais de leitura (Services, Difference): fundo branco/preto puro, tipografia forte, `Reveal` bidirecional, nenhuma dependência nova.

## Escopo
- `src/components/gr7/Landing.tsx`: reordenar seções e criar `Manifesto`, `Stack`, `FAQ` no mesmo arquivo (padrão dos outros blocos internos).
- Nenhuma alteração em `MediaSections.tsx`, `mediaConfig.ts`, paleta, fonte ou dependências.
- Conteúdo textual das novas seções em português, no tom já usado (curto, direto, com acento vermelho).

## Verificação
Rolar do topo ao CTA e confirmar: nunca 3 seções de mídia seguidas, o olho encontra texto/números a cada ~2 blocos, e as 3 novas seções têm personalidade própria (não parecem repetição de "Diferenciais").