# UI Evaluation & Recommended Polish Roadmap

This document contains the senior developer UI audit and prioritized polish roadmap conducted on **Abdulhammed Mustapha's Official Portfolio** (`senior-dev-portfolio`).

---

## 1. High-Priority Polish Tasks (Checklist)

- [x] **1. Fix Section Numbering & Narrative Flow**
  - **Issue:** Section numbering jumps out of chronological sequence: `01 Profile` → `03 Featured Case Studies` → `02 Capabilities & Ecosystem` → `04 Track Record` → `05 Craftsmanship` → `06 Contact`.
  - **Action:** Update [projects.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/projects.tsx#L21) to `number="02"` and [skills.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/skills.tsx#L76) to `number="03"`, aligning with the visual layout order in [app/page.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/app/page.tsx).

- [x] **2. Refine Hero CTA Stacking on Mobile (375px–414px)**
  - **Issue:** In [hero.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/hero.tsx#L90-L124), the 3 action buttons wrap into an asymmetrical layout on 375px screens ("View Featured Work" and "Get In Touch" side-by-side, while "Copy Email" is orphaned on a separate row).
  - **Action:** Update container classes to `flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3`, ensuring full-width buttons on mobile with clean touch targets (≥44px height).

- [x] **3. Anchor Navigation Offset (`scroll-margin-top`)**
  - **Issue:** Clicking navigation links (`#about`, `#projects`, `#skills`, `#experience`, `#contact`) aligns the section directly to the top of the viewport, partially obscuring the top badge or section number under the fixed 64px–80px navbar.
  - **Action:** Add `scroll-mt-20 sm:scroll-mt-24` to each target section in:
    - [components/sections/about.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/about.tsx#L35)
    - [components/sections/projects.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/projects.tsx#L18)
    - [components/sections/skills.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/skills.tsx#L73)
    - [components/sections/experience.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/experience.tsx#L12)
    - [components/sections/contact.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/contact.tsx#L53)

- [x] **4. Web Interface Guidelines: Contact Form Accessibility**
  - **File:** [components/sections/contact.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/contact.tsx)
  - **Actions:**
    - Add `autoComplete="name"` to the name field.
    - Add `autoComplete="email"` and `spellCheck={false}` to the email field.
    - Replace straight triple dots `...` in placeholders and submission states with proper ellipsis glyph `…` (`&hellip;`).
    - Add `aria-live="polite"` to the success confirmation container so screen readers announce form delivery.

- [x] **5. Mobile Navigation Overlay Keyboard Accessibility**
  - **File:** [components/navbar.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/navbar.tsx)
  - **Actions:**
    - Add an `Escape` key listener (`keydown`) that closes the mobile navigation menu when open.
    - Animate mobile drawer with subtle entry scale: `initial={{ opacity: 0, scale: 0.98, y: -6 }}` and `origin-top` for a refined physical feel.

- [x] **6. Heading Typography & Widow Prevention**
  - **File:** [components/ui/section-heading.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/ui/section-heading.tsx#L60)
  - **Action:** Add `[text-wrap:balance]` (or `text-balance`) to the `<h2>` and master hero heading to prevent single-word line wraps on tablet and mobile viewports.

- [x] **7. Hero Terminal Code Window Keyboard Accessibility**
  - **File:** [components/sections/hero.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/hero.tsx#L183)
  - **Action:** Add `tabIndex={0}`, `role="region"`, and `aria-label="Interactive architecture code snippet"` to the horizontally scrollable code container so keyboard-only users can navigate and inspect overflowing code.

- [x] **8. Footer Back-To-Top Focus Indicator**
  - **File:** [components/footer.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/footer.tsx#L57-L65)
  - **Action:** Add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded` to the "TOP" button.

---

## 2. Emil Kowalski Design Engineering Audit Table

| Before | After | Why |
| --- | --- | --- |
| `number="03"` on [projects.tsx:21](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/projects.tsx#L21) followed by `number="02"` on [skills.tsx:76](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/skills.tsx#L76) | Set Projects to `"02"` and Skills to `"03"`, or re-order sections in [page.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/app/page.tsx) | Sequential visual numbering jumps `01` → `03` → `02` → `04`, breaking visual rhythm and hierarchical continuity. |
| In [hero.tsx:95-124](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/hero.tsx#L95-L124), 3 buttons wrap awkwardly on 375px mobile into a 2+1 row layout | `flex-col sm:flex-row w-full sm:w-auto` with full-width buttons on mobile, or group copy button as an icon action | On mobile, the third button ("Copy Email") is orphaned on its own line while the top two are side-by-side, creating jagged layout balance. |
| In [section-heading.tsx:60](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/section-heading.tsx#L60), `<h2>` lacks `text-wrap: balance` | Add `[text-wrap:balance]` (or Tailwind `text-balance`) | Prevents orphan single-word lines (widows) on variable tablet and mobile viewports. |
| Code snippet in [hero.tsx:183](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/hero.tsx#L183) has `overflow-x-auto` without keyboard focusability | Add `tabIndex={0}` and `role="region"` with `aria-label="Architecture code sample"` | Scrollable containers without keyboard accessibility trap or block non-mouse users from reviewing code. |
| Ad-hoc button in [hero.tsx:105-123](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/hero.tsx#L105-L123) with manual classes | Reusable `<Button variant="outline" size="lg">` with copy state | Avoids diverging button heights, paddings, and active state easings across sections. |
| In [contact.tsx:300-302](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/contact.tsx#L300-L302), `"Transmitting Message..."` with straight dots | `"Transmitting Message…"` with `&hellip;` (`…`) and non-breaking space | Follows strict typographical guidelines; straight dots `...` look unrefined compared to an ellipsis glyph. |
| Anchor links `#about`, `#projects`, `#skills`, etc. lack `scroll-margin-top` | Add `scroll-mt-20 sm:scroll-mt-24` to section containers | When clicking navigation links, the 64px–80px fixed navbar can clip the top badge and section number. |
| Mobile menu in [navbar.tsx:110](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/navbar.tsx#L110) animates only `opacity` and `y: -8` | Add subtle scale: `initial={{ opacity: 0, scale: 0.98, y: -4 }}` with custom cubic bezier | A subtle scale with origin-top gives the mobile sheet physical weight rather than feeling like a floating stamp. |
| Missing `Escape` key handler in [navbar.tsx](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/navbar.tsx) for mobile drawer | Add `useEffect` listening for `Escape` to close `isMobileMenuOpen` | Standard accessible interaction: keyboard users must be able to dismiss open overlays without hunting for the toggle. |

---

## 3. Web Interface Guidelines & Accessibility Findings

* **[contact.tsx:256-263](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/contact.tsx#L256-L263)**: Name input missing `autoComplete="name"`.
* **[contact.tsx:270-277](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/contact.tsx#L270-L277)**: Email input missing `autoComplete="email"` and `spellCheck={false}`.
* **[contact.tsx:284-291](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/contact.tsx#L284-L291)**: Message placeholder ends with straight `...` instead of ellipsis `…`.
* **[contact.tsx:202-230](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/contact.tsx#L202-L230)**: Form success state replaces form without an `aria-live="polite"` region.
* **[navbar.tsx:95-103](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/navbar.tsx#L95-L103)**: Mobile menu button has `aria-expanded`, but does not trap focus inside the navigation drawer when open.
* **[about.tsx:35](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/about.tsx#L35)**, **[projects.tsx:18](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/projects.tsx#L18)**, **[skills.tsx:73](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/skills.tsx#L73)**: Missing `scroll-mt-20` on section anchors.
* **[hero.tsx:76-85](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/sections/hero.tsx#L76-L85)**: Numbers like `<100ms` and `100%` should use `font-variant-numeric: tabular-nums` or `tabular-nums` class to prevent layout shifts.
* **[footer.tsx:57-65](file:///c:/Users/Mufasa/Documents/official-portfolio-nextjs/components/footer.tsx#L57-L65)**: Back-to-top button lacks visible focus ring (`focus-visible:ring-2 focus-visible:ring-primary`).
