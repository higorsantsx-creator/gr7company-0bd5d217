
## Objetivo
Manter o visual cinematográfico da landing, mas reduzir o custo de renderização das animações que hoje causam sensação de peso/travamento no scroll.

## Diagnóstico (a confirmar na fase de build lendo os arquivos)
Suspeitas principais de gargalo, com base no que já foi construído:
- `AnimatedBackground` fixo em tela inteira: múltiplos blobs com `blur-3xl`, sweep cônico girando 360°, grid animado e partículas com glow — todos rodando o tempo todo, mesmo fora do hero.
- `MediaSlot` renderiza o `Placeholder` ornamentado (grid animado + radial pulsante + linha varrendo) em **cada** slot de mídia. Com dezenas de slots (projetos, reels, stories, artes, cases, dashboards, bastidores, Instagram), são dezenas de animações simultâneas.
- Uso amplo de `whileInView`/`motion` em cards, contadores, marquee e timeline sem `will-change` controlado, sem `prefers-reduced-motion` e sem pausar quando fora da viewport.
- Cursor customizado + scroll progress bar + loader podem adicionar re-renders por frame.

## Mudanças propostas

### 1. Background global mais leve
- Reduzir para 1 blob + 1 gradiente estático + grid sutil (sem sweep cônico girando).
- Trocar `blur-3xl` empilhados por um único gradiente CSS estático + 1 blob animado com `transform` (GPU) em vez de mudar `background-position`.
- Limitar partículas a ~6 (hoje muitas) e remover glow pesado.
- Renderizar o background apenas atrás do hero e das seções escuras; nas seções brancas de conteúdo, deixar fundo sólido (menos composição por frame).

### 2. Placeholders de mídia mais baratos
Em `MediaSlot.tsx`:
- Tornar `ornate` **false por padrão**; usar versão ornamentada só no hero/CTA.
- Placeholder padrão: gradiente estático + ícone, sem grid animado, sem radial pulsante, sem linha varrendo.
- Congelar o placeholder assim que a mídia real carrega (já ocorre) e desmontá-lo do DOM após o fade (hoje fica com `opacity:0` mas ainda existe).

### 3. Animar só quando visível
- Trocar `animate` infinito por `whileInView` + `viewport={{ once: true }}` onde faz sentido (contadores, entradas de cards, timeline, gráficos).
- Marquee de clientes e reels em vídeo: pausar via IntersectionObserver quando fora da viewport (já existe `useInViewAutoplay`, estender para marquee/particles).

### 4. Respeitar `prefers-reduced-motion`
- Hook global que desliga loops infinitos e reduz durações quando o usuário pede menos movimento.
- Aplicar no background, placeholders, marquee e cursor.

### 5. Micro-otimizações
- Adicionar `will-change: transform` apenas nos elementos que realmente animam transform; remover de tudo o mais.
- Trocar animações de `background-position`/`filter: blur` por `transform` sempre que possível.
- Revisar cursor customizado: usar `transform` com `requestAnimationFrame` em vez de state React por movimento; ou desativar em telas touch/mobile.
- Lazy-load das seções pesadas abaixo da dobra (dashboards, Instagram, bastidores) via `React.lazy` + `Suspense`, para não montar tudo no primeiro paint.

### 6. Verificação
Depois das mudanças, medir no preview:
- Rolar a página inteira observando FPS no DevTools.
- Confirmar que hero continua cinematográfico e que as seções de conteúdo ficam claramente mais leves.
- Checar que placeholders continuam bonitos (só menos animados) e que mídias reais, quando plugadas, seguem funcionando.

## Escopo
Somente frontend/apresentação: `AnimatedBackground`, `MediaSlot`, seções em `Landing.tsx` e `MediaSections.tsx`, cursor/loader. Nenhuma mudança de conteúdo, layout macro, paleta ou tipografia. O sistema de mídia (`mediaConfig.ts` + `MediaSlot`) continua igual para a GR7 plugar arquivos reais.
