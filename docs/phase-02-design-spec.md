# Phase 02 — Luxury Brand System + UI/UX Design Specification

## 1. Brand direction

Meer Alam Builders should feel premium, architectural, and intentionally minimal. The visual identity keeps the current dark-and-gold foundation while elevating it toward a more editorial, cinematic luxury positioning. The brand language remains rooted in dark charcoal surfaces, warm off-white typography, and restrained gold accents rather than a bright or overly decorative aesthetic.

## 2. Final/proposed color system

- Background: #111111
- Background deep: #0d0d0d
- Surface: #171717
- Surface elevated: #1d1d1d
- Foreground: #f5f2ea
- Muted text: #a6a096
- Gold: #c9a227
- Gold muted: #9f7e20
- Border: rgba(255,255,255,0.12)
- Border strong: rgba(201,162,39,0.35)

The design intentionally keeps gold as an accent, not a dominant field color. Gold appears in micro-detail, active states, labels, and premium calls to action.

## 3. Typography system

- Display font: Cormorant Garamond
- Body font: Manrope
- Display scale: editorial, refined, architectural
- Body scale: modern, highly legible, minimal

Type hierarchy:
- Display XL: clamp(4rem, 7vw, 8rem)
- Display Large: clamp(3rem, 5vw, 5rem)
- H1: clamp(2.5rem, 4vw, 4.25rem)
- H2: clamp(2rem, 3vw, 3rem)
- H3: clamp(1.5rem, 2.2vw, 2.25rem)
- Body large: 1.125rem
- Body: 1rem
- Body small: 0.875rem
- Eyebrow: 0.72rem / tracking 0.28em

## 4. Grid system

- Max content width: 1280px
- Section padding: responsive clamp
- Gutter: responsive clamp
- Desktop: 12-column conceptual rhythm
- Tablet: 8-column conceptual rhythm
- Mobile: 4-column conceptual rhythm

## 5. Spacing system

- xs: 0.25rem
- sm: 0.5rem
- md: 0.75rem
- lg: 1rem
- xl: 1.25rem
- xxl: 1.5rem
- xxxl: 2rem
- 4xl: 2.5rem
- 5xl: 3rem
- 6xl: 4rem
- 7xl: 5rem
- 8xl: 6rem

Large whitespace is used to preserve a premium editorial rhythm and avoid crowded sections.

## 6. Component system

Components in the current foundation include:
- Button
- Container
- Section
- SectionHeading
- Footer
- Header
- Form field patterns

The system remains intentionally restrained, with thin borders, subtle depth, and minimal rounded geometry.

## 7. Homepage visual structure

The homepage follows a premium editorial composition:
1. Hero with premium imagery and minimal text
2. Feature cards with architecture imagery
3. Trust/value block with stats and editorial treatment
4. Process section with large numbering
5. Portfolio gallery section
6. Final CTA panel

## 8. Page structure

- Home
- About
- Services
- Projects
- Contact

The current routing structure is already in place and remains stable for this phase.

## 9. Motion strategy

Motion remains slow, subtle, and controlled. Recommended direction:
- Level 1: micro-interactions on buttons and links
- Level 2: content transitions and image fades
- Level 3: scroll-based reveal patterns
- Level 4: cinematic hero transitions in future phases

No broad or flashy animation is used in this phase.

## 10. 3D strategy

The site does not use fabricated model content. For this phase, 3D is not implemented; the design direction is prepared for future interaction without forcing a heavy 3D layer into the current build. This keeps performance and usability intact.

## 11. Responsive strategy

- Desktop: large editorial hero and spacious content rhythm
- Tablet: balanced layout with reduced spacing where necessary
- Mobile: stacked content, compressed navigation, and readable type scale

The design avoids shrinking a desktop layout naively; it adapts its rhythm and hierarchy to smaller breakpoints.

## 12. Accessibility strategy

- Semantic section structure and heading hierarchy
- Keyboard focus states on all CTA elements
- Sufficient contrast between text and dark backgrounds
- Reduced-motion support in global CSS
- Alt text on all project and hero imagery
- Touch-friendly controls on navigation and form inputs

## 13. Performance strategy

- Use Next/Image for photography
- Use responsive image sizes
- Keep motion minimal and intentional
- Avoid heavy 3D until necessary
- Keep only the required design-system foundation in place for Phase 02

## 14. Figma specification

The design is ready to be translated into a Figma board with the following conceptual screens:
- 01 — Cover
- 02 — Design Tokens
- 03 — Components
- 04 — Desktop Homepage
- 05 — Tablet Homepage
- 06 — Mobile Homepage
- 07 — About
- 08 — Services
- 09 — Projects
- 10 — Project Detail
- 11 — Contact
- 12 — Motion/Interaction Notes

Because no Figma integration is available in this environment, this specification is documented in a design-ready format rather than claiming a live Figma file was created.

## 15. Files changed

- src/app/globals.css
- src/components/ui/button.tsx
- src/components/ui/container.tsx
- src/components/ui/section-heading.tsx
- src/app/page.tsx
- src/lib/design-tokens.ts
- docs/phase-02-design-spec.md

## 16. Files created

- src/lib/design-tokens.ts
- docs/phase-02-design-spec.md

## 17. Dependencies changed

No new dependencies were added for this phase.

## 18. Validation results

Validation completed with:
- npm run lint
- npm run build

The project currently builds successfully after the Phase 02 design foundation updates.

## 19. Remaining client assets required

- Final company statement / short brand description
- Official logo if a different version is needed
- Final project photography for portfolio sections
- Client contact details
- Any approved service list
- Any final testimonials, if available

## 20. Design decisions requiring approval

- The dark charcoal + gold luxury aesthetic is approved as the base direction
- Typography direction is approved as editorial serif + modern sans pairing
- Gold remains an accent instead of a dominant color field
- The design system is intentionally restrained and architectural rather than overdesigned
- Remaining content placeholders should be replaced only once official client content is provided

## PHASE 02 STATUS: COMPLETE
