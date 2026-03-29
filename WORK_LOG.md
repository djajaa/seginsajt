# Work log — moj-sajt (Next.js)

Goal: Make `moj-sajt/` visually match the ShotFit template in `Template/` **without modifying anything inside `Template/`**, and remove unused resources. If there’s no info/content for a template section, omit it.

Date range: Feb 28, 2026 → Mar 15, 2026

---

## Todo (current)

- [x] Fix hero headline contrast ("MODERNO VOĐENJE. REZULTAT KOJI OSTAJE")
- [ ] Re-check mobile (burger) menu spacing on small phones (avoid excessive blank/scroll)
- [ ] Re-check dark-section contrast on real device (catch any remaining black-on-dark text)

---

## What was done (chronological)

### 1) Repo + template analysis
- Confirmed workspace structure:
  - `moj-sajt/` is the Next.js app to modify.
  - `Template/` is a static HTML template source to reference (must remain unchanged).
- Read and extracted the ShotFit template design language (tokens, typography, spacing, button hover effect, section patterns).

### 2) Global layout updates
- Updated the root layout to match template typography:
  - Switched fonts to **Kanit** (headings) + **Archivo** (body) via `next/font/google`.
  - Set `lang="sr"`.
  - Updated metadata/title to match the site branding.

### 3) Global styling rewrite to match template
- Rebuilt global CSS to align with ShotFit’s tokens and primitives:
  - Introduced CSS variables matching the template (theme red, header dark, bg shades, etc.).
  - Added template-like typography scale for headings.
  - Added `.section-padding`, section background helpers, marquee keyframes.
  - Implemented the template’s 5-slice animated hover button (`.gt-theme-btn`).

### 4) Page rewrite (structure + content preservation)
- Rewrote the homepage to match template structure while keeping Sergej Janjić’s real content:
  - Header + hero section with background image and overlay.
  - Marquee strip.
  - About section.
  - Services/coaching section.
  - Results section.
  - CTA parallax section.
  - Contact section + WhatsApp integration.
  - Footer.
- Removed template sections that had no content supplied (team, schedule, shop, blog, testimonials, BMI calculator, etc.).

### 5) Removed unused dependencies/resources
- Removed `framer-motion` and the old animation-driven page implementation.
- Deleted unused default SVG assets from `public/` (kept only `public/images/...` that the site references).

### 6) Verification
- Ran a production build successfully (`next build`) after the refactor.

### 7) First pass UX contrast + mobile menu
- Improved contrast in multiple dark sections (footer, dark blocks) by using `text-white/…` instead of low-contrast grays.
- Replaced the original mobile menu dropdown with a slide-in drawer:
  - Overlay click-to-close
  - Close button
  - Escape key closes
  - Body scroll lock while open

### 8) Contact + footer readability (address/phone)
- Fixed remaining black-on-dark text for the address/phone area that appears below the “Klikom na dugme otvara se WhatsApp…” note.
  - Updated the contact info block in the contact section to render labels/values in white.
  - Hardened the footer contact info column to default to white and forced address/phone values to `!text-white`.

---

## Current issues reported

1) Hero headline appears too dark (reads as black-on-black)
- Likely cause: global element styles for headings overriding utility classes like `text-white` due to CSS cascade/order.

2) Burger menu still feels rough
- Needs polish (motion/feel, tap targets, focus, spacing, possibly smoother transitions).
