## Objetivo
Fazer com que cada bloco (títulos, cards, imagens, seções) **entre em cena ao descer** e **saia ao subir**, cada um com uma animação única, elegante e chamativa — sem quebrar layout nem transformar o site em algo pesado.

## Diagnóstico
Hoje o helper `Reveal` (em `Landing.tsx`) usa `useInView(..., { once: true })` e as seções em `MediaSections.tsx` usam `viewport={{ once: true }}`. Ou seja: quando o elemento entra, anima uma única vez e nunca mais reage ao scroll — inclusive quando sai/volta. É por isso que a página parece "estática" ao rolar de volta.

## Estratégia

### 1. Reveal bidirecional
Alterar `Reveal` para animar em ambas as direções, usando `whileInView`/`useInView` sem `once: true`:
- entrada (visível): `opacity: 1, y: 0, filter: blur(0)`
- saída (fora): `opacity: 0, y: <valor>, filter: blur(4px)`

Aceitar uma prop `variant` para escolher entre estilos únicos — mantendo a API atual (todos os locais que hoje usam `<Reveal>` continuam funcionando).

### 2. Catálogo de variantes (para dar personalidade única)
Criar variantes reutilizáveis:
- `rise` — sobe suave com leve blur (padrão de parágrafos).
- `fall` — desce do topo com leve rotação (títulos de seção).
- `slide-left` / `slide-right` — entra lateralmente (usada em pares de colunas: hero copy vs. hero visual, difference vs. counters).
- `scale` — leve zoom-in + fade (usada em cards de serviço e imagens grandes).
- `mask` — clip-path revelando de baixo pra cima (usada em títulos display grandes e cards de portfólio).
- `tilt` — pequena rotação 3D + fade (usada em depoimentos e Instagram).

Todas com easing `[0.22, 1, 0.36, 1]` e duração 0.7–0.9s, respeitando `prefers-reduced-motion`.

### 3. Aplicação
- Trocar todos `once: true`/`viewport={{ once: true }}` em `Landing.tsx` e `MediaSections.tsx` para bidirecional.
- Escolher variante por seção (não por elemento individual, pra manter coerência):
  - Hero: `rise` no copy, `scale` no visual.
  - Services: `rise` no header, `scale` nos cards (stagger por índice).
  - Difference/Counters: `slide-right`/`slide-left`.
  - Process (timeline): `fall` nos steps.
  - Projects/Arts/Backstage: `mask` nas mídias.
  - Reels/Stories: `scale` com stagger.
  - Cases/Video Testimonials/Instagram: `tilt`.
  - Dashboards: `slide-right` no notebook, `rise` no texto.
  - CTA/Footer: `rise`.

### 4. Guardas de performance
- Manter `margin: "-80px"` para disparar antes de aparecer no viewport.
- Usar `will-change: transform, opacity` só nos elementos que animam.
- Respeitar `prefers-reduced-motion` (fallback = fade curto sem transform).
- Não aplicar em elementos gigantes de fundo (background/gradientes seguem contínuos).

### 5. Verificação
Rolar a página inteira via preview, subir e descer para confirmar que:
- animações entram ao descer e saem ao subir sem "engasgar".
- cada seção tem uma personalidade visível (não é o mesmo fade em todo lugar).
- FPS continua fluido (as animações são só `transform`/`opacity`/`filter: blur`).

## Escopo
Somente `src/components/gr7/Landing.tsx` e `src/components/gr7/MediaSections.tsx`. Nada de conteúdo, layout macro, paleta ou tipografia muda. Nenhuma nova dependência.
