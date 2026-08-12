---
title: Fix HeroIntro to Hero scroll transition
description: Smooth the background transition between the HeroIntro and the main Hero section by synchronizing colors and opacity curves.
---

## Proposed Changes

### HeroIntro Component
- Synchronize background color with the main landing page (`#0a0a0a`).
- Adjust `bgOpacity` and `waveOpacity` scroll ranges to ensure a seamless fade-out of the intro elements.
- Update the fixed overlay gradient to match the new background color.

### Landing Component
- Ensure the `AnimatedBackground` and `Hero` section maintain visual consistency during the transition.
- Adjust the `Hero` section's top padding or margin if needed to align with the `HeroIntro` exit.

## Technical Details
- In `HeroIntro.tsx`:
    - Change `bg-[#050505]` to `bg-[#0a0a0a]`.
    - Modify `bgOpacity` transform: `useTransform(scrollSmooth, [0, 0.8, 1], [1, 1, 0])`.
    - Update `TRANSITION OVERLAY` gradient: `from-transparent via-[#ff1a1a]/5 to-[#0a0a0a]`.
- In `Landing.tsx`:
    - Verify `AnimatedBackground` base color matches `#0a0a0a`.
