# Plano de Implementação: Seção Reels "The Attention Machine"

Refinar a seção de Reels para criar uma experiência cinematográfica e editorial, transformando-a em uma composição 3D assimétrica de smartphones que reagem ao scroll e ao cursor.

## Alterações Sugeridas

### 1. Novo Componente `ReelsSection` (em `src/components/gr7/MediaSections.tsx`)
- Substituir a implementação atual por uma estrutura de altura generosa (~120vh) para permitir scroll-driven animations.
- Implementar o Header da seção com o label "CONTEÚDO VERTICAL / 04" e a linha fina.
- Adicionar o Título Principal em duas linhas com quebra controlada e o texto de apoio de 520px.
- Criar a composição assimétrica dos 4 smartphones:
  - **Phone 1 (Esq):** Menor, rotacionado, mais ao fundo.
  - **Phone 2 (Centro-Esq):** Posição intermediária.
  - **Phone 3 (Central/Principal):** +15% de escala, glow sutil, sombra profunda, z-index maior.
  - **Phone 4 (Dir):** Deslocado, rotacionado opostamente.

### 2. Micro-interações e Animações
- **Reveal Sequencial:** Usar Motion/GSAP para entrada escalonada (Eyebrow -> Título -> Descrição -> Phones 1-4).
- **Floating Motion:** Aplicar um leve "bobbing" orgânico (amplitude 3-5px) com frequências diferentes para cada phone.
- **Scroll Parallax:** Smartphones se deslocam verticalmente em velocidades diferentes conforme o scroll.
- **Cursor Parallax:** Efeito 3D sutil onde os telefones rotacionam levemente (rotateX/Y) em direção ao mouse.
- **Hover Selection:** O smartphone focado ganha escala (1.025) e brilho, enquanto os outros perdem opacidade (0.88).

### 3. Otimização de Vídeo e Performance
- Utilizar o `MediaSlot` existente para garantir compatibilidade com placeholders/vídeos reais.
- Implementar `IntersectionObserver` rigoroso: autoplay apenas quando visível (>35%), pause imediato ao sair.
- Garantir `muted`, `loop` e `playsInline` em todos os vídeos.

### 4. Responsividade
- **Desktop:** Layout assimétrico pleno.
- **Tablet:** Composição 2x2 ou escala reduzida.
- **Mobile:** Foco no Smartphone Principal no topo, com os demais em grid ou carrossel controlado abaixo.

## Detalhes Técnicos
- **Bibliotecas:** GSAP (para parallax/mouse inter) e Motion (para states/reveal).
- **Estilos:** Tailwind CSS para o layout base e bezel dos smartphones.
- **Isolamento:** Nenhuma alteração fora do escopo da `ReelsSection` em `MediaSections.tsx` ou arquivos auxiliares específicos.
