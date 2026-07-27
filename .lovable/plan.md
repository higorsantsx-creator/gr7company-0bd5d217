## Objetivo
Deixar as bordas dos cards da seção **Serviços** claramente visíveis — hoje elas se dissolvem no fundo animado e o card parece "flutuar solto".

## Diagnóstico
Na screenshot enviada, os cards de serviço usam borda `border-black/[0.05~0.08]` sobre um fundo semi-transparente, então praticamente somem por cima do wash claro do `AnimatedBackground`.

## Mudanças (somente CSS/Tailwind nos cards de serviço em `src/components/gr7/Landing.tsx`)
- Trocar a borda para uma cor sólida mais firme (`border-black/15` em repouso).
- Aumentar levemente a espessura visual usando `ring-1 ring-black/5` para reforçar o contorno sem engordar o layout.
- Aumentar opacidade do fundo do card (`bg-white/90` → `bg-white`) para o card se destacar do background animado.
- Sombra sutil `shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_24px_-16px_rgba(0,0,0,0.15)]` para dar apoio de profundidade.
- No hover, borda passa a `border-[#ff1a1a]/60` (já existe algo parecido) mantendo a nitidez.

## Escopo
Apenas os cards da seção Serviços. Não altero layout, ícones, tipografia, animações nem outras seções.
