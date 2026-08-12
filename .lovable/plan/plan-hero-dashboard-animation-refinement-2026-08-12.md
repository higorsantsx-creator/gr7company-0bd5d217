# Plan: Hero Dashboard Animation Refinement

Improve the visual impact of the main Hero section's dashboard composition by adding dynamic entrance and idle animations to its components, matching the premium cinematic style of the GR7 Company landing page.

## Proposed Changes

### 1. Hero Section Enhancement (`src/components/gr7/Landing.tsx`)
- **Add Floating Animation to Dashboard Elements**:
  - Implement a subtle floating effect (y-axis oscillation) for the `HeroDashboard` main card and its floating overlays (Instagram card, Google Ads pill).
  - Use `animate` property with `repeat: Infinity` and `repeatType: "reverse"` to create a continuous, organic motion.
- **Refine KPI Animations**:
  - Add a pulsing glow effect to the "LIVE" indicator.
  - Animate the chart's data points and path to subtly fluctuate, simulating real-time data flow.
- **Entrance Sequences**:
  - Stagger the appearance of dashboard sub-components to create a "building up" effect as the user scrolls into the Hero section.
  - Coordinate these entrance animations with the existing `Reveal` components to ensure a cohesive flow.

### 2. Style Adjustments (`src/styles.css`)
- Add utility classes if necessary for specific glow or blur effects used in the animations to maintain performance and consistency.

## Technical Details
- **Motion (Framer Motion)**: Utilize `useSpring` and `useTransform` for scroll-linked animations, and `animate` for continuous background effects.
- **Performance**: Ensure all animations use `transform-gpu` and `will-change` where appropriate to maintain high FPS on high-resolution screens.
- **Responsiveness**: Maintain existing layout structures while adding motion, ensuring animations don't overlap or cause layout shifts on mobile devices.

