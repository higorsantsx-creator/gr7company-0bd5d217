# Cinematic Scroll Animation for Reels Section

Implement a high-end, scroll-driven entry animation and continuous micro-interactions for the four smartphones in the "Reels" section of the GR7 Company landing page.

## User Review Required

> [!IMPORTANT]
> - The animation will be strictly scroll-linked (reversible).
> - All existing content, layouts, and responsiveness will be preserved.
> - A new continuous micro-floating animation will be added for the final state.

- Do you have any specific "overshoot" amount preferences, or should I use a standard natural physics value?
- The continuous floating animation will be very subtle; is there a specific "intensity" you'd like (e.g., barely noticeable vs. clearly drifting)?

## Proposed Changes

### 1. Reels Section Refinement
- Modify `src/components/gr7/MediaSections.tsx` to refactor the `ReelsSection` component.
- Implement a scroll-progress-based transformation for the 4 phone containers.

#### Cinematic Entry Sequence
- **Initial State:** 4 phones stacked at the center with slight Z-depth/parallax to hint at multiple layers.
- **Scroll Progression:**
  - Phones scale up slightly as they "gain life."
  - Simultaneous expansion from the center stack to their final grid positions.
  - Individual rotations applied during flight:
    - Phone 1: -8deg
    - Phone 2: -3deg
    - Phone 3: +3deg
    - Phone 4: +8deg
  - Non-linear, curved trajectories for an organic feel.
  - Overshoot effect on arrival using spring physics.

#### Micro-Interactions (Idle State)
- Continuous, out-of-phase floating animation (2-3px translation).
- Subtle, slow rotation changes.
- Discrete depth/parallax effects.

#### Mobile Optimization
- Adjust expansion distances and rotation values for smaller viewports to ensure phones stay within view and maintain readability.

### 2. Technical Implementation
- Use `motion` (Framer Motion/Motion for React) as per the project's existing stack.
- Leverage `useScroll` and `useTransform` to bind animation progress to the section's scroll position.
- Use `useSpring` for the overshoot and smooth return effects.
- Ensure the animation is fully reversible when scrolling back up.

## Verification Plan

### Automated Checks
- Build the project to ensure no breaking changes in `MediaSections.tsx`.
- Type-check with `tsgo`.

### Manual/Visual Verification
- Use Playwright to capture a sequence of screenshots at different scroll offsets (0%, 25%, 50%, 75%, 100% of the Reels section).
- Verify transitions are smooth and correctly linked to scroll.
- Check mobile layout to ensure no overflow or awkward overlapping.
- Confirm the continuous floating animation starts after the entry sequence completes.
