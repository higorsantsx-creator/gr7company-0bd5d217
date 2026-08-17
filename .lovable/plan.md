# GlobalScrollFlow Refactoring Plan

Refactor the `GlobalScrollFlow` system to be a robust, section-aware, and high-performance visual interaction that continuously follows the user across the entire GR7 Company landing page.

## Analysis
- **Current State:** Uses a fixed SVG with a hardcoded `body` scroll timeline (0.1, 0.3, etc.). Particles and node are loosely coupled. Transitions between paths are sudden.
- **Problem:** Fragile trigger points that break on layout changes or different screen sizes. Visual "gaps" where the flow might disappear.
- **Refactor Goal:** Dynamic section detection using `data-scroll-flow` attributes, continuous path geometry, and optimized velocity-based physics.

## Technical Details

### 1. Data-Driven Section Awareness
- Add `data-scroll-flow` attributes to main sections in `Landing.tsx` (hero, services, portfolio, etc.).
- Use `ScrollTrigger` to track the *active* section and calculate local progress within it.
- Dynamically build the trajectory based on the relative vertical positions of these sections.
- **Constraint:** Section awareness must NEVER reset or restart the global flow.

### 2. Continuous Trajectory Architecture
- Implement a unified SVG path system.
- **Interpolation:** Use compatible path geometries with matching command structures (normalized cubic Beziers) to guarantee smooth interpolation without `d` string glitches.
- Calculate path progress using `getTotalLength()` and dynamic dash offsets.
- **Active Node:** Use `path.getPointAtLength()` to ensure the node is *perfectly* locked to the line geometry.

### 3. High-Performance Engine (Single Loop)
- Replace multiple independent tweens with a **single** update loop (`gsap.ticker` or `requestAnimationFrame`).
- All visual updates (particles, node, path deformation, velocity effects) will run within this single loop.
- Use `gsap.quickTo()` for mouse repulsion (1-2% displacement) and velocity reactions.
- Scale particle density and effects based on device type (reduced on mobile).

### 4. Robust Lifecycle & Responsiveness
- Use `useGSAP` for automatic cleanup.
- Implement a `refreshMeasurements()` function triggered by `window.resize`, font loading, and `ScrollTrigger.refresh()`.
- **Constraint:** Ensure measurements are refreshed after images/videos/dynamic content finish affecting layout.

## Changes

### `src/components/gr7/Landing.tsx`
- Add `data-scroll-flow` attributes to:
    - `HeroIntro` -> `hero-intro`
    - `HeroPrincipal` (inside `main`) -> `hero`
    - `Services` -> `services`
    - `ProjectsGrid` -> `portfolio`
    - `ReelsSection` -> `reels`
    - `ResultsSection` -> `results`
    - `VideoTestimonialsSection` -> `testimonials`
    - `CTA` -> `cta`

### `src/components/gr7/GlobalScrollFlow.tsx`
- Rewrite core logic:
    - Replace the `tl` timeline with a dynamic update function in a single ticker loop.
    - Implement `calculateFlowState(progress)` to interpolate path `d` and `opacity` using normalized commands.
    - Create a dedicated particle manager for better state handling within the loop.
    - Fix mouse interaction to use `quickTo` with a 2% displacement limit.
    - Ensure `activePoint` follows the path precisely.

### `src/styles.css`
- (Optional) Add `will-change: transform` to the flow container to ensure GPU acceleration without layer bloat.

## Validation Plan
1. **Vertical Continuity:** Scroll from top to bottom at varying speeds; the line must never vanish.
2. **Jump Test:** Use navigation links or scrollbar jumps; the flow must snap correctly to the destination section's state.
3. **Resize Test:** Change window width/height; the path must stay contained within the viewport and relative to section flow.
4. **Mobile Check:** Verify that mouse interaction is disabled and particle count is reduced.
5. **Layout Shift Test:** Simulate dynamic content loading to ensure measurements refresh correctly.

