# JV Page Agent Guide

This folder is a single-page JV / launch landing page for RecurHub.
Future edits should keep the existing structure, tone, layout rhythm, and color system unless the user explicitly asks for a redesign.

## Project Structure

- `index.html` = page structure and content
- `styles.css` = all visual design, layout, responsive rules, and animations
- `script.js` = interactions, countdown, FAQ behavior, reveal effects, SVG connectors
- `assets/` = logos, images, favicon, and brand files

## Canonical Section Order

Keep the page flow in the same order unless a user asks otherwise.

1. Sticky Nav
2. Hero
3. Launch Timeline
4. Why Promote
5. Product / What Is RecurHub
6. Platforms Marquee
7. Perfect For You If
8. Resources / CTA Card
9. Key Features
10. How It Works
11. Demo
12. Funnel & Commissions
13. Contest & Prizes
14. Testimonials
15. We Reciprocate
16. Meet & Connect
17. FAQ
18. Footer

## Visual System

Use the existing brand tokens and do not introduce a new palette without approval.

### Brand Colors

- Primary gradient: `#771AFF -> #F072AF`
- Brand middle tone: `#B148D8`
- Dark background: `#08060F`
- Elevated dark surface: `#0F0B1D`
- Card surface: `#130E26`
- Light section background: `#F7F5FB`
- Light text: `#0B0618`
- Accent success: `#10B981`
- Accent gold: `#F59E0B`

### Typography

- Headings use `var(--font-h)` which is currently built around `Google Sans`, `Plus Jakarta Sans`, and `Inter`
- Body copy uses `var(--font-b)`
- Keep the bold, launch-page style headings and short punchy sections

### Design Language

- Use rounded cards, soft glow effects, gradient text, and pill buttons
- Prefer the existing section tags, badges, and CTA styles
- Keep dark and light sections alternating as already defined
- Maintain the current airy-but-premium sales page feel

## Editing Rules

- Reuse existing classes and design tokens first
- Do not replace the page with a new design system
- Keep section spacing, card radius, shadows, and hover motion consistent
- Preserve the existing CTA language and funnel flow unless content updates are requested
- Avoid changing the order of sections unless there is a strong reason
- If adding new UI, match the current gradient, border, and glassmorphism style
- Keep JavaScript behavior minimal and focused on existing interactions

## Content Rules

- This page is promotion-focused, so copy should stay concise, confident, and conversion-oriented
- Date-sensitive text must be updated carefully
- If launch dates, prices, commission rates, or platform links change, update all places consistently

## File-Specific Notes

- `index.html` already contains section comments like `S1`, `S2`, etc. Keep that annotation style if adding new blocks
- `styles.css` is the source of truth for the color schema, spacing scale, shadows, and responsive behavior
- `script.js` includes the countdown date, reveal animations, FAQ accordion, and SVG connector logic

## Safe Default For Future Agents

When modifying this folder:

- inspect the existing HTML section first
- match the current theme instead of inventing a new one
- extend the current components instead of rewriting them
- keep the page fast, readable, and conversion-oriented

## Quick Summary

If you only remember one thing: this is a premium JV launch page with a purple-pink gradient brand, dark/light alternating sections, rounded cards, and sales-page copy. Keep that identity intact.
