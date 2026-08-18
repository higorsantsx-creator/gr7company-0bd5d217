# Plano de Implementação — Testimonials Cinematic Upgrade

O objetivo é corrigir o corte das thumbnails dos depoimentos e elevar o protagonismo visual do card ativo através de um "Cinematic Poster Mode" e micro-interações refinadas.

## Mudanças Técnicas

### 1. Sistema de Protagonismo (MediaSections.tsx)
- Alterar `flexGrow` do card ativo de 3.2 para **3.8**.
- Cards secundários recuam para `flexGrow: 0.48` com redução de brilho (`brightness 0.78`) e saturação (`saturate 0.80`).
- Aumentar altura dos cards para `lg:h-[575px]` e `xl:h-[590px]`.
- Refinar rotação 3D para um máximo de ±4.4deg (mais elegante em cards grandes).
- Aumentar `translateZ` para 36 e `scale` para 1.025 no estado ativo.

### 2. Cinematic Poster Mode (TestimonialCard)
- Substituir a camada única de imagem por um sistema de três camadas:
    - **Layer 0 (Base):** Thumbnail padrão com `object-cover` (visível apenas quando inativo).
    - **Layer 1 (Atmosfera):** Mesma thumbnail com blur intenso (18px), baixo brilho e saturação reduzida, preenchendo o container.
    - **Layer 2 (Poster):** Thumbnail original com `object-contain`, ocupando ~92% da área, com profundidade física (`translateZ: 18`).
- Transição suave controlada via opacidade e transformações para evitar "flicker".

### 3. Micro-interações e Acabamento
- **Cinematic Light:** Adicionar um gradiente radial vermelho sutil no centro do card ativo.
- **Border Energy:** Uma linha de luz rápida que percorre a borda superior na entrada do card.
- **Content Reveal:** Escalonar (stagger) a entrada dos elementos de texto (segmento, título, quote, bloco inferior) em um intervalo total de ~130ms.
- **Quote Accent:** Animar a altura da linha vermelha lateral da citação (0% para 100%).
- **Play Button:** Adicionar anel de foco (`ring`) e leve escala no hover do botão play central.

### 4. Correção Local (MediaSlot)
- As alterações de enquadramento serão aplicadas localmente no `TestimonialCard` para não afetar outras áreas do site.
- Adicionar suporte opcional para `thumbnailPosition` no `mediaConfig.ts` e consumi-lo via `style={{ objectPosition }}` no estado fechado.

## Verificação
- Validar se a thumbnail da **JVE Forros** (caso crítico) aparece completa no modo poster.
- Testar a legibilidade dos textos da **Bobby Móveis** no novo layout 45/55.
- Garantir que o fechamento sincronizado entre mídia e conteúdo permaneça fluido.
