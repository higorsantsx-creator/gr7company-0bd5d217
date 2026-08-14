# Plan: Internal Refactoring of the Reels Showcase

Refactor the `ReelsSection` structure to improve composition, hierarchy, and animation flow, moving away from a simple grid to a cinematic depth-based installation.

## User Review Required

> [!IMPORTANT]
> This refactor changes the internal structure of the `ReelsSection` to use a dedicated wrapper for the smartphone composition, improving depth and layout predictability. Parallax and hover effects are being refined for a more subtle, high-end look.

- **Depth Composition**: Reorganized smartphones into a layered scene (Protagonist in center-front, Left/Right framing, Depth phone behind).
- **Hooks Optimization**: Extracted logic into a `ReelPhone` sub-component to strictly follow React's Rules of Hooks.
- **Editorial Hierarchy**: Compact header tightly integrated with the composition, reducing wasted vertical space.
- **Visual Polish**: Refined hover states, cinematic entrance sequences, and removal of placeholder metrics.

## Technical Details

### 1. Component Architecture
- Create a `ReelPhone` internal component to handle individual smartphone logic (parallax, mouse tilt, entrance).
- Replace the absolute-within-section layout with a `div` of controlled dimensions (max-width ~1100px) as the composition wrapper.

### 2. Smartphone Positioning & Depth
- **Phone 02 (Index 1)**: `z-index: 50`, `scale: 1.0`, `width: ~300px`, center.
- **Phone 01 (Index 0)**: `z-index: 30`, `scale: ~0.85`, left, slight negative rotation.
- **Phone 03 (Index 2)**: `z-index: 30`, `scale: ~0.85`, right, slight positive rotation.
- **Phone 04 (Index 3)**: `z-index: 20`, `scale: ~0.75`, positioned behind protagonist, partially visible (80%).

### 3. Animation Refinement
- **Entrance**: Coordinated staggered sequence (Eyebrow -> Title -> Description -> Phones 2, 1, 3, 4).
- **Parallax**: Vertical shifts reduced (0px to -20px range) for a cinematic feel.
- **Hover**: Subtler opacity change (0.8 for others) and minimal scale/depth increase for active phone.
- **Interaction**: Mouse tilt capped at ±2°.

### 4. Cleanup
- Remove the "10M+ Alcance" / "85% Retenção" metrics bar as per request.
- Simplify `MediaSlot` usage within the section to protagonist-focused content.
- Fix "Playing" indicator to use a single "● PLAYING" text.
