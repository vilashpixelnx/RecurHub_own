# Scroll Reveal Animation Prompt

Use a smooth scroll-triggered reveal animation for the page.

Goal:
- When a section or card enters the viewport, it should fade in and move up slightly.
- The animation should feel premium, soft, and conversion-page friendly.
- Keep it subtle, not flashy.

Behavior:
- Default state: hidden, slightly translated down, and slightly transparent.
- Visible state: fully opaque, no transform.
- Trigger only when the element enters the viewport.
- Add a small stagger delay for sibling items in the same row or grid.

Recommended implementation:
- Add a base class like `.reveal` to all animated elements.
- Add a class like `.visible` when the element becomes visible.
- Use `IntersectionObserver` for scroll detection.
- Use CSS transitions for opacity and transform.

Animation style:
- Fade up: `opacity: 0 -> 1`
- Move up: `transform: translateY(24px) -> none`
- Optional variants:
  - `reveal-left`
  - `reveal-right`
  - `reveal-scale`

Important rules:
- Keep the motion fast and elegant.
- Do not use heavy bounce or exaggerated motion.
- Do not animate everything at once.
- Reveal items section by section as the user scrolls.
- Unobserve elements after they are revealed.

Best use cases:
- Section headings
- Cards
- Feature blocks
- Testimonials
- FAQ items
- CTA blocks

Implementation note:
- This animation should work well on desktop and mobile.
- Respect existing design tokens and keep the page feel consistent.

If you are an agent reading this file, implement the page scroll animation in this style only.
