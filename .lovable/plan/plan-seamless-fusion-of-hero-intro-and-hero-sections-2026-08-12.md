# Plan - Seamless Fusion of Hero Intro and Hero Sections

Eliminate the visual boundary between the Hero Intro and the Main Hero by implementing a shared structural background and a long scroll-driven morphing transition.

## User Review Required

> [!IMPORTANT]
> To achieve a truly seamless transition, I will be moving the background logic from individual sections into a shared `BackgroundAtmosphere` component. This ensures that the atmosphere is continuous across sections.

## Proposed Changes

### 1. Structural Background Unification
- Create a new `SharedAtmosphere` component in `Landing.tsx` that hosts the global background (dark base, radial glows, grids, and grain).
- This component will wrap both `HeroIntro` and `Hero` to ensure the "stage" is shared.

### 2. Morphing Transition in HeroIntro
- Update `HeroIntro.tsx` to handle the background morphing locally during the final 30% of its scroll progress.
- Instead of just fading to black or red, it will blend the initial "Deep Black" state into the "Hero Red Glow" state using advanced radial gradient interpolation.

### 3. Scroll-Driven Element Revelation
- Sync the `scrollYProgress` between the two components more tightly.
- Start revealing the `Hero` section's grid and lighting while the `HeroIntro` is still at ~75% completion.
- Implement a "hierarchical reveal" where atmospheric light appears first, followed by the grid, then the content (text/cards).

### 4. Continuous Grid & Lines
- Modify the `HeroIntro` dynamic lines to morph into or align with the `Hero` section's grid during the transition.
- Ensure no "jump" in grid alignment by using consistent sizing (`80px` vs `70px` - will unify to `80px`).

## Technical Details

- **Motion/React:** Utilize `useScroll` with overlapping offsets to trigger transitions early.
- **CSS Gradients:** Use complex `radial-gradient` strings with `motion` transforms for smooth color morphing.
- **Z-Index Layering:** Re-layer the `Hero` content to sit "inside" the atmosphere rather than "above" it.
- **Layout:** Remove individual `bg-[#0a0a0a]` classes from sections and use `bg-transparent` so the shared background is always visible.
