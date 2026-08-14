# Plan: Refining the Reels Showcase Section

Refactor the "REELS" section in `MediaSections.tsx` to improve hierarchy, composition, and visual impact, turning it into a cinematic editorial showcase.

## User Review Required

> [!IMPORTANT]
> The composition will be shifted to a more asymmetric and layered editorial style. The vertical height of the section will be reduced for better flow.

- **Hierarchy**: Introduction of a clear Eyebrow -> Title -> Description sequence.
- **Positioning**: Reorganized 4-smartphone layout with a clear central protagonist and layered depth for others.
- **Lighting**: Subtle studio-style glow behind the smartphones to separate them from the grid background.
- **Mobile**: Optimized horizontal snap-scroll layout for smaller screens.

## Technical Details

### 1. Structure & Hierarchy
- Update `ReelsSection` in `src/components/gr7/MediaSections.tsx` to include:
    - **Eyebrow**: "VERTICAL CONTENT / GR7"
    - **Title**: "IDEIAS QUE GANHAM MOVIMENTO."
    - **Description**: Focused marketing copy.
- Adjust vertical padding from `py-32 md:py-48` to `py-20 md:py-32` to reduce wasted space.

### 2. Compositional Positioning
- Define new absolute coordinates for the 4 smartphones:
    - **Phone 2 (Center)**: `left: 50%`, `scale: 1.1`, `zIndex: 50`, `y: 0` (stable).
    - **Phone 1 (Left Back)**: `left: 20%`, `scale: 0.85`, `zIndex: 20`, `rotation: -3deg`, `y: parallax1`.
    - **Phone 3 (Right Back)**: `left: 80%`, `scale: 0.85`, `zIndex: 20`, `rotation: 3deg`, `y: parallax3`.
    - **Phone 4 (Behind Right)**: `left: 65%`, `top: 45%`, `scale: 0.7`, `zIndex: 10`, `opacity: 0.6`, `y: parallax4`.

### 3. Lighting & Atmosphere
- Refine the background glow: Use a `radial-gradient` with lower opacity and a more "diffuse" look.
- Ensure the 80px grid continues seamlessly.

### 4. Animation Sequence
- Stagger entrance animations using `framer-motion`'s `delay`:
    1. Eyebrow (0s)
    2. Title (0.15s)
    3. Description (0.3s)
    4. Smartphone Central (0.5s)
    5. Smartphones Laterals (0.65s)
    6. Smartphone Background (0.8s)

### 5. Mobile Adaptation
- Keep the horizontal snap scroll but ensure the "Protagonist" feel is preserved in the first card.
- Adjust font sizes for the new textual hierarchy on mobile.
