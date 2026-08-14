# Plan: Cinematic Reels Showcase Experience

Rebuild the Reels section into a premium, scroll-driven, and interaction-rich "Cinematic Showcase" for GR7 Company, while maintaining the existing `MediaSlot` and `mediaConfig` structure.

## Proposed Changes

### 1. Visual Structure & Layout
- Reorganize the grid of 4 smartphones into an **asymmetric, editorial composition** for desktop.
  - Smartphone 2 (Center) as the main protagonist (slightly larger, stable).
  - Smartphones 1, 3, and 4 strategically placed with different scales and depths to create a 3D feel.
- Implement **modern smartphone frames** with thin bezels, Dynamic Island, and realistic depth/shadows.
- Add **editorial metadata** for each reel (e.g., "● PLAYING", "REEL 01", "GR7 / VERTICAL CONTENT").

### 2. Animations & Interactions
- **Cinematic Entrance**: Sequential reveal on scroll using `blur`, `scale`, and `y` displacement.
- **Scroll-Driven Parallax**: Subtle vertical displacement for side smartphones at different speeds compared to the center.
- **Mouse Interaction**: Sophisticated tilt effect reacting to cursor position across the whole section.
- **Premium Hover**: 1-3% scale increase, depth enhancement, and slight dimming of non-hovered devices.
- **Video Optimization**: Intersection Observer for lazy-autoplay (plays only when visible, pauses when far).

### 3. Context & Typography
- New hierarchy: Eye-catcher eyebrow ("CONTEÚDO QUE PARA O SCROLL.") → Main title ("IDEIAS QUE GANHAM MOVIMENTO.") → Strategic description.
- Integrated visual details: connection lines, reproduction indicators, and subtle glassmorphic elements.

### 4. Technical Details
- Use `framer-motion` for all transitions and interactions.
- Maintain `MediaSlot` usage to ensure content remains editable in `mediaConfig.ts`.
- Separate mobile layout (sequential/indicator-based) to preserve performance and legibility.

## Components to Update
- `src/components/gr7/MediaSections.tsx`: Refactor `ReelsSection` and potentially create sub-components for the new showcase.
- `src/components/gr7/MediaSlot.tsx`: Update `PhoneFrame` for higher fidelity.
- `src/styles.css`: Add any specific utilities for 3D depth if needed.
