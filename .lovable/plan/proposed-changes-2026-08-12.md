---
title: Fix abrupt visual jump in Hero transition
description: Smooth the transition between HeroIntro and Hero by adjusting opacity curves, unmasking elements earlier, and synchronizing background layers.
---

## Proposed Changes

### HeroIntro Component
- Refine `bgOpacity` and `waveOpacity` transforms to fade out intro elements more gradually.
- Update `TRANSITION OVERLAY` to use a more balanced opacity curve to bridge the two sections.
- Ensure intro text and secondary elements fade out early enough to not conflict with the incoming hero content.

### Landing Component
- Adjust the `Hero` section's internal `opacity` transform to fade in earlier, creating a cross-fade effect.
- Synchronize the `AnimatedBackground` grid and glow properties to match the `HeroIntro` atmospheric layers.
- Check and fix any z-index conflicts that might cause sudden visibility changes.

## Technical Details
- In `HeroIntro.tsx`:
    - Adjust `bgOpacity`: `useTransform(scrollSmooth, [0, 0.6, 0.9], [1, 1, 0])`.
    - Adjust overlay: `useTransform(scrollSmooth, [0.4, 0.9], [0, 1])`.
- In `Landing.tsx`:
    - In `Hero` section, change `opacity` transform to `useTransform(scrollYProgress, [0, 0.3], [0, 1])` (currently it might be reversed or too late).
    - Ensure `z-index` of main `Landing` content doesn't suddenly "pop" over `HeroIntro`.
