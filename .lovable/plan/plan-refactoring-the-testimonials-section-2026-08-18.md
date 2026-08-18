# Plan: Refactoring the Testimonials Section

I will refactor the `VideoTestimonialsSection` in `MediaSections.tsx` to fix media issues, improve interaction logic (click instead of hover), ensure mobile responsiveness, and clean up the codebase.

## 1. Media Architecture Refactor
- Update `VideoTestimonial` interface in `mediaConfig.ts` to clearly separate `thumbnail`, `videoSrc`, and `href`.
- Replace Instagram Reel URLs in `src` with local thumbnails (`src/assets/testimonials/test-*.jpg`).
- Ensure `href` always points to the original Instagram Reel.

## 2. Interaction & Logic Update
- Change selection logic from `onMouseEnter` to `onClick`.
- Implement a stable grid layout on desktop that doesn't collapse to `grid-cols-1` when active, preventing layout shifts.
- Set `activeIndex` to `0` by default so the section is pre-populated.
- Fix the dynamic counter (`01 / 05`) to use array length.

## 3. Component Improvements
- **MediaSlot:** Add error handling (loading/error states) and ensure it doesn't try to play HTML pages as video.
- **Editorial Panel:** Enhance robustness, add a clear "Watch Testimonial" CTA, and handle missing logos gracefully.
- **Visuals:** Refine Motion animations (subtle scale/opacity) and reduce unnecessary `will-change` usage.

## 4. Cleanup
- Remove the unused `Testimonials` component and data from `Landing.tsx`.
- Remove the unused `containerRef` from `VideoTestimonialsSection`.

## Technical Details
- **Files:** `src/components/gr7/mediaConfig.ts`, `src/components/gr7/MediaSections.tsx`, `src/components/gr7/MediaSlot.tsx`, `src/components/gr7/Landing.tsx`.
- **Breakpoints:** Ensure horizontal scroll/stacked layout on mobile and stable side-by-side on desktop.
- **Accessibility:** Use `button` for cards and `a` for external links; add proper ARIA labels.
