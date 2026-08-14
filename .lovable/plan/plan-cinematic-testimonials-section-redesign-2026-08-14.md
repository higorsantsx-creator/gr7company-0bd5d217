# Plan: Cinematic Testimonials Section Redesign

Redesign the testimonials section into a high-end interactive gallery with 3D tilts, environmental lighting, and editorial-style client information cards.

## User Review Required

> [!IMPORTANT]
> - The transition relies on `motion` (framer-motion) for layout animations and 3D effects.
> - We will use the 5 specified client cases: Construction of Chalets, Furniture Store, Ceilings & Partitions, Gym, and Shineray Motorcycles.
> - Does the current distribution of 5 videos in a "premium composition" meet your expectations, or should we favor a specific grid pattern (e.g., 3+2, staggered)?

## Proposed Changes

### 1. Data Structure Update
- Update `src/components/gr7/mediaConfig.ts` to include the specific metadata for the 5 selected testimonials (Segment, Main Phrase, Tags, Identification).
- Map existing video assets (or placeholders) to these clients.

### 2. UI Component: CinematicTestimonials
- **Normal State:** A balanced composition of 5 video cards with varying depths and subtle environmental floating.
- **Hover State:** 
  - The hovered card expands, sharpens, and performs a 5-8° 3D tilt towards the info panel.
  - Background testimonials recede (opacity 0.4, slight blur, scaled down).
  - An environmental radial glow (GR7 red) appears behind the active card.
- **Client Info Panel:** An editorial-style layout appearing next to the active video with:
  - Sequential entrance of Logo, Name, Segment, Quote, and Tags.
  - "Ghost Logo" texture in the background (3-7% opacity).

### 3. Integration & Refinement
- Implement fluid cross-fades when switching between active testimonials.
- Ensure mobile responsiveness by converting hover to tap/scroll interactions.
- Optimize performance using GPU-accelerated transforms (`transform-gpu`) and `will-change`.

## Technical Details
- **Framework:** TanStack Start + Framer Motion.
- **Animations:** `layoutId` for transitions between gallery and active states, `perspective` for 3D tilt.
- **Layout:** CSS Grid/Flexbox with absolute positioning for the "receding" background effect.
- **Assets:** Reusing `MediaSlot` for consistent loading states and placeholders.
